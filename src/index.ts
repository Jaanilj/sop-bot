import { config } from 'dotenv'
import { getCommandKey, isCommand } from './commands/commons'
import helloMessage from './commands/hello'
import helpMessage from './commands/help'
import { pollMessage, getPollNumbers } from './commands/poll'
import unknownCommandMessage from './commands/unknown'
import { client, getEmonji } from './discord'
import { minsToMs, groupBy, maxKey } from './utilities/utilities'

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
      const botMessage = await message.reply(pollMessage(message))
      setTimeout(async () => {
        const channelId = botMessage.channel.id
        const messageId = botMessage.id
        const botChannel = await client.channels.fetch(channelId)
        if (botChannel && botChannel.isText()) {
          const originalBotPollMsg = await botChannel.messages.fetch(messageId)
          const reactions = originalBotPollMsg.reactions.cache
            .array()
            .filter((reaction) =>
              getPollNumbers().includes(reaction.emoji.name)
            )
          const reactionCounts = groupBy(
            reactions,
            (reaction) => reaction.count ?? 0
          )
          const maxCount = maxKey(reactionCounts)
          const winnerReactions = reactionCounts[maxCount]
          if (winnerReactions) {
            if (winnerReactions.length === 1) {
              await botChannel.send(
                `Poll has ended! Winner was option ${winnerReactions[0]?.emoji}!`
              )
            } else {
              await botChannel.send(
                `Poll has ended! It's a ${
                  winnerReactions.length
                }-way tie between options ${winnerReactions
                  .map((reaction) => reaction.emoji)
                  .join(', ')}`
              )
            }
          } else {
            await botChannel.send(
              `Poll has ended, but there were no votes...${getEmonji('sadcat')}`
            )
          }
        }
      }, minsToMs(0.5))
      return
    }
    default:
      await message.reply(unknownCommandMessage(command))
  }
})

client.login(token)
