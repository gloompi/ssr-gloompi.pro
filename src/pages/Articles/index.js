import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import style from './style'

class Articles extends Component{
  render(){
    return (
      <div className={style.page__main}>
        <Helmet>
          <title>Articles | GloompiQue</title>
        </Helmet>
        <h1>Articles</h1>
      </div>
    )
  }
}

export default Articles