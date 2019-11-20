import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.parcel';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import pdfFile from //button;

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};
export default class Transcriptdisplay extends Component {
  state = {
    file: pdfFile,
    numPages: null,
  }
  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
  render() {
    const { file, numPages } = this.state;
    return (
      <div className="Transcript">
        <header>
          <h1>Transcript Uploader</h1>
        </header>
        <div className="Transcript__container">
          <div className="Transcript__container__load">
            <label htmlFor="file">Load from file:</label>
            {' '}
            <input
              onChange={this.onFileChange}
              type="file"
            />
          </div>
          <div className="Transcript__container__document">
            <Document
              file={file}
              onLoadSuccess={this.onDocumentLoadSuccess}
              options={options}
            >
              {
                Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                    />
                  ),
                )
              }
            </Document>
          </div>
        </div>
      </div>
    );
  }
}