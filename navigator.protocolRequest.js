
(function(){

  var handlers = {};

  navigator.protocolRequest = function(protocol, obj){
    var transaction = obj || {};
    transaction.data = transaction.data || {};
    return new Promise(function(resolve, reject){
      handler = handlers[protocol] || establishConnection(protocol);
      transaction.data.protocol = protocol;
      transaction.data.__prototcolRequestID__ = Math.random().toString(36).substr(2, 16);
      transaction.resolve = resolve;
      transaction.reject = reject;
      handler.transactions[__prototcolRequestID__] = transaction;
      messageFrame(handler, transaction);
    });
  }

  function establishConnection(protocol){
    var handler = handlers[protocol] = {
      protocol: protocol,
      transactions: {},
      connected: false
    };
    var frame = handler.frame = document.createElement('iframe');
        frame.style.position = 'absolute';
        frame.style.top = '-1px';
        frame.style.left = '-1px';
        frame.style.opacity = '0';
        frame.style.width = '0px';
        frame.style.height = '0px';
        frame.style.border = 'none';
        frame.__protocolRequestHandler___ = handler;
        frame.onload = function(event){
          handler.connected = true;
          for (var z in handler.transactions) messageFrame(handler, handler.transactions[z]);
        }
    frame.src = protocol + ':#';
    document.body.appendChild(frame);
    return handler;
  }

  function messageFrame(handler, transaction){
    if (handler.connected && !transaction.posted) {
      handler.frame.contentWindow.postMessage(JSON.stringify(transaction.data), '*');
      transaction.posted = true;
    }
  }

  window.addEventListener('message', function(event){
    var handler = event.source.__protocolRequestHandler___;
    var data = JSON.parse(event.data);
    if (handler) { // this is an indication the script is running in the host page
      handler.transactions[data.__prototcolRequestID__].resolve(data.response);
    }
    else if (data.__prototcolRequestID__) { // this is for messages arriving in the frame
      var message = new ProtocolMessage(event, data);
      fireEvent(window, 'protocolrequest', message);
    }
  });

  function fireEvent(element, type, detail){
    var event = doc.createEvent('CustomEvent');
    options = options || {};
    event.initCustomEvent(type, false, false, detail);
    element.dispatchEvent(event);
  }

  function ProtocolMessage(event, data){
    this.protocol = data.protocol;
    this.source = event.source;
    this.__prototcolRequestID__ = data.__prototcolRequestID__;
    delete data.__prototcolRequestID__;
    this.data = data;
  }

    ProtocolMessage.prototype.respond = function(obj){
      obj.__prototcolRequestID__ = this.__prototcolRequestID__;
      this.source.postMessage(JSON.stringify(this.data), '*');
    }

})();
