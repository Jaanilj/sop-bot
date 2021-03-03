export default function getCodeBlockString(text: string): string {
  const sanitizedText = text.replace('`', "'")
  return `\`${sanitizedText}\``
}
