// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importamos los contratos necesarios de OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Fitcoin
 * @author Tu Gimnasio
 * @notice Token de recompensa para el ecosistema del gimnasio.
 * Es acuñable (mintable) por el propietario y quemable (burnable) por los usuarios.
 */
contract Fitcoin is ERC20, ERC20Burnable, Ownable {
    /**
     * @dev El constructor se ejecuta una sola vez al desplegar el contrato.
     * @param initialOwner La dirección que será la propietaria del contrato (el gimnasio).
     */
    constructor(address initialOwner)
        ERC20("Fitcoin", "FTC")
        Ownable(initialOwner)
    {
        // Se crea el suministro inicial de 100,000,000 de tokens.
        // Estos tokens se asignan directamente a la billetera del propietario.
        uint256 initialSupply = 100_000_000 * (10 ** decimals());
        _mint(initialOwner, initialSupply);
    }

    /**
     * @notice Permite al propietario del contrato crear (acuñar) nuevos tokens.
     * @dev Esta función está restringida para que solo el 'owner' pueda llamarla.
     * @param to La dirección que recibirá los nuevos tokens.
     * @param amount La cantidad de tokens a acuñar (sin contar los decimales).
     */
    function mint(address to, uint256 amount) public onlyOwner {
        // Se multiplica por 10**decimals() para manejar las unidades correctamente.
        _mint(to, amount * (10 ** decimals()));
    }
}