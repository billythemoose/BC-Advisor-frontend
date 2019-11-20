import React, { Component } from 'react'
import './Upload.css'
import Dropzone from '../dropzone/Dropzone'

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
          files: [],
          uploading: false,
          uploadProgress: {},
          successfullUploaded: false
        };
    
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.renderActions = this.renderActions.bind(this);
      }

  render() {
    return (
      <div className="Upload">
        <span className="Title">Upload Transcript</span>
        <div className="Content">
        <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <div />
          <div className="Files">
          {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">

        </div>
      </div>
    );
  }
}
  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

