// SwmmGeoJSON.test.ts
import { SwmmConvert, SwmmGeoJSON } from '../src/index'
import util from 'util'
import fs from 'fs'

let test_Example1 = './test/data/Example1.inp'
let test_file2 = './test/data/subareaRouting.inp'

// Prior to running tests, open files and set objects.
beforeAll(async () => {
  const readFile = util.promisify(fs.readFile)
  const file01 = await readFile(test_Example1, { encoding: 'utf8' });
  const file02 = await readFile(test_file2, { encoding: 'utf8' });

  (global as any).inp01 = SwmmConvert.parseInput(file01);
  (global as any).inp02 = SwmmConvert.parseInput(file02);
})


////////////////////////////////////////////////////////////////////////////////////////
// Object creation
////////////////////////////////////////////////////////////////////////////////////////

test('create a JSON object from an inp', () =>{
    expect((global as any).inp02).toBeDefined()
})

test('create a JSON object from an inp', () =>{
    expect(SwmmGeoJSON.geoJSON_model((global as any).inp02)).toBeDefined()
})

test('getBounds from an inp', () =>{
    expect(SwmmGeoJSON.getBounds((global as any).inp02)).toEqual('')
})

test('create a JSON object from an inp', () =>{
    expect(SwmmGeoJSON.spatialProjection((global as any).inp02)).toEqual({
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        134.65928726631492,
                        33.79934969702373
                    ]
                },
                "properties": {
                    "name": "Outfall1",
                    "layer": "OUTFALLS"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        134.65962710256636,
                        33.79945432539196
                    ]
                },
                "properties": {
                    "name": "Outfall2",
                    "layer": "OUTFALLS"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        134.65996693965207,
                        33.799558952827404
                    ]
                },
                "properties": {
                    "name": "Outfall3",
                    "layer": "OUTFALLS"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                134.65909861579433,
                                33.799379515059115
                            ],
                            [
                                134.6594075577006,
                                33.7994746322674
                            ],
                            [
                                134.65892334096526,
                                33.80057080213852
                            ],
                            [
                                134.65861439567763,
                                33.80047568371344
                            ],
                            [
                                134.65909861579433,
                                33.799379515059115
                            ]
                        ]
                    ]
                },
                "properties": {
                    "name": "SubareaRouting",
                    "layer": "SUBCATCHMENTS"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                134.65943845192916,
                                33.799484143945826
                            ],
                            [
                                134.65974739459384,
                                33.799579260306125
                            ],
                            [
                                134.65926318157804,
                                33.80067543151569
                            ],
                            [
                                134.65895423553195,
                                33.80058031393864
                            ],
                            [
                                134.65943845192916,
                                33.799484143945826
                            ]
                        ]
                    ]
                },
                "properties": {
                    "name": "DCIA",
                    "layer": "SUBCATCHMENTS"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                134.6597782888982,
                                33.79958877189975
                            ],
                            [
                                134.66008723232125,
                                33.799683887412016
                            ],
                            [
                                134.6596030230251,
                                33.80078005996003
                            ],
                            [
                                134.6592940762206,
                                33.80068494323101
                            ],
                            [
                                134.6597782888982,
                                33.79958877189975
                            ]
                        ]
                    ]
                },
                "properties": {
                    "name": "IA",
                    "layer": "SUBCATCHMENTS"
                }
            }
        ]
    })
})

