export class SwmmOut {
  value: ArrayBuffer
  // Because RECORDSIZE is not variable and may need 
  // to be requested without initializing a SwmmOut object, it is static. 
  static RECORDSIZE: number = 4

  constructor(n: ArrayBuffer) {
    this.value = n
  }

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
  * Reads a 32-bit signed integer from a position in SwmmOut.
  *
  * @param {number} offset The position of the readable integer, in number of bytes from the start of the SwmmOut object.
  * @return {number} An integer read from SwmmOut.
  */
  readInt(offset:number) {
    return new Int32Array(this.value.slice(offset, offset + SwmmOut.RECORDSIZE))[0]
  }

}
