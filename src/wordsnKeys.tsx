//-----------------------------------------------------------------------------
//   wordsnKeys.js, translated from swmm 5.2
//
//   Project: swmmReact
//   Version: swmmReact (0.2) for EPA-SWMM (5.2)
//   Date:    09/16/22  (Build 0.2)
//   Author:  L. Rossman
//   Translation: I. Gardner
//
//   Text strings
//
//-----------------------------------------------------------------------------

var FMT01 =
 "\tswmm5 <input file> <report file> <output file>\n"

var FMT03 = " There are errors.\n"
var FMT04 = " There are warnings.\n"
var FMT08 = 
  "\n  EPA STORM WATER MANAGEMENT MODEL - VERSION 5.2 (Build 5.2.1)"
var FMT09 = 
  "\n  ------------------------------------------------------------"
var FMT10 = "\n"
var FMT11 = "\n    Cannot use duplicate file names."
var FMT12 = "\n    Cannot open input file "
var FMT13 = "\n    Cannot open report file "
var FMT14 = "\n    Cannot open output file "
var FMT15 = "\n    Cannot open temporary output file"
var FMT16 = "\n  ERROR %d detected. Execution halted."
var FMT17 = "at line %ld of input file:"
var FMT18 = "at line %ld of %s] section:"
var FMT19 = "\n  Maximum error count exceeded."
var FMT20 = "\n\n  Analysis begun on:  %s"
var FMT20a = "  Analysis ended on:  %s"
var FMT21  = "  Total elapsed time: "

// Warning messages
var WARN01 = "WARNING 01: wet weather time step reduced to recording interval for Rain Gage"
var WARN02 = "WARNING 02: maximum depth increased for Node"
var WARN03 = "WARNING 03: negative offset ignored for Link"
var WARN04 = "WARNING 04: minimum elevation drop used for Conduit"
var WARN05 = "WARNING 05: minimum slope used for Conduit"
var WARN06 = "WARNING 06: dry weather time step increased to the wet weather time step"
var WARN07 = "WARNING 07: routing time step reduced to the wet weather time step"
var WARN08 = "WARNING 08: elevation drop exceeds length for Conduit"
var WARN09 = "WARNING 09: time series interval greater than recording interval for Rain Gage"
var WARN10a = 
"WARNING 10: crest elevation is below downstream invert for regulator Link"
var WARN10b = 
"WARNING 10: crest elevation raised to downstream invert for regulator Link"
var WARN11 = "WARNING 11: non-matching attributes in Control Rule"
var WARN12 = 
"WARNING 12: inlet removed due to unsupported shape for Conduit"

// Output keywords
// When using these in a drop-down, write as:
// <select className = 'UIparams swmmDropDown' value={selected} onChange={handleChange} >{RouteModelWords.map(( value , index ) => <option className = 'UIparams' key={index} value={index}>{value}</option>)}
// When used in a transformer, remember the index. The parser operates on the index and not the string description.
// These output keyword strings are mostly for output ops and menus.
//
// Pair these descriptive terms with appropriate units.
/////////////////////
export const outputDataWords = {
  SUBCATCH: ['Rainfall',
  'Snow depth',
  'Evaporation loss',
  'Infiltration loss',
  'Runoff rate',
  'Groundwater outflow',
  'Groundwater elevation',
  'Soil moisture',
  'Pollutant washoff'],
  NODE: ['Depth above invert',
  'Hydraulic head',
  'Volume stored & ponded',
  'Lateral inflow',
  'Total inflow',
  'Overflow'],
  LINK : ['Flow rate',
  'Flow depth',
  'Flow velocity',
  'Froude number',
  'Capacity'],
  SYS: ['Air temperature',
  'Rainfall',
  'Snow depth',
  'Infiltration',
  'Runoff',
  'Dry weather inflow',
  'Groundwater inflow',
  'RDII inflow',
  'External inflow',
  'Total lateral inflow',
  'Flooding outflow',
  'Outfall outflow',
  'Storage volume',
  'Evaporation rate',
  'Potential ET']
}

