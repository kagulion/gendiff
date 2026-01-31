import { program } from 'commander'
import renderDiff from './index.js'

program
  .name('Вычислитель отличий')
  .description('Сравнивает содержимое двух файлов и выводит различия')
  .version('1.0.0')
  .argument('<filepath1>', 'путь к первому файлу')
  .argument('<filepath2>', 'путь ко второму файлу')
  .option(
    '-f, --format <type>',
    'output format (stylish, plain, json)',
    'stylish',
  )
  .action((filepath1, filepath2, options) => {
    try {
      const output = renderDiff(filepath1, filepath2, options.format)
      console.log(output)
    } catch (err) {
      console.error(`Ошибка: ${err.message}`)
      process.exit(1)
    }
  })

program.parse(process.argv)
