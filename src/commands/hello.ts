import { Message } from 'discord.js'
import { getEmonji } from '../discord'
import { getMessageArgs } from './commons'

export default function helloMessage(message: Message): string {
  const args = getMessageArgs(message)
  const positionalArgCount = args.length - 1
  const userMentionCount = message.mentions.users.size

  if (userMentionCount === 0 || positionalArgCount === 0) {
    return `No target user specified!`
  }
  if (userMentionCount > 1 || positionalArgCount > 1) {
    return 'More than one target user or command argument specified!'
  }
  const targetUser = message.mentions.users.first()
  return `Hello ${targetUser} from ${message.author} ${getEmonji('heart')}!`
}
