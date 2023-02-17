// DisplaySupport.tsx

// Returns a color from a random, unique color palette.
export function colorSet01(num:number){
  const color = (num + 12) * 137.508
  return `hsl(${color}, 50%, 40%)`
}