const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors()); // Permite que la web hable con el servidor
app.use(express.json());
app.use(express.static("public")); // Servirá nuestra página web automáticamente

// --- CONFIGURACIÓN ---
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const LOCAL_RPC_URL = "http://127.0.0.1:8545";
// Esta es la clave privada de la cuenta #0 de Hardhat (el dueño por defecto)
const OWNER_PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// 1. Cargar el ABI (el manual de instrucciones del contrato)
const artifactPath = path.join(__dirname, "artifacts/contracts/Fitcoin.sol/Fitcoin.json");
const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
const abi = artifact.abi;

// 2. Conectar a la Blockchain Local
const provider = new ethers.JsonRpcProvider(LOCAL_RPC_URL);
const wallet = new ethers.Wallet(OWNER_PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

// --- RUTAS ---

// Endpoint: El usuario dice "Terminé mi rutina"
app.post("/claim-reward", async (req, res) => {
    try {
        const { userAddress } = req.body;
        const amount = 10; // Recompensa fija de 10 Fitcoins

        console.log(`🏋️ Usuario ${userAddress} entrenó. Enviando ${amount} FTC...`);

        // El backend (dueño) paga el gas y ejecuta la transacción
        const tx = await contract.mint(userAddress, amount);
        await tx.wait(); // Esperamos confirmación

        console.log(`✅ Transacción confirmada: ${tx.hash}`);
        res.json({ success: true, txHash: tx.hash });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("🚀 Servidor listo en http://localhost:3000");
});