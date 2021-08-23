const MyToken = artifacts.require("MyToken");

const { assert } = require("chai");
var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  it("all tokens should be in my account", async () => {
    let instance = await MyToken.deployed();
    let totalSupply = await instance.totalSupply();
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it("is possible to send tokens between accounts", async () => {
    const sendToken = 1;
    let instance = await MyToken.deployed();
    let totalSupply = await instance.totalSupply();
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply);

    expect(instance.transfer(recipient, sendToken)).to.eventually.be.fufilled;

    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));

    expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(
      new BN(sendToken)
    );
  });

  it("it is not possible to send more tokens than are available.", async () => {
    let instance = await MyToken.deployed();
    let balanceOfDeployer = await instance.balanceOf(deployerAccount);

    expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to
      .eventually.be.rejected;

    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
  });
});
