import { useEffect } from 'react';
import { Renderer } from './renderers';
import { System } from './systems';
import { State } from './state';

export const useRenderEngine = ({
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
  useEffect(() => {
    const update = (deltaTime: number) => {
      if (context && state) {
        context.clearRect(0, 0, state.boundaries.x, state.boundaries.y);
        systems.forEach((system) => system.Update(deltaTime, state));
        context.save();
        renderers.forEach((renderer) => renderer.Render(context, state));
        context.restore();
      }
    };

    let animationFrameId: number;
    const fps = 60;
    const second = 1000;
    const desiredFrameRate = second / fps;

    let deltaTime = 0;
    let lastTimestamp = 0;

    const loop = (timestamp: number) => {
      animationFrameId = window.requestAnimationFrame(loop);
      deltaTime = (timestamp - lastTimestamp) / desiredFrameRate;
      lastTimestamp = timestamp;
      if (deltaTime > 3) {
        deltaTime = 3;
      }
      update(deltaTime);
    };
    animationFrameId = window.requestAnimationFrame(loop);
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [renderers, systems, context, state]);
};
