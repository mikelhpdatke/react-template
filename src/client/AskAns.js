import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
        {
          id: "ask1",
          ask: "Cho e hỏi muốn đăng ký kí túc xá khi nào mới đăng kí được ạ",
          ans:
            "Chào em! Vì quỹ phòng KTX ở cơ sở phía Bắc có hạn nên trước tiên sẽ ưu tiên cho những bạn thuộc các đối tượng ưu tiên trong tuyển sinh nhé! và vào ngày nhập học các em sẽ đc đăng ký KTX nhé!"
            +
            "Chào em! Vì quỹ phòng KTX ở cơ sở phía Bắc có hạn nên trước tiên sẽ ưu tiên cho những bạn thuộc các đối tượng ưu tiên trong tuyển sinh nhé! và vào ngày nhập học các em sẽ đc đăng ký KTX nhé!"
          },
        {
          id: "ask2",
          ask: "Trường có xét tuyển khối D riêng hay chung với A và A1 ạ?",
          ans:
            "Điểm trúng tuyển sẽ theo từng tổ hợp môn thi (khối) như đã thông báo."
        },
        {
          id: "ask3",
          ask:
            "Thầy cô cho em hỏi, e định nộp hồ sơ vào trường và nếu đậu em sẽ học ở Q1 hay Q9 vậy ạ?",
          ans: "Hxét tuyển, không phân chỉ tiêu theo từng khối em ạ!"
        },
        {
          id:"ask4",
          ask:"cho e hỏi khi nào cần nộp mấy cái thủ tục nhập học ạ0",
          ans:"Chào em! Sau khi em nộp giấy chứng nhận kết quả thi bản gốc về HV để xác nhận nhập học thì từ ngày 15/8 đến 19/8 HV sẽ gửi giấy báo nhập học về theo địa chỉ của em nhé! trên giấy báo sẽ có đầy đủ thông tin về thời gian, địa điểm nhập học. Em đọc thông báo sau để chuẩn bị hồ sơ nhập học trước nhé! http://portal.ptit.edu.vn/tuyensinh/thong-bao-ve-ke-hoach-xet-tuyen-va-nhap-hoc-dai-hoc-chinh-quy-dot-1-nam-2018/"
        },
        {
          id:"ask5",
          ask:"cho e hỏi là khi đăng ký xét tuyển vào trường thì em có được chọn 2nganh thuộc 2 khối khác nhau được không ạ? vd là ngành kế toán và ngành công nghệ kỹ thuật điện điện tử ấy ạ?",
          ans:"	Mỗi một nguyện vọng em đăng ký tương ứng với 1 ngành và tương ứng với 1 tổ hợp xét tuyển. Em có thể đăng ký các nguyện vọng với các ngành khác nhau hoặc là 1 ngành nhưng với các tổ hợp xét tuyển khác nhau nhưng phải đảm bảo được quy định theo thông báo xét tuyển của Học viện"
        }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let key = event.target.name;
    let val = event.target.value;
    let pos = event.target.pos;
    //this.setState((state)=>{

    //});
  }

  onResize(e){
    console.log('wtf');
    console.log(e);
  }
  render() {
    return (
      <div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Câu hỏi</h5>
            {this.state.arr.map(x => {
              let rows = x.ans.length/90+1;
              console.log(rows);
              return (
                <div id="accordion">
                  <div class="card">
                    <div class="card-header" id="headingThree">
                      <h5 class="mb-0">
                        <p class="card-text" style={{fontSize:15}}>
                          <a
                            data-toggle="collapse"
                            href={"#" + x.id}
                            role="button"
                            aria-expanded="true"
                            aria-controls={x.id}
                          >
                            {x.ask}
                          </a>
                        </p>
                      </h5>
                    </div>
                    <div
                      id={x.id}
                      class="collapse"
                      aria-labelledby="headingThree"
                      data-parent="#accordion"
                    >
                      <textarea
                        onResize = {this.onResize}
                        style={{ marginLeft: "15px", marginRight: "auto" ,fontSize:15, width:"100%"}}
                        class="card-body"
                        rows={rows}
                        value={x.ans}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
class AskAns extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div data-spy="scroll" data-target="#navbar-example2" data-offset="0">
        <Question />
      </div>
    );
  }
}

export default AskAns;
