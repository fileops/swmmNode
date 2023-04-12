// SwmmOut.ts

/**
* Class for storing and working with .out file contents.
* This class expects a standard ArrayBuffer type, which
* can be extracted by extracting a binary .out file's buffer.
*/
export class SwmmOut {
/**
 * @type {ArrayBuffer} the contents of a .out file buffer.
 */
value: ArrayBuffer
/**
 * @type {number} the count of bytes in a time period.
 */
bytesPerPeriod: number
/**
 * @type {number} the count of subcatchments in a model.
 */
totalSubcatchments: number
subcatchmentOutputVars: number
totalNodes: number
nodeOutputVars: number
totalLinks: number
linkOutputVars: number
// Because RECORD_SIZE is not variable and may need 
// to be requested without initializing a SwmmOut object, it is static. 
static RECORD_SIZE: number = 4
static MAX_SUBCATCHMENT_INPUT_VARIABLES: number = 1
static MAX_NODE_INPUT_VARIABLES: number = 3
static MAX_LINK_INPUT_VARIABLES: number = 5
static SUBCATCHMENT_OUTPUT_VARIABLE_COUNT: number = 8
static NODE_OUTPUT_VARIABLE_COUNT: number = 6
static LINK_OUTPUT_VARIABLE_COUNT: number = 5
static SYSTEM_OUTPUT_VARIABLE_COUNT: number = 15
static SUBCATCH = 1
static NODE = 2
static LINK = 3  
static SYS = 4   
static POLLUT = 5

/**
* @type {JSON}
* Description strings structure for documenting output.
*/
static sections = [
  {
    "name":"OPENING RECORDS",
    "contents":[
      {
        "name": "File authentication value 1",
        "description": "Value that identifes this as a valid swmm file. Should match 'File authentication value 2' in CLOSING RECORDS'."
      },
      {
        "name": "SWMM version number",
        "description": "Version of EPA-SWMM that was used to generate this file."
      },
      {
        "name": "Flow unit values",
        "description": "The unit system that describes the variables in this file."
      },
      {
        "name": "Subcatchment count",
        "description": "Count of subcatchments in the model."
      },
      {
        "name": "Node count",
        "description": "Count of nodes in the model."
      },
      {
        "name": "Link count",
        "description": "Count of links in the model."
      },
      {
        "name": "Pollutant count",
        "description": "Count of pollutants in the model."
      }
    ]
  },
  {
    "name":"OBJECT ID NAMES",
    "contents":[
      [
        {
          "name": "Subcatchment ID Length",
          "description": "Count of bytes, or number of characters in this subcatchment ID."
        },
        {
          "name": "Subcatchment ID",
          "description": "The name of this subcatchment."
        },
      ],
      [
        {
          "name": "Node ID Length",
          "description": "Count of bytes, or number of characters in this node ID."
        },
        {
          "name": "Node ID",
          "description": "The name of this node."
        },
      ],
      [
        {
          "name": "Link ID Length",
          "description": "Count of bytes, or number of characters in this link ID."
        },
        {
          "name": "Link ID",
          "description": "The name of this link."
        },
      ],
      [
        {
          "name": "Pollutant ID Length",
          "description": "Count of bytes, or number of characters in this pollutant ID."
        },
        {
          "name": "Pollutant ID",
          "description": "The name of this pollutant."
        },
      ],
      
    ]
  },
  {
    "name":"OBJECT PROPERTIES",
    "contents":[
      [
        {
          "name": "Subcatchment inputs count",
          "description": "Count of input variables for subcatchments."
        },
        {
          "name": "Subcatchment input descriptor (area)",
          "description": "Identifies the type of input in this position per subcatchment."
        },
        {
          "name": "Area",
          "description": "Area of this subcatchment."
        },
      ],
      [
        {
          "name": "Node inputs count",
          "description": "Count of input variables for nodes."
        },
        {
          "name": "Node input descriptor (type)",
          "description": "Identifies the type of input in position 1 per node."
        },
        {
          "name": "Node input descriptor (invert elevation)",
          "description": "Identifies the type of input in position 2 per node."
        },
        {
          "name": "Node input descriptor (maximum depth)",
          "description": "Identifies the type of input in position 3 per node."
        },
        {
          "name": "Type",
          "description": "Type of node."
        },
        {
          "name": "Invert Elevation",
          "description": "Invert elevation of node."
        },
        {
          "name": "Maximum Depth",
          "description": "Maximum depth of node."
        }
      ],
      [
        {
          "name": "Link inputs count",
          "description": "Count of input variables for links."
        },
        {
          "name": "Link input descriptor (type)",
          "description": "Identifies the type of input in position 1 per link."
        },
        {
          "name": "Link input descriptor (upstream invert offset)",
          "description": "Identifies the type of input in position 2 per link."
        },
        {
          "name": "Link input descriptor (downstream invert offset)",
          "description": "Identifies the type of input in position 3 per link."
        },
        {
          "name": "Link input descriptor (maximum depth)",
          "description": "Identifies the type of input in position 4 per link."
        },
        {
          "name": "Link input descriptor (length)",
          "description": "Identifies the type of input in position 5 per link."
        },
        {
          "name": "Type",
          "description": "Type of link."
        },
        {
          "name": "Upstream Invert Offset",
          "description": "Upstream invert offset of link."
        },
        {
          "name": "Downstream Invert Offset",
          "description": "Downstream invert offset of link."
        },
        {
          "name": "Maximum Depth",
          "description": "The maximum depth of the link."
        },
        {
          "name": "Length",
          "description": "The length of the link."
        }
      ],
    ]
  },
  {
    "name":"REPORTING VARIABLES",
    "contents":[
      [
        {
          "name": "Subcatchment outputs count",
          "description": "Count of output variables for subcatchments."
        },
        {
          "name": "Subcatchment output descriptor (rainfall)",
          "description": "Identifies the type of output in position 1 per subcatchment."
        },
        {
          "name": "Subcatchment output descriptor (snow depth)",
          "description": "Identifies the type of output in position 2 per subcatchment."
        },
        {
          "name": "Subcatchment output descriptor (evap loss)",
          "description": "Identifies the type of output in position 3 per subcatchment."
        },
        {
          "name": "Subcatchment output descriptor (infiltration loss)",
          "description": "Identifies the type of output in position 4 per subcatchment."
        },
        {
          "name": "Subcatchment output descriptor (runoff flow rate)",
          "description": "Identifies the type of output in position 5 per subcatchment."
        },
        {
          "name": "Subcatchment output descriptor (groundwater flow rate to node)",
          "description": "Identifies the type of output in position 6 per subcatchment."
        },
        {
          "name": "Subcatchment output descriptor (elevation of saturated groundwater table)",
          "description": "Identifies the type of output in position 7 per subcatchment."
        },
        {
          "name": "Subcatchment output descriptor (soil moisture)",
          "description": "Identifies the type of output in position 8 per subcatchment."
        },
        {
          "name": "Subcatchment output descriptor (pollutant washoff)",
          "description": "Identifies the type of output in position 9+ per subcatchment."
        }
      ],
      [
        {
          "name": "Node outputs count",
          "description": "Count of output variables for nodes."
        },
        {
          "name": "Node output descriptor (depth)",
          "description": "Identifies the type of output in position 1 per node."
        },
        {
          "name": "Node output descriptor (head)",
          "description": "Identifies the type of output in position 2 per node."
        },
        {
          "name": "Node output descriptor (volume stored & ponded)",
          "description": "Identifies the type of output in position 3 per node."
        },
        {
          "name": "Node output descriptor (lateral inflow rate)",
          "description": "Identifies the type of output in position 4 per node."
        },
        {
          "name": "Node output descriptor (total inflow rate)",
          "description": "Identifies the type of output in position 5 per node."
        },
        {
          "name": "Node output descriptor (overflow rate)",
          "description": "Identifies the type of output in position 6 per node."
        },
        {
          "name": "Node output descriptor (pollutant concentration)",
          "description": "Identifies the type of output in position 7+ per node."
        }
      ],
      [
        {
          "name": "Link outputs count",
          "description": "Count of output variables for links."
        },
        {
          "name": "Link output descriptor (flow)",
          "description": "Identifies the type of output in position 1 per link."
        },
        {
          "name": "Link output descriptor (depth)",
          "description": "Identifies the type of output in position 2 per link."
        },
        {
          "name": "Link output descriptor (velocity)",
          "description": "Identifies the type of output in position 3 per link."
        },
        {
          "name": "Link output descriptor (volume)",
          "description": "Identifies the type of output in position 4 per link."
        },
        {
          "name": "Link output descriptor (capacity, ratio of area to full area)",
          "description": "Identifies the type of output in position 5 per link."
        },
        {
          "name": "Link output descriptor (pollutant concentration)",
          "description": "Identifies the type of output in position 6+ per node."
        }
      ],
      [
        {
          "name": "System outputs count",
          "description": "Count of output variables for the system."
        },
        {
          "name": "System output descriptor (temperature)",
          "description": "Identifies the type of system output in position 1."
        },
        {
          "name": "System output descriptor (rainfall)",
          "description": "Identifies the type of system output in position 2."
        },
        {
          "name": "System output descriptor (snow depth)",
          "description": "Identifies the type of system output in position 3."
        },
        {
          "name": "System output descriptor (infiltration)",
          "description": "Identifies the type of system output in position 4."
        },
        {
          "name": "System output descriptor (runoff)",
          "description": "Identifies the type of system output in position 5."
        },
        {
          "name": "System output descriptor (dry weather inflow)",
          "description": "Identifies the type of system output in position 6."
        },
        {
          "name": "System output descriptor (groundwater inflow)",
          "description": "Identifies the type of system output in position 7."
        },
        {
          "name": "System output descriptor (RDII inflow)",
          "description": "Identifies the type of system output in position 8."
        },
        {
          "name": "System output descriptor (external inflow)",
          "description": "Identifies the type of system output in position 9."
        },
        {
          "name": "System output descriptor (total lateral inflow)",
          "description": "Identifies the type of system output in position 10."
        },
        {
          "name": "System output descriptor (system flooding)",
          "description": "Identifies the type of system output in position 11."
        },
        {
          "name": "System output descriptor (outfall outflow)",
          "description": "Identifies the type of system output in position 12."
        },
        {
          "name": "System output descriptor (storage volume)",
          "description": "Identifies the type of system output in position 13."
        },
        {
          "name": "System output descriptor (evaporation)",
          "description": "Identifies the type of system output in position 14."
        },
        {
          "name": "System output descriptor (potential ET)",
          "description": "Identifies the type of system output in position 15."
        }
      ]
    ]
  },
  {
    "name":"REPORTING INTERVAL",
    "contents":[
        {
          "name": "Report Start Date",
          "description": "The start date/time of the report."
        },
        {
          "name": "Reporting interval",
          "description": "The interval between report steps, in secods."
        }
      ]
  },
  {
    "name":"COMPUTED RESULTS",
    "contents":[
      [
        {
          "name": "Rainfall",
          "description": "Subcatchment rainfall"
        },
        {
          "name": "Snow depth",
          "description": "Subcatchment snow depth."
        },
        {
          "name": "Evap loss",
          "description": "Subcatchment evap loss."
        },
        {
          "name": "Infil loss",
          "description": "Subcatchment infiltration loss."
        },
        {
          "name": "Runoff",
          "description": "Subcatchment runoff flow rate."
        },
        {
          "name": "GW flow",
          "description": "Subcatchment groundwater flow rate to node."
        },
        {
          "name": "GW elevation",
          "description": "Elevation of saturated groundwater table."
        },
        {
          "name": "Soil moisture",
          "description": "Soil moisture."
        },
        {
          "name": "Washoff",
          "description": "Subcatchment pollutant washoff concentration."
        }
      ],
      [
        {
          "name": "Depth",
          "description": "Water depth above invert."
        },
        {
          "name": "Head",
          "description": "Hydraulic head."
        },
        {
          "name": "Volume",
          "description": "Volume stored and ponded."
        },
        {
          "name": "Lat. Inflow",
          "description": "Lateral inflow rate."
        },
        {
          "name": "Node inflow",
          "description": "Total inflow rate."
        },
        {
          "name": "Node overflow",
          "description": "Overlfow rate."
        },
        {
          "name": "Washoff",
          "description": "Node pollutant washoff concentration."
        }
      ],
      [
        {
          "name": "Flow",
          "description": "Flow rate."
        },
        {
          "name": "Depth",
          "description": "Flow depth."
        },
        {
          "name": "Velocity",
          "description": "Flow velocity."
        },
        {
          "name": "Volume",
          "description": "Link Volume."
        },
        {
          "name": "Capacity",
          "description": "Ratio of area to full area."
        },
        {
          "name": "Washoff",
          "description": "Link pollutant washoff concentration."
        }
      ],
      [
        {
          "name": "Temperature",
          "description": "Air temperature."
        },
        {
          "name": "Rainfall",
          "description": "Rainfall intensity."
        },
        {
          "name": "Snow depth",
          "description": "System snow depth."
        },
        {
          "name": "Infiltration",
          "description": "System infiltration."
        },
        {
          "name": "Runoff",
          "description": "Runoff flow."
        },
        {
          "name": "DWF",
          "description": "Dry weather inflow."
        },
        {
          "name": "GWF",
          "description": "Ground water inflow."
        },
        {
          "name": "RDII",
          "description": "RDII Inflow."
        },
        {
          "name": "Ex. inflow)",
          "description": "External inflow."
        },
        {
          "name": "Inflow",
          "description": "Total lateral inflow."
        },
        {
          "name": "Flooding",
          "description": "Flooding outflow."
        },
        {
          "name": "Outflow",
          "description": "Outfall outflow."
        },
        {
          "name": "Storage",
          "description": "Storage volume."
        },
        {
          "name": "Evap.",
          "description": "Evaporation"
        },
        {
          "name": "PET",
          "description": "Potential ET."
        }
      ]
    ]
  },
  {
    "name":"CLOSING RECORDS",
    "contents":[
      {
        "name": "Object IDs",
        "description": "Byte position of object IDs."
      },
      {
        "name": "Object data",
        "description": "Byte position of object data."
      },
      {
        "name": "Output data",
        "description": "Byte position of time-based output."
      },
      {
        "name": "Periods",
        "description": "Count of time periods in the model."
      },
      {
        "name": "Error code",
        "description": "Error code for model analysis."
      },
      {
        "name": "File authentication value 2",
        "description": "Value that identifes this as a valid swmm file. Should match 'File authentication value 1' in OPENING RECORDS'."
      },
    ]
  },
]

/**
* @type {Array}
* Description strings for flow units.
*/
static FLOW_UNIT_VALUES = [
  "CFS", "GPM", "MGD", "CMS", "LPS", "LPD"
]

/**
* @type {Array}
* Description strings for unit system.
*/
static UNIT_SYSTEM = [
  "US", "SI"
]

/**
* @type {Array}
* Description strings for subcatchment types.
*/
static SUBCATCHMENT_TYPE_CODES = [
  "Area"
]

/**
* @type {Array}
* Description strings structure for node types.
*/
static NODE_TYPE_CODES = [
  "Junction", "Outfall", "Storage", "Divider"
]

/**
* @type {Array}
* Description strings structure for link types.
*/
static LINK_TYPE_CODES = [
  "Conduit", "Pump", "Orifice", "Weir", "Outlet"
]

/**
* @type {Array}
* Description strings structure for subcatchment results.
*/
static SUBCATCHMENT_RESULTS = [
  "Rainfall", "Snow Depth", "Evap", "Infiltration", "Runoff", "GW Flow", "GW Elev", "Soil Moisture"//, "Washoff"
]

/**
* @type {Array}
* Description strings structure for node results.
*/
static NODE_RESULTS = [
  "Depth", "Head", "Volume", "Lat. Flow", "Inflow", "Overflow"//, "Quality"
]

/**
* @type {Array}
* Description strings structure for link results.
*/
static LINK_RESULTS = [
  "Flow", "Depth", "Velocity", "Volume", "Capacity"//, "Quality"
]

/**
* @type {Array}
* Description strings structure for system results.
*/
static SYS_RESULTS = [
  "Temperature", "Rainfall", "Snow Depth", "Infil", "Runoff", "DW Flow", "GW Flow", "RDII", "External Inflow", "Lateral Inflow", "Flooding", "Outflow", "Storage", "Evap", "Potential ET"
]

/**
* @type {Array}
* Strings structure for pollutant concentrations.
*/
static POLLUTANT_CONCENTRATIONS = [
  "mg/L", "ug/L", "Count/L"
]

/**
* Constructor for the SwmmOut class.
*/
constructor(n: ArrayBuffer) {
  this.value = n
  this.bytesPerPeriod = this.bytesPerPeriod_func()
  this.totalSubcatchments = this.subcatchmentCount()
  this.subcatchmentOutputVars = this.subcatchmentOutputCount()
  this.totalNodes = this.nodeCount()
  this.nodeOutputVars = this.nodeOutputCount()
  this.totalLinks = this.linkCount()
  this.linkOutputVars = this.linkOutputCount()
}
////////////////////////////////////////////////////////////////////////////////////////
// OPENING RECORDS
////////////////////////////////////////////////////////////////////////////////////////
/**
* Returns the object's core value.
*
* @returns {ArrayBuffer} Binary contents of a .out or simulated .out file.
*/
val(): ArrayBuffer {
  return this.value
}

/**
* Returns the object's EPA-SWMM version number.
*
* @returns {number} Integer. EPA-SWMM version number.
*/
version(): number{
  return this.readInt(SwmmOut.RECORD_SIZE)
}

/**
* Returns the object's first magic number.
*
* @returns {number} Integer. Flow unit code.
*/
magic1(): number{
  return this.readInt(0)
}

/**
* Returns the flow unit code.
*
* @returns {number} Integer. Flow unit code.
*/
flowUnitCode(): number{
  return this.readInt(SwmmOut.RECORD_SIZE * 2)
}

/**
* Returns the count of subcatchments.
*
* @returns {number} Integer. Count of subcatchments.
*/
subcatchmentCount(): number{
  return this.readInt(SwmmOut.RECORD_SIZE * 3)
}

/**
* Returns the count of nodes.
*
* @returns {number} Integer. Count of nodes.
*/
nodeCount(): number{
  return this.readInt(SwmmOut.RECORD_SIZE * 4)
}

/**
* Returns the count of links.
*
* @returns {number} Integer. Count of links.
*/
linkCount(): number{
  return this.readInt(SwmmOut.RECORD_SIZE * 5)
}

/**
* Returns the count of pollutants.
*
* @returns {number} Integer. Count of pollutants.
*/
pollutantCount(): number{
  return this.readInt(SwmmOut.RECORD_SIZE * 6)
}

////////////////////////////////////////////////////////////////////////////////////////
// CLOSING RECORDS
////////////////////////////////////////////////////////////////////////////////////////

/**
* Returns the memory position of the Object ID names, 
* relative to the start of the SwmmOut object.
*
* @returns {number} Integer. byte position of Object ID names.
*/
objectIDNames(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORD_SIZE * 6)
}

