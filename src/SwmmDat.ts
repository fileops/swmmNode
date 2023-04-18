// SwmmDat.ts

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
 * @type {Map<string, Map<number, number>>} a Map keyed with gage names, 
 * which are in turn Maps keyed with unix timestamps, with
 * values of rainfall. the formatted contents of a .dat file.
 */
contents: Map<string, Map<number, number>>

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
 * When a file contents string is passed to the swmmDat, it creates a 
 * Map containing each line of data from a representative .dat file.
 * 
 * @param {string} fileContents The string contents of a .dat file.
 * @param {string} fileType Either "RG" or "TS", the format of the .dat file.
 * @returns {Map<string, Map<number, number>>} The contents of a .dat file in a Map with keys of gage names,
 * which are in turn Maps with keys of unix times, and values of rainfall.
 */
createDatGages(fileContents:string, fileType:string): Map<string, Map<number, number>> {
  let outMap: Map<string, Map<number, number>> = new Map<string, Map<number, number>>()
  let processedString: Array<string> = []
  let id: string = ""
  let index: number = 0
  let vals:Array<string> = []
  try{
    // Get all of the lines that do not start with ';'
    processedString = this.prepContents(fileContents)
      .filter(v=>v[0]!==';'?v:null)

    // Split every line on space characters, 
    processedString.map(v=>{
      vals = v.trim().split(/\s+/)

      // If this is a TimeSeries .dat file, use TS as id and set index = 0
      if(fileType==='TS' || vals.length === 6) {id ="TS"; index = 0}
      // If this is a Raingage .dat file, use the RG id and set index = 1
      else {id = '' + vals[0]; index = 1}

      let date = Date.UTC(
        parseInt(vals[index    ]),     // Year
        parseInt(vals[index + 1]) - 1, // Month - 1
        parseInt(vals[index + 2]),     // Date
        parseInt(vals[index + 3]),     // Hour
        parseInt(vals[index + 4]))     // Minute
      
      let rain = parseFloat(vals[index + 5])

      // Make sure we have valid data:
      if(typeof date !== 'number' || typeof rain !== 'number' || Number.isNaN(date) || Number.isNaN(rain)){
        throw new Error("Could not parse .dat file: bad number format")
      }

      // If there is no current map for this gage, create a new one.
      if(!outMap.get(id)) outMap.set(id, new Map<number, number>())
      // Set the rainfall for this date on this gage.
      outMap.get(id)?.set(date, rain)
    })
  } catch {
    throw new Error("Could not parse .dat file, line is:\n" + vals.join(' '))
  }

  // Make sure we have a valid outMap.
  if(!(outMap instanceof Map) || outMap === undefined){
    throw new Error("Could not parse .dat file: bad file mapping")
  }

  return outMap
}

/**
 * Finds storms in a set of records for a gage in a SwmmDat object.
 * Use this to get an array of start and end times for storms. Storms will be added
 * to the array if they have a minimum total rainfall as stated in MSV, and
 * seprarated by an inter-event period as stated in IEP.
 * 
 * To use:
 * 
 * 
 * @param {Max<number, number>} dataMap The data for a gage in a .dat file.
 * @param {number} IEP The inter-event period, maximum time between MSV sums. A unix time in milliseconds.
 * @param {number} MSV The minimum storm volume, the minimum amount of rainfall during an IEP to classify the event as a storm.
 * @returns {Array} Returns an array of storms: { start: DateTime, end: DateTime }
 */
