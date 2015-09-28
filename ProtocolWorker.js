
(function(){

  var connections = {}

  ProtocolWorker = function(protocol){
    Object.defineProperties(this, {
      protocol: { value: protocol }
    });
    return this;
  }

  ProtocolWorker.prototype.connect = function(obj){
    var worker = this;
    return new Promise(function(resolve, reject){
      connections[worker.protocol] ? resolve() : establishConnection(worker.protocol, worker, resolve, reject);
    });
  }

  ProtocolWorker.prototype.request = function(obj){
    createRequest(this.protocol, obj);
  }

  function establishConnection(protocol, worker, resolve, reject){
    var connection = connections[protocol] = {
      protocol: protocol,
      transactions: {},
      connected: false
    };
    var frame = connection.frame = document.createElement('iframe');
        frame.style.position = 'absolute';
        frame.style.top = '-1px';
        frame.style.left = '-1px';
        frame.style.opacity = '0';
        frame.style.width = '0px';
        frame.style.height = '0px';
        frame.style.border = 'none';
        frame.onload = function(event){
          createRequest(protocol).then(function(data){
            connections[protocol].connected = true;
            Object.defineProperty(worker, 'provider', { value: data.__protocolProvider__ });
            resolve(data);
          }).catch(function(){
            connections[protocol].connected = false;
            reject(data);
          });
        };
    frame.src = protocol + ':#';
    document.body.appendChild(frame);
    return connection;
  }

  function createRequest(protocol, obj){
    var transaction = {};
    transaction.data = obj || {};
    return new Promise(function(resolve, reject){
      connection = connections[protocol];
      var id = transaction.data.__prototcolRequestID__ = Math.random().toString(36).substr(2, 16);
      transaction.data.__protocolRequestType__ = protocol;
      transaction.resolve = resolve;
      transaction.reject = reject;
      connection.transactions[id] = transaction;
      messageFrame(connection, transaction);
    });
  }

  function messageFrame(connection, transaction){
    if (!transaction.posted) {
      connection.frame.contentWindow.postMessage(JSON.stringify(transaction.data), '*');
      transaction.posted = true;
    }
  }

  var origins = {};
  window.addEventListener('message', function(event){
    var data = JSON.parse(event.data);
    if (window == window.top && !window.opener) { // this is an indication the script is running in the host page
      connections[data.__protocolRequestType__].transactions[data.__prototcolRequestID__][data.status == 'success' ? 'resolve' : 'reject'](data);
    }
    else if (data.__prototcolRequestID__) { // this is for messages arriving in the frame
      var protocol = data.__protocolRequestType__;
      var id = data.__prototcolRequestID__;
      delete data.__protocolRequestType__;
      delete data.__prototcolRequestID__;
      if (origins[event.origin] !== true) {
        fireEvent(window, 'protocolconnection', Object.create(data, {
          allow: {
            value: function(obj){
            origins[event.origin] = true;
            obj.__protocolProvider__ = window.location.host;
            sendResponse('success', event, obj, protocol, id);
          }},
          reject: {
            value: function(obj){
            obj.__protocolRequestRejected__ = true;
            sendResponse('rejected', event, obj, protocol, id);
          }}
        }));
      }
      else if (origins[event.origin]){
        fireEvent(window, 'protocolrequest', Object.create(data, {
          respond: {
            value: function(obj){
            sendResponse('success', event, obj, protocol, id);
          }},
          reject: {
            value: function(obj){
            obj.__protocolRequestRejected__ = true;
            sendResponse('rejected', event, obj, protocol, id);
          }}
        }));
      }
      else {
        obj.__protocolRequestRejected__ = true;
        sendResponse('rejected', event, obj, protocol, id);
      }
    }
  });

  function sendResponse(status, event, obj, protocol, id){
    obj.__protocolRequestType__ = protocol;
    obj.__prototcolRequestID__ = id;
    obj.status = status;
    event.source.postMessage(JSON.stringify(obj), '*');
  }

  function fireEvent(element, type, detail){
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, false, false, detail);
    element.dispatchEvent(event);
  }

})();