///////////////////////////////
// Units associated with outputData
// For entries with the pattern (d)=>{FlowUnitWords(d)}:
// d: is the value found in an parseInfo(outbin) result for
//  OpeningRecords.FlowUnitCode or in
//  objects.POLLUT.properties[0]
// Despite this being the only property of a pollut, it should still
// be an array to match the object structure of links, nodes, and areas.
// 
export const outputDataUnitsWords = {
  SUBCATCH: [
    { US: ()=>'in/hr', SI: ()=>'mm/hr' },
    { US: ()=>'inches', SI: ()=>'mm' },
    { US: ()=>'in/hr', SI: ()=>'mm/hr' },
    { US: ()=>'in/hr', SI: ()=>'mm/hr' },
    { US: (d:number)=>{return FlowUnitWords[d]}, SI: (d:number)=>{return FlowUnitWords[d]} },
    { US: (d:number)=>{return FlowUnitWords[d]}, SI: (d:number)=>{return FlowUnitWords[d]} },
    { US: ()=>'feet', SI: ()=>'meters' },
    { US: ()=>'unitless', SI: ()=>'unitless' },
    { US: (d:number)=>{return QualUnitsWords[d]}, SI: (d:number)=>{return QualUnitsWords[d]} }
  ],
  NODE: [
    { US: ()=>'feet', SI: ()=>'meters' },
    { US: ()=>'feet', SI:()=> 'meters' },
    { US: ()=>'ft^3', SI: ()=>'m^3' },
    { US: (d:number)=>{return FlowUnitWords[d]}, SI: (d:number)=>{return FlowUnitWords[d]} },
    { US: (d:number)=>{return FlowUnitWords[d]}, SI: (d:number)=>{return FlowUnitWords[d]} },
    { US: (d:number)=>{return FlowUnitWords[d]}, SI: (d:number)=>{return FlowUnitWords[d]} }
  ],
  LINK: [
    { US: (d:number)=>{return FlowUnitWords[d]}, SI: (d:number)=>{return FlowUnitWords[d]} },
    { US: ()=>'feet', SI: ()=>'meters' },
    { US: ()=>'ft/s', SI: ()=>'m/s' },
    { US: ()=>'unitless', SI: ()=>'unitless' },
    { US: ()=>'unitless', SI: ()=>'unitless' },
  ],
  SYS: [
    { US: ()=>'F', SI: ()=>'C' },
    { US: ()=>'in/hr', SI: ()=>'mm/hr' },
    { US: ()=>'inches', SI: ()=>'mm' },
    { US: ()=>'in/hr', SI: ()=>'mm/hr' },
    { US: (d:number)=>{return FlowUnitWords[d]}, SI: (d:number)=>{return FlowUnitWords[d]} },

    { US: (d:number)=>{return FlowUnitWords[d]}, SI: (d:number)=>{return FlowUnitWords[d]} },
    { US: (d:number)=>{return FlowUnitWords[d]}, SI: (d:number)=>{return FlowUnitWords[d]} },
    { US: (d:number)=>{return FlowUnitWords[d]}, SI: (d:number)=>{return FlowUnitWords[d]} },
    { US: (d:number)=>{return FlowUnitWords[d]}, SI: (d:number)=>{return FlowUnitWords[d]} },
    { US: (d:number)=>{return FlowUnitWords[d]}, SI: (d:number)=>{return FlowUnitWords[d]} },

    { US: (d:number)=>{return FlowUnitWords[d]}, SI: (d:number)=>{return FlowUnitWords[d]} },
    { US: (d:number)=>{return FlowUnitWords[d]}, SI: (d:number)=>{return FlowUnitWords[d]} },
    { US: ()=>'ft^3', SI: ()=>'m^3' },
    { US: ()=>'in/hr', SI: ()=>'mm/hr' },
    { US: ()=>'in/hr', SI: ()=>'mm/hr' }
  ]
}

