var MultiSigWallet = artifacts.require("./MultiSigWallet.sol");

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts();

  const addrAccount1 = accounts[0];
  const addrAccount2 = accounts[1];
  const addrAccount3 = accounts[2];

  const owners = [ addrAccount1, addrAccount2, addrAccount3];
  const numConfirmationsRequired = 3;

  await deployer.deploy(MultiSigWallet, owners, numConfirmationsRequired);
};
