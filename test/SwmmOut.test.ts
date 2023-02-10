// SwmmOut.tests.ts
import { SwmmOut } from '../src/index'
const fs = require('fs')

test('version', () =>{
  // Read a .out file and initialize swmmOut with it
  let outFile = './test/data/Example1.out'
  fs.readFile(outFile, (err:any, data:any) => {
    if(err) throw err
    expect(new SwmmOut(data.buffer).version()).toBe(52002)
  })
})

test('magic1', () =>{
  // Read a .out file and initialize swmmOut with it
  let outFile = './test/data/Example1.out'
  fs.readFile(outFile, (err:any, data:any) => {
    if(err) throw err
    expect(new SwmmOut(data.buffer).magic1()).toBe(516114522)
  })
})

