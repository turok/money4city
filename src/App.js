import React, { Component, browserHistory } from 'react'
import CurrentMarker from './CurrentMarker'
import AddButton from '@components/AddButton'
import Header from '@components/Header'
import Loading from '@components/Loading'
import Map from '@components/Map'
import Info from '@components/Info'
import createMarker from './CreateMarker';


import { getApi } from '@services/api'
import endpoints from '@config/endpoints'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreateMarker from './CreateMarker'

class App extends Component {
  constructor(props) {
    super(props);

    // {
    //   "id": 3,
    //   "atlas": "/images/avatars_part_0.jpg",
    //   "img": "/kazbek.jpg",
    //   "x": 96,
    //   "y": 0,
    //   "description": "Помочь нам можно, перечислив деньги на счет NN234234234",
    //   "phone": "+375111111111",
    //   "latitude": 53.909151,
    //   "longitude": 30.330195,
    //   "name": "Имя Компании",
    //   "address": "Могилев, улица Неулицына, д.12, кв.12",
    //   "donateCount": "2",
    //   "donateAmount": "210",
    //   "lastUpdateTime": "12.03.2020",
    //   "instagramLink": "https://www.instagram.com/artyom.yakovlev.52/?hl=ru",
    //   "helpType": 2,
    //  }

    this.state = {
      selectedMarker: null,
      markers: [],
      initialLocation: [53.878684, 30.332915],
      isInfoVisible: true,
    }
  }

  async componentDidMount() {
    await getApi(endpoints.markers)
      .then(result => {

        this.setState({
          markers: result,
        })

      })
      .catch(err => {
        console.log('error');
        // TODO handle error
        console.error(err)
      })
  }

  openMarkerDetails = (marker) => {
    this.setState({ currentMarker: marker });
  }

  onCloseMarker = () => {
    this.setState({ currentMarker: null })
  }

  toggleInfoMenu = () => {
    this.setState(prevState => ({ isInfoVisible: !prevState.isInfoVisible }));
  }

  hideInfo = () => {
    this.setState({
      isInfoVisible: false
    })
  }

  render() {
    const { markers, initialLocation, currentMarker, isInfoVisible } = this.state;

    return (
      <Router history={browserHistory}>
        <Header count={markers && markers.length} />
        <Switch>
          <Route exact path="/createMarker">
            <CreateMarker />
          </Route>
          <Route path="/:id?">
            <CurrentMarker markers={markers && markers.length > 0 ? markers : []} marker={currentMarker} onCloseMarker={this.onCloseMarker} />
            <Map
              location={initialLocation}
              markers={markers && markers.length > 0 ? markers : []}
              hideInfo={this.hideInfo}
              onCloseMarker={this.onCloseMarker}
              onSelectMarker={(marker) => { this.openMarkerDetails(marker) }}
            />
            <Info toggleMenu={this.toggleInfoMenu} isInfoVisible={isInfoVisible} />
          </Route>

        </Switch>
      </Router>
    )
  }
}

export default App