/**
* Returns the memory position of the Object properties, 
* relative to the start of the SwmmOut object.
*
* @returns {number} Integer. byte position of Object properties.
*/
objectProperties(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORD_SIZE * 5)
}

/**
* Returns the memory position of the computed results, 
* relative to the start of the SwmmOut object.
*
* @returns {number} Integer. byte position of computed results.
*/
computedResults(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORD_SIZE * 4)
}
  
/**
* Returns the count of reporting periods.
*
* @returns {number} Integer. Count of reporting periods.
*/
reportingPeriods(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORD_SIZE * 3)
}
  
/**
* Returns the error code.
*
* @returns {number} Integer. Error code of the SwmmOut object.
*/
errorCode(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORD_SIZE * 2)
}
    
/**
* Returns the object's second magic number, 
* should be equal to the object's first magic number (magic1).
*
* @returns {number} Integer. Object's second magic number.
*/
magic2(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORD_SIZE * 1)
}

////////////////////////////////////////////////////////////////////////////////////////
// Object IDs (names) & pollutant concentration units
////////////////////////////////////////////////////////////////////////////////////////
    
/**
* Returns the SwmmOut subcatchment ID (name) at the index provided.
*
* @param {number} objectIndex The index of the subcatchment.
* @returns {string} subcatchment's name.
*/
subcatchmentName(objectIndex:number): string {
  let maxSubcatchments = this.subcatchmentCount()
  let memoryPosition = this.objectIDNames()
  let objectName = ''
  let nameLength = 0;
  // If the objectIndex is less than 0 or greater than the count of
  // subcatchments, throw error.
  if(objectIndex < 0 || objectIndex >= maxSubcatchments)
    throw new Error("Index is out of bounds")

  // Determine the memory position of the object at objectIndex.
  for(let i = 0; i <= objectIndex; i++){
    nameLength = this.readInt(memoryPosition)
    memoryPosition = memoryPosition + SwmmOut.RECORD_SIZE
    if(i == objectIndex){
      objectName = this.intArrayToString(memoryPosition, memoryPosition+nameLength)
    }
    memoryPosition = memoryPosition + nameLength
  }

  return objectName
}

