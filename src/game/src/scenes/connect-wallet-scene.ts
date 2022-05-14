import { connectWallet, getTanks } from '../blockchain/lib'
import { CONST } from '../const/const'

export class ConnectWallet extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = []
  private buttonConnectWallet: Phaser.GameObjects.Image
  private showLoading: boolean
  private showingLoading: boolean

  constructor() {
    super({
      key: 'ConnectWallet',
    })
  }

  init(): void {}

  preload(): void {
  }

  create(): void {
    this.showLoading = false
    this.showingLoading = false

    this.add.tileSprite(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      this.sys.canvas.width,
      this.sys.canvas.height,
      'background',
    )

    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2 - 150, 'titleHome')

    this.buttonConnectWallet = this.add.image(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2 + 100,
      'buttonConnectWallet',
    )
    this.buttonConnectWallet.setSize(this.buttonConnectWallet.width, this.buttonConnectWallet.height)
    this.buttonConnectWallet.setInteractive({ cursor: 'pointer' })
    this.buttonConnectWallet.on('pointerover', () => this.buttonConnectWallet.setTint(0x87C5FF))
    this.buttonConnectWallet.on('pointerout', () => this.buttonConnectWallet.clearTint())
    this.buttonConnectWallet.on('pointerdown', async () => {
      this.showLoading = true
      await connectWallet()
      await getTanks()
      this.scene.start('SelectTank')
    })
  }

  update(): void {
    if(this.showLoading && !this.showingLoading) {
      this.showingLoading = true
      this.buttonConnectWallet.setTexture("buttonLoading")
    }

  }
}
