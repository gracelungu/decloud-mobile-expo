### Decloud (Web3 mobile cloud storage)

A cloud storage react native mobile app, aiming at creating an interface for saving files to the blockchain with the help of IPFS.

![Preview](https://github.com/gracelungu/decloud-mobile-expo/blob/master/assets/images/preview.png?raw=true)

### Why

The goal of this project is to be an alternative to mobile cloud storage such as the infamous apple's icloud.

### Advantages

This is a cheap way to store large amount of files at a lower cost and without a monthly subscription like other traditional cloud storage.

### How it works

The project is made of 3 components:

- The smart contracts (The cloud, the private cloud and the ownable contract)
- The expo react native app
- A pinata IPFS cloud

The mobile app acts as the primary interface of the application, where the user uploads files from his device to the IPFS.
Once the files are uploaded the user is required to create a private cloud just from the app.
After the creation of the private cloud, file can be synchronized with the private cloud, which means saving the URLs of the files in the smart contract.

### How to contribute

You are free to raise a pull request to improve the application. The idea is to make the app customizable and dynamic enough, so that anyone could extend the functionality of the app and have something that is both secure and personal.

Related repositories:

- The smart contract repo [decloud-smart-contract](https://github.com/gracelungu/decloud-smart-contracts)

### Usage

Install packages
`yarn install`

Create a `credentials.ts` file on the root and export the following variables:
`export const PINATA_JWT =`
`export const IPFS_UPLOAD_URL =`
`export const IPFS_DOWNLOAD_URL =`

Start the server
`expo start`

### Don't forget to raise issues

The project is far from being in shape, you may find issues and bugs, please report them.
