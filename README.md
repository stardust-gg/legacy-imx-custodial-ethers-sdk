# Legacy IMX Custodial Ethers SDK

<!--
![banner]()
![badge]()
![badge]()
-->

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

**Currently only supports Ethers.js v5**

## Install

```
npm i @stardust-gg/legacy-imx-custodial-ethers-sdk
```

## Usage

The StardustCustodialSDK object is designed to be used with only 1 app. If your use case requires to have multiple apps, multiple StardustCustodialSDK's will need to be used.

### Creating your first app

```ts
import { StardustCustodialSDK, StardustApp } from '@stardust-gg/legacy-imx-custodial-ethers-sdk';

// create your app object locally
const app: StardustApp = new StardustApp('app_name', 'email@address.xyz', 'optional_description');

// create a StardustApp instance in the Stardust API
await StardustCustodialSDK.CreateApp(app);

// save the api key so you can access this app later
const apiKey = app.apiKey;
```

_For now, API Keys will need to be activated by the Stardust team. You must activate your key before being able to follow along with the sections below_

### Getting your app and creating wallet

```ts
import {
  StardustCustodialSDK,
  StardustApp,
  StardustWallet,
} from '@stardust-gg/legacy-imx-custodial-ethers-sdk';

const STARDUST_API_KEY = 'your-api-key';
const sdk = new StardustCustodialSDK(STARDUST_API_KEY);
const wallet: StardustWallet = await sdk.createWallet();

// Make sure to save this walletId for later steps!
const walletId = wallet.id;
await clientWalletDB.save(walletId);
```

### To get your Stardust Linked Ethers wallet for use with IMX:

```ts
const ethersWallet = await wallet.getEthersWallet();
```

This wallet can now be used with IMX:

```ts
import { imx } from '@imtbl/imx-sdk';

const signer = (await stardustWallet.getEthersWallet()).connect(provider);
console.log('signer', signer);

const params = {
  starkContractAddress: config.starkContractAddress,
  registrationContractAddress: config.registrationContractAddress,
  signer: signer,
  publicApiUrl: config.apiAddress,
  gasLimit: config.gasLimit,
  gasPrice: config.gasPrice,
};

const client = await imx.ImmutableXClient.build(params);
```

## Contributing

PRs accepted.

## License

[Apache-2.0](./LICENSE.md)
