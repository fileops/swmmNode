// SwmmModel.test.ts
import { SwmmConvert } from '../src/index'
import { SwmmModel } from '../src/index'
import util from 'util'
import fs from 'fs'

let test_Example1 = './test/data/Example1.inp'
let test_file2 = './test/data/subareaRouting.inp'
let file01 = ''
let subareaRouting = ''

// Prior to running tests, open files and set objects.
beforeAll(async () => {
  const readFile = util.promisify(fs.readFile)
  file01 = await readFile(test_Example1, { encoding: 'utf8' });
  subareaRouting = await readFile(test_file2, { encoding: 'utf8' });
  (global as any).class_main = new SwmmModel(SwmmConvert.parseInput(subareaRouting));
})

////////////////////////////////////////////////////////////////////////////////////////
// Object creation
////////////////////////////////////////////////////////////////////////////////////////

test('Test file opening', () =>{
  expect(subareaRouting).toBeDefined()
})

test('get a value from a key within a table in a model', () =>{
  expect((global as any).class_main.get_table_val('SUBCATCHMENTS', 'DCIA', 'Area')).toEqual(1)
})

test('get an error from a key within a table that does not exist in a model', () =>{
  expect(()=>(global as any).class_main.get_table_val('SUBCATCHMENTs', 'DCIA', 'Area')).toThrow(Error)
})