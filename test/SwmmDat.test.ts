// SwmmDat.tests.ts
import { SwmmDat } from '../src/index'
import util from 'util'
import fs from 'fs'

let test_Example1 = './test/data/rg_data01.dat'
let test_Example2 = './test/data/rg_data02.dat'

// Prior to running tests, open files and set objects.
beforeAll(async () => {
  const readFile = util.promisify(fs.readFile)
  const file01 = await readFile(test_Example1, { encoding: 'utf8' });
  const file02 = await readFile(test_Example2, { encoding: 'utf8' });
  (global as any).rg_data01 = new SwmmDat(file01);
  (global as any).rg_data02 = new SwmmDat(file02);
})

////////////////////////////////////////////////////////////////////////////////////////
// Object creation
////////////////////////////////////////////////////////////////////////////////////////

test('construct from .dat file (contents)', () =>{
  expect((global as any).rg_data01.contents).toEqual({"RG_X": {"883612800000": 0,"883616400000": 0.25,"883620000000": 0.5,"883623600000": 0.8,"883627200000": 1.6,"883630800000": 0.1,"883634400000": 0,"883710000000": 0,"883713600000": 0.4,"883717200000": 0.2,"883720800000": 0,}, "RG_Y": {"883612800000": 0,"883616400000": 1.25,"883620000000": 1.5,"883623600000": 1.8,"883627200000": 2.6,"883630800000": 1.1,"883634400000": 0,"883710000000": 0,"883713600000": 1.4,"883717200000": 1.2,"883720800000": 0,}})
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
RG_X 1998 02 01 03 00 0
RG_X 1998 02 01 04 00 0.4
RG_X 1998 02 01 05 00 0.2
RG_X 1998 02 01 06 00 0
RG_Y 1998 01 01 00 00 0
RG_Y 1998 01 01 01 00 1.25
RG_Y 1998 01 01 02 00 1.5
RG_Y 1998 01 01 03 00 1.8
RG_Y 1998 01 01 04 00 2.6
RG_Y 1998 01 01 05 00 1.1
RG_Y 1998 01 01 06 00 0
RG_Y 1998 02 01 03 00 0
RG_Y 1998 02 01 04 00 1.4
RG_Y 1998 02 01 05 00 1.2
RG_Y 1998 02 01 06 00 0
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
  expect((global as any).rg_data01.subRange(883620000000, 883713600000).stringify()).toEqual(`;Notes go here
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
  expect((global as any).rg_data02.findSubStorms((global as any).rg_data02.contents.RG1, 1000*60*60*24, 0.1)).toEqual([{"end": 883699200000, "start": 883612800000}, {"end": 883958400000, "start": 883872000000}, {"end": 884044800000, "start": 883958400000}, {"end": 884217600000, "start": 884131200000}, {"end": 884304000000, "start": 884217600000}, {"end": 884390400000, "start": 884304000000}, {"end": 884563200000, "start": 884476800000}, {"end": 884563200000, "start": 884563200000}])
})

test('findStorms RG1', () => {
  expect((global as any).rg_data02.findStorms((global as any).rg_data02.contents.RG1, 1000*60*60*2, 0.1)).toEqual([{"begin": 883612800000, "end": 883612800000}, {"begin": 883872000000, "end": 883872000000}, {"begin": 883958400000, "end": 883958400000}, {"begin": 884131200000, "end": 884131200000}, {"begin": 884217600000, "end": 884217600000}, {"begin": 884304000000, "end": 884304000000}, {"begin": 884476800000, "end": 884476800000}, {"begin": 884563200000, "end": 884563200000}])
})

test('findStormsPretty RG1', () => {
  expect((global as any).rg_data02.findStormsPretty((global as any).rg_data02.contents.RG1, 1000*60*60*24, 0.1)).toEqual([{"begin": "01/01/1998 00:00:00", "end": "01/02/1998 00:00:00"}, {"begin": "01/04/1998 00:00:00", "end": "01/06/1998 00:00:00"}, {"begin": "01/07/1998 00:00:00", "end": "01/10/1998 00:00:00"}, {"begin": "01/11/1998 00:00:00", "end": "01/12/1998 00:00:00"}])
})


