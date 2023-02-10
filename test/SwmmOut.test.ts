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
  expect((global as any).example1.version()).toBe(52001)
})

test('magic1', () =>{
  expect((global as any).example1.magic1()).toBe(516114522)
})

test('flowUnitCode', () =>{
  expect((global as any).example1.flowUnitCode()).toBe(0)
})

test('subcatchmentCount', () =>{
  expect((global as any).example1.subcatchmentCount()).toBe(8)
})

test('nodeCount', () =>{
  expect((global as any).example1.nodeCount()).toBe(14)
})

test('linkCount', () =>{
  expect((global as any).example1.linkCount()).toBe(13)
})

test('pollutantCount', () =>{
  expect((global as any).example1.pollutantCount()).toBe(2)
})

////////////////////////////////////////////////////////////////////////////////////////
// CLOSING RECORDS
////////////////////////////////////////////////////////////////////////////////////////
  
test('objectIDNames', () =>{
  expect((global as any).example1.objectIDNames()).toBe(28)
})

test('objectProperties', () =>{
  expect((global as any).example1.objectProperties()).toBe(246)
})

test('computedResults', () =>{
  expect((global as any).example1.computedResults()).toBe(942)
})

test('reportingPeriods', () =>{
  expect((global as any).example1.reportingPeriods()).toBe(36)
})

test('errorCode', () =>{
  expect((global as any).example1.errorCode()).toBe(0)
})

test('magic2', () =>{
  expect((global as any).example1.magic2()).toBe(516114522)
})



////////////////////////////////////////////////////////////////////////////////////////
// Object IDs (names)
////////////////////////////////////////////////////////////////////////////////////////
    
test('subcatchmentName', () =>{
  expect((global as any).example1.subcatchmentName(2)).toBe('3')
})

test('nodeName', () =>{
  expect((global as any).example1.nodeName(1)).toBe('10')
})

test('linkName', () =>{
  expect((global as any).example1.linkName(5)).toBe('8')
})

test('pollutantName', () =>{
  expect((global as any).example1.pollutantName(1)).toBe('Lead')
})

test('pollutantConcentrationUnits', () =>{
  expect((global as any).example1.pollutantConcentrationUnits(1)).toBe(1)
})

////////////////////////////////////////////////////////////////////////////////////////
// Descriptor variables
////////////////////////////////////////////////////////////////////////////////////////

// Subcatchments

test('subcatchmentInputCount', () =>{
  expect((global as any).example1.subcatchmentInputCount()).toBe(1)
})

test('subcatchmentInputType', () =>{
  expect((global as any).example1.subcatchmentInputType(0)).toBe(1)
})

test('subcatchmentArea', () =>{
  expect((global as any).example1.subcatchmentArea(2)).toBe(5)
})

// Nodes

test('nodeInputCount', () =>{
  expect((global as any).example1.nodeInputCount()).toBe(3)
})

test('nodeInputType', () =>{
  expect((global as any).example1.nodeInputType(1)).toBe(2)
})

test('nodeType', () =>{
  expect((global as any).example1.nodeType(1)).toBe(0)
})

test('nodeInvertElevation', () =>{
  expect((global as any).example1.nodeInvertElevation(1)).toBe(995)
})

test('nodeMaximumDepth', () =>{
  expect((global as any).example1.nodeMaximumDepth(1)).toBe(3)
})

// Links

test('linkInputCount', () =>{
  expect((global as any).example1.linkInputCount()).toBe(5)
})

test('linkInputType', () =>{
  expect((global as any).example1.linkInputType(4)).toBe(5)
})

test('linkType', () =>{
  expect((global as any).example1.linkType(10)).toBe(0)
})

test('linkUpstreamInvertOffset', () =>{
  expect((global as any).example1.linkUpstreamInvertOffset(10)).toBe(0)
})

test('linkDownstreamInvertOffset', () =>{
  expect((global as any).example1.linkDownstreamInvertOffset(10)).toBe(0)
})

test('linkMaximumDepth', () =>{
  expect((global as any).example1.linkMaximumDepth(9)).toBe(1.5)
})

test('linkLength', () =>{
  expect((global as any).example1.linkLength(9)).toBe(400)
})