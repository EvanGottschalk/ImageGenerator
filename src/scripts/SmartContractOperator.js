// To add:
// 1. Default function for calling any contract that makes sure there will be no errors,
//    waits for any missing information, and has error handling.
//      -This will include confirming that providers._network is defined

// Admin page:
// 1. Import admin settings from json, then create backup copy, then edit json to modify site
// 2. Detailed settings for individual pages such as website.com/avatar are modified at website.com/admin/avatar
//    Then, gate all /admin pages behind admin login

// Web3 Oracles
// 1. Supra
// 2. Gelato
// 3. ChainLink







//--------------------------------------------------------------------------------------------------
//# Imports

import { FormatTypes, Interface } from "@ethersproject/abi";

const { ethers } = require("ethers");
//const { utils } = require('ethers').utils;
//const { BigNumber } = require('ethers').BigNumber;









//--------------------------------------------------------------------------------------------------
//# Variable Declaration

let run_on_load = false;

// *Update the contract address list based on your smart contract
const contract_address_dict = {'mainnet': '',
                               'goerli': '0x43Dd8B559066d5e2D86a87DAe643B8c109773538',
                               'hyperspace': '0xB4fECac2F5BdEc2eD15547cF857464c8691b9849'}

// *Update JSON ABI list with your smart contract's latest JSON ABI
const json_ABI_list = {'mainnet': `[]`,
                     'goerli': `[
                      {
                        "inputs": [],
                        "stateMutability": "nonpayable",
                        "type": "constructor"
                      },
                      {
                        "anonymous": false,
                        "inputs": [
                          {
                            "indexed": true,
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                          },
                          {
                            "indexed": true,
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                          },
                          {
                            "indexed": false,
                            "internalType": "bool",
                            "name": "approved",
                            "type": "bool"
                          }
                        ],
                        "name": "ApprovalForAll",
                        "type": "event"
                      },
                      {
                        "anonymous": false,
                        "inputs": [
                          {
                            "indexed": true,
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                          },
                          {
                            "indexed": true,
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                          },
                          {
                            "indexed": true,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                          },
                          {
                            "indexed": false,
                            "internalType": "uint256[]",
                            "name": "ids",
                            "type": "uint256[]"
                          },
                          {
                            "indexed": false,
                            "internalType": "uint256[]",
                            "name": "values",
                            "type": "uint256[]"
                          }
                        ],
                        "name": "TransferBatch",
                        "type": "event"
                      },
                      {
                        "anonymous": false,
                        "inputs": [
                          {
                            "indexed": true,
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                          },
                          {
                            "indexed": true,
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                          },
                          {
                            "indexed": true,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                          },
                          {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                          },
                          {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                          }
                        ],
                        "name": "TransferSingle",
                        "type": "event"
                      },
                      {
                        "anonymous": false,
                        "inputs": [
                          {
                            "indexed": false,
                            "internalType": "string",
                            "name": "value",
                            "type": "string"
                          },
                          {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                          }
                        ],
                        "name": "URI",
                        "type": "event"
                      },
                      {
                        "inputs": [],
                        "name": "INTERFACE_ID_ERC1155",
                        "outputs": [
                          {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                          }
                        ],
                        "name": "attributes",
                        "outputs": [
                          {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                          }
                        ],
                        "name": "balanceOf",
                        "outputs": [
                          {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address[]",
                            "name": "accounts",
                            "type": "address[]"
                          },
                          {
                            "internalType": "uint256[]",
                            "name": "ids",
                            "type": "uint256[]"
                          }
                        ],
                        "name": "balanceOfBatch",
                        "outputs": [
                          {
                            "internalType": "uint256[]",
                            "name": "",
                            "type": "uint256[]"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "string",
                            "name": "newMetadataURI",
                            "type": "string"
                          }
                        ],
                        "name": "changeBaseMetadataURI",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint16",
                            "name": "tokenID",
                            "type": "uint16"
                          },
                          {
                            "internalType": "string",
                            "name": "newMetadataURI",
                            "type": "string"
                          }
                        ],
                        "name": "changeImageURI",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint16",
                            "name": "",
                            "type": "uint16"
                          }
                        ],
                        "name": "characters",
                        "outputs": [
                          {
                            "internalType": "uint8",
                            "name": "element",
                            "type": "uint8"
                          },
                          {
                            "internalType": "uint256",
                            "name": "exp",
                            "type": "uint256"
                          },
                          {
                            "internalType": "string",
                            "name": "metadataURI",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                          }
                        ],
                        "name": "elements",
                        "outputs": [
                          {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint16",
                            "name": "tokenID",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint256",
                            "name": "exp",
                            "type": "uint256"
                          }
                        ],
                        "name": "gainEXP",
                        "outputs": [
                          {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                          }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "_userAddress",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "exp",
                            "type": "uint256"
                          }
                        ],
                        "name": "gainUserEXP",
                        "outputs": [
                          {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                          }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint8",
                            "name": "num",
                            "type": "uint8"
                          }
                        ],
                        "name": "getAttribute",
                        "outputs": [
                          {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint16",
                            "name": "tokenID",
                            "type": "uint16"
                          }
                        ],
                        "name": "getCurrentLevel",
                        "outputs": [
                          {
                            "internalType": "uint16",
                            "name": "currentLevel",
                            "type": "uint16"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint16",
                            "name": "tokenID",
                            "type": "uint16"
                          }
                        ],
                        "name": "getCurrentStats",
                        "outputs": [
                          {
                            "internalType": "uint16",
                            "name": "fire",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint16",
                            "name": "water",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint16",
                            "name": "air",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint16",
                            "name": "earth",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint16",
                            "name": "charisma",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint16",
                            "name": "creativity",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint16",
                            "name": "cunning",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint16",
                            "name": "patience",
                            "type": "uint16"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint8",
                            "name": "num",
                            "type": "uint8"
                          }
                        ],
                        "name": "getElement",
                        "outputs": [
                          {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint16",
                            "name": "tokenID",
                            "type": "uint16"
                          }
                        ],
                        "name": "getMetadata",
                        "outputs": [
                          {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint16",
                            "name": "tokenID",
                            "type": "uint16"
                          }
                        ],
                        "name": "getPrimaryStats",
                        "outputs": [
                          {
                            "internalType": "string",
                            "name": "element",
                            "type": "string"
                          },
                          {
                            "internalType": "uint16",
                            "name": "level",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint256",
                            "name": "exp",
                            "type": "uint256"
                          },
                          {
                            "internalType": "string",
                            "name": "metadataURI",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "_userAddress",
                            "type": "address"
                          }
                        ],
                        "name": "getUserCurrentStats",
                        "outputs": [
                          {
                            "internalType": "uint16",
                            "name": "fire",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint16",
                            "name": "water",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint16",
                            "name": "air",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint16",
                            "name": "earth",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint16",
                            "name": "charisma",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint16",
                            "name": "creativity",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint16",
                            "name": "cunning",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint16",
                            "name": "patience",
                            "type": "uint16"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "_userAddress",
                            "type": "address"
                          }
                        ],
                        "name": "getUserMetadata",
                        "outputs": [
                          {
                            "internalType": "string",
                            "name": "metadataURI",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "_userAddress",
                            "type": "address"
                          }
                        ],
                        "name": "getUserPrimaryStats",
                        "outputs": [
                          {
                            "internalType": "string",
                            "name": "element",
                            "type": "string"
                          },
                          {
                            "internalType": "uint16",
                            "name": "level",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint256",
                            "name": "exp",
                            "type": "uint256"
                          },
                          {
                            "internalType": "string",
                            "name": "metadataURI",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "_userAddress",
                            "type": "address"
                          }
                        ],
                        "name": "getUserTokenID",
                        "outputs": [
                          {
                            "internalType": "uint16",
                            "name": "tokenID",
                            "type": "uint16"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                          }
                        ],
                        "name": "holderMainAvatars",
                        "outputs": [
                          {
                            "internalType": "uint16",
                            "name": "",
                            "type": "uint16"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                          },
                          {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                          }
                        ],
                        "name": "isApprovedForAll",
                        "outputs": [
                          {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "_userAddress",
                            "type": "address"
                          },
                          {
                            "internalType": "string",
                            "name": "metadataURI",
                            "type": "string"
                          }
                        ],
                        "name": "levelUp",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint8",
                            "name": "element",
                            "type": "uint8"
                          },
                          {
                            "internalType": "string",
                            "name": "metadataURI",
                            "type": "string"
                          }
                        ],
                        "name": "mint",
                        "outputs": [
                          {
                            "internalType": "uint16",
                            "name": "",
                            "type": "uint16"
                          }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [],
                        "name": "nftCounter",
                        "outputs": [
                          {
                            "internalType": "uint256",
                            "name": "_value",
                            "type": "uint256"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                          },
                          {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256[]",
                            "name": "ids",
                            "type": "uint256[]"
                          },
                          {
                            "internalType": "uint256[]",
                            "name": "amounts",
                            "type": "uint256[]"
                          },
                          {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                          }
                        ],
                        "name": "safeBatchTransferFrom",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                          },
                          {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                          },
                          {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                          },
                          {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                          }
                        ],
                        "name": "safeTransferFrom",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                          },
                          {
                            "internalType": "bool",
                            "name": "approved",
                            "type": "bool"
                          }
                        ],
                        "name": "setApprovalForAll",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "_userAddress",
                            "type": "address"
                          },
                          {
                            "internalType": "uint16",
                            "name": "tokenID",
                            "type": "uint16"
                          }
                        ],
                        "name": "setMainAvatar",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint16",
                            "name": "tokenID",
                            "type": "uint16"
                          },
                          {
                            "internalType": "string",
                            "name": "_metadata",
                            "type": "string"
                          }
                        ],
                        "name": "setMetadata",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "bytes4",
                            "name": "interfaceId",
                            "type": "bytes4"
                          }
                        ],
                        "name": "supportsInterface",
                        "outputs": [
                          {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint16",
                            "name": "",
                            "type": "uint16"
                          }
                        ],
                        "name": "tokenMetadata",
                        "outputs": [
                          {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                          }
                        ],
                        "name": "tokenOwners",
                        "outputs": [
                          {
                            "internalType": "uint16",
                            "name": "",
                            "type": "uint16"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint16",
                            "name": "tokenID",
                            "type": "uint16"
                          },
                          {
                            "internalType": "uint8",
                            "name": "element",
                            "type": "uint8"
                          },
                          {
                            "internalType": "uint256",
                            "name": "exp",
                            "type": "uint256"
                          },
                          {
                            "internalType": "string",
                            "name": "metadataURI",
                            "type": "string"
                          }
                        ],
                        "name": "updateCharacter",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                          }
                        ],
                        "name": "uri",
                        "outputs": [
                          {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      }
                     ]`,
                     'hyperspace': `[
                    {
                      "inputs": [],
                      "stateMutability": "nonpayable",
                      "type": "constructor"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "bool",
                          "name": "approved",
                          "type": "bool"
                        }
                      ],
                      "name": "ApprovalForAll",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256[]",
                          "name": "ids",
                          "type": "uint256[]"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256[]",
                          "name": "values",
                          "type": "uint256[]"
                        }
                      ],
                      "name": "TransferBatch",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        }
                      ],
                      "name": "TransferSingle",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": false,
                          "internalType": "string",
                          "name": "value",
                          "type": "string"
                        },
                        {
                          "indexed": true,
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        }
                      ],
                      "name": "URI",
                      "type": "event"
                    },
                    {
                      "inputs": [],
                      "name": "INTERFACE_ID_ERC1155",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        }
                      ],
                      "name": "balanceOf",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address[]",
                          "name": "accounts",
                          "type": "address[]"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "ids",
                          "type": "uint256[]"
                        }
                      ],
                      "name": "balanceOfBatch",
                      "outputs": [
                        {
                          "internalType": "uint256[]",
                          "name": "",
                          "type": "uint256[]"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "newImageURI",
                          "type": "string"
                        }
                      ],
                      "name": "changeImageURI",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "name": "characters",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "level",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "creativity",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "cunning",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "charisma",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "patience",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "fire",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "water",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "air",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "earth",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "imageURI",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "_token_ID",
                          "type": "uint256"
                        }
                      ],
                      "name": "getMetadata",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "_token_ID",
                          "type": "uint256"
                        }
                      ],
                      "name": "getStats",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "level",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "creativity",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "cunning",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "charisma",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "patience",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "fire",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "water",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "air",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "earth",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        }
                      ],
                      "name": "getUserMetadata",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "metadataURI",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        }
                      ],
                      "name": "getUserStats",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "level",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "creativity",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "cunning",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "charisma",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "patience",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "fire",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "water",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "air",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "earth",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        }
                      ],
                      "name": "getUsertoken_ID",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "largesttoken_ID",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        }
                      ],
                      "name": "isApprovedForAll",
                      "outputs": [
                        {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "_id",
                          "type": "uint256"
                        }
                      ],
                      "name": "isNonFungible",
                      "outputs": [
                        {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                        }
                      ],
                      "stateMutability": "pure",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        },
                        {
                          "internalType": "string",
                          "name": "imageURI",
                          "type": "string"
                        }
                      ],
                      "name": "levelUp",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "fire",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "water",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "air",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "earth",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "imageURI",
                          "type": "string"
                        }
                      ],
                      "name": "mint",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [],
                      "name": "nftCounter",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "_value",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "max",
                          "type": "uint256"
                        }
                      ],
                      "name": "random",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "randomInt",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "ids",
                          "type": "uint256[]"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "amounts",
                          "type": "uint256[]"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "name": "safeBatchTransferFrom",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "amount",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "name": "safeTransferFrom",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "internalType": "bool",
                          "name": "approved",
                          "type": "bool"
                        }
                      ],
                      "name": "setApprovalForAll",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "_token_ID",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "_metadata",
                          "type": "string"
                        }
                      ],
                      "name": "setMetadata",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "bytes4",
                          "name": "interfaceId",
                          "type": "bytes4"
                        }
                      ],
                      "name": "supportsInterface",
                      "outputs": [
                        {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "name": "tokenMetadata",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "name": "tokenOwners",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "level",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "creativity",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "cunning",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "charisma",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "patience",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "fire",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "water",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "air",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "earth",
                          "type": "uint256"
                        }
                      ],
                      "name": "updateCharacter",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "name": "URI",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    }
                     ]`
                    };

