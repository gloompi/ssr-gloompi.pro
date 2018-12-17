import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { NavLink } from 'react-router-dom'
import { Entrance } from 'animate-components'

import style from './style'

const Menu = ({ active, handleClick }) => (
  <nav className={style.menu}>
    <a
      href=''
      onClick={handleClick}
      className={`${style.menu__btn} ${active ? style.active : ''}`}>
        <span />
    </a>
    {active && <Entrance
      duration='1s'
      as='ul'
      className={style.menu__list}
    >
      <li className={style.menu__item}>
        <NavLink
          to='/'
          className={style.menu__link}
          activeClassName={style.active}
          exact
        >
          <i className='fas fa-home' />
          Home
        </NavLink>
      </li>
      <li className={style.menu__item}>
        <NavLink
          to='/about'
          className={style.menu__link}
          activeClassName={style.active}
        >
          <i className='far fa-user-circle' />
          About
        </NavLink>
      </li>
      <li className={style.menu__item}>
        <NavLink
          to='/portfolio'
          className={style.menu__link}
          activeClassName={style.active}
        >
          <i className='fas fa-briefcase' />
          Portfolio
        </NavLink>
      </li>
      <li className={style.menu__item}>
        <NavLink
          to='/blog/1'
          className={style.menu__link}
          activeClassName={style.active}
        >
          <i className='fas fa-quidditch' />
          Blog
        </NavLink>
      </li>
    </Entrance>}
  </nav>
)

const MenuComposed = compose(
  withState('active', 'setActive', false),
  withHandlers({
    handleClick: ({ setActive }) => (e) => {
      e.preventDefault()
      setActive(active => !active)
    }
  })
)(Menu)

export default MenuComposed