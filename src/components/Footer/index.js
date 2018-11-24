import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'

import style from './style'

class Footer extends Component{
  static propTypes = {
  }

  render(){ 
    return(
      <footer className={style.footer}>
        <div className={`${style.container} ${style.footer__container}`}>
          Footer
        </div>
      </footer>
    )
  }
}

export default Footer