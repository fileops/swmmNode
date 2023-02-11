/**
* Class for storing .out file contents.
* This class can also be used to create simluated .out file contents.
*/
export class SwmmOut {
value: ArrayBuffer
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


constructor(n: ArrayBuffer) {
  this.value = n
}
////////////////////////////////////////////////////////////////////////////////////////
// OPENING RECORDS
////////////////////////////////////////////////////////////////////////////////////////
/**
* Returns the object's core value.
*
* @return {ArrayBuffer} Binary contents of a .out or simulated .out file.
*/
val(): ArrayBuffer {
  return this.value
}

/**
* Returns the object's EPA-SWMM version number.
*
* @return {number} Integer. EPA-SWMM version number.
*/
version(): number{
  return this.readInt(SwmmOut.RECORD_SIZE)
}

/**
* Returns the object's first magic number.
*
* @return {number} Integer. Flow unit code.
*/
magic1(): number{
  return this.readInt(0)
}

/**
* Returns the flow unit code.
*
* @return {number} Integer. Flow unit code.
*/
flowUnitCode(): number{
  return this.readInt(SwmmOut.RECORD_SIZE * 2)
}

/**
* Returns the count of subcatchments.
*
* @return {number} Integer. Count of subcatchments.
*/
subcatchmentCount(): number{
  return this.readInt(SwmmOut.RECORD_SIZE * 3)
}

/**
* Returns the count of nodes.
*
* @return {number} Integer. Count of nodes.
*/
nodeCount(): number{
  return this.readInt(SwmmOut.RECORD_SIZE * 4)
}

/**
* Returns the count of links.
*
* @return {number} Integer. Count of links.
*/
linkCount(): number{
  return this.readInt(SwmmOut.RECORD_SIZE * 5)
}

/**
* Returns the count of pollutants.
*
* @return {number} Integer. Count of pollutants.
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
* @return {number} Integer. byte position of Object ID names.
*/
objectIDNames(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORD_SIZE * 6)
}

/**
* Returns the memory position of the Object properties, 
* relative to the start of the SwmmOut object.
*
* @return {number} Integer. byte position of Object properties.
*/
objectProperties(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORD_SIZE * 5)
}

/**
* Returns the memory position of the computed results, 
* relative to the start of the SwmmOut object.
*
* @return {number} Integer. byte position of computed results.
*/
computedResults(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORD_SIZE * 4)
}
  
/**
* Returns the count of reporting periods.
*
* @return {number} Integer. Count of reporting periods.
*/
reportingPeriods(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORD_SIZE * 3)
}
  
/**
* Returns the error code.
*
* @return {number} Integer. Error code of the SwmmOut object.
*/
errorCode(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORD_SIZE * 2)
}
    
