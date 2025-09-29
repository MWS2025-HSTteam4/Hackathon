export class MapScene extends Phaser.Scene {
  constructor() { super("MapScene"); }
  create() {
    this.add.text(100, 20, "マップ - 行き先を選んでください", {fontSize:"20px", fill:"#fff"});

    const nodes = [
      {x:150, y:150, type:"battle"},
      {x:350, y:150, type:"camp"},
      {x:550, y:150, type:"shop"}
    ];

    nodes.forEach(n=>{
      const node = this.add.image(n.x, n.y, "map_node").setInteractive();
      node.setScale(0.3);
      node.on("pointerdown", ()=>{
        if(n.type==="battle") this.scene.start("BattleScene");
        if(n.type==="camp") this.scene.start("CampScene");
        if(n.type==="shop") this.scene.start("ShopScene");
      });
      this.add.text(n.x-30, n.y+40, n.type, {fontSize:"14px", fill:"#fff"});
    });
  }
}