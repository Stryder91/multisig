import React, { Component } from 'react';
import { init, submitTransaction, confirmTransaction, executeTransaction, revokeConfirmation } from './getWeb3';

class App extends Component {

  state = {
    receiveAddr: "",
    txIndex: 0
  }

  componentDidMount = () => {
    init();
  }

  handleReceiveAddrChange = (event) => {
    this.setState({
      receiveAddr: event.target.value
    })
  }

  handleTxIndexhange = (event) => {
    this.setState({
      txIndex: event.target.value
    })
  }



  submit = async () => {
    const submitResult = await submitTransaction(this.state.receiveAddr, 10000, []);
    if (!submitResult) {
        console.error(submitResult);
    }
  }

  confirm = async () => {
    const confirmResult = await confirmTransaction(this.state.txIndex);
    if (!confirmResult) {
        console.error(confirmResult);
    }
  }

  execute = async () => {
    const executeResult = await executeTransaction(this.state.txIndex);
    if (!executeResult) {
        console.error(executeResult);
    }
  }

  revoke = async () => {
    const revokeResult = await revokeConfirmation(this.state.txIndex);
    if (!revokeResult) {
        console.error(revokeResult);
    }
  }

  render() {

    return (
      <div className="App">
        <input type="text" onChange={this.handleReceiveAddrChange}></input>
        <button onClick={this.submit}>Submit transaction</button>
        <input type="text" onChange={this.handleTxIndexhange}></input>
        <button onClick={this.confirm}>Confirm transaction</button>
        <button onClick={this.execute}>Execute transaction</button>
        <button onClick={this.revoke}>Revoke transaction</button>
      </div>
    );
  }

}

export default App;
