/**
* Class for storing .out file contents.
* This class can also be used to create simluated .out file contents.
*/
export class SwmmOut {
value: ArrayBuffer
// Because RECORDSIZE is not variable and may need 
// to be requested without initializing a SwmmOut object, it is static. 
static RECORDSIZE: number = 4

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
  return this.readInt(SwmmOut.RECORDSIZE)
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
  return this.readInt(SwmmOut.RECORDSIZE * 2)
}

/**
* Returns the count of subcatchments.
*
* @return {number} Integer. Count of subcatchments.
*/
subcatchmentCount(): number{
  return this.readInt(SwmmOut.RECORDSIZE * 3)
}

/**
* Returns the count of nodes.
*
* @return {number} Integer. Count of nodes.
*/
nodeCount(): number{
  return this.readInt(SwmmOut.RECORDSIZE * 4)
}

/**
* Returns the count of links.
*
* @return {number} Integer. Count of links.
*/
linkCount(): number{
  return this.readInt(SwmmOut.RECORDSIZE * 5)
}

/**
* Returns the count of pollutants.
*
* @return {number} Integer. Count of pollutants.
*/
pollutantCount(): number{
  return this.readInt(SwmmOut.RECORDSIZE * 6)
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
  return this.readInt(this.value.byteLength - SwmmOut.RECORDSIZE * 6)
}

/**
* Returns the memory position of the Object properties, 
* relative to the start of the SwmmOut object.
*
* @return {number} Integer. byte position of Object properties.
*/
objectProperties(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORDSIZE * 5)
}

/**
* Returns the memory position of the computed results, 
* relative to the start of the SwmmOut object.
*
* @return {number} Integer. byte position of computed results.
*/
computedResults(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORDSIZE * 4)
}
  
/**
* Returns the count of reporting periods.
*
* @return {number} Integer. Count of reporting periods.
*/
reportingPeriods(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORDSIZE * 3)
}
  
/**
* Returns the error code.
*
* @return {number} Integer. Error code of the SwmmOut object.
*/
errorCode(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORDSIZE * 2)
}
    
/**
* Returns the object's second magic number, 
* should be equal to the object's first magic number (magic1).
*
* @return {number} Integer. Object's second magic number.
*/
magic2(): number{
  return this.readInt(this.value.byteLength - SwmmOut.RECORDSIZE * 1)
}

////////////////////////////////////////////////////////////////////////////////////////
// Object IDs (names)
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
    memoryPosition = memoryPosition + SwmmOut.RECORDSIZE
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
    memoryPosition = memoryPosition + SwmmOut.RECORDSIZE
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
    memoryPosition = memoryPosition + SwmmOut.RECORDSIZE
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
    memoryPosition = memoryPosition + SwmmOut.RECORDSIZE
    if(i == objectIndex){
      objectName = this.intArrayToString(memoryPosition, memoryPosition+nameLength)
    }
    memoryPosition = memoryPosition + nameLength
  }

  return objectName
}

////////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////

/**
* Reads a 32-bit signed integer from a position in SwmmOut.
*
* @param {number} offset The position of the readable integer, in number of bytes from the start of the SwmmOut object.
* @return {number} An integer read from SwmmOut.
*/
readInt(offset:number) {
  return new Int32Array(this.value.slice(offset, offset + SwmmOut.RECORDSIZE))[0]
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
