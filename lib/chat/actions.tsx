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
import { actionsTime, actionsWeather } from '@/actions'
import { actionsTransitArray } from '@/actions/transit/actions-transit-array'
import { Transites } from '@/interfaces'

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
    // model: openai('gpt-3.5-turbo'),
    model: openai('gpt-4o-mini'),

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
          // locationTime: z.string().describe(
          //   `Este es el nombre de la ciudad que se quiere obtener la hora actual.
          //   Te van a pasar el nombre de una ciudad y debes añadir el timezone de la ciudad.
          //   Por ejemplo,si te pasan "Nueva York" va a ser America/New_York,
          //   Lima es America/Lima, España es Europe/Madrid, etc.
          //     `
          // ),
          cronograma: z
            .array(
              z.object({
                día: z.number(),
                lugares: z.array(
                  z.object({
                    nombre: z.string()
                  })
                )
              })
            )
            .describe(
              //   `
              // Planifica un itinerario de viaje detallado para la ciudad y la cantidad de días
              // especificados por el usuario. Organiza las visitas agrupando los lugares cercanos entre sí
              // para que se visiten el mismo día. Asegúrate de equilibrar el itinerario en términos de tiempo
              // y número de visitas por día.

              // El resultado debe ser un array de objetos, donde cada objeto representa un día del itinerario y contiene dos propiedades:
              // 1. 'día': un número que indica el día del cronograma.
              // 2. 'lugares': un array de objetos, cada uno con el nombre de un lugar a visitar.

              // Ejemplo de salida esperada:
              // [
              //     {
              //         "día": 1,
              //         "lugares": [
              //             {"nombre": "Museo del Prado"},
              //             {"nombre": "Parque del Retiro"}
              //         ]
              //     },
              //     {
              //         "día": 2,
              //         "lugares": [
              //             {"nombre": "Plaza Mayor"},
              //             {"nombre": "Palacio Real"}
              //         ]
              //     }
              // ]
              //   `
              `
            Plan a detailed travel itinerary for the city and number of days specified by the user. Organize the visits by grouping nearby places to be visited on the same day. Ensure the itinerary is balanced in terms of time and the number of visits per day.

            The result should be an array of objects, where each object represents a day of the itinerary and contains two properties:
            1. 'day': a number indicating the corresponding day of the schedule.
            2. 'places': an array of objects, each containing the name of a place to visit.

            Expected output example:
            [
                {
                    "day": 1,
                    "places": [
                        {"name": "Prado Museum"},
                        {"name": "Retiro Park"}
                    ]
                },
                {
                    "day": 2,
                    "places": [
                        {"name": "Plaza Mayor"},
                        {"name": "Royal Palace"}
                    ]
                }
            ]
            `
            )
        }),
        generate: async function* ({ location, locationWeather, cronograma }) {
          yield (
            <div>
              <h3>Loading...</h3>
            </div>
          )

          const toolCallId = nanoid()

          // const time = await actionsTime(locationTime)
          const weather = await actionsWeather(locationWeather)
          const transitesPromises = await actionsTransitArray({
            cronograma,
            location
          })

          const results = await Promise.allSettled(transitesPromises)
          const transites: Transites[] = results
            .filter(result => result.status === 'fulfilled')
            .map(result => (result as PromiseFulfilledResult<Transites>).value)
            .filter(item => item !== null) as Transites[]

          console.log('transites desde el actions', transites)

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
                      cronograma,
                      transites
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
              cronograma={cronograma}
              transites={transites}
            />
          )
        }
      }

      // show_time: {
      //   description:
      //     'Obtiene la información actualizada de la hora de una ciudad.',
      //   parameters: z.object({
      //     locationTime: z.string().describe(
      //       `Este es el nombre de la ciudad que se quiere obtener la hora actual.
      //       Te van a pasar el nombre de una ciudad y debes añadir el timezone de la ciudad.
      //       Por ejemplo,si te pasan "Nueva York" va a ser America/New_York,
      //       Lima es America/Lima, España es Europe/Madrid, etc.
      //         `
      //     )
      //   }),
      //   generate: async function* ({ locationTime }) {
      //     console.log(locationTime)

      //     yield (
      //       <div>
      //         <h3>Loading...</h3>
      //       </div>
      //     )

      //     const toolCallId = nanoid()

      //     const res = await fetch(
      //       `https://worldtimeapi.org/api/timezone/${locationTime}`
      //     )
      //     const { datetime } = await res.json()
      //     const time = moment.tz(datetime, locationTime).format('h:mmA')

      //     aiState.done({
      //       ...aiState.get(),
      //       messages: [
      //         ...aiState.get().messages,
      //         {
      //           id: nanoid(),
      //           role: 'assistant',
      //           content: [
      //             {
      //               type: 'tool-call',
      //               toolName: 'show_weather',
      //               toolCallId,
      //               args: { locationTime }
      //             }
      //           ]
      //         },
      //         {
      //           id: nanoid(),
      //           role: 'tool',
      //           content: [
      //             {
      //               type: 'tool-result',
      //               toolName: 'show_weather',
      //               toolCallId,
      //               result: locationTime
      //             }
      //           ]
      //         }
      //       ]
      //     })

      //     return (
      //       <div>
      //         <h1>
      //           La hora actual de {locationTime} es {time}
      //         </h1>
      //       </div>
      //     )
      //   }
      // }
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
