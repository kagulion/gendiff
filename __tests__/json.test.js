import genDiff from '../src/genDiff.js'
import json from '../src/formatters/json.js'

test('json formatter', () => {
  const diff = genDiff(
    '__tests__/__fixtures__/before.json',
    '__tests__/__fixtures__/after.json',
  )
  const result = json(diff)

  expect(() => JSON.parse(result)).not.toThrow()

  const parsed = JSON.parse(result)
  expect(Array.isArray(parsed)).toBe(true)
})
