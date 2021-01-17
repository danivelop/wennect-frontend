/* External dependencies */
import _ from 'lodash'

/* Internal dependencies */
import Key from 'constants/Key'

interface MovementServiceProps {
  offsetX?: number
  offsetY?: number
  right?: Key
  left?: Key
  down?: Key
  up?: Key
  handler?: (offsetX: number, offsetY: number) => void
}

class MovementService {
  private allowMove: boolean = false
  private offsetX: number
  private offsetY: number
  private right: Key
  private left: Key
  private down: Key
  private up: Key
  private isRight: boolean = false
  private isLeft: boolean = false
  private isDown: boolean = false
  private isUp: boolean = false
  private handler: (offsetX: number, offsetY: number) => void

  constructor({
    offsetX = 10,
    offsetY = 10,
    right = Key.Right,
    left = Key.Left,
    down = Key.Down,
    up = Key.Up,
    handler = _.noop,
  }: MovementServiceProps) {
    this.offsetX = offsetX
    this.offsetY = offsetY
    this.right = right
    this.left = left
    this.down = down
    this.up = up
    this.handler = handler
  }

  public moveStart(key: string) {
    if (!this.isValidKey(key)) return

    switch (key) {
      case this.right:
        this.isRight = true
        this.isLeft = false
        break
      case this.left:
        this.isLeft = true
        this.isRight = false
        break
      case this.down:
        this.isDown = true
        this.isUp = false
        break
      case this.up:
        this.isUp = true
        this.isDown = false
        break
    }

    if (!this.allowMove) {
      this.allowMove = true
      this.move()
    }
  }

  public moveEnd(key: string) {
    if (!this.isValidKey(key)) return

    switch (key) {
      case this.right:
        this.isRight = false
        break
      case this.left:
        this.isLeft = false
        break
      case this.down:
        this.isDown = false
        break
      case this.up:
        this.isUp = false
        break
    }

    if (!(this.isRight || this.isLeft || this.isDown || this.isUp)) {
      this.allowMove = false
    }
  }

  private move() {
    if (this.allowMove) {
      let offsetX = 0
      let offsetY = 0

      if (this.isRight) {
        offsetX = this.offsetX
      } else if (this.isLeft) {
        offsetX = -this.offsetX
      }

      if (this.isDown) {
        offsetY = this.offsetY
      } else if (this.isUp) {
        offsetY = -this.offsetY
      }

      this.handler(offsetX, offsetY)
      window.requestAnimationFrame(this.move.bind(this))
    }
  }

  private isValidKey(key: string): boolean {
    return (
      key === this.right ||
      key === this.left ||
      key === this.down ||
      key === this.up
    )
  }
}

export default MovementService