// Analysis Option Keywords
var  w_FLOW_UNITS        = "FLOW_UNITS"
var  w_INFIL_MODEL       = "INFILTRATION"
var  w_ROUTE_MODEL       = "FLOW_ROUTING"
var  w_START_DATE        = "START_DATE"
var  w_START_TIME        = "START_TIME"
var  w_END_DATE          = "END_DATE"
var  w_END_TIME          = "END_TIME"
var  w_REPORT_START_DATE = "REPORT_START_DATE"
var  w_REPORT_START_TIME = "REPORT_START_TIME"
var  w_SWEEP_START       = "SWEEP_START"
var  w_SWEEP_END         = "SWEEP_END"
var  w_START_DRY_DAYS    = "DRY_DAYS"
var  w_WET_STEP          = "WET_STEP"
var  w_DRY_STEP          = "DRY_STEP"
var  w_ROUTE_STEP        = "ROUTING_STEP"
var  w_REPORT_STEP       = "REPORT_STEP"
var  w_RULE_STEP         = "RULE_STEP"
var  w_ALLOW_PONDING     = "ALLOW_PONDING"
var  w_INERT_DAMPING     = "INERTIAL_DAMPING"
var  w_SLOPE_WEIGHTING   = "SLOPE_WEIGHTING"
var  w_VARIABLE_STEP     = "VARIABLE_STEP"
var  w_NORMAL_FLOW_LTD   = "NORMAL_FLOW_LIMITED"
var  w_LENGTHENING_STEP  = "LENGTHENING_STEP"
var  w_MIN_SURFAREA      = "MIN_SURFAREA"
var  w_COMPATIBILITY     = "COMPATIBILITY"
var  w_SKIP_STEADY_STATE = "SKIP_STEADY_STATE"
var  w_TEMPDIR           = "TEMPDIR"
var  w_IGNORE_RAINFALL   = "IGNORE_RAINFALL"
var  w_FORCE_MAIN_EQN    = "FORCE_MAIN_EQUATION"
var  w_LINK_OFFSETS      = "LINK_OFFSETS"
var  w_MIN_SLOPE         = "MIN_SLOSYSPE"
var  w_IGNORE_SNOWMELT   = "IGNORE_SNOWMELT"
var  w_IGNORE_GWATER     = "IGNORE_GROUNDWATER"
var  w_IGNORE_ROUTING    = "IGNORE_ROUTING"
var  w_IGNORE_QUALITY    = "IGNORE_QUALITY"
var  w_MAX_TRIALS        = "MAX_TRIALS"
var  w_HEAD_TOL          = "HEAD_TOLERANCE"
var  w_SYS_FLOW_TOL      = "SYS_FLOW_TOL"
var  w_LAT_FLOW_TOL      = "LAT_FLOW_TOL"
var  w_IGNORE_RDII       = "IGNORE_RDII"
var  w_MIN_ROUTE_STEP    = "MINIMUM_STEP"
var  w_NUM_THREADS       = "THREADS"
var  w_SURCHARGE_METHOD  = "SURCHARGE_METHOD"

// Flow Units
var  w_CFS               = "CFS"
var  w_GPM               = "GPM"
var  w_MGD               = "MGD"
var  w_CMS               = "CMS"
var  w_LPS               = "LPS"
var  w_MLD               = "MLD"

// Flow Routing Methods
var  w_NF                = "NF"
var  w_KW                = "KW"
var  w_EKW               = "EKW"
var  w_DW                = "DW"

var  w_STEADY            = "STEADY"
var  w_KINWAVE           = "KINWAVE"
var  w_XKINWAVE          = "XKINWAVE"
var  w_DYNWAVE           = "DYNWAVE"

// Surcharge Methods
var  w_EXTRAN            = "EXTRAN"
var  w_SLOT              = "SLOT"

// Infiltration Methods
var  w_HORTON            = "HORTON"
var  w_MOD_HORTON        = "MODIFIED_HORTON"
var  w_GREEN_AMPT        = "GREEN_AMPT"
var  w_MOD_GREEN_AMPT    = "MODIFIED_GREEN_AMPT"
var  w_CURVE_NUMEBR      = "CURVE_NUMBER"

// Normal Flow Criteria
var  w_SLOPE             = "SLOPE"
var  w_FROUDE            = "FROUDE"
var  w_BOTH              = "BOTH"

// Snowmelt Data Keywords
var  w_WINDSPEED         = "WINDSPEED"
var  w_SNOWMELT          = "SNOWMELT"
var  w_ADC               = "ADC"
var  w_PLOWABLE          = "PLOWABLE"

// Evaporation Data Options
var  w_CONSTANT          = "CONSTANT"
var  w_TIMESERIES        = "TIMESERIES"
var  w_TEMPERATURE       = "TEMPERATURE"
var  w_FILE              = "FILE"
var  w_RECOVERY          = "RECOVERY"
var  w_DRYONLY           = "DRY_ONLY"

// DWF Time Pattern Types
var  w_MONTHLY           = "MONTHLY"
var  w_DAILY             = "DAILY"
var  w_HOURLY            = "HOURLY"
var  w_WEEKEND           = "WEEKEND"

// Rainfall Record Types
var  w_INTENSITY         = "INTENSITY"
//var  w_VOLUME            = "VOLUME" // Already decalred in pump curve.
var  w_CUMULATIVE        = "CUMULATIVE"

// Unit Hydrograph Types
var  w_SHORT             = "SHORT"
var  w_MEDIUM            = "MEDIUM"
var  w_LONG              = "LONG"

// Internal Runoff Routing Options
var  w_OUTLET            = "OUTLET"
var  w_IMPERV            = "IMPERV"
var  w_PERV              = "PERV"

