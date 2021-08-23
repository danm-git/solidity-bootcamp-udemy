var MyToken = artifacts.require("MyToken.sol");

module.exports = async function (deployer) {
  await deployer(MyToken, 1000000);
};
