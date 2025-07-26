import { typography } from './typography'

export const resolveTypographyPath = (path: string) => {
  const parts = path.split('.')
  let current = typography

  for (const part of parts) {
    if (current[part] === undefined) {
      console.warn(`Typography path "${path}" not found in theme`)
      return typography.copy.medium // Fallback
    }
    current = current[part]
  }

  return current
}
