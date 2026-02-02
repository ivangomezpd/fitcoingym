# 🏋️ Gimnasio Fitcoin (FitcoinGym)

Este es un proyecto Full Stack (Blockchain + Backend + Frontend) que simula un sistema de recompensas para un gimnasio. Los usuarios reciben tokens **Fitcoin (FTC)** en la blockchain de Ethereum (red local) cada vez que completan un entrenamiento.

## 🚀 Tecnologías

*   **Blockchain:** Hardhat (Red local de Ethereum), Solidity.
*   **Backend:** Node.js, Express.
*   **Frontend:** HTML, CSS (Estilo Basic-Fit), JavaScript (Ethers.js).
*   **Interacción:** MetaMask.

## 📋 Requisitos Previos

*   Node.js instalado.
*   Extensión MetaMask en tu navegador.
*   Git.

## 🛠️ Instalación

1.  Clona el repositorio:
    ```bash
    git clone <TU_URL_DEL_REPOSITORIO>
    cd fitcoingym
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

## ▶️ Ejecución Local

Para que el proyecto funcione, necesitas tener **dos terminales** abiertas simultáneamente.

### Terminal 1: Blockchain Local
Inicia la red de pruebas de Hardhat. Esto creará 20 cuentas con ETH falso para pruebas.
```bash
npx hardhat node
```
*No cierres esta terminal.*

### Terminal 2: Despliegue y Servidor
1.  En una nueva terminal, despliega el contrato inteligente a tu red local:
    ```bash
    npx hardhat run deploy.js --network localhost
    ```
    *Nota: Copia la dirección del contrato que aparece (ej. `0x5Fb...`) y asegúrate de que coincida con la variable `CONTRACT_ADDRESS` en `server.js` y `public/index.html`.*

2.  Inicia el servidor backend:
    ```bash
    node server.js
    ```

3.  Abre tu navegador en: http://localhost:3000

## 🦊 Configuración de MetaMask

1.  Abre MetaMask y agrega una nueva red manualmente:
    *   **Nombre de la red:** Hardhat Localhost
    *   **Nueva dirección URL de RPC:** `http://127.0.0.1:8545`
    *   **Identificador de cadena:** `31337`
    *   **Símbolo de moneda:** `ETH`
2.  Importa una de las cuentas privadas que aparecen en la **Terminal 1** para tener saldo de prueba (ETH) y poder pagar el gas de las transacciones (aunque en este proyecto el backend paga el gas del minting, necesitarás ETH si quieres hacer transferencias manuales).

## 💪 Uso

1.  Haz clic en **"Conectar MetaMask"**.
2.  Haz clic en **"Agregar FTC a MetaMask"** para ver tus tokens en la billetera.
3.  Haz clic en **"Simular Entrenamiento"** para recibir 10 FTC de recompensa.