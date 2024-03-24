// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

contract YourContract {
    event DataStored(string key, string value);

    mapping(string => string) private store;
    uint256 private keyCounter = 0;

    function storeValue(string memory value) public returns (string memory) {
        keyCounter++;
        string memory key = generateKey(keyCounter);

        store[key] = value;
        console.log("Stored value: %s with key: %s", value, key);
        emit DataStored(key, value);

        return key;
    }

    function getValue(string memory key) public view returns (string memory) {
        return store[key];
    }

    function generateKey(uint256 counter) private view returns (string memory) {
        // TODO: ensure the same JSON doesn't generate the same key.
        // tip: maybe use block time;
        // although the counter should have worked.
        return string(abi.encodePacked(addressToString(address(this)), uintToString(counter)));
    }

    function addressToString(address _addr) private pure returns(string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory data = abi.encodePacked(_addr);
        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = "0";
        str[1] = "x";
        for (uint i = 0; i < data.length; i++) {
            str[2+i*2] = alphabet[uint(uint8(data[i] >> 4))];
            str[3+i*2] = alphabet[uint(uint8(data[i] & 0x0f))];
        }
        return string(str);
    }

    function uintToString(uint256 _i) private pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        while (_i != 0) {
            bstr[--k] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
}