// *Update metadata URIs with your IPFS files' information
const folder_URIs = {
  NFT_Storage: 'bafybeiglxxim4fc4jxl53kxoxjsnrf7efcabx4jikrgrz2ralmgqlj6yai',
  Pinata: 'QmcvaEQrzwiNjDZzJX1jBq5zDtvF9yc2Le6nyjquABEGmh',
  Pinata_old: 'QmPF4nrDbTnGk2UWduZDw2FCHZcF6HJicYDdsDAkEqJgH7'};

const JSON_URIs = {
  NFT_Storage: {0:'/LMNTLfire1.json',
                1:'/LMNTLwater1.json',
                2:'/LMNTLair1.json',
                3:'/LMNTLearth1.json',
                4:'/LMNTLfire2.json',
                5:'/LMNTLwater2.json',
                6:'/LMNTLair2.json',
                7:'/LMNTLearth2.json',
                background_list: "bafybeicc2gguyju7625a3c6ie2gyukggwhgcle64a73bo4yxrtrr6zf2fi/background_list.json",
                pac_list: "bafybeigmgu2k25bxwjmwxwrr2kwiwzzjpuy3mzew2yochngedqof5zgmu4/pac_list.json"},
  Pinata: {0:'/LMNTLfire1.json',
           1:'/LMNTLwater1.json',
           2:'/LMNTLair1.json',
           3:'/LMNTLearth1.json',
           4:'/LMNTLfire2.json',
           5:'/LMNTLwater2.json',
           6:'/LMNTLair2.json',
           7:'/LMNTLearth2.json'},
  Pinata_old: {0:'/LMNTLfire1.png',
           1:'/LMNTLwater1.png',
           2:'/LMNTLair1.png',
           3:'/LMNTLearth1.png',
           4:'/LMNTLfire2.png',
           5:'/LMNTLwater2.png',
           6:'/LMNTLair2.png',
           7:'/LMNTLearth2.png'}};

