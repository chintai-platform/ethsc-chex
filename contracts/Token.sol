pragma solidity ^0.8.0;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

contract CHEX is ERC20, Ownable {
  constructor() ERC20("Chintai Exchange Token", "CHEX") public { }
}
