function getCodeBlockString(text: string): string {
  const sanitizedText = text.replace('`', "'")
  return `\`${sanitizedText}\``
}

function minsToMs(minutes: number): number {
  return Math.floor(minutes * 60 * 1000)
}

function groupBy<T extends {}>(
  items: T[],
  by: (item: T) => number | string
): Record<string, T[]> {
  const counts: Record<string, T[]> = {}
  items.forEach((item: T) => {
    const key = by(item)
    if (key in counts) {
      counts[key]?.push(item)
    } else {
      counts[key] = [item]
    }
  })
  return counts
}

function maxKey<T extends { [key: string]: unknown }>(object: T): string {
  return Object.keys(object).reduce((currentMaxKey, key) =>
    currentMaxKey > key ? currentMaxKey : key
  )
}

export { getCodeBlockString, minsToMs, groupBy, maxKey }