const network_IPFS_dict = {'mainnet': 'Pinata',
                           'goerli': 'NFT_Storage',
                           'hyperspace': 'NFT_Storage'};

const IPFS_prefixes = {
  Pinata: 'https://gateway.pinata.cloud/ipfs/',
  Pinata_old: 'https://gateway.pinata.cloud/ipfs/',
  Infura: '',
  NFT_Storage: 'https://nftstorage.link/ipfs/'
};

const network_dict = {'goerli': {},
                      'polygon': {}};

const opensea_link_delay = 8;
const opensea_prefixes = {
  'mainnet': 'https://opensea.io/assets/ethereum/',
  'goerli': 'https://testnets.opensea.io/assets/goerli/', 
  'hyperspace': ''
};

// These variables are set as Context variables to be accessed by other components
var user_address, user_token_ID, user_metadata_URI, user_metadata, user_avatar_URI, user_balance;

var provider, signer, user_web_wallet;

const default_network = 'goerli';
var network_name = default_network;

var user_minted_NFT = false;









//--------------------------------------------------------------------------------------------------
//# Basic Functions

//const [address, toggleConnected] = useState(0);
//const [isMinted, toggleMinted] = useState(0);

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function pause(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}







//--------------------------------------------------------------------------------------------------
//# Wallet & Metadata Functions

