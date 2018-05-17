import React from 'react'

import img from '../assets/images/loader.gif'

function Loader(props){
  const {width = 35} = props
  const style = {
    width: width
  }
  return(
    <img src={img} style={style} />
  )
}

export default Loader