static findStorms(dataMap: Map<number, number>, IEP: number, MSV:number):Array<{begin: number, end:number}> {
  let mergedStorms: any = []
  // Get all of the substorms in this gage. Remember findSubStorms is end-inclusive.
  let storms = SwmmDat.findSubStorms(dataMap, IEP, MSV)
    .sort((a:any, b:any) => a.start - b.start)

  // Get a bunch of rain event beginnings.
  for (let i = 0; i < storms.length; i++) {
    if (i === 0 || storms[i].start - storms[i - 1].end >= IEP) {
      mergedStorms.push({
        begin: storms[i].start,
        end:   storms[i].end
      });
    } else {
      // Merge close rain events.
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
 * Gets a group of storms in a human-readable format. This function should probably be
 * deprecated, but I like how simple it is to use for quick analyses.
 * 
 * How to use this: To call this function using unix timestamps, you can use the following format:
 *   SwmmDat.maxEvent(.get('127069'), (new Date(Date.UTC(1970, 10, 20, 0, 0, 0))).getTime(), (new Date(Date.UTC(1970, 10, 21, 0, 0, 0))).getTime(), 3600000*24)
 * 
 * @param {Map<number, number>} dataMap  The data for a gage in a .dat file.
 * @param {number} IEP The inter-event period, maximum time between MSV sums. A unix time in milliseconds.
 * @param {number} MSV The minimum storm volume, the minimum amount of rainfall during an IEP to classify the event as a storm.
 * @returns {Array} Returns an array of storms: { start: DateTime, end: DateTime }
 */
static findStormsPretty(dataMap: Map<number, number>, IEP: number, MSV:number):Array<{begin:number, end:number}> {
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
}

/**
 * Find the rainfall elements that classify as a storm due to having a volume that
 * meets or exceeds the MSV and has a length of IEP.
 * The results will exclude values that are exactly
 * Event Time + IEP, because Events are not considered instantaneous - BUT!!
 * the results of findSubStorms are end-inclusive, because .dat files do not have 
 * fixed time intervals and if you've picked up an event, it is likely you've already
 * hit an end-exclusive function before this. You can avoid worrying about this by
 * creating your dat file in predictably-timed intervals (i.e.: if you want 15-minute 
 * timeseries, you don't need to explicitly state every 15-minute period, but do not
 * mix times like 10:17 and 8:05. Also, be sure to call these functions based
 * upon those expected intervals.
 * @param {Map<number, number>} dataMap The data for a gage in a .dat file.
 * @param {number} IEP Inter-event period, minimum time between classified storms
 * @param {number} MSV Minimum storm volume, the least amount of rain that can classify a storm
 * @returns 
 */
static findSubStorms(dataMap:Map<number, number>, IEP:number, MSV:number):Array<{start:number, end:number, vol:number}> {
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
      let end = theKeys[i]
      for(; 
        n < theKeys.length && 
        theKeys[n] - thisTime < IEP; 
        n++){
          if(dataMap.get(theKeys[n])! > 0){
            rainSum = rainSum + dataMap.get(theKeys[n])!
            end = theKeys[n]
          }
      }

      // If rainSum > MSV, push the start and end into outArray
      if(rainSum >= MSV){
        outArray.push({
          start: theKeys[i], 
          end:   end,
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
 * @param {dataMap} dataArray The data for a gage in a .dat file.
 * @param {number} startTime The start time (UNIX epoch) of the records to check.
 * This can be prior to or after the events within dataArray.
 * @param {number} endTime The end time (UNIX epoch) of the records to check.
 * This can be prior to or after the events within dataArray.
 * @param {periodType} string idicator of the summation interval units. Can be 'Hour', 'Day', 'Month', 'Year' 
 * @param {periodValue} number Number of periodTypes that a summation interval will span. To get 6-hour intervals, use periodValue = 6 and periodType = 'Hour'
 * @returns {}
 */
static sumEvents(dataMap:Map<number, number>, startTime:number, endTime:number, periodType:string, periodValue:number):Array<any>
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
  let theKeys = Array.from(dataMap.keys())
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
        rainSum = rainSum + dataMap.get(theKeys[i])!
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
}

/**
 * Find the sum of rainfall between two points in time,
 * Inclusive of the start date and inclusive of the end date.
 * This can be used to sum storm-specific rainfall. For exclusive
 * end events, use periodVol, because storms are often identified
 * by their final rainfall event.
 * 
 * @param {Map<number, number>} dataMap  The data for a gage in a .dat file.
 * @param {number} startDate The start date to measure from.
 * @param {number} endDate The end date to measure to.
 * @returns {number} 
 */
static stormVol(dataMap:Map<number, number>, startDate:number, endDate:number):number {
  // Get all of the records that occur between startDate and endDate.
  // Because storms are often identified by their final rainfall
  // event, the end date for this function is inclusive.
  // For every entry 
  let theKeys = Array.from(dataMap.keys())
  let theLength = theKeys.length
  // For every key, 
  let outVol: number = 0
  for (let i = 0; i < theLength; i++){
    let key:number = theKeys[i]
    // check to see if the key exists between the
    // times given. 
    if(key >= startDate && key <= endDate){
      // Sum all the rainfall in the qualifying times.
      outVol = outVol + dataMap.get(key)!
    }
  }

  return outVol
}

/**
 * Find the sum of rainfall between two points in time,
 * Inclusive of the start date and exclusive of the end date.
 * This can be used to sum yearly, monthly, daily, or other rainfall.
 * For inclusive periods, use stormVol, because storms are usually denoted
 * by their final rain event.
 * 
 * @param {Map<number, number>} dataMap  The data for a gage in a .dat file.
 * @param {number} startDate The start date to measure from.
 * @param {number} endDate The end date to measure to.
 * @returns {number} 
 */
static periodVol(dataMap:Map<number, number>, startDate:number, endDate:number):number {
  // Get all of the records that occur between startDate and endDate.
  // Because storms are often identified by their final rainfall
  // event, the end date for this function is inclusive.
  // For every entry 
  let theKeys = Array.from(dataMap.keys())
  let theLength = theKeys.length
  // For every key, 
  let outVol: number = 0
  for (let i = 0; i < theLength; i++){
    let key:number = theKeys[i]
    // check to see if the key exists between the
    // times given. 
    if(key >= startDate && key < endDate){
      // Sum all the rainfall in the qualifying times.
      outVol = outVol + dataMap.get(key)!
    }
  }

  return outVol
}

/**
 * Find the maximum volume and start time, and end time of an n-period 
 * rainfall between two points in time, inclusive of the 
 * start date and inclusive of the end date, due to the fact
 * that storms are often identified by their first and last
 * recorded rainfall event. Output of this function will be inclusive of the
 * start time and exclusive of the end time, because rainfall is not instantaneous.
 * This can be used to find the maximum 1-hr, 2-hr, 24-hr, 48-hr
 * rainfall in a storm or in a year/month. 
 * 
 * Example uses: 
 * 
 * @param {Map<number, number>} records  The data for a gage in a .dat file.
 * @param {number} startDate The start date to measure from (unix timestamp, UTC time).
 * @param {number} endDate The end date to measure to (unix timestamp, UTC time).
 * @param {number} nPeriod number of milliseconds that define the period: 1 hour is 3600000 milliseconds.
 * @returns {Array<{number, number, number}>} Array of objects of the format {start: number, end:number, vol: number}, start and end time of max event and volume of max event. Unlike most rainfall data, this is inclusive 
 */
static maxEvent(records:Map<number, number>, startDate:number, endDate:number, nPeriod:number):Array<{start:number, end:number, vol:number}> {
  // Get a set of records trimmed to the startDate and endDate expanded by nPeriod.
  // If there is rainfall beyond the start or end of the storm that you wish to 
  // include, this function will look for that rainfall and attempt to 
  // include it. If you want something that will cause people to argue with your results, 
  // you can use maxEventStrict, which will only include events that occur within the
  // storm definitions (startDate and endDate). This function has its own pitfalls, and 
  // can cause people to argue with your results by, for example, creating
  // max event results that are greater than the sum volume of the storm. Either way, 
  // arguers gonna argue and this is the safest chartable as long as you demarcate your storm extents
  // and explain why a 72-hour max event on a 3-hour storm shows larger volumes than the actual storm.
  // 
  let trimRecords = SwmmDat.trimIDatRecords(records, startDate-nPeriod, endDate+nPeriod)

  // Call findSubStorms on the trimmed records. Remember findSubStorms is end-inclusive.
  let events = SwmmDat.findSubStorms(trimRecords, nPeriod, 0)
  
  // If there are any events, find the maximums
  if(events.length > 0){
    // Find the largest events.vol value.
    const maxEvent = events.reduce((p, c)=>(p.vol >= c.vol)?p:c)
  
    // Get all of the events that share that same events.vol value as maxEvent.
    events = events.filter(a => a.vol == maxEvent.vol)
      // Update maxEvents.end to be maxEvents.start + nPeriod:
      .map(a => {return {start:a.start, end: a.start + nPeriod, vol: a.vol}});
  }

  return events
}

/**
 * Find the maximum volume and start time, and end time of an n-period 
 * rainfall between two points in time, inclusive of the 
 * start date and inclusive of the end date, due to the fact
 * that storms are often identified by their first and last
 * recorded rainfall event. Output of this function will be inclusive of the
 * start time and exclusive of the end time, because rainfall is not instantaneous.
 * This can be used to find the maximum 1-hr, 2-hr, 24-hr, 48-hr
 * rainfall in a storm or in a year/month. The results of this function
 * can be confusing when charted, as most people will see rainfall within
 * the bounds of the results of this function that will not be included in
 * the sum. 
 * For cases when detailing results to people that cannot make this
 * distinction, use maxEvent and NOT maxEventStrict.
 * 
 * @param {Map<number, number>} records  The data for a gage in a .dat file.
 * @param {number} startDate The start date to measure from (unix timestamp, UTC time).
 * @param {number} endDate The end date to measure to (unix timestamp, UTC time).
 * @param {number} nPeriod number of milliseconds that define the period: 1 hour is 3600000 milliseconds.
 * @returns {{number, number, number}} Object of the format {start: number, end:number, vol: number}, start and end time of max event and volume of max event. Unlike most rainfall data, this is inclusive 
 */
static maxEventStrict(records:Map<number, number>, startDate:number, endDate:number, nPeriod:number):Array<{start:number, end:number, vol:number}> {
  // Get a set of records trimmed to the start and end date of the storm.
  let trimRecords = SwmmDat.trimIDatRecords(records, startDate, endDate)

  // Call findSubStorms on the trimmed records. Remember findSubStorms is end-inclusive.
  let events = SwmmDat.findSubStorms(trimRecords, nPeriod, 0)
  
  // If there are any events, find the maximums
  if(events.length > 0){
    // Find the largest events.vol value.
    const maxEvent = events.reduce((p, c)=>(p.vol >= c.vol)?p:c)
  
    // Get all of the events that share that same events.vol value as maxEvent.
    events = events.filter(a => a.vol == maxEvent.vol)
      // Update maxEvents.end to be maxEvents.start + nPeriod:
      .map(a => {return {start:a.start, end: a.start + nPeriod, vol: a.vol}});
  }

  return events
}

/**
 * Get a Map of rainfall events keyed by dates, trimmed to the value
 * between two dates, inclusive of the start date and exclusive of the end date.
 * Use this function inside of maxEvent to trim down a
 * passed set of Map<number, number> records.
 * 
 * @param {Map<number, number>} records usually the full Map of unix time keyed rainfall from a gage
 * @param {number} startDate start time, inclusive, in milliseconds
 * @param {number} endDate end time, exclusive, in milliseconds
 * @returns {Map<number, number>} trimmed set of unix time keyed rainfall
 */
static trimIDatRecords(records: Map<number, number>, startDate:number, endDate:number):Map<number, number>{
  let newDat:Map<number, number> = new Map()

  records.forEach((v:number, k:number) => {
    // If the record is inside of the given date range
    if(k >= startDate && k < endDate){
      // Add the record
      newDat.set(k, v)
    }
  })

  return newDat
}

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
subGage(gage:string){
  // Check if the gage is in the list. If not, return error.
  if(!this.contents.get(gage)){
    throw new Error("No gage named " + gage + " in this object.")
  }
  // Translate the old SwmmDat object to a string, s.
  let s:string = this.stringify()

  // Create a new SwmmDat object by passing the string s:
  let newDat = new SwmmDat(s)

  // Delete all of the contents that do not match key 'gage'
  newDat.contents.forEach((v:Map<number, number>, k:string)=>{
    if(k !== gage){
      newDat.contents.delete(k)
    }
  })

  return newDat
}

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
 * Creates a copy of the current swmmDat object, trimmed down to a specific date range inclusive of start AND end times.
 * This is used to reduce file sizes and focus on specific storms.
 * @param {number} startTime a unix time, milliseconds since Jan 1st, 1970
 * @param {number} endTime a unix time, milliseconds since Jan 1st, 1970
 * @returns {swmmDat} a swmmDat object trimmed down to a specific date range.
 */
subRange(startTime:number, endTime:number){
  // Translate the SwmmDat object to a string, s.
  let s:string = this.stringify()

  // Create a new swmmDat object by passing the string s:
  let newDat = new SwmmDat(s)

  // For every gage
  newDat.contents.forEach((vv:Map<number, number>, kk:string) =>{
    // For every record
    this.contents.get(kk)!.forEach((v, k)=>{
      // If the record is outside of the given date range
      if(k < startTime || k > endTime){
        // delete that record.
        newDat.contents.get(kk)!.delete(k)
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
  if(fileType === "TS" && Array.from(this.contents).length > 1)
    throw new Error("TS fileType must contain only one gage.")
  let s:string = ''
  // Add the header by prepending each header element with ';' and appending with '\n'
  s += this.header.map((v:string)=>{
     return ';' + v
  }).join('\n') + '\n'

  // Add all of the gage records:
  // For each gage record
  this.contents.forEach((vv:Map<number,number>, kk:string)=>{
    this.contents.get(kk)!.forEach((v, k)=>{
      if(fileType==="RG")
        s += [kk, SwmmDat.unixTime_toDate_Dat(k), v].join(' ') + '\n'
      else
        s += [SwmmDat.unixTime_toDate_Dat(k), v].join(' ') + '\n'
    })
  })

  return s
}

}