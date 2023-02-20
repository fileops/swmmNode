# swmmNode info

swmmNode is a TypeScript package for performing operations on EPA-SWMM files via Node.js or through websites built with swmmReact, swmmVue or swmmLink.

## How to link to your project

Use npm to install swmmNode (swmm-node) into your projects:
```
npm install @fileops/swmm-node
```
## Core functions

Some of the core elements of swmmNode are detailed below:

### swmmOut

swmmOut(ArrayBuffer): Creates an interactive class instance for .out files.

### swmmDat

swmmDat(string): Creates an interactive class instance for .dat files.

#### getHeader

Returns the header for the file.

#### findStorms

Searches the .dat file for storm patterns, returns results in Unix-Timestamp format.

#### findStormsPretty

Searches the .dat file for storm patterns, returns results in human-readable format (MM/DD/YYYY hh:mm:ss)

#### subGage

Gets the data for just one gage from a .dat file.

#### mergeGages

Merges gage info from another .dat file or object into the current .dat object.

#### subRange

Gets the data for a specific date range from the .dat object/file.

#### stringify

Translates the current .dat file into a string for writing into a new .dat file.