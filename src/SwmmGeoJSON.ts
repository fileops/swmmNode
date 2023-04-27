// SwmmGeoJSON.js

/**
 * Contains methods for translating swmm objects in x/y coordinates 
 * to GeoJSON objects. These objects can then be projected using 
 * google maps/mapbox/osm or via turf.js or proj4.js.
 * 
 * The general work procedure is like this:
 *  - Load a model
 *  - Call geoJSON_model on the model
 *  - Using turf.js (for example) and a projection like the following:
 *  -- const statePlaneProjection = '+proj=lcc +lat_1=43 +lat_2=45.5 +lat_0=41.75 +lon_0=-120.5 +x_0=399999.99998984 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs';
 *  -- Convert the features:
 *  --- const convertedFeatures = turf.transformTranslate(featureCollection, statePlaneProjection, 'WGS84');
 *  -- Send the new geoJSON object to google maps and see what happens.
 * 
 */

// GeoJSON format:
/**
 * {
 *  "type":"FeatureCollection",
 *  "features":[
 *    {
 *      "type":"Feature",
 *      "properties":{
 *        "name":"IDofObject",
 *        "featureclass":"Subcatchment/Junction/Outfall/Pump/etc"
 *      },"geometry":{
 *        "type":"Point",
 *        "coordinates":[75.95707224036518,30.850359856170176]
 *      }
 *    }, ...
 *  ]
 * }
 */

import proj4 from "proj4"
import {FeatureCollection, Feature, Point, LineString , Polygon } from 'geojson'

/**
* Class for storing and working with inp display objects.
*/
export class SwmmGeoJSON {
  /**
  * Constructor for the SwmmGeoJSON class. 
  */
  constructor() {
  }
  
  // Create one geoJSON object out of an array of geoJSON objects
  static geoJSON_model(model:any){
    let combinedFeatures = [
      ...(SwmmGeoJSON.geoJSON_AnyNodes_tolatlon(model, 'JUNCTIONS')).features,
      ...(SwmmGeoJSON.geoJSON_AnyNodes_tolatlon(model, 'OUTFALLS')).features,
      ...(SwmmGeoJSON.geoJSON_AnyNodes_tolatlon(model, 'DIVIDERS')).features,
      ...(SwmmGeoJSON.geoJSON_AnyNodes_tolatlon(model, 'STORAGE')).features,

      ...(SwmmGeoJSON.geoJSON_AnyLinks_tolatlon(model, 'CONDUITS')).features,
      ...(SwmmGeoJSON.geoJSON_AnyLinks_tolatlon(model, 'PUMPS')).features,
      ...(SwmmGeoJSON.geoJSON_AnyLinks_tolatlon(model, 'ORIFICES')).features,
      ...(SwmmGeoJSON.geoJSON_AnyLinks_tolatlon(model, 'WEIRS')).features,
      ...(SwmmGeoJSON.geoJSON_AnyLinks_tolatlon(model, 'OUTLETS')).features,

      ...(SwmmGeoJSON.geoJSON_Subcatchments_tolatlon(model, 'SUBCATCHMENTS')).features
    ]
    let allgeo = {
      "type": "FeatureCollection",
      "features": combinedFeatures
    }

    return allgeo
  }


