const hre = require("hardhat");

async function main() {
    // 1. Obtenemos la cuenta que está desplegando (será el 'owner')
    const [deployer] = await hre.ethers.getSigners();

    console.log("Desplegando contrato con la cuenta:", deployer.address);

    // 2. Obtenemos la "fábrica" del contrato
    const Fitcoin = await hre.ethers.getContractFactory("Fitcoin");

    // 3. Desplegamos. El constructor de Fitcoin pide 'initialOwner', le pasamos 'deployer.address'
    const fitcoin = await Fitcoin.deploy(deployer.address);

    // 4. Esperamos a que se confirme la transacción
    await fitcoin.waitForDeployment();

    console.log("¡Fitcoin desplegado exitosamente en:", await fitcoin.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});