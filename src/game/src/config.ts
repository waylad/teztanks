import { BootScene } from './scenes/boot-scene';
import { PreloaderScene } from './scenes/preloader-scene';
import { ConnectWallet } from './scenes/connect-wallet-scene';
import { GameOver } from './scenes/game-over-scene';
import { Game } from './scenes/game-scene';
import { Inventory } from './scenes/inventory-scene';
import { SelectTank } from './scenes/select-tank-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Teztanks',
  url: 'https://github.com/waylad/teztanks',
  version: '2.0',
  width: 1600,
  height: 800,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, PreloaderScene, ConnectWallet, SelectTank, Game, Inventory, GameOver],
  input: {
    keyboard: true,
    mouse: true,
    touch: false,
    gamepad: false
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  backgroundColor: '#000000',
  render: { pixelArt: false, antialias: true }
};