/**
* Returns the SwmmOut node ID (name) at the index provided.
*
* @param {number} objectIndex The index of the node.
* @returns {string} node's name.
*/
nodeName(objectIndex:number): string {
  let maxSubcatchments = this.subcatchmentCount()
  let maxNodes = this.nodeCount()
  let memoryPosition = this.objectIDNames()
  let objectName = ''
  let nameLength = 0
  // If the objectIndex is less than 0 or greater than
  // the count of nodes, throw error.
  if(objectIndex < 0 || objectIndex >= maxNodes)
    throw new Error("Index is out of bounds")

  // True objectIndex for nodes is objectIndex + maxSubcatchments
  objectIndex = objectIndex + maxSubcatchments

  // Determine the memory position of the object at objectIndex.
  for(let i = 0; i <= objectIndex; i++){
    nameLength = this.readInt(memoryPosition)
    memoryPosition = memoryPosition + SwmmOut.RECORD_SIZE
    if(i == objectIndex){
      objectName = this.intArrayToString(memoryPosition, memoryPosition+nameLength)
    }
    memoryPosition = memoryPosition + nameLength
  }

  return objectName
}

/**
* Returns the SwmmOut link ID (name) at the index provided.
*
* @param {number} objectIndex The index of the link.
* @returns {string} link's name.
*/
linkName(objectIndex:number): string {
  let maxSubcatchments = this.subcatchmentCount()
  let maxLinks = this.linkCount()
  let maxNodes = this.nodeCount()
  let memoryPosition = this.objectIDNames()
  let objectName = ''
  let nameLength = 0;
  
  // If the objectIndex is less than 0 or greater than 
  // the count of nodes, throw error.
  if(objectIndex < 0 || objectIndex >= maxLinks)
    throw new Error("Index is out of bounds")

  // True objectIndex for links is objectIndex + maxSubcatchments + maxNodes
  objectIndex = objectIndex + maxSubcatchments + maxNodes

  // Determine the memory position of the object at objectIndex.
  for(let i = 0; i <= objectIndex; i++){
    nameLength = this.readInt(memoryPosition)
    memoryPosition = memoryPosition + SwmmOut.RECORD_SIZE
    if(i == objectIndex){
      objectName = this.intArrayToString(memoryPosition, memoryPosition+nameLength)
    }
    memoryPosition = memoryPosition + nameLength
  }

  return objectName
}

