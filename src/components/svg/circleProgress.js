import React from 'react'

export default ({percent = 100, r = 55, width = 130, height = 130, color = '#1056d1'}) => {
  let c = Math.PI*(r*2)
  return (
    <svg width={width} height={height} version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle cx="65" cy="65" r={r} fill="transparent" stroke="#D8DDE6" strokeWidth="20" strokeDasharray="565.48" strokeMiterlimit="20" strokeDashoffset="0"></circle>
      <circle cx="65" cy="65" r={r} fill="transparent" stroke={color} strokeWidth="17" strokeLinecap="round" strokeDasharray="565.48" strokeMiterlimit="20" strokeDashoffset={((167-`${percent}`)/100)*c}></circle>
    </svg>
  )
}

// export default () => {
//   return (
//     <svg viewBox="0 0 130 130" style="width: 130px; height: 130px; position: relative;">
//       <circle cx="65" cy="65" r="55" fill="none" stroke-width="20" stroke-miterlimit="20" style="stroke: rgb(16, 86, 209); stroke-linecap: round; transition: all 0.3s linear 0ms; stroke-dasharray: 224.624, 345.575;"></circle>
//     </svg>
//   )
// }