import 'server-only'

import {
  ClearDay,
  Drizzle,
  Fog,
  Haze,
  Rain,
  Smoke,
  Snow,
  ThunderstormsRain
} from '@/icons'

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
import { EventsSkeleton } from '@/components/stocks/events-skeleton'
import { Events } from '@/components/stocks/events'
import { StocksSkeleton } from '@/components/stocks/stocks-skeleton'
import { Stocks } from '@/components/stocks/stocks'
import { StockSkeleton } from '@/components/stocks/stock-skeleton'
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
import WeatherCard from '@/components/weather/weather-card'
import moment from 'moment-timezone'

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
    Tu eres un bot de viajes, y le das información actualizada de clima, hora, fechas y ciudades a los usuarios.
    Tu y el usuario pueden hablar sobre el clima, la hora, fechas y ciudades. El usuario puede obtener información actualizada de clima, hora, fechas y ciudades.

    Si el usuario pide una hora actual de una ciudad en particular, llama a \'show_time\' para obtener la hora actual de esa ciudad.
    Si el usuario pide información actualizada de clima, llama a \'show_weather\' para obtener la información actualizada de clima.
    
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
      show_weather: {
        description:
          'Obtiene la información actualizada de clima de una ciudad.',
        parameters: z.object({
          location: z.string().describe(
            `Este es el nombre de la ciudad que se quiere obtener la información actualizada de clima. 
              Te van a pasar el nombre de una ciudad y lo debes convertir a Nombre de la ciudad y código del país divididos por coma 
              (utilice códigos de país ISO 3166). 
              Por ejemplo, si quieres obtener la información actualizada de clima de Londres, debes pasar "London,uk".
              `
          )
        }),
        generate: async function* ({ location }) {
          yield (
            <div>
              <h3>Loading...</h3>
            </div>
          )

          const toolCallId = nanoid()

          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=es&units=metric&APPID=${process.env.WEATHER_API_KEY}`
          )
          const data = await res.json()
          const { temp, temp_min, temp_max } = data.main
          const city = data.name
          const icon = data.weather[0].main

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
                    toolName: 'show_weather',
                    toolCallId,
                    args: { location }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'show_weather',
                    toolCallId,
                    result: location
                  }
                ]
              }
            ]
          })

          return (
            <WeatherCard
              city={city}
              temp={temp}
              temp_min={temp_min}
              temp_max={temp_max}
              icon={icon}
            />
          )
        }
      },
      show_time: {
        description:
          'Obtiene la información actualizada de la hora de una ciudad.',
        parameters: z.object({
          locationTime: z.string().describe(
            `Este es el nombre de la ciudad que se quiere obtener la hora actual.
            Te van a pasar el nombre de una ciudad y debes añadir el timezone de la ciudad.
            Por ejemplo,si te pasan "Nueva York" va a ser America/New_York,
            Lima es America/Lima, España es Europe/Madrid, etc.
              `
          )
        }),
        generate: async function* ({ locationTime }) {
          console.log(locationTime)

          yield (
            <div>
              <h3>Loading...</h3>
            </div>
          )

          const toolCallId = nanoid()

          const res = await fetch(
            `https://worldtimeapi.org/api/timezone/${locationTime}`
          )
          const { datetime } = await res.json()
          const time = moment.tz(datetime, locationTime).format('h:mmA')

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
                    toolName: 'show_weather',
                    toolCallId,
                    args: { locationTime }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'show_weather',
                    toolCallId,
                    result: locationTime
                  }
                ]
              }
            ]
          })

          return (
            <div>
              <h1>
                La hora actual de {locationTime} es {time}
              </h1>
            </div>
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