/**
* Returns the SwmmOut pollutant ID (name) at the index provided.
*
* @param {number} objectIndex The index of the pollutant.
* @returns {string} pollutant's name.
*/
pollutantName(objectIndex:number): string {
  let maxSubcatchments = this.subcatchmentCount()
  let maxLinks = this.linkCount()
  let maxNodes = this.nodeCount()
  let maxPollutants = this.pollutantCount()
  let memoryPosition = this.objectIDNames()
  let objectName = ''
  let nameLength = 0;
  
  // If the objectIndex is less than 0 or greater than
  // the count of pollutants, throw error.
  if(objectIndex < 0 || objectIndex >= maxPollutants)
    throw new Error("Index is out of bounds")

  // True objectIndex for nodes is objectIndex + maxSubcatchments + maxNodes + maxLinks
  objectIndex = objectIndex + maxSubcatchments + maxNodes + maxLinks

  // Determine the memory position of the object at objectIndex.
  for(let i = 0; i <= objectIndex; i++){
    nameLength = this.readInt(memoryPosition)
    memoryPosition = memoryPosition + SwmmOut.RECORD_SIZE
    if(i == objectIndex){
      objectName = this.intArrayToString(memoryPosition, memoryPosition+nameLength)
    }
    memoryPosition = memoryPosition + nameLength
  }

  return objectName
}

/**
* Returns the SwmmOut pollutant concentration units for
* the pollutant at index objectIndex.
*
* @param {number} objectIndex The index of the link.
* @returns {string} the pollutant concentration units.
*/
pollutantConcentrationUnits(objectIndex:number): string{
  let maxSubcatchments = this.subcatchmentCount()
  let maxLinks = this.linkCount()
  let maxNodes = this.nodeCount()
  let maxPollutants = this.pollutantCount()
  let memoryPosition = this.objectIDNames()
  let nameLength = 0
  
  // If the objectIndex is less than 0 or greater than
  // the count of pollutants, throw error.
  if(objectIndex < 0 || objectIndex >= maxPollutants)
    throw new Error("Index is out of bounds")

  // Get maxNamesIndex for the pollutantConcentrationUnits maxPollutants + maxSubcatchments + maxNodes + maxLinks
  let maxNamesIndex = maxPollutants + maxSubcatchments + maxNodes + maxLinks

  // Move to the end of the Object ID set (names)
  for(let i = 0; i < maxNamesIndex; i++){
    nameLength = this.readInt(memoryPosition)
    memoryPosition = memoryPosition + SwmmOut.RECORD_SIZE + nameLength
  }

  return SwmmOut.POLLUTANT_CONCENTRATIONS[this.readInt(memoryPosition + SwmmOut.RECORD_SIZE * objectIndex)]
}

////////////////////////////////////////////////////////////////////////////////////////
// Input variables
////////////////////////////////////////////////////////////////////////////////////////

/**
* Returns the count of subcatchment descriptor variables.
* Always 1.
*
* @returns {number} Integer. Count of subcatchment descriptor variables.
*/
subcatchmentInputCount(): number{
  let memoryPosition = this.objectProperties()
  return this.readInt(memoryPosition)
}

/**
* Returns the type of a subcatchment descriptor variable.
* Code: 
*   1: Area
*
* @param {number} index The index of the subcatchment descriptor variable.
* @returns {number} Integer. Type of a subcatchment descriptor variable.
*/
subcatchmentInputType(index:number): number{
  // Do not accept indices < 0 or >= MAX_SUBCATCHMENT_INPUT_VARIABLES
  if(index < 0 || index >= SwmmOut.MAX_SUBCATCHMENT_INPUT_VARIABLES)
    throw new Error("Index is out of bounds")

  let inputIndicesStart  = this.objectProperties() + SwmmOut.RECORD_SIZE 
  let inputIndexPosition = inputIndicesStart       + SwmmOut.RECORD_SIZE * index
  return this.readInt( inputIndexPosition )
}

/**
* Returns the value of a subcatchment's area.
*
* @param {number} index The index of the subcatchment.
* @returns {number} Float. Value of a subcatchment's area.
*/
subcatchmentArea(index:number): number{
  // Do not accept indices < 0 or >= subcatchmentCount()
  if(index < 0 || index >= this.subcatchmentCount())
    throw new Error("Index is out of bounds")

  let inputIndicesStart  = this.objectProperties() + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart       + SwmmOut.RECORD_SIZE * this.subcatchmentInputCount()
  let inputIndexPosition = inputValuesStart        + SwmmOut.RECORD_SIZE * index
  return this.readFloat( inputIndexPosition )
}

