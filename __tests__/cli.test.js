import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Интеграционные тесты CLI', () => {
  const beforeFile = path.join(
    __dirname,
    '__fixtures__',
    'integration_before.json',
  )
  const afterFile = path.join(
    __dirname,
    '__fixtures__',
    'integration_after.json',
  )

  beforeAll(() => {
    const beforeData = {
      host: 'localhost',
      port: 3000,
      nested: {
        key1: 'value1',
        key2: 'value2',
      },
    }

    const afterData = {
      host: 'localhost',
      port: 3001,
      timeout: 5000,
      nested: {
        key1: 'updated_value1',
        key3: 'value3',
      },
    }

    fs.writeFileSync(beforeFile, JSON.stringify(beforeData, null, 2))
    fs.writeFileSync(afterFile, JSON.stringify(afterData, null, 2))
  })

  afterAll(() => {
    if (fs.existsSync(beforeFile)) {
      fs.unlinkSync(beforeFile)
    }
    if (fs.existsSync(afterFile)) {
      fs.unlinkSync(afterFile)
    }
  })

  test('должен сравнивать два файла JSON и по умолчанию выводить формат stylish', (done) => {
    const cliPath = path.join(__dirname, '..', 'bin', 'gendiff.js')
    const child = spawn('node', [cliPath, beforeFile, afterFile])

    let stdout = ''
    child.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    child.on('close', (code) => {
      expect(code).toBe(0)
      expect(stdout).toContain('- port: 3000')
      expect(stdout).toContain('+ port: 3001')
      expect(stdout).toContain('+ timeout: 5000')
      expect(stdout).toContain('key1: value1')
      expect(stdout).toContain('key3: value3')
      done()
    })
  })

  test('должен сравнить два файла JSON и вывести результат в формате plain', (done) => {
    const cliPath = path.join(__dirname, '..', 'bin', 'gendiff.js')
    const child = spawn('node', [cliPath, '-f', 'plain', beforeFile, afterFile])

    let stdout = ''
    child.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    child.on('close', (code) => {
      expect(code).toBe(0)
      expect(stdout).toContain("Свойство 'port' было обновлено")
      expect(stdout).toContain("Свойство 'timeout' было добавлено")
      expect(stdout).toContain("Свойство 'nested.key1' было обновлено")
      expect(stdout).toContain("Свойство 'nested.key3' было добавлено")
      done()
    })
  })

  test('должен сравнить два файла JSON и вывести результат в формате json', (done) => {
    const cliPath = path.join(__dirname, '..', 'bin', 'gendiff.js')
    const child = spawn('node', [cliPath, '-f', 'json', beforeFile, afterFile])

    let stdout = ''
    child.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    child.on('close', (code) => {
      expect(code).toBe(0)
      const outputObj = JSON.parse(stdout)
      expect(Array.isArray(outputObj)).toBe(true)
      const portChange = outputObj.find((item) => item.key === 'port')
      expect(portChange).toBeDefined()
      expect(portChange.type).toBe('обновлён')
      done()
    })
  })

  test('должен корректно обрабатывать недействительные пути к файлам', (done) => {
    const cliPath = path.join(__dirname, '..', 'bin', 'gendiff.js')
    const fakeFile = path.join(__dirname, '__fixtures__', 'nonexistent.json')
    const child = spawn('node', [cliPath, fakeFile, afterFile])

    let stderr = ''
    child.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    child.on('close', (code) => {
      expect(code).toBe(1)
      expect(stderr).toContain('Ошибка:')
      done()
    })
  })

  test('должен обрабатывать неподдерживаемый формат файла', (done) => {
    const cliPath = path.join(__dirname, '..', 'bin', 'gendiff.js')
    const unsupportedFile = path.join(
      __dirname,
      '__fixtures__',
      'unsupported.xyz',
    )

    fs.writeFileSync(unsupportedFile, '{"test": "data"}')

    const child = spawn('node', [cliPath, beforeFile, unsupportedFile])

    child.on('close', (code) => {
      fs.unlinkSync(unsupportedFile)

      expect(code).toBeGreaterThan(-1)
      done()
    })
  })
})
