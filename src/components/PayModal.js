import React, { Component } from 'react';
import { sendReceipt } from '@services/api';
import { API_BASE_URL } from '@config/constants';
import { Form, Button } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import classnames from 'classnames';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

class PayModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      receiptImage: null,
      isValid: false,
      confirmationMessage: '',
      errorMessage: '',
      isOpen: props.isOpen,
      accountNumber: props.accountNumber,
      markerId: props.markerId,
      qrImage: props.qrImage,
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    this.setState({isOpen: nextProps.isOpen, isValid: false, phone: '', receiptImage: null, confirmationMessage: '', errorMessage: ''});
  }

  validate = () => {
    const { receiptImage, phone } = this.state;

    if (receiptImage && phone.length > 1) {
      this.setState({isValid: true });
    }
    else {
      this.setState({isValid: false });
    }
  }

  setPhone = (phone) => {
    this.setState({ phone: phone }, () => {
      this.validate();
    });
  };

  onDropReceipt = (photo) => {
    this.setState({
      receiptImage: photo[0],
    }, () => {
      this.validate();
    });
    
  };

  
  sendReceipt = (e) => {
    e.preventDefault;
    const { isValid, markerId, phone, receiptImage } = this.state;

    if (!isValid) {
      return;
    }

    sendReceipt(markerId, phone, receiptImage).then(() => {
      this.setState({confirmationMessage: 'Чек успешно добавлен'});
    }).catch(() =>  {
      this.setState({errorMessage: "В процессе загрузки чека произошла ошибка"});
    });
  }

  render() {
    const { isOpen, isValid, qrImage, accountNumber } = this.state;
    const imgPath =  qrImage !== "default.png" ? `${API_BASE_URL}/${qrImage}` : `${process.env.PUBLIC_URL}/sampleQR.png`;

    if (!isOpen) {
      return null;
    }

    return (
      < div className="payModalContainer">
        <div className="closeModal" onClick={this.props.onClose}>x</div>
        <div className="header">Cпособ перевода</div>
        <div className="tabs">
          <div className="tab selected">Оплати</div>
        </div>
        <div className="descriptionSection">
          <div className="qrImage"><img src={imgPath} /></div>
          <div className="textSection">
            <div className="title">Номер кошелька {accountNumber}</div>
            <div className="description">Отправьте любую сумму на этот кошелёк. Не забудьте сделать скриншот чека и сохраните его до окончания эпидемии COVID-19. Перевод осуществляется напрямую владельцу заведения, а money4.city не взымает комиссию. Проект основан на доверии и не несёт ответственности за возврат денег.</div>
          </div>
        </div>
        <div className="paymentApproveSection">
          <div className="header">
            Подтверждение оплаты
          </div>
          <div className="description">
            Загрузите скриншот чека.
          </div>
        </div>
        <div className="data">
        <Form className="form">
        <PhoneInput
          country={'by'}
          value={this.state.phone}
          onChange={phone => this.setPhone(phone)}
        />
          <ImageUploader
            singleImage
            withPreview
            withIcon={false}
            buttonText="Загрузите чек"
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            className="imageUploader"
            onChange={this.onDropReceipt}
          />
          <Button variant="primary" className={classnames("sendReceiptButton", isValid ? "valid" : "invalid")} type="button" onClick={(e) => this.sendReceipt(e)}>
            Отправить
          </Button>
        </Form>
        {this.state.confirmationMessage ? <div className="confirmationMessage">{this.state.confirmationMessage}</div> : null}
        {this.state.errorMessage ? <div className="errorMessage">{this.state.errorMessage}</div> : null}
        </div>
      </div>
    )
  }
}

export default PayModal
