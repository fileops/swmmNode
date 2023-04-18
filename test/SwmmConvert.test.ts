// SwmmOut.test.ts
import { SwmmConvert } from '../src/index'
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
  (global as any).class_main = new SwmmConvert();
})

let v=['1', '00']

////////////////////////////////////////////////////////////////////////////////////////
// Object creation
////////////////////////////////////////////////////////////////////////////////////////

test('Test file opening', () =>{
  expect(subareaRouting).toEqual('')
})

test('create a JSON object from an inp', () =>{
  //expect((global as any).class_main.parseInput(file01)).toEqual(0.25)
  expect(SwmmConvert.parseInput(file01)).toBeDefined()
})

test('test proper timeseries translation', () =>{
  expect(SwmmConvert.parseInput(subareaRouting).TIMESERIES).toBeDefined()
})