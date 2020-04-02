import React, { memo } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { ReactComponent as Icon } from '@static/icons/telegram.svg'

import styles from './AddButton.module.css'

function AddButton() {
  return (
    <Link className="addMarkerLink" to="/createMarker">Добавить компанию</Link>
  )
}

export default memo(AddButton)
