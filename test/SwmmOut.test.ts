// SwmmOut.tests.ts
import { SwmmOut } from '../src/index'
import util from 'util'
import fs from 'fs'

let test_Example1 = './test/data/Example1.out'

// Prior to running tests, open files and set objects.
beforeAll(async () => {
  const readFile = util.promisify(fs.readFile)
  const file = await readFile(test_Example1);
  (global as any).example1 = new SwmmOut(file.buffer)
})

////////////////////////////////////////////////////////////////////////////////////////
// OPENING RECORDS
////////////////////////////////////////////////////////////////////////////////////////

test('version_alt', () =>{
  expect((global as any).example1.version()).toBe(52002)
})

test('magic1', () =>{
  expect((global as any).example1.magic1()).toBe(516114522)
})

////////////////////////////////////////////////////////////////////////////////////////
// CLOSING RECORDS
////////////////////////////////////////////////////////////////////////////////////////
  
test('ObjectIDNames', () =>{
  expect((global as any).example1.ObjectIDNames()).toBe(28)
})