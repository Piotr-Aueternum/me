import { PADDING_SPAWN } from "./const";
import { Entity } from "./entities";
import { State } from "./state";
import { getRandomPosition, Vector2 } from "./utils";

export interface System {
  Start?(state: State): void;
  Update?(state: State): void;
}

export class EntitiesMovementSystem implements System {
  public Update(state: State) {
    const MoveEntity = (entity: Entity) => {
      const rhythm = (100 - entity.rhythm(state.time / 50) * 10 * 3) / 100;
      const speed = entity.speed * state.deltaTime * rhythm;
      entity.position = entity.position.add(entity.direction.multiplyBy(speed));
    };
    state.entities.forEach(MoveEntity);
  }
}
export class EntitiesBoundariesSystem implements System {
  public Update(state: State) {
    const RedirectEntity = (entity: Entity) => {
      let y = entity.direction.y;
      let x = entity.direction.x;
      const speed = entity.speed * state.deltaTime;
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

export class EntitiesRespawnSystem implements System {
  public Update(state: State) {
    const RespawnEntity = (entity: Entity) => {
      if (
        entity.position.y > state.boundaries.y + state.border ||
        entity.position.y < 0 - state.border ||
        entity.position.x > state.boundaries.x + state.border ||
        entity.position.x < 0 - state.border
      ) {
        entity.position = getRandomPosition(state.boundaries, PADDING_SPAWN);
      }
    };
    state.entities.forEach(RespawnEntity);
  }
}

export class EntitiesRandomSpawnSystem implements System {
  public Start(state: State) {
    const RespawnEntity = (entity: Entity) => {
      entity.position = getRandomPosition(state.boundaries, PADDING_SPAWN);
    };
    state.entities.forEach(RespawnEntity);
  }
}
