import path from 'path'

// Определение формата (регистронезависимо: .JSON, .YAML и т.д.)
const getFormat = (filepath) => path.extname(filepath).slice(1).toLowerCase()

export default getFormat