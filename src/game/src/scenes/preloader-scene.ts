export class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'PreloaderScene',
    })
  }

  preload(): void {
    var progressBar = this.add.graphics()
    var progressBox = this.add.graphics()
    progressBox.fillStyle(0x3b3a4b, 0.8)
    progressBox.fillRect(this.sys.canvas.width / 2 - 160, this.sys.canvas.height / 2 - 25, 320, 50)

    var percentText = this.make.text({
      x: this.sys.canvas.width / 2,
      y: this.sys.canvas.height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
      },
    })
    percentText.setOrigin(0.5, 0.5)

    var assetText = this.make.text({
      x: this.sys.canvas.width / 2,
      y: this.sys.canvas.height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
      },
    })
    assetText.setOrigin(0.5, 0.5)

    this.load.on('progress', (value: number) => {
      percentText.setText(`${Math.floor(value * 100)} %`)
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect(this.sys.canvas.width / 2 - 150, this.sys.canvas.height / 2 - 15, 300 * value, 30)
    })

    this.load.on('fileprogress', (file: any) => {
      assetText.setText('Loading asset: ' + file.key)
      assetText.setColor("0x3b3a4b")
    })

    this.load.on('complete', () => {
      progressBar.destroy()
      progressBox.destroy()
      percentText.destroy()
      assetText.destroy()
      this.scene.start('ConnectWallet')
    })

    // for (let i = 0; i < 1000; i++) {
    //   this.load.image('background' + i, './assets/bg.png')
    // }
    this.load.image('background', './assets/bg.png')
    this.load.image('titleLoading', './assets/title-loading.png')
    this.load.image('titleHome', './assets/title-home-text.png')
    this.load.image('buttonConnectWallet', './assets/button-connect-wallet.png')
    this.load.image('buttonLoading', './assets/button-loading.png')
    this.load.image('titleGameOver', './assets/title-game-over.png')
    this.load.image('buttonRetry', './assets/button-retry.png')
    this.load.image('bullet', './assets/bullets/bullet6.png')
    this.load.image('particleBlue', './assets/particles/blue.png')
    this.load.image('particleRed', './assets/particles/red.png')
    this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 })
    this.load.image('spark0', 'assets/particles/blue.png')
    this.load.image('spark1', 'assets/particles/red.png')
    this.load.image('buttonInventory', './assets/button-inventory.png')
    this.load.image('buttonBack', './assets/button-back.png')
    this.load.image('titleInventory', './assets/title-inventory.png')
    this.load.image('cell', './assets/cell.png')
    this.load.image('bigCell', './assets/big-cell.png')
    this.load.image('titleSelect', './assets/title-select.png')
    this.load.image('buttonMint', './assets/button-mint.png')

    this.load.image('enemy0', './assets/enemies/0.png')
    this.load.image('enemy1', './assets/enemies/1.png')
    this.load.image('enemy2', './assets/enemies/2.png')
    this.load.image('enemy3', './assets/enemies/3.png')
    this.load.image('partTurret0', './assets/parts/turret0.png')
    this.load.image('partTurret1', './assets/parts/turret1.png')
    this.load.image('partTurret2', './assets/parts/turret2.png')
    this.load.image('partTurret3', './assets/parts/turret3.png')
    this.load.image('partTurret4', './assets/parts/turret4.png')
    this.load.image('partTurret5', './assets/parts/turret5.png')
    this.load.image('partTurret6', './assets/parts/turret6.png')
    this.load.image('partTurret7', './assets/parts/turret7.png')
    this.load.image('partTurret8', './assets/parts/turret8.png')
    this.load.image('partTurret9', './assets/parts/turret9.png')
    this.load.image('partBody0', './assets/parts/body0.png')
    this.load.image('partBody1', './assets/parts/body1.png')
    this.load.image('partBody2', './assets/parts/body2.png')
    this.load.image('partBody3', './assets/parts/body3.png')
    this.load.image('partBody4', './assets/parts/body4.png')
    this.load.image('partBody5', './assets/parts/body5.png')
    this.load.image('partChassisB0', './assets/parts/chassisb0.png')
    this.load.image('partChassisB1', './assets/parts/chassisb1.png')
    this.load.image('partChassisB2', './assets/parts/chassisb2.png')
    this.load.image('partChassisB3', './assets/parts/chassisb3.png')
    this.load.image('partChassisB4', './assets/parts/chassisb4.png')
    this.load.image('partChassisB5', './assets/parts/chassisb5.png')
    this.load.image('partChassisB6', './assets/parts/chassisb6.png')
    this.load.image('partChassisB7', './assets/parts/chassisb7.png')
    this.load.image('partChassisB8', './assets/parts/chassisb8.png')
    this.load.image('partChassisA0', './assets/parts/chassisa0.png')
    this.load.image('partChassisA1', './assets/parts/chassisa1.png')
    this.load.image('partChassisA2', './assets/parts/chassisa2.png')
    this.load.image('partChassisA3', './assets/parts/chassisa3.png')
    this.load.image('partChassisA4', './assets/parts/chassisa4.png')
    this.load.image('partChassisA5', './assets/parts/chassisa5.png')
    this.load.image('partChassisA6', './assets/parts/chassisa6.png')
    this.load.image('partChassisA7', './assets/parts/chassisa7.png')
    this.load.image('partChassisA8', './assets/parts/chassisa8.png')

    this.load.image('itemTurret0', './assets/items/turret0.png')
    this.load.image('itemTurret1', './assets/items/turret1.png')
    this.load.image('itemTurret2', './assets/items/turret2.png')
    this.load.image('itemTurret3', './assets/items/turret3.png')
    this.load.image('itemTurret4', './assets/items/turret4.png')
    this.load.image('itemTurret5', './assets/items/turret5.png')
    this.load.image('itemTurret6', './assets/items/turret6.png')
    this.load.image('itemTurret7', './assets/items/turret7.png')
    this.load.image('itemTurret8', './assets/items/turret8.png')
    this.load.image('itemTurret9', './assets/items/turret9.png')
    this.load.image('itemBody0', './assets/items/body0.png')
    this.load.image('itemBody1', './assets/items/body1.png')
    this.load.image('itemBody2', './assets/items/body2.png')
    this.load.image('itemBody3', './assets/items/body3.png')
    this.load.image('itemBody4', './assets/items/body4.png')
    this.load.image('itemBody5', './assets/items/body5.png')
    this.load.image('itemChassis0', './assets/items/chassis0.png')
    this.load.image('itemChassis1', './assets/items/chassis1.png')
    this.load.image('itemChassis2', './assets/items/chassis2.png')
    this.load.image('itemChassis3', './assets/items/chassis3.png')
    this.load.image('itemChassis4', './assets/items/chassis4.png')
    this.load.image('itemChassis5', './assets/items/chassis5.png')
    this.load.image('itemChassis6', './assets/items/chassis6.png')
    this.load.image('itemChassis7', './assets/items/chassis7.png')
    this.load.image('itemChassis8', './assets/items/chassis8.png')
  }

  create(): void {}

  update(): void {}
}
