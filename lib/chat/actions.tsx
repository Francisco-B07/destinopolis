import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'

import {
  spinner,
  BotCard,
  BotMessage,
  SystemMessage,
  Stock,
  Purchase
} from '@/components/stocks'

import { z } from 'zod'
import { Events } from '@/components/stocks/events'

import { Stocks } from '@/components/stocks/stocks'
import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid
} from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat, Message } from '@/lib/types'
import { auth } from '@/auth'
import Bento from '@/components/bento/bento'
import {
  actionsFlight,
  actionsFotosArray,
  actionsHotel,
  actionsTime,
  actionsTours,
  actionsWeather
} from '@/actions'
import { actionsTransitArray } from '@/actions/transit/actions-transit-array'
import { Transites } from '@/interfaces'
import BentoSkeleton from '@/components/bento/bento-skeleton'

async function confirmPurchase(symbol: string, price: number, amount: number) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  const purchasing = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">
        Purchasing {amount} ${symbol}...
      </p>
    </div>
  )

  const systemMessage = createStreamableUI(null)

  runAsyncFnWithoutBlocking(async () => {
    await sleep(1000)

    purchasing.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        {spinner}
        <p className="mb-2">
          Purchasing {amount} ${symbol}... working on it...
        </p>
      </div>
    )

    await sleep(1000)

    purchasing.done(
      <div>
        <p className="mb-2">
          You have successfully purchased {amount} ${symbol}. Total cost:{' '}
          {formatNumber(amount * price)}
        </p>
      </div>
    )

    systemMessage.done(
      <SystemMessage>
        You have purchased {amount} shares of {symbol} at ${price}. Total cost ={' '}
        {formatNumber(amount * price)}.
      </SystemMessage>
    )

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: 'system',
          content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${
            amount * price
          }]`
        }
      ]
    })
  })

  return {
    purchasingUI: purchasing.value,
    newMessage: {
      id: nanoid(),
      display: systemMessage.value
    }
  }
}

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: openai('gpt-3.5-turbo'),
    // model: openai('gpt-4o-mini'),

    initial: <SpinnerMessage />,
    system: `\
    Como experto en viajes, hazme una lista de los lugares que debo visitar en mi viaje. 
    Debes dividirme los sitios que puedo ver en la cantidad de días que tengo para visitarlos.
    Organizame las visitas por día y por zona, de manera que estén unas cerca de otras cuando
    las visite en el mismo día.

    Si el usuario pide una lista de lugares que debe visitar en su viaje, 
    responde con una lista de lugares que debe visitar en su viaje y luego
    llama a \'list_locations\' .    
    
    `,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    tools: {
      list_locations: {
        description:
          'Obtiene la lista de lugares que debo visitar en mi viaje.',
        parameters: z.object({
          location: z.string().describe(
            `Este es el nombre de la ciudad a la cual se desea realizar el viaje. 
              Te van a pasar el nombre de una ciudad y lo debes convertir en coordenadas.
              Por ejemplo, si quiere ir a Manhattan (Nueva York), debes pasar "40.7307999,-73.9973085".
              `
          ),
          locationWeather: z.string().describe(
            `Este es el nombre de la ciudad que se quiere obtener la información actualizada de clima. 
              Te van a pasar el nombre de una ciudad y lo debes convertir a Nombre de la ciudad y código del país divididos por coma 
              (utilice códigos de país ISO 3166). 
              Por ejemplo, si quieres obtener la información actualizada de clima de Londres, debes pasar "London,uk".
              `
          ),
          originLocationCode: z.string().describe(
            `Código IATA de la ciudad/aeropuerto desde el que saldrá el usuario, por ejemplo "BOS" para Boston, "PAR" para Paris.
            Si no se especifica ningún código IATA, se utilizará el código de Bercelona.
              `
          ),
          destinationLocationCode: z.string().describe(
            `Código IATA de la ciudad/aeropuerto al cual desea ir el usuario, por ejemplo "BOS" para Boston, "PAR" for Paris.
              `
          ),
          departureDate: z.string().describe(
            `El usuario indicará la fecha de partida de su viaje. Debes obtener la fecha de partida única para el viaje. Si el usuario no indica ninguna fecha, toma como fecha de partida el 13 de agosto de 2024. Las fechas se especifican en el formato ISO 8601 (AAAA-MM-DD), por ejemplo, 2017-12-25.
            `
          ),

          cronograma: z
            .array(
              z.object({
                día: z.number(),
                lugares: z.array(
                  z.object({
                    nombre: z.string(),
                    fotos: z.array(z.string())
                  })
                )
              })
            )
            .describe(
              `
            Plan a detailed travel itinerary for the city and number of days specified by the user. Organize the visits by grouping nearby places to be visited on the same day. Ensure the itinerary is balanced in terms of time and the number of visits per day.

            The result should be an array of objects, where each object represents a day of the itinerary and contains two properties:
            1. 'day': a number indicating the corresponding day of the schedule.
            2. 'places': an array of objects, each containing the name of a place to visit.
            3. 'photos': an array of strings void.

            Expected output example:
            [
                {
                    "day": 1,
                    "places": [
                        {"name": "Prado Museum", "photos": []},
                        {"name": "Retiro Park", "photos": []}
                    ]
                },
                {
                    "day": 2,
                    "places": [
                        {"name": "Plaza Mayor", "photos": []},
                        {"name": "Royal Palace", "photos": []}
                    ]
                }
            ]
            `
            )
        }),
        generate: async function* ({
          location,
          locationWeather,
          cronograma,
          originLocationCode,
          destinationLocationCode,
          departureDate
        }) {
          yield (
            <div>
              <BentoSkeleton />
            </div>
          )

          const toolCallId = nanoid()

          const weather = await actionsWeather({ locationWeather, location })
          console.log('weather')
          const transites = await actionsTransitArray({
            cronograma,
            location
          })
          console.log('transites')

          const itinerario = await actionsFotosArray({ cronograma })
          console.log('itinerario')

          const flights = await actionsFlight({
            originLocationCode,
            destinationLocationCode,
            departureDate
          })

          console.log('vuelos')

          const hotels = await actionsHotel({ location })
          console.log('hoteles')
          const tours = await actionsTours({ location })
          console.log('tours')

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'list_locations',
                    toolCallId,
                    args: {
                      weather,
                      itinerario,
                      transites,
                      hotels,
                      tours,
                      flights,
                      location
                    }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'list_locations',
                    toolCallId,
                    result: location
                  }
                ]
              }
            ]
          })

          return (
            <Bento
              weather={weather}
              itinerario={itinerario}
              transites={transites}
              flights={flights}
              hotels={hotels}
              tours={tours}
              location={location}
            />
          )
        }
      }
    }
  })

  return {
    id: nanoid(),
    display: result.value
  }
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    confirmPurchase
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState() as Chat

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`

      const firstMessageContent = messages[0].content as string
      const title = firstMessageContent.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'tool' ? (
          message.content.map(tool => {
            return tool.toolName === 'listStocks' ? (
              <BotCard>
                {/* TODO: Infer types based on the tool result*/}
                {/* @ts-expect-error */}
                <Stocks props={tool.result} />
              </BotCard>
            ) : tool.toolName === 'showStockPrice' ? (
              <BotCard>
                {/* @ts-expect-error */}
                <Stock props={tool.result} />
              </BotCard>
            ) : tool.toolName === 'showStockPurchase' ? (
              <BotCard>
                {/* @ts-expect-error */}
                <Purchase props={tool.result} />
              </BotCard>
            ) : tool.toolName === 'getEvents' ? (
              <BotCard>
                {/* @ts-expect-error */}
                <Events props={tool.result} />
              </BotCard>
            ) : null
          })
        ) : message.role === 'user' ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null
    }))
}
