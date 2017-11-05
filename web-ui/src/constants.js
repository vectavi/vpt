// TestRPC: Tue 31 Oct 2017 12:48:03 PM EDT
// TokenManager address: 0xc54907f38352a886877800642f18d3b2c9edc523
// Token address: 0xdb8b21584fa75d0140051e5acdfa04f7b377e988

// Rinkeby: Wed 01 Nov 2017 01:40:31 PM EDT
//
// TokenManager address: 0xbb220a18c33be632fd2a64ee0883da0d03c5a2f3
//   "blockHash": "0x25878b4e078a606ec03d3aceda6e6d3e51a5f2193f85d10f430d07746946d3ba",
//   "blockNumber": "0x11d2d7",
//   "contractAddress": "0xbb220a18c33be632fd2a64ee0883da0d03c5a2f3",
//   "cumulativeGasUsed": "0x21e49b",
//   "from": "0x47cd92b0824e06accd9805bebeb89b676bedb79f",
//   "gasUsed": "0x1c24b0",
//   "status": "0x1",
//   "transactionHash": "0x8fb92b98cd6437cc84d4c3c9d6bd1ccbc8e9c3c6ec3b2ea11e8679ddec8b2f65",
//
// Token address: 0xf66ea29faadd8fe5bfac8e900f66db7fe02b1d14
//   "blockHash": "0xed9083a55376cc986b01f284521017da12573c9fd985e1633a1faefe87ad846a",
//   "blockNumber": "0x11d2d9",
//   "contractAddress": "0xf66ea29faadd8fe5bfac8e900f66db7fe02b1d14",
//   "cumulativeGasUsed": "0xa645e",
//   "from": "0x47cd92b0824e06accd9805bebeb89b676bedb79f",
//   "gasUsed": "0xa645e",
//   "status": "0x1",
//   "transactionHash": "0xeb49a67be9c3ac4d4a740fc1dcffcc26a342d5e6ed53fb0d2edda53e16e0e317",
//

export default {
  "*": {
    NETWORK_NAME: "testrpc",
    TOKEN_ADDRESS: "0xdb8b21584fa75d0140051e5acdfa04f7b377e988",
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
    TOKEN_ADDRESS: "0xf66ea29faadd8fe5bfac8e900f66db7fe02b1d14",
    EXPECTED_TOKEN_NAME: "Vectavi Presale Token",
    DEPLOYMENT_BLOCK_NUMBER: 1168089 // "0x11d2d9"
  },
}
