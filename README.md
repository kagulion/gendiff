# Вычислитель отличий (gendiff)

## О программе

Вычислитель отличий (gendiff) — это консольная утилита и библиотека для сравнения файлов с данными в форматах JSON и YAML. Программа анализирует два файла и показывает различия между ними в удобном для восприятия виде.

## Использование

### CLI

```bash
# Сравнение двух JSON файлов (формат по умолчанию - stylish)
gendiff before.json after.json

# Сравнение двух файлов с указанием формата вывода
gendiff -f stylish before.json after.json
gendiff -f plain before.json after.json
gendiff -f json after.json after.json

# Сравнение файлов в формате YAML
gendiff before.yml after.yml
```

### Примеры

Допустим, у вас есть два файла:

**before.json:**

```json
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.234.123",
  "follow": false
}
```

**after.json:**

```json
{
  "host": "hexlet.io",
  "timeout": 20,
  "verbose": true,
  "proxy": "123.234.234.123"
}
```

Результат выполнения команды `gendiff before.json after.json`:

```
{
    follow: false
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

## Поддерживаемые форматы

- **JSON** — файлы с расширением `.json`
- **YAML/YML** — файлы с расширением `.yaml` или `.yml`

## Форматы вывода

- **stylish** (по умолчанию) — форматированный вывод с иерархией и индикаторами изменений
- **plain** — плоский формат для более простого машинного чтения
- **json** — вывод в формате JSON для дальнейшей обработки

## Структура проекта

```
project/
├── bin/                     // точка входа для CLI
│   └── gendiff.js
├── src/
│   ├── cli.js               // логика запуска CLI
│   ├── genDiff.js           // основная функция сравнения
│   ├── diffObjects.js       // алгоритм вычисления различий
│   ├── formatters/          // форматтеры вывода
│   │   ├── index.js         // диспетчер
│   │   ├── stylish.js
│   │   ├── plain.js
│   │   └── json.js
│   ├── loadData.js          // загрузка и парсинг данных
│   ├── readFile.js          // чтение файлов
│   ├── parsers.js           // парсеры для разных форматов
│   ├── getFormat.js         // определение формата файла
│   └── isObject.js          // проверка, является ли значение объектом
├── __tests__/
│   ├── __fixtures__/
│   ├── diffObject.test.js
│   ├── stylish.test.js
│   ├── plain.test.js
│   ├── json.test.js
│   └── cli.test.js
├── index.js                 // точка входа для импорта как библиотеки
├── package.json
└── README.md
```

## Зависимости

### Рабочие зависимости

- commander — для создания CLI интерфейса
- js-yaml — для парсинга YAML файлов

### Зависимости для разработки

- jest — для написания тестов
- eslint — для проверки качества кода
- prettier — для форматирования кода

## Запуск

### Установка зависимостей

```bash
npm install
```

### Запуск тестов

```bash
npm test
```

### Запуск CLI

```bash
gendiff <filepath1> <filepath2>
```
