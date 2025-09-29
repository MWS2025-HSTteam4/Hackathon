import { BootScene    } from './scenes/BootScene.js';
import { MapScene     } from './scenes/MapScene.js';
import { BattleScene  } from './scenes/BattleScene.js';
import { RewardScene  } from './scenes/RewardScene.js';
import { CampScene    } from './scenes/CampScene.js';
import { ShopScene    } from './scenes/ShopScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#222",
  scene: [BootScene, MapScene, BattleScene, RewardScene, CampScene, ShopScene]
};

const game = new Phaser.Game(config);
