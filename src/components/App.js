import React, { Component }from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
    ws: new WebSocket('ws://125.130.66.85:3200/ws/chat'),
    text: "",
    chatBox: ""
    }
  }
  handleChange(e){
    this.setState({
    text: e.target.value
    })
  }
  handleSubmit(e){
    e.preventDefault();
    let {ws, text} = this.state;
    ws.send(text);
    this.setState({text: ''});
  }
  handleData(data) {
    let chatBox = this.state.chatBox;
    chatBox = chatBox +  '\n' + data;
    this.setState({chatBox});
    console.log(data);
  }
  setupWebsocket() {
    let ws = this.state.ws;
    ws.onopen = () => {
      console.log('Websocket connected');
    };
    ws.onmessage = (e) => {
      this.handleData(e.data);
    };
    ws.onclose = () => {
      console.log('Websocket disconnected');
      if (this.props.reconnect) {
        setTimeout(() => {
          this.setState({attempts: this.state.attempts++});
          this.setupWebsocket();
        }, 2000);
      }
    }
  }
  componentDidMount() {
    this.setupWebsocket();
  }
  componentWillUnmount() {
    let ws = this.state.ws;
    ws.close();
  }
  render(){
    return (
      <div>
        <div className="chatBox">
          {this.state.chatBox.split('\n').map((line) => {
            return (
              <span>
                {line}<br/>
              </span>
            )
          })}
        </div>
       <form onSubmit={(e) => this.handleSubmit(e)}>
         <input type="text" onChange={(e) => this.handleChange(e)} value={this.state.text}/>
         <input type="submit" value="Enter" />
      </form>
        <h1>Hello World</h1>
        <h3>Node.js express express-ws React, Webpack with ES6</h3>
      </div>
    );
  }
}

export default App;
