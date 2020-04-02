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
      contactName: '',
      longitude: '',
      description: '',
      phone: '',
      avatarFile: null,
    }
  }

  createMarker = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("address", this.state.address);
    formData.append("instagramLink", this.state.instagramLink);
    formData.append("contactName", this.state.contactName);
    formData.append("statusType", this.state.statusType);
    formData.append("latitude", this.state.latitude);
    formData.append("longitude", this.state.longitude);
    formData.append("description", this.state.description);
    formData.append("phone", this.state.phone);
    formData.append("avatarFile", this.state.avatarFile);

    postApi(endpoints.markers, formData).then((result) => {
      console.log(result);
    });
  }

  onDrop = (photo) => {
    this.setState({
      avatarFile: photo[0],
    });
}

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="createMarkerContainer">
          <Form onSubmit={(e) => this.createMarker(e)}>
            <Form.Group controlId="name">
              <Form.Label>Имя:</Form.Label>
              <Form.Control type="text" name="name" placeholder="Введите имя" onChange={(e) => this.handleChange(e)} />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Адрес:</Form.Label>
              <Form.Control type="text" name="address" placeholder="Введите адрес" onChange={(e) => this.handleChange(e)} />
            </Form.Group>
            <Form.Group controlId="contactName">
              <Form.Label>Имя представителя:</Form.Label>
              <Form.Control type="text" name="contactName" placeholder="Введите имя представителя" onChange={(e) => this.handleChange(e)} />
            </Form.Group>
            <Form.Group controlId="instagram">
              <Form.Label>Инстаграм:</Form.Label>
              <Form.Control type="text" name="instagramLink" placeholder="Введите Instagram" onChange={(e) => this.handleChange(e)} />
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
            <Form.Group controlId="statusType">
              <Form.Label>Состояние:</Form.Label>
              <Form.Control name="statusType" as="select" onChange={(e) => this.handleChange(e)}>
                <option>--Выберите Состояние--</option>
                <option value='Blocked'>На грани закрытия</option>
                <option value='NeedLowHelp'>Нужна помощь</option>
                <option value='AllGood'>Пока держимся</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Описание:</Form.Label>
              <Form.Control name="description" onChange={(e) => this.handleChange(e)} />
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
