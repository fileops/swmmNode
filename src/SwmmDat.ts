// SwmmDat.ts

/**
 * Interface for working with .dat gages
 * 
 * @typedef IDatGage
 * @property {string} id Name of the gage
 * @property {Array<IDatRecord>} records Array of records for the gage
 */
interface IDatGages {
  [P: string]: Array<IDatRecord>
}

/**
 * Interface for working with .dat records for a gage.
 * 
 * @typedef IDatRecord
 * @property {Date} dateTime The Unix timestamp of the date and time of rainfall
 * @property {number}  val The amount of rainfall
 */
interface IDatRecord {
  dateTime: number
  val: number
}

/**
* Class for storing and working with .dat file contents.
* This class expects a text string, which will usually be extracted
* from a .dat file, or translated from a TimeSeries object from
* a .inp file, or translated from a JSON swmm object.
*/
export class SwmmDat {
/**
 * @type {Array<string>} the header of a .dat file.
 */
header: Array<string>;

/**
 * @type {IDatGages} date as number, then val. the formatted contents of a .dat file.
 */
contents: IDatGages

/**
* Constructor for the SwmmDat class.
*/
constructor(n: string) {
  this.header = this.parseHeader(n)
  this.contents = this.createDatGageArray(n)
}
////////////////////////////////////////////////////////////////////////////////////////
// READING RECORDS
////////////////////////////////////////////////////////////////////////////////////////
/** 
 * Prepares the contents of a .dat file for processing
 * @param {string} fileContents the contents of a .dat file.
 * @returns {Array<string>} An array of non-empty lines from a .dat file
 */
prepContents(fileContents:string): Array<string>{
  let outArray: Array<string> = []
  return outArray = fileContents.split(/\r?\n/)
    .filter(v=>v.trim().length>0)
    .map(v=>v.trim())
}

/**
 * Evaluates the starting ';' comment lines into an array of strings.
 * 
 * @param {string} fileContents the contents of a .dat file.
 * @returns {Array<string>} An array of header comments in a .dat file
 */
parseHeader(fileContents:string): Array<string> {
  let headerArray: Array<string> = []
  return headerArray = this.prepContents(fileContents)
    .filter(v=>v[0]===';')
    .map(v=>v.replace(/^;+/g, ''))
}

/**
* Returns the object's header string contents.
*
* @returns {Array<string>} header string contents of a .dat or simulated .dat file.
*/
getHeader(): Array<string> {
  return this.header
}

/**
 * When a file contents string is passed to the swmmDat, it creates an 
 * IDatRecord array containing each line of data from a representative .dat file.
 * 
 * @param {string} fileContents The contents of a .dat file.
 * @returns {IDatGages} The contents of a .dat file in an array of IDatGage objects.
 */
createDatGageArray(fileContents:string): IDatGages {
  let outArray: IDatGages = {}
  let processedString: Array<string> = []
  try{
    processedString = this.prepContents(fileContents)
      .filter(v=>v[0]!==';'?v:null)

    processedString.map(v=>{
      let vals = v.split(' ')
      let id = vals[0]

      let date = Date.UTC(
        parseInt(vals[1]),     // Year
        parseInt(vals[2]) - 1, // Month - 1
        parseInt(vals[3]),     // Date
        parseInt(vals[4]),     // Hour
        parseInt(vals[5]))     // Minute
      
      let rain = parseFloat(vals[6])

      if(!Object.keys(outArray).includes(id)) outArray[id] = [];
      outArray[id].push({
        dateTime: date,
        val: rain
      })
    })
  } catch {
    throw new Error("Could not parse .dat file")
  }

  return outArray
}

/**
 * 
 * @param {Array<IDatRecord>} dataArray  An array of IDatRecords, the data for a gage in a .dat file.
 * @param {number} IEP The inter-event period, maximum time between MSV sums. A unix time in milliseconds.
 * @param {number} MSV The minimum storm volume, the minimum amount of rainfall during an IEP to classify the event as a storm.
 * @returns {Array} Returns an array of storms: { start: DateTime, end: DateTime }
 */
findStorms(dataArray: Array<IDatRecord>, IEP: number, MSV:number):Array<any> {
  let mergedStorms: any = []
  let storms = this.findSubStorms(dataArray, IEP, MSV).sort((a:any, b:any) => a.start - b.start)

  for (let i = 0; i < storms.length; i++) {
    if (i === 0 || storms[i].start - storms[i - 1].end >= IEP) {
      mergedStorms.push({
        begin: storms[i].start,
        end:   storms[i].end
      });
    } else {
      const mergedStorm = {
        begin: mergedStorms[mergedStorms.length-1].begin,
        end: storms[i].end
      };
      mergedStorms.pop()
      mergedStorms.push(mergedStorm)
    }
  }

  return mergedStorms
}

/**
 * 
 * @param {Array<IDatRecord>} dataArray  An array of IDatRecords, the data for a gage in a .dat file.
 * @param {number} IEP The inter-event period, maximum time between MSV sums. A unix time in milliseconds.
 * @param {number} MSV The minimum storm volume, the minimum amount of rainfall during an IEP to classify the event as a storm.
 * @returns {Array} Returns an array of storms: { start: DateTime, end: DateTime }
 */
findStormsPretty(dataArray: Array<IDatRecord>, IEP: number, MSV:number):Array<any> {
  let mergedStorms: any = []
  let storms = this.findSubStorms(dataArray, IEP, MSV).sort((a:any, b:any) => a.start - b.start)

  for (let i = 0; i < storms.length; i++) {
    if (i === 0 || storms[i].start - storms[i - 1].end >= IEP) {
      mergedStorms.push({
        begin: storms[i].start,
        end:   storms[i].end
      });
    } else {
      const mergedStorm = {
        begin: mergedStorms[mergedStorms.length-1].begin,
        end: storms[i].end
      };
      mergedStorms.pop()
      mergedStorms.push(mergedStorm)
    }
  }

  mergedStorms = mergedStorms.map((o:any)=>{
    return {
      begin: SwmmDat.unixTime_toDate(o.begin),
      end  : SwmmDat.unixTime_toDate(o.end)
    }
  })

  return mergedStorms
}

/**
 * 
 * @param dataArray 
 * @param IEP 
 * @param MSV 
 * @returns 
 */
findSubStorms(dataArray: Array<IDatRecord>, IEP: number, MSV:number):Array<any> {
  let outArray: any = []
  // for every entry 
  for (let i = 0; i < dataArray.length; i++){
    // if there is rainfall
    if(dataArray[i].val > 0){
      // sum all the rainfall over the following IEP periods
      let rainSum = 0
      let thisTime = new Date(dataArray[i].dateTime).getTime()
      let n = i
      for(; 
        n < dataArray.length && 
        new Date(dataArray[n].dateTime).getTime() - thisTime <= IEP; 
        n++){
          rainSum = rainSum + dataArray[n].val
      }

      // If rainSum > MSV, push the start and end into outArray
      if(rainSum > MSV){
        outArray.push({
          start: dataArray[i].dateTime, 
          end:   dataArray[n-1].dateTime
        })
      }
    }
  }

  return outArray
}

/**
* Returns a human-readable string version of an integer time step.
* Use this to make strings that can be written to EPA-SWMM files.
* 
* @param {number} timeStep An integer representing the time step of 
* the model. Does not need to be within the bounds of the model.
* @returns {string} A Javascript string object.
*/
static unixTime_toDate(unixTime:number): string{
  let clock = new Date(unixTime)

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

/**
* Returns a Dat-readable string version of an integer time step.
* Use this to make strings that can be written to Dat files.
* 
* @param {number} timeStep An integer representing the time step of 
* the model. Does not need to be within the bounds of the model.
* @returns {string} A Javascript string object.
*/
static unixTime_toDate_Dat(unixTime:number): string{
  let clock = new Date(unixTime)

  let clockStr = [
      clock.getUTCFullYear(),
      clock.getUTCDate()     .toString().padStart(2, '0'),
      (clock.getUTCMonth()+1).toString().padStart(2, '0'),

      clock.getUTCHours()    .toString().padStart(2, '0'),
      clock.getUTCMinutes()  .toString().padStart(2, '0')
    ].join(' ')
  
    return clockStr
}

/////////////////////////////////////////////////////////////////////////
// Recreating a file from data
/////////////////////////////////////////////////////////////////////////
// If a storm is detected, there should be an option to export as a .dat file

/**
 * Returns a subset of the current .dat file. This is used to create substorms
 * and substorm sets. This should not create the actual
 * .dat file, no general swmmNode object should provide it's own file support.
 * Input should describe the data that you would want to make substorms from,
 * and output should be another swmmDat object.
 * because I already have string translators, I just need separators.
 * !!!! Should this actually be a set of functions?:
 * ONE - create a swmmDat from one raingage from a swmmDat object.
 * TWO - select specific date ranges from a single-gage swmmDat object.
 * THREE - a generalizer that allows this to happen for all gages in a swmmDat object.
 * FOUR - a recompressor that puts storms back into a swmmDat object
 * FIVE - a recompressor that puts gages back into a swmmDat object.
 * @param {string} gage name of the raingage to separate from the swmmDat object.
 * @returns {swmmDat} A swmmDat object with just one raingage in it.
 */

subGage(gage:string){
  // Translate the old SwmmDat object to a string, s.
  let s:string = this.stringify()

  // Create a new SwmmDat object by passing the string s:
  let newDat = new SwmmDat(s)

  // Delete all of the contents that do not match key 'gage'
  Object.keys(this.contents).forEach((k:string)=>{
    if(k !== gage){
      delete newDat.contents[k]
    }
  })

  return newDat
}

/**
 * Translates the SwmmDat object to a string. Use this for  
 * - Copying the object
 * - Preparing to save the object to a file.
 * @returns {string} a string in the format of a raingage.dat file
 */
stringify(){
  let s:string = ''
  // Add the header by prepending each header element with ';' and appending with '\n'
  s += this.header.map((v:string)=>{
     return ';' + v
  }).join('\n') + '\n'

  // Add all of the gage records:
  // For each gage record
  Object.keys(this.contents).forEach((k:string)=>{
    (this.contents[k]).forEach((v)=>{
      s += [k, SwmmDat.unixTime_toDate_Dat(v.dateTime), v.val].join(' ') + '\n'
    })
  })

  return s
}

}