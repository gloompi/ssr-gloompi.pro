import React from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './style.styl'

function Header({loggedIn, history, token}){
  return(
    <header className={style.header}>
      <div className={style.container}>
        Header
      </div>
    </header>
  )
}

export default Header