//
// Rinkeby: Fri 08 Dec 2017 12:14:40 PM EST
//   - TokenManager: 0x8a0e9af1271b761edfc28292b8778503fd63568f
//     - "blockHash": "0x917c6ae1359ea9c56e2cb0b3cef8956be1cb0ba79f513c3949875b34e3b91ef4",
//     - "blockNumber": "0x150cac",
//     - "status": "0x1",
//     - "transactionHash": "0x698d8601bb1b9911b73ae2b5bf271db4c6b174bbb1a6e53b6655ef93ac4b99b2",
//
//   - PresaleToken: 0x62f237fe1af3287eca044a554b3e429f4c6e2536
//     - "blockHash": "0x277d503725d1228b70eaa8e3138511afe8f313110183ffb6c6358ccb1f3acf0e",
//     - "blockNumber": "0x150cae",
//     - "status": "0x1",
//     - "transactionHash": "0xe2710eafa5988ea0bbf9b0e809718b52e4f1dd740569e55525bc31c9663b03d1",
//

export default {
  "*": {
    NETWORK_NAME: "testrpc",
    TOKEN_ADDRESS: "",
    // check if this is our token
    EXPECTED_TOKEN_NAME: "Vectavi Presale Token",
    // Block number when token was deployed (this is used to filter events).
    DEPLOYMENT_BLOCK_NUMBER: 1
  },

  1: {
    NETWORK_NAME: "Main",
    TOKEN_ADDRESS: "",
    EXPECTED_TOKEN_NAME: "Vectavi Presale Token",
    DEPLOYMENT_BLOCK_NUMBER: 1
  },

  4: {
    NETWORK_NAME: "Rinkeby",
    TOKEN_ADDRESS: "0x62f237fe1af3287eca044a554b3e429f4c6e2536",
    EXPECTED_TOKEN_NAME: "Vectavi Presale Token",
    DEPLOYMENT_BLOCK_NUMBER: 1253014 // "0x150cac" - oldest block for watching events by app
  },
}
