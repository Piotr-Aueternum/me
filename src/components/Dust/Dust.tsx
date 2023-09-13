import React, { useState } from "react";

import {
  CIRCLE_RENDER_RULES,
  MIN_RADIUS,
  MIN_SPEED,
  RADIUS_RANGE,
  RANGE_SPEED,
} from "./const";
import { Circle } from "./entities";
import { CircleRenderer, Renderer } from "./renderers";
import { State } from "./state";
import {
  EntitiesBoundariesSystem,
  EntitiesMovementSystem,
  System,
} from "./systems";
import { useRenderEngine } from "./useRenderEngine";
import { calculateCanvasRatio, getRandomPosition, Vector2 } from "./utils";

const useParticles = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const context = canvas?.getContext("2d")!;

  const { width, height } = calculateCanvasRatio(canvas);
  const boundaries = new Vector2(width, height);

  const generateCircles = (count: number, distance: number = 1) => {
    return [...new Array(count)].map(() => {
      const radius = MIN_RADIUS + RADIUS_RANGE * Math.random();
      const speed = MIN_SPEED + RANGE_SPEED * Math.random();
      const fstTurbulence = 2 + 2 * Math.random();
      const sndTurbulence = 1 + Math.random();
      const trdTurbulence = Math.random();
      const rhythm = (x: number) => {
        return (
          Math.sin(x / fstTurbulence) +
          Math.sin(x * sndTurbulence) / sndTurbulence +
          Math.sin(x * (trdTurbulence / (1 + trdTurbulence)))
        );
      };
      return new Circle(
        getRandomPosition(boundaries, 20),
        Vector2.RandomUnitVector(),
        speed * distance,
        rhythm,
        radius * distance,
      );
    });
  };
  const [state, setState] = useState<State | null>(null);
  if (canvas && state === null) {
    setState(
      new State(
        [
          ...generateCircles(5, 2),
          ...generateCircles(15, 1),
          ...generateCircles(40, 0.5),
        ],
        boundaries,
        50,
        CIRCLE_RENDER_RULES,
      ),
    );
  }

  const renderers: Renderer[] = [new CircleRenderer()];

  const systems: System[] = [
    new EntitiesMovementSystem(),
    new EntitiesBoundariesSystem(),
  ];

  useRenderEngine({
    renderers,
    systems,
    context,
    state,
  });
  return { width: width, height: height, setCanvas };
};

export const Dust = ({ className }: { className: string }) => {
  const { width, height, setCanvas } = useParticles();

  return (
    <canvas
      className={className}
      width={width}
      height={height}
      ref={setCanvas}
    />
  );
};
