import React, { Component } from "react";
import PropTypes from "prop-types";
import { notification, Icon } from "antd";
import { Checkbox } from "antd";
import AskAns from './AskAns';
import { Button } from 'antd';
import EmailList from './EmailList';
const close = () => {
  console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
};

const openNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="medium" onClick={() => notification.close(key)}>
      Confirm
    </Button>
  );
  notification.open({
    message: 'Chú ý',
    description: 'Bạn đã nhập xong tất cả các câu hỏi, hay chuyển sang Tab Thống Kê để Trainning',
    btn,
    key,
    onClose: close,
    style:{fontWeight:'bold',  color:'red'}
  });
};
export const ipServer = "http://172.104.41.68:5060/select";
export const updateServer = "http://172.104.41.68:5060/update";



export const FetchData = async () => {
  const rawResponse = await fetch(ipServer, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  });
  const content = await rawResponse.json();
  //console.log('wtfffffffffffffffffffff');
  //console.log(content);
  return content;
};

async function HuanFetch(url, json) {
  const myRequest = new Request(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(json)
  });
  return await fetch(myRequest)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.debug("Something went wrong on api server!");
      }
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.debug(error);
    });
}

class PageNumber extends Component {
  constructor(props){
    super(props);
    this.state = {
      cur:this.props.cur,
      max:this.props.max
    }
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      cur:nextProps.cur,
      max:nextProps.max
    })
  }
  render() {
    return (
      <div style={{fontWeight:'bold', fontSize:'15px'}}>
        Số câu chưa trả lời: {this.state.max} <br/>
        Đang xử lý câu: {this.state.cur + 1} / {this.state.max}
      </div>
    )
  }
}
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        pos: 0,
        arr: [
          {
            Answer: "abc",
            AskingTime: "2018-11-09T00:00:00.000Z",
            Checked: 1,
            IdQuestion: 1,
            Question: "abc",
            Topic: "0,0,1...."
          }
        ]
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let content = FetchData();
    content.then(content => {
      this.setState(() => ({
        data: {
          pos: 0,
          arr: content.rows.filter(x => x.Checked == 0)
        }
      }));
    });
  }
  handleChange(key, val) {
    console.log("llllll");
    console.log(key, val);
    let newData = this.state.data;
    let pos = this.state.data.pos;
    //console.log(this.state);
    newData.arr[pos][key] = val;
    if (key == "Topic") newData.arr[pos].Checked = 1;
    this.setState({
      data: newData
    });

    console.log(newData);
  }
  handleSubmit(e) {
    //alert(this.state);
    //openNotification();
    let pos = this.state.data.pos;
    /*
    HuanFetch(updateServer, {
      IdQuestion: this.state.data.arr[pos].IdQuestion,
      Answer: this.state.data.arr[pos].Answer,
      Topic: this.state.data.arr[pos].Topic
    }).then(ans => {
      console.log(ans);
    });
    */
    let nextPos = this.state.data.pos + 1;
    //console.log()
    if (this.state.data.pos === this.state.data.arr.length - 1) {
      // alert
      openNotification();
    } else {
      //nextPos = 0;
      this.setState(() => ({
        data: {
          pos: nextPos,
          arr: this.state.data.arr
        }
      }));
    }
    //console.log(this.state);
    e.preventDefault();
  }
  render() {
    let pos = this.state.data.pos;
    let Question = "";
    let Answer = "";
    if (this.state.data.arr[pos].Question != null)
      Question = this.state.data.arr[pos].Question;
    else Question = "";
    if (this.state.data.arr[pos].Answer != null)
      Answer = this.state.data.arr[pos].Answer;
    else Answer = "";
    //console.log(pos + 'wtffffff'+this.state.data.arr[pos].Checked);
    //let arrCheckBoxs = this.state.data.arr[pos].Topic;
    return (
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-8"><AskAns/></div>
          <div class="col"><EmailList/></div>
        </div>
        
          
        
        <div class="row justify-content-around">
          

          <Button type="primary" onClick={this.handleSubmit} size="Large" style={{marginTop:"20px"}}>
          Gửi Email
        </Button>
        </div>
      </div>
    );
  }
}

export default Home;
