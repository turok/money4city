import React, { memo, useState } from 'react'
import AddButton from '@components/AddButton'
import classnames from 'classnames'

import { ANIMATION_DURATION, SHOW_MOLA_MOLA_TIMEOUT } from './Header.constants'
import styles from './Header.module.css'

function Header({ count }) {
  const [hiddenCount, setHiddenCount] = useState(false)

  return (
    <header className={styles.header}>
      {!hiddenCount && (
        <div className='count-visible'>Нужна помощь для {count}!</div>
      )}
      <div>
        <AddButton/>
      </div>
    </header>
  )
}

export default memo(Header)
