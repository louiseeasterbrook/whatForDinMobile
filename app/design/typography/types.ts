interface FontSize {
  fontSize: number
  lineHeight: number
  letterSpacing?: number
}
type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none'

interface TypographyVariant extends FontSize {
  fontFamily: string
  textTransform?: TextTransform
}

export interface TypographyTokens {
  display: {
    large: TypographyVariant
    medium: TypographyVariant
    small: TypographyVariant
  }
  headline: {
    large: TypographyVariant
    medium: TypographyVariant
    small: TypographyVariant
  }
  title: {
    large: TypographyVariant
    medium: TypographyVariant
    small: TypographyVariant
  }
  copy: {
    large: TypographyVariant
    medium: TypographyVariant
    small: TypographyVariant
  }
  allCaps: {
    large: TypographyVariant
    medium: TypographyVariant
    small: TypographyVariant
  }
  finePrint: {
    large: TypographyVariant
    medium: TypographyVariant
  }
}

type PathsFor<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? `${string & K}.${PathsFor<T[K]>}`
    : string & K
}[keyof T]

export type TypographyPath = PathsFor<TypographyTokens>