if (run_on_load) {
  onLoad();
};
async function onLoad () {
  if (run_on_load) {
    run_on_load = false;
    await connectWallet();
  }
}

var count = 0;
count = count;

async function setProvider() {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log('Provider: ', provider);
  user_web_wallet = provider['connection']['url'];
  console.log('Web Wallet: ', user_web_wallet);
  if ('_network' in provider) {
    network_name = provider['_network']['name'];
    console.log('Network: ', network_name);
  };
  count ++;
  console.log(count);
  return(provider);
};


async function setSigner(provider_input) {
  if (!provider_input) {
    provider_input = provider;
  };
  if (!provider_input) {
    provider_input = await setProvider();
  };
  // Prompt user for account connections
  await provider_input.send("eth_requestAccounts", []);
  signer = await provider_input.getSigner();
  console.log('Signer: ', signer);
  return(signer);
};


async function setUserAddress(signer_input) {
  if (!signer_input) {
    signer_input = signer;
  };
  if (!signer_input) {
    signer_input = await setSigner();
  };
  user_address = await signer_input.getAddress();
  console.log('Address: ', user_address);
  return(user_address);
}


async function setUserBalance(signer_input) {
  if (!signer_input) {
    signer_input = signer;
  };
  if (!signer_input) {
    signer_input = await setSigner();
  };
  user_balance = await signer_input.getBalance();
  user_balance = ethers.utils.formatEther(user_balance);
  console.log('Balance: ', user_balance);
  return user_balance;
};