/**
* Returns the memory offset of the node input variables in the SwmmOut object.
*
* @returns {number} Integer. Offset location of node input variables.
*/
nodeInputOffset(): number{
  let inputIndicesStart  = this.objectProperties() + SwmmOut.RECORD_SIZE 
  let subcaValuesStart   = inputIndicesStart       + SwmmOut.RECORD_SIZE * this.subcatchmentInputCount()
  let subcaIndexPosition = subcaValuesStart        + SwmmOut.RECORD_SIZE * this.subcatchmentInputCount() * this.subcatchmentCount()    
  return subcaIndexPosition
}

/**
* Returns the count of node descriptor variables.
* Always 3.
*
* @returns {number} Integer. Count of node descriptor variables.
*/
nodeInputCount(): number{
  let memoryPosition = this.nodeInputOffset()      
  return this.readInt(memoryPosition)
}

/**
* Returns the type of a node descriptor variable.
* Code: 
*   0: Node Type
*   2: Invert Elevation
*   3: Maximum Depth
*
* @param {number} index The index of the node descriptor variable.
* @returns {number} Integer. Type of a node descriptor variable.
*/
nodeInputType(index:number): number{
  // Do not accept indices < 0 or >= MAX_NODE_INPUT_VARIABLES
  if(index < 0 || index >= SwmmOut.MAX_NODE_INPUT_VARIABLES)
    throw new Error("Index is out of bounds")

  let memoryPosition = this.nodeInputOffset()
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputIndexPosition = inputIndicesStart + SwmmOut.RECORD_SIZE * index
  return this.readInt( inputIndexPosition )
}

/**
* Returns the value of a nodes's type.
*
* @param {number} index The index of the node.
* @returns {number} Integer. Value of a nodes's type.
* Code:
*   0: Junction
*   1: Outfall
*   2: Storage
*   3: Divider
*/
nodeType(index:number): number{
  // Do not accept indices < 0 or >= nodeCount()
  if(index < 0 || index >= this.nodeCount())
    throw new Error("Index is out of bounds")
  
  let memoryPosition = this.nodeInputOffset()
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart + SwmmOut.RECORD_SIZE * this.nodeInputCount()
  let inputIndexPosition = inputValuesStart  + SwmmOut.RECORD_SIZE * this.nodeInputCount() * index
  return this.readInt( inputIndexPosition )
}

/**
* Returns the string value of a nodes's type.
*
* @param {number} index The index of the node.
* @returns {string} String. Value of a nodes's type.
* Code:
*   0: Junction
*   1: Outfall
*   2: Storage
*   3: Divider
*/
nodeTypeString(index:number): string{
  // Do not accept indices < 0 or >= nodeCount()
  if(index < 0 || index >= this.nodeCount())
    throw new Error("Index is out of bounds")
  
  let memoryPosition = this.nodeInputOffset()
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart + SwmmOut.RECORD_SIZE * this.nodeInputCount()
  let inputIndexPosition = inputValuesStart  + SwmmOut.RECORD_SIZE * this.nodeInputCount() * index
  return SwmmOut.NODE_TYPE_CODES[this.readInt( inputIndexPosition )]
}

/**
* Returns the value of a nodes's invert elevation.
*
* @param {number} index The index of the node.
* @returns {number} Float. Value of a nodes's invert elevation.
*/
nodeInvertElevation(index:number): number{
  // Do not accept indices < 0 or >= nodeCount()
  if(index < 0 || index >= this.nodeCount())
    throw new Error("Index is out of bounds")
  
  let memoryPosition = this.nodeInputOffset()
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart + SwmmOut.RECORD_SIZE * this.nodeInputCount()
  let inputIndexPosition = inputValuesStart  + SwmmOut.RECORD_SIZE * this.nodeInputCount() * index + SwmmOut.RECORD_SIZE
  return this.readFloat( inputIndexPosition )
}

/**
* Returns the value of a nodes's maximum depth.
*
* @param {number} index The index of the node.
* @returns {number} Float. Value of a nodes's  maximum depth.
*/
nodeMaximumDepth(index:number): number{
  // Do not accept indices < 0 or >= nodeCount()
  if(index < 0 || index >= this.nodeCount())
    throw new Error("Index is out of bounds")
  
  let memoryPosition = this.nodeInputOffset()
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart + SwmmOut.RECORD_SIZE * this.nodeInputCount()
  let inputIndexPosition = inputValuesStart  + SwmmOut.RECORD_SIZE * this.nodeInputCount() * index + SwmmOut.RECORD_SIZE * 2
  return this.readFloat( inputIndexPosition )
}

/**
* Returns the memory offset of the link input variables in the SwmmOut object.
*
* @returns {number} Integer. Offset location of link input variables.
*/
linkInputOffset(): number{
  let memoryPosition = this.nodeInputOffset()   
  
  let nodeIndicesStart   = memoryPosition   + SwmmOut.RECORD_SIZE 
  let nodeValuesStart    = nodeIndicesStart + SwmmOut.RECORD_SIZE * this.nodeInputCount()
  let nodeIndexPosition  = nodeValuesStart  + SwmmOut.RECORD_SIZE * this.nodeInputCount() * this.nodeCount()
  return nodeIndexPosition
}

/**
* Returns the count of link descriptor variables.
* Always 5.
*
* @returns {number} Integer. Count of link descriptor variables.
*/
linkInputCount(): number{
  let memoryPosition     = this.linkInputOffset()      
  return this.readInt(memoryPosition)
}

/**
* Returns the type of a link descriptor variable.
* Code: 
*   0: Link Type
*   4: Upstream Invert Offset
*   4: Downstream Invert Offset
*   3: Maximum Depth
*   5: Length
*
* @param {number} index The index of the link descriptor variable.
* @returns {number} Integer. Type of a link descriptor variable. 
*/
linkInputType(index:number): number{
  // Do not accept indices < 0 or >= MAX_LINK_INPUT_VARIABLES
  if(index < 0 || index >= SwmmOut.MAX_LINK_INPUT_VARIABLES)
    throw new Error("Index is out of bounds")
  
  let memoryPosition     = this.linkInputOffset()  
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputIndexPosition = inputIndicesStart + SwmmOut.RECORD_SIZE * index
  return this.readInt( inputIndexPosition )
}

/**
* Returns the value of a link's type.
*
* @param {number} index The index of the link.
* @returns {number} Integer. Value of a link's type. 
* Code:
*   0: Junction
*   1: Outfall
*   2: Storage
*   3: Divider
*/
linkType(index:number): number{
  // Do not accept indices < 0 or >= linkCount()
  if(index < 0 || index >= this.linkCount())
    throw new Error("Index is out of bounds")
  
  let memoryPosition     = this.linkInputOffset()  
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart + SwmmOut.RECORD_SIZE * this.linkInputCount()
  let inputIndexPosition = inputValuesStart  + SwmmOut.RECORD_SIZE * this.linkInputCount() * index
  return this.readInt( inputIndexPosition )
}

