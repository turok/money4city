import React, { memo, useState } from 'react'
import AddButton from '@components/AddButton'
import classnames from 'classnames'
import { Link } from "react-router-dom";

import { ANIMATION_DURATION, SHOW_MOLA_MOLA_TIMEOUT } from './Header.constants'
import styles from './Header.module.css'

function Header({ count }) {
  const [hiddenCount, setHiddenCount] = useState(false)

  return (
    <header className={styles.header}>
      {!hiddenCount && (
        <div className='header-text'><span className="logo"><Link  to="/">money4.city</Link></span> Денежная помощь вашим любимым заведениям</div>
      )}
    </header>
  )
}

export default memo(Header)
