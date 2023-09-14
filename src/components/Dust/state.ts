import { Entity } from "./entities";
import { Vector2 } from "./utils";

export class State {
  public deltaTime: number = 0;
  public time: number = 0;
  constructor(
    private _entities: Entity[],
    public boundaries: Vector2,
    public border: number,
  ) {}

  public get entities(): readonly Entity[] {
    return this._entities;
  }

  public set entities(entities: Entity[]) {
    if (entities !== this._entities) {
      this._entities = entities;
    }
  }

  public AddEntity(entity: Entity) {
    this._entities.push(entity);
  }
}
