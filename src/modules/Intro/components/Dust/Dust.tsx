import React, { useState } from 'react';
import { Circle } from './entities';
import {
  EntitiesBoundariesSystem,
  EntitiesMovementSystem,
  System,
} from './systems';
import {
  CIRCLE_RENDER_RULES,
  MIN_RADIUS,
  MIN_SPEED,
  RADIUS_RANGE,
  RANGE_SPEED,
} from './const';
import { CircleRenderer, Renderer } from './renderers';
import { Vector2, getRandomPosition } from './utils';
import { useRenderEngine } from './useRenderEngine';
import { State } from './state';

const useParticles = (boundaries: Vector2) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const context = canvas?.getContext('2d')!;

  const generateCircles = (count: number, distance: number = 1) => {
    return [...new Array(count)].map(() => {
      const radius = MIN_RADIUS + RADIUS_RANGE * Math.random();
      const speed = MIN_SPEED + RANGE_SPEED * Math.random();
      return new Circle(
        getRandomPosition(boundaries, 20),
        Vector2.RandomUnitVector(),
        speed * distance,
        radius * distance
      );
    });
  };
  const [state] = useState<State>(
    new State(
      [
        ...generateCircles(5, 2),
        ...generateCircles(15, 1),
        ...generateCircles(40, 0.5),
      ],
      boundaries,
      50,
      CIRCLE_RENDER_RULES
    )
  );

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
  return { setCanvas };
};

export const Dust = ({ className }: { className: string }) => {
  const isSSR = typeof window === 'undefined';
  const canvasWidth = isSSR ? 0 : window.outerWidth;
  const canvasHeight = canvasWidth / 3;
  const boundaries = new Vector2(canvasWidth, canvasHeight);
  const { setCanvas } = useParticles(boundaries);
  return (
    <canvas
      className={className}
      width={canvasWidth}
      height={canvasHeight}
      ref={setCanvas}
    />
  );
};
