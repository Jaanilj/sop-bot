import { MessageEmbed } from 'discord.js'
import { getCodeBlockString } from '../utilities/utilities'
import { color, prefix } from './commons'

export default function helpMessage(): MessageEmbed {
  return new MessageEmbed()
    .setColor(color)
    .setTitle('Bot commands')
    .addFields(
      {
        name: getCodeBlockString(`${prefix}help`),
        value: `Usage: ${prefix}help`,
      },
      {
        name: getCodeBlockString(`${prefix}hello`),
        value: `Usage: ${prefix}hello <target user>`,
      },
      {
        name: getCodeBlockString(`${prefix}poll`),
        value: `Usage: ${prefix}poll "Poll title" option1, option2, ..., option10. Max 10 options`,
      }
    )
}
