import path from 'path'

// Определение формата
const getFormat = (filepath) => path.extname(filepath).slice(1)

export default getFormat