// SwmmDat.test.ts
import { SwmmDat, SwmmGeoJSON } from '../src/index'
import util from 'util'
import fs from 'fs'


// Prior to running tests, open files and set objects.
beforeAll(async () => {

  (global as any).model = {
      "TITLE": "Illustration of the difference between OUTLET and PERVIOUS subarea routing options for a simple 1-acre subcatchment subject to 1-inch of rainfall.",
      "OPTIONS": {
          "FLOW_UNITS": "CFS",
          "INFILTRATION": "MODIFIED_GREEN_AMPT",
          "FLOW_ROUTING": "DYNWAVE",
          "LINK_OFFSETS": "DEPTH",
          "MIN_SLOPE": "0",
          "ALLOW_PONDING": "NO",
          "SKIP_STEADY_STATE": "NO",
          "START_DATE": "06/02/2018",
          "START_TIME": "00:00:00",
          "REPORT_START_DATE": "06/02/2018",
          "REPORT_START_TIME": "00:00:00",
          "END_DATE": "06/02/2018",
          "END_TIME": "03:00:00",
          "SWEEP_START": "1/1",
          "SWEEP_END": "12/31",
          "DRY_DAYS": "0",
          "REPORT_STEP": "00:01:00",
          "WET_STEP": "00:01:00",
          "DRY_STEP": "01:00:00",
          "ROUTING_STEP": "0:01:00",
          "RULE_STEP": "00:00:00",
          "INERTIAL_DAMPING": "NONE",
          "NORMAL_FLOW_LIMITED": "BOTH",
          "FORCE_MAIN_EQUATION": "H-W",
          "VARIABLE_STEP": "0.00",
          "LENGTHENING_STEP": "0",
          "MIN_SURFAREA": "12.6",
          "MAX_TRIALS": "8",
          "HEAD_TOLERANCE": "0.0015",
          "SYS_FLOW_TOL": "5",
          "LAT_FLOW_TOL": "5",
          "MINIMUM_STEP": "0.5",
          "THREADS": "1"
      },
      "RAINGAGES": {
          "UniformRainfall": {
              "Format": "INTENSITY",
              "Interval": "1:00",
              "SCF": "1.0",
              "Source": "TIMESERIES",
              "SeriesName": "UniformRainfall",
              "Description": ""
          }
      },
      "TEMPERATURE": {},
      "EVAPORATION": {
          "CONSTANT": 0,
          "DRY_ONLY": "NO"
      },
      "SUBCATCHMENTS": {
          "SubareaRouting": {
              "RainGage": "UniformRainfall",
              "Outlet": "Outfall1",
              "Area": 1,
              "PctImperv": 30,
              "Width": 100,
              "PctSlope": 1,
              "CurbLen": 0,
              "SnowPack": "",
              "Description": ""
          },
          "DCIA": {
              "RainGage": "UniformRainfall",
              "Outlet": "Outfall2",
              "Area": 1,
              "PctImperv": 15,
              "Width": 100,
              "PctSlope": 1,
              "CurbLen": 0,
              "SnowPack": "",
              "Description": ""
          },
          "IA": {
              "RainGage": "UniformRainfall",
              "Outlet": "Outfall3",
              "Area": 1,
              "PctImperv": 30,
              "Width": 100,
              "PctSlope": 1,
              "CurbLen": 0,
              "SnowPack": "",
              "Description": ""
          }
      },
      "SUBAREAS": {
          "SubareaRouting": {
              "NImperv": 0.02,
              "NPerv": 0.2,
              "SImperv": 0.2,
              "SPerv": 0.4,
              "PctZero": 15,
              "RouteTo": "PERVIOUS",
              "PctRouted": "50"
          },
          "DCIA": {
              "NImperv": 0.02,
              "NPerv": 0.2,
              "SImperv": 0.2,
              "SPerv": 0.4,
              "PctZero": 15,
              "RouteTo": "OUTLET",
              "PctRouted": null
          },
          "IA": {
              "NImperv": 0.02,
              "NPerv": 0.2,
              "SImperv": 0.2,
              "SPerv": 0.4,
              "PctZero": 15,
              "RouteTo": "OUTLET",
              "PctRouted": null
          }
      },
      "INFILTRATION": {
          "SubareaRouting": {
              "Param1": "4",
              "Param2": "0.5",
              "Param3": "0.35",
              "Param4": "7",
              "Param5": "0"
          },
          "DCIA": {
              "Param1": "4",
              "Param2": "0.5",
              "Param3": "0.35",
              "Param4": "7",
              "Param5": "0"
          },
          "IA": {
              "Param1": "4",
              "Param2": "0.5",
              "Param3": "0.35",
              "Param4": "7",
              "Param5": "0"
          }
      },
      "AQUIFERS": {},
      "GROUNDWATER": {},
      "GWF": {},
      "SNOWPACKS": {},
      "JUNCTIONS": {},
      "OUTFALLS": {
          "Outfall1": {
              "Invert": 850,
              "Type": "FREE",
              "Gated": "NO",
              "RouteTo": ""
          },
          "Outfall2": {
              "Invert": 850,
              "Type": "FREE",
              "Gated": "NO",
              "RouteTo": ""
          },
          "Outfall3": {
              "Invert": 850,
              "Type": "FREE",
              "Gated": "NO",
              "RouteTo": ""
          }
      },
      "STORAGE": {},
      "DIVIDERS": {},
      "CONDUITS": {},
      "PUMPS": {},
      "ORIFICES": {},
      "WEIRS": {},
      "OUTLETS": {},
      "XSECTIONS": {},
      "STREETS": {},
      "INLETS": {},
      "INLET_USAGE": {},
      "TRANSECTS": {},
      "LOSSES": {},
      "POLLUTANTS": {},
      "LANDUSES": {},
      "BUILDUP": {},
      "WASHOFF": {},
      "COVERAGES": {},
      "INFLOWS": {},
      "DWF": {},
      "PATTERNS": {},
      "RDII": {},
      "HYDROGRAPHS": {},
      "LOADINGS": {},
      "TREATMENT": {},
      "CURVES": {},
      "TIMESERIES": {
          "UniformRainfall": [
              {
                  "DateTime": 0,
                  "Value": 1
              },
              {
                  "DateTime": 1,
                  "Value": 0
              }
          ]
      },
      "CONTROLS": {},
      "REPORT": {
          "INPUT": "YES",
          "SUBCATCHMENTS": "ALL",
          "NODES": "ALL",
          "LINKS": "ALL"
      },
      "MAP": {
          "DIMENSIONS": {
              "x1": -4858.132,
              "y1": -254.325,
              "x2": 14350.635,
              "y2": 10415.802
          },
          "Units": "None"
      },
      "COORDINATES": {
          "Outfall1": {
              "x": 2900.807,
              "y": 7335.64
          },
          "Outfall2": {
              "x": 7352.941,
              "y": 4509.804
          },
          "Outfall3": {
              "x": 11782.007,
              "y": 1649.366
          }
      },
      "VERTICES": {},
      "Polygons": {
          "SubareaRouting": [
              {
                  "x": -1239.908,
                  "y": 5893.887
              },
              {
                  "x": 4619.377,
                  "y": 8177.624
              },
              {
                  "x": 1839.677,
                  "y": 9930.796
              },
              {
                  "x": -3985.006,
                  "y": 7647.059
              }
          ],
          "DCIA": [
              {
                  "x": 3200.692,
                  "y": 3079.585
              },
              {
                  "x": 9036.909,
                  "y": 5363.322
              },
              {
                  "x": 6314.879,
                  "y": 7116.494
              },
              {
                  "x": 455.594,
                  "y": 4844.291
              }
          ],
          "IA": [
              {
                  "x": 7629.758,
                  "y": 230.681
              },
              {
                  "x": 13477.509,
                  "y": 2468.281
              },
              {
                  "x": 10720.877,
                  "y": 4232.987
              },
              {
                  "x": 4907.728,
                  "y": 1960.784
              }
          ]
      },
      "SYMBOLS": {},
      "LABELS": {},
      "BACKDROP": [],
      "TAGS": {},
      "PROFILE": {},
      "FILE": {},
      "LID_CONTROLS": {},
      "LID_USAGE": {},
      "EVENT": {}
  }
})

