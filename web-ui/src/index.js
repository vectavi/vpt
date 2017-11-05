import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

/*global web3*/
//Web3 = require('web3');
import Web3 from 'web3';
import App from './App';

if (typeof web3 !== 'undefined') {
  var web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  //var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/Jhq7HuarxWAoAQobO50k"));
}
//var web3 = new Web3();
//web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
console.log("typeof web3 is "+(typeof web3));
console.log("web3.version is "+web3.version);
console.log("web3.isConnected() is "+web3.isConnected());
console.log("typeof web3.version.network is "+(typeof web3.version.network));
console.log("typeof web3.version.getNetwork is "+(typeof web3.version.getNetwork));

injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
