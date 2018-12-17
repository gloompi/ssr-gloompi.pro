import React from 'react'

import img from 'Assets/images/loader.gif'

const style = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 2000
}

const Loader = ({ width = 35 }) => (
  <div style={style}>
    <img src={img} style={{ width }} />
  </div>
)

export default Loader