async function setUserTokenID(address_input) {
  if (!address_input) {
    address_input = user_address;
  };
  if (!address_input) {
    address_input = await setUserAddress();
  };
  const contract = new ethers.Contract(contract_address_dict[network_name], json_ABI_list[network_name], provider);
  user_token_ID = await contract.getUserTokenID(address_input);
  console.log('User Token ID: ', user_token_ID);
  return user_token_ID;
};


async function setUserMetadata(address_input) {
  if (!address_input) {
    address_input = user_address;
  };
  if (!address_input) {
    address_input = await setUserAddress();
  };
  const contract = new ethers.Contract(contract_address_dict[network_name], json_ABI_list[network_name], provider);
  user_metadata_URI = await contract.getUserMetadata(address_input);
  if (user_metadata_URI.includes('.json')) {
    const response = await fetch(user_metadata_URI);
    user_metadata = await response.json();
    user_metadata['URI'] = user_metadata_URI;
    console.log('User Metadata: ', user_metadata);
    return user_metadata;
  } else {
    return user_metadata_URI;
  };
};


export async function setUserAvatarURI(metadata_input) {
  if (!metadata_input) {
    metadata_input = user_metadata;
  };
  if (!metadata_input) {
    metadata_input = await setUserMetadata();
  };
  if (typeof(metadata_input) === 'string') {
    user_avatar_URI = metadata_input;
  } else {
    user_avatar_URI = metadata_input['image'];
  }
  console.log('User Avatar URI: ', user_avatar_URI);
  return user_avatar_URI;
};


export async function getMetadataURL(metadata_info) {
  if (!network_name) {
    network_name = getNetwork();
  }
  var metadata_URL;
  const IPFS_name = network_IPFS_dict[network_name];

  // Pre-set Image URI
  if (JSON_URIs[IPFS_name][metadata_info]) {
    metadata_URL = IPFS_prefixes[IPFS_name] + folder_URIs[IPFS_name] + JSON_URIs[IPFS_name][metadata_info];
  } else {
    metadata_URL = IPFS_prefixes[IPFS_name] + metadata_info;
  };
  return metadata_URL;
};

export async function getOpenSeaLink(token_ID_input) {
  if (!token_ID_input) {
    token_ID_input = user_token_ID;
  };
  if (!token_ID_input) {
    token_ID_input = await setUserTokenID();
  };
  var opensea_link = opensea_prefixes[network_name] + contract_address_dict[network_name] + '/' + token_ID_input;
  console.log('OpenSea Link: ', opensea_link);
  return opensea_link;
}