////////////////////////////////////////////////////////////////////////////////////////
// Object creation
////////////////////////////////////////////////////////////////////////////////////////

// Test for bad files (binary)
test('create geojson from a model', () =>{
  expect(
    SwmmGeoJSON.geoJSON_model((global as any).model)).toEqual({"features": [{"geometry": {"coordinates": [2900.807, 7335.64], "type": "Point"}, "properties": {"layer": "OUTFALLS", "name": "Outfall1"}, "type": "Feature"}, {"geometry": {"coordinates": [7352.941, 4509.804], "type": "Point"}, "properties": {"layer": "OUTFALLS", "name": "Outfall2"}, "type": "Feature"}, {"geometry": {"coordinates": [11782.007, 1649.366], "type": "Point"}, "properties": {"layer": "OUTFALLS", "name": "Outfall3"}, "type": "Feature"}, {"geometry": {"coordinates": [[[-1239.908, 5893.887], [4619.377, 8177.624], [1839.677, 9930.796], [-3985.006, 7647.059]]], "type": "Polygon"}, "properties": {"layer": "SUBCATCHMENTS", "name": "SubareaRouting"}, "type": "Feature"}, {"geometry": {"coordinates": [[[3200.692, 3079.585], [9036.909, 5363.322], [6314.879, 7116.494], [455.594, 4844.291]]], "type": "Polygon"}, "properties": {"layer": "SUBCATCHMENTS", "name": "DCIA"}, "type": "Feature"}, {"geometry": {"coordinates": [[[7629.758, 230.681], [13477.509, 2468.281], [10720.877, 4232.987], [4907.728, 1960.784]]], "type": "Polygon"}, "properties": {"layer": "SUBCATCHMENTS", "name": "IA"}, "type": "Feature"}], "type": "FeatureCollection"})
})