// Outfall Node Types
var  w_FREE              = "FREE"
var  w_FIXED             = "FIXED"
//var  w_TIDAL             = "TIDAL" // Already declared in curve types.
var  w_CRITICAL          = "CRITICAL"
var  w_NORMAL            = "NORMAL"

// Flow Divider Node Types
var  w_FUNCTIONAL        = "FUNCTIONAL"
var  w_TABULAR           = "TABULAR"
var  w_CUTOFF            = "CUTOFF"
var  w_OVERFLOW          = "OVERFLOW"

// Storage Node Shapes
var  w_CYLINDRICAL       = "CYLINDRICAL"
var  w_CONICAL           = "CONICAL"
var  w_PARABOLOID        = "PARABOLIC"
var  w_PYRAMIDAL         = "PYRAMIDAL"

// Pump Curve Types
var  w_TYPE1             = "TYPE1"
var  w_TYPE2             = "TYPE2"
var  w_TYPE3             = "TYPE3"
var  w_TYPE4             = "TYPE4"
var  w_TYPE5             = "TYPE5"
var  w_IDEAL             = "IDEAL"

// Pump Curve Variables
var  w_VOLUME            = "VOLUME"
var  w_DEPTH             = "DEPTH"
var  w_HEAD              = "HEAD"

// Orifice Types
var  w_SIDE              = "SIDE"
var  w_BOTTOM            = "BOTTOM"

// Weir Types
var  w_TRANSVERSE        = "TRANSVERSE"
var  w_SIDEFLOW          = "SIDEFLOW"
var  w_VNOTCH            = "V-NOTCH"
var  w_ROADWAY           = "ROADWAY"

// Conduit Cross-Section Shapes
var  w_DUMMY             = "DUMMY"
var  w_CIRCULAR          = "CIRCULAR"
var  w_FILLED_CIRCULAR   = "FILLED_CIRCULAR"
var  w_RECT_CLOSED       = "RECT_CLOSED"
var  w_RECT_OPEN         = "RECT_OPEN"
var  w_TRAPEZOIDAL       = "TRAPEZOIDAL"
var  w_TRIANGULAR        = "TRIANGULAR"
var  w_PARABOLIC         = "PARABOLIC"
var  w_POWERFUNC         = "POWER"
var  w_STREET            = "STREET"
var  w_RECT_TRIANG       = "RECT_TRIANGULAR"
var  w_RECT_ROUND        = "RECT_ROUND"
var  w_MOD_BASKET        = "MODBASKETHANDLE"
var  w_HORIZELLIPSE      = "HORIZ_ELLIPSE"
var  w_VERTELLIPSE       = "VERT_ELLIPSE"
var  w_ARCH              = "ARCH"
var  w_EGGSHAPED         = "EGG"
var  w_HORSESHOE         = "HORSESHOE"
var  w_GOTHIC            = "GOTHIC"
var  w_CATENARY          = "CATENARY"
var  w_SEMIELLIPTICAL    = "SEMIELLIPTICAL"
var  w_BASKETHANDLE      = "BASKETHANDLE"
var  w_SEMICIRCULAR      = "SEMICIRCULAR"
var  w_IRREGULAR         = "IRREGULAR"
var  w_CUSTOM            = "CUSTOM"
var  w_FORCE_MAIN        = "FORCE_MAIN"
var  w_H_W               = "H-W"
var  w_D_W               = "D-W"

// Link Offset Options
var  w_ELEVATION         = "ELEVATION"

// Transect Data Input Codes
var  w_NC                = "NC"
var  w_X1                = "X1"
var  w_GR                = "GR"

// Rain Volume Units
var  w_INCHES            = "IN"
var  w_MMETER            = "MM"

// Flow Volume Units
var  w_MGAL              = "10^6 gal"
var  w_MLTRS             = "10^6 ltr"
var  w_GAL               = "gal"
var  w_LTR               = "ltr"

// Ponded Depth Units
var  w_PONDED_FEET       = "Feet"
var  w_PONDED_METERS     = "Meters"

// Concentration Units
var  w_MGperL            = "MG/L"
var  w_UGperL            = "UG/L"
var  w_COUNTperL         = "#/L"

// Mass Units
var  w_MG                = "MG"
var  w_UG                = "UG"
var  w_COUNT             = "#"

// Load Units
var  w_LBS               = "lbs"
var  w_KG                = "kg"
var  w_LOGN              = "LogN"

// Pollutant Buildup Functions
var  w_POW               = "POW"
var  w_EXP               = "EXP"
var  w_SAT               = "SAT"
var  w_EXT               = "EXT"

// Normalizing Variables for Pollutant Buildup
var  w_PER_AREA          = "AREA"
var  w_PER_CURB          = "CURB"