  // Translate a model's subcatchments into geoJSON objects:
  static geoJSON_Subcatchments_tolatlon(model:any, layerName:string):any{
    const geoJ: FeatureCollection<Polygon> = {
      type: "FeatureCollection",
      features: []
    };

    // Add each polygon to the features array in the geoJ object.
    for(let entry in model['POLYGONS']){
      const rec = model['POLYGONS'][entry];
      const polyObj: GeoJSON.Feature<GeoJSON.Polygon> = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[]]
        },
        properties: {
          name: entry,
          layer: layerName
        }
      };

      // keep the first coordinate to close the polygon
      let first = 0
      let firstPoint = new Array()
      for (const el in rec) {
        if (Object.prototype.hasOwnProperty.call(rec, el)) {
          if(first===0){
            first = 1;
            firstPoint = [rec[el].x, rec[el].y]
          }
          polyObj.geometry.coordinates[0].push([rec[el].x, rec[el].y]);
        }
      }
      // Close the polygon:
      polyObj.geometry.coordinates[0].push(firstPoint);

      geoJ.features.push(polyObj)
    }

    return geoJ
  }

  // Translate any list of link ids into geoJSON objects:
  static geoJSON_AnyLinks_tolatlon(model:any, layerName:string):any{
    var allLinks = SwmmGeoJSON.getAllLinks(model, layerName)
    const geoJ: FeatureCollection<LineString> = {
      type: "FeatureCollection",
      features: []
    };

    // Add each line to the features array in the geoJ object.
    // Use conduits
    for(let entry in allLinks){
      var rec = allLinks[entry]
      let polyObj: GeoJSON.Feature<GeoJSON.LineString> = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: []
        },
        properties: {
          name: entry,
          layer: layerName
        }
      }
      
      polyObj.geometry.coordinates.push([model.COORDINATES[rec.Node1].x, model.COORDINATES[rec.Node1].y])

      // Add any intermediate vertices
      for(let vertArray in model.VERTICES){
        if(vertArray == entry){
          for(let vert in model.VERTICES[vertArray]){
            polyObj.geometry.coordinates.push([model.VERTICES[vertArray][vert].x, model.VERTICES[vertArray][vert].y])
          }
        }
      }
      
      // Insert the 'outlet' node position
      polyObj.geometry.coordinates.push([model.COORDINATES[rec.Node2].x, model.COORDINATES[rec.Node2].y])

      geoJ.features.push(polyObj)
    }

    return geoJ
  }

  // Translate any list of node ids into geoJSON objects:
  static geoJSON_AnyNodes_tolatlon(model:any, layerName:string):any{
    var allNodes = SwmmGeoJSON.getAllNodes(model, layerName)
    const geoJ: FeatureCollection<Point> = {
      type: "FeatureCollection",
      features: []
    };

    // Add each line to the features array in the geoJ object.
    // Use nodes
    for(let entry in allNodes){
      var rec = allNodes[entry]
      let polyObj: GeoJSON.Feature<GeoJSON.Point> = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [rec.x, rec.y]
        },
        properties: {
          name: entry,
          layer: layerName
        }
      }
      
      geoJ.features.push(polyObj)
    }

    return geoJ
  }

  // getAllLinks packs all of the link data into 
  // an array of data structures like the following:
  // {
  //   id: 'id',
  //   Node1: 'node1',
  //   Node2: 'node2',
  //   linkType: 'ORIFICE/PUMP/CONDUIT/ETC'
  // }
  // 
  // This makes operations like tracing, translating and displaying easier.
  static getAllLinks(model:any, layerName:string):any{
    const features: {[key: string]: any} = {}; // use an index signature to define a dynamic key-value pair object
    
    for (const entry in model[layerName]) {
      const rec = model[layerName][entry];
        
      // Insert the link
      features[entry] = {
        Node1: rec.Node1,
        Node2: rec.Node2,
        linkType: layerName
      };
    }

    return features
  }

  /**
   * getAllNodes packs all of the node data into 
   * an array of data structures like the following:
   * {
   *  id: 'id',
   *  x: xPosition,
   *  y: yPosition,
   *  nodeType: 'JUNCTIONS/OUTFALLS/DIVIDERS/STORAGE'
   * }
   * 
   * This makes operations like tracing, translating and displaying easier.
   * 
   * @param {JSON} model an EPA-SWMM model in JSON format.
   * @param {string} sectionName The name of the EPA-SWMM file section (JUNCTIONS/OUTFALLS/DIVIDERS/STORAGE).
   * @returns swmmNodes 
   */
  static getAllNodes(model: any, layerName: string): any {
    const features: {[key: string]: any} = {}; // use an index signature to define a dynamic key-value pair object
  
    for (const entry in model[layerName]) {
      const rec = model[layerName][entry];
        
      // Insert the object
      features[entry] = {
        nodeType: layerName
      };
    }
  
    for (const entry in model.COORDINATES) {
      if (features[entry]) {
        const rec = model.COORDINATES[entry];
        features[entry].x = rec.x;
        features[entry].y = rec.y;
      }
    }
  
    return features;
  }

  /**
   * Reproject spatial data into GeoJSON objects that can be projected on a global map.
   * 
   * @param {JSON} model an EPA-SWMM model in JSON format.
   * @returns {JSON} object  
   */
  static spatialProjection(model: any): any {
    if(model && ('OPTIONS' in model)){
      let planarGeojson  = SwmmGeoJSON.geoJSON_model(model)
      let selectedProjection = 'swmmNode_proj'
      let selectedTransform  = 'swmmNode_t'
      let projection = model.PCS[selectedProjection]
      let transform  = model.TRANSFORM[selectedTransform]
      // The source data is usually in ft/m.
      // It needs to be translated to lat/lng
      let source = '+proj='     + projection.proj  +
                   ' +zone='    + projection.zone +
                   ' +datum='   + projection.datum +
                   ' +units='   + projection.units +
                   ' +defs='    + projection.defs 
      let dest = '+proj=longlat +datum=WGS84'

      // Project the linestring and polygon coordinates using Proj4JS
      let globalGeojson = JSON.parse(JSON.stringify(planarGeojson))

      let falseCenterX = 0
      let falseCenterY = 0
      if('MAP' in model && 'DIMENSIONS' in model.MAP){
        falseCenterX = model.MAP.DIMENSIONS.x1 //+ (model.MAP.DIMENSIONS.x2 -  model.MAP.DIMENSIONS.x1)/2
        falseCenterY = model.MAP.DIMENSIONS.y1 //+ (model.MAP.DIMENSIONS.y2 -  model.MAP.DIMENSIONS.y1)/2
      }

      globalGeojson.features.forEach(function(feature:any) {
        let geometry = feature.geometry
        // Allow for any map dimensions already set in the user file
        switch (geometry.type) {
          case 'LineString':
            geometry.coordinates = geometry.coordinates.map(function(coord:any) {
              // Perform rotations
              let x1 = coord[0] - falseCenterX
              let y1 = coord[1] - falseCenterY
              // x' = x * cos(theta) - y * sin(theta)
              coord[0] = x1 * Math.cos(transform.rotation) - y1 * Math.sin(transform.rotation)
              // y' = x * sin(theta) + y * cos(theta)
              coord[1] = x1 * Math.sin(transform.rotation) + y1 * Math.cos(transform.rotation)
              
              coord[0] *= transform.size
              coord[1] *= transform.size
              coord[0] += transform.x
              coord[1] += transform.y
              return proj4(source, dest, coord)
            })
            break
          case 'Polygon':
            geometry.coordinates = geometry.coordinates.map(function(ring:any) {
              return ring.map(function(coord:any) {
                // Perform rotations
                let x1 = coord[0] - falseCenterX
                let y1 = coord[1] - falseCenterY
                // x' = x * cos(theta) - y * sin(theta)
                coord[0] = x1 * Math.cos(transform.rotation) - y1 * Math.sin(transform.rotation)
                // y' = x * sin(theta) + y * cos(theta)
                coord[1] = x1 * Math.sin(transform.rotation) + y1 * Math.cos(transform.rotation)

                coord[0] *= transform.size
                coord[1] *= transform.size
                coord[0] += transform.x
                coord[1] += transform.y
                return proj4(source, dest, coord)
              })
            })
            break
          case 'Point':
            geometry.coordinates = (() => {
              // Perform rotations
              let x1 = geometry.coordinates[0] - falseCenterX
              let y1 = geometry.coordinates[1] - falseCenterY
              // x' = x * cos(theta) - y * sin(theta)
              geometry.coordinates[0] = x1 * Math.cos(transform.rotation) - y1 * Math.sin(transform.rotation)
              // y' = x * sin(theta) + y * cos(theta)
              geometry.coordinates[1] = x1 * Math.sin(transform.rotation) + y1 * Math.cos(transform.rotation)
              
              geometry.coordinates[0] *= transform.size
              geometry.coordinates[1] *= transform.size
              geometry.coordinates[0] += transform.x
              geometry.coordinates[1] += transform.y
              return proj4(source, dest, geometry.coordinates)
            })()
            break
        }
      })

      return globalGeojson

    }
  }

  /**
   * Get the globally positioned lat/long center point of a model.
   * 
   * @param {JSON} model an EPA-SWMM model in JSON format.
   * @returns {JSON} object  
   */
  static getCenter(model: any): any {
    if(model && ('OPTIONS' in model)){
      let selectedProjection = 'swmmNode_proj'
      let selectedTransform  = 'swmmNode_t'
      let projection = model.PCS[selectedProjection]
      let transform  = model.TRANSFORM[selectedTransform]
      // The source data is usually in ft/m.
      // It needs to be translated to lat/lng
      let source = '+proj='    + projection.proj  +
                  ' +zone='    + projection.zone  +
                  ' +datum='   + projection.datum +
                  ' +units='   + projection.units +
                  ' +defs='    + projection.defs 
      let dest = '+proj=longlat +datum=WGS84'
    
      let center = proj4(source, dest, [transform.x, transform.y])
      return center
    }
  }

  /**
   * Get the bounding box of a swmm model
   * 
   * @param {JSON} model an EPA-SWMM model in JSON format.
   * @returns {JSON} object: {"bottomleft":{ "lat":number, "lng":number }, "topright":{ "lat":number, "lng":number } } 
   */
  static getBounds(model: any): any {
    if(model && ('OPTIONS' in model)){
      let selectedProjection = 'swmmNode_proj'
      let selectedTransform  = 'swmmNode_t'
      let projection = model.PCS[selectedProjection]
      let transform  = model.TRANSFORM[selectedTransform]
      // The source data is usually in ft/m.
      // It needs to be translated to lat/lng
      let source = '+proj='     + projection.proj  +
                   ' +zone='    + projection.zone +
                   ' +datum='   + projection.datum +
                   ' +units='   + projection.units +
                   ' +defs='    + projection.defs 
      let dest = '+proj=longlat +datum=WGS84'
      
      let boundsArray = [[0, 0], [90, 90]]
      if('MAP' in model && 'DIMENSIONS' in model.MAP){
        boundsArray = [[0, 0], [model.MAP.DIMENSIONS.x2 - model.MAP.DIMENSIONS.x1, model.MAP.DIMENSIONS.y2 - model.MAP.DIMENSIONS.y1]]

        boundsArray.forEach(function(coord:any, index:number) {
          coord[0] *= transform.size
          coord[1] *= transform.size
          coord[0] += transform.x
          coord[1] += transform.y
          boundsArray[index] = proj4(source, dest, coord)
        })
      }
      
      return {
        "bottomleft": {
          "lat": boundsArray[0][1],
          "lng": boundsArray[0][0]
        },
        "topright": {
          "lat": boundsArray[1][1],
          "lng": boundsArray[1][0]
        }
      }
      
    }
  }
}