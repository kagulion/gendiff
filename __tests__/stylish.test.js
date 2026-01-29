import stylish from '../src/formatters/stylish.js'

test('stylish-форматтер с плоским объектом', () => {
  const diff = [
    { key: 'a', type: 'удалён', value: 1 },
    { key: 'b', type: 'добавлен', value: 2 },
  ]

  const expectedOutput = `{
  - a: 1
  + b: 2
}`

  expect(stylish(diff)).toBe(expectedOutput)
})

test('stylish-форматтер с вложенным объектом', () => {
  const diff = [
    {
      key: 'common',
      type: 'вложенный',
      children: [
        { key: 'a', type: 'не изменён', value: 1 },
        { key: 'b', type: 'обновлён', oldValue: 2, newValue: 3 },
      ],
    },
  ]

  const expected = `{
    common: {
        a: 1
      - b: 2
      + b: 3
    }
}`

  expect(stylish(diff)).toBe(expected)
})