// Pollutant Washoff Functions
// (EXP function defined above)
var  w_RC                = "RC"
var  w_EMC               = "EMC"

// Treatment Keywords
var  w_REMOVAL           = "REMOVAL"
var  w_RATE              = "RATE"
var  w_HRT               = "HRT"
var  w_DT                = "DT"
var  w_AREA              = "AREA"

// Curve Types
//define  w_STORAGE (defined below)
var  w_DIVERSION         = "DIVERSION"
var  w_TIDAL             = "TIDAL"
var  w_RATING            = "RATING"
var  w_SHAPE             = "SHAPE"
var  w_PUMP1             = "PUMP1"
var  w_PUMP2             = "PUMP2"
var  w_PUMP3             = "PUMP3"
var  w_PUMP4             = "PUMP4"
var  w_PUMP5             = "PUMP5"
var  w_INLET             = "INLET"

// Reporting Options
var  w_DISABLED          = "DISABLED"
var  w_INPUT             = "INPUT"
var  w_CONTINUITY        = "CONTINUITY"
var  w_FLOWSTATS         = "FLOWSTATS"
var  w_CONTROLS          = "CONTROL"
var  w_NODESTATS         = "NODESTATS"
var  w_AVERAGES          = "AVERAGES"

// Interface File Types
var  w_RAINFALL          = "RAINFALL"
var  w_RUNOFF            = "RUNOFF"
var  w_HOTSTART          = "HOTSTART"
var  w_RDII              = "RDII"
var  w_ROUTING           = "ROUTING"
var  w_INFLOWS           = "INFLOWS"
var  w_OUTFLOWS          = "OUTFLOWS"

// Miscellaneous Keywords
var  w_OFF               = "OFF"
var  w_ON                = "ON"
var  w_NO                = "NO"
var  w_YES               = "YES"
var  w_NONE              = "NONE"
var  w_ALL               = "ALL"
var  w_SCRATCH           = "SCRATCH"
var  w_USE               = "USE"
var  w_SAVE              = "SAVE"
var  w_FULL              = "FULL"
var  w_PARTIAL           = "PARTIAL"

// Major Object Types
var  w_GAGE              = "RAINGAGE"
var  w_SUBCATCH          = "SUBCATCH"
var  w_NODE              = "NODE"
var  w_LINK              = "LINK"
var  w_POLLUT            = "POLLUTANT"
var  w_LANDUSE           = "LANDUSE"
var  w_TSERIES           = "TIME SERIES"
var  w_TABLE             = "TABLE"
var  w_UNITHYD           = "HYDROGRAPH"

// Node Sub-Types
var  w_JUNCTION          = "JUNCTION"
var  w_OUTFALL           = "OUTFALL"
var  w_STORAGE           = "STORAGE"
var  w_DIVIDER           = "DIVIDER"

// Link Sub-Types
var  w_CONDUIT           = "CONDUIT"
var  w_PUMP              = "PUMP"
var  w_ORIFICE           = "ORIFICE"
var  w_WEIR              = "WEIR"

// Control Rule Keywords
var  w_RULE              = "RULE"
var  w_IF                = "IF"
var  w_AND               = "AND"
var  w_OR                = "OR"
var  w_THEN              = "THEN"
var  w_ELSE              = "ELSE"
var  w_PRIORITY          = "PRIORITY"

var  w_VARIABLE          = "VARIABLE"
var  w_EXPRESSION        = "EXPRESSION"

// External Inflow Types
var  w_FLOW              = "FLOW"
var  w_CONCEN            = "CONCEN"
var  w_MASS              = "MASS"

// Variable Units
var  w_FEET              = "FEET"
var  w_METERS            = "METERS"
var  w_FPS               = "FT/SEC"
var  w_MPS               = "M/SEC"
var  w_PCNT              = "PERCENT"
var  w_ACRE              = "acre"
var  w_HECTARE           = "hectare"

