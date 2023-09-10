import { Entity } from './entities';
import { FadingCircle, Vector2 } from './utils';

export class State {
  constructor(
    public entities: Entity[],
    public boundaries: Vector2,
    public border: number,
    public circleRules: FadingCircle[]
  ) {}
}
