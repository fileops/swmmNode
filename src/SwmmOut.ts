export class SwmmOut {
  value: ArrayBuffer
  RECORDSIZE: number

  constructor(n: ArrayBuffer) {
    this.value = n
    this.RECORDSIZE = 4
  }

  val(): ArrayBuffer {
    return this.value
  }

  version(): number{
    return this.readInt(this.RECORDSIZE)
  }

  magic1(): number{
    return this.readInt(0)
  }

  /**
  * Returns x raised to the n-th power.
  *
  * @param {number} x The number to raise.
  * @param {number} n The power, must be a natural number.
  * @return {number} x raised to the n-th power.
  */
  flowUnitCode(): number{
    return this.readInt(this.RECORDSIZE * 2)
  }

  // When reading an integer value from a binary file.
  readInt(offset:number) {
    return new Int32Array(this.value.slice(offset, offset + this.RECORDSIZE))[0]
  }
/*
  toString(): string {
    return this.val().toString()
  }

  static addAll(numArr: Array<Num>): Num {
    return new Num(numArr.map((n) => n.val()).reduce((a, b) => a + b, 0))
  }*/
}
