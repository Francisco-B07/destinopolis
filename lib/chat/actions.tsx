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
import { Hotel, Itinerario, Transites } from '@/interfaces'
import BentoSkeleton from '@/components/bento/bento-skeleton'

export const maxDuration = 300

interface Props {
  weather?: any
  transites?: Transites[]
  itinerario?: Itinerario
  flights?: any[]
  hotels?: Hotel[]
  tours?: any[]
  location: string
}

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
            `El usuario indicará la fecha de partida de su viaje. Debes obtener la fecha de partida única para el viaje. Si el usuario no indica ninguna fecha, toma como fecha de partida el 12 de septiembre de 2024. Las fechas se especifican en el formato ISO 8601 (AAAA-MM-DD), por ejemplo, 2017-12-25.
            `
          ),

          cronograma: z
            .array(
              z.object({
                día: z.number(),
                lugares: z.array(
                  z.object({
                    nombre: z.string(),
                    fotos: z.array(z.string()),
                    rating: z.number(),
                    userRatingsTotal: z.number(),
                    location: z.object({
                      lat: z.number(),
                      lng: z.number()
                    })
                  })
                )
              })
            )
            .describe(
              `
            Plan a detailed travel itinerary for the city and number of days specified by the user. Organize the visits by grouping nearby places to be visited on the same day. Ensure the itinerary is balanced in terms of time and the number of visits per day. If the number of days the trip will last is not specified, generate an itinerary for 3 days

            The result should be an array of objects, where each object represents a day of the itinerary and contains two properties:
            1. 'day': a number indicating the corresponding day of the schedule.
            2. 'places': an array of objects, each containing the name of a place to visit.
            3. 'photos': an array of strings void.
            4. 'rating': a number 0 .
            5. 'userRatingsTotal': a number 0 .
            6. 'location': a object with lat and lng.

            Expected output example:
            [
                {
                    "day": 1,
                    "places": [
                        {"name": "Prado Museum", "photos": [], "rating": 0, "userRatingsTotal": 0, "location": {"lat": 0, "lng": 0}},
                        {"name": "Retiro Park", "photos": [], "rating": 0, "userRatingsTotal": 0, "location": {"lat": 0, "lng": 0}}
                    ]
                },
                {
                    "day": 2,
                    "places": [
                        {"name": "Plaza Mayor", "photos": [], "rating": 0, "userRatingsTotal": 0, "location": {"lat": 0, "lng": 0}},
                        {"name": "Royal Palace", "photos": [], "rating": 0, "userRatingsTotal": 0, "location": {"lat": 0, "lng": 0}}
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

          // const weather = await actionsWeather({ locationWeather, location })
          // const transites = await actionsTransitArray({
          //   cronograma,
          //   location
          // })

          // const itinerario = await actionsFotosArray({ cronograma })

          // const flights = await actionsFlight({
          //   originLocationCode,
          //   destinationLocationCode,
          //   departureDate
          // })

          // const hotels = await actionsHotel({ location })
          // const tours = await actionsTours({ location })

          async function fetchData() {
            try {
              const results = await Promise.allSettled([
                actionsWeather({ locationWeather, location }),
                actionsTransitArray({ cronograma, location }),
                actionsFotosArray({ cronograma, location }),
                actionsFlight({
                  originLocationCode,
                  destinationLocationCode,
                  departureDate
                }),
                actionsHotel({ location }),
                actionsTours({ location })
              ])
              const weather =
                results[0].status === 'fulfilled' ? results[0].value : undefined
              const transites =
                results[1].status === 'fulfilled' ? results[1].value : undefined
              const itinerario =
                results[2].status === 'fulfilled' ? results[2].value : undefined
              const flights =
                results[3].status === 'fulfilled' ? results[3].value : undefined
              const hotels =
                results[4].status === 'fulfilled' ? results[4].value : undefined
              const tours =
                results[5].status === 'fulfilled' ? results[5].value : undefined

              return { weather, transites, itinerario, flights, hotels, tours }
            } catch (error) {
              console.error('Error ejecutando acciones:', error)
              return null
            }
          }

          const data = await fetchData()

          const weather = data?.weather
          const transites = data?.transites
          const itinerario = data?.itinerario
          const flights = data?.flights
          const hotels = data?.hotels
          const tours = data?.tours

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
                    result: {
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
              }
            ]
          })

          return (
            <BotCard>
              <Bento
                weather={weather}
                itinerario={itinerario}
                transites={transites}
                flights={flights}
                hotels={hotels}
                tours={tours}
                location={location}
              />
            </BotCard>
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
            return tool.toolName === 'list_locations' ? (
              <BotCard>
                <Bento
                  weather={(tool.result as Props).weather}
                  itinerario={(tool.result as Props).itinerario}
                  transites={(tool.result as Props).transites}
                  flights={(tool.result as Props).flights}
                  hotels={(tool.result as Props).hotels}
                  tours={(tool.result as Props).tours}
                  location={(tool.result as Props).location}
                />
              </BotCard>
            ) : // tool.toolName === 'showStockPrice' ? (
            //   <BotCard>
            //     {/* @ts-expect-error */}
            //     <Stock props={tool.result} />
            //   </BotCard>
            // ) : tool.toolName === 'showStockPurchase' ? (
            //   <BotCard>
            //     {/* @ts-expect-error */}
            //     <Purchase props={tool.result} />
            //   </BotCard>
            // ) : tool.toolName === 'getEvents' ? (
            //   <BotCard>
            //     {/* @ts-expect-error */}
            //     <Events props={tool.result} />
            //   </BotCard>
            // ) :
            null
          })
        ) : message.role === 'user' ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null
    }))
}
