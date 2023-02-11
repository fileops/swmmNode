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

// Output variables

test('subcatchmentOutputCount', () =>{
  expect((global as any).example1.subcatchmentOutputCount()).toBe(10)
})

test('subcatchmentOutputVariable', () =>{
  expect((global as any).example1.subcatchmentOutputVariable(9)).toBe(9)
})

test('nodeOutputCount', () =>{
  expect((global as any).example1.nodeOutputCount()).toBe(8)
})

test('nodeOutputVariable', () =>{
  expect((global as any).example1.nodeOutputVariable(7)).toBe(7)
})

test('linkOutputCount', () =>{
  expect((global as any).example1.linkOutputCount()).toBe(7)
})

test('linkOutputVariable', () =>{
  expect((global as any).example1.linkOutputVariable(6)).toBe(6)
})

// Start time, time step, time-related functions

test('startTime_swmmFormat', () =>{
  expect((global as any).example1.startTime_swmmFormat()).toBe(35796)
})

test('timeStep', () =>{
  expect((global as any).example1.timeStep()).toBe(3600)
})

test('doubleToDate', () =>{
  expect(SwmmOut.doubleToDate_swmmFormat((global as any).example1.startTime_swmmFormat())).toEqual(new Date("1998-01-01T00:00:00.000Z"))
})

test('startTime', () =>{
  expect((global as any).example1.startTime()).toBe(883612800000)
})

test('startTime to date', () =>{
  expect(new Date((global as any).example1.startTime())).toEqual(new Date("1998-01-01T00:00:00.000Z"))
})

// Output Section

test('dateStep_swmmFormat', () =>{
  expect((global as any).example1.dateStep_swmmFormat(10)).toBe(35796.41666667824)
})

test('get_result', () =>{
  expect((global as any).example1.
    get_result(3, 11, 6, 7))
    .toBe(5.061554431915283)
})