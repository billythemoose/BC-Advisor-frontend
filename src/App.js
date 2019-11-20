import React, {Component} from 'react';
import './App.css';
import PDFViewer from './components/PDFViewer/PDFViewer';
import PDFJSBackend from './backends/pdfjs'
class App extends Component {
  render(){
    
  return (
    <div className="App">
      <PDFViewer 
        backend={PDFJSBackend}
        src='/myPDF.pdf'/>
    </div>
  );
}
}

export default App;
