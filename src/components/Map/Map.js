import React, { Component } from 'react'
import L from 'leaflet';
import { Map as LMap, Marker, Popup, TileLayer } from 'react-leaflet'
import { API_BASE_URL, MAP_MAX_CLUSTERING_ZOOM, MAP_CLUSTER_S_MAX, MAP_CLUSTER_M_MAX } from '@config/constants';
import classnames from 'classnames';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { withRouter } from 'react-router-dom';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      markers: props.markers,
      id: 'map',
      defaultPosition: [53.878684, 30.332915],
      currentZoom: 13,
      selectedMarkerId: null,
    }
  }

  selectMarker = (marker) => {
    const markers = this.state.markers;
    const newMarkers = markers.map(element => {
      element.selected = marker.id === element.id;

      return element;
    });
    this.setState({ currentZoom: 18, markers: newMarkers, selectedMarkerId: marker.id });
    this.props.onSelectMarker(marker);
  }

  openMarker = (marker) => {
    this.props.history.push("/" + marker.id);
  }

  mapClick = () => {
    const markers = this.state.markers;
    const newMarkers = markers.map(element => {
      element.selected = false;

      return element;
    });
    this.setState({ markers: newMarkers });
    this.props.onCloseMarker();
    this.props.hideInfo()
  }

  createClusterCustomIcon = (cluster) => {
    const count = cluster.getChildCount();
    let size = 's';

    if (count <= MAP_CLUSTER_S_MAX) {
      size = 's'
    }

    if (count <= MAP_CLUSTER_M_MAX) {
      size = 'm'
    }

    return L.divIcon({
      html: `<div class="cluster cluster-${size}">${count}</div>`,
      className: `cluster-box`,
    });
  };

  render() {
    let position = this.state.defaultPosition;
    const { markers } = this.props;
    let zoom = this.state.currentZoom;


    if (this.props.match.params.id) {
      const marker = markers.find(m => m.id == this.props.match.params.id);

      if (marker) {
        position = [marker.latitude, marker.longitude];
        zoom = 18;
      }
    }

    return (
      <LMap center={position} zoom={zoom} onClick={() => this.mapClick()}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          spiderfyOnMaxZoom
          disableClusteringAtZoom={MAP_MAX_CLUSTERING_ZOOM}
          spiderLegPolylineOptions={{
            weight: 0,
            opacity: 0,
          }}
          iconCreateFunction={this.createClusterCustomIcon}
        >
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
              className: `avatar-box ${marker.id == this.props.match.params.id ? 'selected' : null}`,
              html: `<div class="avatar ${statusClass}" style="background-size: cover; background-image:url('${API_BASE_URL}/${marker.imagePath}')"></div>`
            })
            icon.options.iconSize = [70, 70];

            return (
              <Marker icon={icon} className="avatar-box" key={marker.id} position={[marker.latitude, marker.longitude]} onMouseOver={e => { e.target.openPopup(); }} onMouseOut={(e) => {
                if (!marker.selected) {
                  e.target.closePopup();
                }
              }}
                onClick={(e) => { this.openMarker(marker, e) }} >
                <Popup className={statusClass}>
                  <div className="popup-company-name">{marker.name}</div>
                  <div className="popup-donation-amount">{marker.donateAmount} BYN  <span className="popup-donate-users">{marker.donateCount} <span className=" popup fa fa-user"></span></span></div>
                  <div className={classnames("popup-status-text", statusClass)}>{statusText}</div>
                </Popup>
              </Marker>
            )
          })}
        </MarkerClusterGroup>
      </LMap >
    )
  }
}

export default withRouter(Map)
