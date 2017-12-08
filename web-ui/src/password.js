

import Web3 from 'web3';
import PROVIDER_URL         from './provider';

if (typeof web3 !== 'undefined') {
  var web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  var web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
}

// https://stackoverflow.com/questions/40170210/how-to-unlock-account-in-ethereum-using-a-custom-prompt
var promptCount = 0;

const pw_prompt = (options) => {
  var lm = options.lm || "Password:",
    bm = options.bm || "Submit";
  if (!options.callback) {
    alert("No callback function provided! Please provide one.")
  };

  var prompt = document.createElement("div");
  prompt.className = "pw_prompt";

  var submit = function () {
    options.callback(input.value);
    document.body.removeChild(prompt);
  };

  var label = document.createElement("label");
  label.textContent = lm;
  label.for = "pw_prompt_input" + (++promptCount);
  prompt.appendChild(label);

  var input = document.createElement("input");
  input.id = "pw_prompt_input" + (promptCount);
  input.type = "password";
  input.addEventListener("keyup", function (e) {
    if (e.keyCode == 13) submit();
  }, false);
  prompt.appendChild(input);

  var button = document.createElement("button");
  button.textContent = bm;
  button.addEventListener("click", submit, false);
  prompt.appendChild(button);

  document.body.appendChild(prompt);
  document.getElementById(input.id).focus()
};

export default pw_prompt

/*
pw_prompt({
        lm: 'Enter Password to load your identity',
        bm: 'Load',
        callback: function (password) {
          web3.personal.unlockAccount(accounts[0], password);
      }});
*/
