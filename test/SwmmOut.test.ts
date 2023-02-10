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

test('version_alt', () =>{
  expect((global as any).example1.version()).toBe(52002)
})

test('magic1', () =>{
  // Read a .out file and initialize swmmOut with it
  let outFile = './test/data/Example1.out'
  fs.readFile(outFile, (err:any, data:any) => {
    if(err) throw err
    expect(new SwmmOut(data.buffer).magic1()).toBe(516114522)
  })
})

////////////////////////////////////////////////////////////////////////////////////////
// CLOSING RECORDS
////////////////////////////////////////////////////////////////////////////////////////
  
  /**
  * Returns the memory position of the Object ID names, 
  * relative to the start of the SwmmOut object.
  *
  * @return {number} Integer. byte position of Object ID names.
  */
  test('ObjectIDNames', () =>{
    // Read a .out file and initialize swmmOut with it
    let outFile = './test/data/Example1.out'
    fs.readFile(outFile, (err:any, data:any) => {
      if(err) throw err
      expect(new SwmmOut(data.buffer).ObjectIDNames()).toBe(28)
    })
  })