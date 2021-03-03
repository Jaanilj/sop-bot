import { Message } from 'discord.js'

const prefix = '!'
const color = '#00D166'

function isCommand(message: Message): boolean {
  return message.content.startsWith(prefix)
}

function getMessageArgs(message: Message): string[] {
  return message.content.slice(prefix.length).trim().split(' ').filter(Boolean)
}

function getCommandKey(message: Message): string {
  const args = getMessageArgs(message)
  const command = args[0]
  return command ?? 'no-command'
}

export { prefix, color, isCommand, getMessageArgs, getCommandKey }
