// SwmmDat.test.ts
import { SwmmDat } from '../src/index'
import util from 'util'
import fs from 'fs'

let test_Example1 = './test/data/rg_data01.dat'
let test_Example2 = './test/data/rg_data02.dat'
let test_Example3 = './test/data/rg_data03.dat'

// Prior to running tests, open files and set objects.
beforeAll(async () => {
  const readFile = util.promisify(fs.readFile)
  const file01 = await readFile(test_Example1, { encoding: 'utf8' });
  const file02 = await readFile(test_Example2, { encoding: 'utf8' });
  const file03 = await readFile(test_Example3, { encoding: 'utf8' });
  (global as any).rg_data01 = new SwmmDat(file01);
  (global as any).rg_data02 = new SwmmDat(file02);
  (global as any).rg_data03 = new SwmmDat(file03);
})

////////////////////////////////////////////////////////////////////////////////////////
// Object creation
////////////////////////////////////////////////////////////////////////////////////////

test('construct from .dat file (contents)', () =>{
  expect((global as any).rg_data01.contents.get('RG_X').get(883616400000)).toEqual(0.25)
})

test('stringify', () =>{
  expect((global as any).rg_data01.stringify()).toEqual(`;Notes go here
; here's a second line of notes.
RG_X 1998 01 01 00 00 0
RG_X 1998 01 01 01 00 0.25
RG_X 1998 01 01 02 00 0.5
RG_X 1998 01 01 03 00 0.8
RG_X 1998 01 01 04 00 1.6
RG_X 1998 01 01 05 00 0.1
RG_X 1998 01 01 06 00 0
RG_X 1998 01 02 03 00 0
RG_X 1998 01 02 04 00 0.4
RG_X 1998 01 02 05 00 0.2
RG_X 1998 01 02 06 00 0
RG_Y 1998 01 01 00 00 0
RG_Y 1998 01 01 01 00 1.25
RG_Y 1998 01 01 02 00 1.5
RG_Y 1998 01 01 03 00 1.8
RG_Y 1998 01 01 04 00 2.6
RG_Y 1998 01 01 05 00 1.1
RG_Y 1998 01 01 06 00 0
RG_Y 1998 01 02 03 00 0
RG_Y 1998 01 02 04 00 1.4
RG_Y 1998 01 02 05 00 1.2
RG_Y 1998 01 02 06 00 0
`)
})

test('subGage RG_Y', () => {
  expect((global as any).rg_data01.subGage("RG_Y").stringify()).toEqual(`;Notes go here
; here's a second line of notes.
RG_Y 1998 01 01 00 00 0
RG_Y 1998 01 01 01 00 1.25
RG_Y 1998 01 01 02 00 1.5
RG_Y 1998 01 01 03 00 1.8
RG_Y 1998 01 01 04 00 2.6
RG_Y 1998 01 01 05 00 1.1
RG_Y 1998 01 01 06 00 0
RG_Y 1998 01 02 03 00 0
RG_Y 1998 01 02 04 00 1.4
RG_Y 1998 01 02 05 00 1.2
RG_Y 1998 01 02 06 00 0
`)
})

test('subRange 1998 01 01 02 00 to 1998 01 01 06 00', () => {
  expect((global as any).rg_data01.subRange(883620000000, 883634400000).stringify()).toEqual(`;Notes go here
; here's a second line of notes.
RG_X 1998 01 01 02 00 0.5
RG_X 1998 01 01 03 00 0.8
RG_X 1998 01 01 04 00 1.6
RG_X 1998 01 01 05 00 0.1
RG_X 1998 01 01 06 00 0
RG_Y 1998 01 01 02 00 1.5
RG_Y 1998 01 01 03 00 1.8
RG_Y 1998 01 01 04 00 2.6
RG_Y 1998 01 01 05 00 1.1
RG_Y 1998 01 01 06 00 0
`)
})

////////////////////////////////////////////////////////////////////////////////////////
// Locate storms
////////////////////////////////////////////////////////////////////////////////////////

test('findSubStorms RG1', () => {
  expect(SwmmDat.findSubStorms((global as any).rg_data02.contents.get('RG1'), 1000*60*60*24, 0.1)).toEqual([{"end": 883612800000, "start": 883612800000, "vol": 1}, {"end": 883872000000, "start": 883872000000, "vol": 1}, {"end": 883958400000, "start": 883958400000, "vol": 1}, {"end": 884131200000, "start": 884131200000, "vol": 1}, {"end": 884217600000, "start": 884217600000, "vol": 1}, {"end": 884304000000, "start": 884304000000, "vol": 1}, {"end": 884476800000, "start": 884476800000, "vol": 1}, {"end": 884563200000, "start": 884563200000, "vol": 1}])
})

