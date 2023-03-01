// SwmmDat_Map.ts

/**
 * Interface for working with .dat gages
 * 
 * @typedef IDatGages
 * @property {IDatRecords} Map<number, number> records for the gage. key is unix timecode, value is gage value
 */
interface IDatGages {
  [id: string]: Map<number, number>
}

/**
 * Interface for working with .dat records for a gage.
 * 
 * @typedef IDatRecords
 * @property {number} [dateTime:string] The Unix timestamp of the date and time of rainfall
 */
/*interface IDatRecords {
  [key: number]: number;
}*/

/**
* Class for storing and working with .dat file contents.
* This class expects a text string, which will usually be extracted
* from a .dat file, or translated from a TimeSeries object from
* a .inp file, or translated from a JSON swmm object.
*/
export class SwmmDat_Map {
/**
 * @type {Array<string>} the header of a .dat file.
 */
header: Array<string>;

/**
 * @type {IDatGages} an object keyed with gage names, which are in turn keyed with unix timestamps, with
 * values of rainfall. the formatted contents of a .dat file.
 */
contents: IDatGages

/**
* Constructor for the SwmmDat class. Pass fileType="TS" if the .dat file is a timeSeries
*
* @param {string} n The contents of a .dat file.
* @param {string} fileType "RG" for raingage .dat file, "TS" for TimeSeries .dat file.
*/
constructor(n: string, fileType="RG") {
  this.header = this.parseHeader(n)
  this.contents = this.createDatGages(n, fileType)
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
  outArray = fileContents.split(/\r?\n/)
    .filter(v=>v.trim().length>0)
    .map(v=>v.trim())
  return outArray
}

/**
 * Evaluates the starting ';' comment lines into an array of strings.
 * 
 * @param {string} fileContents the contents of a .dat file.
 * @returns {Array<string>} An array of header comments in a .dat file
 */
parseHeader(fileContents:string): Array<string> {
  let headerArray: Array<string> = []
  headerArray = this.prepContents(fileContents)
    .filter(v=>v[0]===';')
    .map(v=>v.replace(/^;+/g, ''))
  return headerArray
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
 * @param {string} fileType Either "RG" or "TS", the format of the .dat file.
 * @returns {IDatGages} The contents of a .dat file in an object with keys of gage names,
 * which are in turn objects with keys of unix times, and values of rainfall.
 */
createDatGages(fileContents:string, fileType:string): IDatGages {
  let outArray: IDatGages = {}
  let processedString: Array<string> = []
  let id: string = ""
  let index: number = 0
  try{
    // Get all of the lines that do not start with ';'
    processedString = this.prepContents(fileContents)
      .filter(v=>v[0]!==';'?v:null)

    // Split every line on space characters, 
    processedString.map(v=>{
      let vals = v.trim().split(/\s+/)

      // If this is a TimeSeries .dat file, use TS as id and set index = 0
      if(fileType==='TS') {id ="TS"; index = 0}
      // If this is a Raingage .dat file, use the RG id and set index = 1
      else {id = vals[0]; index = 1}

      let date = Date.UTC(
        parseInt(vals[index    ]),     // Year
        parseInt(vals[index + 1]) - 1, // Month - 1
        parseInt(vals[index + 2]),     // Date
        parseInt(vals[index + 3]),     // Hour
        parseInt(vals[index + 4]))     // Minute
      
      let rain = parseFloat(vals[index + 5])

      if(!Object.keys(outArray).includes(id)) outArray[id] = new Map<number, number>();
      outArray[id].set(date, rain)
    })
  } catch {
    throw new Error("Could not parse .dat file")
  }

  return outArray
}

/**
 * 
 * @param {Max<number, number>} dataMap An instance of IDatRecords, the data for a gage in a .dat file.
 * @param {number} IEP The inter-event period, maximum time between MSV sums. A unix time in milliseconds.
 * @param {number} MSV The minimum storm volume, the minimum amount of rainfall during an IEP to classify the event as a storm.
 * @returns {Array} Returns an array of storms: { start: DateTime, end: DateTime }
 */
/*findStorms(dataMap: Map<number, number>, IEP: number, MSV:number):Array<any> {
  let mergedStorms: any = []
  let storms = SwmmDat.findSubStorms(dataMap, IEP, MSV).sort((a:any, b:any) => a.start - b.start)

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
}*/

/**
 * 
 * @param {Map<number, number>} dataMap  An instance of IDatRecords, the data for a gage in a .dat file.
 * @param {number} IEP The inter-event period, maximum time between MSV sums. A unix time in milliseconds.
 * @param {number} MSV The minimum storm volume, the minimum amount of rainfall during an IEP to classify the event as a storm.
 * @returns {Array} Returns an array of storms: { start: DateTime, end: DateTime }
 */
/*findStormsPretty(dataMap: Map<number, number>, IEP: number, MSV:number):Array<any> {
  let mergedStorms: any = []
  let storms = SwmmDat.findSubStorms(dataMap, IEP, MSV).sort((a:any, b:any) => a.start - b.start)

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
}*/

/**
 * Find the rainfall elements that classify as a storm due to having a volume that
 * meets or exceeds the MSV and has a length of IEP.
 * The results will exclude values that are exactly
 * Event Time + IEP, because Events are not considered instantaneous.
 * @param {Map<number, number>} dataMap An instance of IDatRecords, the data for a gage in a .dat file.
 * @param {number} IEP Inter-event period, minimum time between classified storms
 * @param {number} MSV Minimum storm volume, the least amount of rain that can classify a storm
 * @returns 
 */
static findSubStorms(dataMap:Map<number, number>, IEP:number, MSV:number):Array<any> {
  let outArray: any = []
  // for every entry 
  let theKeys = Array.from(dataMap.keys())
  let theLength = theKeys.length
  for (let i = 0; i < theLength; i++){
    // if there is rainfall
    let substormStart:number = theKeys[i]
    if(dataMap.get(substormStart)! > 0){
      // sum all the rainfall over the following IEP periods
      let rainSum = 0
      let thisTime = substormStart
      let n = i
      for(; 
        n < theKeys.length && 
        theKeys[n] - thisTime < IEP; 
        n++){
          rainSum = rainSum + dataMap.get(theKeys[n])!
      }

      // If rainSum > MSV, push the start and end into outArray
      if(rainSum > MSV){
        outArray.push({
          start: theKeys[i], 
          end:   theKeys[n-1],
          vol:   rainSum
        })
      }
    }
  }

  return outArray
}


////////////////////////////////////////////////////////////
// Descriptive stats
////////////////////////////////////////////////////////////

/**
 * Sum rainfall events and group by the periodType given
 * This is used to create yearly rainfall totals, monthly
 * statistics, or provide general error checking prior to 
 * utilizing swmmWasm and swmmLink for AI operations.
 * @param {IDatRecords} dataArray An instance of IDatRecords, the data for a gage in a .dat file.
 * @param {number} startTime The start time (UNIX epoch) of the records to check.
 * This can be prior to or after the events within dataArray.
 * @param {number} endTime The end time (UNIX epoch) of the records to check.
 * This can be prior to or after the events within dataArray.
 * @param {periodType} string idicator of the summation interval units. Can be 'Hour', 'Day', 'Month', 'Year' 
 * @param {periodValue} number Number of periodTypes that a summation interval will span. To get 6-hour intervals, use periodValue = 6 and periodType = 'Hour'
 * @returns {}
 */
/*static sumEvents(dataArray:IDatRecords, startTime:number, endTime:number, periodType:string, periodValue:number):Array<any>
{
  let outArray = []
  let periodFunc

  // Adjust function for periodType:
  switch(periodType){
    case('Hour'):
      periodFunc = (val:Date)=>{return new Date(val.setUTCHours(val.getUTCHours()+periodValue))}
      break;
    case('Day'):
      periodFunc = (val:Date)=>{return new Date(val.setUTCDate(val.getUTCDate()+periodValue))}
      break;
    case('Month'):
      periodFunc = (val:Date) => {
        const newDate = new Date(val)
        newDate.setUTCMonth(val.getUTCMonth() + periodValue)
        return newDate
      }
      break;
    case('Year'):
      periodFunc = (val:Date)=>{return new Date(val.setUTCFullYear(val.getUTCFullYear()+periodValue))}
      break;
    default:// default to year
      periodFunc = (val:Date)=>{return new Date(val.setUTCFullYear(val.getUTCFullYear()+periodValue))}
      break;
  }

  // Get the keys
  let theKeys = Object.keys(dataArray).map(v=>parseInt(v))
  let theLength = theKeys.length
  let pStart = startTime
  let dStart = new Date(pStart)
  let dEnd   = periodFunc(dStart)
  let pEnd   = dEnd.getTime()
  let i = 0
  // Set the start date to be after the first record, if possible
  while(pStart > theKeys[i] && pEnd > theKeys[i] && i < theLength){
    i++
  }
  // For every key
  // Error: If both startTime and endTime are in between valid keys,
  // then theKeys[i] will be greater than endTime  
  for (; i < theLength && pStart < endTime;){
    let keyTime = theKeys[i]
    let rainSum = 0
    let updated = 0;
    // If the key is not between the period start and period end
    // push a new object with no sum for the period start and period end
    // update the period start and period end
    // and check the next key
    // sum all the rainfall over the following IEP periods
    for(;pEnd < keyTime && pEnd < endTime;){
      dStart = new Date(pStart)
      dEnd   = periodFunc(dStart)
      pEnd   = dEnd.getTime()
      let valx = {
        start: pStart, 
        end:   pEnd,
        vol:   0
      }
      outArray.push(valx)
      pStart = pEnd
      dStart = new Date(pStart) 
      dEnd   = periodFunc(dStart)
      pEnd   = dEnd.getTime()
    }

    // While the key is between the start time and the end time
    for(; 
      i < theKeys.length && 
      new Date(theKeys[i]).getTime() < pEnd; 
      ){
        rainSum = rainSum + dataArray[theKeys[i].toString()]
        i++
        updated = 1
    }
    // Add the sum to the list of periods.
    if(updated){
      outArray.push({
        start: pStart, 
        end:   pEnd,
        vol:   rainSum
      })
      pStart = pEnd
      dStart = new Date(pStart)
      dEnd   = periodFunc(dStart)
      pEnd   = dEnd.getTime()
    }

    // Move index forward
    if(!updated) i++
  }

  return outArray
}*/

/**
 * Find the sum of rainfall between two points in time,
 * Inclusive of the start date and exclusive of the end date.
 * This can be used to sum yearly, monthly, daily, or 
 * storm-specific rainfall.
 * 
 * @param {IDatRecords} dataArray  An instance of IDatRecords, the data for a gage in a .dat file.
 * @param {number} startDate The start date to measure from.
 * @param {number} endDate The end date to measure to.
 * @returns {number} 
 */
/*static stormVol(dataArray:IDatRecords, startDate:number, endDate:number):number {
  // Get all of the records that occur between startDate and endDate, inclusive
  let theKeys = Object.keys(dataArray)
  let theLength = theKeys.length
  // For every key, 
  let outVol: number = 0
  for (let i = 0; i < theLength; i++){
    let key:string = theKeys[i]
    let keyNum:number = parseInt(theKeys[i])
    // check to see if the key exists between the
    // times given. 
    if(keyNum >= startDate && keyNum < endDate){
      // Sum all the rainfall in the qualifying times.
      outVol = outVol + dataArray[key]
    }
  }

  return outVol
}*/

/**
 * Find the maximum volume and start time of an n-period 
 * rainfall between two points in time, inclusive of the start date and exclusive of the end date.
 * This can be used to find the maximum 1-hr, 2-hr, 24-hr, 48-hr
 * rainfall in a storm or in a year/month. 
 * 
 * @param {IDatRecords} records  An instance of IDatRecords, the data for a gage in a .dat file.
 * @param {number} startDate The start date to measure from.
 * @param {number} endDate The end date to measure to.
 * @param {number} nPeriod number of milliseconds that define the period: 1 hour is 3600000 milliseconds.
 * @returns {{number, number, number}} Object of the format {start: number, end:number, vol: number}, start and end time of max event and volume of max event.
 */
/*static maxEvent(records:IDatRecords, startDate:number, endDate:number, nPeriod:number):{start:number, end:number, vol:number} {
  // Get a trimmed set of records
  let trimRecords = SwmmDat.trimIDatRecords(records, startDate, endDate)

  // Call findSubStorms on the trimmed records
  let events = SwmmDat.findSubStorms(trimRecords, nPeriod, 0)
  
  // Find the largest, first events.vol value and return the start, end, and vol of that object.
  const max = events.reduce((p, c)=>(p.vol >= c.vol)?p:c)

  return max
}*/

/**
 * Get a set of IDatRecords that are between two dates, inclusive of the start date and exclusive of the end date.
 * Use this function inside of maxEvent to trim down a
 * passed set of IDatRecords
 * 
 * @param {IDatRecords} records usually the full set of IDatRecords from a gage
 * @param {number} startDate start time, inclusive, in milliseconds
 * @param {number} endDate end time, exclusive, in milliseconds
 * @returns {IDatRecords} trimmed set of IDatRecords
 */
/*static trimIDatRecords(records: IDatRecords, startDate:number, endDate:number):IDatRecords{
  let newDat:IDatRecords = {}

  Object.keys(records).forEach((record:string, i:number) => {
    // If the record is inside of the given date range
    if(parseInt(record) >= startDate && parseInt(record) < endDate){
      // Add the record
      newDat[record] = records[record]
    }
  })

  return newDat
}*/

////////////////////////////////////////////////////////////
// Date/Time operations
////////////////////////////////////////////////////////////

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
* @param {number} unixTime Unix time, in milliseconds since January 1st, 1970.
* @returns {string} A Javascript string object.
*/
static unixTime_toDate_Dat(unixTime:number): string{
  let clock = new Date(unixTime)

  let clockStr = [
      clock.getUTCFullYear(),
      (clock.getUTCMonth()+1).toString().padStart(2, '0'),
      clock.getUTCDate()     .toString().padStart(2, '0'),

      clock.getUTCHours()    .toString().padStart(2, '0'),
      clock.getUTCMinutes()  .toString().padStart(2, '0')
    ].join(' ')
  
    return clockStr
}

/////////////////////////////////////////////////////////////////////////
// Trimming and combining SwmmDat objects
/////////////////////////////////////////////////////////////////////////
/**
 * Returns a copy of the current swmmDat object, but with only one gage.
 * @param {string} gage name of the raingage to separate from the swmmDat object.
 * @returns {swmmDat} A swmmDat object with just one raingage in it.
 */
/*subGage(gage:string){
  // Check if the gage is in the list. If not, return error.
  if(!Object.keys(this.contents).includes(gage)){
    throw new Error("No gage named " + gage + " in this object.")
  }
  // Translate the old SwmmDat object to a string, s.
  let s:string = this.stringify()

  // Create a new SwmmDat object by passing the string s:
  let newDat = new SwmmDat(s)

  // Delete all of the contents that do not match key 'gage'
  Object.keys(newDat.contents).forEach((k:string)=>{
    if(k !== gage){
      delete newDat.contents[k]
    }
  })

  return newDat
}*/

/**
 * Creates a new SwmmDat object by copying the calling swmmDat object and then 
 * inserts the records of the passed object (parameter) into the records
 * of a copy of the calling (this) object. If a key exists in the this object and
 * also in the passed object, both sets of records will merge. Any records in the
 * this object that have the same gage and occur at time same time
 * in the parameter object will be overwritten with the records of the 
 * parameter object.
 * 
 * @param {SwmmDat} objToInsert Object containing new or updated records and
 * gages.
 * @returns {SwmmDat} A new SwmmDat object that combines the records of objToInsert and this object.
 */
/*mergeGages(objToInsert:SwmmDat){
  // Translate the SwmmDat object to a string, s.
  let s:string = this.stringify()

  // Create a new swmmDat object by passing the string s:
  let newDat = new SwmmDat(s)

  return newDat
}*/

/**
 * Creates a copy of the current swmmDat object, trimmed down to a specific date range.
 * This is used to reduce file sizes and focus on specific storms.
 * @param {number} startTime a unix time, milliseconds since Jan 1st, 1970
 * @param {number} endTime a unix time, milliseconds since Jan 1st, 1970
 * @returns {swmmDat} a swmmDat object trimmed down to a specific date range.
 */
subRange(startTime:number, endTime:number){
  // Translate the SwmmDat object to a string, s.
  let s:string = this.stringify()

  // Create a new swmmDat object by passing the string s:
  let newDat = new SwmmDat_Map(s)

  // For every gage
  Object.keys(newDat.contents).forEach((o:string) =>{
    // For every record
    this.contents[o].forEach((v, k)=>{
      // If the record is outside of the given date range
      if(k < startTime || k > endTime){
        // delete that record.
        newDat.contents[o].delete(k)
      }
    })
  })

  return newDat
}

/**
 * Translates the SwmmDat object to a string. 
 * Use this for  
 * - Copying swmmDat objects
 * - Preparing to save the object to a file.
 * @param {string} fileType use "RG" if you wish to save all gages, use "TS" if you only 
 * want to strip all gage names. Returns error if you use "TS" with more than one gage.
 * @returns {string} a string in the format of a raingage.dat file
 */
stringify(fileType="RG"){
  // Throw errors for invalid fileTypes or TS with more than one gage:
  if(!["RG","TS"].includes(fileType))
    throw new Error("Invalid fileType: " + fileType)
  if(fileType === "TS" && Object.keys(this.contents).length > 1)
    throw new Error("TS fileType must contain only one gage.")
  let s:string = ''
  // Add the header by prepending each header element with ';' and appending with '\n'
  s += this.header.map((v:string)=>{
     return ';' + v
  }).join('\n') + '\n'

  // Add all of the gage records:
  // For each gage record
  Object.keys(this.contents).forEach((o:string)=>{
    this.contents[o].forEach((v, k)=>{
      if(fileType==="RG")
        s += [o, SwmmDat_Map.unixTime_toDate_Dat(k), v].join(' ') + '\n'
      else
        s += [SwmmDat_Map.unixTime_toDate_Dat(k), v].join(' ') + '\n'
    })
  })

  return s
}

}