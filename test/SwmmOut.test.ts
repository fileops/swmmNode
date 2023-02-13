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

test('subcatchmentName index out of bounds', () =>{
  expect(() =>(global as any).example1.subcatchmentName(-1)).toThrow(Error)
})

test('nodeName', () =>{
  expect((global as any).example1.nodeName(1)).toBe('10')
})

test('nodeName index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.nodeName(-1)).toThrow(Error)
})

test('nodeName index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.nodeName(1000)).toThrow(Error)
})

test('linkName', () =>{
  expect((global as any).example1.linkName(5)).toBe('8')
})

test('linkName index is out of bounds', () =>{
  expect(()=>(global as any).example1.linkName(-1)).toThrow(Error)
})

test('pollutantName', () =>{
  expect((global as any).example1.pollutantName(1)).toBe('Lead')
})

test('pollutantName index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.pollutantName(-1)).toThrow(Error)
})

test('pollutantName index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.pollutantName(1000)).toThrow(Error)
})

test('pollutantConcentrationUnits', () =>{
  expect((global as any).example1.pollutantConcentrationUnits(0)).toBe('mg/L')
})

test('pollutantConcentrationUnits index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.pollutantConcentrationUnits(-1)).toThrow(Error)
})

test('pollutantConcentrationUnits index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.pollutantConcentrationUnits(1000)).toThrow(Error)
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

test('subcatchmentInputType index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.subcatchmentInputType(-1)).toThrow(Error)
})

test('subcatchmentInputType index out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.subcatchmentInputType(1000)).toThrow(Error)
})

test('subcatchmentArea', () =>{
  expect((global as any).example1.subcatchmentArea(2)).toBe(5)
})

test('subcatchmentArea index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.subcatchmentArea(-1)).toThrow(Error)
})

test('subcatchmentArea index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.subcatchmentArea(1000)).toThrow(Error)
})

// Nodes

test('nodeInputCount', () =>{
  expect((global as any).example1.nodeInputCount()).toBe(3)
})

test('nodeInputType', () =>{
  expect((global as any).example1.nodeInputType(1)).toBe(2)
})

test('nodeInputType index out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.nodeInputType(-1)).toThrow(Error)
})

test('nodeInputType index out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.nodeInputType(1000)).toThrow(Error)
})

test('nodeType', () =>{
  expect((global as any).example1.nodeType(1)).toBe(0)
})

test('nodeType index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.nodeType(-1)).toThrow(Error)
})

test('nodeType index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.nodeType(1000)).toThrow(Error)
})

test('nodeTypeString', () =>{
  expect((global as any).example1.nodeTypeString(1)).toBe('Junction')
})

test('nodeTypeString index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.nodeTypeString(-1)).toThrow(Error)
})

test('nodeTypeString index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.nodeTypeString(1000)).toThrow(Error)
})

test('nodeInvertElevation', () =>{
  expect((global as any).example1.nodeInvertElevation(1)).toBe(995)
})

test('nodeInvertElevation index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.nodeInvertElevation(-1)).toThrow(Error)
})

test('nodeInvertElevation index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.nodeInvertElevation(1000)).toThrow(Error)
})

test('nodeMaximumDepth', () =>{
  expect((global as any).example1.nodeMaximumDepth(1)).toBe(3)
})

test('nodeMaximumDepth index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.nodeMaximumDepth(-1)).toThrow(Error)
})

test('nodeMaximumDepth index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.nodeMaximumDepth(1000)).toThrow(Error)
})

// Links

test('linkInputCount', () =>{
  expect((global as any).example1.linkInputCount()).toBe(5)
})

test('linkInputType', () =>{
  expect((global as any).example1.linkInputType(4)).toBe(5)
})

test('linkInputType index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.linkInputType(-1)).toThrow(Error)
})

test('linkInputType index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.linkInputType(1000)).toThrow(Error)
})

test('linkType', () =>{
  expect((global as any).example1.linkType(10)).toBe(0)
})

test('linkType index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.linkType(-1)).toThrow(Error)
})

test('linkType index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.linkType(1000)).toThrow(Error)
})

test('linkTypeString', () =>{
  expect((global as any).example1.linkTypeString(10)).toBe('Conduit')
})

test('linkTypeString index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.linkTypeString(-1)).toThrow(Error)
})

test('linkTypeString index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.linkTypeString(1000)).toThrow(Error)
})

test('linkUpstreamInvertOffset', () =>{
  expect((global as any).example1.linkUpstreamInvertOffset(10)).toBe(0)
})

test('linkUpstreamInvertOffset index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.linkUpstreamInvertOffset(-1)).toThrow(Error)
})

