import {
  convertNumberToFormattedString,
  replaceSpecialCharacters,
  capitalCaseWord,
  formatArray,
  padLeadingZeros,
  replaceAt,
  stripPhoneFormatting,
  stripSpaces
} from '@/helpers/string'
import { it, describe, expect } from 'vitest'

describe('String helpers', () => {
  const date = new Date()

  it('replaceSpecialCharacters', () => {
    expect(replaceSpecialCharacters('Hello')).toEqual('Hello')
    expect(replaceSpecialCharacters('â')).toEqual('a')
    expect(replaceSpecialCharacters('123½')).toEqual('123 1/2')
    expect(replaceSpecialCharacters('')).toEqual('')
    expect(replaceSpecialCharacters(undefined)).toEqual(undefined)
    expect(replaceSpecialCharacters(null)).toEqual(null)
    expect(replaceSpecialCharacters(NaN)).toEqual(NaN)
    expect(replaceSpecialCharacters(date)).toBe(date)
  })

  it('capitalCaseWord', () => {
    expect(capitalCaseWord('test')).toEqual('Test')
    expect(capitalCaseWord('a')).toEqual('A')
    expect(capitalCaseWord('')).toEqual('')
    expect(capitalCaseWord(undefined)).toEqual(undefined)
    expect(capitalCaseWord(null)).toEqual(null)
    expect(capitalCaseWord(NaN)).toEqual(NaN)
    expect(capitalCaseWord(date)).toBe(date)
  })

  it('replaceAt', () => {
    expect(replaceAt('Hello', 0, 'J')).toEqual('Jello')
    expect(replaceAt('Hello', 2, '!!')).toEqual('He!!o')
    expect(replaceAt('Hello', 5, 'World')).toEqual('HelloWorld')
    expect(replaceAt('Hello', 999, 'World')).toEqual('HelloWorld')
    expect(replaceAt('Hello', 4, 'World')).toEqual('HellWorld')
    expect(replaceAt(undefined, 4, 'World')).toEqual(undefined)
    expect(replaceAt('Hello', undefined, 'World')).toEqual('Hello')
    expect(replaceAt('Hello', 4, undefined)).toEqual('Hello')
    expect(replaceAt(date, 4, 'World')).toEqual(date)
    expect(replaceAt('Hello', date, 'World')).toEqual('Hello')
    expect(replaceAt('Hello', 4, date)).toEqual('Hello')
  })

  it('stripSpaces', () => {
    expect(stripSpaces('Hello')).toBe('Hello')
    expect(stripSpaces('Hello World')).toBe('HelloWorld')
    expect(stripSpaces('Hello World Again')).toBe('HelloWorldAgain')
    expect(stripSpaces(123)).toBe(123)
    expect(stripSpaces(undefined)).toBe(undefined)
    expect(stripSpaces(null)).toBe(null)
    expect(stripSpaces(NaN)).toBe(NaN)
  })

  it('stripPhoneFormatting', () => {
    expect(stripPhoneFormatting('1234567890')).toBe('1234567890')
    expect(stripPhoneFormatting('(123) 456-7890')).toBe('1234567890')
    expect(stripPhoneFormatting('+1 (123) 456-7890')).toBe('11234567890')
    expect(stripPhoneFormatting('')).toBe('')
    expect(stripPhoneFormatting(undefined)).toBe(undefined)
    expect(stripPhoneFormatting(null)).toBe(null)
    expect(stripPhoneFormatting(NaN)).toBe(NaN)
  })

  it('padLeadingZeros', () => {
    expect(padLeadingZeros(123, 5)).toBe('00123')
    expect(padLeadingZeros('123', 5)).toBe('00123')
    expect(padLeadingZeros('123', 0)).toBe('123')
    expect(padLeadingZeros(undefined, 5)).toBe('00000')
    expect(padLeadingZeros(null, 5)).toBe('00000')
    expect(padLeadingZeros(NaN, 5)).toBe('00000')
    expect(padLeadingZeros(undefined, undefined)).toBe('')
    expect(padLeadingZeros(null, null)).toBe('')
    expect(padLeadingZeros(NaN, NaN)).toBe('')
  })

  it('convertNumberToFormattedString', () => {
    expect(convertNumberToFormattedString(123)).toBe('123')
    expect(convertNumberToFormattedString('123')).toBe('123')
    expect(convertNumberToFormattedString('123.99')).toBe('123.99')
    expect(convertNumberToFormattedString('1234')).toBe('1,234')
    expect(convertNumberToFormattedString(1234.99)).toBe('1,234.99')
    expect(convertNumberToFormattedString('1234.99')).toBe('1,234.99')
    expect(convertNumberToFormattedString(1234.9999)).toBe('1,234.9999')
    expect(convertNumberToFormattedString('1234.9999')).toBe('1,234.9999')
    expect(convertNumberToFormattedString(1234567.9999)).toBe('1,234,567.9999')
    expect(convertNumberToFormattedString('1234567.9999')).toBe('1,234,567.9999')
    expect(convertNumberToFormattedString('1234.')).toBe('1,234.')
    expect(convertNumberToFormattedString('')).toBe('')
    expect(convertNumberToFormattedString(undefined)).toBe(undefined)
    expect(convertNumberToFormattedString(null)).toBe(null)
    expect(convertNumberToFormattedString(NaN)).toBe(NaN)
  })

  it('formatArray', () => {
    expect(formatArray(['A'])).toBe('A')
    expect(formatArray(['A', 'B'])).toBe('A and B')
    expect(formatArray(['A', 'B', 'C'])).toBe('A, B and C')
    expect(formatArray(['A', 'B', 'C', 'D'])).toBe('A, B, C and D')
    expect(formatArray([1, 2, 3, 4])).toBe('1, 2, 3 and 4')
    expect(formatArray(['A', 'B', 'C', 'D'], 'or')).toBe('A, B, C or D')
    expect(formatArray([])).toBe('')
    expect(formatArray(123)).toBe(123)
    expect(formatArray('')).toBe('')
    expect(formatArray(undefined)).toBe(undefined)
    expect(formatArray(null)).toBe(null)
    expect(formatArray(NaN)).toBe(NaN)
  })
})
