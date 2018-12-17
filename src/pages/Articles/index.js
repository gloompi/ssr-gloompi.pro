import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { ExpanseUp } from 'animate-components'

import style from './style'
import Header from 'Components/Header'
import Footer from 'Components/Footer'

class Articles extends Component{
  constructor(props) {
    super(props)

    this.scrollElement = React.createRef()
  }
  render(){
    return (
      <ExpanseUp
        duration='1s'
        as='div'
        className={style.page__main}
      >
        <Helmet>
          <title>Articles | GloompiQue</title>
        </Helmet>
        <Header scrollElement={this.scrollElement} />
        <main ref={this.scrollElement}>
          <h1>Articles</h1>
        </main>
        <Footer />
      </ExpanseUp>
    )
  }
}

export default Articles