/**
* Returns the object's second magic number, 
* should be equal to the object's first magic number (magic1).
*
* @return {number} Integer. Object's second magic number.
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
* @return {string} subcatchment's name.
*/
subcatchmentName(objectIndex:number): string | undefined{
  let maxSubcatchments = this.subcatchmentCount()
  let memoryPosition = this.objectIDNames()
  let objectName = ''
  let nameLength = 0;
  // If the objectIndex is less than 0 or greater than the count of
  // subcatchments, return undefined.
  if(objectIndex < 0 || objectIndex >= maxSubcatchments)
    return undefined
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
* @return {string} node's name.
*/
nodeName(objectIndex:number): string | undefined{
  let maxSubcatchments = this.subcatchmentCount()
  let maxNodes = this.nodeCount()
  let memoryPosition = this.objectIDNames()
  let objectName = ''
  let nameLength = 0;
  // True objectIndex for nodes is objectIndex + maxSubcatchments
  objectIndex = objectIndex + maxSubcatchments
  // If the objectIndex is less than 0 or greater than the count of
  // subcatchments + the count of nodes, return undefined.
  if(objectIndex < 0 || objectIndex >= maxNodes + maxSubcatchments)
    return undefined
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
* @return {string} link's name.
*/
linkName(objectIndex:number): string | undefined{
  let maxSubcatchments = this.subcatchmentCount()
  let maxLinks = this.linkCount()
  let maxNodes = this.nodeCount()
  let memoryPosition = this.objectIDNames()
  let objectName = ''
  let nameLength = 0;
  // True objectIndex for nodes is objectIndex + maxSubcatchments + maxNodes
  objectIndex = objectIndex + maxSubcatchments + maxNodes
  // If the objectIndex is less than 0 or greater than the count of
  // subcatchments + the count of links + the count of nodes, return undefined.
  if(objectIndex < 0 || objectIndex >= maxNodes + maxSubcatchments + maxLinks)
    return undefined
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
* @return {string} pollutant's name.
*/
pollutantName(objectIndex:number): string | undefined{
  let maxSubcatchments = this.subcatchmentCount()
  let maxLinks = this.linkCount()
  let maxNodes = this.nodeCount()
  let maxPollutants = this.pollutantCount()
  let memoryPosition = this.objectIDNames()
  let objectName = ''
  let nameLength = 0;
  // True objectIndex for nodes is objectIndex + maxSubcatchments + maxNodes + maxLinks
  objectIndex = objectIndex + maxSubcatchments + maxNodes + maxLinks
  // If the objectIndex is less than 0 or greater than the count of
  // subcatchments + the count of links + the count of pollutants + the count of nodes, return undefined.
  if(objectIndex < 0 || objectIndex >= maxNodes + maxSubcatchments + maxLinks + maxPollutants)
    return undefined
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
* @return {number} the index of the pollutant concentration units.
*/
pollutantConcentrationUnits(objectIndex:number): number|undefined{
  let maxSubcatchments = this.subcatchmentCount()
  let maxLinks = this.linkCount()
  let maxNodes = this.nodeCount()
  let maxPollutants = this.pollutantCount()
  let memoryPosition = this.objectIDNames()
  let nameLength = 0;
  // Get maxNamesIndex for the pollutantConcentrationUnits maxPollutants + maxSubcatchments + maxNodes + maxLinks
  let maxNamesIndex = maxPollutants + maxSubcatchments + maxNodes + maxLinks
  // If the objectIndex is less than 0 or greater than the count of
  // subcatchments + the count of links + the count of pollutants*2 + the count of nodes, return undefined.
  if(objectIndex < 0 || objectIndex >= maxNamesIndex + maxPollutants)
    return undefined
  // Move to the end of the Object ID set (names)
  for(let i = 0; i < maxNamesIndex; i++){
    nameLength = this.readInt(memoryPosition)
    memoryPosition = memoryPosition + SwmmOut.RECORD_SIZE + nameLength
  }

  return this.readInt(memoryPosition + SwmmOut.RECORD_SIZE * objectIndex)
}

////////////////////////////////////////////////////////////////////////////////////////
// Input variables
////////////////////////////////////////////////////////////////////////////////////////

/**
* Returns the count of subcatchment descriptor variables.
* Always 1.
*
* @return {number} Integer. Count of subcatchment descriptor variables.
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
* @return {number|undefined} Integer. Type of a subcatchment descriptor variable. undefined if index is out of bounds.
*/
subcatchmentInputType(index:number): number|undefined{
  // Do not accept indices < 0 or >= MAX_SUBCATCHMENT_INPUT_VARIABLES
  if(index < 0 || index >= SwmmOut.MAX_SUBCATCHMENT_INPUT_VARIABLES)
    return undefined
  let inputIndicesStart  = this.objectProperties() + SwmmOut.RECORD_SIZE 
  let inputIndexPosition = inputIndicesStart       + SwmmOut.RECORD_SIZE * index
  return this.readInt( inputIndexPosition )
}

/**
* Returns the value of a subcatchment's area.
*
* @param {number} index The index of the subcatchment.
* @return {number|undefined} Float. Value of a subcatchment's area. undefined if index is out of bounds.
*/
subcatchmentArea(index:number): number|undefined{
  // Do not accept indices < 0 or >= subcatchmentCount()
  if(index < 0 || index >= this.subcatchmentCount())
    return undefined
  let inputIndicesStart  = this.objectProperties() + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart       + SwmmOut.RECORD_SIZE * this.subcatchmentInputCount()
  let inputIndexPosition = inputValuesStart        + SwmmOut.RECORD_SIZE * index
  return this.readFloat( inputIndexPosition )
}

/**
* Returns the memory offset of the node input variables in the SwmmOut object.
*
* @return {number} Integer. Offset location of node input variables.
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
* @return {number} Integer. Count of node descriptor variables.
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
* @return {number|undefined} Integer. Type of a node descriptor variable. undefined if index is out of bounds.
*/
nodeInputType(index:number): number|undefined{
  // Do not accept indices < 0 or >= MAX_NODE_INPUT_VARIABLES
  if(index < 0 || index >= SwmmOut.MAX_NODE_INPUT_VARIABLES)
    return undefined

  let memoryPosition = this.nodeInputOffset()
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputIndexPosition = inputIndicesStart + SwmmOut.RECORD_SIZE * index
  return this.readInt( inputIndexPosition )
}

/**
* Returns the value of a nodes's type.
*
* @param {number} index The index of the node.
* @return {number|undefined} Integer. Value of a nodes's type. undefined if index is out of bounds.
* Code:
*   0: Junction
*   1: Outfall
*   2: Storage
*   3: Divider
*/
nodeType(index:number): number|undefined{
  // Do not accept indices < 0 or >= nodeCount()
  if(index < 0 || index >= this.nodeCount())
    return undefined
  
  let memoryPosition = this.nodeInputOffset()
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart + SwmmOut.RECORD_SIZE * this.nodeInputCount()
  let inputIndexPosition = inputValuesStart  + SwmmOut.RECORD_SIZE * this.nodeInputCount() * index
  return this.readInt( inputIndexPosition )
}

/**
* Returns the value of a nodes's invert elevation.
*
* @param {number} index The index of the node.
* @return {number|undefined} Float. Value of a nodes's invert elevation. undefined if index is out of bounds.
*/
nodeInvertElevation(index:number): number|undefined{
  // Do not accept indices < 0 or >= nodeCount()
  if(index < 0 || index >= this.nodeCount())
    return undefined
  
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
* @return {number|undefined} Float. Value of a nodes's  maximum depth. undefined if index is out of bounds.
*/
nodeMaximumDepth(index:number): number|undefined{
  // Do not accept indices < 0 or >= nodeCount()
  if(index < 0 || index >= this.nodeCount())
    return undefined
  
  let memoryPosition = this.nodeInputOffset()
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart + SwmmOut.RECORD_SIZE * this.nodeInputCount()
  let inputIndexPosition = inputValuesStart  + SwmmOut.RECORD_SIZE * this.nodeInputCount() * index + SwmmOut.RECORD_SIZE * 2
  return this.readFloat( inputIndexPosition )
}

/**
* Returns the memory offset of the link input variables in the SwmmOut object.
*
* @return {number} Integer. Offset location of link input variables.
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
* @return {number} Integer. Count of link descriptor variables.
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
* @return {number|undefined} Integer. Type of a link descriptor variable. undefined if index is out of bounds.
*/
linkInputType(index:number): number|undefined{
  // Do not accept indices < 0 or >= MAX_LINK_INPUT_VARIABLES
  if(index < 0 || index >= SwmmOut.MAX_LINK_INPUT_VARIABLES)
    return undefined
  
  let memoryPosition     = this.linkInputOffset()  
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputIndexPosition = inputIndicesStart + SwmmOut.RECORD_SIZE * index
  return this.readInt( inputIndexPosition )
}

/**
* Returns the value of a link's type.
*
* @param {number} index The index of the link.
* @return {number|undefined} Integer. Value of a link's type. undefined if index is out of bounds.
* Code:
*   0: Junction
*   1: Outfall
*   2: Storage
*   3: Divider
*/
linkType(index:number): number|undefined{
  // Do not accept indices < 0 or >= linkCount()
  if(index < 0 || index >= this.linkCount())
    return undefined
  
  let memoryPosition     = this.linkInputOffset()  
  let inputIndicesStart  = memoryPosition    + SwmmOut.RECORD_SIZE 
  let inputValuesStart   = inputIndicesStart + SwmmOut.RECORD_SIZE * this.linkInputCount()
  let inputIndexPosition = inputValuesStart  + SwmmOut.RECORD_SIZE * this.linkInputCount() * index
  return this.readInt( inputIndexPosition )
}

/**
* Returns the value of a link's Upstream invert offset.
*
* @param {number} index The index of the link.
* @return {number|undefined} Integer. Value of a link's Upstream invert offset. undefined if index is out of bounds.
*/
linkUpstreamInvertOffset(index:number): number|undefined{
  // Do not accept indices < 0 or >= linkCount()
  if(index < 0 || index >= this.linkCount())
    return undefined
  
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
* @return {number|undefined} Integer. Value of a link's Downstream invert offset. undefined if index is out of bounds.
*/
linkDownstreamInvertOffset(index:number): number|undefined{
  // Do not accept indices < 0 or >= linkCount()
  if(index < 0 || index >= this.linkCount())
    return undefined
  
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
* @return {number|undefined} Integer. Value of a link's Maximum depth. undefined if index is out of bounds.
*/
linkMaximumDepth(index:number): number|undefined{
  // Do not accept indices < 0 or >= linkCount()
  if(index < 0 || index >= this.linkCount())
    return undefined
  
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
* @return {number|undefined} Integer. Value of a link's Maximum depth. undefined if index is out of bounds.
*/
linkLength(index:number): number|undefined{
  // Do not accept indices < 0 or >= linkCount()
  if(index < 0 || index >= this.linkCount())
    return undefined
  
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
* @return {number} Integer. Offset location of subcatchment output variables.
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
* @return {number} Integer. Count of subcatchment output variables.
*/
subcatchmentOutputCount(): number{
  let memoryPosition = this.outputVariablesOffset()
  return this.readInt(memoryPosition)
}

/**
* Returns the index of subcatchment output variables.
* This part of the .out file doesn't make sense.
*
* @param {number} index The index of the subcatchment output variable index.
* @return {number} Integer. Index of the subcatchment output variable index.
*/
subcatchmentOutputVariable(index:number): number|undefined{
  // Do not accept indices < 0 or >= SwmmOut.SUBCATCHMENT_OUTPUT_VARIABLE_COUNT + this.pollutantCount()
  if(index < 0 || index >= SwmmOut.SUBCATCHMENT_OUTPUT_VARIABLE_COUNT + this.pollutantCount())
    return undefined
  let memoryPosition = this.outputVariablesOffset() + SwmmOut.RECORD_SIZE
    + index * SwmmOut.RECORD_SIZE
  return this.readInt(memoryPosition)
}

/**
* Returns the count of node output variables.
* Always 6 + pollutant count.
*
* @return {number} Integer. Count of node output variables.
*/
nodeOutputCount(): number{
  let memoryPosition = this.outputVariablesOffset() + SwmmOut.RECORD_SIZE 
    + (SwmmOut.SUBCATCHMENT_OUTPUT_VARIABLE_COUNT + this.pollutantCount()) * SwmmOut.RECORD_SIZE
  return this.readInt(memoryPosition)
}

/**
* Returns the index of node output variables.
* This part of the .out file doesn't make sense.
*
* @param {number} index The index of the node output variable index.
* @return {number} Integer. Index of the node output variable index.
*/
nodeOutputVariable(index:number): number|undefined{
  // Do not accept indices < 0 or >= SwmmOut.NODE_OUTPUT_VARIABLE_COUNT + this.pollutantCount()
  if(index < 0 || index >= SwmmOut.NODE_OUTPUT_VARIABLE_COUNT + this.pollutantCount())
    return undefined
  let memoryPosition = this.outputVariablesOffset() + SwmmOut.RECORD_SIZE * 2
    + (SwmmOut.SUBCATCHMENT_OUTPUT_VARIABLE_COUNT + this.pollutantCount()) * SwmmOut.RECORD_SIZE
    + index * SwmmOut.RECORD_SIZE
  return this.readInt(memoryPosition)
}

/**
* Returns the count of link output variables.
* Always 5 + pollutant count.
*
* @return {number} Integer. Count of link output variables.
*/
linkOutputCount(): number{
  let memoryPosition = this.outputVariablesOffset() + SwmmOut.RECORD_SIZE * 2
    + (SwmmOut.SUBCATCHMENT_OUTPUT_VARIABLE_COUNT + this.pollutantCount()) * SwmmOut.RECORD_SIZE
    + (SwmmOut.NODE_OUTPUT_VARIABLE_COUNT         + this.pollutantCount()) * SwmmOut.RECORD_SIZE
  return this.readInt(memoryPosition)
}

/**
* Returns the index of link output variables.
* This part of the .out file doesn't make sense.
*
* @param {number} index The index of the link output variable index.
* @return {number} Integer. Index of the link output variable index.
*/
linkOutputVariable(index:number): number|undefined{
  // Do not accept indices < 0 or >= SwmmOut.LINK_OUTPUT_VARIABLE_COUNT + this.pollutantCount()
  if(index < 0 || index >= SwmmOut.LINK_OUTPUT_VARIABLE_COUNT + this.pollutantCount())
    return undefined
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
* @return {number} Integer. Count of system output variables.
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
* This part of the .out file doesn't make sense.
*
* @param {number} index The index of the system output variable index.
* @return {number} Integer. Index of the system output variable index.
*/
systemOutputVariable(index:number): number|undefined{
  // Do not accept indices < 0 or >= this.systemOutputCount()
  if(index < 0 || index >= this.systemOutputCount())
    return undefined
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
* Returns the start date & time of the simulation in count of days since 12/30/1899.
*
* @return {number} Float64. Start date & time.
*/
startTime_swmmFormat(): number{
  let memoryPosition = this.computedResults() - 3 * SwmmOut.RECORD_SIZE
  return this.readDouble(memoryPosition)
}

/**
* Returns the start date & time of the simulation in count of milliseconds since 12/31/1970.
*
* @return {number} Float64. Start date & time.
*/
startTime(): number{
  let swmmTime = this.startTime_swmmFormat()
  let diff = Date.UTC(0, 0, 0, 0)/(1000 * 60 * 60 * 24) - Date.UTC(1899,11,30)/(1000 * 60 * 60 * 24)
  let newTime = swmmTime - diff
  return Date.UTC(0, 0, newTime)
}

/**
* Returns the time step duration of the simulation, in seconds.
*
* @return {number} Integer. Time step duration, seconds.
*/
timeStep(): number{
  let memoryPosition = this.computedResults() - 1 * SwmmOut.RECORD_SIZE
  return this.readInt(memoryPosition)
}

/**
* Returns a Date version of a Float64 as passed from startTime()
*
* @return {Date} Date. A Javascript date object.
*/
static doubleToDate_swmmFormat(theDouble:number): Date{
  let startClock = new Date(Date.UTC(1899, 11, 30 + theDouble, 0, 0, 0))
  return startClock
}

////////////////////////////////////////////////////////////////////////////////////////
// COMPUTED RESULTS
////////////////////////////////////////////////////////////////////////////////////////

/**
* Returns the date of a given time step.
*
* @param {number} timeStep The index of the time step (1-based, also 1 time-step ahead of StartDate).
* @return {number} Float64. Date & time in count of days since 12/30/1899.
*/
dateStep_swmmFormat(timeStep): number{
  let memoryPosition = this.computedResults() + timeStep *
  return this.readDouble(memoryPosition)
}


////////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////

// returns data locations for .out parsing
/*getswmmresultoffset (iType, iIndex, vIndex, period, modelIndex ) {
  var offset1, offset2;
  offset1 = modelIndex.StartPosResult + (period-1)*modelIndex.BytesPerPeriod 
  
  if ( iType === SUBCATCH ) 
    offset2 = (iIndex*(modelIndex.SubcatchVars) + vIndex);
  else if (iType === NODE) 
    offset2 = (modelIndex.SWMM_Nsubcatch*modelIndex.SubcatchVars + iIndex*modelIndex.NodeVars + vIndex);
  else if (iType === LINK)
    offset2 = (modelIndex.SWMM_Nsubcatch*modelIndex.SubcatchVars + modelIndex.SWMM_Nnodes*modelIndex.NodeVars + iIndex*modelIndex.LinkVars + vIndex);
  else if (iType === SYS) 
      offset2 = (modelIndex.SWMM_Nsubcatch*modelIndex.SubcatchVars + modelIndex.SWMM_Nnodes*modelIndex.NodeVars + modelIndex.SWMM_Nlinks*modelIndex.LinkVars + vIndex);
  
  return offset1 + RECORDSIZE * offset2;
}*/

/**
* Reads a 32-bit signed integer from a position in SwmmOut.
*
* @param {number} offset The position of the readable integer, in number of bytes from the start of the SwmmOut object.
* @return {number} An integer read from SwmmOut.
*/
readInt(offset:number) {
  return new Int32Array(this.value.slice(offset, offset + SwmmOut.RECORD_SIZE))[0]
}

/**
* Reads a 32-bit signed float from a position in SwmmOut.
*
* @param {number} offset The position of the readable float, in number of bytes from the start of the SwmmOut object.
* @return {number} A float read from SwmmOut.
*/
readFloat(offset:number) {
  return new Float32Array(this.value.slice(offset, offset + SwmmOut.RECORD_SIZE))[0]
}

/**
* Reads a 64-bit signed float from a position in SwmmOut.
*
* @param {number} offset The position of the readable float, in number of bytes from the start of the SwmmOut object.
* @return {number} A 64-bit float (double)read from SwmmOut.
*/
readDouble(offset:number) {
  return new Float64Array(this.value.slice(offset, offset + SwmmOut.RECORD_SIZE * 2))[0]
}

/**
* Reads a string from a position in SwmmOut.
*
* @param {number} offset1 The position of the start of the readable string, in number of bytes from the start of the SwmmOut object.
* @param {number} offset2 The position of the end of the readable string, in number of bytes from the start of the SwmmOut object.
* @return {number} A string read from the SwmmOut object.
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
