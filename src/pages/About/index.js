import React, {Component, Fragment} from 'react'
import {Helmet} from 'react-helmet'

import Header from '../../components/Header'
import AboutMain from '../../components/aboutComponents/AboutMain'
import AboutSkills from '../../components/aboutComponents/AboutSkills'
import RightBg from '../../components/svg/aboutRight'
import LeftBg from '../../components/svg/aboutLeft'
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