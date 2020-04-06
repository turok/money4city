import React, { memo, Component } from 'react'
import L from 'leaflet';
import { Map as LMap, Marker, Popup, TileLayer } from 'react-leaflet'
import { API_BASE_URL, MAPBOX_ACCESS_TOKEN, MAPBOX_CLASS } from '@config/constants';
import MapBoxGLLayer from '@components/MapboxGLLayer';
import classnames from 'classnames';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      markers: props.markers,
      id: 'map',
      defaultPosition: [53.878684, 30.332915],
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps){
    this.setState({markers:nextProps.markers});
  }

  selectMarker = (marker) => {
    const markers = this.state.markers;
    const newMarkers = markers.map(element => {
      element.selected = marker.id === element.id;

      return element;
    });
    this.setState({ markers:  newMarkers });
    this.props.onSelectMarker(marker);
  }

  mapClick(){
    const markers = this.state.markers;
    const newMarkers = markers.map(element => {
      element.selected = false;

      return element;
    });
    this.setState({ markers:  newMarkers });
    this.props.onCloseMarker();
    this.props.hideInfo()
  }

  render() {
    const position = this.state.defaultPosition;
    const { markers } = this.state;
    console.log(markers)

    return (
      <LMap center={position} zoom={13} onClick={() => this.mapClick()}>
        <MapBoxGLLayer
            accessToken={MAPBOX_ACCESS_TOKEN}
            style={MAPBOX_CLASS}
          />
        
        {markers.map(marker => {
          let statusText = '';
          let statusClass = '';

          switch (marker.statusType) {
            case "AllGood": {
              statusClass = 'green';
              statusText = 'Все хорошо';
              break;
            }
            case "NeedLowHelp": {
              statusClass = 'yellow';
              statusText = 'Пока держимся';
              break;
            }
            case "NeedMiddleHelp": {
              statusClass = 'orange';
              statusText = 'Нужна помощь';
              break;
            }
            case "NeedHighHelp": {
              statusClass = 'red';
              statusText = 'На грани закрытия';
              break;
            }
          }

          const icon = L.divIcon({
            className: `avatar-box ${marker.selected ? 'selected' : null}`,
            html: `<div class="avatar ${statusClass}" style="background-size: cover; background-image:url('${API_BASE_URL}/${marker.imagePath}')"></div>`
          })
          icon.options.iconSize = [70, 70];

          return (
            <Marker icon={icon} className="avatar-box" key={marker.id} position={[marker.latitude, marker.longitude]} onMouseOver={e => {e.target.openPopup(); }}  onMouseOut={(e) => {
              if (!marker.selected){
                e.target.closePopup();
              } 
            }}
              onClick={() => { this.selectMarker(marker) } } >
              <Popup className={statusClass}>
                <div className="popup-company-name">{marker.name}</div>
                <div className="popup-donation-amount">{marker.donateAmount} BYN  <span className="popup-donate-users">{marker.donateCount} <span className=" popup fa fa-user"></span></span></div>
                <div className={classnames("popup-status-text", statusClass)}>{statusText}</div>
              </Popup>
            </Marker>
          )
        })}
      </LMap>
    )
  }
}

export default memo(Map)
