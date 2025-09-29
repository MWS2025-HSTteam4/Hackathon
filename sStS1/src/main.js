import { BootScene    } from './scenes/BootScene.js';
import { BattleScene  } from './scenes/BattleScene.js';
import { CampScene    } from './scenes/CampScene.js';
import { ShopScene    } from './scenes/ShopScene.js';
import { MapScene     } from './scenes/MapScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#222",
  scene: [BootScene, MapScene, BattleScene, CampScene, ShopScene]
};

const game = new Phaser.Game(config);
