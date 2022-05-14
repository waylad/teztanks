import { CONST } from '../const/const'

export class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOver',
    })
  }

  init(): void {}

  preload(): void {
  }

  create(): void {
    this.add.tileSprite(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      this.sys.canvas.width,
      this.sys.canvas.height,
      'background',
    )

    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'titleGameOver')

    let buttonRetry = this.add.image(400, this.sys.canvas.height - 100, 'buttonRetry')
    buttonRetry.setInteractive({ cursor: 'pointer' })
    buttonRetry.on('pointerover', () => buttonRetry.setTint(0x87C5FF))
    buttonRetry.on('pointerout', () => buttonRetry.clearTint())
    buttonRetry.on('pointerdown', () => this.scene.start('Game'))

    let buttonInventory = this.add.image(250, this.sys.canvas.height - 100, 'buttonInventory')
    buttonInventory.setInteractive({ cursor: 'pointer' })
    buttonInventory.on('pointerover', () => buttonInventory.setTint(0x87C5FF))
    buttonInventory.on('pointerout', () => buttonInventory.clearTint())
    buttonInventory.on('pointerdown', () => this.scene.start('Inventory'))

    let buttonBack = this.add.image(100, this.sys.canvas.height - 100, 'buttonBack')
    buttonBack.setInteractive({ cursor: 'pointer' })
    buttonBack.on('pointerover', () => buttonBack.setTint(0x87C5FF))
    buttonBack.on('pointerout', () => buttonBack.clearTint())
    buttonBack.on('pointerdown', () => this.scene.start('SelectTank'))
  }

  update(): void {}
}
