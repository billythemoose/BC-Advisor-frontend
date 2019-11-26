import React from 'react';
export default class SubmitComponent extends React.Component{
    onChange(e){
        let files=e.target.files;
        let reader=new FileReader();
        reader.readAsText(files);      
    }
    
    render(){
        <dev on Submit={this.onFormSubmit}>
            <h1>Transcript Upload</h1>
            <input type="file" name="file" onChange={(e)=>this.onChange(e)} />
        </dev>
    }
    
}