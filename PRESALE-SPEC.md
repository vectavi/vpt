

Required Functionality
----------------------

  - Presale token contract must conform to ERC20 spec.
  - Investors are able to exchange Ether for presale tokens at fixed rate
  - Investors are able to migrate their tokens to new contract after dev team
    provides new contract address.
  - Investors are not able to buy tokens when total amount of sold tokens
    reached its limit.
  - Investors are not able to transfer presale tokens to each other.
  - Investors are not able to exchange their presale tokens for ether through the
    presale contract.
  - Presale contract is administered by joint decisions of dev team (members of
    the multisig contract).
  - Dev team is able to withdraw all Ether from the presale contract to an 
    escrow account
  - Dev team is able to pause/resume presale at any time:
    - any non-administrative action (buy, migrate) is rejected if contract is
      paused.
  - Dev team is able to start migration phase by providing new token contract
    address.
  - Dev team is able to destroy presale token contract only if all tokens are
    migrated.


Deliverables
------------

  - Modified multisig contract.
  - Presale token contract.
  - Test suite for both contracts.
  - Deployment scripts.
  - User's guide for investors and admins.
  - Example of using presale contract from web page.
