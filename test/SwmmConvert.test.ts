// SwmmOut.test.ts
import { SwmmConvert } from '../src/index'
import util from 'util'
import fs from 'fs'

let test_Example1 = './test/data/Example1.inp'
let file01 = ''

// Prior to running tests, open files and set objects.
beforeAll(async () => {
  const readFile = util.promisify(fs.readFile)
  file01 = await readFile(test_Example1, { encoding: 'utf8' });
  (global as any).class_main = new SwmmConvert();
})

////////////////////////////////////////////////////////////////////////////////////////
// Object creation
////////////////////////////////////////////////////////////////////////////////////////

test('Test file opening', () =>{
  expect(file01).toBeDefined()//.toEqual('')
})

test('create a JSON object from an inp', () =>{
  //expect((global as any).class_main.parseInput(file01)).toEqual(0.25)
  expect(SwmmConvert.parseInput(file01)).toBeDefined()
})

