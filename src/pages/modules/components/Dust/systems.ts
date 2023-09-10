import { Entity } from './entities';
import { State } from './state';
import { Vector2 } from './utils';

export interface System {
  Update(deltaTime: number, state: State): void;
}

export class EntitiesMovementSystem implements System {
  public Update(deltaTime: number, state: State) {
    const MoveEntity = (entity: Entity) => {
      entity.position = entity.position.add(
        entity.direction.multiplyBy(entity.speed * deltaTime)
      );
    };
    state.entities.forEach(MoveEntity);
  }
}
export class EntitiesBoundariesSystem implements System {
  public Update(deltaTime: number, state: State) {
    const RedirectEntity = (entity: Entity) => {
      let y = entity.direction.y;
      let x = entity.direction.x;
      const speed = entity.speed * deltaTime;
      if (
        entity.position.y + y * speed > state.boundaries.y + state.border ||
        entity.position.y + y * speed < 0 - state.border
      ) {
        y = -y;
      }
      if (
        entity.position.x + x * speed > state.boundaries.x + state.border ||
        entity.position.x + x * speed < 0 - state.border
      ) {
        x = -x;
      }
      entity.direction = new Vector2(x, y);
    };
    state.entities.forEach(RedirectEntity);
  }
}
