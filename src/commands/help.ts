import { MessageEmbed } from 'discord.js'
import { color, getStyledCommand, prefix } from './commons'

export default function helpMessage(): MessageEmbed {
  return new MessageEmbed()
    .setColor(color)
    .setTitle('Bot commands')
    .addFields(
      { name: getStyledCommand('help'), value: `Usage: ${prefix}help` },
      {
        name: getStyledCommand('hello'),
        value: `Usage: ${prefix}hello <target user>`,
      }
    )
}
