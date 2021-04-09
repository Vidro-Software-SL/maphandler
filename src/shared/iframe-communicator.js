const isSSR = typeof window === 'undefined';

const sendMessageToMap = message => {
  if(isSSR) return;
  window.top.frames['map-frame'].postMessage(message, "*");
}


export {
	sendMessageToMap,
}