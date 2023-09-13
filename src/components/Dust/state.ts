import { Entity } from "./entities";
import { FadingCircle, Vector2 } from "./utils";

export class State {
  public deltaTime: number = 0;
  public time: number = 0;
  constructor(
    public entities: Entity[],
    public boundaries: Vector2,
    public border: number,
    public circleRules: FadingCircle[],
  ) {}
}
