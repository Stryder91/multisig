import Web3 from 'web3';

import MultiSigWalletContractBuild from './contracts/MultiSigWallet.json';

let selectedAccount,
    MultiSigWalletContract;

let isInitialized = false;

export const init = async () => {
    // check if metamas is install
    let provider = window.ethereum;

    if(typeof provider !== 'undefined') {
      // Metamask is install
      provider.request({ method: 'eth_requestAccounts' }).then(accounts => {
        selectedAccount = accounts[0];
      }).catch(err => {
        console.log(err);
      });

      window.ethereum.on('accountsChanged', function (accounts) {
          selectedAccount = accounts[0];
      });
    }

    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();

    // Define the smart contract
    MultiSigWalletContract = new web3.eth.Contract(
        MultiSigWalletContractBuild.abi, 
        MultiSigWalletContractBuild.networks[networkId].address
    );

    isInitialized = true;
};

export const submitTransaction = async (_to, _value, _data) => {
  if(!isInitialized) {
      await init();
  }

  return await MultiSigWalletContract.methods
      .submitTransaction(_to, _value, _data)
      .send({ from: selectedAccount });
};

export const confirmTransaction = async (_txIndex) => {
  if(!isInitialized) {
      await init();
  }

  return await MultiSigWalletContract.methods
      .confirmTransaction(_txIndex)
      .send({ from: selectedAccount });
};

export const executeTransaction = async (_txIndex) => {
  if(!isInitialized) {
      await init();
  }

  return await MultiSigWalletContract.methods
      .executeTransaction(_txIndex)
      .send({ from: selectedAccount });
};

export const revokeConfirmation = async (_txIndex) => {
  if(!isInitialized) {
      await init();
  }

  return await MultiSigWalletContract.methods
      .revokeConfirmation(_txIndex)
      .send({ from: selectedAccount });
};
