import { getEmonji } from '../discord'
import getCodeBlockString from '../utilities/utilities'
import { prefix } from './commons'

export default function unknownCommandMessage(command: string): string {
  return `Oh no! You used an unknown command ${getCodeBlockString(
    `${prefix}${command}`
  )} ${getEmonji('sadcat')}! Use ${getCodeBlockString(
    `${prefix}help`
  )} to list all available commands.`
}