// Input File Sections
var  ws_TITLE            = "[TITLE"
var  ws_OPTION           = "[OPTION"
var  ws_FILE             = "[FILE"
var  ws_RAINGAGE         = "[RAINGAGE"
var  ws_TEMP             = "[TEMPERATURE"
var  ws_EVAP             = "[EVAP"
var  ws_SUBCATCH         = "[SUBCATCHMENT"
var  ws_SUBAREA          = "[SUBAREA"
var  ws_INFIL            = "[INFIL"
var  ws_AQUIFER          = "[AQUIFER"
var  ws_GROUNDWATER      = "[GROUNDWATER"
var  ws_SNOWMELT         = "[SNOWPACK"
var  ws_JUNCTION         = "[JUNC"
var  ws_OUTFALL          = "[OUTFALL"
var  ws_STORAGE          = "[STORAGE"
var  ws_DIVIDER          = "[DIVIDER"
var  ws_CONDUIT          = "[CONDUIT"
var  ws_PUMP             = "[PUMP"
var  ws_ORIFICE          = "[ORIFICE"
var  ws_WEIR             = "[WEIR"
var  ws_OUTLET           = "[OUTLET"
var  ws_XSECTION         = "[XSECT"
var  ws_TRANSECT         = "[TRANSECT"
var  ws_LOSS             = "[LOSS"
var  ws_CONTROL          = "[CONTROL"
var  ws_POLLUTANT        = "[POLLUT"
var  ws_LANDUSE          = "[LANDUSE"
var  ws_BUILDUP          = "[BUILDUP"
var  ws_WASHOFF          = "[WASHOFF"
var  ws_COVERAGE         = "[COVERAGE"
var  ws_INFLOW           = "[INFLOW"
var  ws_DWF              = "[DWF"
var  ws_PATTERN          = "[PATTERN"
var  ws_RDII             = "[RDII"
var  ws_UNITHYD          = "[HYDROGRAPH"
var  ws_LOADING          = "[LOADING"
var  ws_TREATMENT        = "[TREATMENT"
var  ws_CURVE            = "[CURVE"
var  ws_TIMESERIES       = "[TIMESERIES"
var  ws_REPORT           = "[REPORT"
var  ws_MAP              = "[MAP"
var  ws_COORDINATE       = "[COORDINATE"
var  ws_VERTICES         = "[VERTICES"
var  ws_POLYGON          = "[POLYGON"
var  ws_SYMBOL           = "[SYMBOL"
var  ws_LABEL            = "[LABEL"
var  ws_BACKDROP         = "[BACKDROP"
var  ws_TAG              = "[TAG"
var  ws_PROFILE          = "[PROFILE"
var  ws_LID_CONTROL      = "[LID_CONTROL"
var  ws_LID_USAGE        = "[LID_USAGE"
var  ws_GW_FLOW          = "[GW_FLOW"     //Deprecated
var  ws_GWF              = "[GWF"
var  ws_ADJUST           = "[ADJUSTMENT"
var  ws_EVENT            = "[EVENT"
var  ws_STREET           = "[STREET"
var  ws_INLET            = "[INLET"
var  ws_INLET_USAGE      = "[INLET_USAGE"

//-----------------------------------------------------------------------------
//   keywords.c
//
//   Project: swmmjs
//   Version: swmmjs (0.2) for EPA-SWMM (5.2)
//   Date:    09/16/22  (Build 0.2)
//   Author:  L. Rossman
//   JS Translation: Issac Gardner
//
//   Exportable keyword dictionary
//
//   NOTE: the keywords in each list must appear in same order used
//         by its complementary enumerated variable in enums.h and
//         must be terminated by NULL. The actual text of each keyword
//         is defined in text.h.
//
//   Update History
//   ==============
//   Build 5.1.007:
//   - Keywords for Ignore RDII option and groundwater flow equation
//     and climate adjustment input sections added.
//   Build 5.1.008:
//   - Keyword arrays placed in alphabetical order for better readability.
//   - Keywords added for Minimum Routing Step and Number of Threads options.
//   Build 5.1.010:
//   - New Modified Green Ampt keyword added to InfilModelWords.
//   - New Roadway weir keyword added to WeirTypeWords.
//   Build 5.1.011:
//   - New section keyword for [EVENTS] added.
//   Build 5.1.013:
//   - New option keywords w_SURCHARGE_METHOD, w_RULE_STEP, w_AVERAGES 
//     and w_WEIR added.
//   Build 5.2.0:
//   - Support added for Streets and Inlets.
//   - Support added for variable speed pumps.
//   - Support added for analytical storage shapes.
//   - Support added for RptFlags.disabled option.
//   Build 5.2.1:
//   - Adds NONE to the list of NormalFlowWords.
//-----------------------------------------------------------------------------

export const BuildupTypeWords   = [ w_NONE, w_POW, w_EXP, w_SAT, w_EXT, 0 ]
export const CurveTypeWords     = [ w_STORAGE, w_DIVERSION, w_TIDAL, w_RATING,
                               w_CONTROLS, w_SHAPE, w_WEIR,
                               w_PUMP1, w_PUMP2, w_PUMP3, w_PUMP4, 
                               w_PUMP5, '']
