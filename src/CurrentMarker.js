import React, { Component } from 'react';
import { API_BASE_URL } from '@config/constants';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { getActiveMarkers, getInactiveMarkers, confirmMarker } from '@services/api';
import PayModal from '@components/PayModal';


class CurrentMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: this.props.markers || [],
      marker: null,
      openPayModal: false,
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    if (this.props.loadInactiveMarkers) {
      getInactiveMarkers().then((result) => {
        this.setState({markers: result});

        if (this.props.match.params.id && result) {
          const marker = result.find(m => m.id == this.props.match.params.id);
    
          if (marker) {
            this.setState({ marker: marker });
          }
        }
      });
    }
    else{
      getActiveMarkers().then((result) => {
        this.setState({markers: result});

        if (this.props.match.params.id && result) {
          const marker = result.find(m => m.id == this.props.match.params.id);
    
          if (marker) {
            this.setState({ marker: marker });
          }
        }
      });
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps){
    if (nextProps.match.params.id) {
      const marker = this.state.markers.find(m => m.id == this.props.match.params.id);

      if (marker) {
        this.setState({ marker: marker });
      }
    }
  }

  confirmMarker = (id) => {
    confirmMarker(id).then(() => {
      alert("Маркер заапрувлен");
    })
  }

  onCloseMarker = () => {
    this.setState({ marker: null })

    if (this.props.loadInactiveMarkers) {
      this.props.history.push("/validate");
    }
    else{
      this.props.history.push("/");
    }
  }

  openPayModal = () => {
    this.setState({openPayModal: true});
  }

  onClosePayModal = () => {
    this.setState({openPayModal:false})
  }

  render() {
    const marker = this.state.markers.find(m => m.id == this.props.match.params.id);

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
      <div className="currentMarkerDetailsContainer" >
        <PayModal isOpen={this.state.openPayModal} accountNumber={marker.accountNumber} markerId={marker.id} qrImage={marker.qrImagePath} onClose={this.onClosePayModal} />
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
          { marker.ownerAvatarPath ?
             <img src={`${API_BASE_URL}/${marker.ownerAvatarPath}`} className="userAvatar"></img> :
            <span className="fa fa-user"></span> } 
              {marker.contactName}
          </div>
          <div className="text">
            {marker.description}
          </div>
          <div className="buttons">
            <input type="button" className="supportButton" value="Поддержать рублём" onClick={this.openPayModal}/>
            {this.props.validateMode ? <input type="button" className="confirmMarkerButton" value="Все хорошо" onClick={() => this.confirmMarker(marker.id) } /> : null}
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
