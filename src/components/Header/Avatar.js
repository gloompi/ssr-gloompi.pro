import React from 'react'

import style from './style'
import avatar from 'Assets/images/avatar.jpg'
import { ownerName, ownerProfession } from 'Root/configClient'

const Avatar = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    className={style.header__tooltip}
  >
    <div className={style.header__tooltip_pic}>
      <img src={avatar} className={style.header__tooltip_img}></img>
    </div>
    <h2 className={style.header__tooltip_title}>{ownerName}</h2>
    <div className={style.header__tooltip_description}>{ownerProfession}</div>
  </div>
))

export default Avatar