/**
* Returns the string value of a link's type.
*
* @param {number} index The index of the link.
* @returns {string} String. Value of a link's type. 
* Code:
*   0: Junction
*   1: Outfall
*   2: Storage
*   3: Divider
*/
linkTypeString(index:number): string{
  // Do not accept indices < 0 or >= linkCount()
  if(index < 0 || index >= this.linkCount())
    throw new Error("Index is out of bounds")
  
  let memoryPosition     = this.linkInputOffset()  
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart + SwmmOut.RECORD_SIZE * this.linkInputCount()
  let inputIndexPosition = inputValuesStart  + SwmmOut.RECORD_SIZE * this.linkInputCount() * index
  return SwmmOut.LINK_TYPE_CODES[this.readInt( inputIndexPosition )]
}

/**
* Returns the value of a link's Upstream invert offset.
*
* @param {number} index The index of the link.
* @returns {number} Integer. Value of a link's Upstream invert offset.
*/
linkUpstreamInvertOffset(index:number): number{
  // Do not accept indices < 0 or >= linkCount()
  if(index < 0 || index >= this.linkCount())
    throw new Error("Index is out of bounds")
  
  let memoryPosition     = this.linkInputOffset()  
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart + SwmmOut.RECORD_SIZE * this.linkInputCount()
  let inputIndexPosition = inputValuesStart  + SwmmOut.RECORD_SIZE * this.linkInputCount() * index + SwmmOut.RECORD_SIZE * 1
  return this.readFloat( inputIndexPosition )
}

/**
* Returns the value of a link's Downstream invert offset.
*
* @param {number} index The index of the link.
* @returns {number} Integer. Value of a link's Downstream invert offset.
*/
linkDownstreamInvertOffset(index:number): number{
  // Do not accept indices < 0 or >= linkCount()
  if(index < 0 || index >= this.linkCount())
    throw new Error("Index is out of bounds")
  
  let memoryPosition     = this.linkInputOffset()  
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart + SwmmOut.RECORD_SIZE * this.linkInputCount()
  let inputIndexPosition = inputValuesStart  + SwmmOut.RECORD_SIZE * this.linkInputCount() * index + SwmmOut.RECORD_SIZE * 2
  return this.readFloat( inputIndexPosition )
}

/**
* Returns the value of a link's Maximum depth.
*
* @param {number} index The index of the link.
* @returns {number} Integer. Value of a link's Maximum depth.
*/
linkMaximumDepth(index:number): number{
  // Do not accept indices < 0 or >= linkCount()
  if(index < 0 || index >= this.linkCount())
    throw new Error("Index is out of bounds")
  
  let memoryPosition     = this.linkInputOffset()  
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart + SwmmOut.RECORD_SIZE * this.linkInputCount()
  let inputIndexPosition = inputValuesStart  + SwmmOut.RECORD_SIZE * this.linkInputCount() * index + SwmmOut.RECORD_SIZE * 3
  return this.readFloat( inputIndexPosition )
}

/**
* Returns the value of a link's Maximum depth.
*
* @param {number} index The index of the link.
* @returns {number} Integer. Value of a link's Maximum depth.
*/
linkLength(index:number): number{
  // Do not accept indices < 0 or >= linkCount()
  if(index < 0 || index >= this.linkCount())
    throw new Error("Index is out of bounds")
  
  let memoryPosition     = this.linkInputOffset()  
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart + SwmmOut.RECORD_SIZE * this.linkInputCount()
  let inputIndexPosition = inputValuesStart  + SwmmOut.RECORD_SIZE * this.linkInputCount() * index + SwmmOut.RECORD_SIZE * 4
  return this.readFloat( inputIndexPosition )
}


////////////////////////////////////////////////////////////////////////////////////////
// Output variables
////////////////////////////////////////////////////////////////////////////////////////

/**
* Returns the memory offset of the subcatchment output variables in the SwmmOut object.
*
* @returns {number} Integer. Offset location of subcatchment output variables.
*/
outputVariablesOffset(): number{
  let memoryPosition = this.linkInputOffset()   
  
  let nodeIndicesStart   = memoryPosition   + SwmmOut.RECORD_SIZE 
  let nodeValuesStart    = nodeIndicesStart + SwmmOut.RECORD_SIZE * this.linkInputCount()
  let nodeIndexPosition  = nodeValuesStart  + SwmmOut.RECORD_SIZE * this.linkInputCount() * this.linkCount()
  return nodeIndexPosition
}

/**
* Returns the count of subcatchment output variables.
* Always 8 + pollutant count.
*
* @returns {number} Integer. Count of subcatchment output variables.
*/
subcatchmentOutputCount(): number{
  let memoryPosition = this.outputVariablesOffset()
  return this.readInt(memoryPosition)
}

/**
* Returns the index of subcatchment output variables.
* This part of the .out file appears redundant.
*
* @param {number} index The index of the subcatchment output variable index.
* @returns {number} Integer. Index of the subcatchment output variable index.
*/
subcatchmentOutputVariable(index:number): number{
  // Do not accept indices < 0 or >= SwmmOut.SUBCATCHMENT_OUTPUT_VARIABLE_COUNT + this.pollutantCount()
  if(index < 0 || index >= SwmmOut.SUBCATCHMENT_OUTPUT_VARIABLE_COUNT + this.pollutantCount())
    throw new Error("Index is out of bounds")

  let memoryPosition = this.outputVariablesOffset() + SwmmOut.RECORD_SIZE
    + index * SwmmOut.RECORD_SIZE

  return this.readInt(memoryPosition)
}

/**
* Returns the count of node output variables.
* Always 6 + pollutant count.
*
* @returns {number} Integer. Count of node output variables.
*/
nodeOutputCount(): number{
  let memoryPosition = this.outputVariablesOffset() + SwmmOut.RECORD_SIZE 
    + (SwmmOut.SUBCATCHMENT_OUTPUT_VARIABLE_COUNT + this.pollutantCount()) * SwmmOut.RECORD_SIZE

  return this.readInt(memoryPosition)
}

/**
* Returns the index of node output variables.
* This part of the .out file appears redundant.
*
* @param {number} index The index of the node output variable index.
* @returns {number} Integer. Index of the node output variable index.
*/
nodeOutputVariable(index:number): number{
  // Do not accept indices < 0 or >= SwmmOut.NODE_OUTPUT_VARIABLE_COUNT + this.pollutantCount()
  if(index < 0 || index >= SwmmOut.NODE_OUTPUT_VARIABLE_COUNT + this.pollutantCount())
    throw new Error("Index is out of bounds")

  let memoryPosition = this.outputVariablesOffset() + SwmmOut.RECORD_SIZE * 2
    + (SwmmOut.SUBCATCHMENT_OUTPUT_VARIABLE_COUNT + this.pollutantCount()) * SwmmOut.RECORD_SIZE
    + index * SwmmOut.RECORD_SIZE

  return this.readInt(memoryPosition)
}

