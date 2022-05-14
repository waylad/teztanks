export interface ITankConstructor {
  scene: Phaser.Scene;
  x: number;
  y: number;
  tankCode: string;
  frame?: string | number;
}
