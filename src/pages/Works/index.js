import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import style from './style'

class Works extends Component{
  render(){
    return (
      <div className={style.page__main}>
        <Helmet>
          <title>Works | GloompiQue</title>
        </Helmet>
        <h1>Works</h1>
      </div>
    )
  }
}

export default Works