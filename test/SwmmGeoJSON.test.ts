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
    expect(SwmmGeoJSON.geoJSON_model((global as any).inp02)).toEqual({"features": [{"geometry": {"coordinates": [2900.807, 7335.64], "type": "Point"}, "properties": {"layer": "OUTFALLS", "name": "Outfall1"}, "type": "Feature"}, {"geometry": {"coordinates": [7352.941, 4509.804], "type": "Point"}, "properties": {"layer": "OUTFALLS", "name": "Outfall2"}, "type": "Feature"}, {"geometry": {"coordinates": [11782.007, 1649.366], "type": "Point"}, "properties": {"layer": "OUTFALLS", "name": "Outfall3"}, "type": "Feature"}, {"geometry": {"coordinates": [[[-1239.908, 5893.887], [4619.377, 8177.624], [1839.677, 9930.796], [-3985.006, 7647.059], [-1239.908, 5893.887]]], "type": "Polygon"}, "properties": {"layer": "SUBCATCHMENTS", "name": "SubareaRouting"}, "type": "Feature"}, {"geometry": {"coordinates": [[[3200.692, 3079.585], [9036.909, 5363.322], [6314.879, 7116.494], [455.594, 4844.291], [3200.692, 3079.585]]], "type": "Polygon"}, "properties": {"layer": "SUBCATCHMENTS", "name": "DCIA"}, "type": "Feature"}, {"geometry": {"coordinates": [[[7629.758, 230.681], [13477.509, 2468.281], [10720.877, 4232.987], [4907.728, 1960.784], [7629.758, 230.681]]], "type": "Polygon"}, "properties": {"layer": "SUBCATCHMENTS", "name": "IA"}, "type": "Feature"}], "type": "FeatureCollection"})
})

