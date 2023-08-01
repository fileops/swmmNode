export class SwmmModel {
  model: any

  constructor(model:any) {
    this.model = model;
  }

  oneDimensionalTables = ['SUBCATCHMENTS', 'JUNCTIONS', 'RAINGAGES', '']
  /**
   * Get the value of a property of a one-dimensional table object.
   * @param tableName A swmm model one-dimensional table name, e.g.: SUBCATCHMENTS, JUNCTIONS, etc.
   * @param keyName The name of the key within the table. Generally referred to as the object name.
   * @param valName The name of the property of the object.
   * @returns 
   */
  get_table_val(tableName: string, keyName: string, valName:string) {
    const key = this.model[tableName]?.[keyName]
    const val = key?.[valName]
    
    if (val !== undefined) {
      return val
    } else {
      throw new Error(`Unable to retrieve ${valName} from table '${tableName}' for key '${keyName}'.`);
    }
  }

  set_table_val(setModel: Function, tableName: string, keyName: string, valName: string, updateVal: string) {
  setModel((prev:any) => ({...prev,
    [tableName]: {
      ...prev?.[tableName],
      [keyName]: {
        ...prev?.[tableName]?.[keyName],
        [valName]: updateVal
      }
    }}))
}

}