export async function getNetwork() {
  if (!network_name) {
    provider = await setProvider();
    if ('_network' in provider) {
      network_name = provider['_network']['name'];
    };
  };
  console.log('Network Name: ', network_name);
  return network_name;
}

export async function getJSONfromIPFS(IPFS_name, URI) {
  if (!IPFS_name) {
    provider = await setProvider();
    if ('_network' in provider) {
      network_name = provider['_network']['name'];
      IPFS_name = network_IPFS_dict[network_name];
    };
  };
  if (IPFS_prefixes[IPFS_name]) {
    const response = await fetch(IPFS_prefixes[IPFS_name] + URI);
    const JSON_contents = await response.json();
    console.log('JSON Contents: ', JSON_contents);
    return JSON_contents;
  } else {
    console.log("ERROR! IPFS name is not recognized!")
    return(false);
  }
}


async function promptNetworkSwitch (network_name_input) {
  //if (!network_name_input || !network_dict.includes(network_name_input)) {
  //  network_name_input = default_network;
  //};
  var network_switched = false;
  if (network_name_input === 'polygon' || network_name_input === 'matic') {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: "0x89" }],
    });
    network_switched = true;
  } else if (network_name_input === 'goerli') {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: "0x5" }],
    });
    network_switched = true;
  }

  if (network_switched) {
    network_name = network_name_input;
    network_switched = false;
    window.location.reload();
  }
};


export async function promptAddNetwork(network_name_input) {
  //if (!network_name_input || !network_dict.includes(network_name_input)) {
  //  network_name_input = default_network;
  //};
  if (network_name_input === 'polygon' || network_name_input === 'matic') {
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0x89",
          rpcUrls: ["https://rpc-mainnet.matic.network/"],
          chainName: "Matic Mainnet",
          nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18
          },
          blockExplorerUrls: ["https://polygonscan.com/"]
      }]
    });
  };
  network_name = network_name_input;
  return network_name;
};


export default async function connectWallet(network_name_input) {
  provider = await setProvider();
  signer = await setSigner(provider);
  user_address = await setUserAddress(signer);
  user_balance = await setUserBalance(signer);
  if ('_network' in provider) {
    network_name = provider['_network']['name'];
    console.log('Network: ', network_name);
  };
  if (network_name_input && (network_name !== network_name_input)) {
    promptNetworkSwitch(network_name_input);
  };
  //const contract = new ethers.Contract(contract_address_dict[network_name], json_ABI_list[network_name], provider);
  user_token_ID = await setUserTokenID(user_address);
  user_metadata = await setUserMetadata(user_address);
  user_avatar_URI = await setUserAvatarURI(user_metadata);
  return({'address': user_address,
          'token_ID': user_token_ID,
          'balance': user_balance,
          'metadata': user_metadata,
          'avatar_URI': user_avatar_URI});
};









//--------------------------------------------------------------------------------------------------
//# Smart Contract Functions

//Should take contract address
export async function mintNFT(mint_button, params) {
  console.log('Mint Params: ', params);
  console.log('Mint Button: ', mint_button);
  
  if (!signer) {
    signer = await setSigner();
  };
  const iface = new Interface(json_ABI_list[network_name]);
  iface.format(FormatTypes.full);
  const contract = new ethers.Contract(contract_address_dict[network_name], iface, signer);
  var transactionInfo;
  

  if (params.length === 0) {
    transactionInfo = await contract.mint();
  } else if (params.length === 1) {
    transactionInfo = await contract.mint(params[0]);
  } else if (params.length === 2) {
    transactionInfo = await contract.mint(params[0], params[1]);
  } else if (params.length === 3) {
    transactionInfo = await contract.mint(params[0], params[1], params[2]);
  } else if (params.length === 4) {
    transactionInfo = await contract.mint(params[0], params[1], params[2], params[3]);
  } else {
    transactionInfo = await contract.mint(params[0], params[1], params[2], params[3], params[4]);
  };
  user_minted_NFT = true;
  console.log("Transaction info: ", transactionInfo);
  
  var transactionHash = transactionInfo.hash;
  console.log("Transaction hash: ", transactionHash);

  var transactionReceipt = await provider.getTransactionReceipt(transactionHash);
  console.log("Immediate transaction receipt: ", transactionReceipt);

  // Button updated & code paused via while loop while awaiting contract execution
  mint_button.textContent = "Minting";
  var loop_count = 1;
  while ( !transactionReceipt ) {
    await pause(500);
    if (loop_count > 3) {
      mint_button.textContent = "Minting";
      loop_count = 0;
    } else {
      mint_button.insertAdjacentText('beforeEnd', '.');
    }
    transactionReceipt = await provider.getTransactionReceipt(transactionHash);
    loop_count+=1;
  }
  console.log("Mined transaction receipt: ", transactionReceipt);

  // Button updated & code paused via while loop for duration of opensea_link_delay
  var wait_count = 0;
  while ( wait_count < (2 * opensea_link_delay) ) {
    await pause(500);
    if (loop_count > 3) {
      mint_button.textContent = "Minting";
      loop_count = 0;
    } else {
      mint_button.insertAdjacentText('beforeEnd', '.');
    }
    loop_count+=1;
    wait_count+=1;
  }
  console.log("Transaction Info: ", transactionInfo);

  user_token_ID = parseInt(transactionReceipt.logs[0].topics[3], 10);
  console.log("User Token ID: ", user_token_ID);
  console.log("Unparsed User Token ID: ", transactionReceipt.logs[0].topics[3]);
  return user_token_ID;  
}





  
  
