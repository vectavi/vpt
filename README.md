

Vectavi Presale Contracts
=========================

These smart contracts are designed to handle initial distribution of Vectavi
Presale Tokens (VPT). Please check that you understand the major features
before investing or interacting with these contracts:

  - tokens are provided at fixed price of 5000 @ 25% discount 
    ==> 6250 VPT per 1 ETH
  - maximum amount of tokens distributed during presale is limited 
    to 312,500,000 VPT (US$15M assumes $300 is price of 1 ETH)
  - dev team is able to stop presale at any time
  - you cannot transfer VPT tokens during presale
  - you will be able to migrate/convert VPT tokens to Vectavi VMT tokens 
    when presale is in migrating phase and the Vectavi ICO sale is running
  - no refund or moneyback is available during presale
  - dev team is able to withdraw Ether at any time during or after presale
    - those funds are moved to an escrow account


Refer to [Administrator's Guide](docs/admins-guide.md)
for more details on how to interact with the contracts.


Contract Sources
-----------------
The presale smart contracts benefit from the following sources.

`TokenManager` is an implementation of the multisig wallet by Gnosis:
  https://github.com/gnosis/MultiSigWallet
  https://blog.gnosis.pm/release-of-new-multisig-wallet-59b6811f7edc

`PresaleToken` is adapted from the SONM project: 
  https://github.com/sonm-io/presale-token.git


Compile, Test, Deploy
---------------------

Requires Node.js version >= 6.5.1 and truffle@^3.1.1.

**Contracts**

```
$ truffle install
$ truffle test
$ truffle migrate --network testnet --reset
Using network 'testnet'.

Running migration: 1_deploy_contracts.js
  Deploying TokenManager...
  TokenManager: 0xc54907f38352a886877800642f18d3b2c9edc523
  Deploying PresaleToken...
  PresaleToken: 0xdb8b21584fa75d0140051e5acdfa04f7b377e988
```

**UI**

```
$ cd web-ui
$ npm install
$ npm start
```

You can also deploy UI to gh-pages with `npm run deploy`.