/**
* Returns the count of link output variables.
* Always 5 + pollutant count.
*
* @returns {number} Integer. Count of link output variables.
*/
linkOutputCount(): number{
  let memoryPosition = this.outputVariablesOffset() + SwmmOut.RECORD_SIZE * 2
    + (SwmmOut.SUBCATCHMENT_OUTPUT_VARIABLE_COUNT + this.pollutantCount()) * SwmmOut.RECORD_SIZE
    + (SwmmOut.NODE_OUTPUT_VARIABLE_COUNT         + this.pollutantCount()) * SwmmOut.RECORD_SIZE

  return this.readInt(memoryPosition)
}

/**
* Returns the index of link output variables.
* This part of the .out file appears to be redundant.
*
* @param {number} index The index of the link output variable index.
* @returns {number} Integer. Index of the link output variable index.
*/
linkOutputVariable(index:number): number{
  // Do not accept indices < 0 or >= SwmmOut.LINK_OUTPUT_VARIABLE_COUNT + this.pollutantCount()
  if(index < 0 || index >= SwmmOut.LINK_OUTPUT_VARIABLE_COUNT + this.pollutantCount())
    throw new Error("Index is out of bounds")

  let memoryPosition = this.outputVariablesOffset() + SwmmOut.RECORD_SIZE * 3
    + (SwmmOut.SUBCATCHMENT_OUTPUT_VARIABLE_COUNT + this.pollutantCount()) * SwmmOut.RECORD_SIZE
    + (SwmmOut.NODE_OUTPUT_VARIABLE_COUNT         + this.pollutantCount()) * SwmmOut.RECORD_SIZE
    + index * SwmmOut.RECORD_SIZE

  return this.readInt(memoryPosition)
}

/**
* Returns the count of system output variables.
* Always 15.
*
* @returns {number} Integer. Count of system output variables.
*/
systemOutputCount(): number{
  let memoryPosition = this.outputVariablesOffset() + SwmmOut.RECORD_SIZE * 3
    + (SwmmOut.SUBCATCHMENT_OUTPUT_VARIABLE_COUNT + this.pollutantCount()) * SwmmOut.RECORD_SIZE
    + (SwmmOut.NODE_OUTPUT_VARIABLE_COUNT         + this.pollutantCount()) * SwmmOut.RECORD_SIZE
    + (SwmmOut.LINK_OUTPUT_VARIABLE_COUNT         + this.pollutantCount()) * SwmmOut.RECORD_SIZE

  return this.readInt(memoryPosition)
}

/**
* Returns the index of system output variables.
* This part of the .out file appears to be redundant.
*
* @param {number} index The index of the system output variable index.
* @returns {number} Integer. Index of the system output variable index.
*/
systemOutputVariable(index:number): number{
  // Do not accept indices < 0 or >= this.systemOutputCount()
  if(index < 0 || index >= this.systemOutputCount())
    throw new Error("Index is out of bounds")

  let memoryPosition = this.outputVariablesOffset() + SwmmOut.RECORD_SIZE * 4
    + (this.subcatchmentCount() + this.pollutantCount()) * SwmmOut.RECORD_SIZE
    + (this.nodeCount()         + this.pollutantCount()) * SwmmOut.RECORD_SIZE
    + (this.linkCount()         + this.pollutantCount()) * SwmmOut.RECORD_SIZE
    + index * SwmmOut.RECORD_SIZE
  
    return this.readInt(memoryPosition)
}

////////////////////////////////////////////////////////////////////////////////////////
// START TIME & TIME STEP
////////////////////////////////////////////////////////////////////////////////////////

/**
* Returns the start date & time of the simulation in count of days since 12/30/1899. Use this to interact with EPA-SWMM files and functions.
*
* @returns {number} Float64. Start date & time.
*/
startTime_swmmFormat(): number{
  let memoryPosition = this.computedResults() - 3 * SwmmOut.RECORD_SIZE
  
  return this.readDouble(memoryPosition)
}

/**
* Returns the start date & time of the simulation in count of milliseconds since 12/31/1970. Use this to interact with Unix timestamp functions.
*
* @returns {number} Float64. Start date & time.
*/
startTime_Unix(): number{
  let swmmTime = this.startTime_swmmFormat()
  let diff = Date.UTC(0, 0, 0, 0)/(1000 * 60 * 60 * 24) - Date.UTC(1899,11,30)/(1000 * 60 * 60 * 24)
  let newTime = swmmTime - diff
  
  return Date.UTC(0, 0, newTime)
}

/**
* Returns the time step duration of the simulation, in seconds.
*
* @returns {number} Integer. Time step duration, seconds.
*/
timeStep(): number{
  let memoryPosition = this.computedResults() - 1 * SwmmOut.RECORD_SIZE
  
  return this.readInt(memoryPosition)
}

/**
* Returns a Javascript Date version of a Float64 as passed from startTime(). Use this to make date objects for interacting with non-EPA-SWMM files.
*
* @param {number} theDouble A 64-bit floating point number representing the number of days since 12/30/1899 00:00.
* @returns {Date} A Javascript date object.
*/
static doubleToDate_swmmFormat(theDouble:number): Date{
  let startClock = new Date(Date.UTC(1899, 11, 30 + theDouble, 0, 0, 0))
  
  return startClock
}

/**
* Returns a human-readable string version of a Float64 date as passed from startTime(). Use this to make strings for interacting with non-EPA-SWMM files.
*
* @param {number} theDouble A 64-bit floating point number representing the number of days since 12/30/1899 00:00
* @returns {string} A Javascript string object.
*/
static doubleDateToString_swmmFormat(theDouble:number): string{
  var seconds = Math.round(24*3600*(theDouble%1))

  let clock = new Date('12/30/1899')
  clock     = new Date(clock.setDate(clock.getDate() + theDouble))
  clock.setSeconds(seconds)
  let clockStr = (clock.getMonth()+1).toString().padStart(2, '0') + '/' +
                 clock.getDate()     .toString().padStart(2, '0')  + '/' +
                 clock.getFullYear() +
                 ' ' +
                 clock.getHours()    .toString().padStart(2, '0') + ':' +
                 clock.getMinutes()  .toString().padStart(2, '0') + ':' +
                 clock.getSeconds()  .toString().padStart(2, '0')
  
  return clockStr
}

/**
* Returns a human-readable string version of an integer time step.
* Use this to make strings that can be written to EPA-SWMM files.
* 
* @param {number} timeStep An integer representing the time step of 
* the model. Does not need to be within the bounds of the model.
* @returns {string} A Javascript string object.
*/
swmmStepToDate(timeStep:number): string{

  let theDouble = this.startTime_Unix()/1000 + timeStep * this.timeStep()

  let clock = new Date(0)
  //clock.setSeconds(theDouble + clock.getTimezoneOffset()/3600)
  clock.setUTCSeconds(theDouble)

  let clockStr = 
    (clock.getUTCMonth()+1).toString().padStart(2, '0') + '/' +
    clock.getUTCDate()     .toString().padStart(2, '0')  + '/' +
    clock.getUTCFullYear() +
    ' ' +
    clock.getUTCHours()    .toString().padStart(2, '0') + ':' +
    clock.getUTCMinutes()  .toString().padStart(2, '0') + ':' +
    clock.getUTCSeconds()  .toString().padStart(2, '0') 
  
    return clockStr
}