test('linkUpstreamInvertOffset index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.linkUpstreamInvertOffset(1000)).toThrow(Error)
})

test('linkDownstreamInvertOffset', () =>{
  expect((global as any).example1.linkDownstreamInvertOffset(10)).toBe(0)
})

test('linkDownstreamInvertOffset index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.linkDownstreamInvertOffset(-1)).toThrow(Error)
})

test('linkDownstreamInvertOffset index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.linkDownstreamInvertOffset(1000)).toThrow(Error)
})

test('linkMaximumDepth', () =>{
  expect((global as any).example1.linkMaximumDepth(9)).toBe(1.5)
})

test('linkMaximumDepth index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.linkMaximumDepth(-1)).toThrow(Error)
})

test('linkMaximumDepth index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.linkMaximumDepth(1000)).toThrow(Error)
})

test('linkLength', () =>{
  expect((global as any).example1.linkLength(9)).toBe(400)
})

test('linkLength index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.linkLength(-1)).toThrow(Error)
})

test('linkLength index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.linkLength(1000)).toThrow(Error)
})

// Output variables

test('subcatchmentOutputCount', () =>{
  expect((global as any).example1.subcatchmentOutputCount()).toBe(10)
})

test('subcatchmentOutputVariable', () =>{
  expect((global as any).example1.subcatchmentOutputVariable(9)).toBe(9)
})

test('subcatchmentOutputVariable index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.subcatchmentOutputVariable(-1)).toThrow(Error)
})

test('subcatchmentOutputVariable index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.subcatchmentOutputVariable(1000)).toThrow(Error)
})

test('nodeOutputCount', () =>{
  expect((global as any).example1.nodeOutputCount()).toBe(8)
})

test('nodeOutputVariable', () =>{
  expect((global as any).example1.nodeOutputVariable(7)).toBe(7)
})

test('nodeOutputVariable index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.nodeOutputVariable(-1)).toThrow(Error)
})

test('nodeOutputVariable index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.nodeOutputVariable(1000)).toThrow(Error)
})

test('linkOutputCount', () =>{
  expect((global as any).example1.linkOutputCount()).toBe(7)
})

test('linkOutputVariable', () =>{
  expect((global as any).example1.linkOutputVariable(6)).toBe(6)
})

test('linkOutputVariable index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.linkOutputVariable(-1)).toThrow(Error)
})

test('linkOutputVariable index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.linkOutputVariable(1000)).toThrow(Error)
})

test('systemOutputVariable', () =>{
  expect((global as any).example1.systemOutputVariable(6)).toBe(0)
})

test('systemOutputVariable index is out of bounds (-1)', () =>{
  expect(()=>(global as any).example1.systemOutputVariable(-1)).toThrow(Error)
})

test('systemOutputVariable index is out of bounds (1000)', () =>{
  expect(()=>(global as any).example1.systemOutputVariable(1000)).toThrow(Error)
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

test('doubleDateToString_swmmFormat', () =>{
  expect(SwmmOut.doubleDateToString_swmmFormat((global as any).example1.dateStep_swmmFormat(10))).toEqual("01/01/1998 10:00:00")
})

test('swmmStepToDate', () =>{
  expect((global as any).example1.swmmStepToDate(10)).toEqual("01/01/1998 10:00:00")
})


test('startTime_Unix', () =>{
  expect((global as any).example1.startTime_Unix()).toBe(883612800000)
})

test('startTime_Unix to date', () =>{
  expect(new Date((global as any).example1.startTime_Unix())).toEqual(new Date("1998-01-01T00:00:00.000Z"))
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

test('subcatchmentOutput', () =>{
  expect((global as any).example1.
   subcatchmentOutput(3, 6, 7))
    .toBe(0)
})

test('nodeOutput', () =>{
  expect((global as any).example1.
  nodeOutput(11, 6, 7))
    .toBe(147.02984619140625)
})

test('linkOutput', () =>{
  expect((global as any).example1.
  linkOutput(11, 6, 7))
    .toBe(5.061554431915283)
})

test('sysOutput', () =>{
  expect((global as any).example1.
  sysOutput(11, 6, 7))
    .toBe(4.341998100280762)
})

test('linkOutput compare test 1', () =>{
  expect((global as any).example1.
  linkOutput(2, 0, 0))
    .toBe(1.24)
})

test('linkOutput out of bounds 1', () =>{
  expect((global as any).example1.
  linkOutput(36, 0, 0))
    .toBe(5.061554431915283)
})

test('linkOutput out of bounds 2', () =>{
  expect((global as any).example1.
  linkOutput(36, 0, 1))
    .toBe(5.061554431915283)
})