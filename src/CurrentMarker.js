import React, { Component } from 'react'


class CurrentMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { marker } = this.props;
    console.log(this.props);

    return (
      <div className="currentMarkerDetailsContainer">
          <div className="panel nameSection">
            <img className="companyImg" src="/kazbek.jpg"></img>
            <div className="infoSection">
              <div className="name">
                {marker.name}
              </div>
              <div className="status orange">На грани закрытия</div>
              <div className="lastUpdateDate">3 часа назад</div>
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
              <img src="/instagram.svg" />
              <img src="/telegram.svg" />
              <img src="/facebook.svg" />
            </div>
          </div>
      </div>
    )
  }
}

export default CurrentMarker
