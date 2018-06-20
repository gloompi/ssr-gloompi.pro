import React, {Component} from 'react'
import {renderRoutes} from 'react-router-config'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import style from './style'
import '../../assets/js/fontawesome-all.min.js'
import videoBg from '../../assets/images/night.mp4'

class App extends Component {
  render() {
    const {route} = this.props
    return <div className={style.app}>
      <main className={style.app__main}>
        <div className={style.video__bg_wrap}>
          <video src={videoBg} className={style.video__bg} autoPlay loop />
        </div>
        <div className={style.header__bg} />
        {renderRoutes(route.routes)}
      </main>
    </div>
  }
}

export default App