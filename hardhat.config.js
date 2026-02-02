require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.20",
    networks: {
        // Configuración para la red local de Hardhat
        localhost: {
            url: "http://127.0.0.1:8545",
            chainId: 31337,
        },
    },
};