import React from 'react'
import ReactDOM from 'react-dom'

import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

import './theme/init.css'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
