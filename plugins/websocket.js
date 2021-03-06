import config from '../config'
// 基础路径
let websocketBaseURL = config.websocketBaseURL;

// websocket 封装
// 错误重连次数 负数一直
class websocketModel {
  constructor(params = {
    url: websocketBaseURL,
    connectionMax: -1,
  }) {
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
      console.error('websocket link fail%o', error)
      // 错误重连次数
      this._refsh();
      return false;
    }

  }
  _refsh() {
    this.connectionSum++;
    if (this.connectionMax < 0 || this.connectionSum < this.connectionMax) {
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
  close() {
    this.websocket.close()
  }
}

export default ({}, inject) => {
  inject('websocket', new websocketModel());
}
