import React, { Component } from "react";
import MultiSigWallet from "./contracts/MultiSigWallet.json";
import getWeb3 from "./getWeb3";
import Web3 from "web3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      // const web3 = await getWeb3();
      if (window.ethereum) {
        await window.ethereum.enable();
      }
      // Use web3 to get the user's accounts.
      const accounts = await Web3.eth.getAccounts();

      // Il n'y a qu'un seul compte dans accounts ...
      console.log("COUCOU LTR", accounts);

      // Get the contract instance.
      const networkId = await Web3.eth.net.getId();

      const deployedNetwork = MultiSigWallet.networks[networkId];
      console.log("Network ID", deployedNetwork)
      const instance = new Web3.eth.Contract(
        MultiSigWallet.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  submitTransaction = async () => {
    const { accounts, contract } = this.state;

    console.log("Accounts", accounts)
    const myTransaction = await contract.methods.submitTransaction(accounts[3], 10, [])
    .send({from: accounts[0]});
  }

  confirmTransaction = async () => {
    const { accounts, contract } = this.state;
    // On cherche à confirmer la 1e transaction à partir des adresse
    // utilisées en cours par Metamask 
    const confirmTx = await contract.methods.confirmTransaction(0)
    .send({from: accounts[0]});
    console.log("confirmTx", confirmTx);
  }

  executeTransaction = async () => {
    const { accounts, contract } = this.state;
    const executeTx = await contract.methods.executeTx(0)
    .send({from: accounts[0]});
  }

  runExample = async () => {
    const { accounts, contract } = this.state;

    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();

        const MyAcc = await web3.eth.getAccounts();
        console.log("Mon compte", MyAcc[0], MyAcc);
        const owners = await contract.methods.getOwners().call();
        console.log("COUCOU", owners);    
        this.setState({ storageValue: owners });
      } catch (error) {
        console.log(error);
      }
    }
    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });
    // Use web3 to get the user's accounts.
    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
    // Update state with the result.
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <button onClick={this.submitTransaction}>Submit transaction</button>
        <button onClick={this.confirmTransaction}>Confirm transaction</button>
        <button onClick={this.executeTransaction}>Execute transaction</button>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
