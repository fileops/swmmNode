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
  ObjectIDNames(): number{
    return this.readInt(this.value.byteLength - SwmmOut.RECORDSIZE * 6)
  }
  
  /*
  r.ClosingRecords.ObjectIDNames = readInt(arrayBuffer, size-6*RECORDSIZE, RECORDSIZE)
  r.ClosingRecords.ObjectProperties = readInt(arrayBuffer, size-5*RECORDSIZE, RECORDSIZE)
  r.ClosingRecords.ComputedResults = readInt(arrayBuffer, size-4*RECORDSIZE, RECORDSIZE)
  r.ClosingRecords.ReportingPeriods = readInt(arrayBuffer, size-3*RECORDSIZE, RECORDSIZE)
  r.ClosingRecords.ErrorCode = readInt(arrayBuffer, size-2*RECORDSIZE, RECORDSIZE)
  r.ClosingRecords.IDNumber = readInt(arrayBuffer, size-RECORDSIZE, RECORDSIZE)
  r.OpeningRecords.IDNumber = readInt(arrayBuffer, 0, RECORDSIZE)
  */

  /**
  * Reads a 32-bit signed integer from a position in SwmmOut.
  *
  * @param {number} offset The position of the readable integer, in number of bytes from the start of the SwmmOut object.
  * @return {number} An integer read from SwmmOut.
  */
  readInt(offset:number) {
    return new Int32Array(this.value.slice(offset, offset + SwmmOut.RECORDSIZE))[0]
  }

}
