// 基础路径
let websocketBaseURL = 'ws://localhost:8889';

// websocket 封装
class websocketModel {
  constructor(params) {
    this.params = params;
    this.messageCallBack = [];
    this.connectionSum = 0;
    this.connectionMax = this.params.connectionMax;
    this.init();
  }
  init() {
    this.websocket = new WebSocket(this.params.url);
    this.websocket.onmessage = (msg) => {
      try {
        let data = JSON.parse(msg.data);
        this.messageCallBack.forEach(val => val(data.code, data.data));
      } catch (error) {}
    }
    this.websocket.onopen = () => {}
    this.websocket.close = () => {
      this._refsh();
    }
    this.websocket.onerror = (error) => {
      // 错误重连次数
      this._refsh();
    }

  }
  _refsh() {
    this.connectionSum++;
    if (this.connectionSum < 0 || this.connectionSum < this.connectionMax) {
      this.init();
    }
  }
  // 添加消息回调
  onmessage(msgCallback) {
    this.messageCallBack.push(msgCallback);
  }
  sendMessage(msgJson) {
    this.websocket.send(msgJson);
  }
}

let params = {
  url: websocketBaseURL,
  connectionMax: -1, // 错误重连次数 负数一直
}

export default ({}, inject) => {
  inject('websocket', new websocketModel(params));
}
