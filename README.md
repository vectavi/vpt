
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


Reference Contract Sources
--------------------------
Token Manager is an implementation of the [Gnosis multisig wallet](https://github.com/gnosis/MultiSigWallet)
also see the blog [Release of new Multisig Wallet](https://blog.gnosis.pm/release-of-new-multisig-wallet-59b6811f7edc)

Presale Token contract is adapted from the [SONM project](https://github.com/sonm-io/presale-token.git)


Compile, Test, Deploy
---------------------

Requires Node.js version >= 6.5.1 and truffle@^3.1.1.

**Contracts**

```
$ truffle install
$ node -v
v8.4.0
$ truffle version
Truffle v4.0.0-beta.2 (core: 4.0.0-beta.2)
Solidity v0.4.17 (solc-js)
$
$ truffle test --network development
No secrets.json found. If you are trying to publish EPM this will fail. Otherwise, you can ignore this message!
Using network 'development'.



  Contract: PresaleToken
    ✓ can succesfully create PresaleToken (38ms)
    ✓ should start in phase Created
    ✓ should fail to buyTokens in Phase.Created
    ✓ should fail to call burnTokens in Phase.Created
    ✓ tokenManager can call withdrawEther in Phase.Created
    ✓ tokenManager can call setCrowdsaleManager in Phase.Created (60ms)
    ✓ random guy should fail to call setCrowdsaleManager in Phase.Created
    ✓ can succesfully create another PresaleToken
    ✓ can't move from Created to Created (38ms)
    ✓ can't move from Created to Paused (45ms)
    ✓ can't move from Created to Migrating (44ms)
    ✓ can't move from Created to Migrated (48ms)
    ✓ can move from Created to Running (54ms)
    ✓ can call buyTokens in Phase.Running (302ms)
    ✓ should fail buyTokens beyond token limit in Phase.Running
    ✓ should fail to call burnTokens in Phase.Running
    ✓ tokenManager can call withdrawEther in Phase.Running (263ms)
    ✓ tokenManager can call setCrowdsaleManager in Phase.Running (587ms)
    ✓ random guy should fail to call setCrowdsaleManager in Phase.Running
    ✓ can call buyTokens in Phase.Running again (291ms)
    ✓ can't move from Running to Created (53ms)
    ✓ can't move from Running to Running (56ms)
    ✓ can't move from Running to Migrated (39ms)
    ✓ can move from Running to Paused (44ms)
    ✓ should fail to call buyTokens in Phase.Paused
    ✓ should fail to call burnTokens in Phase.Paused
    ✓ tokenManager can call withdrawEther in Phase.Paused (262ms)
    ✓ random guy should fail to call setCrowdsaleManager in Phase.Paused (554ms)
    ✓ can't move from Paused to Created (44ms)
    ✓ can't move from Paused to Paused (44ms)
    ✓ can't move from Paused to Migrated
    ✓ can move from Paused to Running (45ms)
    ✓ can call buyTokens in Phase.Running again (298ms)
    ✓ tokenManager can call setCrowdsaleManager in Phase.Running (47ms)
    ✓ can't move from Running to Migrating
    ✓ tokenManager can call setCrowdsaleManager in Phase.Running
    ✓ can move from Running to Migrating
    ✓ should fail to call buyTokens in Phase.Migrating
    ✓ random guy should fail to call burnTokens in Phase.Migrating
    ✓ crowdsaleManager can call burnTokens in Phase.Migrating (60ms)
    ✓ tokenManager can call withdrawEther in Phase.Migrating
    ✓ should fail to call setCrowdsaleManager in Phase.Migrating
    ✓ can't move from Migrating to Created
    ✓ can't move from Migrating to Running
    ✓ can't move from Migrating to Paused
    ✓ can't move from Migrating to Migrating
    ✓ can't move from Migrating to Migrated
    ✓ crowdsaleManager can call burnTokens in Phase.Migrating
    ✓ should automatically switch to Phase.Migrated when all tokens burned
    ✓ can't move from Migrated to Created
    ✓ can't move from Migrated to Running
    ✓ can't move from Migrated to Paused
    ✓ can't move from Migrated to Migrating
    ✓ can't move from Migrated to Migrated
    ✓ should fail to call buyTokens in Phase.Migrated
    ✓ tokenManager can call withdrawEther in Phase.Migrated

  Contract: TokenManager
    ✓ should be able to create TokenManager with 3 members (107ms)
    ✓ should be able to create PresaleToken with specified manager (42ms)
    ✓ should be able to switch presale to Phase.Running (91ms)
    ✓ should be able to set crowdsale manager (103ms)
    ✓ should be able to withdraw funds (654ms)
    ✓ should be able to switch presale to Phase.Migrating (102ms)
    ✓ should be able to burn all presale tokens {from: c} in Phase.Migrating (47ms)
    ✓ should automatically switch to phase after burning all presale tokens to Phase.Migrated


  64 passing (6s)

$ # on debian linux
$ # stop rpctest in other terminal window
$ # run mist on rinkeby test network (or start geth)
$ mist --node-rinkeby --node-networkid 4 --node-rpc --node-rpcapi="db,eth,net,web3,personal" --node-rpccorsdomain "*"
$ # use geth to unlock coinbase account to pay for deployment gas - make sure your coinbase has ether
$ cd :~/.config/Mist/binaries/Geth/unpacked
$ ./geth --rinkeby attach "~/.ethereum/geth.ipc"
Welcome to the Geth JavaScript console!

instance: Geth/v1.7.2-stable-1db4ecdc/linux-amd64/go1.9
coinbase: 0x47cd92b0824e06accd9805bebeb89b676bedb79f
at block: 1252048 (Thu, 16 Nov 2017 07:14:18 EST)
 datadir: ~/.ethereum/rinkeby
 modules: admin:1.0 clique:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> personal.unlockAccount(eth.accounts[0], "type-your-primary-account-passphrase-here", 0);
true
> 
$ 
$ # back in test terminal window
$ truffle migrate --verbose-rpc --network rinkeby --reset
No secrets.json found. If you are trying to publish EPM this will fail. Otherwise, you can ignore this message!
Using network 'rinkeby'.
.
.
.
# 
# grab vital data, note tx status 1 => success:
# Fri 08 Dec 2017 12:14:40 PM EST 
  - TokenManager: 0x8a0e9af1271b761edfc28292b8778503fd63568f
    - "blockHash": "0x917c6ae1359ea9c56e2cb0b3cef8956be1cb0ba79f513c3949875b34e3b91ef4",
    - "blockNumber": "0x150cac",
    - "status": "0x1",
    - "transactionHash": "0x698d8601bb1b9911b73ae2b5bf271db4c6b174bbb1a6e53b6655ef93ac4b99b2",

  - PresaleToken: 0x62f237fe1af3287eca044a554b3e429f4c6e2536
    - "blockHash": "0x277d503725d1228b70eaa8e3138511afe8f313110183ffb6c6358ccb1f3acf0e",
    - "blockNumber": "0x150cae",
    - "status": "0x1",
    - "transactionHash": "0xe2710eafa5988ea0bbf9b0e809718b52e4f1dd740569e55525bc31c9663b03d1",
# 
# you can verify deployment tx and contract here:
# https://rinkeby.etherscan.io/tx/0x698d8601bb1b9911b73ae2b5bf271db4c6b174bbb1a6e53b6655ef93ac4b99b2
# https://rinkeby.etherscan.io/tx/0xe2710eafa5988ea0bbf9b0e809718b52e4f1dd740569e55525bc31c9663b03d1
# 
# 
# Update this readme with the data above
# update the ICO token migration script with presale 
# token address (dapp/vmt/migrations/2_deploy_contracts.js)
# Update web-ui/src/constants.js (part of web-ui discussed below) with data grabbed above.
# Copy contract json files into web-ui (assuming the were changed):
$ cp -v build/contracts/PresaleToken.json web-ui/src/
‘build/contracts/PresaleToken.json’ -> ‘web-ui/src/PresaleToken.json’
$ cp -v build/contracts/TokenManager.json web-ui/src/
‘build/contracts/TokenManager.json’ -> ‘web-ui/src/TokenManager.json’
```


**UI**

```
$ cd web-ui
$ npm install
$ npm start
```

###### not yet, maybe later
You can also deploy UI to gh-pages with `npm run deploy`.


