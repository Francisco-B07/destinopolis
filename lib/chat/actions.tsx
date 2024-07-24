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
          locationWeather: z.string().describe(
            `Este es el nombre de la ciudad que se quiere obtener la información actualizada de clima. 
              Te van a pasar el nombre de una ciudad y lo debes convertir a Nombre de la ciudad y código del país divididos por coma 
              (utilice códigos de país ISO 3166). 
              Por ejemplo, si quieres obtener la información actualizada de clima de Londres, debes pasar "London,uk".
              `
          ),
          locationTime: z.string().describe(
            `Este es el nombre de la ciudad que se quiere obtener la hora actual.
            Te van a pasar el nombre de una ciudad y debes añadir el timezone de la ciudad.
            Por ejemplo,si te pasan "Nueva York" va a ser America/New_York,
            Lima es America/Lima, España es Europe/Madrid, etc.
              `
          ),
          cronograma: z
            .array(
              z.object({
                día: z.number(),
                lugares: z.array(
                  z.object({
                    nombre: z.string(),
                    coordenadas: z.object({
                      latitud: z.number(),
                      longitud: z.number()
                    })
                  })
                )
              })
            )
            .describe(
              `
            Planifica un itinerario de viaje para la cantidad de dias especificado por el usuario
            y en la ciudad especificada por el usuario. 
            Organiza las visitas de manera que estén agrupadas por zonas, 
            de modo que los lugares cercanos entre sí se visiten el mismo día. 
            Para cada día, proporciona una lista de lugares con el nombre del lugar 
            y las coordenadas exactas (latitud y longitud). 
            El itinerario debe estar equilibrado en términos de tiempo y cantidad de visitas por día. 

            El resultado debe estar en un array de objetos, 
            con cada objeto representando un día y conteniendo una lista de lugares.

            Ejemplo de salida:

            [
                {
                    "día": 1,
                    "lugares": [
                        {"nombre": "Parque de Mayo", "coordenadas": {"latitud": -31.527050, "longitud": -68.521380}},
                        {"nombre": "Museo Provincial de Bellas Artes Franklin Rawson", "coordenadas": {"latitud": -31.532120, "longitud": -68.523380}},
                        {"nombre": "Catedral de San Juan", "coordenadas": {"latitud": -31.537320, "longitud": -68.522180}}
                    ]
                },
                {
                    "día": 2,
                    "lugares": [
                        {"nombre": "Bodega Merced del Estero", "coordenadas": {"latitud": -31.531530, "longitud": -68.548520}},
                        {"nombre": "Finca Sierras Azules", "coordenadas": {"latitud": -31.550230, "longitud": -68.555330}},
                        {"nombre": "Museo de la Memoria Urbana", "coordenadas": {"latitud": -31.535050, "longitud": -68.519710}}
                    ]
                },
                {
                    "día": 3,
                    "lugares": [
                        {"nombre": "Dique de Ullum", "coordenadas": {"latitud": -31.454960, "longitud": -68.663200}},
                        {"nombre": "Loma de las Tapias", "coordenadas": {"latitud": -31.447980, "longitud": -68.687330}},
                        {"nombre": "Parque Faunístico", "coordenadas": {"latitud": -31.466670, "longitud": -68.671670}}
                    ]
                }
            ]
              `
            )
        }),
        generate: async function* ({
          locationWeather,
          locationTime,
          cronograma
        }) {
          yield (
            <div>
              <h3>Loading...</h3>
            </div>
          )

          const toolCallId = nanoid()

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
                    args: { locationWeather, locationTime, cronograma }
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
                    result: locationWeather
                  }
                ]
              }
            ]
          })

          return (
            <Bento
              locationWeather={locationWeather}
              locationTime={locationTime}
              cronograma={cronograma}
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
