// SwmmOut.test.ts
import { SwmmOut } from '../src/index'
import util from 'util'
import fs from 'fs'

let test_Example1 = './test/data/Example1.out'
let test_Example2 = './test/data/inflow conduit node conduit oufall.out'

// Prior to running tests, open files and set objects.
beforeAll(async () => {
  const readFile = util.promisify(fs.readFile)
  const file = await readFile(test_Example1);
  (global as any).example1 = new SwmmOut(file.buffer)
  
  const file2 = await readFile(test_Example2);
  (global as any).example2 = new SwmmOut(file2.buffer)
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

test('unitString', () =>{
    expect((global as any).example1.unitString('LINK_RESULTS', 2)).toBe(0)
  })

/*test('subcatchmentCount', () =>{
  expect((global as any).example1.subcatchmentCount()).toBe(8)
})*/

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

/*test('objectProperties', () =>{
  expect((global as any).example1.objectProperties()).toBe(246)
})*/

/*test('computedResults', () =>{
  expect((global as any).example1.computedResults()).toBe(942)
})*/

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
    
/*test('subcatchmentName', () =>{
  expect((global as any).example1.subcatchmentName(2)).toBe('3')
})*/

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

/*test('dateStep_swmmFormat', () =>{
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
})*/

test('processOut', () =>{
  expect((global as any).example2.
  processOut(['US_Conduit', 'DS_Conduit'], 1, 1))
    .toBeDefined()//.toBe(4.341998100280762)
})

test('CreateGeoJSONTimestep', () =>{
  expect(
    
    (global as any).example2.
  CreateGeoJSONTimestep([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
    "100",
    "101",
    "102",
    "103",
    "104",
    "105",
    "106",
    "107",
    "108",
    "109",
    "110",
    "111",
    "112",
    "113",
    "114",
    "115",
    "116",
    "117",
    "118",
    "119",
    "120",
    "121",
    "122",
    "123",
    "124",
    "125",
    "126",
    "127",
    "128",
    "129",
    "130",
    "131",
    "132",
    "133",
    "134",
    "135",
    "136",
    "137",
    "138",
    "139",
    "140",
    "141",
    "142",
    "143",
    "144",
    "145",
    "146",
    "147",
    "148",
    "149",
    "150",
    "151",
    "152",
    "153",
    "154",
    "155",
    "156",
    "157",
    "158",
    "159",
    "160",
    "161",
    "162",
    "163",
    "164",
    "165",
    "166",
    "167",
    "168",
    "169",
    "170",
    "171",
    "172",
    "173",
    "174",
    "175",
    "176",
    "177",
    "178",
    "179",
    "180",
    "181",
    "182",
    "183",
    "184",
    "185",
    "186",
    "187",
    "188",
    "189",
    "190",
    "191",
    "192",
    "193",
    "194",
    "195",
    "196",
    "197",
    "198",
    "199",
    "200",
    "201",
    "202",
    "203",
    "204",
    "205",
    "206",
    "207",
    "208",
    "209",
    "210",
    "211",
    "212",
    "213",
    "214",
    "215",
    "216",
    "217",
    "218",
    "219",
    "220",
    "221",
    "222",
    "223",
    "224",
    "225",
    "226",
    "227",
    "228",
    "229",
    "230",
    "231",
    "232",
    "233",
    "234",
    "235",
    "236",
    "237",
    "238",
    "239",
    "240",
    "241",
    "242",
    "243",
    "244",
    "245",
    "246",
    "247",
    "248",
    "249",
    "250",
    "251",
    "252",
    "253",
    "254",
    "255",
    "256",
    "257",
    "258",
    "259",
    "260",
    "261",
    "262",
    "263",
    "264",
    "265",
    "266",
    "267",
    "268",
    "269",
    "270",
    "271",
    "272",
    "273",
    "274",
    "275",
    "276",
    "277",
    "278",
    "279",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "286",
    "287",
    "288",
    "289",
    "290",
    "291",
    "292",
    "293",
    "294",
    "295",
    "296",
    "297",
    "298",
    "299",
    "300"
],0, 4, {
  "type": "FeatureCollection",
  "features": [
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -68.93293190210538,
                  12.105445505365173
              ]
          },
          "properties": {
              "name": "Inflow_Junction",
              "layer": "JUNCTIONS"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -68.93377221453365,
                  12.105445707085796
              ]
          },
          "properties": {
              "name": "Central_Junction",
              "layer": "JUNCTIONS"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -68.93461252697688,
                  12.10544590626308
              ]
          },
          "properties": {
              "name": "Outfall",
              "layer": "OUTFALLS"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -68.93293190210538,
                      12.105445505365173
                  ],
                  [
                      -68.93377221453365,
                      12.105445707085796
                  ]
              ]
          },
          "properties": {
              "name": "US_Conduit",
              "layer": "CONDUITS"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -68.93377221453365,
                      12.105445707085796
                  ],
                  [
                      -68.93461252697688,
                      12.10544590626308
                  ]
              ]
          },
          "properties": {
              "name": "DS_Conduit",
              "layer": "CONDUITS"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9374332011175,
                          12.105373093346909
                      ],
                      [
                          -68.93718110514615,
                          12.105218754630162
                      ],
                      [
                          -68.93764298078607,
                          12.104495866233865
                      ],
                      [
                          -68.93789838907118,
                          12.104654443058037
                      ],
                      [
                          -68.93773437300743,
                          12.10490582318571
                      ],
                      [
                          -68.93750310021233,
                          12.104764079526944
                      ],
                      [
                          -68.93746450773354,
                          12.104823165137189
                      ],
                      [
                          -68.93769471368387,
                          12.104967053768123
                      ],
                      [
                          -68.9375564897704,
                          12.105185089893459
                      ],
                      [
                          -68.93732303937541,
                          12.105043369104218
                      ],
                      [
                          -68.93727585747794,
                          12.10511428043647
                      ],
                      [
                          -68.93750606307641,
                          12.105258168094863
                      ],
                      [
                          -68.9374332011175,
                          12.105373093346909
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "0",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93686806708881,
                          12.10695183415206
                      ],
                      [
                          -68.93667515540835,
                          12.106833187572548
                      ],
                      [
                          -68.9367490933166,
                          12.106717185910943
                      ],
                      [
                          -68.93674361519712,
                          12.106714039590694
                      ],
                      [
                          -68.9367596717682,
                          12.10668719801037
                      ],
                      [
                          -68.93687037861858,
                          12.106755448871622
                      ],
                      [
                          -68.93685107738288,
                          12.10678445749668
                      ],
                      [
                          -68.93694094949043,
                          12.106839045007373
                      ],
                      [
                          -68.93686806708881,
                          12.10695183415206
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "1",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93700844142711,
                          12.103802162726405
                      ],
                      [
                          -68.93693284584043,
                          12.103759168431694
                      ],
                      [
                          -68.93697139400817,
                          12.103695813331491
                      ],
                      [
                          -68.93690674376421,
                          12.103658044803923
                      ],
                      [
                          -68.93695811544428,
                          12.10357108125942
                      ],
                      [
                          -68.9370808264806,
                          12.103641348753527
                      ],
                      [
                          -68.93703373293556,
                          12.103720798429366
                      ],
                      [
                          -68.93705125671441,
                          12.103730226848791
                      ],
                      [
                          -68.93700844142711,
                          12.103802162726405
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "2",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93647894430768,
                          12.107234292588362
                      ],
                      [
                          -68.93642858577415,
                          12.107209188222118
                      ],
                      [
                          -68.9365119124924,
                          12.107053606525806
                      ],
                      [
                          -68.93656774918466,
                          12.107081857280152
                      ],
                      [
                          -68.93654851477673,
                          12.107117268253209
                      ],
                      [
                          -68.93661090736619,
                          12.107147587244883
                      ],
                      [
                          -68.9365649714874,
                          12.107233424923344
                      ],
                      [
                          -68.93650694585595,
                          12.107204129128885
                      ],
                      [
                          -68.93649201172747,
                          12.10723416078671
                      ],
                      [
                          -68.93647894430768,
                          12.107234292588362
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "3",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93725533723857,
                          12.104502973970659
                      ],
                      [
                          -68.93718416481711,
                          12.104466338659584
                      ],
                      [
                          -68.937207667033,
                          12.104422345823199
                      ],
                      [
                          -68.93715839633691,
                          12.104397229161078
                      ],
                      [
                          -68.93717440896559,
                          12.104366118403652
                      ],
                      [
                          -68.9371481179175,
                          12.104351442316732
                      ],
                      [
                          -68.93719297774898,
                          12.104266679753886
                      ],
                      [
                          -68.93734080102357,
                          12.104343097072025
                      ],
                      [
                          -68.93725533723857,
                          12.104502973970659
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "4",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93711479514891,
                          12.103870460465458
                      ],
                      [
                          -68.93704138873915,
                          12.103828511299715
                      ],
                      [
                          -68.937086337584,
                          12.103752285041802
                      ],
                      [
                          -68.93710935071913,
                          12.103765927048824
                      ],
                      [
                          -68.93715323286578,
                          12.103691845969285
                      ],
                      [
                          -68.93727484353039,
                          12.103761057421575
                      ],
                      [
                          -68.93722240491634,
                          12.103850165795087
                      ],
                      [
                          -68.93715119872618,
                          12.103810328825197
                      ],
                      [
                          -68.93711479514891,
                          12.103870460465458
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "5",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93646928181838,
                          12.104006103132795
                      ],
                      [
                          -68.93635641609775,
                          12.10394000627541
                      ],
                      [
                          -68.93635607154162,
                          12.103906925733911
                      ],
                      [
                          -68.93639784181305,
                          12.103839269124476
                      ],
                      [
                          -68.93646578133021,
                          12.103879138539488
                      ],
                      [
                          -68.93650005101668,
                          12.103823297100819
                      ],
                      [
                          -68.93657674684687,
                          12.103867347193276
                      ],
                      [
                          -68.936530720546,
                          12.103944651658901
                      ],
                      [
                          -68.9365131856391,
                          12.103934156236535
                      ],
                      [
                          -68.93646928181838,
                          12.104006103132795
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "6",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93687823959705,
                          12.104267717950822
                      ],
                      [
                          -68.93675555135782,
                          12.104199585513458
                      ],
                      [
                          -68.93681118968668,
                          12.104104041697294
                      ],
                      [
                          -68.93688130683508,
                          12.104143889263481
                      ],
                      [
                          -68.93691662119494,
                          12.104083768732421
                      ],
                      [
                          -68.93699330554253,
                          12.104126751844731
                      ],
                      [
                          -68.93694943481029,
                          12.104201899682984
                      ],
                      [
                          -68.93692533276362,
                          12.104188268770079
                      ],
                      [
                          -68.93687823959705,
                          12.104267717950822
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "7",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93672369217198,
                          12.105323683421016
                      ],
                      [
                          -68.93666343204288,
                          12.105289073250487
                      ],
                      [
                          -68.93666448767898,
                          12.105285860984734
                      ],
                      [
                          -68.93659544905321,
                          12.105244936110696
                      ],
                      [
                          -68.93665113109313,
                          12.105153661898106
                      ],
                      [
                          -68.93671469155613,
                          12.105191440473467
                      ],
                      [
                          -68.93675860612365,
                          12.105120561893546
                      ],
                      [
                          -68.93682435562178,
                          12.105159385685706
                      ],
                      [
                          -68.93672369217198,
                          12.105323683421016
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "8",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93684006805462,
                          12.105099463559242
                      ],
                      [
                          -68.93677654091721,
                          12.105064886157388
                      ],
                      [
                          -68.93683429006322,
                          12.104962918877579
                      ],
                      [
                          -68.93677295190437,
                          12.104929386553255
                      ],
                      [
                          -68.93680931045506,
                          12.104864987218411
                      ],
                      [
                          -68.93688927232469,
                          12.10490900395333
                      ],
                      [
                          -68.93690103997986,
                          12.104888608281176
                      ],
                      [
                          -68.93694594350275,
                          12.104912701468697
                      ],
                      [
                          -68.93684006805462,
                          12.105099463559242
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "9",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93699672545992,
                          12.104873769889608
                      ],
                      [
                          -68.93690140684537,
                          12.104819235742406
                      ],
                      [
                          -68.93694529948523,
                          12.104746222694079
                      ],
                      [
                          -68.93687407156175,
                          12.104704252193065
                      ],
                      [
                          -68.9369125971053,
                          12.104638763644072
                      ],
                      [
                          -68.93708023272616,
                          12.104735257554537
                      ],
                      [
                          -68.93699672545992,
                          12.104873769889608
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "10",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93636796438834,
                          12.105048729574643
                      ],
                      [
                          -68.93636619712018,
                          12.104879060752488
                      ],
                      [
                          -68.93646146040922,
                          12.104928258891293
                      ],
                      [
                          -68.93647000550764,
                          12.104912164524729
                      ],
                      [
                          -68.93653242164264,
                          12.10494461860593
                      ],
                      [
                          -68.93649395202084,
                          12.105015442531869
                      ],
                      [
                          -68.93640963415207,
                          12.104971470084154
                      ],
                      [
                          -68.93636796438834,
                          12.105048729574643
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "11",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93670502479021,
                          12.104158473295985
                      ],
                      [
                          -68.93663168507516,
                          12.10412292723941
                      ],
                      [
                          -68.93666904393264,
                          12.104049979295768
                      ],
                      [
                          -68.93661211669291,
                          12.104021738276334
                      ],
                      [
                          -68.93665696513754,
                          12.103935907994984
                      ],
                      [
                          -68.93678723220471,
                          12.10399969526197
                      ],
                      [
                          -68.93670502479021,
                          12.104158473295985
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "12",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93654074448833,
                          12.10490718224649
                      ],
                      [
                          -68.93651946494025,
                          12.104850834577991
                      ],
                      [
                          -68.9364445922973,
                          12.104877202823154
                      ],
                      [
                          -68.93639188771381,
                          12.1047315261111
                      ],
                      [
                          -68.93652753207155,
                          12.104684267784647
                      ],
                      [
                          -68.9366015048907,
                          12.104885225242903
                      ],
                      [
                          -68.93654074448833,
                          12.10490718224649
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "13",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93709183382767,
                          12.104698855314004
                      ],
                      [
                          -68.93694058839074,
                          12.10460753218429
                      ],
                      [
                          -68.93698022520981,
                          12.104544166810662
                      ],
                      [
                          -68.93704378590932,
                          12.104581945894756
                      ],
                      [
                          -68.93708126705519,
                          12.104520736705036
                      ],
                      [
                          -68.93716894076883,
                          12.10457321385544
                      ],
                      [
                          -68.93709183382767,
                          12.104698855314004
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "14",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93707002225518,
                          12.10438211164186
                      ],
                      [
                          -68.936936344481,
                          12.104304484903034
                      ],
                      [
                          -68.9370273306349,
                          12.104152022208295
                      ],
                      [
                          -68.93709526969742,
                          12.104191891838779
                      ],
                      [
                          -68.93707494556126,
                          12.104227315026018
                      ],
                      [
                          -68.93714068437805,
                          12.10426507237818
                      ],
                      [
                          -68.93707002225518,
                          12.10438211164186
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "15",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93656244649242,
                          12.105213252701441
                      ],
                      [
                          -68.93643315859559,
                          12.105138784830066
                      ],
                      [
                          -68.9365316549502,
                          12.104975575474462
                      ],
                      [
                          -68.93659849360216,
                          12.105014388227373
                      ],
                      [
                          -68.93656959136061,
                          12.105062704168143
                      ],
                      [
                          -68.9366320407108,
                          12.10509835953051
                      ],
                      [
                          -68.93656244649242,
                          12.105213252701441
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "16",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93674773934568,
                          12.104390696822922
                      ],
                      [
                          -68.93668398952336,
                          12.104334776970102
                      ],
                      [
                          -68.9366495310177,
                          12.104372477143437
                      ],
                      [
                          -68.93659898226292,
                          12.104329230854649
                      ],
                      [
                          -68.93669587950457,
                          12.104221531633524
                      ],
                      [
                          -68.93681018920697,
                          12.104321765080508
                      ],
                      [
                          -68.93674773934568,
                          12.104390696822922
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "17",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93686656004105,
                          12.104610412939964
                      ],
                      [
                          -68.9366857561997,
                          12.104609034293253
                      ],
                      [
                          -68.9366864229938,
                          12.104463885986858
                      ],
                      [
                          -68.93679752122661,
                          12.104464900216296
                      ],
                      [
                          -68.93679809896508,
                          12.104520389731737
                      ],
                      [
                          -68.93686780478794,
                          12.10452075416068
                      ],
                      [
                          -68.93686656004105,
                          12.104610412939964
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "18",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93660923881075,
                          12.104791232481427
                      ],
                      [
                          -68.9365457891034,
                          12.10465953770183
                      ],
                      [
                          -68.93660540511237,
                          12.104632256095371
                      ],
                      [
                          -68.93662545121713,
                          12.10467474258094
                      ],
                      [
                          -68.93670891365262,
                          12.104636548408688
                      ],
                      [
                          -68.93675123926911,
                          12.104726834943133
                      ],
                      [
                          -68.93660923881075,
                          12.104791232481427
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "19",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93643079002186,
                          12.104283969371979
                      ],
                      [
                          -68.9363650287141,
                          12.104244078234162
                      ],
                      [
                          -68.93645933662926,
                          12.104096917516342
                      ],
                      [
                          -68.93659197050667,
                          12.10417882332357
                      ],
                      [
                          -68.93653838813945,
                          12.104262607000024
                      ],
                      [
                          -68.93647043778232,
                          12.104221670642069
                      ],
                      [
                          -68.93643079002186,
                          12.104283969371979
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "20",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93639027238162,
                          12.107190365449014
                      ],
                      [
                          -68.93638782702472,
                          12.106955610127086
                      ],
                      [
                          -68.93644591951556,
                          12.106991308385206
                      ],
                      [
                          -68.9364255850616,
                          12.10702566333715
                      ],
                      [
                          -68.93647491030114,
                          12.107056114099386
                      ],
                      [
                          -68.93639027238162,
                          12.107190365449014
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "21",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93699203042458,
                          12.106828925361372
                      ],
                      [
                          -68.93689898034751,
                          12.106782907328327
                      ],
                      [
                          -68.9369277822448,
                          12.106724988897323
                      ],
                      [
                          -68.93702192131526,
                          12.106770996014085
                      ],
                      [
                          -68.93699203042458,
                          12.106828925361372
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "22",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93720909972681,
                          12.104560002494292
                      ],
                      [
                          -68.93714886155098,
                          12.104527525902512
                      ],
                      [
                          -68.93718202017565,
                          12.104469561930085
                      ],
                      [
                          -68.93724225837329,
                          12.104502038566215
                      ],
                      [
                          -68.93720909972681,
                          12.104560002494292
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "23",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93348973408895,
                          12.105696779915947
                      ],
                      [
                          -68.93348732211614,
                          12.10567439305138
                      ],
                      [
                          -68.9334340295173,
                          12.10568133526345
                      ],
                      [
                          -68.93343043940222,
                          12.10565042268494
                      ],
                      [
                          -68.93337496885587,
                          12.105657386956127
                      ],
                      [
                          -68.93336788889954,
                          12.105605165591221
                      ],
                      [
                          -68.93342335947345,
                          12.10559820131257
                      ],
                      [
                          -68.93341975820806,
                          12.105566221608347
                      ],
                      [
                          -68.93354810064132,
                          12.10554998273741
                      ],
                      [
                          -68.93355753674987,
                          12.10561925558152
                      ],
                      [
                          -68.93358907228595,
                          12.105614667853818
                      ],
                      [
                          -68.9335984972195,
                          12.105682873550828
                      ],
                      [
                          -68.93348973408895,
                          12.105696779915947
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "24",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93464944230496,
                          12.10401059843042
                      ],
                      [
                          -68.93455637751859,
                          12.103963513457506
                      ],
                      [
                          -68.93457882318114,
                          12.103922732064595
                      ],
                      [
                          -68.93454049711228,
                          12.103902841957881
                      ],
                      [
                          -68.9346174012898,
                          12.10375798915216
                      ],
                      [
                          -68.93473456866779,
                          12.103818704812223
                      ],
                      [
                          -68.93469398861446,
                          12.103895955159324
                      ],
                      [
                          -68.93463704958612,
                          12.103866647987864
                      ],
                      [
                          -68.93462210433972,
                          12.103895614121482
                      ],
                      [
                          -68.93469217798788,
                          12.103931191950348
                      ],
                      [
                          -68.93464944230496,
                          12.10401059843042
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "25",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93264311999837,
                          12.104929485070405
                      ],
                      [
                          -68.93248435946074,
                          12.104848916522029
                      ],
                      [
                          -68.93252385968773,
                          12.1047727443723
                      ],
                      [
                          -68.93258407695473,
                          12.10480308411407
                      ],
                      [
                          -68.9326139660667,
                          12.104745151919381
                      ],
                      [
                          -68.93272127704255,
                          12.104800628282224
                      ],
                      [
                          -68.93270206576929,
                          12.104838175250219
                      ],
                      [
                          -68.9326736073644,
                          12.10482458947343
                      ],
                      [
                          -68.93264585158711,
                          12.104878231139867
                      ],
                      [
                          -68.93266555355328,
                          12.104887636665111
                      ],
                      [
                          -68.93264311999837,
                          12.104929485070405
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "26",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93231598015481,
                          12.10541090697601
                      ],
                      [
                          -68.93216923223864,
                          12.105333419433856
                      ],
                      [
                          -68.932206632199,
                          12.105264739370512
                      ],
                      [
                          -68.93222195592818,
                          12.105272054677895
                      ],
                      [
                          -68.93226364490047,
                          12.105196927892608
                      ],
                      [
                          -68.93235783215847,
                          12.10524720037744
                      ],
                      [
                          -68.93235034321665,
                          12.105260082708757
                      ],
                      [
                          -68.93238758027039,
                          12.105279982699813
                      ],
                      [
                          -68.93231598015481,
                          12.10541090697601
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "27",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93574036397803,
                          12.104289867910873
                      ],
                      [
                          -68.93565387835045,
                          12.104246984689167
                      ],
                      [
                          -68.9356998149019,
                          12.104161143242518
                      ],
                      [
                          -68.93567025662993,
                          12.104146500439102
                      ],
                      [
                          -68.93568629110774,
                          12.104117523565725
                      ],
                      [
                          -68.9357213276704,
                          12.104135312761189
                      ],
                      [
                          -68.93573095058966,
                          12.104118140062791
                      ],
                      [
                          -68.93586234038496,
                          12.104185116411237
                      ],
                      [
                          -68.93582922686258,
                          12.104247349471166
                      ],
                      [
                          -68.93577666653857,
                          12.104220132115467
                      ],
                      [
                          -68.93574036397803,
                          12.104289867910873
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "28",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9335318838433,
                          12.107229908187389
                      ],
                      [
                          -68.93351084825854,
                          12.107197038321507
                      ],
                      [
                          -68.93347188000372,
                          12.107219843254757
                      ],
                      [
                          -68.93344748837568,
                          12.10717846988689
                      ],
                      [
                          -68.93348320092639,
                          12.107156765043307
                      ],
                      [
                          -68.93344000729442,
                          12.107087835057529
                      ],
                      [
                          -68.9335352668799,
                          12.10703244524727
                      ],
                      [
                          -68.93359841824052,
                          12.107135323323302
                      ],
                      [
                          -68.93358325089977,
                          12.107142946987592
                      ],
                      [
                          -68.93360873143357,
                          12.107184309391453
                      ],
                      [
                          -68.9335318838433,
                          12.107229908187389
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "29",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93552023710173,
                          12.10459091115488
                      ],
                      [
                          -68.93543148466715,
                          12.104539513428199
                      ],
                      [
                          -68.93550322273671,
                          12.104421395163351
                      ],
                      [
                          -68.93558319664953,
                          12.10446647832698
                      ],
                      [
                          -68.93559389737224,
                          12.104448227590948
                      ],
                      [
                          -68.93566949305746,
                          12.104491220555147
                      ],
                      [
                          -68.93562561229926,
                          12.104565301504024
                      ],
                      [
                          -68.93555878410432,
                          12.104527556205845
                      ],
                      [
                          -68.93552023710173,
                          12.10459091115488
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "30",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.934245257516,
                          12.104311370655049
                      ],
                      [
                          -68.93418385127215,
                          12.104271436811759
                      ],
                      [
                          -68.93420314113865,
                          12.10424135962154
                      ],
                      [
                          -68.93413844561074,
                          12.104199324560689
                      ],
                      [
                          -68.93421672754509,
                          12.104082205935581
                      ],
                      [
                          -68.93426826620473,
                          12.104115836275268
                      ],
                      [
                          -68.93426933291731,
                          12.10411369104592
                      ],
                      [
                          -68.93434499623267,
                          12.104163085968704
                      ],
                      [
                          -68.934245257516,
                          12.104311370655049
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "31",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93266528358745,
                          12.10538282528126
                      ],
                      [
                          -68.93251191283717,
                          12.105296866615282
                      ],
                      [
                          -68.9325461464982,
                          12.105237823585275
                      ],
                      [
                          -68.93256914878931,
                          12.105250397266863
                      ],
                      [
                          -68.93261194929676,
                          12.105177393776614
                      ],
                      [
                          -68.93269192397254,
                          12.105222474366302
                      ],
                      [
                          -68.93264911227696,
                          12.105294410683952
                      ],
                      [
                          -68.9327005951235,
                          12.105322704252734
                      ],
                      [
                          -68.93266528358745,
                          12.10538282528126
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "32",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93638920566005,
                          12.107192510569373
                      ],
                      [
                          -68.93633113548984,
                          12.107158946577387
                      ],
                      [
                          -68.93636004812156,
                          12.107111698960056
                      ],
                      [
                          -68.9363008667117,
                          12.107076011791916
                      ],
                      [
                          -68.93638015988134,
                          12.106951418732777
                      ],
                      [
                          -68.93644591951556,
                          12.106991308385206
                      ],
                      [
                          -68.9364255850616,
                          12.10702566333715
                      ],
                      [
                          -68.93646066498933,
                          12.10704772032691
                      ],
                      [
                          -68.93646098731044,
                          12.107078665350071
                      ],
                      [
                          -68.93638920566005,
                          12.107192510569373
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "33",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93427778848353,
                          12.105550076290085
                      ],
                      [
                          -68.9342607300571,
                          12.105480880375094
                      ],
                      [
                          -68.93426725274398,
                          12.105479747249191
                      ],
                      [
                          -68.93425135009207,
                          12.105416942827263
                      ],
                      [
                          -68.93440779449149,
                          12.10538014403118
                      ],
                      [
                          -68.9344225635425,
                          12.105438691134422
                      ],
                      [
                          -68.93440409557654,
                          12.105443146575643
                      ],
                      [
                          -68.93442227628728,
                          12.105515532817536
                      ],
                      [
                          -68.93427778848353,
                          12.105550076290085
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "34",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93269616292868,
                          12.104481784290291
                      ],
                      [
                          -68.93263811232534,
                          12.104450355199793
                      ],
                      [
                          -68.9327343921417,
                          12.10428396140355
                      ],
                      [
                          -68.9327946430736,
                          12.10431750279661
                      ],
                      [
                          -68.93277432039321,
                          12.10435292679002
                      ],
                      [
                          -68.93284990623158,
                          12.104394850766344
                      ],
                      [
                          -68.93280283850311,
                          12.104476435841663
                      ],
                      [
                          -68.93272397460463,
                          12.104433477899706
                      ],
                      [
                          -68.93269616292868,
                          12.104481784290291
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "35",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93502446530006,
                          12.10477734357498
                      ],
                      [
                          -68.93494888066422,
                          12.104735418327543
                      ],
                      [
                          -68.9350119841221,
                          12.10462485773838
                      ],
                      [
                          -68.93507989031752,
                          12.104661524552377
                      ],
                      [
                          -68.93509380223087,
                          12.104637905296583
                      ],
                      [
                          -68.93517267606391,
                          12.10468193191955
                      ],
                      [
                          -68.9351213286771,
                          12.104771029313207
                      ],
                      [
                          -68.93505013337598,
                          12.104732261315366
                      ],
                      [
                          -68.93502446530006,
                          12.10477734357498
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "36",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93453996138294,
                          12.104895362419294
                      ],
                      [
                          -68.93445687626239,
                          12.104865252713694
                      ],
                      [
                          -68.93445266510257,
                          12.104879169044656
                      ],
                      [
                          -68.93439581560807,
                          12.104858399212683
                      ],
                      [
                          -68.93445619487196,
                          12.104695572393583
                      ],
                      [
                          -68.93456988285271,
                          12.104736045136805
                      ],
                      [
                          -68.9345539601142,
                          12.104775692980711
                      ],
                      [
                          -68.93458129589155,
                          12.104786088949274
                      ],
                      [
                          -68.93453996138294,
                          12.104895362419294
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "37",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93618307170252,
                          12.104968419436737
                      ],
                      [
                          -68.93601002403923,
                          12.104875183445266
                      ],
                      [
                          -68.9360464043851,
                          12.104812917993721
                      ],
                      [
                          -68.93608364084214,
                          12.104832819360494
                      ],
                      [
                          -68.93610184215646,
                          12.10480275373728
                      ],
                      [
                          -68.93616974782958,
                          12.104839421133594
                      ],
                      [
                          -68.93620823953799,
                          12.104770731125488
                      ],
                      [
                          -68.93627504509877,
                          12.104806342487084
                      ],
                      [
                          -68.93618307170252,
                          12.104968419436737
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "38",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93251539305643,
                          12.106463281519654
                      ],
                      [
                          -68.93238063648343,
                          12.106386740653859
                      ],
                      [
                          -68.93241919207274,
                          12.10632445307851
                      ],
                      [
                          -68.93247178576027,
                          12.106354869272582
                      ],
                      [
                          -68.93251355252953,
                          12.106287213226786
                      ],
                      [
                          -68.93255956781546,
                          12.10631342729354
                      ],
                      [
                          -68.93257027897302,
                          12.106296243759827
                      ],
                      [
                          -68.93260315977038,
                          12.106316187628432
                      ],
                      [
                          -68.93251539305643,
                          12.106463281519654
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "39",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93570478272096,
                          12.105473766336411
                      ],
                      [
                          -68.93561023033527,
                          12.105388277058587
                      ],
                      [
                          -68.93565977801887,
                          12.105335483833926
                      ],
                      [
                          -68.93563559819184,
                          12.105314383754964
                      ],
                      [
                          -68.93567868994371,
                          12.105269126106752
                      ],
                      [
                          -68.93575784107745,
                          12.105339830126567
                      ],
                      [
                          -68.93572229426972,
                          12.105377541108485
                      ],
                      [
                          -68.93576187535555,
                          12.105413426629704
                      ],
                      [
                          -68.93570478272096,
                          12.105473766336411
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "40",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9323640038779,
                          12.104274903759253
                      ],
                      [
                          -68.93230481944595,
                          12.10423921733538
                      ],
                      [
                          -68.93239693264603,
                          12.104091007781328
                      ],
                      [
                          -68.9324462493312,
                          12.104120390864942
                      ],
                      [
                          -68.93243338229634,
                          12.104139731171475
                      ],
                      [
                          -68.93252105880302,
                          12.104192204901164
                      ],
                      [
                          -68.93247286878157,
                          12.10427060003777
                      ],
                      [
                          -68.93239616024347,
                          12.104225485939178
                      ],
                      [
                          -68.9323640038779,
                          12.104274903759253
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "41",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93282105362988,
                          12.104239328255026
                      ],
                      [
                          -68.93278600542017,
                          12.104220472899598
                      ],
                      [
                          -68.93277958302932,
                          12.104231210130056
                      ],
                      [
                          -68.93270509718134,
                          12.104190342197201
                      ],
                      [
                          -68.93279385481539,
                          12.10403362906303
                      ],
                      [
                          -68.93286066208375,
                          12.104069238715049
                      ],
                      [
                          -68.93283072802619,
                          12.104122902899288
                      ],
                      [
                          -68.93287344375558,
                          12.104145949607632
                      ],
                      [
                          -68.93282105362988,
                          12.104239328255026
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "42",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9353190050565,
                          12.10513722155773
                      ],
                      [
                          -68.93524733164415,
                          12.105052568405378
                      ],
                      [
                          -68.93530132422396,
                          12.105008267591877
                      ],
                      [
                          -68.93526935452799,
                          12.104971237969039
                      ],
                      [
                          -68.93532659183727,
                          12.104924769936034
                      ],
                      [
                          -68.93544345834333,
                          12.105061260381726
                      ],
                      [
                          -68.93538945460917,
                          12.105104493993881
                      ],
                      [
                          -68.93537623116794,
                          12.105089686552887
                      ],
                      [
                          -68.9353190050565,
                          12.10513722155773
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "43",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93505856946271,
                          12.107003176560065
                      ],
                      [
                          -68.93496545184375,
                          12.106950757847704
                      ],
                      [
                          -68.93508531151427,
                          12.106747849224934
                      ],
                      [
                          -68.93513900425147,
                          12.106779322590855
                      ],
                      [
                          -68.93511654790285,
                          12.106819035262728
                      ],
                      [
                          -68.93513954952206,
                          12.106831609205464
                      ],
                      [
                          -68.9351052815964,
                          12.10688744891113
                      ],
                      [
                          -68.93512171608471,
                          12.106896887605105
                      ],
                      [
                          -68.93505856946271,
                          12.107003176560065
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "44",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93393936368929,
                          12.106828795540569
                      ],
                      [
                          -68.93387573628951,
                          12.106784616976599
                      ],
                      [
                          -68.93390363697078,
                          12.106744848963592
                      ],
                      [
                          -68.9338751235406,
                          12.106725927861616
                      ],
                      [
                          -68.93394594757349,
                          12.106624896104492
                      ],
                      [
                          -68.9340084526601,
                          12.10666588458633
                      ],
                      [
                          -68.93399559681406,
                          12.106686291129934
                      ],
                      [
                          -68.93402412137111,
                          12.106706279348817
                      ],
                      [
                          -68.93393936368929,
                          12.106828795540569
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "45",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93321369084278,
                          12.107003682499176
                      ],
                      [
                          -68.93315900898081,
                          12.106981824833422
                      ],
                      [
                          -68.93315690910855,
                          12.106989316369798
                      ],
                      [
                          -68.93304863427564,
                          12.1069455900886
                      ],
                      [
                          -68.933090055542,
                          12.106844855522255
                      ],
                      [
                          -68.93316332778676,
                          12.106873995419305
                      ],
                      [
                          -68.9331707498147,
                          12.106854710978414
                      ],
                      [
                          -68.93326041210707,
                          12.10688902104984
                      ],
                      [
                          -68.93321369084278,
                          12.107003682499176
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "46",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93568933892269,
                          12.106813252250838
                      ],
                      [
                          -68.93556993078145,
                          12.106746157644773
                      ],
                      [
                          -68.93561059926755,
                          12.106677447135283
                      ],
                      [
                          -68.93565660243445,
                          12.106702595279554
                      ],
                      [
                          -68.93566943635075,
                          12.106680054799517
                      ],
                      [
                          -68.93577791044297,
                          12.106742991181878
                      ],
                      [
                          -68.93573616404181,
                          12.106812779629854
                      ],
                      [
                          -68.93570111724159,
                          12.106793924020248
                      ],
                      [
                          -68.93568933892269,
                          12.106813252250838
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "47",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93245960324622,
                          12.105710404794163
                      ],
                      [
                          -68.9323008437222,
                          12.105629837388742
                      ],
                      [
                          -68.93233929915526,
                          12.105557945338946
                      ],
                      [
                          -68.93237215791493,
                          12.105575755158593
                      ],
                      [
                          -68.93240739112727,
                          12.10550816452963
                      ],
                      [
                          -68.93249061025048,
                          12.105551077508755
                      ],
                      [
                          -68.9324457547574,
                          12.105635840744398
                      ],
                      [
                          -68.93248844766123,
                          12.10565675263674
                      ],
                      [
                          -68.93245960324622,
                          12.105710404794163
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "48",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93226557272895,
                          12.105589640731857
                      ],
                      [
                          -68.93208279971059,
                          12.10550398061054
                      ],
                      [
                          -68.93211798813103,
                          12.105432121440709
                      ],
                      [
                          -68.93217271566277,
                          12.105458247439465
                      ],
                      [
                          -68.93220685981885,
                          12.105390667662984
                      ],
                      [
                          -68.93229334603708,
                          12.105433547484147
                      ],
                      [
                          -68.93225070205999,
                          12.105521490164438
                      ],
                      [
                          -68.93229010582682,
                          12.105540300905929
                      ],
                      [
                          -68.93226557272895,
                          12.105589640731857
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "49",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93243516043397,
                          12.105247484744945
                      ],
                      [
                          -68.93228724531592,
                          12.105162538208571
                      ],
                      [
                          -68.93232791234335,
                          12.105093824960509
                      ],
                      [
                          -68.93231914476048,
                          12.105088577666995
                      ],
                      [
                          -68.93235767851107,
                          12.105024154813787
                      ],
                      [
                          -68.93250011542187,
                          12.105105955428508
                      ],
                      [
                          -68.93245087035473,
                          12.105187561956338
                      ],
                      [
                          -68.93246621638636,
                          12.10519701150029
                      ],
                      [
                          -68.93243516043397,
                          12.105247484744945
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "50",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93428770627494,
                          12.106291679411473
                      ],
                      [
                          -68.93427005771316,
                          12.10616592879949
                      ],
                      [
                          -68.93430268207005,
                          12.106161330303438
                      ],
                      [
                          -68.93429212412066,
                          12.106088867664901
                      ],
                      [
                          -68.93437041818702,
                          12.106077404463875
                      ],
                      [
                          -68.93439507923944,
                          12.106248973743027
                      ],
                      [
                          -68.93435485444148,
                          12.106255783403391
                      ],
                      [
                          -68.93435839972415,
                          12.106282427428384
                      ],
                      [
                          -68.93428770627494,
                          12.106291679411473
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "51",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93447003749297,
                          12.107170266568192
                      ],
                      [
                          -68.93440426603254,
                          12.107129311123792
                      ],
                      [
                          -68.93443105558869,
                          12.107087420297793
                      ],
                      [
                          -68.93440365357577,
                          12.10707062228502
                      ],
                      [
                          -68.93447116645652,
                          12.106965356072083
                      ],
                      [
                          -68.93453474894673,
                          12.10700526658434
                      ],
                      [
                          -68.93452081522443,
                          12.107026751045186
                      ],
                      [
                          -68.93454822836267,
                          12.107044616167776
                      ],
                      [
                          -68.93447003749297,
                          12.107170266568192
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "52",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93460804900222,
                          12.105680139509555
                      ],
                      [
                          -68.93459037848648,
                          12.105552253652066
                      ],
                      [
                          -68.93466651730762,
                          12.105542946788557
                      ],
                      [
                          -68.93466182745344,
                          12.105510978034625
                      ],
                      [
                          -68.93472490979853,
                          12.105502870319777
                      ],
                      [
                          -68.93474020184588,
                          12.10561157064732
                      ],
                      [
                          -68.93468474234902,
                          12.105619601334487
                      ],
                      [
                          -68.93469179937776,
                          12.105669688572045
                      ],
                      [
                          -68.93460804900222,
                          12.105680139509555
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "53",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.934844776309,
                          12.106866601989365
                      ],
                      [
                          -68.93477899368571,
                          12.106824579076017
                      ],
                      [
                          -68.93479293861998,
                          12.106804161667801
                      ],
                      [
                          -68.93476552546436,
                          12.10678629642515
                      ],
                      [
                          -68.93484590603423,
                          12.106661690698674
                      ],
                      [
                          -68.93491058864137,
                          12.1067026576704
                      ],
                      [
                          -68.93488378766199,
                          12.106743481505653
                      ],
                      [
                          -68.9349123008945,
                          12.106762402863406
                      ],
                      [
                          -68.934844776309,
                          12.106866601989365
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "54",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93627401133092,
                          12.10470710195754
                      ],
                      [
                          -68.93617981449447,
                          12.104655758635843
                      ],
                      [
                          -68.93616804694935,
                          12.104676154453895
                      ],
                      [
                          -68.93611327562205,
                          12.1046457577598
                      ],
                      [
                          -68.93621274979891,
                          12.104471864993235
                      ],
                      [
                          -68.93629709038323,
                          12.104517971807606
                      ],
                      [
                          -68.93626179876087,
                          12.104580226423785
                      ],
                      [
                          -68.93632533748456,
                          12.10461587086576
                      ],
                      [
                          -68.93627401133092,
                          12.10470710195754
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "55",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93463863868749,
                          12.106733151785575
                      ],
                      [
                          -68.93456637781624,
                          12.106696530311448
                      ],
                      [
                          -68.93458024479246,
                          12.10666864330951
                      ],
                      [
                          -68.93455943211644,
                          12.106657114525605
                      ],
                      [
                          -68.93462562267854,
                          12.10652945021967
                      ],
                      [
                          -68.93470335070131,
                          12.10656815096585
                      ],
                      [
                          -68.9346777166517,
                          12.106616433461923
                      ],
                      [
                          -68.93469414009043,
                          12.106624805051137
                      ],
                      [
                          -68.93463863868749,
                          12.106733151785575
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "56",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93467955599338,
                          12.10460046784011
                      ],
                      [
                          -68.93460063734696,
                          12.104552173097677
                      ],
                      [
                          -68.93469493140474,
                          12.104403944228324
                      ],
                      [
                          -68.9347420581644,
                          12.10443228310643
                      ],
                      [
                          -68.93475171429031,
                          12.104418311704471
                      ],
                      [
                          -68.93482186546075,
                          12.10446135910627
                      ],
                      [
                          -68.93475330606383,
                          12.10457090794647
                      ],
                      [
                          -68.93471384675706,
                          12.104546760535937
                      ],
                      [
                          -68.93467955599338,
                          12.10460046784011
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "57",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93200662003045,
                          12.105092809422707
                      ],
                      [
                          -68.93190693177336,
                          12.10503725677875
                      ],
                      [
                          -68.93190616169579,
                          12.104963626865654
                      ],
                      [
                          -68.9319521841664,
                          12.10488632132837
                      ],
                      [
                          -68.93203873786227,
                          12.104935603857605
                      ],
                      [
                          -68.93199593764177,
                          12.105008607820682
                      ],
                      [
                          -68.93204086464208,
                          12.105034833164062
                      ],
                      [
                          -68.93200662003045,
                          12.105092809422707
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "58",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93452952048507,
                          12.10619105392665
                      ],
                      [
                          -68.93451517249945,
                          12.106068471360958
                      ],
                      [
                          -68.93454236320684,
                          12.106064995033197
                      ],
                      [
                          -68.93453748405537,
                          12.106014886060628
                      ],
                      [
                          -68.93461688942902,
                          12.106005546198123
                      ],
                      [
                          -68.93463256005657,
                          12.106150526623708
                      ],
                      [
                          -68.93460100238235,
                          12.106152979851323
                      ],
                      [
                          -68.9346035031743,
                          12.10618390325179
                      ],
                      [
                          -68.93452952048507,
                          12.10619105392665
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "59",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93406639927426,
                          12.10616585287736
                      ],
                      [
                          -68.93406614308259,
                          12.106141309961789
                      ],
                      [
                          -68.93403129624329,
                          12.106141662213156
                      ],
                      [
                          -68.934027205055,
                          12.106062731019616
                      ],
                      [
                          -68.93414366857178,
                          12.106056217797855
                      ],
                      [
                          -68.93414230115825,
                          12.10602955168393
                      ],
                      [
                          -68.93420869460323,
                          12.106025679029454
                      ],
                      [
                          -68.93421659827067,
                          12.106156864340049
                      ],
                      [
                          -68.93406639927426,
                          12.10616585287736
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "60",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93443400335003,
                          12.105700040510763
                      ],
                      [
                          -68.93435633026374,
                          12.105666674936849
                      ],
                      [
                          -68.93440848713331,
                          12.105550889904732
                      ],
                      [
                          -68.93447851523155,
                          12.105582198410914
                      ],
                      [
                          -68.93449236007557,
                          12.105552176806656
                      ],
                      [
                          -68.93455034268025,
                          12.105577203846757
                      ],
                      [
                          -68.93450456360169,
                          12.105677983488375
                      ],
                      [
                          -68.9344542372252,
                          12.105656080752986
                      ],
                      [
                          -68.93443400335003,
                          12.105700040510763
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "61",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9360977342007,
                          12.105453792931675
                      ],
                      [
                          -68.93601554996776,
                          12.105405530707626
                      ],
                      [
                          -68.93603161768816,
                          12.10537975564718
                      ],
                      [
                          -68.935994370293,
                          12.105358787355481
                      ],
                      [
                          -68.93606719735999,
                          12.105240659764426
                      ],
                      [
                          -68.93618554010912,
                          12.105309901487797
                      ],
                      [
                          -68.9360977342007,
                          12.105453792931675
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "62",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93252056055192,
                          12.105082269816917
                      ],
                      [
                          -68.93243732992012,
                          12.10503828943516
                      ],
                      [
                          -68.93247367465439,
                          12.104972821531168
                      ],
                      [
                          -68.93242330286033,
                          12.104946651108644
                      ],
                      [
                          -68.93246179211025,
                          12.10487795976869
                      ],
                      [
                          -68.93261401876438,
                          12.104958594384147
                      ],
                      [
                          -68.93258194061261,
                          12.105015481362068
                      ],
                      [
                          -68.93256332763804,
                          12.105006064846089
                      ],
                      [
                          -68.93252056055192,
                          12.105082269816917
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "63",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93367936744288,
                          12.106752452521405
                      ],
                      [
                          -68.933676554382,
                          12.106691651250465
                      ],
                      [
                          -68.93363845199218,
                          12.1066931037441
                      ],
                      [
                          -68.93363385906295,
                          12.106566154657951
                      ],
                      [
                          -68.93370680820033,
                          12.10656434979111
                      ],
                      [
                          -68.93370704219416,
                          12.106586758416658
                      ],
                      [
                          -68.93374841150046,
                          12.106585272913623
                      ],
                      [
                          -68.93375339426483,
                          12.106749569599254
                      ],
                      [
                          -68.93367936744288,
                          12.106752452521405
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "64",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93534760179814,
                          12.105581957950216
                      ],
                      [
                          -68.93534387874386,
                          12.105538240188906
                      ],
                      [
                          -68.9352840299162,
                          12.10554311327612
                      ],
                      [
                          -68.93527308318794,
                          12.10543330171841
                      ],
                      [
                          -68.9353361878654,
                          12.105427328543025
                      ],
                      [
                          -68.93533872182472,
                          12.105461453529179
                      ],
                      [
                          -68.93541488300886,
                          12.105454281373857
                      ],
                      [
                          -68.93542702980216,
                          12.105574752828016
                      ],
                      [
                          -68.93534760179814,
                          12.105581957950216
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "65",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93457716757686,
                          12.104494780403979
                      ],
                      [
                          -68.93450050470163,
                          12.10445393340939
                      ],
                      [
                          -68.93452938391805,
                          12.10440348227892
                      ],
                      [
                          -68.93448447958447,
                          12.10437938990764
                      ],
                      [
                          -68.93453794894297,
                          12.104284934182083
                      ],
                      [
                          -68.93459380992749,
                          12.10431531924239
                      ],
                      [
                          -68.93457456449774,
                          12.104349664764412
                      ],
                      [
                          -68.93463918182226,
                          12.104384230236674
                      ],
                      [
                          -68.93457716757686,
                          12.104494780403979
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "66",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93469839732276,
                          12.104944987986693
                      ],
                      [
                          -68.93463389168565,
                          12.104921093755909
                      ],
                      [
                          -68.93464873658556,
                          12.10488252410318
                      ],
                      [
                          -68.93458752009494,
                          12.10486073107704
                      ],
                      [
                          -68.93463307698923,
                          12.104738608333962
                      ],
                      [
                          -68.93471506204365,
                          12.104767662125894
                      ],
                      [
                          -68.93469279463494,
                          12.104825516670704
                      ],
                      [
                          -68.93473760967672,
                          12.104841072164517
                      ],
                      [
                          -68.93469839732276,
                          12.104944987986693
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "67",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93490367856518,
                          12.106144586229162
                      ],
                      [
                          -68.93488824205201,
                          12.106022014553146
                      ],
                      [
                          -68.93491868854477,
                          12.106017438236167
                      ],
                      [
                          -68.9349116093826,
                          12.105965217048194
                      ],
                      [
                          -68.9349899258519,
                          12.105955888456123
                      ],
                      [
                          -68.93500996294851,
                          12.106101892104123
                      ],
                      [
                          -68.93497733854983,
                          12.106106490387809
                      ],
                      [
                          -68.93498198376935,
                          12.106134190565333
                      ],
                      [
                          -68.93490367856518,
                          12.106144586229162
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "68",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93416897558625,
                          12.105350541349598
                      ],
                      [
                          -68.93416211876534,
                          12.105319661637944
                      ],
                      [
                          -68.93413060539648,
                          12.105326383401726
                      ],
                      [
                          -68.9341111015814,
                          12.105231599006371
                      ],
                      [
                          -68.93421217562307,
                          12.105211367665794
                      ],
                      [
                          -68.93420639664416,
                          12.105179409791505
                      ],
                      [
                          -68.93427486835252,
                          12.105165911267607
                      ],
                      [
                          -68.9343080855933,
                          12.105322455243641
                      ],
                      [
                          -68.93416897558625,
                          12.105350541349598
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "69",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9354887169497,
                          12.105014913420375
                      ],
                      [
                          -68.93539443097437,
                          12.104955034192265
                      ],
                      [
                          -68.93542445506506,
                          12.104909908156552
                      ],
                      [
                          -68.93537840656435,
                          12.10488049107898
                      ],
                      [
                          -68.93542559843962,
                          12.104810645754862
                      ],
                      [
                          -68.93553523030616,
                          12.104879975141447
                      ],
                      [
                          -68.93549448325655,
                          12.10494121759384
                      ],
                      [
                          -68.93552518592725,
                          12.104961184693831
                      ],
                      [
                          -68.9354887169497,
                          12.105014913420375
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "70",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9337309273577,
                          12.10522370306338
                      ],
                      [
                          -68.93369134547571,
                          12.105187818170034
                      ],
                      [
                          -68.9336719667983,
                          12.105209358312427
                      ],
                      [
                          -68.93362909568219,
                          12.105171372273977
                      ],
                      [
                          -68.93368939854186,
                          12.105105662663007
                      ],
                      [
                          -68.93364872762673,
                          12.105069788738225
                      ],
                      [
                          -68.93371119736878,
                          12.105002989930618
                      ],
                      [
                          -68.93383432129458,
                          12.105112735049708
                      ],
                      [
                          -68.9337309273577,
                          12.10522370306338
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "71",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93592995606505,
                          12.103984863175896
                      ],
                      [
                          -68.93582475734478,
                          12.10392295838342
                      ],
                      [
                          -68.93586222692295,
                          12.103860681102006
                      ],
                      [
                          -68.93588632919153,
                          12.103874311844091
                      ],
                      [
                          -68.93592702131055,
                          12.103807733116994
                      ],
                      [
                          -68.93605741130963,
                          12.103883257896538
                      ],
                      [
                          -68.9360209861396,
                          12.103941255643898
                      ],
                      [
                          -68.93597278166378,
                          12.103913994128753
                      ],
                      [
                          -68.93592995606505,
                          12.103984863175896
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "72",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93323836923756,
                          12.10530018754894
                      ],
                      [
                          -68.93310256737885,
                          12.105227923966604
                      ],
                      [
                          -68.93314103466018,
                          12.105157098942838
                      ],
                      [
                          -68.93314431273087,
                          12.105158132990102
                      ],
                      [
                          -68.93318171338755,
                          12.105089453131207
                      ],
                      [
                          -68.93331530397747,
                          12.105158537687997
                      ],
                      [
                          -68.93323836923756,
                          12.10530018754894
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "73",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9319376284511,
                          12.105889644005563
                      ],
                      [
                          -68.93191546964863,
                          12.105853583603649
                      ],
                      [
                          -68.93191415268831,
                          12.105727667101574
                      ],
                      [
                          -68.93191631946493,
                          12.105726577953034
                      ],
                      [
                          -68.93194291228815,
                          12.10577006392585
                      ],
                      [
                          -68.9320165045797,
                          12.105725563302151
                      ],
                      [
                          -68.93206965664223,
                          12.105809334010083
                      ],
                      [
                          -68.9319376284511,
                          12.105889644005563
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "74",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93210620979411,
                          12.10493065174472
                      ],
                      [
                          -68.93197579571569,
                          12.104852998535492
                      ],
                      [
                          -68.93205611881397,
                          12.104723051945173
                      ],
                      [
                          -68.93213720538114,
                          12.104770255595213
                      ],
                      [
                          -68.93209009374421,
                          12.104847572193016
                      ],
                      [
                          -68.93213939901341,
                          12.104875887729571
                      ],
                      [
                          -68.93210620979411,
                          12.10493065174472
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "75",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93348238059166,
                          12.103949823361582
                      ],
                      [
                          -68.9333629565859,
                          12.10388166136716
                      ],
                      [
                          -68.933387579786,
                          12.103840857637026
                      ],
                      [
                          -68.93340839315012,
                          12.103852386650303
                      ],
                      [
                          -68.93344585020004,
                          12.10378904130181
                      ],
                      [
                          -68.93359594419489,
                          12.103873968989006
                      ],
                      [
                          -68.93355633140123,
                          12.103939470465946
                      ],
                      [
                          -68.93350702610809,
                          12.103911153927124
                      ],
                      [
                          -68.93348238059166,
                          12.103949823361582
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "76",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93206846074531,
                          12.10715294109299
                      ],
                      [
                          -68.93197204131327,
                          12.107097356895267
                      ],
                      [
                          -68.93201594072038,
                          12.107025410956336
                      ],
                      [
                          -68.9319940276966,
                          12.107012826671824
                      ],
                      [
                          -68.93203042722277,
                          12.106952695660544
                      ],
                      [
                          -68.93216739473915,
                          12.107032414656375
                      ],
                      [
                          -68.93212671746016,
                          12.107100059159121
                      ],
                      [
                          -68.93210699353382,
                          12.107088519880772
                      ],
                      [
                          -68.93206846074531,
                          12.10715294109299
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "77",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93367377189206,
                          12.10538222778903
                      ],
                      [
                          -68.9335456489874,
                          12.10531522213851
                      ],
                      [
                          -68.9335712828657,
                          12.105266938532317
                      ],
                      [
                          -68.93355156991397,
                          12.105256465798215
                      ],
                      [
                          -68.93359218200044,
                          12.10518241765637
                      ],
                      [
                          -68.93370825947542,
                          12.105243142029058
                      ],
                      [
                          -68.93367084739535,
                          12.105310754459248
                      ],
                      [
                          -68.93370260587406,
                          12.105327508654073
                      ],
                      [
                          -68.93367377189206,
                          12.10538222778903
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "78",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93498679011542,
                          12.105133105794737
                      ],
                      [
                          -68.93492328460215,
                          12.105100663675533
                      ],
                      [
                          -68.93493930759048,
                          12.105070619946451
                      ],
                      [
                          -68.93487690212932,
                          12.105039233926023
                      ],
                      [
                          -68.93493669387001,
                          12.10492443832483
                      ],
                      [
                          -68.93501661202252,
                          12.104964185262842
                      ],
                      [
                          -68.93498885510314,
                          12.105017826183929
                      ],
                      [
                          -68.9350348368895,
                          12.10504084045076
                      ],
                      [
                          -68.93498679011542,
                          12.105133105794737
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "79",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93626281345519,
                          12.105514025370821
                      ],
                      [
                          -68.93621350967119,
                          12.105485708238476
                      ],
                      [
                          -68.93619850866037,
                          12.105509338064936
                      ],
                      [
                          -68.93612619195711,
                          12.10546737947712
                      ],
                      [
                          -68.93620754187812,
                          12.105331023659073
                      ],
                      [
                          -68.93633026254221,
                          12.105402355694624
                      ],
                      [
                          -68.93626281345519,
                          12.105514025370821
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "80",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93636048606164,
                          12.105062678740701
                      ],
                      [
                          -68.93629149162767,
                          12.105026022325411
                      ],
                      [
                          -68.93634491777445,
                          12.104927299954069
                      ],
                      [
                          -68.93632191589901,
                          12.104914725426417
                      ],
                      [
                          -68.93634648439644,
                          12.104868587460652
                      ],
                      [
                          -68.9364384696631,
                          12.104916751439577
                      ],
                      [
                          -68.93643920319745,
                          12.10498718001715
                      ],
                      [
                          -68.93640963415207,
                          12.104971470084154
                      ],
                      [
                          -68.93636048606164,
                          12.105062678740701
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "81",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93439966147078,
                          12.104391986368517
                      ],
                      [
                          -68.93432290936222,
                          12.104342602568929
                      ],
                      [
                          -68.93435186647467,
                          12.104299621080918
                      ],
                      [
                          -68.9343145849355,
                          12.104275451713955
                      ],
                      [
                          -68.93437678834317,
                          12.104183041959418
                      ],
                      [
                          -68.93449082205947,
                          12.104256595333442
                      ],
                      [
                          -68.93439966147078,
                          12.104391986368517
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "82",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9331333778652,
                          12.105466666792221
                      ],
                      [
                          -68.93299867626243,
                          12.10539545958303
                      ],
                      [
                          -68.93303929905555,
                          12.105322478448382
                      ],
                      [
                          -68.93309734905456,
                          12.105353907369448
                      ],
                      [
                          -68.93313157187187,
                          12.105293797485816
                      ],
                      [
                          -68.93320823471497,
                          12.105334643048355
                      ],
                      [
                          -68.9331333778652,
                          12.105466666792221
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "83",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93285373691828,
                          12.106741595225996
                      ],
                      [
                          -68.93273560530645,
                          12.106692632902922
                      ],
                      [
                          -68.93275372726613,
                          12.106655097873555
                      ],
                      [
                          -68.9327121683904,
                          12.106638443455532
                      ],
                      [
                          -68.93274088998122,
                          12.106573054167727
                      ],
                      [
                          -68.93288089011259,
                          12.106630332796673
                      ],
                      [
                          -68.93286281270821,
                          12.10667213612037
                      ],
                      [
                          -68.93288140306018,
                          12.106679418315945
                      ],
                      [
                          -68.93285373691828,
                          12.106741595225996
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "84",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9331300121486,
                          12.107125120801424
                      ],
                      [
                          -68.93297885567293,
                          12.107042342742611
                      ],
                      [
                          -68.93303233339022,
                          12.106948956579135
                      ],
                      [
                          -68.93314185326072,
                          12.107007610826553
                      ],
                      [
                          -68.9331311755344,
                          12.107027995354052
                      ],
                      [
                          -68.93317171211879,
                          12.10705106328168
                      ],
                      [
                          -68.9331300121486,
                          12.107125120801424
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "85",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93386775643032,
                          12.105081447901098
                      ],
                      [
                          -68.93376564615403,
                          12.105002439394262
                      ],
                      [
                          -68.93386027283746,
                          12.104886223666744
                      ],
                      [
                          -68.93394481471678,
                          12.104951536220167
                      ],
                      [
                          -68.9339018126756,
                          12.105005331572265
                      ],
                      [
                          -68.93391936996515,
                          12.10501796062236
                      ],
                      [
                          -68.93386775643032,
                          12.105081447901098
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "86",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93265019213364,
                          12.107064878223811
                      ],
                      [
                          -68.93249896823619,
                          12.106975698322936
                      ],
                      [
                          -68.93255681254932,
                          12.10688333480516
                      ],
                      [
                          -68.9326828455595,
                          12.10695889646138
                      ],
                      [
                          -68.93266571225695,
                          12.106986816686083
                      ],
                      [
                          -68.93268982541635,
                          12.107001513208493
                      ],
                      [
                          -68.93265019213364,
                          12.107064878223811
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "87",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93323637572324,
                          12.104483788907778
                      ],
                      [
                          -68.9331169521445,
                          12.10441562768513
                      ],
                      [
                          -68.93319506558123,
                          12.104282501957822
                      ],
                      [
                          -68.93325751661521,
                          12.104318155791953
                      ],
                      [
                          -68.93323394912677,
                          12.104355746956989
                      ],
                      [
                          -68.93329201073628,
                          12.104388243511835
                      ],
                      [
                          -68.93323637572324,
                          12.104483788907778
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "88",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9337835762152,
                          12.104424894039862
                      ],
                      [
                          -68.93364238444404,
                          12.104358019505575
                      ],
                      [
                          -68.93367654106379,
                          12.10429150636614
                      ],
                      [
                          -68.93372032322539,
                          12.104312408119366
                      ],
                      [
                          -68.9337544242028,
                          12.104240559414677
                      ],
                      [
                          -68.93385183392691,
                          12.104286532378499
                      ],
                      [
                          -68.9337835762152,
                          12.104424894039862
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "89",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9328676983182,
                          12.105055277843295
                      ],
                      [
                          -68.93273511819311,
                          12.104978713008908
                      ],
                      [
                          -68.93281539750832,
                          12.104844498823729
                      ],
                      [
                          -68.93295347837052,
                          12.104926344308865
                      ],
                      [
                          -68.93291492192121,
                          12.104988632817673
                      ],
                      [
                          -68.93290944358998,
                          12.104985486612758
                      ],
                      [
                          -68.9328676983182,
                          12.105055277843295
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "90",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93519330280535,
                          12.104884494439732
                      ],
                      [
                          -68.93511332902675,
                          12.104839411821038
                      ],
                      [
                          -68.93519467817339,
                          12.104703054072155
                      ],
                      [
                          -68.93531520008936,
                          12.104772273384505
                      ],
                      [
                          -68.93526060795283,
                          12.104863537789036
                      ],
                      [
                          -68.93522007102818,
                          12.104840468392
                      ],
                      [
                          -68.93519330280535,
                          12.104884494439732
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "91",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93240830422472,
                          12.106637250571351
                      ],
                      [
                          -68.93227465906227,
                          12.106562833151532
                      ],
                      [
                          -68.93231103659977,
                          12.106500567730064
                      ],
                      [
                          -68.9323581519643,
                          12.10652783768799
                      ],
                      [
                          -68.93239772951038,
                          12.106459136718001
                      ],
                      [
                          -68.93248319274524,
                          12.106508429545768
                      ],
                      [
                          -68.93240830422472,
                          12.106637250571351
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "92",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93398700736199,
                          12.104089863941223
                      ],
                      [
                          -68.93385010438728,
                          12.104016542112555
                      ],
                      [
                          -68.93389289517073,
                          12.1039424708728
                      ],
                      [
                          -68.9339509345081,
                          12.103972833733492
                      ],
                      [
                          -68.93398301373304,
                          12.103915946415285
                      ],
                      [
                          -68.93406077733681,
                          12.103957849461956
                      ],
                      [
                          -68.93398700736199,
                          12.104089863941223
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "93",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93219215058998,
                          12.107004417176146
                      ],
                      [
                          -68.93207274026793,
                          12.106937326542608
                      ],
                      [
                          -68.93212729504654,
                          12.1068428616703
                      ],
                      [
                          -68.9321042930425,
                          12.106830288359442
                      ],
                      [
                          -68.93213959258213,
                          12.106769101196653
                      ],
                      [
                          -68.93228199387254,
                          12.106847698327654
                      ],
                      [
                          -68.93219215058998,
                          12.107004417176146
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "94",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93606482689698,
                          12.104595020168547
                      ],
                      [
                          -68.93596070672432,
                          12.104532037676726
                      ],
                      [
                          -68.93605710282667,
                          12.104376318299723
                      ],
                      [
                          -68.9361864141664,
                          12.104452920730589
                      ],
                      [
                          -68.9361307210097,
                          12.104543128927356
                      ],
                      [
                          -68.9361066078089,
                          12.104528431152513
                      ],
                      [
                          -68.93606482689698,
                          12.104595020168547
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "95",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93241527386473,
                          12.103970225492066
                      ],
                      [
                          -68.93229691581523,
                          12.103899919418119
                      ],
                      [
                          -68.93237724008308,
                          12.103769971465763
                      ],
                      [
                          -68.93244079185787,
                          12.103806681182881
                      ],
                      [
                          -68.93241830236765,
                          12.103843194647828
                      ],
                      [
                          -68.93247309756353,
                          12.103875724073365
                      ],
                      [
                          -68.93241527386473,
                          12.103970225492066
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "96",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93255561223873,
                          12.104059519215657
                      ],
                      [
                          -68.93243836568492,
                          12.103991336282993
                      ],
                      [
                          -68.93251757875437,
                          12.103859265387989
                      ],
                      [
                          -68.93258113042347,
                          12.10389597514063
                      ],
                      [
                          -68.93255864090565,
                          12.103932488531932
                      ],
                      [
                          -68.93261342485621,
                          12.103963950872375
                      ],
                      [
                          -68.93255561223873,
                          12.104059519215657
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "97",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93291594062764,
                          12.105815707981206
                      ],
                      [
                          -68.93278335033366,
                          12.1057380768066
                      ],
                      [
                          -68.93281868411114,
                          12.105680090278833
                      ],
                      [
                          -68.93287018902407,
                          12.105710517955103
                      ],
                      [
                          -68.932914078506,
                          12.105637504011566
                      ],
                      [
                          -68.93299517511524,
                          12.105685774785092
                      ],
                      [
                          -68.93291594062764,
                          12.105815707981206
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "98",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9340490613652,
                          12.106904523954025
                      ],
                      [
                          -68.9339537540672,
                          12.106851060968499
                      ],
                      [
                          -68.93404255568018,
                          12.10669862268177
                      ],
                      [
                          -68.93410938309803,
                          12.106736365921947
                      ],
                      [
                          -68.93409440502059,
                          12.106762129822593
                      ],
                      [
                          -68.934121796027,
                          12.106777860755741
                      ],
                      [
                          -68.9340490613652,
                          12.106904523954025
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "99",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93556216209961,
                          12.105582993502459
                      ],
                      [
                          -68.93552779225568,
                          12.105524644246852
                      ],
                      [
                          -68.93551155782346,
                          12.105534412965012
                      ],
                      [
                          -68.9354494630797,
                          12.105428319343272
                      ],
                      [
                          -68.93557180489637,
                          12.1053587831517
                      ],
                      [
                          -68.93566824710916,
                          12.105521092089443
                      ],
                      [
                          -68.93556216209961,
                          12.105582993502459
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "100",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93407620914084,
                          12.105644960414393
                      ],
                      [
                          -68.93392114109034,
                          12.105604907043856
                      ],
                      [
                          -68.93393792962493,
                          12.105543906684325
                      ],
                      [
                          -68.9339728769208,
                          12.105553158234098
                      ],
                      [
                          -68.93399176546046,
                          12.105484666176519
                      ],
                      [
                          -68.93411189750739,
                          12.105516535200886
                      ],
                      [
                          -68.93407620914084,
                          12.105644960414393
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "101",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93594974116668,
                          12.104838439247251
                      ],
                      [
                          -68.93581386288224,
                          12.104758702133477
                      ],
                      [
                          -68.93591558113106,
                          12.104591189981376
                      ],
                      [
                          -68.9359846204628,
                          12.104632114799983
                      ],
                      [
                          -68.93593641699361,
                          12.1047094407395
                      ],
                      [
                          -68.93600435614394,
                          12.104749309389236
                      ],
                      [
                          -68.93594974116668,
                          12.104838439247251
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "102",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93388092454809,
                          12.10425635604887
                      ],
                      [
                          -68.93379983842863,
                          12.104209150778802
                      ],
                      [
                          -68.93384264023352,
                          12.104136146816119
                      ],
                      [
                          -68.93379333511395,
                          12.104107830226338
                      ],
                      [
                          -68.93382865888604,
                          12.104048775703307
                      ],
                      [
                          -68.93396015032909,
                          12.104125353849806
                      ],
                      [
                          -68.93388092454809,
                          12.10425635604887
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "103",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93593919969292,
                          12.105394561852414
                      ],
                      [
                          -68.93582089022578,
                          12.10532852175848
                      ],
                      [
                          -68.93592254117856,
                          12.105154608277967
                      ],
                      [
                          -68.93599922519188,
                          12.105197590058534
                      ],
                      [
                          -68.93598959121682,
                          12.105213695393022
                      ],
                      [
                          -68.93603121679114,
                          12.10523675396633
                      ],
                      [
                          -68.93593919969292,
                          12.105394561852414
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "104",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93516489909376,
                          12.10706933526248
                      ],
                      [
                          -68.93507065924898,
                          12.10701372629359
                      ],
                      [
                          -68.93516809606524,
                          12.106853731825492
                      ],
                      [
                          -68.93524480144093,
                          12.106898846211227
                      ],
                      [
                          -68.93520946678333,
                          12.106956830971917
                      ],
                      [
                          -68.9352270013328,
                          12.106967325747652
                      ],
                      [
                          -68.93516489909376,
                          12.10706933526248
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "105",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93407014906629,
                          12.105481739423501
                      ],
                      [
                          -68.93397658401042,
                          12.105386636685644
                      ],
                      [
                          -68.93402510875806,
                          12.105340256255557
                      ],
                      [
                          -68.93404272167103,
                          12.105358220739998
                      ],
                      [
                          -68.93409232429474,
                          12.105310762221304
                      ],
                      [
                          -68.9341693653986,
                          12.105387889652219
                      ],
                      [
                          -68.93407014906629,
                          12.105481739423501
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "106",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93633435935233,
                          12.10422731203298
                      ],
                      [
                          -68.9361951469514,
                          12.104141204059664
                      ],
                      [
                          -68.9362905326011,
                          12.103992964889061
                      ],
                      [
                          -68.93635849429337,
                          12.10403496837834
                      ],
                      [
                          -68.93631883540792,
                          12.104096200191762
                      ],
                      [
                          -68.93639117518732,
                          12.10414029392601
                      ],
                      [
                          -68.93633435935233,
                          12.10422731203298
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "107",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93465022839366,
                          12.106173826420024
                      ],
                      [
                          -68.93464604861232,
                          12.106086358581582
                      ],
                      [
                          -68.934659116182,
                          12.106086226560759
                      ],
                      [
                          -68.93465495867281,
                          12.106000892791064
                      ],
                      [
                          -68.93474856513772,
                          12.105995678345034
                      ],
                      [
                          -68.93475691339374,
                          12.106169547049864
                      ],
                      [
                          -68.93465022839366,
                          12.106173826420024
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "108",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93378137879661,
                          12.106926439568618
                      ],
                      [
                          -68.9336080008359,
                          12.10690578189114
                      ],
                      [
                          -68.9336221207243,
                          12.106797853291893
                      ],
                      [
                          -68.93374969582398,
                          12.106812571037914
                      ],
                      [
                          -68.93374771847026,
                          12.106831800390292
                      ],
                      [
                          -68.93379242139962,
                          12.106836684314699
                      ],
                      [
                          -68.93378137879661,
                          12.106926439568618
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "109",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93477127699286,
                          12.104101149056778
                      ],
                      [
                          -68.93470771513365,
                          12.104063371031954
                      ],
                      [
                          -68.93473878366622,
                          12.104013964815895
                      ],
                      [
                          -68.93470700271028,
                          12.103995075787918
                      ],
                      [
                          -68.93477236228513,
                          12.103891961784523
                      ],
                      [
                          -68.9348666161858,
                          12.103948640017606
                      ],
                      [
                          -68.93477127699286,
                          12.104101149056778
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "110",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93308747159222,
                          12.104408455387357
                      ],
                      [
                          -68.9329779155675,
                          12.104346597745446
                      ],
                      [
                          -68.93306461812548,
                          12.10420164542954
                      ],
                      [
                          -68.93313034735365,
                          12.104238333290153
                      ],
                      [
                          -68.93310254658617,
                          12.10428770680212
                      ],
                      [
                          -68.93314418434997,
                          12.104311831689396
                      ],
                      [
                          -68.93308747159222,
                          12.104408455387357
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "111",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93210924545146,
                          12.105741699372016
                      ],
                      [
                          -68.93202817076872,
                          12.1056955634685
                      ],
                      [
                          -68.9320656262947,
                          12.10563221913418
                      ],
                      [
                          -68.93201414341408,
                          12.105603925984308
                      ],
                      [
                          -68.9320548100825,
                          12.10553521302264
                      ],
                      [
                          -68.9321862676033,
                          12.105608586199214
                      ],
                      [
                          -68.93210924545146,
                          12.105741699372016
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "112",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93228140360159,
                          12.104707964203184
                      ],
                      [
                          -68.93214461172138,
                          12.104645316181124
                      ],
                      [
                          -68.93221068918075,
                          12.104506975853758
                      ],
                      [
                          -68.93228291895622,
                          12.104540395576821
                      ],
                      [
                          -68.9322530745892,
                          12.10460259644827
                      ],
                      [
                          -68.93231763680059,
                          12.10463182490816
                      ],
                      [
                          -68.93228140360159,
                          12.104707964203184
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "113",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93295263482113,
                          12.104324441872691
                      ],
                      [
                          -68.93284306747425,
                          12.104261517182461
                      ],
                      [
                          -68.93293194789449,
                          12.104116542552854
                      ],
                      [
                          -68.93299658824007,
                          12.104153241395622
                      ],
                      [
                          -68.9329666206913,
                          12.104203704147164
                      ],
                      [
                          -68.93301044763834,
                          12.104228874086118
                      ],
                      [
                          -68.93295263482113,
                          12.104324441872691
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "114",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93527013963461,
                          12.107135505002635
                      ],
                      [
                          -68.93517699998911,
                          12.107080952067882
                      ],
                      [
                          -68.93526586990336,
                          12.106934917743754
                      ],
                      [
                          -68.93534258630173,
                          12.106981099218041
                      ],
                      [
                          -68.93531795201515,
                          12.10702083373039
                      ],
                      [
                          -68.9353333086344,
                          12.107031350504219
                      ],
                      [
                          -68.93527013963461,
                          12.107135505002635
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "115",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93303066511571,
                          12.105642727564081
                      ],
                      [
                          -68.93294527951277,
                          12.105600903359852
                      ],
                      [
                          -68.93298154630216,
                          12.10552796647358
                      ],
                      [
                          -68.93293228617827,
                          12.105503919187274
                      ],
                      [
                          -68.93296536412953,
                          12.105438484915853
                      ],
                      [
                          -68.9330999876628,
                          12.105502222392571
                      ],
                      [
                          -68.93303066511571,
                          12.105642727564081
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "116",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93492365886505,
                          12.105554222939963
                      ],
                      [
                          -68.9349146893604,
                          12.10542518174521
                      ],
                      [
                          -68.93499522869544,
                          12.105420099480884
                      ],
                      [
                          -68.93499650686027,
                          12.10543822906871
                      ],
                      [
                          -68.93505093314361,
                          12.105435544990769
                      ],
                      [
                          -68.93505752422772,
                          12.105545400521095
                      ],
                      [
                          -68.93492365886505,
                          12.105554222939963
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "117",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9326851385858,
                          12.104156393002718
                      ],
                      [
                          -68.93257451536951,
                          12.104096680792745
                      ],
                      [
                          -68.93265791718147,
                          12.103948559378512
                      ],
                      [
                          -68.93272801381636,
                          12.103986270156591
                      ],
                      [
                          -68.93269915763409,
                          12.104038856303736
                      ],
                      [
                          -68.93273857301551,
                          12.10405873470987
                      ],
                      [
                          -68.9326851385858,
                          12.104156393002718
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "118",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93259422960709,
                          12.10441984994543
                      ],
                      [
                          -68.93253174492962,
                          12.104380995211542
                      ],
                      [
                          -68.93255961232806,
                          12.104338024259274
                      ],
                      [
                          -68.93248835994994,
                          12.104293922136327
                      ],
                      [
                          -68.93254300580018,
                          12.104207991116706
                      ],
                      [
                          -68.93267782076248,
                          12.104289870045859
                      ],
                      [
                          -68.93259422960709,
                          12.10441984994543
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "119",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93361201158123,
                          12.103848193030958
                      ],
                      [
                          -68.93348266407007,
                          12.103768391628257
                      ],
                      [
                          -68.93355770094479,
                          12.103653439116622
                      ],
                      [
                          -68.93365197804054,
                          12.103712250734082
                      ],
                      [
                          -68.93361554297108,
                          12.103769182355476
                      ],
                      [
                          -68.9336495244656,
                          12.10379018333876
                      ],
                      [
                          -68.93361201158123,
                          12.103848193030958
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "120",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93440764735956,
                          12.104739818801876
                      ],
                      [
                          -68.9343299512895,
                          12.10470431858833
                      ],
                      [
                          -68.93433848494956,
                          12.10468715688964
                      ],
                      [
                          -68.93429033602337,
                          12.104665231915186
                      ],
                      [
                          -68.93433721549542,
                          12.104565506938586
                      ],
                      [
                          -68.93446304945718,
                          12.104621865170461
                      ],
                      [
                          -68.93440764735956,
                          12.104739818801876
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "121",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93585947015156,
                          12.106626911803913
                      ],
                      [
                          -68.93571045983083,
                          12.106540906206643
                      ],
                      [
                          -68.93575757327906,
                          12.106463592998248
                      ],
                      [
                          -68.93579702050047,
                          12.106486673063916
                      ],
                      [
                          -68.93580452088617,
                          12.106474858272323
                      ],
                      [
                          -68.93591299510042,
                          12.106537794966746
                      ],
                      [
                          -68.93585947015156,
                          12.106626911803913
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "122",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9359291626894,
                          12.106521623969627
                      ],
                      [
                          -68.9357780077263,
                          12.106438841369739
                      ],
                      [
                          -68.93582508790992,
                          12.106358326850025
                      ],
                      [
                          -68.9358656129947,
                          12.10638032890443
                      ],
                      [
                          -68.93587311339608,
                          12.106368514101494
                      ],
                      [
                          -68.93598154319751,
                          12.106427182640813
                      ],
                      [
                          -68.9359291626894,
                          12.106521623969627
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "123",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93599561072746,
                          12.106418503161178
                      ],
                      [
                          -68.9358466113555,
                          12.106333564211397
                      ],
                      [
                          -68.93589261379957,
                          12.106254127683489
                      ],
                      [
                          -68.93593423899028,
                          12.106277185886846
                      ],
                      [
                          -68.93594171716789,
                          12.106263236910655
                      ],
                      [
                          -68.93605126935216,
                          12.106325095856914
                      ],
                      [
                          -68.93599561072746,
                          12.106418503161178
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "124",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93392357831505,
                          12.10489945745139
                      ],
                      [
                          -68.93380750059927,
                          12.104838732560582
                      ],
                      [
                          -68.93387804741117,
                          12.104711020684945
                      ],
                      [
                          -68.93402260573394,
                          12.104787466093049
                      ],
                      [
                          -68.93398733781639,
                          12.104851855487848
                      ],
                      [
                          -68.9339588573163,
                          12.104836135176331
                      ],
                      [
                          -68.93392357831505,
                          12.10489945745139
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "125",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93627860532722,
                          12.105984501510038
                      ],
                      [
                          -68.93612313850568,
                          12.105906030104206
                      ],
                      [
                          -68.93616693007223,
                          12.105823413968965
                      ],
                      [
                          -68.93621292234818,
                          12.105847495557429
                      ],
                      [
                          -68.9362193227456,
                          12.105834624596623
                      ],
                      [
                          -68.93632771953614,
                          12.105890092653803
                      ],
                      [
                          -68.93627860532722,
                          12.105984501510038
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "126",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9343679964946,
                          12.10709766218962
                      ],
                      [
                          -68.93429456885829,
                          12.107053582592398
                      ],
                      [
                          -68.93432135839198,
                          12.107011691696142
                      ],
                      [
                          -68.93430052347927,
                          12.10699802887367
                      ],
                      [
                          -68.93436480284849,
                          12.10689599672527
                      ],
                      [
                          -68.93446015442183,
                          12.106953728320923
                      ],
                      [
                          -68.9343679964946,
                          12.10709766218962
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "127",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93271564719504,
                          12.105199822862215
                      ],
                      [
                          -68.93262911636026,
                          12.105152674177155
                      ],
                      [
                          -68.93270507295361,
                          12.10502170559655
                      ],
                      [
                          -68.93283870857056,
                          12.105095058033552
                      ],
                      [
                          -68.93280341917742,
                          12.10515731338811
                      ],
                      [
                          -68.9327563033312,
                          12.105130042721454
                      ],
                      [
                          -68.93271564719504,
                          12.105199822862215
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "128",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93558940193725,
                          12.107046907162124
                      ],
                      [
                          -68.93544145867159,
                          12.106958757294256
                      ],
                      [
                          -68.93548749389332,
                          12.106882522448684
                      ],
                      [
                          -68.93552802997866,
                          12.106905591290568
                      ],
                      [
                          -68.93553659701027,
                          12.106891631405823
                      ],
                      [
                          -68.9356461599273,
                          12.106954556480826
                      ],
                      [
                          -68.93558940193725,
                          12.107046907162124
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "129",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93250892196436,
                          12.10553168244865
                      ],
                      [
                          -68.93242453577541,
                          12.10548131081581
                      ],
                      [
                          -68.93250593672458,
                          12.10535028752735
                      ],
                      [
                          -68.93263526080509,
                          12.105427951851144
                      ],
                      [
                          -68.93259778255548,
                          12.105489161957626
                      ],
                      [
                          -68.93255175576994,
                          12.105461880481617
                      ],
                      [
                          -68.93250892196436,
                          12.10553168244865
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "130",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93367324958272,
                          12.104602100731544
                      ],
                      [
                          -68.93356925046376,
                          12.104550858672875
                      ],
                      [
                          -68.93360981828422,
                          12.10447254142641
                      ],
                      [
                          -68.93357915965922,
                          12.104456843154217
                      ],
                      [
                          -68.9336101272589,
                          12.104397832873053
                      ],
                      [
                          -68.93374478511151,
                          12.104464773391584
                      ],
                      [
                          -68.93367324958272,
                          12.104602100731544
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "131",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93473740183292,
                          12.106804722706846
                      ],
                      [
                          -68.93464422820368,
                          12.106746968748316
                      ],
                      [
                          -68.93473638683118,
                          12.106603034471457
                      ],
                      [
                          -68.93481310371662,
                          12.106649215789371
                      ],
                      [
                          -68.93478736945467,
                          12.10668789452716
                      ],
                      [
                          -68.93480491522476,
                          12.106699456350213
                      ],
                      [
                          -68.93473740183292,
                          12.106804722706846
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "132",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93230447147177,
                          12.106810119189602
                      ],
                      [
                          -68.93221906417807,
                          12.106766162082451
                      ],
                      [
                          -68.93225963007994,
                          12.10668784656063
                      ],
                      [
                          -68.93221145927356,
                          12.106663788961637
                      ],
                      [
                          -68.93224134761041,
                          12.106605858066425
                      ],
                      [
                          -68.93237600360932,
                          12.106672794842058
                      ],
                      [
                          -68.93230447147177,
                          12.106810119189602
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "133",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93590193550212,
                          12.106103559168286
                      ],
                      [
                          -68.935808750823,
                          12.106044736581797
                      ],
                      [
                          -68.93587739923737,
                          12.105943727246448
                      ],
                      [
                          -68.93589384491682,
                          12.105954233264852
                      ],
                      [
                          -68.93591959089002,
                          12.105916621522558
                      ],
                      [
                          -68.93599414090215,
                          12.105963893164555
                      ],
                      [
                          -68.93590193550212,
                          12.106103559168286
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "134",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93317749994239,
                          12.106354130614246
                      ],
                      [
                          -68.93314800522785,
                          12.106241306414793
                      ],
                      [
                          -68.93315777244999,
                          12.106238006015422
                      ],
                      [
                          -68.93314415863173,
                          12.106185851166293
                      ],
                      [
                          -68.93323757540095,
                          12.106162494996324
                      ],
                      [
                          -68.933282861707,
                          12.106327452104315
                      ],
                      [
                          -68.93317749994239,
                          12.106354130614246
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "135",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93354430328478,
                          12.106750616836077
                      ],
                      [
                          -68.93353836814681,
                          12.106703720588262
                      ],
                      [
                          -68.93351878919187,
                          12.10670605297794
                      ],
                      [
                          -68.93350226214308,
                          12.106583493370572
                      ],
                      [
                          -68.9336121021618,
                          12.106568509058206
                      ],
                      [
                          -68.93363565313797,
                          12.106737953949235
                      ],
                      [
                          -68.93354430328478,
                          12.106750616836077
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "136",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93414870191675,
                          12.104660260040909
                      ],
                      [
                          -68.9341007706139,
                          12.104450502461631
                      ],
                      [
                          -68.93424094852377,
                          12.104420270754236
                      ],
                      [
                          -68.93428090034145,
                          12.104595958144863
                      ],
                      [
                          -68.93420809461063,
                          12.104611634986993
                      ],
                      [
                          -68.9342160738462,
                          12.104645705300754
                      ],
                      [
                          -68.93414870191675,
                          12.104660260040909
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "137",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93540293427039,
                          12.10608405040865
                      ],
                      [
                          -68.93538966514548,
                          12.105960389509466
                      ],
                      [
                          -68.93540707746449,
                          12.105959146517145
                      ],
                      [
                          -68.93540223210186,
                          12.105912238709047
                      ],
                      [
                          -68.93549579416313,
                          12.105902756564733
                      ],
                      [
                          -68.9355139084775,
                          12.106073325307095
                      ],
                      [
                          -68.93540293427039,
                          12.10608405040865
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "138",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93359905936559,
                          12.105528123306657
                      ],
                      [
                          -68.93349098384188,
                          12.105503603355217
                      ],
                      [
                          -68.9335013943399,
                          12.105457608224855
                      ],
                      [
                          -68.93344681204972,
                          12.105445353779457
                      ],
                      [
                          -68.933467688754,
                          12.105358698885064
                      ],
                      [
                          -68.9336303467377,
                          12.105395473387318
                      ],
                      [
                          -68.93359905936559,
                          12.105528123306657
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "139",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93529649959112,
                          12.106530144551844
                      ],
                      [
                          -68.93529278766052,
                          12.106487494420843
                      ],
                      [
                          -68.93526775271226,
                          12.10648881439517
                      ],
                      [
                          -68.93525665025535,
                          12.106364065101221
                      ],
                      [
                          -68.93536872424083,
                          12.106354395963015
                      ],
                      [
                          -68.93538462741836,
                          12.106521784422695
                      ],
                      [
                          -68.93529649959112,
                          12.106530144551844
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "140",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93433302059601,
                          12.105311531180025
                      ],
                      [
                          -68.9343269497883,
                          12.105147242369249
                      ],
                      [
                          -68.93446087132415,
                          12.105143754666035
                      ],
                      [
                          -68.93446418498466,
                          12.105252576522998
                      ],
                      [
                          -68.93442280401449,
                          12.105252994661926
                      ],
                      [
                          -68.93442556097254,
                          12.10530846162264
                      ],
                      [
                          -68.93433302059601,
                          12.105311531180025
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "141",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93527455891257,
                          12.106097085717122
                      ],
                      [
                          -68.93526288899018,
                          12.105917914391393
                      ],
                      [
                          -68.93530098053846,
                          12.105915395382095
                      ],
                      [
                          -68.93530105842095,
                          12.105922864986013
                      ],
                      [
                          -68.93537397461894,
                          12.105917859991322
                      ],
                      [
                          -68.93538557759857,
                          12.106090628819615
                      ],
                      [
                          -68.93527455891257,
                          12.106097085717122
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "142",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93357046817457,
                          12.104771760325972
                      ],
                      [
                          -68.9334259986357,
                          12.104703852328152
                      ],
                      [
                          -68.93346014385398,
                          12.104636272311176
                      ],
                      [
                          -68.93351488257791,
                          12.104663466375005
                      ],
                      [
                          -68.9335479388869,
                          12.104595897365082
                      ],
                      [
                          -68.93363550299665,
                          12.10463770060218
                      ],
                      [
                          -68.93357046817457,
                          12.104771760325972
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "143",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9335473234492,
                          12.106309836492848
                      ],
                      [
                          -68.93354286413927,
                          12.10619569175558
                      ],
                      [
                          -68.93355593169889,
                          12.106195559600584
                      ],
                      [
                          -68.93355422981513,
                          12.10613688103508
                      ],
                      [
                          -68.93364785842486,
                          12.10613379980301
                      ],
                      [
                          -68.93365400830585,
                          12.106305556031566
                      ],
                      [
                          -68.9335473234492,
                          12.106309836492848
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "144",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93517253626757,
                          12.10654847133119
                      ],
                      [
                          -68.93516773532689,
                          12.106505832209649
                      ],
                      [
                          -68.93514597839015,
                          12.106508186300303
                      ],
                      [
                          -68.93513158664976,
                          12.106381335877069
                      ],
                      [
                          -68.93524037147333,
                          12.106369565437616
                      ],
                      [
                          -68.93525955286056,
                          12.106537987942431
                      ],
                      [
                          -68.93517253626757,
                          12.10654847133119
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "145",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.933069272709,
                          12.106419257155427
                      ],
                      [
                          -68.93302591126836,
                          12.106334320426857
                      ],
                      [
                          -68.93305082360374,
                          12.106321262037069
                      ],
                      [
                          -68.9330274648239,
                          12.106274541830436
                      ],
                      [
                          -68.93310113522683,
                          12.106237511826075
                      ],
                      [
                          -68.93316895546852,
                          12.106370224956926
                      ],
                      [
                          -68.933069272709,
                          12.106419257155427
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "146",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93400370324436,
                          12.104750304625638
                      ],
                      [
                          -68.93396350861916,
                          12.104655728677988
                      ],
                      [
                          -68.93400146694722,
                          12.104640403927126
                      ],
                      [
                          -68.93397801913909,
                          12.104585145630937
                      ],
                      [
                          -68.93406152530893,
                          12.104551217753796
                      ],
                      [
                          -68.93412624545077,
                          12.10469997403255
                      ],
                      [
                          -68.93400370324436,
                          12.104750304625638
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "147",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93221767595149,
                          12.106008468789238
                      ],
                      [
                          -68.93213456865065,
                          12.105976227154336
                      ],
                      [
                          -68.93218652208475,
                          12.10584123384147
                      ],
                      [
                          -68.93233413512523,
                          12.105897368089174
                      ],
                      [
                          -68.9323065806464,
                          12.105970216653361
                      ],
                      [
                          -68.93224206387524,
                          12.105945257095964
                      ],
                      [
                          -68.93221767595149,
                          12.106008468789238
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "148",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93204589987417,
                          12.104058276255865
                      ],
                      [
                          -68.93198144882678,
                          12.104039718859287
                      ],
                      [
                          -68.93202460195123,
                          12.103896273329338
                      ],
                      [
                          -68.93217537318583,
                          12.103941704677284
                      ],
                      [
                          -68.93214798561523,
                          12.10403056186647
                      ],
                      [
                          -68.93206168788913,
                          12.104005822263696
                      ],
                      [
                          -68.93204589987417,
                          12.104058276255865
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "149",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93292347101728,
                          12.106640573801425
                      ],
                      [
                          -68.93280641713606,
                          12.106590533235364
                      ],
                      [
                          -68.93281917240255,
                          12.106560522815766
                      ],
                      [
                          -68.93278089153279,
                          12.10654490236639
                      ],
                      [
                          -68.93281496878333,
                          12.10647092128359
                      ],
                      [
                          -68.93297032594609,
                          12.106538716606899
                      ],
                      [
                          -68.93292347101728,
                          12.106640573801425
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "150",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9325861041345,
                          12.107185051407933
                      ],
                      [
                          -68.93246907298946,
                          12.107137145725728
                      ],
                      [
                          -68.93247757266897,
                          12.107116783204907
                      ],
                      [
                          -68.93243163579811,
                          12.10709803895748
                      ],
                      [
                          -68.93246673463234,
                          12.107017644838722
                      ],
                      [
                          -68.93262860265769,
                          12.107083238871104
                      ],
                      [
                          -68.9325861041345,
                          12.107185051407933
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "151",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93504633942003,
                          12.106561484859945
                      ],
                      [
                          -68.93504372747583,
                          12.106519890831576
                      ],
                      [
                          -68.93501869253632,
                          12.10652121086365
                      ],
                      [
                          -68.93500756752421,
                          12.106394327479045
                      ],
                      [
                          -68.9351185636309,
                          12.106385736160387
                      ],
                      [
                          -68.935132311546,
                          12.106555280676574
                      ],
                      [
                          -68.93504633942003,
                          12.106561484859945
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "152",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93517261157116,
                          12.105615740946957
                      ],
                      [
                          -68.93516553251706,
                          12.105563519467639
                      ],
                      [
                          -68.93511984031102,
                          12.105568249692611
                      ],
                      [
                          -68.93510565988304,
                          12.105461672451446
                      ],
                      [
                          -68.93524052532979,
                          12.105444302513524
                      ],
                      [
                          -68.93526180688366,
                          12.105605235465864
                      ],
                      [
                          -68.93517261157116,
                          12.105615740946957
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "153",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9335447428596,
                          12.105854169412076
                      ],
                      [
                          -68.9335302933834,
                          12.105721982580832
                      ],
                      [
                          -68.93366083585872,
                          12.105707856024845
                      ],
                      [
                          -68.93366929434134,
                          12.105787810628582
                      ],
                      [
                          -68.93365189314672,
                          12.10579012099287
                      ],
                      [
                          -68.93365787284134,
                          12.105841286166639
                      ],
                      [
                          -68.9335447428596,
                          12.105854169412076
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "154",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93278845915168,
                          12.106852176146347
                      ],
                      [
                          -68.93267356104177,
                          12.106799979680849
                      ],
                      [
                          -68.93268742750638,
                          12.106772092454667
                      ],
                      [
                          -68.93264803542695,
                          12.10675434896988
                      ],
                      [
                          -68.93268320146935,
                          12.106680357022872
                      ],
                      [
                          -68.93283640280575,
                          12.106750308150486
                      ],
                      [
                          -68.93278845915168,
                          12.106852176146347
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "155",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93379555163806,
                          12.106719262075416
                      ],
                      [
                          -68.93378960547057,
                          12.106671298722272
                      ],
                      [
                          -68.93377003764755,
                          12.106674698142891
                      ],
                      [
                          -68.93375462213542,
                          12.106554261601016
                      ],
                      [
                          -68.93386230657434,
                          12.106541433717984
                      ],
                      [
                          -68.93388256799143,
                          12.106708777588013
                      ],
                      [
                          -68.93379555163806,
                          12.106719262075416
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "156",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93272855938788,
                          12.10695629940856
                      ],
                      [
                          -68.93260937245697,
                          12.106910549610403
                      ],
                      [
                          -68.932623194274,
                          12.106878394122202
                      ],
                      [
                          -68.9325860024437,
                          12.106862762788651
                      ],
                      [
                          -68.93261574592414,
                          12.106790960186533
                      ],
                      [
                          -68.93277103584518,
                          12.10685235247998
                      ],
                      [
                          -68.93272855938788,
                          12.10695629940856
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "157",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93279644805037,
                          12.105949250028395
                      ],
                      [
                          -68.93268802700337,
                          12.105891651327097
                      ],
                      [
                          -68.9327553494161,
                          12.105768241845274
                      ],
                      [
                          -68.93289990718256,
                          12.105844684651677
                      ],
                      [
                          -68.93287317364347,
                          12.105891911996396
                      ],
                      [
                          -68.9328381259877,
                          12.105873057057838
                      ],
                      [
                          -68.93279644805037,
                          12.105949250028395
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "158",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93502439770279,
                          12.106128426218701
                      ],
                      [
                          -68.93501770643645,
                          12.106008967774924
                      ],
                      [
                          -68.9350318518506,
                          12.106007757716437
                      ],
                      [
                          -68.93502912860644,
                          12.105955492524647
                      ],
                      [
                          -68.93512273511865,
                          12.10595027840274
                      ],
                      [
                          -68.93513322729449,
                          12.106120923974645
                      ],
                      [
                          -68.93502439770279,
                          12.106128426218701
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "159",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93609545414688,
                          12.10701191887557
                      ],
                      [
                          -68.9360384727323,
                          12.106978343966519
                      ],
                      [
                          -68.93606954096046,
                          12.106928940035713
                      ],
                      [
                          -68.93601037046302,
                          12.106894320005566
                      ],
                      [
                          -68.93607034018208,
                          12.106796601044902
                      ],
                      [
                          -68.93618650329188,
                          12.10686586325138
                      ],
                      [
                          -68.93609545414688,
                          12.10701191887557
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "160",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93555531594957,
                          12.10649338148489
                      ],
                      [
                          -68.93555401564085,
                          12.106473117991458
                      ],
                      [
                          -68.93551810221363,
                          12.106475614913647
                      ],
                      [
                          -68.93551125578449,
                          12.106341217888776
                      ],
                      [
                          -68.93562119637723,
                          12.106335839319474
                      ],
                      [
                          -68.93562933183607,
                          12.106489432772273
                      ],
                      [
                          -68.93555531594957,
                          12.10649338148489
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "161",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93587841938735,
                          12.104160408027196
                      ],
                      [
                          -68.93578749993372,
                          12.104110098796408
                      ],
                      [
                          -68.9358249360582,
                          12.104044620315385
                      ],
                      [
                          -68.93576357478295,
                          12.10400895389958
                      ],
                      [
                          -68.93580103317221,
                          12.1039456095514
                      ],
                      [
                          -68.93595440298054,
                          12.104031574414
                      ],
                      [
                          -68.93587841938735,
                          12.104160408027196
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "162",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93520071859875,
                          12.105177902645497
                      ],
                      [
                          -68.9350644077324,
                          12.105161136581309
                      ],
                      [
                          -68.93508560697522,
                          12.105000840909556
                      ],
                      [
                          -68.93517502535175,
                          12.105011677275622
                      ],
                      [
                          -68.93516903673209,
                          12.10506403109347
                      ],
                      [
                          -68.93521484042837,
                          12.105069971849792
                      ],
                      [
                          -68.93520071859875,
                          12.105177902645497
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "163",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93440562366973,
                          12.106215784155353
                      ],
                      [
                          -68.93438805318966,
                          12.106097502990492
                      ],
                      [
                          -68.93441197699406,
                          12.106094059644043
                      ],
                      [
                          -68.93440491985127,
                          12.106043972702887
                      ],
                      [
                          -68.93449301464355,
                          12.106032410548195
                      ],
                      [
                          -68.93451655313567,
                          12.106200789706604
                      ],
                      [
                          -68.93440562366973,
                          12.106215784155353
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "164",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93552831048623,
                          12.107141435874125
                      ],
                      [
                          -68.9353773451987,
                          12.107076794728158
                      ],
                      [
                          -68.93541031286672,
                          12.107000691901597
                      ],
                      [
                          -68.93544531515542,
                          12.107015279081532
                      ],
                      [
                          -68.93545491549706,
                          12.106995972861238
                      ],
                      [
                          -68.93557087859814,
                          12.107046026965783
                      ],
                      [
                          -68.93552831048623,
                          12.107141435874125
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "165",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93551995281175,
                          12.106026307637118
                      ],
                      [
                          -68.93551328435964,
                          12.10590898319389
                      ],
                      [
                          -68.93553831944828,
                          12.105907663271639
                      ],
                      [
                          -68.93553586342533,
                          12.1058810080931
                      ],
                      [
                          -68.93562074716193,
                          12.105874815257673
                      ],
                      [
                          -68.93562989373709,
                          12.10602092906629
                      ],
                      [
                          -68.93551995281175,
                          12.106026307637118
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "166",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93346448704567,
                          12.104947855292615
                      ],
                      [
                          -68.93337368962386,
                          12.10490928671989
                      ],
                      [
                          -68.9334109010572,
                          12.104822465985652
                      ],
                      [
                          -68.9333660634978,
                          12.104804776827335
                      ],
                      [
                          -68.93339159712141,
                          12.10474688892324
                      ],
                      [
                          -68.93352723222114,
                          12.104803146809928
                      ],
                      [
                          -68.93346448704567,
                          12.104947855292615
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "167",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93408865043716,
                          12.107254159712483
                      ],
                      [
                          -68.93402070096482,
                          12.107213226559743
                      ],
                      [
                          -68.93407530187217,
                          12.107123031356778
                      ],
                      [
                          -68.93404901103982,
                          12.107108356572153
                      ],
                      [
                          -68.9340832671969,
                          12.107051449600412
                      ],
                      [
                          -68.93417860765867,
                          12.107108113758647
                      ],
                      [
                          -68.93408865043716,
                          12.107254159712483
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "168",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93620610553523,
                          12.10707483341542
                      ],
                      [
                          -68.93614587956628,
                          12.107043425579224
                      ],
                      [
                          -68.93622815040811,
                          12.106891055514524
                      ],
                      [
                          -68.93633874625806,
                          12.106948634936348
                      ],
                      [
                          -68.93627573185326,
                          12.107067727899231
                      ],
                      [
                          -68.93622318416399,
                          12.107041578469811
                      ],
                      [
                          -68.93620610553523,
                          12.10707483341542
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "169",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93227403782116,
                          12.104211781153415
                      ],
                      [
                          -68.93220291911841,
                          12.104180484479663
                      ],
                      [
                          -68.93222847458689,
                          12.104124730027744
                      ],
                      [
                          -68.9321617229112,
                          12.104094456352328
                      ],
                      [
                          -68.93220112279828,
                          12.104008679297182
                      ],
                      [
                          -68.9323400822779,
                          12.104070238786514
                      ],
                      [
                          -68.93227403782116,
                          12.104211781153415
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "170",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93342751733928,
                          12.106726185496537
                      ],
                      [
                          -68.93342487131343,
                          12.106681390347081
                      ],
                      [
                          -68.93333778809097,
                          12.106685472753414
                      ],
                      [
                          -68.93333341772308,
                          12.106579865205845
                      ],
                      [
                          -68.93347709348589,
                          12.106572008831815
                      ],
                      [
                          -68.93348412085456,
                          12.10672347861852
                      ],
                      [
                          -68.93342751733928,
                          12.106726185496537
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "171",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93568448298457,
                          12.104466523230164
                      ],
                      [
                          -68.93559354144719,
                          12.104414080158625
                      ],
                      [
                          -68.93563314417796,
                          12.104347512774527
                      ],
                      [
                          -68.93557288311253,
                          12.104312902732278
                      ],
                      [
                          -68.9356092634118,
                          12.104250636666407
                      ],
                      [
                          -68.93576157733014,
                          12.104339813213404
                      ],
                      [
                          -68.93568448298457,
                          12.104466523230164
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "172",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93490813215234,
                          12.10469207403575
                      ],
                      [
                          -68.93477994247868,
                          12.104618663673246
                      ],
                      [
                          -68.93485809122078,
                          12.104488740901779
                      ],
                      [
                          -68.93492273061966,
                          12.104525440686015
                      ],
                      [
                          -68.93490239614522,
                          12.1045597970499
                      ],
                      [
                          -68.93496593537567,
                          12.104595440717098
                      ],
                      [
                          -68.93490813215234,
                          12.10469207403575
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "173",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93230103100939,
                          12.105856082428849
                      ],
                      [
                          -68.93222104547156,
                          12.105809935431042
                      ],
                      [
                          -68.93229810117957,
                          12.105680023733521
                      ],
                      [
                          -68.93243286986561,
                          12.105757632338273
                      ],
                      [
                          -68.93239646966961,
                          12.105817764143172
                      ],
                      [
                          -68.93234278672601,
                          12.105787358783545
                      ],
                      [
                          -68.93230103100939,
                          12.105856082428849
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "174",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9340364100548,
                          12.105796905402851
                      ],
                      [
                          -68.93400998254299,
                          12.105664839516438
                      ],
                      [
                          -68.93417192702839,
                          12.10563332089496
                      ],
                      [
                          -68.93419029720897,
                          12.105723847440624
                      ],
                      [
                          -68.93413268214377,
                          12.105734034594876
                      ],
                      [
                          -68.9341418394029,
                          12.105776630096047
                      ],
                      [
                          -68.9340364100548,
                          12.105796905402851
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "175",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93484826599592,
                          12.10500857403665
                      ],
                      [
                          -68.93472685541161,
                          12.104958574265869
                      ],
                      [
                          -68.93478958004131,
                          12.104811732398192
                      ],
                      [
                          -68.93487270961884,
                          12.104846110786244
                      ],
                      [
                          -68.93484931977463,
                          12.104900774932812
                      ],
                      [
                          -68.934887600901,
                          12.10491639646849
                      ],
                      [
                          -68.93484826599592,
                          12.10500857403665
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "176",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93542269649693,
                          12.10651713131325
                      ],
                      [
                          -68.93541677332294,
                          12.106471301925323
                      ],
                      [
                          -68.93539501637527,
                          12.106473655966342
                      ],
                      [
                          -68.93538068056263,
                          12.106352140863349
                      ],
                      [
                          -68.93549055439662,
                          12.10634035967965
                      ],
                      [
                          -68.93551081321732,
                          12.106507704208758
                      ],
                      [
                          -68.93542269649693,
                          12.10651713131325
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "177",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93477303634312,
                          12.106149107463317
                      ],
                      [
                          -68.93476516677146,
                          12.1060211233788
                      ],
                      [
                          -68.93479345759332,
                          12.106018703197385
                      ],
                      [
                          -68.93479209034602,
                          12.105992037068008
                      ],
                      [
                          -68.9348726292399,
                          12.105986954734075
                      ],
                      [
                          -68.93488187703508,
                          12.10614267204916
                      ],
                      [
                          -68.93477303634312,
                          12.106149107463317
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "178",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93320358882572,
                          12.103951575953879
                      ],
                      [
                          -68.93314561612952,
                          12.103927616169473
                      ],
                      [
                          -68.93321161735565,
                          12.103781805384706
                      ],
                      [
                          -68.93333085210244,
                          12.103831826333574
                      ],
                      [
                          -68.9332840178043,
                          12.103935821201155
                      ],
                      [
                          -68.93322275586432,
                          12.10390976018531
                      ],
                      [
                          -68.93320358882572,
                          12.103951575953879
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "179",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93335842826183,
                          12.105116480278474
                      ],
                      [
                          -68.93321402592613,
                          12.105054975482464
                      ],
                      [
                          -68.93324381498215,
                          12.104987439766651
                      ],
                      [
                          -68.9333061652695,
                          12.105013489383715
                      ],
                      [
                          -68.93333596554297,
                          12.104947020759369
                      ],
                      [
                          -68.93341800655955,
                          12.104981408991538
                      ],
                      [
                          -68.93335842826183,
                          12.105116480278474
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "180",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9319626459085,
                          12.104012161378213
                      ],
                      [
                          -68.93189601684273,
                          12.103993626076722
                      ],
                      [
                          -68.93189466643922,
                          12.1038645051181
                      ],
                      [
                          -68.93192743652219,
                          12.103873778295757
                      ],
                      [
                          -68.93194428001873,
                          12.10381811177743
                      ],
                      [
                          -68.93201527629823,
                          12.103837670160734
                      ],
                      [
                          -68.9319626459085,
                          12.104012161378213
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "181",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93306476352275,
                          12.103902820652763
                      ],
                      [
                          -68.93296393001789,
                          12.103841941568978
                      ],
                      [
                          -68.93299286443279,
                          12.103796825181156
                      ],
                      [
                          -68.93294681472794,
                          12.103767408665872
                      ],
                      [
                          -68.93298431613275,
                          12.10370833154935
                      ],
                      [
                          -68.93313118826634,
                          12.103797560219718
                      ],
                      [
                          -68.93306476352275,
                          12.103902820652763
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "182",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93292416516421,
                          12.104622484371985
                      ],
                      [
                          -68.9327970852054,
                          12.104551199441017
                      ],
                      [
                          -68.9328741203031,
                          12.104419151830156
                      ],
                      [
                          -68.93300227819533,
                          12.10448935885556
                      ],
                      [
                          -68.93292416516421,
                          12.104622484371985
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "183",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93341096761692,
                          12.104098890052384
                      ],
                      [
                          -68.93331355751147,
                          12.104052917359308
                      ],
                      [
                          -68.93337003662907,
                          12.10393388392987
                      ],
                      [
                          -68.93351230699439,
                          12.103999680383904
                      ],
                      [
                          -68.93348032834592,
                          12.104066171806927
                      ],
                      [
                          -68.93343546818994,
                          12.104046348204328
                      ],
                      [
                          -68.93341096761692,
                          12.104098890052384
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "184",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93398449817322,
                          12.107187980199031
                      ],
                      [
                          -68.93389362489272,
                          12.107141942926855
                      ],
                      [
                          -68.93396089214005,
                          12.107013200911982
                      ],
                      [
                          -68.93404080912154,
                          12.10705294598037
                      ],
                      [
                          -68.93400340866324,
                          12.107121623757404
                      ],
                      [
                          -68.93401654294263,
                          12.107127894072985
                      ],
                      [
                          -68.93398449817322,
                          12.107187980199031
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "185",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93193039165809,
                          12.107280266900068
                      ],
                      [
                          -68.93192868403672,
                          12.107117005333512
                      ],
                      [
                          -68.93202392524243,
                          12.10716406395099
                      ],
                      [
                          -68.93198337087323,
                          12.107243446148484
                      ],
                      [
                          -68.9319997944468,
                          12.107251817261561
                      ],
                      [
                          -68.93198483927885,
                          12.107279715436801
                      ],
                      [
                          -68.93193039165809,
                          12.107280266900068
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "186",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93495433969548,
                          12.106929526397796
                      ],
                      [
                          -68.9348622997814,
                          12.10687602964739
                      ],
                      [
                          -68.93494363578861,
                          12.106738608248012
                      ],
                      [
                          -68.93503676473358,
                          12.10679209417034
                      ],
                      [
                          -68.93495433969548,
                          12.106929526397796
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "187",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93426699975907,
                          12.107020778543108
                      ],
                      [
                          -68.93417381490465,
                          12.106961958082676
                      ],
                      [
                          -68.93425741696234,
                          12.10683305086233
                      ],
                      [
                          -68.93435170197117,
                          12.106892927565896
                      ],
                      [
                          -68.93426699975907,
                          12.107020778543108
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "188",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93384469998213,
                          12.107149907857607
                      ],
                      [
                          -68.93375590423065,
                          12.107094245024706
                      ],
                      [
                          -68.93384809475998,
                          12.106953511811422
                      ],
                      [
                          -68.93393690171669,
                          12.107010241897958
                      ],
                      [
                          -68.93384469998213,
                          12.107149907857607
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "189",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93198527001253,
                          12.106487858664886
                      ],
                      [
                          -68.93192171966489,
                          12.106451150575428
                      ],
                      [
                          -68.93192058126476,
                          12.106342308372788
                      ],
                      [
                          -68.93194413665451,
                          12.10630365079574
                      ],
                      [
                          -68.93205700284385,
                          12.106369740967345
                      ],
                      [
                          -68.93198527001253,
                          12.106487858664886
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "190",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93580211694871,
                          12.106035198762381
                      ],
                      [
                          -68.93570897663807,
                          12.105980644545939
                      ],
                      [
                          -68.93579675930945,
                          12.10583461958053
                      ],
                      [
                          -68.93588988857876,
                          12.105888106895021
                      ],
                      [
                          -68.93580211694871,
                          12.106035198762381
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "191",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93459044579483,
                          12.107228812040248
                      ],
                      [
                          -68.9344930168501,
                          12.107180706177138
                      ],
                      [
                          -68.93456770706482,
                          12.10703268033846
                      ],
                      [
                          -68.9346651249753,
                          12.107079719297355
                      ],
                      [
                          -68.93459044579483,
                          12.107228812040248
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "192",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93543681749469,
                          12.10724480887628
                      ],
                      [
                          -68.93530425322216,
                          12.10716931034214
                      ],
                      [
                          -68.9353577885372,
                          12.107081260912764
                      ],
                      [
                          -68.93550240922849,
                          12.10716410815614
                      ],
                      [
                          -68.93545424072389,
                          12.107244632972465
                      ],
                      [
                          -68.93543681749469,
                          12.10724480887628
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "193",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9341553360817,
                          12.106965346414933
                      ],
                      [
                          -68.93406657376917,
                          12.106912884407745
                      ],
                      [
                          -68.93415868691112,
                          12.106764681620913
                      ],
                      [
                          -68.93424637147827,
                          12.106818221889874
                      ],
                      [
                          -68.9341553360817,
                          12.106965346414933
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "194",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9349579847442,
                          12.10425080897351
                      ],
                      [
                          -68.93480781454566,
                          12.104158410094316
                      ],
                      [
                          -68.93485388401787,
                          12.104085373511548
                      ],
                      [
                          -68.93500513213124,
                          12.104176694438081
                      ],
                      [
                          -68.9349579847442,
                          12.10425080897351
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "195",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93453339732666,
                          12.106666982279897
                      ],
                      [
                          -68.93443820143156,
                          12.106624189464537
                      ],
                      [
                          -68.93450848048606,
                          12.10647087112669
                      ],
                      [
                          -68.93460366535417,
                          12.106512597017142
                      ],
                      [
                          -68.93453339732666,
                          12.106666982279897
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "196",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93517769910541,
                          12.103910279954668
                      ],
                      [
                          -68.93501900591474,
                          12.103836109292274
                      ],
                      [
                          -68.9350531079391,
                          12.103764260582912
                      ],
                      [
                          -68.9352129013248,
                          12.10383948748952
                      ],
                      [
                          -68.93517769910541,
                          12.103910279954668
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "197",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93305593353494,
                          12.107227252588359
                      ],
                      [
                          -68.93292122295264,
                          12.107154980150177
                      ],
                      [
                          -68.9329746782575,
                          12.107059459952188
                      ],
                      [
                          -68.93310937777221,
                          12.107130665482236
                      ],
                      [
                          -68.93305593353494,
                          12.107227252588359
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "198",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93612956281402,
                          12.106209049025844
                      ],
                      [
                          -68.935980541027,
                          12.106121975481498
                      ],
                      [
                          -68.93603516643529,
                          12.106033914217491
                      ],
                      [
                          -68.93618308821644,
                          12.1061199318451
                      ],
                      [
                          -68.93612956281402,
                          12.106209049025844
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "199",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93619925591294,
                          12.106103760802723
                      ],
                      [
                          -68.93604807834859,
                          12.106018843181594
                      ],
                      [
                          -68.93610265939839,
                          12.10592651349169
                      ],
                      [
                          -68.93625275919827,
                          12.106012509366915
                      ],
                      [
                          -68.93619925591294,
                          12.106103760802723
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "200",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93605878089672,
                          12.106314348139682
                      ],
                      [
                          -68.93591298160143,
                          12.10622297352393
                      ],
                      [
                          -68.93597194051243,
                          12.106132734219825
                      ],
                      [
                          -68.9361177398762,
                          12.10622410902742
                      ],
                      [
                          -68.93605878089672,
                          12.106314348139682
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "201",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93579086671377,
                          12.106732188551002
                      ],
                      [
                          -68.9356440232733,
                          12.106645094112503
                      ],
                      [
                          -68.93569865923554,
                          12.106558100345753
                      ],
                      [
                          -68.93584441378934,
                          12.106645205951809
                      ],
                      [
                          -68.93579086671377,
                          12.106732188551002
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "202",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93580502186036,
                          12.105268918300478
                      ],
                      [
                          -68.93568889010942,
                          12.10520285625349
                      ],
                      [
                          -68.93577235091355,
                          12.105060075043584
                      ],
                      [
                          -68.93588958285741,
                          12.105127193417845
                      ],
                      [
                          -68.93580502186036,
                          12.105268918300478
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "203",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93366913120398,
                          12.10629366397167
                      ],
                      [
                          -68.93366299249084,
                          12.106122974799892
                      ],
                      [
                          -68.9337696886811,
                          12.106119761533497
                      ],
                      [
                          -68.93377582721943,
                          12.106290450712299
                      ],
                      [
                          -68.93366913120398,
                          12.10629366397167
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "204",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93412340924144,
                          12.106410731221313
                      ],
                      [
                          -68.93411902853074,
                          12.106304056204358
                      ],
                      [
                          -68.9342627158307,
                          12.106297267946454
                      ],
                      [
                          -68.93426818535521,
                          12.106403931967815
                      ],
                      [
                          -68.93412340924144,
                          12.106410731221313
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "205",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93476218159427,
                          12.10563055826624
                      ],
                      [
                          -68.93475288907732,
                          12.105470571524597
                      ],
                      [
                          -68.93489113268377,
                          12.10546383907599
                      ],
                      [
                          -68.93490041385843,
                          12.105622758745605
                      ],
                      [
                          -68.93476218159427,
                          12.10563055826624
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "206",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93331798098652,
                          12.107187250134208
                      ],
                      [
                          -68.93322056252136,
                          12.10714021244212
                      ],
                      [
                          -68.9332834954297,
                          12.107013648179672
                      ],
                      [
                          -68.9333809139804,
                          12.1070606860109
                      ],
                      [
                          -68.93331798098652,
                          12.107187250134208
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "207",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93405355714245,
                          12.10629191168024
                      ],
                      [
                          -68.93404817650828,
                          12.106193784165358
                      ],
                      [
                          -68.93420817613284,
                          12.10618469654778
                      ],
                      [
                          -68.93421465671588,
                          12.106283880152219
                      ],
                      [
                          -68.93405355714245,
                          12.10629191168024
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "208",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93310058345315,
                          12.104725286717855
                      ],
                      [
                          -68.932968181493,
                          12.104665794928923
                      ],
                      [
                          -68.93302148211527,
                          12.104555332163244
                      ],
                      [
                          -68.93315278405282,
                          12.104613768020007
                      ],
                      [
                          -68.93310058345315,
                          12.104725286717855
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "209",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93515163952756,
                          12.106111133277468
                      ],
                      [
                          -68.93514258130584,
                          12.105973556345052
                      ],
                      [
                          -68.93525032209828,
                          12.10596606520678
                      ],
                      [
                          -68.93526046914164,
                          12.10610363116121
                      ],
                      [
                          -68.93515163952756,
                          12.106111133277468
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "210",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93607891310631,
                          12.103856360281426
                      ],
                      [
                          -68.93593558866439,
                          12.103793772701584
                      ],
                      [
                          -68.93599841579578,
                          12.103656533419993
                      ],
                      [
                          -68.93614172926544,
                          12.103718054085633
                      ],
                      [
                          -68.93607891310631,
                          12.103856360281426
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "211",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93491779684975,
                          12.103843534802847
                      ],
                      [
                          -68.93477666074304,
                          12.103781993847809
                      ],
                      [
                          -68.93482241872051,
                          12.103679077591092
                      ],
                      [
                          -68.93496464392345,
                          12.103740607696087
                      ],
                      [
                          -68.93491779684975,
                          12.103843534802847
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "212",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93512518443262,
                          12.103991919445473
                      ],
                      [
                          -68.93496863591035,
                          12.103914525603622
                      ],
                      [
                          -68.93500386024603,
                          12.103845867300373
                      ],
                      [
                          -68.93516040884131,
                          12.103923261266676
                      ],
                      [
                          -68.93512518443262,
                          12.103991919445473
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "213",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93481332443758,
                          12.106565972809905
                      ],
                      [
                          -68.93467654772536,
                          12.106504390339
                      ],
                      [
                          -68.93472237110305,
                          12.106407880186186
                      ],
                      [
                          -68.9348580589503,
                          12.10646947379748
                      ],
                      [
                          -68.93481332443758,
                          12.106565972809905
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "214",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93342657125298,
                          12.106322796892336
                      ],
                      [
                          -68.93340649852354,
                          12.106173592638243
                      ],
                      [
                          -68.93351635011038,
                          12.106159675245316
                      ],
                      [
                          -68.93353533372174,
                          12.106308890554912
                      ],
                      [
                          -68.93342657125298,
                          12.106322796892336
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "215",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93371572436388,
                          12.107105323140477
                      ],
                      [
                          -68.93356920277702,
                          12.107049176975428
                      ],
                      [
                          -68.9336095578255,
                          12.106950587921189
                      ],
                      [
                          -68.93375607952507,
                          12.107006734218762
                      ],
                      [
                          -68.93371572436388,
                          12.107105323140477
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "216",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93490139655889,
                          12.106552276900102
                      ],
                      [
                          -68.93488358181565,
                          12.106410520461008
                      ],
                      [
                          -68.93499018866852,
                          12.106398771770332
                      ],
                      [
                          -68.9350069031791,
                          12.106539472164627
                      ],
                      [
                          -68.93490139655889,
                          12.106552276900102
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "217",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93193216020063,
                          12.104637862661509
                      ],
                      [
                          -68.93191998053504,
                          12.104618776081965
                      ],
                      [
                          -68.93190266845637,
                          12.104629623602932
                      ],
                      [
                          -68.93190088278187,
                          12.10445888653905
                      ],
                      [
                          -68.93199059685494,
                          12.10460205263317
                      ],
                      [
                          -68.93193216020063,
                          12.104637862661509
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "218",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93566880552622,
                          12.106932984220137
                      ],
                      [
                          -68.93550913951472,
                          12.106869497709255
                      ],
                      [
                          -68.93554845198338,
                          12.106775188505116
                      ],
                      [
                          -68.93570811811092,
                          12.1068386751581
                      ],
                      [
                          -68.93566880552622,
                          12.106932984220137
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "219",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93330375262414,
                          12.106346450265237
                      ],
                      [
                          -68.93327914551872,
                          12.106180216809124
                      ],
                      [
                          -68.93338788583141,
                          12.106164176134627
                      ],
                      [
                          -68.93341359287282,
                          12.106331465711405
                      ],
                      [
                          -68.93330375262414,
                          12.106346450265237
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "220",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93200448577348,
                          12.10457629872244
                      ],
                      [
                          -68.93197820049551,
                          12.10445810349496
                      ],
                      [
                          -68.93211621107794,
                          12.104428958168391
                      ],
                      [
                          -68.9321424962044,
                          12.104547153469815
                      ],
                      [
                          -68.93200448577348,
                          12.10457629872244
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "221",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93501475493095,
                          12.104159521680742
                      ],
                      [
                          -68.93486460691737,
                          12.104069256832789
                      ],
                      [
                          -68.93490530944774,
                          12.104003744978963
                      ],
                      [
                          -68.93505545751611,
                          12.104094009964248
                      ],
                      [
                          -68.93501475493095,
                          12.104159521680742
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "222",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93506840292676,
                          12.10408213976384
                      ],
                      [
                          -68.93491605462276,
                          12.103989762515877
                      ],
                      [
                          -68.93495891293287,
                          12.103922094389223
                      ],
                      [
                          -68.9351112612932,
                          12.104014471782868
                      ],
                      [
                          -68.93506840292676,
                          12.10408213976384
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "223",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9352215575929,
                          12.103834063946618
                      ],
                      [
                          -68.93507028693938,
                          12.103740608055789
                      ],
                      [
                          -68.93511315658301,
                          12.103674006892366
                      ],
                      [
                          -68.93526442729016,
                          12.103767462928033
                      ],
                      [
                          -68.9352215575929,
                          12.103834063946618
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "224",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93194344187137,
                          12.105195901530436
                      ],
                      [
                          -68.93190841612825,
                          12.105179180901006
                      ],
                      [
                          -68.93190756792505,
                          12.105098081435278
                      ],
                      [
                          -68.93197544150382,
                          12.105131544796006
                      ],
                      [
                          -68.93194344187137,
                          12.105195901530436
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "225",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93642874485211,
                          12.103983033016236
                      ],
                      [
                          -68.93634108137361,
                          12.103931623140031
                      ],
                      [
                          -68.93639784181305,
                          12.103839269124476
                      ],
                      [
                          -68.9364274334027,
                          12.103857113532188
                      ],
                      [
                          -68.93642874485211,
                          12.103983033016236
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "226",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93643079002186,
                          12.104283969371979
                      ],
                      [
                          -68.9363650287141,
                          12.104244078234162
                      ],
                      [
                          -68.93643040083852,
                          12.10414203274215
                      ],
                      [
                          -68.93643185677627,
                          12.104281824170371
                      ],
                      [
                          -68.93643079002186,
                          12.104283969371979
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "227",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93643786949926,
                          12.10485912800896
                      ],
                      [
                          -68.93639188771381,
                          12.1047315261111
                      ],
                      [
                          -68.93643638020609,
                          12.104716136342681
                      ],
                      [
                          -68.93643786949926,
                          12.10485912800896
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "228",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93041975421568,
                          12.104255116856205
                      ],
                      [
                          -68.93025640016883,
                          12.10415218558456
                      ],
                      [
                          -68.93027241081833,
                          12.104121073626835
                      ],
                      [
                          -68.93026473203179,
                          12.104115815380526
                      ],
                      [
                          -68.93029794293469,
                          12.104063184408316
                      ],
                      [
                          -68.93030341022036,
                          12.104065263409758
                      ],
                      [
                          -68.93033657645408,
                          12.104008363956961
                      ],
                      [
                          -68.93040124018816,
                          12.104047195559057
                      ],
                      [
                          -68.93039157341812,
                          12.10406010032574
                      ],
                      [
                          -68.93043102278929,
                          12.104083179238527
                      ],
                      [
                          -68.93043958940018,
                          12.104069218409528
                      ],
                      [
                          -68.93050097492426,
                          12.104107016055842
                      ],
                      [
                          -68.93046456403025,
                          12.104166082737075
                      ],
                      [
                          -68.9304678756864,
                          12.10417031805567
                      ],
                      [
                          -68.93041975421568,
                          12.104255116856205
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "229",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9305995302796,
                          12.10395020143445
                      ],
                      [
                          -68.93053925603965,
                          12.103914526840342
                      ],
                      [
                          -68.93054672251716,
                          12.103899509916381
                      ],
                      [
                          -68.93050945108199,
                          12.103876408817168
                      ],
                      [
                          -68.93050087327055,
                          12.1038893025591
                      ],
                      [
                          -68.93043733199455,
                          12.103853661120374
                      ],
                      [
                          -68.93051966440055,
                          12.103707682751727
                      ],
                      [
                          -68.93069830938819,
                          12.103814728936806
                      ],
                      [
                          -68.93066402038869,
                          12.103868438106884
                      ],
                      [
                          -68.93065965326211,
                          12.10386741515662
                      ],
                      [
                          -68.93064145330817,
                          12.103897482123283
                      ],
                      [
                          -68.93063707500933,
                          12.103895392058163
                      ],
                      [
                          -68.9305995302796,
                          12.10395020143445
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "230",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9303050435158,
                          12.10442917044787
                      ],
                      [
                          -68.93024917008093,
                          12.10439772050481
                      ],
                      [
                          -68.93025450322305,
                          12.104386994183184
                      ],
                      [
                          -68.93020517482823,
                          12.104356545079115
                      ],
                      [
                          -68.93019981933374,
                          12.104365137188365
                      ],
                      [
                          -68.93008589432682,
                          12.104302259462804
                      ],
                      [
                          -68.9301159387329,
                          12.104259265702758
                      ],
                      [
                          -68.93011921686494,
                          12.104260299672411
                      ],
                      [
                          -68.93016317218124,
                          12.104193685828657
                      ],
                      [
                          -68.93037142047976,
                          12.104319640493909
                      ],
                      [
                          -68.9303050435158,
                          12.10442917044787
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "231",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93114214075806,
                          12.1067824080551
                      ],
                      [
                          -68.93108296844237,
                          12.106747790601538
                      ],
                      [
                          -68.93110012371106,
                          12.10672200417474
                      ],
                      [
                          -68.93102559422279,
                          12.106676870487211
                      ],
                      [
                          -68.93107808199312,
                          12.106593097584108
                      ],
                      [
                          -68.93115042242837,
                          12.10663718635678
                      ],
                      [
                          -68.9311771996738,
                          12.106594227327522
                      ],
                      [
                          -68.93123638320928,
                          12.106629911982697
                      ],
                      [
                          -68.93114214075806,
                          12.1067824080551
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "232",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93093456271275,
                          12.106615896250497
                      ],
                      [
                          -68.9309010449073,
                          12.106535129499076
                      ],
                      [
                          -68.93085765406343,
                          12.106551577278264
                      ],
                      [
                          -68.93083304896312,
                          12.10648992958649
                      ],
                      [
                          -68.9310130904266,
                          12.106418736832342
                      ],
                      [
                          -68.93103767309445,
                          12.106478250461238
                      ],
                      [
                          -68.93098452624078,
                          12.106499065863003
                      ],
                      [
                          -68.9310191552913,
                          12.106581955794573
                      ],
                      [
                          -68.93093456271275,
                          12.106615896250497
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "233",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9314604704205,
                          12.10608443925742
                      ],
                      [
                          -68.93145684623124,
                          12.106050325632959
                      ],
                      [
                          -68.93137307405951,
                          12.106058644884694
                      ],
                      [
                          -68.93136114593084,
                          12.105959516230962
                      ],
                      [
                          -68.93144272908344,
                          12.105950151943354
                      ],
                      [
                          -68.93143673713651,
                          12.105897919839538
                      ],
                      [
                          -68.93150961977042,
                          12.105889710958616
                      ],
                      [
                          -68.93153227512445,
                          12.106077308526533
                      ],
                      [
                          -68.9314604704205,
                          12.10608443925742
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "234",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93162517055424,
                          12.104234360886553
                      ],
                      [
                          -68.93145975141168,
                          12.10414212099346
                      ],
                      [
                          -68.93149398489346,
                          12.10408307671697
                      ],
                      [
                          -68.93152793324786,
                          12.104100875616451
                      ],
                      [
                          -68.93157288918987,
                          12.10402571429722
                      ],
                      [
                          -68.93166272189568,
                          12.10407603113555
                      ],
                      [
                          -68.93161885489859,
                          12.104151181333641
                      ],
                      [
                          -68.9316604819175,
                          12.104174238593702
                      ],
                      [
                          -68.93162517055424,
                          12.104234360886553
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "235",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93130844404928,
                          12.106855425721502
                      ],
                      [
                          -68.93122953658369,
                          12.106808201972928
                      ],
                      [
                          -68.9312134814242,
                          12.106835044386699
                      ],
                      [
                          -68.93116197654102,
                          12.106804617958902
                      ],
                      [
                          -68.93125834107944,
                          12.106646764491595
                      ],
                      [
                          -68.93131971364105,
                          12.106683494169737
                      ],
                      [
                          -68.93128866986788,
                          12.106735033861804
                      ],
                      [
                          -68.93135769857258,
                          12.106774887490891
                      ],
                      [
                          -68.93130844404928,
                          12.106855425721502
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "236",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93185721031558,
                          12.104656764470606
                      ],
                      [
                          -68.93180959172128,
                          12.104581474258172
                      ],
                      [
                          -68.93186695054818,
                          12.10454674227241
                      ],
                      [
                          -68.93183482320376,
                          12.10449477389092
                      ],
                      [
                          -68.93189867133667,
                          12.104455707273791
                      ],
                      [
                          -68.93197398315594,
                          12.104575540409064
                      ],
                      [
                          -68.93197436258707,
                          12.104611822010712
                      ],
                      [
                          -68.93193216020063,
                          12.104637862661509
                      ],
                      [
                          -68.93191998053504,
                          12.104618776081965
                      ],
                      [
                          -68.93185721031558,
                          12.104656764470606
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "237",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93170502473401,
                          12.104996613379479
                      ],
                      [
                          -68.93161638227417,
                          12.10495589002631
                      ],
                      [
                          -68.93165582602062,
                          12.104874382131904
                      ],
                      [
                          -68.93161642188373,
                          12.104855571442949
                      ],
                      [
                          -68.9316441436587,
                          12.10479872816687
                      ],
                      [
                          -68.93180831636981,
                          12.104876039100047
                      ],
                      [
                          -68.93177740573115,
                          12.104940385072549
                      ],
                      [
                          -68.93174020192099,
                          12.104923686498134
                      ],
                      [
                          -68.93170502473401,
                          12.104996613379479
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "238",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93112371850013,
                          12.104085761530834
                      ],
                      [
                          -68.93107549038999,
                          12.104056367987516
                      ],
                      [
                          -68.93108729054092,
                          12.104039172754069
                      ],
                      [
                          -68.93105550889086,
                          12.10402028478586
                      ],
                      [
                          -68.93110158702981,
                          12.103948313486852
                      ],
                      [
                          -68.931123511966,
                          12.103961965243759
                      ],
                      [
                          -68.93113958990914,
                          12.10393725603984
                      ],
                      [
                          -68.93119549680213,
                          12.103971907980844
                      ],
                      [
                          -68.93112371850013,
                          12.104085761530834
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "239",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93076362073856,
                          12.10568383152612
                      ],
                      [
                          -68.9306772793019,
                          12.10565482524759
                      ],
                      [
                          -68.93070051038757,
                          12.105585221366619
                      ],
                      [
                          -68.93067646365111,
                          12.105576927545727
                      ],
                      [
                          -68.93069760619747,
                          12.105515882422656
                      ],
                      [
                          -68.93086807777993,
                          12.10557071598606
                      ],
                      [
                          -68.93084270215539,
                          12.105643543194557
                      ],
                      [
                          -68.93078369668561,
                          12.105624931731862
                      ],
                      [
                          -68.93076362073856,
                          12.10568383152612
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "240",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93150018309478,
                          12.105612333845011
                      ],
                      [
                          -68.9314898576116,
                          12.105562279823344
                      ],
                      [
                          -68.93141704174329,
                          12.105576891298222
                      ],
                      [
                          -68.93139975808879,
                          12.105486353926121
                      ],
                      [
                          -68.93145302835961,
                          12.105477276501437
                      ],
                      [
                          -68.93144042441004,
                          12.105417640612341
                      ],
                      [
                          -68.93152738586626,
                          12.105401818599717
                      ],
                      [
                          -68.93156648745556,
                          12.105599922813072
                      ],
                      [
                          -68.93150018309478,
                          12.105612333845011
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "241",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93162752983613,
                          12.10706242808463
                      ],
                      [
                          -68.93156943563748,
                          12.107026732399936
                      ],
                      [
                          -68.93155870239123,
                          12.107041781732649
                      ],
                      [
                          -68.9314973301249,
                          12.107005052103625
                      ],
                      [
                          -68.93158837298515,
                          12.106858992346538
                      ],
                      [
                          -68.9316563348587,
                          12.106900991273944
                      ],
                      [
                          -68.93162525749977,
                          12.106949329498667
                      ],
                      [
                          -68.9316778734521,
                          12.106981879194432
                      ],
                      [
                          -68.93162752983613,
                          12.10706242808463
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "242",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93060945253045,
                          12.10489779395995
                      ],
                      [
                          -68.93056011330691,
                          12.104866277809773
                      ],
                      [
                          -68.93057299108241,
                          12.104848004552771
                      ],
                      [
                          -68.93054339870562,
                          12.104830161961385
                      ],
                      [
                          -68.93058839831559,
                          12.104759269337077
                      ],
                      [
                          -68.93061032315647,
                          12.10477292083896
                      ],
                      [
                          -68.93062747865436,
                          12.10474713366899
                      ],
                      [
                          -68.93068447428251,
                          12.104781773920894
                      ],
                      [
                          -68.93060945253045,
                          12.10489779395995
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "243",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9317822124714,
                          12.106024618149851
                      ],
                      [
                          -68.93172309079787,
                          12.105890749872836
                      ],
                      [
                          -68.93179357227913,
                          12.10586122148938
                      ],
                      [
                          -68.93177015701993,
                          12.105809165802349
                      ],
                      [
                          -68.9318471388939,
                          12.105776369972226
                      ],
                      [
                          -68.9319441781682,
                          12.105995230457546
                      ],
                      [
                          -68.93191491001946,
                          12.106008333279398
                      ],
                      [
                          -68.93190040747791,
                          12.105975396991736
                      ],
                      [
                          -68.9317822124714,
                          12.106024618149851
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "244",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93043038717647,
                          12.105166413215862
                      ],
                      [
                          -68.93039092702958,
                          12.105142267551203
                      ],
                      [
                          -68.930402704589,
                          12.105122938284133
                      ],
                      [
                          -68.9303665225225,
                          12.105099826579497
                      ],
                      [
                          -68.9304104887948,
                          12.10503428067135
                      ],
                      [
                          -68.9304346027318,
                          12.105048977097566
                      ],
                      [
                          -68.93045175813933,
                          12.105023189990852
                      ],
                      [
                          -68.93050329762698,
                          12.105056818136946
                      ],
                      [
                          -68.93043038717647,
                          12.105166413215862
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "245",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93148604978174,
                          12.106967814916283
                      ],
                      [
                          -68.9313545152458,
                          12.106886974446187
                      ],
                      [
                          -68.93140701432827,
                          12.106804269017369
                      ],
                      [
                          -68.93147934330771,
                          12.106847290802877
                      ],
                      [
                          -68.9315061206283,
                          12.106804331978054
                      ],
                      [
                          -68.93156748184222,
                          12.106839994639818
                      ],
                      [
                          -68.93148604978174,
                          12.106967814916283
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "246",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93077859510589,
                          12.104617535278706
                      ],
                      [
                          -68.93073912366924,
                          12.104592322199855
                      ],
                      [
                          -68.93075413478405,
                          12.104569758392316
                      ],
                      [
                          -68.93071795261264,
                          12.104546646395926
                      ],
                      [
                          -68.9307608303646,
                          12.104481111207507
                      ],
                      [
                          -68.930786033356,
                          12.104495796782357
                      ],
                      [
                          -68.93079890004653,
                          12.104476456357752
                      ],
                      [
                          -68.93085041733701,
                          12.104507950704695
                      ],
                      [
                          -68.93077859510589,
                          12.104617535278706
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "247",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93089214643007,
                          12.105373038680984
                      ],
                      [
                          -68.93076522229975,
                          12.10531669618504
                      ],
                      [
                          -68.93079929857906,
                          12.105242713222067
                      ],
                      [
                          -68.93085182627361,
                          12.105266726518794
                      ],
                      [
                          -68.93087419201939,
                          12.105218475314881
                      ],
                      [
                          -68.93101316193182,
                          12.105281099171359
                      ],
                      [
                          -68.93098120761199,
                          12.10534972446929
                      ],
                      [
                          -68.9309166454327,
                          12.105320497091116
                      ],
                      [
                          -68.93089214643007,
                          12.105373038680984
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "248",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9310512981624,
                          12.103826091809273
                      ],
                      [
                          -68.93096470956003,
                          12.103773607944278
                      ],
                      [
                          -68.93101293222529,
                          12.10369841294015
                      ],
                      [
                          -68.93102498930051,
                          12.103705761354657
                      ],
                      [
                          -68.93103356719112,
                          12.103692867625986
                      ],
                      [
                          -68.93109275238704,
                          12.103728553637179
                      ],
                      [
                          -68.93107345212718,
                          12.103757564499968
                      ],
                      [
                          -68.93108879849639,
                          12.103767014039118
                      ],
                      [
                          -68.9310512981624,
                          12.103826091809273
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "249",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93191187946691,
                          12.107280454403849
                      ],
                      [
                          -68.93184729642016,
                          12.107249093132667
                      ],
                      [
                          -68.93191773869036,
                          12.107111780277995
                      ],
                      [
                          -68.93200093445465,
                          12.107152557787597
                      ],
                      [
                          -68.93200151478428,
                          12.107208045391344
                      ],
                      [
                          -68.93198337087323,
                          12.107243446148484
                      ],
                      [
                          -68.9319997944468,
                          12.107251817261561
                      ],
                      [
                          -68.93198483927885,
                          12.107279715436801
                      ],
                      [
                          -68.93191187946691,
                          12.107280454403849
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "250",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9318151005893,
                          12.106669937510397
                      ],
                      [
                          -68.93175158377424,
                          12.106636430843151
                      ],
                      [
                          -68.93183498227535,
                          12.106488313665118
                      ],
                      [
                          -68.93189959927152,
                          12.106522876498644
                      ],
                      [
                          -68.93188784393111,
                          12.106544339395523
                      ],
                      [
                          -68.93194699375474,
                          12.106576823223373
                      ],
                      [
                          -68.93190208336206,
                          12.10665625018064
                      ],
                      [
                          -68.931840755649,
                          12.106623788473353
                      ],
                      [
                          -68.9318151005893,
                          12.106669937510397
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "251",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93071055249784,
                          12.104359957657048
                      ],
                      [
                          -68.93062396414665,
                          12.10430747444744
                      ],
                      [
                          -68.93066038624958,
                          12.104249475043485
                      ],
                      [
                          -68.93068340016937,
                          12.104263115614417
                      ],
                      [
                          -68.93070268905197,
                          12.104233037757554
                      ],
                      [
                          -68.93075200617788,
                          12.104262420025183
                      ],
                      [
                          -68.93073379509877,
                          12.104291419709726
                      ],
                      [
                          -68.93074804126783,
                          12.104299813062207
                      ],
                      [
                          -68.93071055249784,
                          12.104359957657048
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "252",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93106675614527,
                          12.105094861218985
                      ],
                      [
                          -68.93098464735411,
                          12.10505407220629
                      ],
                      [
                          -68.93101987987356,
                          12.104986480629615
                      ],
                      [
                          -68.93100126674274,
                          12.104977064374534
                      ],
                      [
                          -68.93102901049272,
                          12.10492235522149
                      ],
                      [
                          -68.93118992774248,
                          12.105000765309839
                      ],
                      [
                          -68.9311557729276,
                          12.105067278677978
                      ],
                      [
                          -68.93109665550968,
                          12.105037995893731
                      ],
                      [
                          -68.93106675614527,
                          12.105094861218985
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "253",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93155735109968,
                          12.10441434140661
                      ],
                      [
                          -68.93142690246103,
                          12.104333486962481
                      ],
                      [
                          -68.93151049226948,
                          12.104203505957956
                      ],
                      [
                          -68.93158723472094,
                          12.1042518207863
                      ],
                      [
                          -68.93154758982091,
                          12.104314121394646
                      ],
                      [
                          -68.93160129607999,
                          12.104346661207227
                      ],
                      [
                          -68.93155735109968,
                          12.10441434140661
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "254",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93167737262945,
                          12.10558065695944
                      ],
                      [
                          -68.93157535040312,
                          12.10551018775418
                      ],
                      [
                          -68.93162687305413,
                          12.10543816292778
                      ],
                      [
                          -68.93159176918908,
                          12.105413972795516
                      ],
                      [
                          -68.93162826955262,
                          12.105363444241704
                      ],
                      [
                          -68.93176540686787,
                          12.105459170901462
                      ],
                      [
                          -68.93167737262945,
                          12.10558065695944
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "255",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9318020412374,
                          12.105421447571425
                      ],
                      [
                          -68.93166952771442,
                          12.105351286980778
                      ],
                      [
                          -68.93174216024126,
                          12.105215015626664
                      ],
                      [
                          -68.93183523645553,
                          12.105263164489173
                      ],
                      [
                          -68.93179248116465,
                          12.105340436607717
                      ],
                      [
                          -68.93183408535532,
                          12.105361359362352
                      ],
                      [
                          -68.9318020412374,
                          12.105421447571425
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "256",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93053596475555,
                          12.10464027260902
                      ],
                      [
                          -68.9304482652069,
                          12.104585666571102
                      ],
                      [
                          -68.93049006496982,
                          12.10452120945337
                      ],
                      [
                          -68.93051309002931,
                          12.104535917044554
                      ],
                      [
                          -68.93053132335218,
                          12.104509051628035
                      ],
                      [
                          -68.9305751619726,
                          12.104535287598233
                      ],
                      [
                          -68.93055693981779,
                          12.104563220104469
                      ],
                      [
                          -68.93057667556717,
                          12.104575826615747
                      ],
                      [
                          -68.93053596475555,
                          12.10464027260902
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "257",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93036131091124,
                          12.104914184225155
                      ],
                      [
                          -68.93027365619949,
                          12.104863846943235
                      ],
                      [
                          -68.93031218880284,
                          12.104799423123506
                      ],
                      [
                          -68.93033848076475,
                          12.104814097485836
                      ],
                      [
                          -68.93035452485833,
                          12.104786187121615
                      ],
                      [
                          -68.93040164152379,
                          12.104813456890751
                      ],
                      [
                          -68.93038558624627,
                          12.104840300134692
                      ],
                      [
                          -68.93039983237182,
                          12.104848693378349
                      ],
                      [
                          -68.93036131091124,
                          12.104914184225155
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "258",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93160871373439,
                          12.105159805312523
                      ],
                      [
                          -68.93146966589426,
                          12.105089710901327
                      ],
                      [
                          -68.93150492103838,
                          12.1050242537261
                      ],
                      [
                          -68.93156294936514,
                          12.105053547768556
                      ],
                      [
                          -68.93159927122882,
                          12.104985945361781
                      ],
                      [
                          -68.93167920186261,
                          12.10502675693607
                      ],
                      [
                          -68.93160871373439,
                          12.105159805312523
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "259",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93042307465014,
                          12.104780155796842
                      ],
                      [
                          -68.93037594679977,
                          12.10475181890186
                      ],
                      [
                          -68.93039414652056,
                          12.104721752222844
                      ],
                      [
                          -68.93037004367982,
                          12.104708122843673
                      ],
                      [
                          -68.93040645432075,
                          12.104649056546284
                      ],
                      [
                          -68.93049304251095,
                          12.104701539337016
                      ],
                      [
                          -68.93045556521304,
                          12.104762750814672
                      ],
                      [
                          -68.9304391299469,
                          12.104753312537772
                      ],
                      [
                          -68.93042307465014,
                          12.104780155796842
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "260",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93174303896872,
                          12.10404960411039
                      ],
                      [
                          -68.93172824590883,
                          12.103988922004964
                      ],
                      [
                          -68.93164568384103,
                          12.10400896843863
                      ],
                      [
                          -68.93162297756625,
                          12.103920618535108
                      ],
                      [
                          -68.93177614532063,
                          12.103882781214686
                      ],
                      [
                          -68.9318136444921,
                          12.10403181331847
                      ],
                      [
                          -68.93174303896872,
                          12.10404960411039
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "261",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93119633214064,
                          12.106133005488681
                      ],
                      [
                          -68.93118132681258,
                          12.106052050512616
                      ],
                      [
                          -68.93112152306345,
                          12.106061194238382
                      ],
                      [
                          -68.93110991859507,
                          12.105993011117715
                      ],
                      [
                          -68.93126103919613,
                          12.105968001103546
                      ],
                      [
                          -68.93128764882586,
                          12.106117139262965
                      ],
                      [
                          -68.93119633214064,
                          12.106133005488681
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "262",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9312050393998,
                          12.104987805594371
                      ],
                      [
                          -68.93106582350715,
                          12.104901705000549
                      ],
                      [
                          -68.93110546788964,
                          12.104839404681869
                      ],
                      [
                          -68.93113836060087,
                          12.104860415618042
                      ],
                      [
                          -68.93117264949355,
                          12.104806707302547
                      ],
                      [
                          -68.93127898391926,
                          12.104872864268042
                      ],
                      [
                          -68.9312050393998,
                          12.104987805594371
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "263",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9309341510468,
                          12.103975624100999
                      ],
                      [
                          -68.93088591165966,
                          12.103945163480423
                      ],
                      [
                          -68.930905211832,
                          12.10391615265304
                      ],
                      [
                          -68.93088219786814,
                          12.103902511970205
                      ],
                      [
                          -68.93092400935274,
                          12.103839121573408
                      ],
                      [
                          -68.93100950893565,
                          12.103891616396893
                      ],
                      [
                          -68.93096770859246,
                          12.103956073830503
                      ],
                      [
                          -68.93095237340881,
                          12.103947691448257
                      ],
                      [
                          -68.9309341510468,
                          12.103975624100999
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "264",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93059663990874,
                          12.10450625485035
                      ],
                      [
                          -68.93055061214382,
                          12.104478973838791
                      ],
                      [
                          -68.93056991212082,
                          12.104449963149749
                      ],
                      [
                          -68.93054689822556,
                          12.104436322637811
                      ],
                      [
                          -68.9305854646835,
                          12.104375099890651
                      ],
                      [
                          -68.93067095284478,
                          12.104426526953892
                      ],
                      [
                          -68.93063024191453,
                          12.1044909730349
                      ],
                      [
                          -68.93061270646766,
                          12.104480478630679
                      ],
                      [
                          -68.93059663990874,
                          12.10450625485035
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "265",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93102939600865,
                          12.105271329728671
                      ],
                      [
                          -68.93087381219975,
                          12.105182193995242
                      ],
                      [
                          -68.93090593406788,
                          12.105129574993425
                      ],
                      [
                          -68.9309530392581,
                          12.105155777770358
                      ],
                      [
                          -68.93099263879283,
                          12.105089209217581
                      ],
                      [
                          -68.93110110633258,
                          12.105151075283315
                      ],
                      [
                          -68.93102939600865,
                          12.105271329728671
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "266",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93069191836794,
                          12.104764622970547
                      ],
                      [
                          -68.93063602288613,
                          12.104731038768875
                      ],
                      [
                          -68.9306477893659,
                          12.104710642321924
                      ],
                      [
                          -68.93062696467074,
                          12.104698046863522
                      ],
                      [
                          -68.93068157528029,
                          12.104608913978797
                      ],
                      [
                          -68.93076048463483,
                          12.10465613877312
                      ],
                      [
                          -68.93069191836794,
                          12.104764622970547
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "267",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93141488943999,
                          12.104538515200579
                      ],
                      [
                          -68.93133705812825,
                          12.104490211718339
                      ],
                      [
                          -68.93141422545018,
                          12.104370968203032
                      ],
                      [
                          -68.93154248492523,
                          12.104450777547795
                      ],
                      [
                          -68.9315049846007,
                          12.104509854623839
                      ],
                      [
                          -68.93145346752051,
                          12.104478359971964
                      ],
                      [
                          -68.93141488943999,
                          12.104538515200579
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "268",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93071352457044,
                          12.106204066071298
                      ],
                      [
                          -68.93070336034701,
                          12.106065433425556
                      ],
                      [
                          -68.93080238916869,
                          12.106058026166842
                      ],
                      [
                          -68.93080633756391,
                          12.106123085233095
                      ],
                      [
                          -68.93086075228963,
                          12.106119331961215
                      ],
                      [
                          -68.9308669679479,
                          12.106192905564349
                      ],
                      [
                          -68.93071352457044,
                          12.106204066071298
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "269",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93158161168087,
                          12.106525030554698
                      ],
                      [
                          -68.93140079426725,
                          12.106418009024134
                      ],
                      [
                          -68.931438271476,
                          12.106356799217684
                      ],
                      [
                          -68.93149855517531,
                          12.1063935401772
                      ],
                      [
                          -68.9315242659946,
                          12.106352726298876
                      ],
                      [
                          -68.9316437220017,
                          12.106424085202404
                      ],
                      [
                          -68.93158161168087,
                          12.106525030554698
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "270",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93157207560527,
                          12.106029948546142
                      ],
                      [
                          -68.93154111049874,
                          12.105880854290504
                      ],
                      [
                          -68.93161067042952,
                          12.10586734313657
                      ],
                      [
                          -68.93162215177863,
                          12.10592378845518
                      ],
                      [
                          -68.93170474580201,
                          12.105906943719598
                      ],
                      [
                          -68.93172422939124,
                          12.105999592732974
                      ],
                      [
                          -68.93157207560527,
                          12.106029948546142
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "271",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9313300022811,
                          12.105585243725036
                      ],
                      [
                          -68.93120001277047,
                          12.105548141669034
                      ],
                      [
                          -68.93123470920578,
                          12.105429330095799
                      ],
                      [
                          -68.93130352660751,
                          12.105448909629379
                      ],
                      [
                          -68.93130983710236,
                          12.105427501533827
                      ],
                      [
                          -68.93137209832678,
                          12.105445013135723
                      ],
                      [
                          -68.9313300022811,
                          12.105585243725036
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "272",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93124026666332,
                          12.104815626980438
                      ],
                      [
                          -68.93116356911906,
                          12.104771581184403
                      ],
                      [
                          -68.93123745791965,
                          12.104651303977501
                      ],
                      [
                          -68.93136676151656,
                          12.104726833356077
                      ],
                      [
                          -68.93132928372717,
                          12.104788044490977
                      ],
                      [
                          -68.93127668891293,
                          12.104757628181721
                      ],
                      [
                          -68.93124026666332,
                          12.104815626980438
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "273",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93085463030353,
                          12.105534567315237
                      ],
                      [
                          -68.93071371730738,
                          12.10549437493265
                      ],
                      [
                          -68.93073475933993,
                          12.105423725901469
                      ],
                      [
                          -68.93075769478925,
                          12.105429896605507
                      ],
                      [
                          -68.93077665947018,
                          12.10536887346365
                      ],
                      [
                          -68.93089354819122,
                          12.105402906300728
                      ],
                      [
                          -68.93085463030353,
                          12.105534567315237
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "274",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9319626459085,
                          12.104012161378213
                      ],
                      [
                          -68.93182173135978,
                          12.103971966675557
                      ],
                      [
                          -68.93185752923657,
                          12.103854208950501
                      ],
                      [
                          -68.93192743652219,
                          12.103873778295757
                      ],
                      [
                          -68.93194428001873,
                          12.10381811177743
                      ],
                      [
                          -68.93196612674768,
                          12.10382429390902
                      ],
                      [
                          -68.931967912287,
                          12.103995032407507
                      ],
                      [
                          -68.9319626459085,
                          12.104012161378213
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "275",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9302357178527,
                          12.107168315798546
                      ],
                      [
                          -68.93010091567248,
                          12.107087510187931
                      ],
                      [
                          -68.93037511685469,
                          12.106648248921843
                      ],
                      [
                          -68.93050991936431,
                          12.106729055359295
                      ],
                      [
                          -68.9302357178527,
                          12.107168315798546
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "276",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93120401885298,
                          12.103953678735428
                      ],
                      [
                          -68.93114924561311,
                          12.103923284207374
                      ],
                      [
                          -68.93116315676045,
                          12.103899664184024
                      ],
                      [
                          -68.93113795368463,
                          12.103884978401533
                      ],
                      [
                          -68.93118929820578,
                          12.1037958779546
                      ],
                      [
                          -68.9312692745725,
                          12.103840958375084
                      ],
                      [
                          -68.93120401885298,
                          12.103953678735428
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "277",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9314908468808,
                          12.105344559569405
                      ],
                      [
                          -68.93135834420467,
                          12.105275466375257
                      ],
                      [
                          -68.93143955420447,
                          12.10512630120776
                      ],
                      [
                          -68.9315720570088,
                          12.105195394643397
                      ],
                      [
                          -68.9314908468808,
                          12.105344559569405
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "278",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93073907760014,
                          12.107292339808296
                      ],
                      [
                          -68.93060860945526,
                          12.10720935541066
                      ],
                      [
                          -68.93071905098209,
                          12.107043889207599
                      ],
                      [
                          -68.93110278776554,
                          12.107288652531686
                      ],
                      [
                          -68.93073907760014,
                          12.107292339808296
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "279",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93032517497913,
                          12.105103447589098
                      ],
                      [
                          -68.93027474678381,
                          12.105071942701256
                      ],
                      [
                          -68.93033262382194,
                          12.104982776926382
                      ],
                      [
                          -68.93039620916696,
                          12.105022686147139
                      ],
                      [
                          -68.93035869851785,
                          12.105080696105695
                      ],
                      [
                          -68.9303455413957,
                          12.105072291849284
                      ],
                      [
                          -68.93032517497913,
                          12.105103447589098
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "280",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93101190474496,
                          12.104016457842388
                      ],
                      [
                          -68.93096477672712,
                          12.103988120396078
                      ],
                      [
                          -68.93102046583202,
                          12.103897908713332
                      ],
                      [
                          -68.93108185123162,
                          12.103935706772475
                      ],
                      [
                          -68.93104435096573,
                          12.103994784415217
                      ],
                      [
                          -68.93103120493754,
                          12.103987447065832
                      ],
                      [
                          -68.93101190474496,
                          12.104016457842388
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "281",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93067660484219,
                          12.104550267288785
                      ],
                      [
                          -68.93062510986356,
                          12.104520907256191
                      ],
                      [
                          -68.93067863158748,
                          12.104431785205946
                      ],
                      [
                          -68.93074547289423,
                          12.10447059469932
                      ],
                      [
                          -68.9307090843449,
                          12.104531795226992
                      ],
                      [
                          -68.93069373804913,
                          12.104522345840625
                      ],
                      [
                          -68.93067660484219,
                          12.104550267288785
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "282",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93181548159397,
                          12.104832210695065
                      ],
                      [
                          -68.93167750012765,
                          12.104759970462805
                      ],
                      [
                          -68.93175015542964,
                          12.10462583227175
                      ],
                      [
                          -68.93188814817667,
                          12.104699139834704
                      ],
                      [
                          -68.93181548159397,
                          12.104832210695065
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "283",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9319376284511,
                          12.105889644005563
                      ],
                      [
                          -68.93185895012483,
                          12.105760242302576
                      ],
                      [
                          -68.93191631946493,
                          12.105726577953034
                      ],
                      [
                          -68.93194291228815,
                          12.10577006392585
                      ],
                      [
                          -68.9319862031769,
                          12.105744012625156
                      ],
                      [
                          -68.93198740845122,
                          12.105859258218283
                      ],
                      [
                          -68.9319376284511,
                          12.105889644005563
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "284",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9318512808675,
                          12.105235254526125
                      ],
                      [
                          -68.93176808353978,
                          12.105194476037363
                      ],
                      [
                          -68.93183640505227,
                          12.105062516992144
                      ],
                      [
                          -68.93197544150382,
                          12.105131544796006
                      ],
                      [
                          -68.93194344187137,
                          12.105195901530436
                      ],
                      [
                          -68.93188543605847,
                          12.105168741540776
                      ],
                      [
                          -68.9318512808675,
                          12.105235254526125
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "285",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93172735876404,
                          12.106611063678091
                      ],
                      [
                          -68.93160571394236,
                          12.106538659855431
                      ],
                      [
                          -68.93167214663248,
                          12.106434469168175
                      ],
                      [
                          -68.93179378036189,
                          12.106505806089716
                      ],
                      [
                          -68.93172735876404,
                          12.106611063678091
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "286",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93198527001253,
                          12.106487858664886
                      ],
                      [
                          -68.93187241506116,
                          12.10642283575502
                      ],
                      [
                          -68.93194413665451,
                          12.10630365079574
                      ],
                      [
                          -68.93199235233034,
                          12.10633197672377
                      ],
                      [
                          -68.93199383661712,
                          12.106473898405126
                      ],
                      [
                          -68.93198527001253,
                          12.106487858664886
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "287",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93076970833815,
                          12.105849186258073
                      ],
                      [
                          -68.93064661029415,
                          12.105846165600877
                      ],
                      [
                          -68.93064841345225,
                          12.1057063437441
                      ],
                      [
                          -68.93077368959922,
                          12.105709342333215
                      ],
                      [
                          -68.93076970833815,
                          12.105849186258073
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "288",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93064075297481,
                          12.106014842699638
                      ],
                      [
                          -68.93063493334145,
                          12.105875098451115
                      ],
                      [
                          -68.93078953320072,
                          12.105870329289393
                      ],
                      [
                          -68.9307953414545,
                          12.106009006461386
                      ],
                      [
                          -68.93064075297481,
                          12.106014842699638
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "289",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93052575266039,
                          12.10501710352521
                      ],
                      [
                          -68.93045232187094,
                          12.104973025218085
                      ],
                      [
                          -68.93050803233447,
                          12.104884948618034
                      ],
                      [
                          -68.93058145198543,
                          12.104927959914509
                      ],
                      [
                          -68.93052575266039,
                          12.10501710352521
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "290",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93109873853807,
                          12.105965377243361
                      ],
                      [
                          -68.93108420777611,
                          12.105825721202336
                      ],
                      [
                          -68.93120823842962,
                          12.105813792081685
                      ],
                      [
                          -68.93122275785818,
                          12.105952381068661
                      ],
                      [
                          -68.93109873853807,
                          12.105965377243361
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "291",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93087392809504,
                          12.104465023521657
                      ],
                      [
                          -68.93079829677329,
                          12.10441883250884
                      ],
                      [
                          -68.9308529076811,
                          12.104329699391519
                      ],
                      [
                          -68.93092962802336,
                          12.104375879459738
                      ],
                      [
                          -68.93087392809504,
                          12.104465023521657
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "292",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93036316763171,
                          12.105299429089428
                      ],
                      [
                          -68.93028332606902,
                          12.10526715540328
                      ],
                      [
                          -68.93032477896334,
                          12.105169618753
                      ],
                      [
                          -68.9304046317615,
                          12.10520295961161
                      ],
                      [
                          -68.93036316763171,
                          12.105299429089428
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "293",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93139480699992,
                          12.104700935953803
                      ],
                      [
                          -68.93127669470246,
                          12.104654108006851
                      ],
                      [
                          -68.93132981491075,
                          12.104526570611371
                      ],
                      [
                          -68.93144683834359,
                          12.10457340973397
                      ],
                      [
                          -68.93139480699992,
                          12.104700935953803
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "294",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93043259735461,
                          12.104961485899334
                      ],
                      [
                          -68.93037341260266,
                          12.104925800851582
                      ],
                      [
                          -68.93042911185222,
                          12.10483665705117
                      ],
                      [
                          -68.93048829663338,
                          12.104872342172877
                      ],
                      [
                          -68.93043259735461,
                          12.104961485899334
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "295",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.9311225961688,
                          12.10387446175464
                      ],
                      [
                          -68.93105683245734,
                          12.103834573557146
                      ],
                      [
                          -68.93111364422151,
                          12.103747552061666
                      ],
                      [
                          -68.93117833014212,
                          12.103788518494934
                      ],
                      [
                          -68.9311225961688,
                          12.10387446175464
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "296",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93078623976166,
                          12.104411484191612
                      ],
                      [
                          -68.93072157640023,
                          12.104372652559498
                      ],
                      [
                          -68.93077728742556,
                          12.104284575417317
                      ],
                      [
                          -68.93084086183475,
                          12.104323418169303
                      ],
                      [
                          -68.93078623976166,
                          12.104411484191612
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "297",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93051730792315,
                          12.104834695408165
                      ],
                      [
                          -68.93045154455776,
                          12.10479480810178
                      ],
                      [
                          -68.93050725512148,
                          12.104706731296591
                      ],
                      [
                          -68.93057301851856,
                          12.104746618684835
                      ],
                      [
                          -68.93051730792315,
                          12.104834695408165
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "298",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93060722895034,
                          12.104685440364552
                      ],
                      [
                          -68.93054803293438,
                          12.104648687981157
                      ],
                      [
                          -68.93060373248662,
                          12.104559543954228
                      ],
                      [
                          -68.930664017512,
                          12.104596285371043
                      ],
                      [
                          -68.93060722895034,
                          12.104685440364552
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "299",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -68.93197922825205,
                          12.105077078648092
                      ],
                      [
                          -68.93187406160193,
                          12.105018379864777
                      ],
                      [
                          -68.9319521841664,
                          12.10488632132837
                      ],
                      [
                          -68.93197738688389,
                          12.104901007093329
                      ],
                      [
                          -68.93197922825205,
                          12.105077078648092
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "300",
              "layer": "SUBCATCHMENTS",
              "displayvals": 0.02907600998878479
          }
      }
  ]
}, 3)
)
    .toBeDefined() //.toBe(4.341998100280762)
})

