import { Circle, Entity } from "./entities";
import { State } from "./state";
import { generateEntityPairs, Vector2 } from "./utils";

export interface Renderer {
  Render(context: CanvasRenderingContext2D, state: State): void;
}
export class CircleRenderer implements Renderer {
  Render(context: CanvasRenderingContext2D, state: State) {
    const RenderCircle = (entity: Entity) => {
      if (!(entity instanceof Circle)) {
        return;
      }
      const circle = entity as Circle;
      var radgrad = context.createRadialGradient(
        circle.position.x,
        circle.position.y,
        0,
        circle.position.x,
        circle.position.y,
        circle.radius,
      );
      const sortedCircleRenderRules = state.circleRules.toSorted(
        (a, b) => a.sizeFadingStart - b.sizeFadingStart,
      );
      for (const fadingCircle of sortedCircleRenderRules) {
        if (circle.radius < fadingCircle.sizeFadingStart) {
          radgrad.addColorStop(
            fadingCircle.fadingStart,
            fadingCircle.color.toString(),
          );
          radgrad.addColorStop(1, fadingCircle.color.withAlpha(0).toString());
          break;
        }
      }

      context.fillStyle = radgrad;
      context.fillRect(
        circle.position.x - circle.radius,
        circle.position.y - circle.radius,
        circle.radius * 2,
        circle.radius * 2,
      );

      context.fill();
    };

    state.entities.forEach(RenderCircle);
  }
}

export class LineRenderer implements Renderer {
  constructor(
    private threshold: number,
    private color: string,
    private width: number = 1,
  ) {}
  Render(context: CanvasRenderingContext2D, state: State) {
    const DrawLine = (start: Vector2, destination: Vector2) => {
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(destination.x, destination.y);
      context.strokeStyle = this.color;
      context.lineWidth = this.width;
      context.stroke();
    };
    const pairs = generateEntityPairs(state.entities, this.threshold);
    pairs.forEach(([start, destination]) => {
      DrawLine(start.position, destination.position);
    });
  }
}
