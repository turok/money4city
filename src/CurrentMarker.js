import React, { Component } from 'react';
import { API_BASE_URL } from '@config/constants';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';


class CurrentMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: this.props.markers,
      marker: null,
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    this.setState({ markers: nextProps.markers });

    if (nextProps.match.params.id) {
      const marker = nextProps.markers.find(m => m.id == nextProps.match.params.id);

      if (marker) {
        this.setState({ marker: marker });
      }
    }
  }

  onCloseMarker = () => {
    this.setState({ marker: null })
    this.props.history.push("/");
  }

  render() {
    const { marker } = this.state;

    if (!marker) {
      return null;
    }

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

    return (
      < div className="currentMarkerDetailsContainer" >
        <div className="panel nameSection">
          <div className="closeDetailsPanel" onClick={() => this.onCloseMarker()}>x</div>
          <div className="companyImg" style={{ backgroundImage: `url(${API_BASE_URL}/${marker.imagePath})` }}></div>
          <div className="infoSection">
            <div className="name">
              {marker.name}
            </div>
            <div className="statusSection">
              <div className={classnames("status", statusClass)}>{statusText}</div>
              <div className="lastUpdateDate">{marker.updatedAt ? new Date(marker.updatedAt).toLocaleDateString() : null}</div>
            </div>

          </div>
        </div>
        <div className="panel donationSection">
          <div className="infoSection">
            <div className="donateAmount">
              {marker.donateAmount} BYN
              </div>
            <div className="donateCount">
              {marker.donateCount} <span className="fa fa-user"></span>
            </div>
          </div>
        </div>
        <div className="panel descriptionSection">
          <div className="infoSection">
            <span className="fa fa-user"></span> {marker.contactName}
          </div>
          <div className="text">
            {marker.description}
          </div>
          <div className="buttons">
            <input type="button" className="supportButton" value="Поддержать рублём" />
          </div>
        </div>
        <div className="panel socialMediaSection">
          <div className="icons">
            {marker.instagramLink ? <a href={marker.instagramLink} rel="noopener noreferrer" target="_blank">
              <img src="/instagram.svg" />
            </a> : null}
            {marker.telegramLink ? <a href={marker.telegramLink} rel="noopener noreferrer" target="_blank">
              <img src="/telegram.svg" />
            </a> : null}
            {marker.facebookLink ? <a href={marker.facebookLink} rel="noopener noreferrer" target="_blank">
              <img src="/facebook.svg" />
            </a> : null}
          </div>
        </div>
        <div className="panel copyLinkSection">
          <div className="description">
            Копировать ссылку
          </div>
          <div className="url">
            {window.location.href}
          </div>
        </div>
      </div >
    )
  }
}

export default withRouter(CurrentMarker)