////////////////////////////////////////////////////////////////////////////////////////
// COMPUTED RESULTS
////////////////////////////////////////////////////////////////////////////////////////

/**
* Returns the count of days since 12/30/1899 a given time step.
*
* @param {number} timeStep The index of the time step (1-based, also 1 time-step ahead of StartDate).
* @returns {number} Float64. Date & time in count of days since 12/30/1899.
*/
dateStep_swmmFormat(timeStep:number): number{
  let memoryPosition = this.computedResults() + ( timeStep - 1) * this.bytesPerPeriod
  
  return this.readDouble(memoryPosition)
}

/**
* Returns the value stored as a result from a given object.
*
* @param {number} iType  The type of the object (SUBCATCHMENT, NODE, LINK, SYS).
* @param {number} iIndex The index of the object.
* @param {number} vIndex The index of the variable.
* @param {number} period The index of the time period. (1-based)
* @returns {number} Float32. value stored as a result.
*/
get_result(iType:number, iIndex:number, vIndex:number, period:number): number{
  let memoryPosition = this.getswmmresultoffset(iType, iIndex, vIndex, period)
  
  return this.readFloat(memoryPosition)
}

/**
* Returns the value stored as a result from a subcatchment.
*
* @param {number} iIndex The index of the subcatchment.
* @param {number} vIndex The index of the variable.
* @param {number} period The index of the time period. (1-based)
* @returns {number} Float32. value stored as a result.
*/
subcatchmentOutput(iIndex:number, vIndex:number, period:number): number{
  let memoryPosition = this.getswmmresultoffset(SwmmOut.SUBCATCH, iIndex, vIndex, period)
  
  return this.readFloat(memoryPosition)
}

/**
* Returns the value stored as a result from a node.
*
* @param {number} iIndex The index of the node.
* @param {number} vIndex The index of the variable.
* @param {number} period The index of the time period. (1-based)
* @returns {number} Float32. value stored as a result.
*/
nodeOutput(iIndex:number, vIndex:number, period:number): number{
  let memoryPosition = this.getswmmresultoffset(SwmmOut.NODE, iIndex, vIndex, period)
  
  return this.readFloat(memoryPosition)
}

/**
* Returns the value stored as a result from a link.
*
* @param {number} iIndex The index of the node.
* @param {number} vIndex The index of the variable.
* @param {number} period The index of the time period. (1-based)
* @returns {number} Float32. value stored as a result.
*/
linkOutput(iIndex:number, vIndex:number, period:number): number{
  let memoryPosition = this.getswmmresultoffset(SwmmOut.LINK, iIndex, vIndex, period)
  
  return this.readFloat(memoryPosition)
}

/**
* Returns the value stored as a result from a system variable.
*
* @param {number} vIndex The index of the system variable.
* @param {number} period The index of the time period. (1-based)
* @returns {number} Float32. value stored as a result.
*/
sysOutput(vIndex:number, period:number): number{
  let iIndex = 0
  let memoryPosition = this.getswmmresultoffset(SwmmOut.SYS, iIndex, vIndex, period)
  
  return this.readFloat(memoryPosition)
}

////////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////

/**
* Returns the total count of bytes per time period.
*
* @returns {number} Integer. The total count of bytes per time period.
*/
bytesPerPeriod_func() {
  let val = SwmmOut.RECORD_SIZE * (
              2 + 
              this.subcatchmentCount() * this.subcatchmentOutputCount() +
              this.nodeCount()         * this.nodeOutputCount() +
              this.linkCount()         * this.linkOutputCount() +
              this.systemOutputCount()
            ) 
  
  return val
}

/**
* Returns the memory location of a result value in SwmmOut.
*
* @param {number} iType The type of the object.
* @param {number} iIndex The index of the object.
* @param {number} vIndex The index of the variable.
* @param {number} period The index of the time period.
* @returns {number} Float32. value stored as a result.
*/
getswmmresultoffset (iType:number, iIndex:number, vIndex:number, period:number ) {
  var offset1, offset2 = 0
  offset1 = this.computedResults() 
                + (period - 1)         * this.bytesPerPeriod
  
  if ( iType === SwmmOut.SUBCATCH) 
    offset2 = iIndex                   * this.subcatchmentOutputVars
                + vIndex
  else if (iType === SwmmOut.NODE) 
    offset2 = this.totalSubcatchments  * this.subcatchmentOutputVars
                + iIndex               * this.nodeOutputVars
                + vIndex
  else if (iType === SwmmOut.LINK)
    offset2 = this.totalSubcatchments  * this.subcatchmentOutputVars
                + this.totalNodes      * this.nodeOutputVars
                + iIndex               * this.linkOutputVars 
                + vIndex
  else if (iType === SwmmOut.SYS) 
    offset2 = this.totalSubcatchments  * this.subcatchmentOutputVars
                + this.totalNodes      * this.nodeOutputVars 
                + this.totalLinks      * this.linkOutputVars
                + vIndex
  
  return offset1 + SwmmOut.RECORD_SIZE * offset2 + 2 * SwmmOut.RECORD_SIZE
}

/**
* Reads a 32-bit signed integer from a position in SwmmOut.
*
* @param {number} offset The position of the readable integer, in number of bytes from the start of the SwmmOut object.
* @returns {number} An integer read from SwmmOut.
*/
readInt(offset:number) {
  return new Int32Array(this.value.slice(offset, offset + SwmmOut.RECORD_SIZE))[0]
}

/**
* Reads a 32-bit signed float from a position in SwmmOut.
*
* @param {number} offset The position of the readable float, in number of bytes from the start of the SwmmOut object.
* @returns {number} A float read from SwmmOut.
*/
readFloat(offset:number) {
  return new Float32Array(this.value.slice(offset, offset + SwmmOut.RECORD_SIZE))[0]
}

/**
* Reads a 64-bit signed float from a position in SwmmOut.
*
* @param {number} offset The position of the readable float, in number of bytes from the start of the SwmmOut object.
* @returns {number} A 64-bit float (double)read from SwmmOut.
*/
readDouble(offset:number) {
  return new Float64Array(this.value.slice(offset, offset + SwmmOut.RECORD_SIZE * 2))[0]
}

/**
* Reads a string from a position in SwmmOut.
*
* @param {number} offset1 The position of the start of the readable string, in number of bytes from the start of the SwmmOut object.
* @param {number} offset2 The position of the end of the readable string, in number of bytes from the start of the SwmmOut object.
* @returns {number} A string read from the SwmmOut object.
*/ 
intArrayToString(offset1:number, offset2:number) {
  let array = new Uint8Array(this.value.slice(offset1, offset2))
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  
  return ret.join('');
}

}