export const DividerTypeWords   = [ w_CUTOFF, w_TABULAR, w_WEIR, w_OVERFLOW, '']
export const EvapTypeWords      = [ w_CONSTANT, w_MONTHLY, w_TIMESERIES,
                               w_TEMPERATURE, w_FILE, w_RECOVERY,
                               w_DRYONLY, '']
export const FileTypeWords      = [ w_RAINFALL, w_RUNOFF, w_HOTSTART, w_RDII,
                               w_INFLOWS, w_OUTFLOWS, '']
export const FileModeWords      = [ w_NO, w_SCRATCH, w_USE, w_SAVE, '']
export const FlowUnitWords      = [ w_CFS, w_GPM, w_MGD, w_CMS, w_LPS, w_MLD, '']
export const ForceMainEqnWords  = [ w_H_W, w_D_W, '']
export const GageDataWords      = [ w_TIMESERIES, w_FILE, '']
export const InfilModelWords    = [ w_HORTON, w_MOD_HORTON, w_GREEN_AMPT,
                               w_MOD_GREEN_AMPT, w_CURVE_NUMEBR, '']
export const InertDampingWords  = [ w_NONE, w_PARTIAL, w_FULL, '']
export const LinkOffsetWords    = [ w_DEPTH, w_ELEVATION, '']
export const LinkTypeWords      = [ w_CONDUIT, w_PUMP, w_ORIFICE,
                               w_WEIR, w_OUTLET ]
export const LoadUnitsWords     = [ w_LBS, w_KG, w_LOGN ]
export const NodeTypeWords      = [ w_JUNCTION, w_OUTFALL,
                               w_STORAGE, w_DIVIDER ]
export const NoneAllWords       = [ w_NONE, w_ALL, '']
export const NormalFlowWords    = [ w_SLOPE, w_FROUDE, w_BOTH, w_NONE, '']
export const NormalizerWords    = [ w_PER_AREA, w_PER_CURB, '']
export const NoYesWords         = [ w_NO, w_YES, '']
export const OffOnWords         = [ w_OFF, w_ON, '']
export const OldRouteModelWords = [ w_NONE, w_NF, w_KW, w_EKW, w_DW, '']
export const OptionWords        = [ w_FLOW_UNITS,        w_INFIL_MODEL,
                            w_ROUTE_MODEL,       w_START_DATE,
                            w_START_TIME,        w_END_DATE,
                            w_END_TIME,          w_REPORT_START_DATE,
                            w_REPORT_START_TIME, w_SWEEP_START,
                            w_SWEEP_END,         w_START_DRY_DAYS,
                            w_WET_STEP,          w_DRY_STEP,
                            w_ROUTE_STEP,        w_RULE_STEP,
                            w_REPORT_STEP,
                            w_ALLOW_PONDING,     w_INERT_DAMPING,
                            w_SLOPE_WEIGHTING,   w_VARIABLE_STEP,
                            w_NORMAL_FLOW_LTD,   w_LENGTHENING_STEP,
                            w_MIN_SURFAREA,      w_COMPATIBILITY,
                            w_SKIP_STEADY_STATE, w_TEMPDIR,
                            w_IGNORE_RAINFALL,   w_FORCE_MAIN_EQN,
                            w_LINK_OFFSETS,      w_MIN_SLOPE,
                            w_IGNORE_SNOWMELT,   w_IGNORE_GWATER,
                            w_IGNORE_ROUTING,    w_IGNORE_QUALITY,
                            w_MAX_TRIALS,        w_HEAD_TOL,
                            w_SYS_FLOW_TOL,      w_LAT_FLOW_TOL,
                            w_IGNORE_RDII,       w_MIN_ROUTE_STEP,
                            w_NUM_THREADS,       w_SURCHARGE_METHOD,
                            '' ]
export const OrificeTypeWords   = [ w_SIDE, w_BOTTOM, '']
export const OutfallTypeWords   = [ w_FREE, w_NORMAL, w_FIXED, w_TIDAL,
                               w_TIMESERIES, '']
export const PatternTypeWords   = [ w_MONTHLY, w_DAILY, w_HOURLY, w_WEEKEND, '']
export const PondingUnitsWords  = [ w_PONDED_FEET, w_PONDED_METERS ]
export const ProcessVarWords    = [ w_HRT, w_DT, w_FLOW, w_DEPTH, w_AREA, '']
export const PumpTypeWords      = [ w_TYPE1, w_TYPE2, w_TYPE3, w_TYPE4, w_TYPE5, w_IDEAL ]
export const QualUnitsWords     = [ w_MGperL, w_UGperL, w_COUNTperL, '']
export const RainTypeWords      = [ w_INTENSITY, w_VOLUME, w_CUMULATIVE, '']
export const RainUnitsWords     = [ w_INCHES, w_MMETER, '']
export const RelationWords      = [ w_TABULAR, w_FUNCTIONAL,
                               w_CYLINDRICAL, w_CONICAL, w_PARABOLIC,
                               w_PYRAMIDAL, '']
