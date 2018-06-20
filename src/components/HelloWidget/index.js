import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

import Socials from '../Socials'
import style from './style'
import avatar from '../../assets/images/avatar.jpg'

export default function HelloWidget() {
  return(
    <main className={style.hello__widget_wrap}>
      <div className={style.hello__widget_container}>
        <div className={style.hello__widget_pic}>
          <img src={avatar} alt="avatar" className={style.hello__widget_img}/>
        </div>
        <h2 className={style.hello__widget_title}>Esenzhanov Kubanychbek</h2>
        <div className={style.hello__widget_description}>Full-Stack Web Developer</div>
        <Socials />
        <HelloMenu />
      </div>
    </main>
  )
}

const HelloMenu = () => {
  return (
    <nav className={style.hello__nav_mnu}>
      <NavLink exact className={style.hello__nav_item} to='/portfolio'>Portfolio</NavLink>
      <NavLink exact className={style.hello__nav_item} to='/about'>About Me</NavLink>
      <NavLink exact className={style.hello__nav_item} to='/blog/1'>Blog</NavLink>
    </nav>
  )
}