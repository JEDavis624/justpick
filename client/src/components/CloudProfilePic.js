import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'fvomzjfr';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/clarkefry04/upload';

class CloudProfilePic extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          uploadedFileCloudinaryUrl: ''
        };
    }

    onImageDrop(files) {
        this.setState({
          uploadedFile: files[0]
        });
    
        this.handleImageUpload(files[0]);
      }

      handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);
    
        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }
    
          if (response.body.secure_url !== '') {
            this.setState({
              uploadedFileCloudinaryUrl: response.body.secure_url
            });
            this.props.onPhotoUpdate(response.body.secure_url);
          }
        });
      }

    render() {
      return(
          <div className="FileUpload">
              <Dropzone
                  id="dropZoneImage"
                  multiple={false}
                  accept="image/*"
                  onDrop={this.onImageDrop.bind(this)}>
                  <p>Drop an image or click to select a file to upload.</p>
              </Dropzone>
          
              {this.state.uploadedFileCloudinaryUrl === '' ? null :
              <div>
                {/*<p>{this.state.uploadedFile.name}</p>*/}
              <img id="previewImage" src={this.state.uploadedFileCloudinaryUrl} alt="profile preview" />
              </div>}
          </div>
      
      )
    }
}

export default CloudProfilePic;