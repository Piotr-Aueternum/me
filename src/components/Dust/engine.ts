import type { Renderer } from "./renderers";
import { State } from "./state";
import type { System } from "./systems";

export const engine = ({
  renderers,
  systems,
  state,
  context,
}: {
  renderers: Renderer[];
  systems: System[];
  state: State | null;
  context: CanvasRenderingContext2D;
}) => {
  const update = () => {
    if (context && state) {
      context.clearRect(0, 0, state.boundaries.x, state.boundaries.y);
      systems.forEach((system) => system.Update(state));
      context.save();
      renderers.forEach((renderer) => renderer.Render(context, state));
      context.restore();
    }
  };

  const fps = 60;
  const second = 1000;
  const desiredFrameRate = second / fps;

  let deltaTime = 0;
  let lastTimestamp = 0;
  let time = 0;
  const loop = (timestamp: number) => {
    window.requestAnimationFrame(loop);
    deltaTime = (timestamp - lastTimestamp) / desiredFrameRate;
    lastTimestamp = timestamp;
    if (deltaTime > 3) {
      deltaTime = 3;
    }
    time += deltaTime;
    if (state) {
      state.deltaTime = deltaTime;
      state.time = time;
    }
    update();
  };
  window.requestAnimationFrame(loop);
};
