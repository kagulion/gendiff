import fs from 'fs'
import path from 'path'

// Чтение файла по пути
const readFile = (filepath) => {
  const absolutePath = path.resolve(filepath)

  return fs.readFileSync(absolutePath, 'utf-8')
}

export default readFile