import { Bullet } from './bullet'
import { CONST } from '../const/const'
import { IEnemyConstructor } from '../interfaces/enemy.interface'

export class Enemy extends Phaser.GameObjects.Container {
  body: Phaser.Physics.Arcade.Body

  private velocity: Phaser.Math.Vector2
  private cursors: any
  private bullets: Bullet[]
  private shootKey: Phaser.Input.Keyboard.Key
  private isShooting: boolean
  private emitter: Phaser.GameObjects.Particles.ParticleEmitter
  private counter: number
  private particles: Phaser.GameObjects.Particles.ParticleEmitterManager

  public getBullets(): Bullet[] {
    return this.bullets
  }

  public getBody(): any {
    return this.body
  }

  constructor(aParams: IEnemyConstructor) {
    super(aParams.scene, aParams.x, aParams.y)

    // variables
    this.bullets = []
    this.isShooting = false
    this.counter = 0

    // init enemy
    this.initEnemy(aParams.x, aParams.y)
    this.setDepth(2)

    // physics
    this.scene.physics.world.enable(this)
    this.body.allowGravity = false
    this.body.setSize(CONST.TANK_SIZE * 2, CONST.TANK_SIZE * 2)
    this.body.setOffset(-CONST.TANK_SIZE, -CONST.TANK_SIZE)

    console.log(`enemy${aParams.tankCode}`)
    const enemyImage = new Phaser.GameObjects.Image(this.scene, 0, 0, `enemy${aParams.tankCode}`)
    this.add(enemyImage)

    this.scene.add.existing(this)

    // boost particles
    // const enemy = this
    // this.particles = this.scene.add.particles('particleRed')
    // this.emitter = this.particles.createEmitter({
    //   speed: 100,
    //   lifespan: {
    //     onEmit: () => {
    //       const speed = Math.sqrt(Math.pow(enemy.velocity.x, 2) + Math.pow(enemy.velocity.y, 2))
    //       return Phaser.Math.Percent(speed, 0, 5) * 2000
    //     },
    //   },
    //   alpha: {
    //     onEmit: () => {
    //       const speed = Math.sqrt(Math.pow(enemy.velocity.x, 2) + Math.pow(enemy.velocity.y, 2))
    //       return Phaser.Math.Percent(speed, 0, 5)
    //     },
    //   },
    //   angle: {
    //     onEmit: () => {
    //       var v = Phaser.Math.Between(-10, 10)
    //       return Phaser.Math.RadToDeg(enemy.rotation) - 180 + v
    //     },
    //   },
    //   scale: { start: 0.6, end: 0 },
    //   blendMode: 'ADD',
    // })
    // this.emitter.startFollow(this, 0, 0)
  }

  private initEnemy(x: number, y: number): void {
    // define enemy properties
    this.x = x
    this.y = y
    this.velocity = new Phaser.Math.Vector2(0, 0)
  }

  update(): void {
    this.counter += 1
    this.boost()
    if (this.counter % 30 === 0) this.shoot()

    this.applyForces()
    this.checkIfOffScreen()
    this.updateBullets()
    // this.emitter.startFollow(this, -70 * Math.sin(this.rotation), 70 * Math.cos(this.rotation))
  }

  destroy(): void {
    this.bullets.forEach((bullet) => bullet.destroy())
    // this.particles.destroy()
    super.destroy()
  }

  private boost(): void {
    let force = new Phaser.Math.Vector2(Math.cos((11 * Math.PI) / 6), Math.sin((11 * Math.PI) / 6))
    if (this.counter % 200 - 100 > 0) {
      force.scale(0.3)
    }
    else {
      force.scale(-0.3)
    }
    this.velocity.add(force)
  }

  private applyForces(): void {
    this.x += this.velocity.x
    this.y += this.velocity.y

    // this.rotation += 0.005
    this.velocity.scale(0.98)
  }

  private checkIfOffScreen(): void {
    // horizontal check
    if (this.x > this.scene.sys.canvas.width + CONST.TANK_SIZE) {
      this.x = -CONST.TANK_SIZE
    } else if (this.x < -CONST.TANK_SIZE) {
      this.x = this.scene.sys.canvas.width + CONST.TANK_SIZE
    }

    // vertical check
    if (this.y > this.scene.sys.canvas.height + CONST.TANK_SIZE) {
      this.y = -CONST.TANK_SIZE
    } else if (this.y < -CONST.TANK_SIZE) {
      this.y = this.scene.sys.canvas.height + CONST.TANK_SIZE
    }
  }

  private shoot(): void {
    this.bullets.push(
      new Bullet({
        scene: this.scene,
        x: this.x,
        y: this.y,
        rotation: this.rotation - 2 * Math.PI / 6,
        texture: 'bullet',
      }),
    )
  }

  private recoil(): void {
    // create the force in the correct direction
    let force = new Phaser.Math.Vector2(-Math.cos(this.rotation - Math.PI / 2), -Math.sin(this.rotation - Math.PI / 2))

    // reduce the force and apply it to the velocity
    force.scale(0.2)
    this.velocity.add(force)
  }

  private updateBullets(): void {
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].active) {
        this.bullets[i].update()
      } else {
        this.bullets[i].destroy()
        this.bullets.splice(i, 1)
      }
    }
  }
}
