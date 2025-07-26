
import { TypographyTokens } from './types'

export const fonts= {
  family: {
    bold: 'MierS-Bold',
    book: 'MierS-Book',
  },
}


export const typography: TypographyTokens = {
  display: {
    large: {
      fontFamily: fonts.family.bold,
      fontSize: 40,
      lineHeight: 48,
    },
    medium: {
      fontFamily: fonts.family.bold,
      fontSize: 36,
      lineHeight: 43,
    },
    small: {
      fontFamily: fonts.family.bold,
      fontSize: 32,
      lineHeight: 38,
    },
  },
  headline: {
    large: {
      fontFamily: fonts.family.bold,
      fontSize: 28,
      lineHeight: 34,
    },
    medium: {
      fontFamily: fonts.family.bold,
      fontSize: 24,
      lineHeight: 29,
    },
    small: {
      fontFamily: fonts.family.bold,
      fontSize: 20,
      lineHeight: 24,
    },
  },
  title: {
    large: {
      fontFamily: fonts.family.bold,
      fontSize: 18,
      lineHeight: 24,
    },
    medium: {
      fontFamily: fonts.family.bold,
      fontSize: 16,
      lineHeight: 21,
    },
    small: {
      fontFamily: fonts.family.bold,
      fontSize: 14,
      lineHeight: 20,
    },
  },
  copy: {
    large: {
      fontFamily: fonts.family.book,
      fontSize: 18,
      lineHeight: 23,
    },
    medium: {
      fontFamily: fonts.family.book,
      fontSize: 16,
      lineHeight: 21,
    },
    small: {
      fontFamily: fonts.family.book,
      fontSize: 14,
      lineHeight: 20,
    },
  },
  allCaps: {
    large: {
      fontFamily: fonts.family.bold,
      fontSize: 14,
      lineHeight: 14,
      textTransform: 'uppercase',
      letterSpacing: 0.56,
    },
    medium: {
      fontFamily: fonts.family.bold,
      fontSize: 11.5,
      lineHeight: 11.5,
      textTransform: 'uppercase',
      letterSpacing: 0.46,
    },
    small: {
      fontFamily: fonts.family.bold,
      fontSize: 8.5,
      lineHeight: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.34,
    },
  },
  finePrint: {
    large: {
      fontFamily: fonts.family.bold,
      fontSize: 12,
      lineHeight: 16,
    },
    medium: {
      fontFamily: fonts.family.book,
      fontSize: 12,
      lineHeight: 16,
    },
  },
}
