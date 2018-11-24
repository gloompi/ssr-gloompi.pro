import React from 'react'
import PropTypes from 'prop-types'

import style from 'Components/HelloWidget/style'

export default function Socials() {
  return(
    <div>
      <ul className={style.social__list}>
        <li className={style.social__item}>
          <a href="https://vk.com/gloompi" target="_blank" className={style.social__link}>
            <i className="fab fa-vk"></i>
          </a>
        </li>
        <li className={style.social__item}>
          <a href="https://github.com/gloompi" target="_blank" className={style.social__link}>
            <i className="fab fa-github-alt"></i>
          </a>
        </li>
        <li className={style.social__item}>
          <a href="https://www.linkedin.com/in/gloompi/" target="_blank" className={style.social__link}>
            <i className="fab fa-linkedin-in"></i>
          </a>
        </li>
      </ul>
    </div>
  )
}