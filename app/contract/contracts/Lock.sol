// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    mapping(address => bool) private users;

    function register() public {
        require(!users[msg.sender], "User already registered");
        users[msg.sender] = true;
    }

    function login() public view returns (bool) {
        return users[msg.sender];
    }
}
