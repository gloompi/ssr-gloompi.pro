import React from 'react'
import { renderRoutes } from 'react-router-config'

import 'Assets/js/fontawesome-all.min.js'

import style from './style'

const App = ({ route }) => (
  <div className={style.app}>
    <div className={style.app__main}>
      {renderRoutes(route.routes)}
    </div>
  </div>
)

export default App