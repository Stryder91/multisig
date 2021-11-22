var MultiSigWallet = artifacts.require("./MultiSigWallet.sol");

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts();

  const addrAccount1 = accounts[0]; // 0xB5E95C03c00B1c30A3CD5A4AEa86772cD466bF7B
  const addrAccount2 = accounts[1]; // 0x1902B98b2591C90BEe575fB1b04c924aD77266B9
  const addrAccount3 = accounts[2]; // 0x044D12c4dFB308dB0370578fE34bAa3C3087ED3A

  const owners = [ addrAccount1, addrAccount2, addrAccount3];
  const numConfirmationsRequired = 3;

  await deployer.deploy(MultiSigWallet, owners, numConfirmationsRequired);

  // 0xc8c7B655547Ec063666b61F831dEd7CAFbC0275C
};
