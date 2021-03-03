import { config } from 'dotenv'
import { getCommandKey, isCommand } from './commands/commons'
import helloMessage from './commands/hello'
import helpMessage from './commands/help'
import pollMessage from './commands/poll'
import unknownCommandMessage from './commands/unknown'
import { client } from './discord'

const { error } = config()

if (error) {
  throw new Error('Parsing of .env config failed')
}

const token = process.env.DISCORD_TOKEN

if (!token) {
  throw new Error(`Discord bot cannot be started without DISCORD_TOKEN`)
}

client.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log(`Bot started...`)
})

client.on('message', async (message) => {
  if (!isCommand(message) || message.author.bot) {
    return
  }

  const command = getCommandKey(message)

  switch (command) {
    case 'help':
      await message.reply(helpMessage())
      return
    case 'hello':
      await message.reply(helloMessage(message))
      return
    case 'poll': {
      await message.reply(pollMessage(message))
      return
    }
    default:
      await message.reply(unknownCommandMessage(command))
  }
})

client.login(token)
