import genDiff from './index.js'

const obj1 = {
  a: 1,
  b: 2,
}

const obj2 = {
  b: 3,
  c: 4,
}

console.log(genDiff(obj1, obj2))