test('findStorms RG1', () => {
  expect(SwmmDat.findStorms((global as any).rg_data02.contents.get('RG1'), 1000*60*60*2, 0.1)).toEqual([{"begin": 883612800000, "end": 883612800000}, {"begin": 883872000000, "end": 883872000000}, {"begin": 883958400000, "end": 883958400000}, {"begin": 884131200000, "end": 884131200000}, {"begin": 884217600000, "end": 884217600000}, {"begin": 884304000000, "end": 884304000000}, {"begin": 884476800000, "end": 884476800000}, {"begin": 884563200000, "end": 884563200000}])
})

test('findStorms RG3', () => {
  expect(SwmmDat.findStorms((global as any).rg_data03.contents.get('127069'), 1000*60*60*2, 0.1)).toBeDefined()
})

test('findStormsPretty RG1', () => {
  expect(SwmmDat.findStormsPretty((global as any).rg_data02.contents.get('RG1'), 1000*60*60*24, 0.1)).toEqual([{"begin": "01/01/1998 00:00:00", "end": "01/01/1998 00:00:00"}, {"begin": "01/04/1998 00:00:00", "end": "01/04/1998 00:00:00"}, {"begin": "01/05/1998 00:00:00", "end": "01/05/1998 00:00:00"},{"begin": "01/07/1998 00:00:00", "end": "01/07/1998 00:00:00"}, {"begin": "01/08/1998 00:00:00", "end": "01/08/1998 00:00:00"}, {"begin": "01/09/1998 00:00:00", "end": "01/09/1998 00:00:00"}, {"begin": "01/11/1998 00:00:00", "end": "01/11/1998 00:00:00"}, {"begin": "01/12/1998 00:00:00", "end": "01/12/1998 00:00:00"},])
})

test('stormVol RG3 data03', () => {
  expect(Math.round(SwmmDat.stormVol((global as any).rg_data03.contents.get('127069'), 0, (new Date(Date.UTC(2014, 0, 1, 0, 0, 0))).getTime())*10)/10).toEqual(1296.7)
})

test('stormVol RG3 data02', () => {
  expect(Math.round(SwmmDat.stormVol((global as any).rg_data02.contents.get('RG3'), (new Date(Date.UTC(1998, 0, 1, 3, 0, 0))).getTime(), (new Date(Date.UTC(1998, 0, 1, 4, 0, 0))).getTime())*100)/100).toEqual(0.95)
})

test('trimIDatRecords rg_data03', () => {
  expect(SwmmDat.trimIDatRecords((global as any).rg_data03.contents.get('127069'), (new Date(Date.UTC(1995, 7, 4, 0, 0, 0))).getTime(), (new Date(Date.UTC(1995, 7, 6, 0, 0, 0))).getTime()).get(807525000000)).toEqual(0.1)
})

test('sumEvents RG1', () => {
  expect(SwmmDat.sumEvents((global as any).rg_data02.contents.get('RG1'), (new Date(Date.UTC(1998, 0, 1, 0, 0, 0))).getTime(), (new Date(Date.UTC(1998, 0, 5, 0, 0, 0))).getTime(), 'Day', 1)).toEqual([{"end": 883699200000, "start": 883612800000, "vol": 1}, {"end": 883785600000, "start": 883699200000, "vol": 0}, {"end": 883872000000, "start": 883785600000, "vol": 0}, {"end": 883958400000, "start": 883872000000, "vol": 1}])
})

test('maxEvent RG3', () => {
  expect(SwmmDat.maxEvent((global as any).rg_data03.contents.get('127069'), (new Date(Date.UTC(1970, 10, 20, 0, 0, 0))).getTime(), (new Date(Date.UTC(1970, 10, 21, 0, 0, 0))).getTime(), 3600000*24)).toEqual({"end": 27997200000, "start": 27910800000, "vol": 0.4})
})

test('maxEvent RG3', () => {
  expect(SwmmDat.maxEvent((global as any).rg_data03.contents.get('127069'), (new Date(Date.UTC(1970, 8, 17, 15, 0, 0))).getTime(), (new Date(Date.UTC(1970, 8, 17, 16, 0, 0))).getTime(), 3600000*24)).toEqual({"end": 27997200000, "start": 27910800000, "vol": 0.4})
})
