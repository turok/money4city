import React, { memo, Component } from 'react'

import { ReactComponent as Icon } from '@static/icons/info.svg'

import styles from './Info.module.css'

class Info extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: props.isInfoVisible
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    this.setState({
      visible: nextProps.isInfoVisible
    })
  }


  render() {
    const { visible } = this.state;

    return (
      <>
      {visible && (
        <div className={styles['info-text']}>
          <h6>Проблема</h6>
          <div>Наши любимые заведения сталкиваются с финансовыми трудностями. Всему виной эпидемия COVID-19. Самоизоляция, карантин, обязательства перед сотрудниками и арендодателями могут убить частный малый бизнес.</div>
          <h6>Идея</h6>
          <div>&quot;Плати сейчас - пользуйся потом&quot; - это вариант, который может спасти малый бизнес в вашем городе. 
              Когда все это закончится - ваши любимые заведения смогут и дальше продолжать радовать вас и не забудут каждого, кто помог в это нелегкое время</div>
          <h6>Гарантии</h6>
          <div>Мы не даем гарантий. Помогать или не помогать - это ваше решение. Помните, что это риск, money4 выступает лишь информационным посредником.</div>
          <div>Cвязаться с нами</div>
        </div>
      )}
      <button className={styles['info-button']} type="button" onClick={() =>this.props.toggleMenu()}><Icon /></button>
    </>
    )
  }
}

export default memo(Info)
