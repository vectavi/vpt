pragma solidity ^0.4.17;


// ERC20 token interface is implemented only partially.
// Token transfer is prohibited due to spec (see PRESALE-SPEC.md),
// hence some functions are left undefined:
//  - transfer, transferFrom,
//  - approve, allowance.

contract PresaleToken {

    /// @dev Constructor
    /// @param _tokenManager Token manager address.
    function PresaleToken(address _tokenManager, address _escrow) public {
        tokenManager = _tokenManager;
        escrow = _escrow;
    }


    /*/
     *  Constants
    /*/

    string public constant name = "Vectavi Presale Token";
    string public constant symbol = "VPT";
    uint   public constant decimals = 18;

    uint public constant PRICE = 6250; // 5000 VPT/Ether @ 25% discount ==> 1.25 * 5000 = 6250 VPT/ETH

    // price: 1 eth == 6250 presale tokens (VPT)
    // assume ETH price is USD $300 ($289 on 9/12/2017)
    // Cap is USD $15,000,000
    // Cap is 15,000,000 USD/(300 USD/ETH) = 50,000 ETH
    // Cap is (6250 VPT/ETH) * (50,000 ETH) = 312,500,000 VPT Cap in ether [external display] units
    // 
    // VPT Cap above is in ether [external display] units
    // internally, value is passed in units of wei, so convert Cap to wei units
    // 
    uint public constant TOKEN_SUPPLY_LIMIT = 312500000 * (1 ether / 1 wei);


    /*/
     *  Token state
    /*/

    enum Phase {
        Created,
        Running,
        Paused,
        Migrating,
        Migrated
    }

    Phase public currentPhase = Phase.Created;
    uint public totalSupply = 0; // amount of tokens already sold

    // Token manager has exclusive priveleges to call administrative
    // functions on this contract.
    address public tokenManager;

    // Gathered funds can be withdrawn only to escrow's address.
    address public escrow;

    // Crowdsale manager has exclusive priveleges to burn presale tokens.
    address public crowdsaleManager;

    mapping (address => uint256) private balance;


    modifier onlyTokenManager()     { require(msg.sender == tokenManager); _; }
    modifier onlyCrowdsaleManager() { require(msg.sender == crowdsaleManager); _; }


    /*/
     *  Events
    /*/

    event LogBuy(address indexed owner, uint value);
    event LogBurn(address indexed owner, uint value);
    event LogPhaseSwitch(Phase newPhase);


    /*/
     *  Public functions
    /*/

    function() public payable {
        buyTokens(msg.sender);
    }

    /// @dev Lets buy you some tokens.
    function buyTokens(address _buyer) public payable {
        // Available only if presale is running.
        require(currentPhase == Phase.Running);

        require(msg.value > 0);
        uint newTokens = msg.value * PRICE;
        require(totalSupply + newTokens <= TOKEN_SUPPLY_LIMIT);
        balance[_buyer] += newTokens;
        totalSupply += newTokens;
        LogBuy(_buyer, newTokens);
    }


    /// @dev Returns number of tokens owned by given address.
    /// @param _owner Address of token owner.
    function burnTokens(address _owner) public
        onlyCrowdsaleManager
    {
        // Available only during migration phase
        require(currentPhase == Phase.Migrating);

        uint tokens = balance[_owner];
        require(tokens > 0);
        balance[_owner] = 0;
        totalSupply -= tokens;
        LogBurn(_owner, tokens);

        // Automatically switch phase when migration is done.
        if(totalSupply == 0) {
            currentPhase = Phase.Migrated;
            LogPhaseSwitch(Phase.Migrated);
        }
    }


    /// @dev Returns number of tokens owned by given address.
    /// @param _owner Address of token owner.
    function balanceOf(address _owner) public constant returns (uint256) {
        return balance[_owner];
    }


    /*/
     *  Administrative functions
    /*/

    function setPresalePhase(Phase _nextPhase) public
        onlyTokenManager
    {
        bool canSwitchPhase
            =  (currentPhase == Phase.Created && _nextPhase == Phase.Running)
            || (currentPhase == Phase.Running && _nextPhase == Phase.Paused)
                // switch to migration phase only if crowdsale manager is set
            || ((currentPhase == Phase.Running || currentPhase == Phase.Paused)
                && _nextPhase == Phase.Migrating
                && crowdsaleManager != 0x0)
            || (currentPhase == Phase.Paused && _nextPhase == Phase.Running)
                // switch to migrated only if everyting is migrated
            || (currentPhase == Phase.Migrating && _nextPhase == Phase.Migrated
                && totalSupply == 0);

        require(canSwitchPhase);
        currentPhase = _nextPhase;
        LogPhaseSwitch(_nextPhase);
    }


    function withdrawEther() public
        onlyTokenManager
    {
        // Available at any phase.
        if(this.balance > 0) {
            require(escrow.send(this.balance));
        }
    }


    function setCrowdsaleManager(address _mgr) public
        onlyTokenManager
    {
        // You can't change crowdsale contract when migration is in progress.
        require(currentPhase != Phase.Migrating);
       crowdsaleManager = _mgr;
    }
}
