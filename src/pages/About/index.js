import React, { Component, Fragment } from 'react'
import { Helmet }  from 'react-helmet'

import Header from 'Components/Header'
import AboutMain from 'Components/aboutComponents/AboutMain'
import AboutSkills from 'Components/aboutComponents/AboutSkills'
import RightBg from 'Components/svg/aboutRight'
import LeftBg from 'Components/svg/aboutLeft'
import style from './style'

class About extends Component{
  render(){
    return (
      <Fragment>
        <Helmet>
          <title>About | GloompiQue</title>
        </Helmet>
        <Header />
        <div className={style.about__wrapper}>
          <LeftBg />
          <RightBg />
          <div className={`${style.about__container} ${style.container}`}>
            <AboutMain />
            <AboutSkills />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default About