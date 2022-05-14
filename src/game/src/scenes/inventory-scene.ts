import { upgradeTank } from '../blockchain/lib'
import { CONST } from '../const/const'

export class Inventory extends Phaser.Scene {
  counter = 0

  constructor() {
    super({
      key: 'Inventory',
    })
  }

  replaceAt = function (original: string, index: number, replacement: string) {
    return original.substring(0, index) + replacement + original.substring(index + replacement.length)
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

    this.add.image(this.sys.canvas.width / 2, 80, 'titleInventory')

    const bigCell = this.add.image(0, 0, 'bigCell')
    const partTurret = this.add.image(0, 0, `partTurret${CONST.CURRENT_TANK.tankCode[0]}`)
    const partBody = this.add.image(0, 0, `partBody${CONST.CURRENT_TANK.tankCode[1]}`)
    const partChassisA = this.add.image(0, 0, `partChassisA${CONST.CURRENT_TANK.tankCode[2]}`)
    const partChassisB = this.add.image(0, 0, `partChassisB${CONST.CURRENT_TANK.tankCode[2]}`)
    let container = this.add.container(320, 435, [bigCell, partChassisB, partBody, partChassisA, partTurret])
    container.setSize(bigCell.width, bigCell.height)

    const cellTurret = this.add.image(350, 220, 'cell')
    const cellBody = this.add.image(560, 430, 'cell')
    const cellChassis = this.add.image(350, 650, 'cell')

    const itemTurret = this.add.image(350, 220, `itemTurret${CONST.CURRENT_TANK.tankCode[0]}`)
    const itemBody = this.add.image(560, 430, `itemBody${CONST.CURRENT_TANK.tankCode[1]}`)
    const itemChassis = this.add.image(350, 650, `itemChassis${CONST.CURRENT_TANK.tankCode[2]}`)

    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 6; i++) {
        const cell = this.add.image(800 + i * 130, 250 + j * 130, 'cell')
        const itemName = CONST.INVENTORY[i + 6 * j]

        if (itemName) {
          const item = this.add.image(800 + i * 130, 250 + j * 130, itemName)
          item.setInteractive({ cursor: 'move' })
          item.setDepth(2)
          let targetCell: Phaser.GameObjects.Image

          if (itemName.indexOf('Turret') >= 0) targetCell = cellTurret
          if (itemName.indexOf('Body') >= 0) targetCell = cellBody
          if (itemName.indexOf('Chassis') >= 0) targetCell = cellChassis

          item.on('pointerover', () => {
            cell.setTint(0x87C5FF)
            targetCell.setTint(0x87C5FF)
          })
          item.on('pointerout', () => {
            cell.clearTint()
            targetCell.clearTint()
          })
          this.input.setDraggable(item)
          this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: any, dragX: number, dragY: number) => {
            gameObject.x = dragX
            gameObject.y = dragY
            this.counter = 0
          })
          this.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: any) => {
            this.counter += 1
            if (gameObject.texture.key.indexOf('Turret') >= 0 && this.counter <= 1) {
              CONST.CURRENT_TANK.tankCode = this.replaceAt(
                CONST.CURRENT_TANK.tankCode,
                0,
                gameObject.texture.key.replace('itemTurret', ''),
              )
              itemTurret.setTexture(`itemTurret${CONST.CURRENT_TANK.tankCode[0]}`)
              partTurret.setTexture(`partTurret${CONST.CURRENT_TANK.tankCode[0]}`)
              upgradeTank(CONST.CURRENT_TANK)
            }

            if (gameObject.texture.key.indexOf('Body') >= 0 && this.counter <= 1) {
              CONST.CURRENT_TANK.tankCode = this.replaceAt(
                CONST.CURRENT_TANK.tankCode,
                1,
                gameObject.texture.key.replace('itemBody', ''),
              )
              itemBody.setTexture(`itemBody${CONST.CURRENT_TANK.tankCode[1]}`)
              partBody.setTexture(`partBody${CONST.CURRENT_TANK.tankCode[1]}`)
              upgradeTank(CONST.CURRENT_TANK)
            }

            if (gameObject.texture.key.indexOf('Chassis') >= 0 && this.counter <= 1) {
              CONST.CURRENT_TANK.tankCode = this.replaceAt(
                CONST.CURRENT_TANK.tankCode,
                2,
                gameObject.texture.key.replace('itemChassis', ''),
              )
              itemChassis.setTexture(`itemChassis${CONST.CURRENT_TANK.tankCode[2]}`)
              partChassisA.setTexture(`partChassisA${CONST.CURRENT_TANK.tankCode[2]}`)
              partChassisB.setTexture(`partChassisB${CONST.CURRENT_TANK.tankCode[2]}`)
              upgradeTank(CONST.CURRENT_TANK)
            }

            gameObject.x = -100
            gameObject.y = -100
          })
        }
      }
    }

    let buttonBack = this.add.image(100, this.sys.canvas.height - 100, 'buttonBack')
    buttonBack.setInteractive({ cursor: 'pointer' })
    buttonBack.on('pointerover', () => buttonBack.setTint(0x87C5FF))
    buttonBack.on('pointerout', () => buttonBack.clearTint())
    buttonBack.on('pointerdown', () => this.scene.start('Game'))
  }

  update(): void {}
}
