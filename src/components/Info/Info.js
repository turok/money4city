import React, { memo, useState } from 'react'

import { ReactComponent as Icon } from '@static/icons/info.svg'

import styles from './Info.module.css'

function Info() {
  const [visible, setVisible] = useState(false)

  function toggle() {
    setVisible(!visible)
  }

  return (
    <>
      {visible && (
        <div className={styles['info-text']}>
          <h6>Проблема</h6>
          <div>Наши любимые заведения сталкиваются с финансовыми трудностями. Всему виной эпидемия COVID-19. Самоизоляция, карантин, обязательства перед сотрудниками и арендодателями могут убить частный малый бизнес.</div>
          <h6>Идея</h6>
          <div>&quot;Плати сейчас - пользуйся потом&quot; - это вариант, который может спасти кофейню, барбершоп, фитнес-клуб в вашем городе. По окончанию эпидемии, вложенные деньги вернуться в ввиде товара и услуг. НО ЭТО НЕ ТОЧНО!</div>
          <h6>Решение</h6>
          <div>
            money4.city соединяет бизнес и жителей для преодоления кризиса вместе:
            <br/>
            - создать пин на карте
            <br/>
            - обновлять статус заведения
            <br/>
            - разместить реквизиты помощи
            <br/>
            - подтверждение транзакций
          </div>
          <h6>Гарантии</h6>
          <div>Мы не даем гарантий. Помогать или не помогать - это ваше решение. Помните, что это риск, money4 выступает лишь информационным посредником.</div>
          <div>Cвязаться с нами</div>
        </div>
      )}
      <button className={styles['info-button']} type="button" onClick={toggle}><Icon /></button>
    </>
  )
}

export default memo(Info)
