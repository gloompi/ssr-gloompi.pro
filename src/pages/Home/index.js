import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import HelloWidget from 'Components/HelloWidget'
import { scrollIt } from 'Src/helpers'
import style from './style'

class Home extends Component{
  static propTypes = {
  }

  render(){
    return(
      <div className={style.hello}>
        <Helmet>
          <title>Home | GloompiQue</title>
        </Helmet>
        <HelloWidget />
      </div>
    )
  }

  handleScroll = e => {
    e.preventDefault()

    scrollIt(document.getElementById('point'), 150)
  }
}

export default Home