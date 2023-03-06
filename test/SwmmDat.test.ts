// SwmmDat.test.ts
import { SwmmDat } from '../src/index'
import util from 'util'
import fs from 'fs'

let test_Example1 = './test/data/rg_data01.dat'
let test_Example2 = './test/data/rg_data02.dat'
let test_Example3 = './test/data/rg_data03.dat'
let test_long     = './test/data/127069_long.dat'
let test_binfail  = './test/data/Example1_RGtest01.out'
let test_txtfail  = './test/data/Example1_RGtest01.rpt'

// Prior to running tests, open files and set objects.
beforeAll(async () => {
  const readFile = util.promisify(fs.readFile)
  const file01 = await readFile(test_Example1, { encoding: 'utf8' });
  const file02 = await readFile(test_Example2, { encoding: 'utf8' });
  const file03 = await readFile(test_Example3, { encoding: 'utf8' });
  const file04 = await readFile(test_long,     { encoding: 'utf8' });
  // Failing files
  (global as any).bad001 = await readFile(test_binfail,  { encoding: 'utf8' });
  (global as any).bad002 = await readFile(test_txtfail,  { encoding: 'utf8' });

  (global as any).rg_data01 = new SwmmDat(file01);
  (global as any).rg_data02 = new SwmmDat(file02);
  (global as any).rg_data03 = new SwmmDat(file03);
  (global as any).rg_long04 = new SwmmDat(file04);
})

////////////////////////////////////////////////////////////////////////////////////////
// Object creation
////////////////////////////////////////////////////////////////////////////////////////

// Test for bad files (binary)
test('fail to construct from .out file (contents)', () =>{
  expect(() =>{
    const rg_fail = new SwmmDat((global as any).bad001)
  }).toThrow(Error)
})

// Test for bad files (text)
test('fail to construct from .txt file (contents)', () =>{
  expect(() =>{
    const rg_fail = new SwmmDat((global as any).bad002)
  }).toThrow(Error)
})

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

