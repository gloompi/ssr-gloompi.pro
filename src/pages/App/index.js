import React, {Component} from 'react'
import {renderRoutes} from 'react-router-config'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'

import style from './style.styl'
import '../../assets/js/fontawesome-all.min.js'
import {jwtSecretName} from '../../../configClient'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

class App extends Component {
  render() {
    const {route} = this.props
    return <div className={style.app}>
      <Helmet>
        <title>Cryptoinvest Systems</title>
      </Helmet>
      <Header />
      <main className={style.app__main}>
        {renderRoutes(route.routes)}
      </main>
      <Footer />
    </div>
  }
}

export default App