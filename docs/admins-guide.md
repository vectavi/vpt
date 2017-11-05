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

//
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

`TokenManager` contract implementation is based on the [multisig wallet by
Gnosis](https://blog.gnosis.pm/release-of-new-multisig-wallet-59b6811f7edc),
it is used to collectively manage ETH funds and allows withdrawals,
adding/removing owners, and sending custom transactions. There is web-based UI
to interact with it: https://wallet.gnosis.pm.

The deployed `TokenManager` contracts are configured each with 3 manager
addresses and require 2 confirmations to run transactions:

  else if (network === "rinkeby") {
    team =
      [ "0x47cD92b0824E06ACCd9805bebEB89b676beDB79F" // primary, Main account (Etherbase, owner 1)
      , "0x6b385cE594d12d4C4EfD5e19FF34c8eabb78d531" // secondary, Account 2 (owner 2)
      , "0xAfc411ab664F9c38044510D9fd40F62E79460594" // secondary, Account 3 (owner 3)
      ];
    escrow = "0x6C2266C3B89e0e07bD1d7e02f18AD581Bf2b933F"; // rinkeby (Account 4, escrow)

  }

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