// Get a subrange from a large file
test('subRange 1974 6 3 23 30 to 1974 6 5 3 30', () => {
expect((global as any).rg_long04.subRange(new Date(Date.UTC(1974, 5 ,3, 23, 30)), new Date(Date.UTC(1974, 5 ,5, 3, 30))).stringify()).toEqual(`
127069 1974 06 03 23 30 0
127069 1974 06 03 23 45 0
127069 1974 06 04 00 00 0.1
127069 1974 06 04 00 15 0.1
127069 1974 06 04 00 30 0.1
127069 1974 06 04 00 45 0.1
127069 1974 06 04 01 00 0.1
127069 1974 06 04 01 15 0.1
127069 1974 06 04 01 30 0.1
127069 1974 06 04 01 45 0.1
127069 1974 06 04 02 00 0.1
127069 1974 06 04 02 15 0.1
127069 1974 06 04 02 30 0.1
127069 1974 06 04 02 45 0.1
127069 1974 06 04 03 00 0.1
127069 1974 06 04 03 15 0.1
127069 1974 06 04 03 30 0.1
127069 1974 06 04 03 45 0.1
127069 1974 06 04 04 00 0.1
127069 1974 06 04 04 15 0.1
127069 1974 06 04 04 30 0.1
127069 1974 06 04 04 45 0.1
127069 1974 06 04 05 00 0.1
127069 1974 06 04 05 15 0.1
127069 1974 06 04 05 30 0.1
127069 1974 06 04 05 45 0.1
127069 1974 06 04 06 00 0.1
127069 1974 06 04 06 15 0.1
127069 1974 06 04 06 30 0.1
127069 1974 06 04 06 45 0.1
127069 1974 06 04 07 00 0.1
127069 1974 06 04 07 15 0.1
127069 1974 06 04 07 30 0.1
127069 1974 06 04 07 45 0.1
127069 1974 06 04 08 00 0.1
127069 1974 06 04 08 15 0.1
127069 1974 06 04 08 30 0.1
127069 1974 06 04 08 45 0.1
127069 1974 06 04 09 00 0.1
127069 1974 06 04 09 15 0.1
127069 1974 06 04 09 30 0.1
127069 1974 06 04 09 45 0.1
127069 1974 06 04 10 00 0.1
127069 1974 06 04 10 15 0.1
127069 1974 06 04 10 30 0.1
127069 1974 06 04 10 45 0.1
127069 1974 06 04 11 00 0.1
127069 1974 06 04 11 15 0.1
127069 1974 06 04 11 30 0.1
127069 1974 06 04 11 45 0.1
127069 1974 06 04 12 00 0.1
127069 1974 06 04 12 15 0.1
127069 1974 06 04 12 30 0.1
127069 1974 06 04 12 45 0.1
127069 1974 06 04 13 00 0.1
127069 1974 06 04 13 15 0.1
127069 1974 06 04 13 30 0.1
127069 1974 06 04 13 45 0.1
127069 1974 06 04 14 00 0.1
127069 1974 06 04 14 15 0.1
127069 1974 06 04 14 30 0.1
127069 1974 06 04 14 45 0.1
127069 1974 06 04 15 00 0.1
127069 1974 06 04 15 15 0.1
127069 1974 06 04 15 30 0.1
127069 1974 06 04 15 45 0.1
127069 1974 06 04 16 00 0.1
127069 1974 06 04 16 15 0.1
127069 1974 06 04 16 30 0.1
127069 1974 06 04 16 45 0.1
127069 1974 06 04 17 00 0.1
127069 1974 06 04 17 15 0.1
127069 1974 06 04 17 30 0.1
127069 1974 06 04 17 45 0.1
127069 1974 06 04 18 00 0.1
127069 1974 06 04 18 15 0.1
127069 1974 06 04 18 30 0.1
127069 1974 06 04 18 45 0.1
127069 1974 06 04 19 00 0.1
127069 1974 06 04 19 15 0.1
127069 1974 06 04 19 30 0.1
127069 1974 06 04 19 45 0.1
127069 1974 06 04 20 00 0.1
127069 1974 06 04 20 15 0.1
127069 1974 06 04 20 30 0.1
127069 1974 06 04 20 45 0.1
127069 1974 06 04 21 00 0.1
127069 1974 06 04 21 15 0.1
127069 1974 06 04 21 30 0.1
127069 1974 06 04 21 45 0.1
127069 1974 06 04 22 00 0.1
127069 1974 06 04 22 15 0.1
127069 1974 06 04 22 30 0.1
127069 1974 06 04 22 45 0.1
127069 1974 06 04 23 00 0.1
127069 1974 06 04 23 15 0.1
127069 1974 06 04 23 30 0.1
127069 1974 06 04 23 45 0.1
127069 1974 06 05 00 00 0
127069 1974 06 05 00 15 0
127069 1974 06 05 00 30 0
127069 1974 06 05 00 45 0
127069 1974 06 05 01 00 0
127069 1974 06 05 01 15 0
127069 1974 06 05 01 30 0
127069 1974 06 05 01 45 0
127069 1974 06 05 02 00 0
127069 1974 06 05 02 15 0
127069 1974 06 05 02 30 0
127069 1974 06 05 02 45 0
127069 1974 06 05 03 00 0
127069 1974 06 05 03 15 0
127069 1974 06 05 03 30 0
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

// Find substorms at the end of a large file after getting a subrange.
// Get a subrange from a large file
test('findSubStorms subRange 1974 6 3 23 30 to 1974 6 5 3 30', () => {
  expect(SwmmDat.findSubStorms((global as any).rg_long04.subRange(new Date(Date.UTC(1974, 5 ,3, 10, 30)), new Date(Date.UTC(1974, 5 ,5, 3, 30))).contents.get('127069'), 1000*60*60*24, 0.1)).toEqual([{"end": 139621500000, "start": 139536000000, "vol": 9.599999999999982}, {"end": 139621500000, "start": 139536900000, "vol": 9.499999999999982}, {"end": 139621500000, "start": 139537800000, "vol": 9.399999999999983}, {"end": 139621500000, "start": 139538700000, "vol": 9.299999999999983}, {"end": 139621500000, "start": 139539600000, "vol": 9.199999999999983}, {"end": 139621500000, "start": 139540500000, "vol": 9.099999999999984}, {"end": 139621500000, "start": 139541400000, "vol": 8.999999999999984}, {"end": 139621500000, "start": 139542300000, "vol": 8.899999999999984}, {"end": 139621500000, "start": 139543200000, "vol": 8.799999999999985}, {"end": 139621500000, "start": 139544100000, "vol": 8.699999999999985}, {"end": 139621500000, "start": 139545000000, "vol": 8.599999999999985}, {"end": 139621500000, "start": 139545900000, "vol": 8.499999999999986}, {"end": 139621500000, "start": 139546800000, "vol": 8.399999999999986}, {"end": 139621500000, "start": 139547700000, "vol": 8.299999999999986}, {"end": 139621500000, "start": 139548600000, "vol": 8.199999999999987}, {"end": 139621500000, "start": 139549500000, "vol": 8.099999999999987}, {"end": 139621500000, "start": 139550400000, "vol": 7.999999999999988}, {"end": 139621500000, "start": 139551300000, "vol": 7.899999999999988}, {"end": 139621500000, "start": 139552200000, "vol": 7.799999999999988}, {"end": 139621500000, "start": 139553100000, "vol": 7.699999999999989}, {"end": 139621500000, "start": 139554000000, "vol": 7.599999999999989}, {"end": 139621500000, "start": 139554900000, "vol": 7.499999999999989}, {"end": 139621500000, "start": 139555800000, "vol": 7.39999999999999}, {"end": 139621500000, "start": 139556700000, "vol": 7.29999999999999}, {"end": 139621500000, "start": 139557600000, "vol": 7.19999999999999}, {"end": 139621500000, "start": 139558500000, "vol": 7.099999999999991}, {"end": 139621500000, "start": 139559400000, "vol": 6.999999999999991}, {"end": 139621500000, "start": 139560300000, "vol": 6.8999999999999915}, {"end": 139621500000, "start": 139561200000, "vol": 6.799999999999992}, {"end": 139621500000, "start": 139562100000, "vol": 6.699999999999992}, {"end": 139621500000, "start": 139563000000, "vol": 6.5999999999999925}, {"end": 139621500000, "start": 139563900000, "vol": 6.499999999999993}, {"end": 139621500000, "start": 139564800000, "vol": 6.399999999999993}, {"end": 139621500000, "start": 139565700000, "vol": 6.299999999999994}, {"end": 139621500000, "start": 139566600000, "vol": 6.199999999999994}, {"end": 139621500000, "start": 139567500000, "vol": 6.099999999999994}, {"end": 139621500000, "start": 139568400000, "vol": 5.999999999999995}, {"end": 139621500000, "start": 139569300000, "vol": 5.899999999999995}, {"end": 139621500000, "start": 139570200000, "vol": 5.799999999999995}, {"end": 139621500000, "start": 139571100000, "vol": 5.699999999999996}, {"end": 139621500000, "start": 139572000000, "vol": 5.599999999999996}, {"end": 139621500000, "start": 139572900000, "vol": 5.4999999999999964}, {"end": 139621500000, "start": 139573800000, "vol": 5.399999999999997}, {"end": 139621500000, "start": 139574700000, "vol": 5.299999999999997}, {"end": 139621500000, "start": 139575600000, "vol": 5.1999999999999975}, {"end": 139621500000, "start": 139576500000, "vol": 5.099999999999998}, {"end": 139621500000, "start": 139577400000, "vol": 4.999999999999998}, {"end": 139621500000, "start": 139578300000, "vol": 4.899999999999999}, {"end": 139621500000, "start": 139579200000, "vol": 4.799999999999999}, {"end": 139621500000, "start": 139580100000, "vol": 4.699999999999999}, {"end": 139621500000, "start": 139581000000, "vol": 4.6}, {"end": 139621500000, "start": 139581900000, "vol": 4.5}, {"end": 139621500000, "start": 139582800000, "vol": 4.4}, {"end": 139621500000, "start": 139583700000, "vol": 4.300000000000001}, {"end": 139621500000, "start": 139584600000, "vol": 4.200000000000001}, {"end": 139621500000, "start": 139585500000, "vol": 4.100000000000001}, {"end": 139621500000, "start": 139586400000, "vol": 4.000000000000002}, {"end": 139621500000, "start": 139587300000, "vol": 3.900000000000002}, {"end": 139621500000, "start": 139588200000, "vol": 3.800000000000002}, {"end": 139621500000, "start": 139589100000, "vol": 3.700000000000002}, {"end": 139621500000, "start": 139590000000, "vol": 3.600000000000002}, {"end": 139621500000, "start": 139590900000, "vol": 3.5000000000000018}, {"end": 139621500000, "start": 139591800000, "vol": 3.4000000000000017}, {"end": 139621500000, "start": 139592700000, "vol": 3.3000000000000016}, {"end": 139621500000, "start": 139593600000, "vol": 3.2000000000000015}, {"end": 139621500000, "start": 139594500000, "vol": 3.1000000000000014}, {"end": 139621500000, "start": 139595400000, "vol": 3.0000000000000013}, {"end": 139621500000, "start": 139596300000, "vol": 2.9000000000000012}, {"end": 139621500000, "start": 139597200000, "vol": 2.800000000000001}, {"end": 139621500000, "start": 139598100000, "vol": 2.700000000000001}, {"end": 139621500000, "start": 139599000000, "vol": 2.600000000000001}, {"end": 139621500000, "start": 139599900000, "vol": 2.500000000000001}, {"end": 139621500000, "start": 139600800000, "vol": 2.400000000000001}, {"end": 139621500000, "start": 139601700000, "vol": 2.3000000000000007}, {"end": 139621500000, "start": 139602600000, "vol": 2.2000000000000006}, {"end": 139621500000, "start": 139603500000, "vol": 2.1000000000000005}, {"end": 139621500000, "start": 139604400000, "vol": 2.0000000000000004}, {"end": 139621500000, "start": 139605300000, "vol": 1.9000000000000006}, {"end": 139621500000, "start": 139606200000, "vol": 1.8000000000000005}, {"end": 139621500000, "start": 139607100000, "vol": 1.7000000000000004}, {"end": 139621500000, "start": 139608000000, "vol": 1.6000000000000003}, {"end": 139621500000, "start": 139608900000, "vol": 1.5000000000000002}, {"end": 139621500000, "start": 139609800000, "vol": 1.4000000000000001}, {"end": 139621500000, "start": 139610700000, "vol": 1.3}, {"end": 139621500000, "start": 139611600000, "vol": 1.2}, {"end": 139621500000, "start": 139612500000, "vol": 1.0999999999999999}, {"end": 139621500000, "start": 139613400000, "vol": 0.9999999999999999}, {"end": 139621500000, "start": 139614300000, "vol": 0.8999999999999999}, {"end": 139621500000, "start": 139615200000, "vol": 0.7999999999999999}, {"end": 139621500000, "start": 139616100000, "vol": 0.7}, {"end": 139621500000, "start": 139617000000, "vol": 0.6}, {"end": 139621500000, "start": 139617900000, "vol": 0.5}, {"end": 139621500000, "start": 139618800000, "vol": 0.4}, {"end": 139621500000, "start": 139619700000, "vol": 0.30000000000000004}, {"end": 139621500000, "start": 139620600000, "vol": 0.2}, {"end": 139621500000, "start": 139621500000, "vol": 0.1}])
})

// Find substorms at the end of a large file after getting a subrange.
// Get a subrange from a large file
test('findStorms subRange 1974 6 3 23 30 to 1974 6 5 8 30', () => {
  expect(SwmmDat.findStorms((global as any).rg_long04.subRange(new Date(Date.UTC(1974, 5 ,3, 10, 30)), new Date(Date.UTC(1974, 5 ,5, 8, 30))).contents.get('127069'), 1000*60*60*24, 0.1)).toEqual([{"begin": 139536000000, "end": 139621500000}])
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
  expect(SwmmDat.maxEvent((global as any).rg_data03.contents.get('127069'), (new Date(Date.UTC(1970, 10, 20, 0, 0, 0))).getTime(), (new Date(Date.UTC(1970, 10, 21, 0, 0, 0))).getTime(), 3600000*24)).toEqual([{"end": 27997200000, "start": 27910800000, "vol": 0.4}])
})

// Check for scenarios where there will be no maximum data, such as before the file starts or 
// during a time when there are no recorded events.
test('maxEvent RG3 before file start', () => {
  expect(SwmmDat.maxEvent((global as any).rg_data03.contents.get('127069'), (new Date(Date.UTC(1970, 8, 17, 15, 0, 0))).getTime(), (new Date(Date.UTC(1970, 8, 17, 16, 0, 0))).getTime(), 3600000*24)).toEqual([])
})

// Check for scenarios where there will be no maximum data, such as before the file starts or 
// during a time when there are no recorded events.
test('maxEvent RG3 during no events, with data entries having values of 0 rain.', () => {
  expect(SwmmDat.maxEvent((global as any).rg_data03.contents.get('127069'), (new Date(Date.UTC(1971, 4, 1, 0, 15, 0))).getTime(), (new Date(Date.UTC(1971, 5, 1, 0, 15, 0))).getTime(), 3600000*24)).toEqual([])
})

// Check for scenarios where there will be no maximum data, such as before the file starts or 
// during a time when there are no recorded events or events with 0 values.
test('maxEvent RG3 during no events, and no data entries.', () => {
  expect(SwmmDat.maxEvent((global as any).rg_data03.contents.get('127069'), (new Date(Date.UTC(1971, 4, 5, 0, 0, 0))).getTime(), (new Date(Date.UTC(1971, 4, 10, 0, 0, 0))).getTime(), 3600000*24)).toEqual([])
})
