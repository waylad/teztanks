import { getTanks, mintTank } from '../blockchain/lib'
import { CONST } from '../const/const'

export class SelectTank extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = []
  private buttonMint: Phaser.GameObjects.Image
  private showLoading: boolean
  private showingLoading: boolean

  constructor() {
    super({
      key: 'SelectTank',
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

    this.add.image(this.sys.canvas.width / 2, 100, 'titleSelect')

    for (let i = 0; i < 4; i++) {
      const bigCell = this.add.image(
        this.sys.canvas.width / 2 - 450 + i * 300,
        this.sys.canvas.height / 2 - 50,
        'bigCell',
      )
      const tank = CONST.USER_TANKS[i]

      if (tank && tank.tankCode) {
        const partTurret = this.add.image(0, 0, `partTurret${tank.tankCode[0]}`)
        const partBody = this.add.image(0, 0, `partBody${tank.tankCode[1]}`)
        const partChassisA = this.add.image(0, 0, `partChassisA${tank.tankCode[2]}`)
        const partChassisB = this.add.image(0, 0, `partChassisB${tank.tankCode[2]}`)
        let container = this.add.container(this.sys.canvas.width / 2 - 450 + i * 300, this.sys.canvas.height / 2 - 50, [
          partChassisB,
          partBody,
          partChassisA,
          partTurret,
        ])
        container.setSize(bigCell.width, bigCell.height)
        container.setInteractive({ cursor: 'pointer' })
        container.on('pointerover', () => bigCell.setTint(0x87C5FF))
        container.on('pointerout', () => bigCell.clearTint())
        container.on('pointerdown', () => {
          CONST.CURRENT_TANK = tank
          console.log(tank)
          this.scene.start('Game')
        })
      }
    }

    this.buttonMint = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2 + 200, 'buttonMint')
    this.buttonMint.setSize(this.buttonMint.width, this.buttonMint.height)
    this.buttonMint.setInteractive({ cursor: 'pointer' })
    this.buttonMint.on('pointerover', () => this.buttonMint.setTint(0x87C5FF))
    this.buttonMint.on('pointerout', () => this.buttonMint.clearTint())
    this.buttonMint.on('pointerdown', async () => {
      this.showLoading = true
      await mintTank()
      await getTanks()
      this.showLoading = false
    })

    let buttonBack = this.add.image(100, this.sys.canvas.height - 100, 'buttonBack')
    buttonBack.setInteractive({ cursor: 'pointer' })
    buttonBack.on('pointerover', () => buttonBack.setTint(0x87C5FF))
    buttonBack.on('pointerout', () => buttonBack.clearTint())
    buttonBack.on('pointerdown', () => this.scene.start('ConnectWallet'))
  }

  update(): void {
    if(this.showLoading && !this.showingLoading) {
      this.showingLoading = true
      this.buttonMint.setTexture("buttonLoading")
    }

    if(!this.showLoading && this.showingLoading) {
      this.showingLoading = false
      this.buttonMint.setTexture("buttonMint")
    }
  }
}
