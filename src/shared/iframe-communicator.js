const isSSR = typeof window === 'undefined';
class iframeCommunicator {
  constructor(data){
    this.domId = 'map-frame';
    if(typeof data.id==="string"){
      this.domId = data.id;
    }  
  }

  sendMessageToMap = message => {
    if(isSSR) return;
    window.top.frames[this.domId].postMessage(message, "*");
  }
}

export {
  iframeCommunicator,
}