export const ReportWords        = [ w_DISABLED, w_INPUT, w_SUBCATCH, w_NODE, w_LINK,
                               w_CONTINUITY, w_FLOWSTATS,w_CONTROLS,
                               w_AVERAGES, w_NODESTATS, '']
export const RouteModelWords    = [ w_NONE, w_STEADY, w_KINWAVE, w_XKINWAVE,
                               w_DYNWAVE, '']
export const RuleKeyWords       = [ w_RULE, w_IF, w_AND, w_OR, w_THEN, w_ELSE, 
                               w_PRIORITY, '']
export const SectWords          = [ ws_TITLE,          ws_OPTION,
                               ws_FILE,           ws_RAINGAGE,
                               ws_TEMP,           ws_EVAP, 
                               ws_SUBCATCH,       ws_SUBAREA,
                               ws_INFIL,          ws_AQUIFER,
                               ws_GROUNDWATER,    ws_SNOWMELT,
                               ws_JUNCTION,       ws_OUTFALL,
                               ws_STORAGE,        ws_DIVIDER,
                               ws_CONDUIT,        ws_PUMP,
                               ws_ORIFICE,        ws_WEIR,
                               ws_OUTLET,         ws_XSECTION,
                               ws_TRANSECT,       ws_LOSS,
                               ws_CONTROL,        ws_POLLUTANT,
                               ws_LANDUSE,        ws_BUILDUP,
                               ws_WASHOFF,        ws_COVERAGE,
                               ws_INFLOW,         ws_DWF,
                               ws_PATTERN,        ws_RDII, 
                               ws_UNITHYD,        ws_LOADING,
                               ws_TREATMENT,      ws_CURVE,
                               ws_TIMESERIES,     ws_REPORT,
                               ws_COORDINATE,     ws_VERTICES,
                               ws_POLYGON,        ws_LABEL,
                               ws_SYMBOL,         ws_BACKDROP, 
                               ws_TAG,            ws_PROFILE,
                               ws_MAP,            ws_LID_CONTROL,
                               ws_LID_USAGE,      ws_GWF,
                               ws_ADJUST,         ws_EVENT,
                               ws_STREET,         ws_INLET_USAGE,
                               ws_INLET,          '']
export const SnowmeltWords      = [ w_PLOWABLE, w_IMPERV, w_PERV, w_REMOVAL, '']
export const SurchargeWords     = [ w_EXTRAN, w_SLOT, '']
export const TempKeyWords       = [ w_TIMESERIES, w_FILE, w_WINDSPEED, w_SNOWMELT,
                               w_ADC, '']
export const TransectKeyWords   = [ w_NC, w_X1, w_GR, '']
export const TreatTypeWords     = [ w_REMOVAL, w_CONCEN, '']
export const UHTypeWords        = [ w_SHORT, w_MEDIUM, w_LONG, '']
export const VolUnitsWords      = [ w_MGAL, w_MLTRS ]
export const VolUnitsWords2     = [ w_GAL, w_LTR ]
export const WashoffTypeWords   = [ w_NONE, w_EXP, w_RC, w_EMC, '']
export const WeirTypeWords      = [ w_TRANSVERSE, w_SIDEFLOW, w_VNOTCH,
                               w_TRAPEZOIDAL, w_ROADWAY, ''] 
export const XsectTypeWords     = [ w_DUMMY,           w_CIRCULAR,
                               w_FILLED_CIRCULAR, w_RECT_CLOSED,
                               w_RECT_OPEN,       w_TRAPEZOIDAL,
                               w_TRIANGULAR,      w_PARABOLIC,
                               w_POWERFUNC,       w_RECT_TRIANG,
                               w_RECT_ROUND,      w_MOD_BASKET,
                               w_HORIZELLIPSE,    w_VERTELLIPSE,
                               w_ARCH,            w_EGGSHAPED,
                               w_HORSESHOE,       w_GOTHIC,
                               w_CATENARY,        w_SEMIELLIPTICAL,
                               w_BASKETHANDLE,    w_SEMICIRCULAR,
                               w_IRREGULAR,       w_CUSTOM,
                               w_FORCE_MAIN,      w_STREET,
                               '']
