const hre = require("hardhat");
const { ethers } = hre;
const { formatEther } = require("@ethersproject/units");

async function main() {
    // Mendapatkan daftar akun dari Hardhat
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];

    console.log("Deploying contracts with the account:", deployer.address);

    // Mendapatkan saldo akun deployer
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", formatEther(balance));

    // Men-deploy kontrak SimpleContract
    const SimpleContract = await ethers.getContractFactory("SimpleContract");
    const contract = await SimpleContract.deploy("Initial Greeting");
    await contract.deploymentTransaction().wait(1);
    console.log(contract);
    // deploy contract itu target
    // Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    // Account balance: 9999.989031072983095472
    // BaseContract {
    // target: '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d',
    // Mendapatkan alamat kontrak yang di-deploy
    const contractAddress = contract.address;


    console.log("SimpleContract deployed to:", contractAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });