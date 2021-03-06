import React, { Component, Fragment } from 'react'
import { Helmet }  from 'react-helmet'

import style from './style'
import Header from 'Components/Header'
import AboutMain from 'Components/aboutComponents/AboutMain'
import AboutSkills from 'Components/aboutComponents/AboutSkills'
import RightBg from 'Components/svg/aboutRight'
import LeftBg from 'Components/svg/aboutLeft'
import Footer from 'Components/Footer'

class About extends Component{
  constructor(props) {
    super(props)

    this.scrollElement = React.createRef()
  }

  render(){
    return (
      <Fragment>
        <Helmet>
          <title>About | GloompiQue</title>
        </Helmet>
        <Header scrollElement={this.scrollElement} />
        <main ref={this.scrollElement} className={style.about__wrapper}>
          <LeftBg />
          <RightBg />
          <div className={`${style.about__container} ${style.container}`}>
            <AboutMain />
            <AboutSkills />
          </div>
        </main>
        <Footer />
      </Fragment>
    )
  }
}

export default About
