import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import { postApi } from '@services/api';
import endpoints from '@config/endpoints'

class CreateMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      instagramLink: '',
      statusType: '',
      latitude: '',
      longitude: '',
      contactName: '',
      description: '',
      phone: '',
      accountNumber: null,
      imageFile: null,
      ownerAvatarFile: null,
      qrImage: null,
    }
  }

  createMarker = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("address", this.state.address);
    formData.append("instagramLink", this.state.instagramLink);
    formData.append("telegramLink", this.state.telegramLink);
    formData.append("facebookLink", this.state.facebookLink);
    formData.append("contactName", this.state.contactName);
    formData.append("statusType", this.state.statusType);
    formData.append("accountNumber", this.state.accountNumber);
    formData.append("latitude", this.state.latitude);
    formData.append("longitude", this.state.longitude);
    formData.append("description", this.state.description);
    formData.append("phone", this.state.phone);

    if (this.state.imageFile){
      formData.append("imageFile", this.state.imageFile);
    }

    if (this.state.ownerAvatarFile) {
      formData.append("ownerAvatarFile", this.state.ownerAvatarFile);
    }

    if (this.state.qrImage) {
      formData.append("qrImage", this.state.qrImage);
    }

    postApi(endpoints.markers, formData).then((result) => {
      alert("Код активации: " + result ? result.activationCode : "Ошибка, компания не была создана");
    });
  }

  onDrop = (photo) => {
    this.setState({
      imageFile: photo[0],
    });
  };

  onDropAvatar = (photo) => {
    this.setState({
      ownerAvatarFile: photo[0],
    });
  };

  onDropQR = (photo) => {
    this.setState({
      qrImage: photo[0],
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="createMarkerContainer">
        <Form onSubmit={(e) => this.createMarker(e)}>
          <Form.Group controlId="name">
            <Form.Label>Название компании:</Form.Label>
            <Form.Control type="text" name="name" placeholder="Введите имя" onChange={(e) => this.handleChange(e)} />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Адрес:</Form.Label>
            <Form.Control as="textarea" rows="5" type="text" name="address" placeholder="Введите адрес" onChange={(e) => this.handleChange(e)} />
          </Form.Group>
          <Form.Group controlId="contactName">
            <Form.Label>Имя представителя:</Form.Label>
            <Form.Control type="text" name="contactName" placeholder="Введите имя представителя" onChange={(e) => this.handleChange(e)} />
          </Form.Group>
          <Form.Group controlId="instagramLink">
            <Form.Label>Инстаграм:</Form.Label>
            <Form.Control type="text" name="instagramLink" placeholder="Введите Instagram" onChange={(e) => this.handleChange(e)} />
          </Form.Group>
          <Form.Group controlId="telegramLink">
            <Form.Label>Telegram:</Form.Label>
            <Form.Control type="text" name="telegramLink" placeholder="Введите Telegram" onChange={(e) => this.handleChange(e)} />
          </Form.Group>
          <Form.Group controlId="facebookLink">
            <Form.Label>Facebook:</Form.Label>
            <Form.Control type="text" name="facebookLink" placeholder="Введите Facebook" onChange={(e) => this.handleChange(e)} />
          </Form.Group>
          <Form.Group controlId="latitude">
            <Form.Label>Широта:</Form.Label>
            <Form.Control type="text" name="latitude" placeholder="Введите широту" onChange={(e) => this.handleChange(e)} />
          </Form.Group>
          <Form.Group controlId="longitude">
            <Form.Label>Долгота:</Form.Label>
            <Form.Control type="text" name="longitude" placeholder="Введите долготу" onChange={(e) => this.handleChange(e)} />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Телефон:</Form.Label>
            <Form.Control type="text" name="phone" placeholder="Введите телефон" onChange={(e) => this.handleChange(e)} />
          </Form.Group>
          <ImageUploader
            withIcon
            singleImage
            withPreview
            buttonText='Выберите лого для представителя'
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            className='imageUploader'
            onChange={this.onDropAvatar}
          />
          <ImageUploader
            withIcon
            singleImage
            withPreview
            buttonText='Выберите QR'
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            className='imageUploader'
            onChange={this.onDropQR}
          />
          <Form.Group controlId="statusType">
            <Form.Label>Состояние:</Form.Label>
            <Form.Control name="statusType" as="select" onChange={(e) => this.handleChange(e)}>
              <option>--Выберите Состояние--</option>
              <option value='NeedHighHelp'>На грани закрытия</option>
              <option value='NeedMiddleHelp'>Нужна помощь</option>
              <option value='NeedLowHelp'>Пока держимся</option>
              <option value='AllGood'>Все хорошо</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="accountNumber">
            <Form.Label>Номер счета:</Form.Label>
            <Form.Control type="text" name="accountNumber" placeholder="Введите номер счета" onChange={(e) => this.handleChange(e)} />
          </Form.Group>
          <Form.Group controlId="statusType">
            <Form.Label>Валюта счета:</Form.Label>
            <Form.Control name="сurrencyFormat" as="select">
              <option value='BYN'>BYN</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Описание:</Form.Label>
            <Form.Control as="textarea" rows="5" name="description" onChange={(e) => this.handleChange(e)} />
          </Form.Group>
          <ImageUploader
            withIcon
            singleImage
            withPreview
            buttonText='Выберите лого'
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            className='imageUploader'
            onChange={this.onDrop}
          />
          <Button variant="primary" className='createMarker' type="submit">
            Создать
          </Button>
        </Form>
      </div>
    )
  }
}

export default CreateMarker
