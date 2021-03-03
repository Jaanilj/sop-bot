import { Message } from 'discord.js'
import getCodeBlockString from '../utilities/utilities'
import { prefix } from './commons'

function getPollOptionNumbers(): string[] {
  return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
}
/**
 * Matches with !poll command syntax that has the form
 * !poll "Poll message" option1, option2, ..., optionN
 */
function getPollRegexp(): RegExp {
  return /^!poll +"([a-zA-Z !,.?]+)" +((?:[^,]+)(?:,[^,]+)+)$/
}

export default function pollMessage(message: Message): string {
  const regExp = getPollRegexp()

  if (!regExp.test(message.content)) {
    return `Poll command syntax ${getCodeBlockString(
      message.content
    )} was not correct. The syntax is ${getCodeBlockString(
      `${prefix}poll "Poll title" option1, option2, ..., option10.`
    )}`
  }

  const [, pollTitle, pollOptionsString] = message.content.match(regExp) ?? []
  if (!pollTitle || !pollOptionsString) {
    return `Poll title ${pollTitle} or ${pollOptionsString} was malformed`
  }
  const pollOptions = pollOptionsString
    .split(',')
    .map((option) => option.trim())
  if (pollOptions.length > 10) {
    return `Poll can have at most 10 options. You gave ${pollOptions.length}.`
  }
  const pollOptionNumbers = getPollOptionNumbers()
  const pollChoices = pollOptions.map(
    (option, index) => `${pollOptionNumbers[index]} = ${option}\n`
  )
  return `
  Poll: ${pollTitle}
  ${['', ...pollChoices].join('  ').slice(2)}
  `
}
