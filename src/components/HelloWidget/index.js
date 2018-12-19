import React from 'react'
import { NavLink } from 'react-router-dom'

import style from './style'
import Socials from 'Components/Socials'
import avatar from 'Assets/images/avatar.jpg'
import { ownerName, ownerProfession } from 'Root/configClient'

const HelloWidget = React.forwardRef((props, ref) => (
  <main ref={ref} className={style.hello__widget_wrap}>
    <div className={style.hello__widget_container}>
      <div className={style.hello__widget_pic}>
        <img src={avatar} alt="avatar" className={style.hello__widget_img}/>
      </div>
      <h2 className={style.hello__widget_title}>{ownerName}</h2>
      <div className={style.hello__widget_description}>{ownerProfession}</div>
      <Socials />
      <HelloMenu />
    </div>
  </main>
))

const HelloMenu = () => {
  return (
    <nav className={style.hello__nav_mnu}>
      <NavLink exact className={style.hello__nav_item} to='/portfolio'>Portfolio</NavLink>
      <NavLink exact className={style.hello__nav_item} to='/about'>About Me</NavLink>
      <NavLink exact className={style.hello__nav_item} to='/blog/1'>Blog</NavLink>
    </nav>
  )
}

export default HelloWidget