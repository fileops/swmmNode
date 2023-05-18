// @ts-nocheck
// SwmmConvert.ts

/**
* Class for translating .inp files between .txt and JSON format.
* See SwmmInp for methods related to working with .inp files in JSON format.
* This class will also be used for BSON translations, soon...
* This class is intended to provide purely static functions. See SwmmInp for 
* JSON formatted inp object storage and operations.
*/
export class SwmmConvert {
  /**
  * Constructor for the SwmmConvert class.
  */
  constructor() {
  }
  
  /**
   * Parses the text .inp file text into a JSON object.
   * 
   * @param text text contents of a .inp file.
   * @returns JSON formatted verion of .inp file.
   */
  static parseInput(text) {
    var regex = {
      section: /^\s*\[\s*([^\]]*)\s*\].*$/,
      section_title: /^\s*;\[\s*([^\]]*)\s*\].*$/,
      value: /\s*([^\s]+)([^;]*).*$/,
      description: /^\s*;.*$/,
      comment: /^\s*;;.*$/
    },

    parser = {
      // TITLE Title/Notes needs to consume all of the lines until the next section.
      TITLE: function(model, section, line) {
        // Add the current line to the TITLE object.
        model[section] = (model[section]?model[section]+'\n':'') + line
      },

      //==
      // Planar Coordinate System data for transforming to lat/lon values
      PCS: function(model, section, m) {
        // If there is an array, and it has contents,
        if (m && m.length){
          model[section][m[0]] = {
            proj: m[1], 
            zone: m[2],
            datum: m[3],
            units: m[4],
            defs: m[5]
          }
        }
      },

      //==
      // Transform data for adjusting swmm visual objects to world map
      TRANSFORM: function(model, section, m) {
        // If there is an array, and it has contents,
        if (m && m.length){
          model[section][m[0]] = {
            x: parseFloat(m[1]), 
            y: parseFloat(m[2]), 
            size: parseFloat(m[3]), 
            rotation: parseFloat(m[4])
          }
        }
      },

      OPTIONS: function(model, section, m) {
        // If there is an array, and it has contents,
        if (m && m.length)
          // Create a new subsection in OPTIONS and give it those contents.
          model[section][m[0]] = m[1]
      },

      //==
      RAINGAGES: function(model, section, m) {
        // If the array m is 6 elements, use a timeseries format.
        if (m && (m.length == 6 || m.length == 5)){
          model[section][m[0]] = {
            Format: m[1], 
            Interval: m[2], 
            SCF: m[3], 
            Source: m[4], 
            SeriesName: m[5]?m[5]:'',
            Description: curDesc
          }
        }
        // If the array m is 8 elements, use a file format.
        if (m && m.length == 8){
          model[section][m[0]] = {
            Format: m[1], 
            Interval: m[2], 
            SCF: m[3], 
            Source: m[4], 
            Fname: m[5], 
            Station: m[6],
            Units: m[7],
            Description: curDesc
          }
        }
      },

      //==
      /* TEMPERATURE is an object, not an array. */
      /* Each key of TEMPERATURE is an individual object/array. */
      TEMPERATURE: function(model, section, m) {
        // If there is an array, and it has contents,
        if(!model.TEMPERATURE){model.TEMPERATURE = {}}
        if (m && m.length){
          switch(m[0]){
            case 'TIMESERIES':
              model.TEMPERATURE.TIMESERIES = m[1].trim()
              break
            case 'FILE':
              model.TEMPERATURE.FILE = {}
              model.TEMPERATURE.FILE.Fname = m[1].trim()
              if(m[2]) model.TEMPERATURE.FILE.Start = m[2].trim()
              else model.TEMPERATURE.FILE.Start = null
              break
            case 'WINDSPEED':
              switch(m[1].trim()){
                case 'MONTHLY':
                  // Read in 12 numbers
                  model.TEMPERATURE.WINDSPEED = {Type: 'MONTHLY', AWS: []}
                  for(let i = 0; i < 12; i++){
                    model.TEMPERATURE.WINDSPEED.AWS[i] = parseFloat(m[i+2])
                  }
                  break;
                case 'FILE':
                  // Actual file name is in model.TEMPERATURE.File
                  model.TEMPERATURE.WINDSPEED = {Type: 'FILE'}
                  break;
              }
            case 'SNOWMELT':
              model.TEMPERATURE.SNOWMELT = {};
              model.TEMPERATURE.SNOWMELT.DivideTemp     = parseFloat(m[1])
              model.TEMPERATURE.SNOWMELT.ATIWeight      = parseFloat(m[2])
              model.TEMPERATURE.SNOWMELT.NegMeltRatio   = parseFloat(m[3])
              model.TEMPERATURE.SNOWMELT.MSLElev        = parseFloat(m[4])
              model.TEMPERATURE.SNOWMELT.DegLatitude    = parseFloat(m[5])
              model.TEMPERATURE.SNOWMELT.LongCorrection = parseFloat(m[6])
              break;
            case 'ADC':
              if(!model.TEMPERATURE.ADC) model.TEMPERATURE.ADC = {}
              switch(m[1].trim()){
                case 'IMPERVIOUS':
                  model.TEMPERATURE.ADC.IMPERVIOUS = []
                  for(let i = 0; i < 10; i++){
                    model.TEMPERATURE.ADC.IMPERVIOUS[i] = parseFloat(m[i+2])
                  }
                  break;
                case 'PERVIOUS':
                  model.TEMPERATURE.ADC.PERVIOUS = []
                  for(let i = 0; i < 10; i++){
                    model.TEMPERATURE.ADC.PERVIOUS[i] = parseFloat(m[i+2])
                  }
                  break;
              }
            }
        }
      },

      //==
      ADJUSTMENTS: function(model, section, m) {
        if (m && m.length){
          // Read in 12 numbers
          model.ADJUSTMENTS[m[0]] = []
          for (let i = 0; i < 12; i++){
            model.ADJUSTMENTS[m[0]][i] = parseFloat(m[i+1])
          }
        }
      },

      //==
      EVAPORATION: function(model, section, m) {
        if (m && m.length){
          switch(m[0]){
            case 'CONSTANT':
              model.EVAPORATION.CONSTANT = parseFloat(m[1]);
              break;
            case 'MONTHLY':
              // Read in 12 numbers
              model.EVAPORATION.MONTHLY = [];
              for(let i = 0; i < 12; i++){
                model.EVAPORATION.MONTHLY[i] = parseFloat(m[i+1]);
              }
              break;
            case 'TIMESERIES':
              model.EVAPORATION.TimeSeries = m[1].trim();
              break;
            case 'TEMPERATURE':
              model.EVAPORATION.Temperature = m[1].trim();
              break;
            case 'FILE':
              model.EVAPORATION.FILE = [];
              for(let i = 0; i < 12; i++){
                model.EVAPORATION.FILE[i] = parseFloat(m[i+1]);
              }
              break;
            case 'RECOVERY':
              model.EVAPORATION.Recovery = m[1].trim();
              break;
            case 'DRY_ONLY':
              model.EVAPORATION.DRY_ONLY = m[1].trim();
              break;
          }
        }
      },

      //==
      SUBCATCHMENTS: function(model, section,  array) {
        // If there is an array, and it has contents,
        if (array && array.length){
          model[section][array[0]] = {
            RainGage: array[1], 
            Outlet: array[2], 
            Area: parseFloat(array[3]), 
            PctImperv: parseFloat(array[4]),
            Width: parseFloat(array[5]), 
            PctSlope: parseFloat(array[6]), 
            CurbLen: parseFloat(array[7]), 
            SnowPack: array[8]?array[8]:'', 
            Description: curDesc
          }
        }
      },

      //==
      SUBAREAS: function(model, section, array) {
        // If there is an array, and it has contents,
        if (array && array.length){
          model[section][array[0]] = {
            NImperv: parseFloat(array[1]), 
            NPerv: parseFloat(array[2]), 
            SImperv: parseFloat(array[3]), 
            SPerv: parseFloat(array[4]), 
            PctZero: parseFloat(array[5]), 
            RouteTo: array[6].trim(), 
            PctRouted: array.length === 8 ? array[7].trim() : null
          }
        }
      },

      //==
      INFILTRATION: function(model, section, m) {
        let returnObj = {}
        m.forEach((el, i) => {
          if (i > 0 && !isNaN(parseFloat(m[i]))){
            returnObj['Param'+i] = m[i]
          } else if (i > 0) {
            returnObj.InfilMethod = m[i]
          }
        })
        if(!returnObj.InfilMethod){
          returnObj.InfilMethod = model.OPTIONS.INFILTRATION
        }
        model[section][m[0]] = returnObj
      },

      //==
      AQUIFERS: function(model, section, array) {
        // If there is an array, and it has contents,
        if (array && array.length){
          model[section][array[0]] = {
            Por: parseFloat(array[1]), 
            WP: parseFloat(array[2]), 
            FC: parseFloat(array[3]), 
            Ks: parseFloat(array[4]), 
            Kslp: parseFloat(array[5]), 
            Tslp: parseFloat(array[6]), 
            ETu: parseFloat(array[7]), 
            ETs: parseFloat(array[8]), 
            Seep: parseFloat(array[9]), 
            Ebot: parseFloat(array[10]), 
            Egw: parseFloat(array[11]), 
            Umc: parseFloat(array[12]), 
            Epat: array.length === 14 ? array[13].trim() : null
          }
        }
      },

      //==
      GROUNDWATER: function(model, section, array) {
        // If there is an array, and it has contents,
        if (array && array.length){
          model[section][array[0]] = {
            Aquifer: array[1].trim(),
            Node: array[2].trim(),
            Esurf: parseFloat(array[3]),
            A1: parseFloat(array[4]),
            B1: parseFloat(array[5]),
            A2: parseFloat(array[6]),
            B2: parseFloat(array[7]),
            A3: parseFloat(array[8]),
            Dsw: parseFloat(array[9]),
            // There is some special parsing used here. keep it a string.
            Egwt: array.length === 11 ? array[10].trim() : '',
            Ebot: array.length === 12 ? parseFloat(array[11]) : null,
            Egw: array.length === 13 ? parseFloat(array[12]) : null,
            Umc: array.length === 14 ? parseFloat(array[13]) : null
          }
        }
      },

      //==
      GWF: function(model, section, m) {
        if (m && m.length && m.length > 2) {
          if(m[1] == 'LATERAL'){
            model[section][m[0]] = {...model[section][m[0]],
              LATERAL: m.slice(2).join(' ')
            }
          }
          else if(m[1] == 'DEEP'){
            model[section][m[0]] = {...model[section][m[0]],
              DEEP: m.slice(2).join(' ')
            }
          }
        }
      },

      //==
      SNOWPACKS: function(model, section, m) {
        if (m && m.length && m.length > 2) {
          // Check if the object exists, if not, create one
          if(!model[section][m[0]]) model[section][m[0]] = {}
          if(m[1] == 'PLOWABLE'){
            model[section][m[0]].PLOWABLE = {
              Cmin: parseFloat(m[2]),
              Cmax: parseFloat(m[3]),
              Tbase: parseFloat(m[4]),
              FWF: parseFloat(m[5]),
              SD0: parseFloat(m[6]),
              FW0: parseFloat(m[7]),
              SNN0: parseFloat(m[8])
            }
          }
          else if(m[1] == 'IMPERVIOUS'){
            model[section][m[0]].IMPERVIOUS = {
              Cmin: parseFloat(m[2]),
              Cmax: parseFloat(m[3]),
              Tbase: parseFloat(m[4]),
              FWF: parseFloat(m[5]),
              SD0: parseFloat(m[6]),
              FW0: parseFloat(m[7]),
              SD100: parseFloat(m[8])
            }
          }
          else if(m[1] == 'PERVIOUS'){
            model[section][m[0]].PERVIOUS = {
              Cmin: parseFloat(m[2]),
              Cmax: parseFloat(m[3]),
              Tbase: parseFloat(m[4]),
              FWF: parseFloat(m[5]),
              SD0: parseFloat(m[6]),
              FW0: parseFloat(m[7]),
              SD100: parseFloat(m[8])
            }
          }
          else if(m[1] == 'REMOVAL'){
            model[section][m[0]].REMOVAL = {
              Dplow: parseFloat(m[2]),
              Fout: parseFloat(m[3]),
              Fimp: parseFloat(m[4]),
              Fperv: parseFloat(m[5]),
              Fimelt: parseFloat(m[6]),
              Fsub: m[7]?parseFloat(m[7]):null,
              Scatch: m[8]?m[8]:null
            }
          }
        }
      },

      //==
      JUNCTIONS: function(model, section, m) {
        if (m && m.length > 1)
          model[section][m[0]] = {
            Invert: parseFloat(m[1]), 
            Dmax: parseFloat(m[2]?m[2]:'0'), 
            Dinit: parseFloat(m[3]?m[3]:'0'), 
            Dsurch: parseFloat(m[4]?m[4]:'0'), 
            Aponded: parseFloat(m[5]?m[5]:'0'), 
            Description: curDesc
          }
      },

      //==
      OUTFALLS: function(model, section, m) {
        if (m && m.length){
          var type = m[2]
          if(type == 'FREE' || type == 'NORMAL'){
            model[section][m[0]] = {
              Invert: parseFloat(m[1]), 
              Type: m[2].trim(), 
              Gated: m[3]?m[3]:'NO', 
              RouteTo: m[4]?m[4]:''
            };
          }
          if(type == 'FIXED'){
            model[section][m[0]] = {
              Invert: parseFloat(m[1]), 
              Type: m[2].trim(), 
              StageData: parseFloat(m[3]),
              Gated: m[4]?m[4]:'NO', 
              RouteTo: m[5]?m[5]:''
            };
          }
          if(type == 'TIDAL'){
            model[section][m[0]] = {
              Invert: parseFloat(m[1]), 
              Type: m[2].trim(), 
              Tcurve: m[3].trim(),
              Gated: m[4]?m[4]:'NO', 
              RouteTo: m[5]?m[5]:''
            };
          }
          if(type == 'TIMESERIES'){
            model[section][m[0]] = {
              Invert: parseFloat(m[1]), 
              Type: m[2].trim(), 
              Tseries: m[3].trim(),
              Gated: m[4]?m[4]:'NO', 
              RouteTo: m[5]?m[5]:''
            };
          }
        }
      },

      //==
      STORAGE: function(model, section, m) {
        if (m && m.length){
          if (m[4].trim() === 'TABULAR'){
            model[section][m[0]] = {
              Invert: parseFloat(m[1]),
              Dmax: parseFloat(m[2]), 
              Dinit: parseFloat(m[3]), 
              Curve: m[4].trim(),
              P1: 0,  
              P2: 0,  
              P3: 0,  
              CurveName: m[5].trim(),
              Dsurch: m[6]?parseFloat(m[6]):0, 
              Fevap: m[7]?parseFloat(m[7]):0, 
              Psi: m[8]?m[8]:'', 
              Ksat: m[9]?m[9]:'', 
              IMD: m[10]?m[10]: '',
              Description: curDesc}
          }
          else {//(m[4].trim() === 'FUNCTIONAL'){ + PYRAMIDAL, PARABOLIC, CONICAL, CYLINDRICAL (Cylindrical uses '0' only for P3)
            model[section][m[0]] = {
              Invert: parseFloat(m[1]),
              Dmax: parseFloat(m[2]), 
              Dinit: parseFloat(m[3]), 
              Curve: m[4].trim(), 
              P1: parseFloat(m[5]),  
              P2: parseFloat(m[6]),    
              P3: parseFloat(m[7]),    
              CurveName: '',
              Dsurch: m[8]?parseFloat(m[8]):0,
              Fevap:  m[9]?parseFloat(m[9]):0,  
              Psi: m[10]?m[10]:'', 
              Ksat: m[11]?m[11]:'', 
              IMD: m[12]?m[12]:'', 
              Description: curDesc}
          } 
        }
      },

      //==
      DIVIDERS: function(model, section, m) {
        if (m && m.length){
          if(m[3].trim() === 'WEIR'){
            model[section][m[0]] = {
              Invert: parseFloat(m[1]), 
              DivLink: m[2].trim(),     
              Type: m[3].trim(),        
              Qmin: parseFloat(m[4]),   
              Ht: parseFloat(m[5]),     
              Cd: parseFloat(m[6]),     
              Dmax: m[7]?parseFloat(m[7]):0, 
              Dinit: m[8]?parseFloat(m[8]):0,   
              Dsurch: m[9]?parseFloat(m[9]):0, 
              Aponded: m[10]?parseFloat(m[10]):0,
              Description: curDesc}
          } else if (m[3].trim() === 'CUTOFF'){
            model[section][m[0]] = {
              Invert: parseFloat(m[1]), 
              DivLink: m[2].trim(),  
              Type: m[3].trim(),     
              Qmax: parseFloat(m[4]),
              Dmax: m[5]?parseFloat(m[5]):0, 
              Dinit: m[6]?parseFloat(m[6]):0,   
              Dsurch: m[7]?parseFloat(m[7]):0, 
              Aponded: m[8]?parseFloat(m[8]):0, 
              Description: curDesc}
          } else if (m[3].trim() === 'TABULAR'){
            model[section][m[0]] = {
              Invert: parseFloat(m[1]), 
              DivLink: m[2].trim(),   
              Type: m[3].trim(),      
              Dcurve: m[4].trim(),    
              Dmax: m[5]?parseFloat(m[5]):0,
              Dinit: m[6]?parseFloat(m[6]):0,  
              Dsurch: m[7]?parseFloat(m[7]):0, 
              Aponded: m[8]?parseFloat(m[8]):0,
              Description: curDesc}
          } else if (m[3].trim() === 'OVERFLOW'){
            model[section][m[0]] = {
              Invert: parseFloat(m[1]), 
              DivLink: m[2].trim(),   
              Type: m[3].trim(),      
              Dmax: m[4]?parseFloat(m[4]):0, 
              Dinit: m[5]?parseFloat(m[5]):0,  
              Dsurch: m[6]?parseFloat(m[6]):0, 
              Aponded: m[7]?parseFloat(m[7]):0,
              Description: curDesc}
          }
        }
      },

      //==
      CONDUITS: function(model, section, array) {
        // If there is an array, and it has contents,
        if (array && array.length){
          model[section][array[0]] = {
            Node1: array[1], 
            Node2: array[2], 
            Length: parseFloat(array[3]),   
            Roughness: parseFloat(array[4]),
            InOffset: array[5], 
            OutOffset: array[6], 
            InitFlow: array[7]?array[7]:'0', 
            MaxFlow: array[8]?array[8]:'', 
            Description: curDesc
          }

          // Default losses values
          model['LOSSES'][array[0]] = {
            Kin: 0, 
            Kout: 0, 
            Kavg: 0, 
            Flap: 'NO', 
            Seepage: 0
          }
        }
      },

      //==
      PUMPS: function(model, section, m) {
        if (m && m.length)
          model[section][m[0]] = {
            Node1: m[1], 
            Node2: m[2], 
            Pcurve: m[3], 
            Status: m[4]?m[4]:'ON',
            Startup: m[5]?parseFloat(m[5]):0, 
            Shutoff: m[6]?parseFloat(m[6]):0, 
            Description: curDesc
        }
      },

      //==
      ORIFICES: function(model, section, m) {
        if (m && m.length)
          model[section][m[0]] = {
            Node1: m[1], 
            Node2: m[2], 
            Type: m[3].trim(), 
            Offset: m[4], 
            Cd: parseFloat(m[5]), 
            Gated: m[6]?m[6].trim():'NO',
            Orate: m[7]?parseFloat(m[7]):0,
            Description: curDesc
        }
      },

      //==
      WEIRS: function(model, section, m) {
        if (m && m.length)
          model[section][m[0]] = {
            Node1: m[1], 
            Node2: m[2], 
            Type: m[3].trim(), 
            CrestHt: m[4], 
            Cd: parseFloat(m[5]), 
            Gated: m[6]?m[6].trim():'NO',
            EC: m[7]?parseFloat(m[7]):0,
            Cd2: m[8]?parseFloat(m[8]):m[5],
            Surcharge: m[9]?m[9]:'YES',
            Width: m[10]?m[10]:'',
            Surface: m[11]?m[11]:'',
            Wcurve: m[12]?m[12]:'',
            Description: curDesc
        }
      },

      //==
      OUTLETS: function(model, section, m) {
        if (m && m.length){
          if(m[4].trim() === 'TABULAR/HEAD' || 
            m[4].trim() === 'TABULAR/DEPTH'){
            model[section][m[0]] = {
              Node1: m[1], 
              Node2: m[2], 
              Offset: m[3], 
              Type: m[4].trim(),
              Qcurve: m[5].trim(),
              Gated: m[6]?m[6]:'NO',
              Description: curDesc
            }
          } else {
            model[section][m[0]] = {
              Node1: m[1], 
              Node2: m[2], 
              Offset: m[3], 
              Type: m[4].trim(),
              C1: parseFloat(m[5]), 
              C2: parseFloat(m[6]),
              Gated: m[7]?m[7]:'NO',
              Description: curDesc
            }
          }
        }
      },

      //==
      XSECTIONS: function(model, section, m) {
        if (m && m.length && m.length > 2) {
          if(m[1] == 'CUSTOM'){
            model[section][m[0]] = {
              swmmType: 'CUSTOM',
              Geom1: parseFloat(m[2]),
              Curve: m[3],
              Geom2: m[4], // not used, but necessary
              Geom3: m[5], // not used, but necessary
              Barrels: m[6]?parseFloat(m[6]):1 // not necessary, but used
            }
          }
          else if(m[1] == 'IRREGULAR'){
            model[section][m[0]] = {
              swmmType: 'IRREGULAR',
              Tsect: m[2]
            }
          }
          else if(m[1] == 'STREET'){
            model[section][m[0]] = {
              swmmType: 'STREET',
              Street: m[2]
            }
          }
          else {
            model[section][m[0]] = {
              swmmType: 'SHAPE',
              Shape: m[1], 
              Geom1: m[2], 
              Geom2: m[3], 
              Geom3: m[4], 
              Geom4: m[5], 
              Barrels: m[6]?parseFloat(m[6]):1,
              Culvert: m[7]?m[7]:''
            }
          }
        }
      },

      //==
      // There are three different ways to start a transects line.
      // The first is optional, but necessary for the first record:
      //    NC: 3 floats that represent N
      //    X1: Descriptions of the transect
      //    GR: List of stations and elevations
      TRANSECTS: function(model, section, m) {
        if (m && m.length) {
          // If this line starts with 'NC', then just set up the CORD object.
          if(m[0] == 'NC'){
            // Clean out CORData
            cleanCORData()
            CORData.Type = 'TRANSECTS'
            CORData.Name = ''
            CORData.Nleft = parseFloat(m[1])
            CORData.Nright = parseFloat(m[2])
            CORData.Nchanl = parseFloat(m[3])
          }
          if(m[0] == 'X1'){
            CORData.Name = m[1]
            model[section][m[1]] = {
              Nsta: parseFloat(m[2]),
              Xleft: parseFloat(m[3]),
              Xright: parseFloat(m[4]),
              Lfactor: parseFloat(m[7]),
              Wfactor: parseFloat(m[8]),
              Eoffset: m[9],
              Nleft: CORData.Nleft,
              Nright: CORData.Nright,
              Nchanl: CORData.Nchanl
            }
          }
          else if(m[0] == 'GR'){
            model[section][CORData.Name].GR = []
            // Parse the station/elevation array {'Elev': 204.4, 'Station': 101.5}
            for(var i = 1; i<m.length; i=i+2)
            model[section][CORData.Name].GR.push({
              Elev: parseFloat(m[i]), 
              Station: parseFloat(m[i+1])
            })
          }
        }
      },

      //==
      LOSSES: function(model, section, m) {
        if (m && m.length)
          model[section][m[0]] = {
            Kin: parseFloat(m[1]), 
            Kout: m[2].trim(), 
            Kavg: m[3].trim(), 
            Flap: m[4]?m[4].trim():'NO', 
            Seepage: m[5]?parseFloat(m[5]):0
          }
      },

      //==
      STREETS: function(model, section, m) {
        if (m && m.length)
          model[section][m[0]] = {
            Tcrown: parseFloat(m[1]),
            Hcurb: parseFloat(m[2]),
            Sx: parseFloat(m[3]),
            nRoad: parseFloat(m[4]),
            a: m[5]?parseFloat(m[5]):0,
            W: m[6]?parseFloat(m[6]):0,
            Sides: m[7]?parseFloat(m[7]):2,
            Tback: m[8]?parseFloat(m[8]):0,
            Sback: m[9]?parseFloat(m[9]):0,
            nBack: m[10]?parseFloat(m[10]):0
          }
      },

      //==
      // There are four different ways to start an inlets line.
      //    GRATE/DROP_GRATE: 3 floats that represent N, possible two null floats
      //    CURB/DROP_CURB: 2 floats, possible string ['HORIZONTAL', 'INCLINED', 'VERTICAL']
      //    SLOTTED: Length, Width
      //    CUSTOM: CurveName
      // An inlet can have more than one entry per id, so each id is the name of an array of objects.
      INLETS: function(model, section, m) {
        
        if (m && m.length) {
          // Create an array for this inlet's name.
          if(!Array.isArray(model[section][m[0]]))
          {
            model[section][m[0]] = []
          }
          if(m[1] == 'GRATE' || m[1] == 'DROP_GRATE'){
            model[section][m[0]].push({
              Type: m[1],
              Length: parseFloat(m[2]),
              Width: parseFloat(m[3]),
              InletType: m[4]?m[4]:'',
              Aopen: m[5]?m[5]:'',
              Vsplash: m[6]?m[6]:''
            })
          } else if(m[1] == 'CURB' || m[1] == 'DROP_CURB'){
            model[section][m[0]].push({
              Type: m[1],
              Length: parseFloat(m[2]),
              Height: parseFloat(m[3]),
              Throat: m[4]?m[4]:''
            })
          } else if(m[1] == 'SLOTTED' ){
            model[section][m[0]].push({
              Type: m[1],
              Length: parseFloat(m[2]),
              Width: parseFloat(m[3])
            })
          } else if(m[1] == 'CUSTOM' ){
            model[section][m[0]].push({
              Type: m[1],
              Curve: m[2]
            })
          }
        }
      },

      //==
      INLET_USAGE: function(model, section, m) {
        if (m && m.length)
          model[section][m[0]] = {
            Inlet: m[1].trim(),
            Node: m[2].trim(),
            Number: m[3]?parseFloat(m[3]):1,
            PctClogged: m[4]?parseFloat(m[4]):0,
            Qmax: m[5]?parseFloat(m[5]):0,
            aLocal: m[6]?parseFloat(m[6]):0,
            wLocal: m[7]?parseFloat(m[7]):0,
            Placement: m[8]?m[8].trim():'AUTOMATIC'
          }
      },

      //==
      POLLUTANTS: function(model, section, m) {
        if (m && m.length)
          model[section][m[0]] = {
            Units: m[1].trim(), 
            Cppt: parseFloat(m[2]), 
            Cgw: parseFloat(m[3]), 
            Crdii: parseFloat(m[4]), 
            Kdecay: parseFloat(m[5]), 
            SnowOnly: m[6]?m[6].trim():'NO', 
            CoPollutant: m[7]?m[7].trim():'*', 
            CoFrac: m[8]?parseFloat(m[8]):0, 
            Cdwf: m[9]?parseFloat(m[9]):0,  
            Cinit: m[10]?parseFloat(m[10]):0
          }
      },

      //==
      LANDUSES: function(model, section, m) {
        if (m && m.length)
          model[section][m[0]] = {
            Interval: m[1]?m[1].trim():'', 
            Available: m[2]?m[2].trim():'', 
            Cleaned: m[3]?m[3].trim():''
          }
      },

      //!!
      BUILDUP: function(model, section, m) {
        if (m && m.length)
          // If there is not a BUILDUP array for this 
          // landuse, create one.
          if(!model[section][m[0]]){
            model[section][m[0]] = []
          }
          let thisObj = { 
            Pollutant: m[1]
          }
          if (m && m.length == 2){
            model[section][m[0]].push({
              Pollutant: m[1]
            })
          } else {
            if(m.length > 2){thisObj.Function = m[2];}
            if(thisObj.Function === 'NONE') { // NONE
              thisObj.Coeff1     = 0;
              thisObj.Coeff2     = 0;
              thisObj.Coeff3     = 0;
              thisObj.Normalizer = 'AREA';
            }
            if(thisObj.Function === 'POW') { // POW
              thisObj.Coeff1     = parseFloat(m[3]);
              thisObj.Coeff2     = parseFloat(m[4]);
              thisObj.Coeff3     = parseFloat(m[5]);
              thisObj.Normalizer = m[6];
            }
            if(thisObj.Function === 'EXP') { // EXP
              thisObj.Coeff1     = parseFloat(m[3]);
              thisObj.Coeff2     = parseFloat(m[4]);
              thisObj.Coeff3     = parseFloat(m[5]);
              thisObj.Normalizer = m[6];
            }
            if(thisObj.Function === 'SAT') { // SAT
              thisObj.Coeff1     = parseFloat(m[3]);
              thisObj.Coeff2     = parseFloat(m[4]);
              thisObj.Coeff3     = parseFloat(m[5]);
              thisObj.Normalizer = m[6];
            }
            if(thisObj.Function === 'EXT') { // EXT
              thisObj.maxBuildup  = parseFloat(m[3]);
              thisObj.scaleFactor = parseFloat(m[4]);
              thisObj.timeSeries  = m[5];
              thisObj.Normalizer  = m[6];
            }
            // Push the new BUILDUP object to the array.
            model[section][m[0]].push(thisObj)
          }
      },  

      //==
      WASHOFF: function(model, section, m) {
        // If there is not a WASHOFF array for this 
        // landuse, create one.
        if(!model[section][m[0]]){
          model[section][m[0]] = []
        }
        if (m && m.length == 2)
          model[section][m[0]].push({
            Pollutant: m[1]
        })
        if (m && m.length > 2)
          model[section][m[0]].push({
            Pollutant: m[1].trim(), 
            Function: m[2].trim(),
            Coeff1: parseFloat(m[3]) || 0,
            Coeff2: parseFloat(m[4]) || 0,
            Ecleaning: parseFloat(m[5]) || 0,
            Ebmp: m[6]?m[6].trim():''
          })
      },  

      //==
      COVERAGES: function(model, section, m) {
        if (m && m.length)
          // If there is not a COVERAGE array for this 
          // subcatchment, create one.
          if(!model[section][m[0]]){
            model[section][m[0]] = []
          }
          // Push all the new COVERAGE objects on to the 
          // array.
          for(var i = 1; i<m.length; i=i+2)
            model[section][m[0]].push({
              LandUse: m[i].trim(), 
              Percent: parseFloat(m[i+1])
            })
      },

      //==
      INFLOWS: function(model, section, m) {
        if (m && m.length){
          if(!([m[0]] in model[section])){
            model[section][m[0]] = {}
          }
          model[section][m[0]][m[1]] = {
            Timeseries: m[2].trim()==='""'?'':m[2].trim(),
            Type: m[3] ? m[3].trim() : '',
            UnitsFactor: m[4] ? parseFloat(m[4]) : '',
            ScaleFactor: m[5] ? parseFloat(m[5]) : '',
            Baseline: m[6] ? parseFloat(m[6]) : '',
            Pattern: m[7] ? m[7].trim() : ''
          }
        }
      }, 

      //==
      DWF: function(model, section, m) {
        if (m && m.length){
          if(!([m[0]] in model[section])){
            model[section][m[0]] = {}
          }
          model[section][m[0]][m[1]] = {
            Base: m[2] ? parseFloat(m[2]) : 1.0,
            Pat1: m[3]?m[3].trim()==='""'?'':m[3].replaceAll('"', '').trim():'',
            Pat2: m[4]?m[4].trim()==='""'?'':m[4].replaceAll('"', '').trim():'',
            Pat3: m[5]?m[5].trim()==='""'?'':m[5].replaceAll('"', '').trim():'',
            Pat4: m[6]?m[6].trim()==='""'?'':m[6].replaceAll('"', '').trim():'',
            Pat5: m[7]?m[7].trim()==='""'?'':m[7].replaceAll('"', '').trim():'',
            Pat6: m[8]?m[8].trim()==='""'?'':m[8].replaceAll('"', '').trim():'',
            Pat7: m[9]?m[9].trim()==='""'?'':m[9].replaceAll('"', '').trim():'',
          }
        }
      },

      //==
      PATTERNS: function(model, section, m) {
        if (m && m.length){
          // If there is not a PATTERNS array for this 
          // subcatchment, create one.
          let i = 1;

          if(!model[section][m[0]]){
            model[section][m[0]] = {
              Type: m[1].trim(),
              Factors: []
            }
            i = 2
          }

          // Push all the new PATTERNS objects on to the 
          // array.
          for(;i<m.length; i=i+2)
            model[section][m[0]].Factors.push(parseFloat(m[i]))
        }
      },

      //==
      // There are two different ways to start a hydrographs line.
      //    Name Raingage
      //    Name Month SHORT/MEDIUM/LONG R T K (Dmax Drec D0)
      HYDROGRAPHS: function(model, section, m) {
        if (m && m.length) {
          if(m.length == 2){
            // Add a new HYDROGRAPHS object
            model[section][m[0]] = { Raingage: m[1], Months: {}}
          }
          else {
            var rec = model[section][m[0]]
            if(!isValidData(rec.Months[m[1]])) {rec.Months[m[1]] = {}}
            rec.Months[m[1]][m[2]] = {
              R : parseFloat(m[3]),
              T : parseFloat(m[4]),
              K : parseFloat(m[5]),
              Dmax : m[6]?parseFloat(m[6]):null,
              Drec : m[7]?parseFloat(m[7]):null,
              D0   : m[8]?parseFloat(m[8]):null
            }
          }
        }
      },

      //==
      RDII: function(model, section, m) {
        if (m && m.length){
          model[section][m[0]] = {
            UHgroup: m[1].trim()==='""'?'':m[1].trim(),
            SewerArea: m[2] ? parseFloat(m[2]) : 0
          }
        }
      },

      //==
      LOADINGS: function(model, section, m) {
        if (m && m.length)
          // If there is not a LOADING array for this 
          // subcatchment, create one.
          if(!model[section][m[0]]){
            model[section][m[0]] = []
          }
          // Push all the new LOADING objects on to the 
          // array.
          for(var i = 1; i<m.length; i=i+2)
            model[section][m[0]].push({
              Pollutant: m[i].trim(), 
              InitLoad: parseFloat(m[i+1])
            })
      }, 

      //==
      TREATMENT: function(model, section, m) {
        if (m && m.length)
          // If there is not a TREATMENT array for this 
          // subcatchment, create one.
          if(!model[section][m[0]]){
            model[section][m[0]] = []
          }
          model[section][m[0]][m[1]] = m.slice(2).join(' ')
      }, 

      //==
      CURVES: function(model, section, m) {
        if (m && m.length > 0){
          // Index track for lines with 'Type' attribute.
          var i = 1

          // If there are 4 entries for this line, that means the
          // second entry is a TYPE. Create a new property using the new type's name.
          if(m.length === 4){
            cleanCORData()
            CORData.Type = 'CURVES'
            // Capitalize the translation: this is something people read on UIs,
            // so all caps is a little extreme.
            CORData.Name = m[1][0].toUpperCase() + m[1].substr(1).toLowerCase()
            if(!model[section][CORData.Name]){
              model[section][CORData.Name] = Object.create(null)
            }
            i = 2
            // Since this is the first line a of a new curve, create a new property using
            // the curve's name
            model[section][CORData.Name][m[0]] = []
          }
          // Push all the new CURVE objects on to the array.
          model[section][CORData.Name][m[0]].push({
            x: parseFloat(m[i]), 
            y: parseFloat(m[i+1])
          })
        }
      },

      // TIMESERIES is a special case. TIMESERIES is either
      // of the following formats:
      // Date/Time stucture:
      //  [
      //    SeriesName <string>: 
      //    [ 
      //      {
      //        Date <string>: 'mm-dd-yyyy' or 'mm/dd/yyyy',
      //        Curve: [
      //          { 
      //            Time <string>: '24:60' format
      //            Value <number>: required
      //          }, ...
      //        ]
      //      }, 
      //    ], ...
      //  ]
      // Time since simulation start:
      //  [
      //    SeriesName <string>: 
      //    [ 
      //      { 
      //        Time <number>: decimal format, translated from decimal or '24:60' format.
      //        Value <number>: required
      //      }, ...
      //    ], ...
      //  ]
      // File input:
      //  [
      //    SeriesName <string>: 
      //    { 
      //      Fname <string>: string for the file name
      //    }, ...
      //  ]
      //==
      // This whole section needs to be rewritten.
      TIMESERIES: function(model, section, m) {
        // All input to this function should be
        // a string. strings without ':' will
        // be treated as floats and translated to a HH:MM
        // format
        function floatToHHMM(thisTime){
          if(thisTime.indexOf(':') == -1){
            var tempTime = parseFloat(thisTime)
            return (tempTime.toFixed(0).toString()+':'+(((tempTime-tempTime.toFixed(0))*60).toFixed(0) ).toString().padEnd(2, '0') )
          }else{
            return thisTime
          }
        }

        if (m && m.length > 0){
          // If there is no array for this timeseries, 
          // create one.
          if(isValidData(model[section][m[0]])){
            if(!Array.isArray(model[section][m[0]])){
              model[section][m[0]] = []
            }
          } else {
            model[section][m[0]] = []
          }
          
          // Give the timeseries a hidden swmmType property:
          Object.defineProperty(model[section][m[0]], 'swmmType', { enumerable: false, writable: true}) 

          // Check if m[1] is in a valid date format
          if(/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(m[1]) ||
            /^\d{1,2}-\d{1,2}-\d{2,4}$/.test(m[1]) )
          {
            // If it is:
            // Place the date into thisDate
            var thisDate = m[1]
            model[section][m[0]].swmmType = 'Date'

            // For each time/value pair afterward:
            // append {date+time, value} to the m[0] array
            for(var i = 2; i < m.length; i=i+2){
              model[section][m[0]].push({
                DateTime: thisDate.replaceAll('/','-').replace(/(^|-)0+/g, "$1") + ' ' + m[i], 
                Value: parseFloat(m[i+1])
              })
            }
          } 
          // else if m[1] is a file type
          else if (m[1] == 'FILE'){
            model[section][m[0]] = []
            model[section][m[0]].swmmType = 'File'
            model[section][m[0]].push(m[2])
          }

          // else this is either continuation of a date array
          // or the start of or continuation of a time array
          // This can be detected by getting the most recent 
          // object 'rec' appended to the array and checking 
          // for a string
          // 
          // If 'rec' is a string, then get the date from
          // the string and for each time/value pair afterward:
          // append {date+time, value} to the m[0] array.
          //
          else if (model[section][m[0]].swmmType == 'Date'){
            var thisDate = model[section][m[0]].slice(-1)[0].DateTime.split(' ')[0]
            for(var i = 1; i < m.length; i=i+2)
              //This should translate floats/integers to 0:00 format
              model[section][m[0]].push({
                DateTime: thisDate + ' ' + floatToHHMM(m[i]), 
                Value: parseFloat(m[i+1])
              })
          }
          // If 'rec' is a number, then for each time/value
          // pair afterward, append
          // {number, value} to the m[0] array
          // 
          // TIMESERIES FORMAT NEEDS TO BE RETHOUGHT.
          // OR DETECTION NEEDS TO BE BETTER
          // BECAUSE THIS FORMAT CAN BE A STRING OR A NUMBER
          else {
            for(var n = 1; n < m.length - 1 ; n=n+2){
              var thisTime = 0;
              //If the date is in hh:mm:ss format, translate it
              if(typeof m[n] == 'string'){
                if(m[n].indexOf(':') > 0){
                  let v = m[n].split(':')
                  thisTime = parseFloat(v[0]) +
                             (v.length>1?parseFloat(v[1])/60.0:0) +
                             (v.length>2?parseFloat(v[2])/3600.0:0)
                }else{
                  thisTime = parseFloat(m[n])
                }
              } else {
                thisTime = parseFloat(m[n])
              }
              model[section][m[0]].swmmType = 'Time'

              model[section][m[0]].push({
                DateTime: thisTime, 
                Value: parseFloat(m[n+1])
              })
            }
          }

        }
      },

      //==
      // Use CORData to remember the name of the rule.
      CONTROLS: function(model, section, m) {
          if (m && m.length) {
            // If this line starts with 'NC', then just set up the CORD object.
            if(m[0] == 'RULE'){
              // Clean out CORData
              cleanCORData()
              CORData.Type = 'CONTROLS'
              CORData.Name = m[1]
              model[section][m[1]] = []
            }
            else {
              model[section][CORData.Name].push(m.join(' '))
            }
          }
      },

      //==
      REPORT: function(model, section, m) {
        // If there is an array, and it has contents,
        if (m && m.length)
          // If m[0] is any of SUBCATCHMENTS NODES LINKS LID,
          // read in a series of strings and give m[1] that array as contents
          // This appears to operate differently in the UI, with all data being
          if((m[0] == 'SUBCATCHMENTS' || m[0] == 'NODES' || m[0] == 'LINKS' || m[0] == 'LID')){
            if (!model[section][m[0]]) 
              model[section][m[0]] = 'ALL';
            /*for(var i = 1; i < m.length; i=i+1)
              model[section][m[0]].push(m[i])*/
          }
          else {
            model[section][m[0]] = m[1];
          }
      },

      //==
      MAP: function(model, section, m) {
        // If there is an array, and it has contents,
        if (m && m.length)
          // If m[0] is DIMENSIONS,
          // read in a series of floats
          if(m[0] == 'DIMENSIONS' ){
            if (!model[section][m[0]]) 
              model[section][m[0]] = {
                x1: parseFloat(m[1]),
                y1: parseFloat(m[2]),
                x2: parseFloat(m[3]),
                y2: parseFloat(m[4])
              }
          }
          else {
            model[section][m[0]] = m[1];
          }
      },

      //==
      COORDINATES: function(model, section, m) {
        if (m && m.length)
          model[section][m[0]] = {
            x: parseFloat(m[1]), 
            y: parseFloat(m[2])
          }
      },

      //!!
      VERTICES: function(model, section, m) {
          let v = model[section][m[0]] || [],
          c = {};
          if (m && m.length) {
            c.x = parseFloat(m[1]);
            c.y = parseFloat(m[2]);
          }
          v[v.length] = c;
          model[section][m[0]] = v;
      },

      //!!
      POLYGONS: function(model, section, m) {
        if (!model[section][m[0]]) 
          model[section][m[0]] = [];
            
        if (Object.keys(model[section][m[0]]).length === 0)
          model[section][m[0]] = [];

        if (m && m.length) {
          var coord = {x: parseFloat(m[1]), y: parseFloat(m[2])};
          model[section][m[0]].push(coord);
        }
      },

      //==
      SYMBOLS: function(model, section, m) {
        if (m && m.length)
          model[section][m[0]] = {
            x: parseFloat(m[1]), 
            y: parseFloat(m[2])
          }
      },  

      //==
      LABELS: function(model, section, m) {
        if (m && m.length){
          if(!Array.isArray(model[section]))
            model[section] = []
          // rebuild the string 
          let rebuilt = m.join(' ')
          var myRegexp = /[^\s"]+|"([^"]*)"/gi
          var myString = rebuilt
          var myArray = []

          do {
              //Each call to exec returns the next regex match as an array
              var match = myRegexp.exec(myString)
              if (match != null)
              {
                  //Index 1 in the array is the captured group if it exists
                  //Index 0 is the matched text, which we use if no captured group exists
                  myArray.push(match[1] ? match[1] : match[0])
              }
          } while (match != null)
          model[section].push({
            x: parseFloat(m[0]), 
            y: parseFloat(m[1]), 
            // Rebuild the string, find the first set of 
            Label: myArray[2],
            Attrs: myArray.slice(3).join(' ')
          })
        }
      },

      //==
      BACKDROP: function(model, section, m) {
        if (m && m.length) {
          model[section].push(m.join(' '))
        }
      },  

      //==
      TAGS: function(model, section, m) {
          if (m && m.length){
            if(!Array.isArray(model[section])) model[section] = []
            model[section].push({
              Type: m[0].trim(), 
              ID: m[1].trim(), 
              Tag: m[2].trim()
            })
          }
      },

      //!!
      PROFILE: function(model, section, m) {
        if (m && m.length > 1)
          model[section][Object.keys(model[section]).length] = {Value: m.join(' ')};
      }, 

      //!!
      FILE: function(model, section, m) {
        if (m && m.length > 1)
          section[Object.keys(model[section]).length] = {Value: m.join(' ')};
      },

      //==
      LID_CONTROLS: function(model, section, m) {
        if (m && m.length){
          // If there is not a LID_CONTROLS object, make one.
          if(!isValidData(model[section][m[0]])){
            model[section][m[0]] = { Type: m[1] }
            return
          }
          var obj = model[section][m[0]]
          switch(m[1]){
            case('SURFACE'):
              obj.SURFACE = {
                StorHt: m[2],
                VegFrac: m[3],
                Rough: m[4],
                Slope: m[5],
                Xslope: m[6]?m[6]:0
              }
              break
            case('SOIL'):
              obj.SOIL = {
                Thick: m[2],
                Por: m[3],
                FC: m[4],
                WP: m[5],
                Ksat: m[6],
                Kcoeff: m[7],
                Suct: m[8]
              }
              break
              case('PAVEMENT'):
              obj.PAVEMENT = {
                Thick: m[2],
                Vratio: m[3],
                FracImp: m[4],
                Perm: m[5],
                Vclog: m[6]
              }
              break
              case('STORAGE'):
              obj.STORAGE = {
                Height: m[2],
                Vratio: m[3],
                Seepage: m[4],
                Vclog: m[5]
              }
              break
              case('DRAIN'):
              obj.DRAIN = {
                Coeff: m[2],
                Expon: m[3],
                Offset: m[4],
                Delay: m[5],
                Open: m[6]?parseFloat(m[6]):0,
                Close: m[7]?parseFloat(m[7]):0,
                Curve: m[8]?m[8]:''
              }
              break
              case('DRAINMAT'):
              obj.DRAINMAT ={
                Thick: m[2],
                Vratio: m[3],
                Rough: m[4]
              }
              break
          }
        }
      }, 

      //==
      LID_USAGE: function(model, section, m) {
        if (m && m.length){
          // If there is not a LID_USAGE object, make one.
          if(!isValidData(model[section][m[0]])){
            model[section][m[0]] = {}
          }
          var obj = model[section][m[0]]
          obj[m[1]] = {
            Number: parseFloat(m[2]),
            Area: parseFloat(m[3]),
            Width: parseFloat(m[4]),
            InitSat: parseFloat(m[5]),
            FromImp: parseFloat(m[6]),
            ToPerv: parseFloat(m[7]),
            RptFile: m[8]?m[8]:'*',
            DrainTo: m[9]?m[9]:'*',
            FromPerv: m[10]?parseFloat(m[10]):0
          }
        }
      },

      //!!
      EVENT: function(model, section, m) {
        if (m && m.length > 1)
          model[section][Object.keys(model[section]).length] = {Value: m.join(' ')};
      },
    },

    // Since this file is unlikely to be much like any previous file, simply
    // build a new object rather than diff. This allows the object to be rebuilt
    // without affecting the components on each CUD.
    model = {   // Input file model variables. Related to a header in .inp file.
      TITLE: "",              OPTIONS: {},            RAINGAGES: {},
      TEMPERATURE: {},        EVAPORATION: {},
      SUBCATCHMENTS: {},      SUBAREAS: {},           INFILTRATION: {},
      AQUIFERS: {},           GROUNDWATER: {},        GWF: {},
      SNOWPACKS: {},
      JUNCTIONS: {},          OUTFALLS: {},           STORAGE: {},
      DIVIDERS: {},
      CONDUITS: {},           PUMPS: {},              ORIFICES: {},
      WEIRS: {},              OUTLETS: {},            XSECTIONS: {},
      STREETS: {},            INLETS: {},             INLET_USAGE: {},
      TRANSECTS: {},          LOSSES: {},             POLLUTANTS: {},
      LANDUSES: {},           BUILDUP: {},            WASHOFF: {},
      COVERAGES: {},          INFLOWS: {},            DWF: {},
      PATTERNS: {},           RDII: {},               HYDROGRAPHS: {},
      LOADINGS: {},           TREATMENT: {},          CURVES: {},
      TIMESERIES: {},         CONTROLS: {},           REPORT: {},
      MAP: {},                COORDINATES: {},        VERTICES: {},
      POLYGONS: {},           SYMBOLS: {},            LABELS: {},
      BACKDROP: [],           TAGS: {},               PROFILE: {},
      FILE: {},               LID_CONTROLS: {},       LID_USAGE: {},
      EVENT: {},
    },
    lines = text.split(/\r\n|\r|\n/),
    // section refers to the different parts of an .inp file, like TITLE, NODES, OPTIONS, etc.
    section = null;
    // section_title refers to subsections within the TITLE section. This is for my modifications,
    // like PCS
    let section_title = '';

    let curDesc = '';
    // CORData is cross object reference data for the parser.
    // If any object takes up more than one line or needs to
    // reference a previously inserted object, that info should
    // be found in the CORData. This is used in transects, but should
    // also be used in the Timeseries objects and probably a few others.
    let CORData = { Type: 'NONE' }

    // Call cleanCORData when you are making a new CORData entry
    // and you no longer need anything from the previous CORData entry
    function cleanCORData(){
      CORData = Object.keys(CORData).filter(key =>
        key == 'Type').reduce((obj, key) =>
        {
          obj[key] = CORData[key]
          return obj
        }, {}
        )
    }
    
    lines.forEach(function(line) {
      // If the entry is a comment and the section is not [TITLE], then attempt to assign it as 
      // the description for the current object.
      if (section !== 'TITLE' && regex.comment.test(line)) {
        curDesc = '';
      } 
      // If the line is a description
      else if (section !== 'TITLE' && regex.description.test(line)) {
        // Get the comment without the semicolon
        curDesc = line.slice(1, line.length);
      } 
      // If the line is a section header
      else if (regex.section.test(line)) {
        var s = line.match(regex.section);
        // If the section has not yet been created, create one.
        if ('undefined' === typeof model[s[1].trim().toUpperCase()])
        {
          model[s[1].trim()] = [];
        } 
        section = s[1].trim().toUpperCase();
      } 
      // If the line is a data line
      else if (regex.value.test(line) || section === 'TITLE') {
        // If the parser has a function for the section, run that
        if (parser[section]){
          // If the section is TITLE,
          //  - If the line is the start of a TITLE_SEC 
          //   - 
          //  - If the line is not the start of or part of a TITLE_SEC object,
          //   - Send the data as a line.
          if(section === 'TITLE'){
            if(regex.section_title.test(line)){
              var s = line.match(regex.section_title);
              // If the section has not yet been created, create one.
              if ('undefined' === typeof model[s[1].trim()])
              {
                model[s[1].trim()] = {};
              } 
              section_title = s[1].trim();
            }
            else if (section_title === ''){
              parser[section](model, section, line, curDesc);
            }
            else{
              if (!regex.description.test(line) && regex.value.test(line)){
                // Remove everything after the first semicolon:
                line = line.split(';')[0];
      
                var array = line.trim().split(/\s+/);
                parser[section_title](model, section_title, array, curDesc);
              }
            }
          }


          // else, trim input, split into whitespace array 
          else {
            // Remove everything after the first semicolon:
            line = line.split(';')[0];

            var array = line.trim().split(/\s+/);
            parser[section](model, section, array, curDesc);
          }
        }
        // If the parser doesn't have a function for the section, 
        // then just read each line in as a string to an array.
        else{
          // if it is an unknown section
          if ('undefined' === typeof model[section]){
            model[section] = [line];
          } 
          // If the section exists, just destructure and append.
          else {
            model[section] = [...model[section], line]
          }
        }
        curDesc = '';
      };
    });

    return model;
  }

  // Creates a string in the style of an .inp file. This is used for either running a model
  // or saving a model. Once saving is more seamless, models should be autosaved before running.
  // Right now, autosaving just adds more clicks.
  static dataToInpString(model) {
    let fullString = '';

    var parser = {
      // TITLE Title/Notes needs to consume all of the lines until the next section.
      TITLE: function(model) {
        return '[TITLE]\n' + model['TITLE'];
      },

      OPTIONS: function(model) {
        let secStr = 'OPTIONS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          inpString += strsPad(entry, 21)
          inpString += strsPad(rec, 17)
          inpString += '\n';
        }
        return inpString;
      },

      EVAPORATION: function(model) {
        let secStr = 'EVAPORATION'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          inpString += strsPad(entry, 16)
          if(entry == 'CONSTANT')
            inpString += numsPad(rec, 11)
          if(entry == 'MONTHLY'){
            for(let val in rec)
              inpString += numsPad(val, 0)
          }
          if(entry == 'TimeSeries')
            inpString += strsPad(rec, 11)
          if(entry == 'Temperature')
            inpString += strsPad(rec, 11)
          if(entry == 'FILE'){
            for(let val in rec)
              inpString += numsPad(val, 0)
          }
          if(entry == 'Recovery')
            inpString += strsPad(rec, 11)
          if(entry == 'DRY_ONLY')
            inpString += strsPad(rec, 11)

          inpString += '\n';
        }
        return inpString;
      },

      RAINGAGES: function(model) {
        let secStr = 'RAINGAGES'
        let inpString = sectionCap(secStr)
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += strsPad(rec.Format, 9)
          inpString += strsPad(rec.Interval, 8)
          inpString += numsPad(rec.SCF, 8)
          inpString += strsPad(rec.Source, 11)
          if(isValidData(rec.SeriesName))
            inpString += strsPad(rec.SeriesName, 11)
          
          if(isValidData(rec.Fname))
            inpString += strsPad(rec.Fname, 11)
          if(isValidData(rec.Station))
            inpString += strsPad(rec.Station, 11)
          if(isValidData(rec.Units))
            inpString += strsPad(rec.Units, 11)
          inpString += '\n';
        }
        return inpString;
      },

      TEMPERATURE: function(model){
        let secStr = 'TEMPERATURE'
        let inpString = sectionCap(secStr)
        if(model.TEMPERATURE.File) inpString += 'FILE ' + model.TEMPERATURE.File + ' ' + model.TEMPERATURE.FileStart || '' + '\n';
          if(model.TEMPERATURE.TIMESERIES) inpString += 'TIMESERIES ' + model.TEMPERATURE.TIMESERIES + '\n';
          if(model.TEMPERATURE.WINDSPEED){
            inpString += 'WINDSPEED '
            inpString += model.TEMPERATURE.WINDSPEED.Type
            if(model.TEMPERATURE.WINDSPEED.AWS){
              for (let entry in model.TEMPERATURE.WINDSPEED.AWS) {
                inpString += ' ' + model.TEMPERATURE.WINDSPEED.AWS[entry].toString();
              }
            }
            inpString += '\n'
          }
          if(model.TEMPERATURE.SNOWMELT){
            inpString += 'SNOWMELT '
            inpString += model.TEMPERATURE.SNOWMELT.DivideTemp     + ' '
            inpString += model.TEMPERATURE.SNOWMELT.ATIWeight      + ' '
            inpString += model.TEMPERATURE.SNOWMELT.NegMeltRatio   + ' '
            inpString += model.TEMPERATURE.SNOWMELT.MSLElev        + ' '
            inpString += model.TEMPERATURE.SNOWMELT.DegLatitude    + ' '
            inpString += model.TEMPERATURE.SNOWMELT.LongCorrection;
            inpString += '\n'
          }
          if(model.TEMPERATURE.ADC){
            if(model.TEMPERATURE.ADC.IMPERVIOUS){
              inpString += 'ADC IMPERVIOUS'
              for (let entry in model.TEMPERATURE.ADC.IMPERVIOUS) {
                inpString += ' ' + model.TEMPERATURE.ADC.IMPERVIOUS[entry].toString()
              }
            }
            inpString += '\n'
            if(model.TEMPERATURE.ADC.PERVIOUS){
              inpString += 'ADC PERVIOUS'
              for (let entry in model.TEMPERATURE.ADC.PERVIOUS) {
                inpString += ' ' + model.TEMPERATURE.ADC.PERVIOUS[entry].toString()
              }
            }
            inpString += '\n'
          }
          return inpString
      },

      SUBCATCHMENTS: function(model) {
        let secStr = 'SUBCATCHMENTS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += strsPad(rec.RainGage, 16)
          inpString += strsPad(rec.Outlet, 16)
          inpString += numsPad(rec.Area, 8)
          inpString += numsPad(rec.PctImperv, 8)
          inpString += numsPad(rec.Width, 8)
          inpString += numsPad(rec.PctSlope, 8)
          inpString += numsPad(rec.CurbLen, 11)
          if(isValidData(rec.SnowPack))
            inpString += strsPad(rec.SnowPack, 11)

          inpString += '\n';
        }
        return inpString;
      },

      SUBAREAS: function(model) {
        let secStr = 'SUBAREAS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += numsPad(rec.NImperv, 10)
          inpString += numsPad(rec.NPerv, 10)
          inpString += numsPad(rec.SImperv, 10)
          inpString += numsPad(rec.SPerv, 10)
          inpString += numsPad(rec.PctZero, 10)
          inpString += numsPad(rec.RouteTo, 10)
          if(isValidData(rec.PctRouted))
            inpString += numsPad(rec.PctRouted, 11)

          inpString += '\n';
        }
        return inpString;
      },

      INFILTRATION: function(model) {
        let secStr = 'INFILTRATION'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          for(var key in rec){
            if(rec.hasOwnProperty(key)){
              if(rec[key] !== null){
                inpString += strsPad(rec[key].toString(), 10)
              }
            }
          }
          /*switch(rec.swmmType){
            case ('HORTON'):
              inpString += numsPad(rec.MaxRate, 10)
              inpString += numsPad(rec.MinRate, 10)
              inpString += numsPad(rec.Decay, 10)
              inpString += numsPad(rec.DryTime, 10)
              inpString += numsPad(rec.MaxInfil, 10)
              break
            case ('GREEN'):
              inpString += numsPad(rec.Psi, 10)
              inpString += numsPad(rec.Ksat, 10)
              inpString += numsPad(rec.IMD, 10)
              break
            case ('SCS'):
              inpString += strsPad(rec.CurveNo, 10)
              inpString += numsPad(rec.Ksat, 10)
              inpString += numsPad(rec.DryTime, 10)
              break
          }*/

          inpString += '\n';
        }
        return inpString;
      },

      AQUIFERS: function(model) {
        let secStr = 'AQUIFERS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += numsPad(rec.Por, 6)
          inpString += numsPad(rec.WP, 6)
          inpString += numsPad(rec.FC, 6)
          inpString += numsPad(rec.Ks, 6)
          inpString += numsPad(rec.Kslp, 6)
          inpString += numsPad(rec.Tslp, 6)
          inpString += numsPad(rec.ETu, 6)
          inpString += numsPad(rec.ETs, 6)
          inpString += numsPad(rec.Seep, 6)
          inpString += numsPad(rec.Ebot, 6)
          inpString += numsPad(rec.Egw, 6)
          inpString += numsPad(rec.Umc, 6)
          if(isValidData(rec.Epat))
            inpString += strsPad(rec.Epat, 11)

          inpString += '\n';
        }
        return inpString;
      },

      GROUNDWATER: function(model) {
        let secStr = 'GROUNDWATER'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += strsPad(rec.Aquifer, 16)
          inpString += strsPad(rec.Node, 16)
          inpString += numsPad(rec.Esurf, 6)
          inpString += numsPad(rec.A1, 6)
          inpString += numsPad(rec.B1, 6)
          inpString += numsPad(rec.A2, 6)
          inpString += numsPad(rec.B2, 6)
          inpString += numsPad(rec.A3, 6)
          inpString += numsPad(rec.Dsw, 6)
          if(isValidData(rec.Egwt))
            inpString += strsPad(rec.Egwt, 11)
          if(isValidData(rec.Ebot))
            inpString += strsPad(rec.Ebot, 11)
          if(isValidData(rec.Egw))
            inpString += strsPad(rec.Egw, 11)
          if(isValidData(rec.Umc))
            inpString += strsPad(rec.Umc, 11)
          
          inpString += '\n';
        }
        return inpString;
      },

      GWF: function(model){
        let secStr = 'GWF'
        let inpString = sectionCap(secStr)
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          if(rec.DEEP) inpString += strsPad(entry, 15) + strsPad(' DEEP', 8) + rec.DEEP + '\n'
          if(rec.LATERAL) inpString += strsPad(entry, 15) + strsPad(' LATERAL', 8) + rec.LATERAL + '\n'
        }

        return inpString
      },

      SNOWPACKS: function(model){
        let secStr = 'SNOWPACKS'
        let inpString = sectionCap(secStr)
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          inpString += strsPad(entry, 16)
          inpString += strsPad('PLOWABLE', 16)
          inpString += numsPad(rec.PLOWABLE.Cmin, 10)
          inpString += numsPad(rec.PLOWABLE.Cmax, 10)
          inpString += numsPad(rec.PLOWABLE.Tbase, 10)
          inpString += numsPad(rec.PLOWABLE.FWF, 10)
          inpString += numsPad(rec.PLOWABLE.SD0, 10)
          inpString += numsPad(rec.PLOWABLE.FW0, 10)
          inpString += numsPad(rec.PLOWABLE.SNN0, 10)
          inpString +=   '\n'
          inpString += strsPad(entry, 16)
          inpString += strsPad('IMPERVIOUS', 16)
          inpString += numsPad(rec.IMPERVIOUS.Cmin, 10)
          inpString += numsPad(rec.IMPERVIOUS.Cmax, 10)
          inpString += numsPad(rec.IMPERVIOUS.Tbase, 10)
          inpString += numsPad(rec.IMPERVIOUS.FWF, 10)
          inpString += numsPad(rec.IMPERVIOUS.SD0, 10)
          inpString += numsPad(rec.IMPERVIOUS.FW0, 10)
          inpString += numsPad(rec.IMPERVIOUS.SD100, 10)
          inpString +=   '\n'
          inpString += strsPad(entry, 16)
          inpString += strsPad('PERVIOUS', 16)
          inpString += numsPad(rec.PERVIOUS.Cmin, 10)
          inpString += numsPad(rec.PERVIOUS.Cmax, 10)
          inpString += numsPad(rec.PERVIOUS.Tbase, 10)
          inpString += numsPad(rec.PERVIOUS.FWF, 10)
          inpString += numsPad(rec.PERVIOUS.SD0, 10)
          inpString += numsPad(rec.PERVIOUS.FW0, 10)
          inpString += numsPad(rec.PERVIOUS.SD100, 10)
          inpString +=   '\n'
          inpString += strsPad(entry, 16)
          inpString += strsPad('REMOVAL', 16)
          inpString += numsPad(rec.REMOVAL.Dplow, 10)
          inpString += numsPad(rec.REMOVAL.Fout, 10)
          inpString += numsPad(rec.REMOVAL.Fimp, 10)
          inpString += numsPad(rec.REMOVAL.Fperv, 10)
          inpString += numsPad(rec.REMOVAL.Fimelt, 10)
          inpString += numsPad(rec.REMOVAL.Fsub?rec.REMOVAL.Fsub:0, 10)
          inpString += strsPad(rec.REMOVAL.Scatch?rec.REMOVAL.Scatch:'', 10)
          inpString +=   '\n'
        }

        return inpString
      },

      JUNCTIONS: function(model) {
        let secStr = 'JUNCTIONS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += numsPad(rec.Invert, 10)
          if(isValidData(rec.Dmax))
            inpString += numsPad(rec.Dmax, 10)
          if(isValidData(rec.Dinit))
            inpString += numsPad(rec.Dinit, 10)
          if(isValidData(rec.Dsurch))
            inpString += numsPad(rec.Dsurch, 10)
          if(isValidData(rec.Aponded))
            inpString += numsPad(rec.Aponded, 10)

          inpString += '\n';
        }
        return inpString;
      },
      
      OUTFALLS: function(model) {
        let secStr = 'OUTFALLS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += numsPad(rec.Invert, 10)
          inpString += strsPad(rec.Type, 10)
          switch(rec.Type){
            case ('TIMESERIES'):
              inpString += strsPad(rec.Tseries, 16)
              break
            case ('TIDAL'):
              inpString += strsPad(rec.Tcurve, 16)
              break
            case ('FIXED'):
              inpString += numsPad(rec.StageData, 16)
              break
            case ('FREE'):
              inpString += strsPad(' ', 16)
              break
          }
          inpString += strsPad(rec.Gated, 10)
          inpString += strsPad(rec.RouteTo, 10)

          inpString += '\n';
        }
        return inpString;
      },

      STORAGE: function(model) {
        let secStr = 'STORAGE'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += numsPad(rec.Invert, 10)
          inpString += numsPad(rec.Dmax, 10)
          inpString += numsPad(rec.Dinit, 10)
          inpString += strsPad(rec.Curve, 16)
          switch(rec.Curve){
            case ('TABULAR'):
              inpString += strsPad(rec.CurveName, 16)
              break
            default:
              inpString += numsPad(rec.P1, 10)
              inpString += numsPad(rec.P2, 10)
              inpString += numsPad(rec.P3, 10)
              break
          }
          if(isValidData(rec.Dsurch))
            inpString += numsPad(rec.Dsurch, 10)
          if(isValidData(rec.Fevap))
            inpString += numsPad(rec.Fevap, 10)
          if(isValidData(rec.Psi))
            inpString += numsPad(rec.Psi, 10)
          if(isValidData(rec.Ksat))
            inpString += numsPad(rec.Ksat, 10)
          if(isValidData(rec.IMD))
            inpString += numsPad(rec.IMD, 10)

          inpString += '\n';
        }
        return inpString;
      },

      DIVIDERS: function(model) {
        let secStr = 'DIVIDERS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += numsPad(rec.Invert, 10)
          inpString += strsPad(rec.DivLink, 16)
          inpString += strsPad(rec.Type, 10)
          switch(rec.Type){
            case ('OVERFLOW'):
              break
            case ('CUTOFF'):
              inpString += numsPad(rec.Qmax, 10)
              break
            case ('TABULAR'):
              inpString += strsPad(rec.Dcurve, 10)
              break
            case ('WEIR'):
              inpString += numsPad(rec.Qmin, 10)
              inpString += numsPad(rec.Ht, 10)
              inpString += numsPad(rec.Cd, 10)
              break
              
          }
          if(isValidData(rec.Dmax))
            inpString += numsPad(rec.Dmax, 10)
          if(isValidData(rec.Dinit))
            inpString += numsPad(rec.Dinit, 10)
          if(isValidData(rec.Dsurch))
            inpString += numsPad(rec.Dsurch, 10)
          if(isValidData(rec.Aponded))
            inpString += numsPad(rec.Aponded, 10)

          inpString += '\n';
        }
        return inpString;
      },

      //==
      CONDUITS: function(model) {
        let secStr = 'CONDUITS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += numsPad(rec.Node1, 16)
          inpString += numsPad(rec.Node2, 16)
          inpString += numsPad(rec.Length, 10)
          inpString += numsPad(rec.Roughness, 10)
          inpString += strsPad(rec.InOffset, 10)
          inpString += strsPad(rec.OutOffset, 10)
          inpString += numsPad(rec.InitFlow, 10)

          if(isValidData(rec.MaxFlow))
            inpString += numsPad(rec.MaxFlow, 10)

          inpString += '\n';
        }
        return inpString;
      },

      //==
      PUMPS: function(model) {
        let secStr = 'PUMPS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += strsPad(rec.Node1, 16)
          inpString += strsPad(rec.Node2, 16)
          inpString += strsPad(rec.Pcurve, 16)
          if(isValidData(rec.Status))
            inpString += strsPad(rec.Status, 10)
          if(isValidData(rec.Startup))
            inpString += numsPad(rec.Startup, 10)
          if(isValidData(rec.Status))
            inpString += numsPad(rec.Shutoff, 10)

          inpString += '\n';
        }
        return inpString;
      },

      //==
      ORIFICES: function(model) {
        let secStr = 'ORIFICES'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += strsPad(rec.Node1, 16)
          inpString += strsPad(rec.Node2, 16)
          inpString += strsPad(rec.Type, 16)
          inpString += strsPad(rec.Offset, 10)
          inpString += numsPad(rec.Cd, 10)
          if(isValidData(rec.Gated))
            inpString += strsPad(rec.Gated, 10)
          if(isValidData(rec.Orate))
            inpString += numsPad(rec.Orate, 10)

          inpString += '\n';
        }
        return inpString;
      },

      //==
      WEIRS: function(model) {
        let secStr = 'WEIRS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += strsPad(rec.Node1, 16)
          inpString += strsPad(rec.Node2, 16)
          inpString += strsPad(rec.Type, 16)
          inpString += strsPad(rec.CrestHt, 10)
          inpString += numsPad(rec.Cd, 10)
          if(isValidData(rec.Gated))
            inpString += strsPad(rec.Gated, 10)
          if(isValidData(rec.EC))
            inpString += numsPad(rec.EC, 10)
          if(isValidData(rec.Cd2))
            inpString += numsPad(rec.Cd2, 10)
          if(isValidData(rec.Surcharge))
            inpString += strsPad(rec.Surcharge, 10)
          if(isValidData(rec.Width))
            inpString += numsPad(rec.Width, 10)
          if(isValidData(rec.Wcurve))
            inpString += numsPad(rec.Wcurve, 10)

          inpString += '\n';
        }
        return inpString;
      },

      OUTLETS: function(model) {
        let secStr = 'OUTLETS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += strsPad(rec.Node1, 16)
          inpString += strsPad(rec.Node2, 16)
          inpString += strsPad(rec.Offset, 16)
          inpString += strsPad(rec.Type, 16)
          switch(rec.Type){
            case ('TABULAR/DEPTH'):
            case ('TABULAR/HEAD'):
              inpString += strsPad(rec.Qcurve, 16)
              break
            case ('FUNCTIONAL/DEPTH'):
            case ('FUNCTIONAL/HEAD'):
              inpString += numsPad(rec.C1, 10)
              inpString += numsPad(rec.C2, 10)
              break
          }
          if(isValidData(rec.Gated))
            inpString += numsPad(rec.Gated, 10)

          inpString += '\n';
        }
        return inpString;
      },

      XSECTIONS: function(model) {
        let secStr = 'XSECTIONS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          switch(rec.swmmType){
            case ('CUSTOM'):
              inpString += strsPad(rec.swmmType, 16)
              inpString += numsPad(rec.Geom1, 12)
              inpString += strsPad(rec.Curve, 48)
              inpString += numsPad(rec.Geom2, 10)
              inpString += numsPad(rec.Geom3, 10)
              inpString += numsPad(rec.Barrels, 10)
              break
            case ('IRREGULAR'):
              inpString += strsPad(rec.swmmType, 16)
              inpString += strsPad(rec.Tsect, 12)
              break
            case ('SHAPE'):
              inpString += strsPad(rec.Shape, 12)
              inpString += numsPad(rec.Geom1, 16)
              inpString += numsPad(rec.Geom2, 10)
              inpString += numsPad(rec.Geom3, 10)
              inpString += numsPad(rec.Geom4, 10)
              inpString += numsPad(rec.Barrels, 10)
              inpString += numsPad(rec.Culvert, 10)
              break
            case ('STREET'):
              inpString += strsPad(rec.swmmType, 16)
              inpString += strsPad(rec.Street, 12)
              break
          }

          inpString += '\n';
        }
        return inpString;
      },

      TRANSECTS: function(model) {
        let secStr = 'TRANSECTS';
        let inpString = sectionCap(secStr)
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          inpString += strsPad('NC', 4)
          inpString += numsPad(rec.Nleft, 10)
          inpString += numsPad(rec.Nright, 10)
          inpString += numsPad(rec.Nchanl, 10)
          inpString += '\n'
          inpString += strsPad('X1', 4)
          inpString += strsPad(entry, 16)
          inpString += numsPad(rec.GR.length, 4)
          inpString += numsPad(rec.Xleft, 10)
          inpString += numsPad(rec.Xright, 10)
          inpString += numsPad(0, 3)
          inpString += numsPad(0, 3)
          inpString += numsPad(rec.Lfactor, 10)
          inpString += numsPad(rec.Wfactor, 10)
          inpString += strsPad(rec.Eoffset, 10)
          inpString += '\n'

          inpString += strsPad('GR', 4)
          for(let el in rec.GR){
            inpString += numsPad(rec.GR[el].Elev, 18)
            inpString += numsPad(rec.GR[el].Station, 18)
          }
          
          inpString += '\n'
        }
        return inpString;
      },

      //==
      LOSSES: function(model) {
        let secStr = 'LOSSES'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += numsPad(rec.Kin, 10)
          inpString += numsPad(rec.Kout, 10)
          inpString += numsPad(rec.Kavg, 10)
          if(isValidData(rec.Flap))
            inpString += strsPad(rec.Flap, 10)
          if(isValidData(rec.Seepage))
            inpString += numsPad(rec.Seepage, 10)

          inpString += '\n';
        }
        return inpString;
      },

      //==
      STREETS: function(model) {
        let secStr = 'STREETS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += numsPad(rec.Tcrown, 10)
          inpString += numsPad(rec.Hcurb, 10)
          inpString += numsPad(rec.Sx, 10)
          inpString += numsPad(rec.nRoad, 10)
          if(isValidData(rec.a))
            inpString += numsPad(rec.a, 10)
          if(isValidData(rec.W))
            inpString += numsPad(rec.W, 10)
          if(isValidData(rec.Sides))
            inpString += numsPad(rec.Sides, 10)
          if(isValidData(rec.Tback))
            inpString += numsPad(rec.Tback, 10)
          if(isValidData(rec.Sback))
            inpString += numsPad(rec.Sback, 10)
          if(isValidData(rec.nBack))
            inpString += numsPad(rec.nBack, 10)
          inpString += '\n';
        }
        return inpString;
      },

      INLETS: function(model) {
        let secStr = 'INLETS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          for (let row in model[secStr][entry]){
            inpString += strsPad(entry, 16)
            let el = rec[row]
            if(el.Type == 'GRATE' || el.Type == 'DROP_GRATE'){
              inpString += strsPad(el.Type, 16)
              inpString += numsPad(el.Length, 10)
              inpString += numsPad(el.Width, 10)
              inpString += strsPad(el.InletType.toString(), 10)
              inpString += strsPad(el.Aopen.toString(), 10)
              inpString += strsPad(el.Vsplash.toString(), 10)
            } else if(el.Type == 'CURB' || el.Type == 'DROP_CURB'){
              inpString += strsPad(el.Type, 16)
              inpString += numsPad(el.Length, 10)
              inpString += numsPad(el.Height, 10)
              inpString += strsPad(el.Throat, 16)
            } else if(el.Type == 'SLOTTED' ){
              inpString += strsPad(el.Type, 16)
              inpString += numsPad(el.Length, 10)
              inpString += numsPad(el.Width, 10)
            } else if(el.Type == 'CUSTOM' ){
              inpString += strsPad(el.Type, 16)
              inpString += strsPad(el.Curve, 10)
            }
    
            inpString += '\n';
          }
        }
        return inpString;
      },

      //==
      INLET_USAGE: function(model) {
        let secStr = 'INLET_USAGE'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += strsPad(rec.Inlet, 10)
          inpString += strsPad(rec.Node, 10)
          if(isValidData(rec.Number))
            inpString += numsPad(rec.Number, 10)
          if(isValidData(rec.PctClogged))
            inpString += numsPad(rec.PctClogged, 10)
          if(isValidData(rec.Qmax))
            inpString += numsPad(rec.Qmax, 10)
          if(isValidData(rec.aLocal))
            inpString += numsPad(rec.aLocal, 10)
          if(isValidData(rec.wLocal))
            inpString += numsPad(rec.wLocal, 10)
          if(isValidData(rec.Placement))
            inpString += strsPad(rec.Placement, 10)
          inpString += '\n';
        }
        return inpString;
      },

      //==
      POLLUTANTS: function(model) {
        let secStr = 'POLLUTANTS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += strsPad(rec.Units, 6)
          inpString += numsPad(rec.Cppt, 10)
          inpString += numsPad(rec.Cgw, 10)
          inpString += numsPad(rec.Crdii, 10)
          inpString += numsPad(rec.Kdecay, 10)
          
          if(isValidData(rec.SnowOnly))
            inpString += strsPad(rec.SnowOnly, 10)
          if(isValidData(rec.CoPollutant))
            inpString += strsPad(rec.CoPollutant, 10)
          if(isValidData(rec.CoFrac))
            inpString += numsPad(rec.CoFrac, 10)
          if(isValidData(rec.Cdwf))
            inpString += numsPad(rec.Cdwf, 10)
          if(isValidData(rec.Cinit))
            inpString += numsPad(rec.Cinit, 10)

          inpString += '\n';
        }
        return inpString;
      },

    //==
    LANDUSES: function(model) {
      let secStr = 'LANDUSES'
      let inpString = sectionCap(secStr)
      //
      for (let entry in model[secStr]) {
        var rec = model[secStr][entry]
        // If there is a description, save it.
        inpString += validDescription(rec)
        inpString += strsPad(entry, 16)
        
        if(isValidData(rec.Interval))
          inpString += strsPad(rec.Interval, 10)
        if(isValidData(rec.Available))
          inpString += strsPad(rec.Available, 10)
        if(isValidData(rec.Cleaned))
          inpString += strsPad(rec.Cleaned, 10)

        inpString += '\n';
      }
      return inpString;
    },
    
    //==
    COVERAGES: function(model) {
      let secStr = 'COVERAGES'
      let inpString = sectionCap(secStr)
      //
      for (let entry in model[secStr]) {
        var rec = model[secStr][entry]
        for (let el in model[secStr][entry]){
          inpString += strsPad(entry, 16)
          if(isValidData(rec[el].LandUse))
            inpString += strsPad(rec[el].LandUse, 16)
          if(isValidData(rec[el].Percent))
            inpString += numsPad(rec[el].Percent, 10)

          inpString += '\n';
        }
      }
      return inpString;
    },

    INFLOWS: function(model) {
      let secStr = 'INFLOWS'
      let inpString = sectionCap(secStr)
      //
      for (let entry in model[secStr]) {
        for (let constituent in model[secStr][entry]){
          var rec = model[secStr][entry][constituent]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += strsPad(constituent, 16)
          inpString += strsPad(rec.Timeseries===''?'""':rec.Timeseries, 16)
          if(isValidData(rec.Type))
            inpString += strsPad(rec.Type, 10)
          if(isValidData(rec.UnitsFactor))
            inpString += numsPad(rec.UnitsFactor, 10)
          if(isValidData(rec.ScaleFactor))
            inpString += numsPad(rec.ScaleFactor, 10)
          if(isValidData(rec.Baseline))
            inpString += numsPad(rec.Baseline, 10)
          if(isValidData(rec.Pattern))
            inpString += strsPad(rec.Pattern, 10)
          
          inpString += '\n';
        }
      }
      return inpString;
    },

    DWF: function(model) {
      let secStr = 'DWF'
      let inpString = sectionCap(secStr)
      //
      for (let entry in model[secStr]) {
        for (let constituent in model[secStr][entry]){
          var rec = model[secStr][entry][constituent]
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += strsPad(constituent, 16)
          if(isValidData(rec.Base))
            inpString += numsPad(rec.Base, 10)
          if(isValidData(rec.Pat1))
            inpString += strsPad(rec.Pat1===''?'""':'"'+rec.Pat1+'"', 16)
          if(isValidData(rec.Pat2))
            inpString += strsPad(rec.Pat2===''?'""':'"'+rec.Pat2+'"', 16)
          if(isValidData(rec.Pat3))
            inpString += strsPad(rec.Pat3===''?'""':'"'+rec.Pat3+'"', 16)
          if(isValidData(rec.Pat4))
            inpString += strsPad('"'+rec.Pat4+'"', 16)
          if(isValidData(rec.Pat5))
            inpString += strsPad('"'+rec.Pat5+'"', 16)
          if(isValidData(rec.Pat6))
            inpString += strsPad('"'+rec.Pat6+'"', 16)
          if(isValidData(rec.Pat7))
            inpString += strsPad('"'+rec.Pat7+'"', 16)

          inpString += '\n';
        }
      }
      return inpString;
    },

    //==
    PATTERNS: function(model) {
      let secStr = 'PATTERNS'
      let inpString = sectionCap(secStr)
      //
      for (let entry in model[secStr]) {
        var rec = model[secStr][entry]
        inpString += strsPad(entry, 16)
        inpString += strsPad(rec.Type, 10)

        for (let el in model[secStr][entry].Factors){
          inpString += numsPad(rec.Factors[el], 10)
        }
        inpString += '\n';
      }
      return inpString;
    },

    HYDROGRAPHS: function(model) {
      let secStr = 'HYDROGRAPHS'
      let inpString = sectionCap(secStr)
      //
      for (let entry in model[secStr]) {
        var rec = model[secStr][entry]
        // If there is a description, save it.
        inpString += validDescription(rec)
        // Write out the Raingage line of the hydrograph
        inpString += strsPad(entry, 16)
        inpString += strsPad(rec.Raingage, 16)
        inpString += '\n'

        // For each entry in the Months object, 
        // write out the data line for that entry
        for (let el in rec.Months){
          var mo = rec.Months[el]
          for (let ob in rec.Months[el]){
            inpString += strsPad(entry, 16)
            inpString += strsPad(el, 16)
            inpString += strsPad(ob, 16)
            inpString += numsPad(mo[ob].R, 10)
            inpString += numsPad(mo[ob].T, 10)
            inpString += numsPad(mo[ob].K, 10)
            if(isValidData(mo[ob].Dmax))
              inpString += numsPad(mo[ob].Dmax, 10)
            if(isValidData(mo[ob].Drec))
              inpString += numsPad(mo[ob].Drec, 10)
            if(isValidData(mo[ob].D0))
              inpString += numsPad(mo[ob].D0, 10)
            inpString += '\n'
          }
        }
      }
      return inpString;
    },
    
    RDII: function(model) {
      let secStr = 'RDII'
      let inpString = sectionCap(secStr)
      //
      for (let entry in model[secStr]) {
        var rec = model[secStr][entry]
        // If this is an invalid entry, do nothing:
        if(rec.UHgroup===''||rec.UHgroup==='""'||rec.UHgroup == null|| rec.SewerArea === 0){

        } else {
          // If there is a description, save it.
          inpString += validDescription(rec)
          inpString += strsPad(entry, 16)
          inpString += strsPad(rec.UHgroup===''?'""':rec.UHgroup, 16)
          inpString += numsPad(rec.SewerArea, 10)
  
          inpString += '\n'
        }
      }
      return inpString
    },

    //==
    LOADINGS: function(model) {
      let secStr = 'LOADINGS'
      let inpString = sectionCap(secStr)
      //
      for (let entry in model[secStr]) {
        var rec = model[secStr][entry]
        for (let el in model[secStr][entry]){
          inpString += strsPad(entry, 16)
          inpString += strsPad(rec[el].Pollutant, 16)
          inpString += numsPad(rec[el].InitLoad, 16)
          inpString += '\n'
        }
      }
      return inpString
    },

    //==
    CURVES: function(model) {
      let secStr = 'CURVES'
      let inpString = sectionCap(secStr)

      for (let curveType in model[secStr]) {
        for (let curveName in model[secStr][curveType]){
          let start = true
          for (let el in model[secStr][curveType][curveName]){
            inpString += strsPad(curveName, 16)
            if(start === true) {inpString += strsPad(curveType, 16); start = false}
            else {inpString += strsPad('', 16)}
            inpString += numsPad(model[secStr][curveType][curveName][el].x, 10)
            inpString += numsPad(model[secStr][curveType][curveName][el].y, 10)
            inpString += '\n'
          }
        }
      }
      //
      /*for (let entry in model[secStr]) {
        var rec = model[secStr][entry]
        inpString += strsPad(entry, 16)
        inpString += strsPad(rec.Type, 16)
        for (let el in model[secStr][entry].Curve){
          inpString += numsPad(rec.Curve[el].x, 10)
          inpString += numsPad(rec.Curve[el].y, 10)
        }
        inpString += '\n'
      }*/
      return inpString
    },

    //==
    TREATMENT: function(model) {
      let secStr = 'TREATMENT'
      let inpString = sectionCap(secStr)
      //
      for (let entry in model[secStr]) {
        var rec = model[secStr][entry]
        for (let el in model[secStr][entry]){
          inpString += strsPad(entry, 16)
          inpString += strsPad(el, 16)
          inpString += strsPad(rec[el], 10)
          inpString += '\n'
        }
      }
      return inpString
    },

    //==
    BUILDUP: function(model) {
      let secStr = 'BUILDUP'
      let inpString = sectionCap(secStr)
      //
      for (let entry in model[secStr]) {
        var rec = model[secStr][entry]
        for (let el in model[secStr][entry]){
          
          inpString += strsPad(entry, 16)
          inpString += strsPad(rec[el].Pollutant, 16)
          if(isValidData(rec[el].Function))
            inpString += strsPad(rec[el].Function, 10)
          if(isValidData(rec[el].Coeff1))
            inpString += numsPad(rec[el].Coeff1, 10)
          if(isValidData(rec[el].Coeff2))
            inpString += numsPad(rec[el].Coeff2, 10)
          if(isValidData(rec[el].Coeff3))
            inpString += numsPad(rec[el].Coeff3, 10)
          if(isValidData(rec[el].Normalizer))
            inpString += strsPad(rec[el].Normalizer, 10)

          /*inpString += strsPad(rec[el].Function, 10)
          inpString += numsPad(rec[el].Coeff1, 10)
          inpString += numsPad(rec[el].Coeff2, 10)
          inpString += numsPad(rec[el].Coeff3, 10)
          inpString += strsPad(rec[el].Normalizer, 10)*/

          inpString += '\n';
        }
      }
      return inpString;
    },

  //==
  WASHOFF: function(model) {
    let secStr = 'WASHOFF'
    let inpString = sectionCap(secStr)
    //
    for (let entry in model[secStr]) {
      var rec = model[secStr][entry]
      for (let el in model[secStr][entry]){
        inpString += strsPad(entry, 16)
        inpString += strsPad(rec[el].Pollutant, 16)
        if(isValidData(rec[el].Function))
          inpString += strsPad(rec[el].Function, 10)
        if(isValidData(rec[el].Coeff1))
          inpString += numsPad(rec[el].Coeff1, 10)
        if(isValidData(rec[el].Coeff2))
          inpString += numsPad(rec[el].Coeff2, 10)
        if(isValidData(rec[el].Ecleaning))
          inpString += numsPad(rec[el].Ecleaning, 10)
        if(isValidData(rec[el].Ebmp))
          inpString += strsPad(rec[el].Ebmp, 10)

        /*inpString += strsPad(rec[el].Function, 10)
        inpString += numsPad(rec[el].Coeff1, 10)
        inpString += numsPad(rec[el].Coeff2, 10)
        inpString += numsPad(rec[el].Ecleaning, 10)
        inpString += strsPad(rec[el].Ebmp, 10)*/
        inpString += '\n';
      }
    }
    return inpString;
  },

      //==
      TIMESERIES: function(model) {
        const secStr = 'TIMESERIES'
        var inpString = sectionCap(secStr)  
        // For every timeseries
        for (let entry in model[secStr]) {
          // For every element of the timeseries
          for(let el in model[secStr][entry]){
            var thisData = model[secStr][entry][el]
            // Check for the format of the object:
            var format = model[secStr][entry].swmmType

            inpString += strsPad(entry, 16)
            switch(format){
              // file formatted object
              case 'File':
                inpString += strsPad('FILE', 15)
                inpString += strsPad(thisData, 11)
                break
            // date formatted object
              case 'DateTime':
                inpString += strsPad(thisData.DateTime.toString(), 15)
                inpString += numsPad(thisData.Value, 11)
                break
            // date formatted object
              case 'Date':
                inpString += strsPad(thisData.DateTime, 15)
                inpString += numsPad(thisData.Value, 11)
                break
            // time formatted object
              case 'Time':
                inpString += numsPad(thisData.DateTime, 15)
                inpString += numsPad(thisData.Value, 11)
                break
            // non formatted object
              default:
                inpString += strsPad(thisData.DateTime.toString(), 15)
                inpString += numsPad(thisData.Value, 11)
                break
            }

            inpString += '\n';
          }
        }
        return inpString;
      },

      CONTROLS: function(model) {
        let secStr = 'CONTROLS'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          inpString += strsPad('RULE', 4)
          inpString += strsPad(entry, 16)
          inpString += '\n';
          if(Array.isArray(rec)){
            for(let el in rec){
              inpString += strsPad(rec[el], 0)
              inpString += '\n';
            }
          } 
        }
        return inpString;
      },

      REPORT: function(model) {
        let secStr = 'REPORT'
        let inpString = sectionCap(secStr)
        //
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          inpString += strsPad(entry, 21)
          if(Array.isArray(rec)){
            for(let el in rec){
              inpString += strsPad(rec[el], 0)
            }
          } else {
            inpString += strsPad(rec, 17)
          }
          inpString += '\n';
        }
        if(!isValidData(model.REPORT.SUBCATCHMENTS)){
          inpString += 'SUBCATCHMENTS  ALL\n'
        }
        if(!isValidData(model.REPORT.NODES)){
          inpString += 'NODES  ALL\n'
        }
        if(!isValidData(model.REPORT.LINKS)){
          inpString += 'LINKS  ALL\n'
        }
        return inpString;
      },

      MAP: function(model) {
        let secStr = 'MAP'
        let inpString = sectionCap(secStr)
        //
        if (!isValidData(model.MAP.DIMENSIONS) || !isValidData(model.MAP.DIMENSIONS.x1)){ return inpString}
        inpString += strsPad('DIMENSIONS', 21)
        inpString += numsPad(model[secStr].DIMENSIONS.x1, 10)
        inpString += numsPad(model[secStr].DIMENSIONS.y1, 10)
        inpString += numsPad(model[secStr].DIMENSIONS.x2, 10)
        inpString += numsPad(model[secStr].DIMENSIONS.y2, 10)
        
        inpString += '\n';
        return inpString;
      },

      COORDINATES: function(model) {
        let secStr = 'COORDINATES';
        let inpString = sectionCap(secStr)
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          inpString += strsPad(entry, 16)
          inpString += numsPad(rec.x, 18)
          inpString += numsPad(rec.y, 18)
          inpString += '\n';
        }
        return inpString;
      },

      VERTICES: function(model) {
        let secStr = 'VERTICES';
        let inpString = sectionCap(secStr)
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          for(let el in rec){
            inpString += strsPad(entry, 16)
            inpString += numsPad(rec[el].x, 18)
            inpString += numsPad(rec[el].y, 18)
            inpString += '\n';
          }
        }
        return inpString;
      },

      POLYGONS: function(model) {
        let secStr = 'POLYGONS';
        let inpString = sectionCap(secStr)
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          for(let el in rec){
            inpString += strsPad(entry, 16)
            inpString += numsPad(rec[el].x, 18)
            inpString += numsPad(rec[el].y, 18)
            inpString += '\n';
          }
        }
        return inpString;
      },

      SYMBOLS: function(model) {
        let secStr = 'SYMBOLS';
        let inpString = sectionCap(secStr)
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          inpString += strsPad(entry, 16)
          inpString += numsPad(rec.x, 18)
          inpString += numsPad(rec.y, 18)
          inpString += '\n';
        }
        return inpString;
      },

      LABELS: function(model) {
        let secStr = 'LABELS'
        let inpString = sectionCap(secStr)
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          inpString += numsPad(rec.x, 10)
          inpString += numsPad(rec.y, 10)
          inpString += strsPad('"'+rec.Label+'"', 16)
          inpString += strsPad(rec.Attrs, 16)
          inpString += '\n'
        }
        return inpString
      },

      BACKDROP: function(model) {
        let secStr = 'BACKDROP'
        let inpString = sectionCap(secStr)

        var rec = model[secStr]
        if(Array.isArray(rec)){
          rec.forEach((str)=>{
            inpString += str
            inpString += '\n'
          })
        }

        return inpString
      },

      TAGS: function(model) {
        let secStr = 'TAGS'
        let inpString = sectionCap(secStr)
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          inpString += strsPad(rec.Type, 16)
          inpString += strsPad(rec.ID, 16)
          inpString += strsPad(rec.Tag, 16)
          inpString += '\n'
        }
        return inpString
      },

      LID_CONTROLS: function(model) {
        let secStr = 'LID_CONTROLS'
        let inpString = sectionCap(secStr)
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          inpString += strsPad(entry, 16)
          inpString += strsPad(rec.Type, 3)
          inpString += '\n'
          if(isValidData(rec.SURFACE)){
            inpString += strsPad(entry, 16)
            inpString += strsPad('SURFACE', 10)
            inpString += numsPad(rec.SURFACE.StorHt, 10)
            inpString += numsPad(rec.SURFACE.VegFrac, 10)
            inpString += numsPad(rec.SURFACE.Rough, 10)
            inpString += numsPad(rec.SURFACE.Slope, 10)
            inpString += numsPad(rec.SURFACE.Xslope, 10)
            inpString += '\n'
          }
          if(isValidData(rec.SOIL)){
            inpString += strsPad(entry, 16)
            inpString += strsPad('SOIL', 10)
            inpString += numsPad(rec.SOIL.Thick, 10)
            inpString += numsPad(rec.SOIL.Por, 10)
            inpString += numsPad(rec.SOIL.FC, 10)
            inpString += numsPad(rec.SOIL.WP, 10)
            inpString += numsPad(rec.SOIL.Ksat, 10)
            inpString += numsPad(rec.SOIL.Kcoeff, 10)
            inpString += numsPad(rec.SOIL.Suct, 10)
            inpString += '\n'
          }
          if(isValidData(rec.PAVEMENT)){
            inpString += strsPad(entry, 16)
            inpString += strsPad('PAVEMENT', 10)
            inpString += numsPad(rec.PAVEMENT.Thick, 10)
            inpString += numsPad(rec.PAVEMENT.Vratio, 10)
            inpString += numsPad(rec.PAVEMENT.FracImp, 10)
            inpString += numsPad(rec.PAVEMENT.Perm, 10)
            inpString += numsPad(rec.PAVEMENT.Vclog, 10)
            inpString += '\n'
          }
          if(isValidData(rec.STORAGE)){
            inpString += strsPad(entry, 16)
            inpString += strsPad('STORAGE', 10)
            inpString += numsPad(rec.STORAGE.Height, 10)
            inpString += numsPad(rec.STORAGE.Vratio, 10)
            inpString += numsPad(rec.STORAGE.Seepage, 10)
            inpString += numsPad(rec.STORAGE.Vclog, 10)
            inpString += '\n'
          }
          if(isValidData(rec.DRAIN)){
            inpString += strsPad(entry, 16)
            inpString += strsPad('DRAIN', 10)
            inpString += numsPad(rec.DRAIN.Coeff, 10)
            inpString += numsPad(rec.DRAIN.Expon, 10)
            inpString += strsPad(rec.DRAIN.Offset, 10)
            inpString += numsPad(rec.DRAIN.Delay, 10)
            inpString += numsPad(rec.DRAIN.Open, 10)
            inpString += numsPad(rec.DRAIN.Close, 10)
            inpString += strsPad(rec.DRAIN.Curve, 16)
            inpString += '\n'
          }
          if(isValidData(rec.DRAINMAT)){
            inpString += strsPad(entry, 16)
            inpString += strsPad('DRAINMAT', 10)
            inpString += numsPad(rec.DRAINMAT.Thick, 10)
            inpString += numsPad(rec.DRAINMAT.Vratio, 10)
            inpString += numsPad(rec.DRAINMAT.Rough, 10)
            inpString += '\n'
          }
        }
        return inpString;
      },

      LID_USAGE: function(model) {
        let secStr = 'LID_USAGE'
        let inpString = sectionCap(secStr)
        for (let entry in model[secStr]) {
          var rec = model[secStr][entry]
          for (let entry2 in rec){
            let rec2 = rec[entry2]
            inpString += strsPad(entry, 16)
            inpString += strsPad(entry2, 16)
            inpString += numsPad(rec2.Number, 7)
            inpString += numsPad(rec2.Area, 10)
            inpString += numsPad(rec2.Width, 10)
            inpString += numsPad(rec2.InitSat, 10)
            inpString += numsPad(rec2.FromImp, 10)
            inpString += numsPad(rec2.ToPerv, 10)
            if(isValidData(rec2.RptFile))
              inpString += strsPad(rec2.RptFile, 24)
            if(isValidData(rec2.DrainTo))
              inpString += strsPad(rec2.DrainTo, 16)
            if(isValidData(rec2.FromPerv))
              inpString += numsPad(rec2.FromPerv, 10)
            
            inpString += '\n'
          }
        }
        return inpString
      },

      PCS: function(model) {
        let secStr = 'PCS';
        let inpString = sectionCap(secStr)
        for (let el in model[secStr]) {
          var rec = model[secStr][el]
          inpString += strsPad(el, 16)
          inpString += strsPad(rec.proj, 10)
          inpString += numsPad(rec.zone, 18)
          inpString += strsPad(rec.datum, 18)
          inpString += strsPad(rec.units, 18)
          inpString += strsPad(rec.defs, 10)
          inpString += '\n';
        }
        return inpString;
      },

      TRANSFORM: function(model) {
        let secStr = 'TRANSFORM';
        let inpString = sectionCap(secStr)
        for (let el in model[secStr]) {
          var rec = model[secStr][el]
          inpString += strsPad(el, 16)
          inpString += numsPad(rec.x, 20)
          inpString += numsPad(rec.y, 20)
          inpString += numsPad(rec.size, 20)
          inpString += numsPad(rec.rotation, 20)
          inpString += '\n';
        }
        return inpString;
      },
    }

    // numsPad
    // takes a number and a pad length and translates it and pads it,
    // with an extra space at the end.
    function numsPad(number, padLength){
      return number.toString().padEnd(padLength, ' ') + ' '
    }

    // stringsPad
    // takes a string and a pad length and pads it,
    // with an extra space at the end.
    function strsPad(data, padLength){
      return data.padEnd(padLength, ' ') + ' '
    }

    // sectionCap
    // returns a divider between the section header and the contents.
    // This should be variable depending upon section type.
    function sectionCap(section){
      var thisStr = ''
      if(isValidData(section)){
        if(section == 'LID_USAGE')
          thisStr += '[LID_USAGE]\n;;Subcatchment   LID Process      Number  Area       Width      InitSat    FromImp    ToPerv     RptFile                  DrainTo          FromPerv  \n'
        if(section == 'LID_CONTROLS')
          thisStr += '[LID_CONTROLS]\n;;Name           Type/Layer Parameters\n'
        if(section == 'TAGS')
          thisStr += '[TAGS]\n'
        if(section == 'BACKDROP')
          thisStr += '[BACKDROP]\n'
        if(section == 'LABELS')
          thisStr += '[LABELS]\n;;X-Coord          Y-Coord            Label           \n'
        if(section == 'CONTROLS')
          thisStr += '[CONTROLS]\n'
        if(section == 'CURVES')
          thisStr += '[CURVES]\n;;Name           Type       X-Value    Y-Value   \n'
        if(section == 'TREATMENT')
          thisStr += '[TREATMENT]\n;;Node           Pollutant        Function  \n'
        if(section == 'LOADINGS')
          thisStr += '[LOADINGS]\n;;Subcatchment   Pollutant        Buildup   \n'
        if(section == 'HYDROGRAPHS')
          thisStr += '[HYDROGRAPHS]\n;;Hydrograph     Rain Gage/Month  Response R        T        K        Dmax     Drecov   Dinit   \n'
        if(section == 'RDII')
          thisStr += '[RDII]\n;;Node           Unit Hydrograph  Sewer Area\n'
        if(section == 'PATTERNS')
          thisStr += '[PATTERNS]\n;;Name           Type       Multipliers\n'
        if(section == 'DWF')
          thisStr += '[DWF]\n;;Node           Constituent      Baseline   Patterns  \n'
        if(section == 'INFLOWS')
          thisStr += '[INFLOWS]\n;;Node           Constituent      Time Series      Type     Mfactor  Sfactor  Baseline Pattern\n'
        if(section == 'LOSSES')
          thisStr += '[LOSSES]\n;;Link           Kentry     Kexit      Kavg       Flap Gate  Seepage   \n'
        if(section == 'TRANSECTS')
          thisStr += '[TRANSECTS]\n;;Transect Data in HEC-2 format\n'
        if(section == 'OUTLETS')
          thisStr += '[OUTLETS]\n;;Name           From Node        To Node          Offset     Type            QTable/Qcoeff    Qexpon     Gated   \n'
        if(section == 'WEIRS')
          thisStr += '[WEIRS]\n;;Name           From Node        To Node          Type         CrestHt    Qcoeff     Gated    EndCon   EndCoeff   Surcharge  RoadWidth  RoadSurf   Coeff. Curve\n'
        if(section == 'ORIFICES')
          thisStr += '[ORIFICES]\n;;Name           From Node        To Node          Type         Offset     Qcoeff     Gated    CloseTime \n'
        if(section == 'PUMPS')
          thisStr += '[PUMPS]\n;;Name           From Node        To Node          Pump Curve       Status   Sartup Shutoff \n'
        if(section == 'DIVIDERS')
          thisStr += '[DIVIDERS]\n;;Name           Elevation  Diverted Link    Type       Parameters\n'
        if(section == 'STORAGE')
          thisStr += '[STORAGE]\n;;Name           Elev.    MaxDepth   InitDepth  Shape      Curve Name/Params            N/A      Fevap    Psi      Ksat     IMD     \n'
        if(section == 'SNOWPACKS')
          thisStr += '[SNOWPACKS]\n;;Name           Surface    Parameters\n'
        if(section == 'GWF')
          thisStr += '[GWF]\n;;Subcatchment   Flow    Equation\n'
        if(section == 'GROUNDWATER')
          thisStr += '[GROUNDWATER]\n;;Subcatchment   Aquifer          Node             Esurf  A1     B1     A2     B2     A3     Dsw    Egwt   Ebot   Wgr    Umc        \n'
        if(section == 'AQUIFERS')
          thisStr += '[AQUIFERS]\n;;Name           Por    WP     FC     Ksat   Kslope Tslope ETu    ETs    Seep   Ebot   Egw    Umc    ETupat \n'
        if(section == 'TEMPERATURE')
          thisStr += '[TEMPERATURE]\n;;Data Element     Values     \n'
        if(section == 'SYMBOLS')
          thisStr += '[SYMBOLS]\n;;Gage           X-Coord            Y-Coord           \n'
        if(section == 'POLYGONS')
          thisStr += '[POLYGONS]\n;;Subcatchment   X-Coord            Y-Coord           \n'
        if(section == 'VERTICES')
          thisStr += '[VERTICES]\n;;Link           X-Coord            Y-Coord           \n'
        if(section == 'MAP')
          thisStr += '[MAP]\n'
        if(section == 'REPORT')
          thisStr += '[REPORT]\n;;Reporting Options    \n'
        if(section == 'WASHOFF')
          thisStr += '[WASHOFF]\n;;Land Use       Pollutant        Function   Coeff1     Coeff2     Ecleaning  Ebmp      \n'   
        if(section == 'BUILDUP')
          thisStr += '[BUILDUP]\n;;Land Use       Pollutant        Function   Coeff1     Coeff2     Coeff3     Normalizer\n '
        if(section == 'COVERAGES')
          thisStr += '[COVERAGES]\n;;Subcatchment   Land Use         Percent   \n'
        if(section == 'LANDUSES')
          thisStr += '[LANDUSES]\n;;               Cleaning   Fraction   Last      \n;;Land Use       Interval   Available  Cleaned   \n'
        if(section == 'POLLUTANTS')
          thisStr += '[POLLUTANTS]\n;;Pollutant      Units  Cppt       Cgw        Crdii      Kdecay     SnowOnly   Co-Pollutant     Co-Frac    Cdwf       Cinit     \n'
        if(section == 'INFILTRATION')
          thisStr += '[INFILTRATION]\n;;Subcatchment   Param1     Param2     Param3     Param4     Param5       \n'
        if(section == 'SUBAREAS')
          thisStr += '[SUBAREAS]\n;;Subcatchment   N-Imperv   N-Perv     S-Imperv   S-Perv     PctZero    RouteTo    PctRouted \n'
        if(section == 'SUBCATCHMENTS')
          thisStr += '[SUBCATCHMENTS]\n;;Subcatchment   Rain Gage        Outlet           Area     %Imperv  Width    %Slope   CurbLen  Snow Pack        \n'
        if(section == 'XSECTIONS')
          thisStr += '[XSECTIONS]\n;;Link           Shape        Geom1            Geom2      Geom3      Geom4      Barrels   \n'
        if(section == 'EVAPORATION')
          thisStr += '[EVAPORATION]\n;;Evap Data      Parameters    \n'
        if(section == 'COORDINATES')
          thisStr += '[COORDINATES]\n;;Node           X-Coord            Y-Coord           \n'
        if(section == 'OUTFALLS')
          thisStr += '[OUTFALLS]\n;;Outfall        Invert     Type       Stage Data       Gated   \n'
        if(section == 'CONDUITS')
          thisStr += '[CONDUITS]\n;;Conduit        From Node        To Node          Length     Roughness  InOffset   OutOffset  InitFlow   MaxFlow   \n'   
        if(section == 'STREETS')
          thisStr += '[STREETS]\n;;Street         Tcrown            Hcurb            Sx         nRoad   \n'   
        if(section == 'INLETS')
          thisStr += '[INLETS]\n;;Name           Type             Parameters:   \n'  
        if(section == 'INLET_USAGE')
          thisStr += '[INLET_USAGE]\n;;Conduit        Inlet            Node             Number    %Clogged  Qmax      aLocal    wLocal    Placement   \n'  
        if(section == 'TIMESERIES')
          thisStr += '[TIMESERIES]\n;;Time Series    Date/Time       Value     \n'   
        if(section == 'RAINGAGES')
          thisStr += '[RAINGAGES]\n;;Gage           Format    Interval SCF      Source\n'   
        if(section == 'OPTIONS')
          thisStr += '[OPTIONS]\n;;Option             Value\n'
        if(section == 'JUNCTIONS')
          thisStr += '[JUNCTIONS]\n;;Junction       Invert     Dmax       Dinit      Dsurch     Aponded   \n'
        if(section == 'PCS')
          thisStr += ';[PCS]\n;;Name           proj      zone                datum              units              defs   \n'
        if(section == 'TRANSFORM')
          thisStr += ';[TRANSFORM]\n;;Name           x                    y                    size                 rotation  \n'
      }
      thisStr += ';;------------------------------------------------------------------------------------------------------------------\n'
      
      return thisStr
    }

    // Get a valid description string from an object.
    function validDescription(data){
      if(isValidData(data.Description)){
        if (data.Description.length > 0){
          return ';' + data.Description + '\n';
        } 
      }
      return '';
    }
    
    // This is a function that accepts a model section key and
    // returns a string that can be output into an .inp
    // file. This is a temporary function to take care of 
    // sections I haven't implemented yet.
    function secToStr(model, key){
      let thisString = '['+ key + ']\n'
      
      if (model[key] ){
        model[key].forEach((val, i)=>{
          thisString += val + '\n';
        })
        thisString += '\n';
      }

      return thisString
    }

    // Loop through each of the keys of the
    // contents of the model.
    // This should remain in place even after I've covered all
    // the sections to assist in
    // translation and future compatibility.
    let validSecArray = ['TITLE',           'OPTIONS',      'RAINGAGES', 
                          'TEMPERATURE',    'EVAPORATION', 
                          'SUBCATCHMENTS',  'SUBAREAS',     'INFILTRATION', 
                          'AQUIFERS',       'GROUNDWATER',  'GWF', 
                          'SNOWPACKS',      'JUNCTIONS',    'OUTFALLS', 
                          'STORAGE',        'DIVIDERS',     'CONDUITS', 
                          'PUMPS',          'ORIFICES',     'WEIRS',
                          'OUTLETS',        'XSECTIONS',    'TRANSECTS', 
                          'LOSSES',         'STREETS',      'INLETS',
                          'INLET_USAGE',    'POLLUTANTS',   'LANDUSES', 
                          'BUILDUP',        'WASHOFF',      'TREATMENT',
                          'COVERAGES',      'INFLOWS',      'DWF',          
                          'PATTERNS',       'HYDROGRAPHS',  'RDII',         
                          'LOADINGS',       'CURVES',       'TIMESERIES',
                          'CONTROLS',       'REPORT',       'MAP',
                          'COORDINATES',    'VERTICES',     'POLYGONS', 
                          'SYMBOLS',        'LABELS',       'BACKDROP',
                          'TAGS',           'LID_CONTROLS', 'LID_USAGE'
                        ]

    // There should also be an array sorted in the order of the
    // sections as they need to be written to the file. For example,
    // if you load the conduits before you load nodes, the system 
    // will throw a fail.
    let knownSecArray = [   // Input file model variables. Related to a header in .inp file.
      "TITLE",              "OPTIONS",            "RAINGAGES",
      "TEMPERATURE",        "EVAPORATION",        
      "SUBCATCHMENTS",      "SUBAREAS",           "INFILTRATION",
      "AQUIFERS",           "GROUNDWATER",        "GWF",
      "SNOWPACKS",          "JUNCTIONS",          "OUTFALLS",
      "STORAGE",            "DIVIDERS",           "CONDUITS",
      "PUMPS",              "ORIFICES",           "WEIRS",
      "OUTLETS",            "XSECTIONS",          "TRANSECTS",
      "LOSSES",             'STREETS',            'INLETS',
      'INLET_USAGE',        "POLLUTANTS",         "LANDUSES",
      "BUILDUP",            "WASHOFF",            "COVERAGES",
      "INFLOWS",            "DWF",                "PATTERNS",
      "HYDROGRAPHS",        "RDII",               "LOADINGS",
      "TREATMENT",          "CURVES",             "TIMESERIES",
      "CONTROLS",           "REPORT",             "MAP",
      "COORDINATES",        "VERTICES",           "POLYGONS",
      "SYMBOLS",            "LABELS",             "BACKDROP",
      "TAGS",               "PROFILE",            "FILE",
      "LID_CONTROLS",       "LID_USAGE",          "EVENT",
      // -------------------------------------------------------
      // swmmNode section
      // -------------------------------------------------------
      "PCS",                "TRANSFORM"
    ]

    // Array of sections for swmmNode single-file TITLE sections.
    let swmmNodeSectionArray = [
      "PCS",                "TRANSFORM"
    ]

    // Create a TITLE section string. This will hold all of the
    // extra objects, and it will get prepended with the title after all
    // of the other sections have been parsed.
    let TITLE_string = ''
    let SUBTITLE_string = ''
    // Now toss the array at the object. For each element of the array,
    // look for that element in the object. If there is an element of that 
    // kind associated with the model, write out the results to
    // the file.
    // Keep in mind we are now using arrays for unkeyed entries, instead
    // of creating keys for them. There is currently no need to create
    // and manage keys for those objects.
    knownSecArray.forEach((element, index) => {
      if(validSecArray.includes(element) && element !== 'TITLE'){
        if(model !== undefined && model[element] !== undefined && Object.keys(model[element]).length > 0){
          fullString += parser[element](model) + '\n'
          fullString += '\n';
        }
      } else if (validSecArray.includes(element) && element === 'TITLE') { 
        if(model !== undefined && model[element] !== undefined && Object.keys(model[element]).length > 0){
          TITLE_string += parser[element](model) + '\n'
          TITLE_string += '\n';
        }
      } else {
        // This is the portion that handles unknown sections. Let's use
        // these as arrays so we dont create and manage keys.
        // 
        if(model !== undefined && model[element] !== undefined)
          // If the section is for swmmNode, place it at the end of the TITLE section string.
          if(swmmNodeSectionArray.includes(element)){
            TITLE_string += parser[element](model) + '\n'
            TITLE_string += '\n';
          }
          else if(model[element].length > 0){
            fullString += secToStr(model, element) + '\n'
            fullString += '\n';
          }
      }
    })

    // Prepend fullString with TITLE_string
    fullString = TITLE_string + fullString

    return fullString;
  }


}
  

function isValidData(data){
  if(typeof data !== 'undefined' && data !== null)
    return true
  return false
}