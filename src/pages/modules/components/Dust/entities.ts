import { Vector2 } from './utils';

export class Entity {
  constructor(
    public position: Vector2,
    private _direction: Vector2,
    public speed: number
  ) {
    this._direction = _direction.normalized();
  }
  get direction() {
    return this._direction;
  }

  set direction(newDirection: Vector2) {
    this._direction = newDirection.normalized();
  }
}

export class Circle extends Entity {
  constructor(
    position: Vector2,
    _direction: Vector2,
    speed: number,
    public radius: number
  ) {
    super(position, _direction, speed);
  }
}
