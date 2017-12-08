During its lifetime, presale contract passes through several *phases*. Each
phase determines which functions can be called on the contract. Token managers
are able to switch phases according to rules described below.

Switching phases and calling administrative functions is possible only by
joint decision of token managers.


Phases
------

There are five phases:
  - **Created**. Contract is just created and investors are not yet able to
    buy tokens. Token managers can start presale.
  - **Running**. Investors can buy tokens (until presale limit is reached).
    Token managers are able to temporarily pause presale or switch to
    migration phase.
  - **Paused**. Investors can't buy tokens. Token managers can resume presale
    or switch to migration phase.
  - **Migrating**. Presale is over, investors can't buy tokens but can migrate
    or convert their presale tokens for ICO tokens via the crowdsale contract.
  - **Migrated**. Presale contract automatically switches to this phase when
    all tokes are successfully migrated. At this phase presale is totally
    finished.


Management Functions
--------------------

  - `tokenWithdrawEther`. This function moves all collected Ether to token escrow 
    account. The function can be called at any presale phase any number of times.
  - `tokenSetPresalePhase`. Allows to switch presale phases. Only specific
    phase transitions that comply to this state diagram are allowed:


```
                  +-----------+
                  |           |
               +-->  Running  +---------+
               |  |           |         |
+-----------+  |  +--+----^---+  +------v-------+     +-----------+
|           |  |     |    |      |              |     |           |
|  Created  +--+     |    |      |  Migrating   +-----> Migrated  |
|           |        |    |      |              |     |           |
+-----------+        |    |      +------^-------+     +-----------+
                  +--v----+---+         |
                  |           |         |
                  |  Paused   +---------+
                  |           |
                  +-----------+
```

  - `tokenSetCrowdsaleManager`. This function allows to set crowdsale manager
    contract address. Crowdsale manager is responsible for migrating presale
    tokens and has exclusive rights to burn presale tokens with migration.
    Valid crowdsale manager address is required to switch to *Migrating*
    phase. It is not possible to change crowdsale manager address when
    migration is in progress.

Contracts
---------
There are two contracts involved in presale process:

  - `PresaleToken`: holds registry of investors and their token balances,
    also acts as a temporary storage for gathered ETH.
  - `TokenManager`:  standard multisig wallet with extra functions to control
    presale process.

For testing purposes those contracts are deployed on test networks:

  - Rinkeby: Fri 08 Dec 2017 12:14:40 PM EST 
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


Reference Contract Sources
--------------------------
Presale Token contract is adapted from the [SONM project](https://github.com/sonm-io/presale-token.git)

Token Manager is an implementation of the [Gnosis multisig wallet](https://github.com/gnosis/MultiSigWallet)
also see the blog [Release of new Multisig Wallet](https://blog.gnosis.pm/release-of-new-multisig-wallet-59b6811f7edc)
it is used to collectively manage ETH funds and allows withdrawals,
adding/removing owners, and sending custom transactions. There is [web-based UI to interact with it](https://wallet.gnosis.pm).

The deployed `TokenManager` contracts are configured each with 3 manager
addresses and require 2 confirmations to run transactions:

  - Manager addresses on Rinkeby
    -  [0x47cD92b0824E06ACCd9805bebEB89b676beDB79F](https://rinkeby.etherscan.io/address/0x47cD92b0824E06ACCd9805bebEB89b676beDB79F)
    - [0x6b385cE594d12d4C4EfD5e19FF34c8eabb78d531](https://rinkeby.etherscan.io/address/0x6b385cE594d12d4C4EfD5e19FF34c8eabb78d531)
    - [0xAfc411ab664F9c38044510D9fd40F62E79460594](https://rinkeby.etherscan.io/address/0xAfc411ab664F9c38044510D9fd40F62E79460594)

All those addresses are preloaded with some ether for testing purposes.


Presale Administration
----------------------

`TokenManager` contract adds three new functions to the multisig. Those
functions allow to withdraw ETH funds from the `PresaleToken`, switch presale
phase, and set crowdsale contract address. There is web-based UI to simplify
executing administrative functions: https://sonm-io.github.io/token. In the
following we will see how to use it.

By default, `PresaleToken` conrtact does not allow to buy tokens. Presale team
can enable buying by switching `PresaleToken` to "Running" phase.

On the "Actions" tab you can see "Available actions" section. (If this is not
the case, select registered multisig account in your Web3 provider and refresh).

![Available actions](available_actions.png)

Press "Start Presale" button, confirm transaction, then wait for the
transaction to be mined, and refresh the page (if required). Now you will see
new action in "Pending actions" section.

Anoter member of the team can see pending action and confirm it.

![Pending action](pending_action.png)

After two confirmations the action will be executed and token buying will be
enabled. You can switch to "Token Info" and see "Buy tokens" button.

![Buy tokens](buy_tokens.png)

Other actions like pause / resume / withdraw can be executed in the same way.

