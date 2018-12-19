import React from 'react'
import { Helmet } from 'react-helmet'
import { compose, lifecycle, withHandlers } from 'recompose'

import style from './style'
import { movingStars, scrollIt } from 'Src/helpers'

import HelloWidget from 'Components/HelloWidget'
import Socials from 'Components/Socials'
import Avatar from './Avatar'
import Menu from './Menu'

const container = React.createRef()
const videoBG = React.createRef()
const backgroundPic = React.createRef()
const elementToMove = React.createRef()
const txtInfinity = React.createRef()

const Header = ({
  handleParallax,
  handleScroll,
  homePage,
}) => (
  <header
    ref={container}
    onMouseMove={handleParallax}
    className={style.header}
  >
    <canvas 
      ref={videoBG}
      className={style.video__bg_wrap}
    />
    <span ref={txtInfinity} style={{ top: '180px', left: '743px' }} />
    <div
      ref={backgroundPic}
      className={style.header__bg}
    />
    {homePage
      ? <div className={style.hello}>
        <Helmet>
          <title>Home | GloompiQue</title>
        </Helmet>
        <HelloWidget ref={elementToMove} />
      </div>
      : <div className={`${style.container} ${style.header__container}`}>
        <div className={style.header__top}>
          <Socials />
          <Menu />
        </div>
        <Avatar ref={elementToMove} />
        <a
          href=''
          className={style.scroll__btn}
          onClick={handleScroll}
        >
          <i className='fas fa-angle-double-down'/>
        </a>
      </div>
    }
  </header>
)

const HeaderComposed = compose(
  lifecycle({
    componentDidMount() {
      movingStars(videoBG.current, txtInfinity.current)
    }
  }),
  withHandlers({
    setStylesOnElement: () => (styles, element) => {
      Object.assign(element.style, styles)
    }
  }),
  withHandlers({
    handleScroll: ({ scrollElement }) => (e) => {
      e.preventDefault()
      scrollIt(scrollElement.current, 0)
    },
    handleParallax: ({ setStylesOnElement }) => (e) => {
      const { clientHeight, clientWidth } = container.current
      setStylesOnElement({
        transform: `translate(-${e.pageX/clientWidth * 30}px, ${e.pageY/clientHeight * 30}px)` 
      }, backgroundPic.current)
      setStylesOnElement({
        transform: `translate(-${e.pageX/clientWidth * 20}px, -${e.pageY/clientHeight * 20}px)`
      }, videoBG.current)
      setStylesOnElement({
        transform: `translate(${e.pageX/clientWidth * 45}px, ${e.pageY/clientHeight * 45}px)`
      }, elementToMove.current)
    }
  })
)(Header)

export default HeaderComposed

