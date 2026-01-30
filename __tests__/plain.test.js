import plain from '../src/formatters/plain.js'
import genDiff from '../src/genDiff.js'

test('plain-форматтер: полный вывод для фикстур', () => {
  const diff = genDiff(
    '__tests__/__fixtures__/before.json',
    '__tests__/__fixtures__/after.json',
  )
  const result = plain(diff)

  const expected = `Свойство 'common.follow' было добавлено со значением: false
Свойство 'common.setting2' было удалено
Свойство 'common.setting3' было обновлено. С true на [complex value]
Свойство 'common.setting4' было добавлено со значением: 'blah blah'
Свойство 'common.setting5' было добавлено со значением: [complex value]
Свойство 'common.setting6.ops' было добавлено со значением: 'vops'
Свойство 'follow' было удалено
Свойство 'group1.baz' было обновлено. С 'bas' на 'bars'
Свойство 'group1.nest' было обновлено. С [complex value] на 'str'
Свойство 'group2' было удалено
Свойство 'group3' было добавлено со значением: [complex value]
Свойство 'proxy' было удалено
Свойство 'timeout' было обновлено. С 50 на 20
Свойство 'verbose' было добавлено со значением: true`

  expect(result).toBe(expected)
})
