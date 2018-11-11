import React, { Component } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

class EmailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr:[
        'fishface550@yahoo.com',
        'fishface57@hotmail.com',
        'fishfacefool@yahoo.com',
        'fishfactory22@yahoo.com',
        'fishfad@yahoo.com',
        'fishfan29@hotmail.com'
      ]
    }
  }

  render() {
    let emails = this.state.arr.join('\r\n');
    
    //console.log(this.state.arr);
    //console.log(emails);
    return (
      <div class="card" >
      
        <div class="card-body">
          <h5 class="card-title">Danh sách Email</h5>
          <TextareaAutosize class="form-control">
          {emails}
          </TextareaAutosize>
        </div>
      </div>
    );
  }
}

export default EmailList;