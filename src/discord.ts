import { Client, GuildEmoji } from 'discord.js'

const client = new Client()

function getEmonji(emonjiName: string): GuildEmoji | string {
  switch (emonjiName) {
    case 'sadcat':
      return (
        client.emojis.cache.get('815305946887749662') ?? '[Emoji not found]'
      )
    case 'heart':
      return '❤️'
    default:
      return '[Emoji not found]'
  }
}

export { client, getEmonji }