//--------------------------------------------------------------------------------------------------
//# Optional Dev Page Functions for Testing









//--------------------------------------------------------------------------------------------------
//# Custom Smart Contract Calls
// *Update this section with your smart contract's custom function calls

export async function getUserStats(address_input) {
  if (!address_input) {
    address_input = user_address;
  };
  if (!address_input) {
    address_input = await setUserAddress();
  };
  const contract = new ethers.Contract(contract_address_dict[network_name], json_ABI_list[network_name], provider);
  user_token_ID = await contract.getUserTokenID(address_input);
  const user_primary_stats = await contract.getUserPrimaryStats(address_input);
  console.log('User Primary Stats: ', user_primary_stats);
  const user_stats_list = await contract.getUserCurrentStats(address_input);
  const user_stats_dict = {
    user_token_ID: user_token_ID,
    user_primary_stats: user_primary_stats,
    user_stats_list: user_stats_list
  };
  console.log('User Stats: ', user_stats_dict);
  return user_stats_dict;
}


export async function levelUp(level_up_button) {
  if (!user_metadata_URI) {
    user_metadata = await setUserMetadata();
  };
  const iface = new Interface(json_ABI_list[network_name]);
  iface.format(FormatTypes.full);
  const contract = new ethers.Contract(contract_address_dict[network_name], iface, signer);

  const old_metadata_base_address = user_metadata_URI.split('LMNTL')[0];
  const old_metadata_filename = 'LMNTL' + user_metadata_URI.split('LMNTL')[1];

  var new_metadata_URI;

  if (network_IPFS_dict[network_name] === 'Pinata_old') {
    new_metadata_URI = old_metadata_base_address + old_metadata_filename.substring(0, old_metadata_filename.length - 5) + "2.png";
  } else {
    new_metadata_URI = old_metadata_base_address + old_metadata_filename.substring(0, old_metadata_filename.length - 6) + "2.json";
  };
  console.log('New Metadata URI: ', new_metadata_URI);
  const transactionInfo = await contract.levelUp(user_address, new_metadata_URI);

  console.log("Transaction info: ", transactionInfo);
  var transactionHash = transactionInfo.hash;
  console.log("Transaction hash: ", transactionHash);
  var transactionReceipt = await provider.getTransactionReceipt(transactionHash);
  console.log("Immediate transaction receipt: ", transactionReceipt);
  level_up_button.textContent = "Evolving";
  var loop_count = 1;
  while ( !transactionReceipt ) {
    await pause(500);
    if (loop_count > 3) {
      level_up_button.textContent = "Evolving";
      loop_count = 0;
    } else {
      level_up_button.insertAdjacentText('beforeEnd', '.');
    }
    transactionReceipt = await provider.getTransactionReceipt(transactionHash);
    loop_count+=1;
  }

  console.log("Mined transaction receipt: ", transactionReceipt);
  console.log("Transaction Info: ", transactionInfo);

  const response = await fetch(new_metadata_URI);
  user_metadata_URI = new_metadata_URI;
  user_metadata = await response.json();
  user_avatar_URI = await setUserAvatarURI(user_metadata);
  return({'metadata': user_metadata,
          'avatar_URI': user_avatar_URI}); 
};