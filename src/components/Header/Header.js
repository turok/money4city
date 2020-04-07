import React, { memo, useState } from 'react'
import { Link } from "react-router-dom";
import styles from './Header.module.css'

function Header() {
  const [hiddenCount] = useState(false)

  return (
    <header className={styles.header}>
      {!hiddenCount && (
        <div className="header-text"><span className="logo"><Link  to="/">money4.city</Link></span> Денежная помощь вашим любимым заведениям</div>
      )}
    </header>
  )
}

export default memo(Header)
