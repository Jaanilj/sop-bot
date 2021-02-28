import { getEmonji } from '../discord'
import { getStyledCommand } from './commons'

export default function unknownCommandMessage(command: string): string {
  return `Oh no! You used an unknown command ${getStyledCommand(
    command
  )} ${getEmonji('sadcat')}! Use ${getStyledCommand(
    'help'
  )} to list all available commands.`
}
