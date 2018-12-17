import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'

import 'Assets/js/fontawesome-all.min.js'

import style from './style'

class App extends Component {
  render() {
    const { route } = this.props
    return <div className={style.app}>
      <div className={style.app__main}>
        {renderRoutes(route.routes)}
      </div>
    </div>
  }
}

export default App