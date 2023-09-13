import React, { useEffect, useState } from "react";

import { CIRCLE_RENDER_RULES } from "./const";
import { CircleRenderer, Renderer } from "./renderers";
import { State } from "./state";
import {
  EntitiesBoundariesSystem,
  EntitiesMovementSystem,
  EntitiesRespawnSystem,
  System,
} from "./systems";
import { useRenderEngine } from "./useRenderEngine";
import { generateCircles, useWindowSize, Vector2 } from "./utils";

const useParticles = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const context = canvas?.getContext("2d")!;
  const { width, height } = useWindowSize();
  const [boundaries, setBounderies] = useState<Vector2>(
    new Vector2(width, height),
  );
  const [state, setState] = useState<State | null>(null);
  if (typeof window !== "undefined" && canvas && state === null) {
    const newBoundaries = new Vector2(width, height);
    setBounderies(newBoundaries);
    console.log({ width, height });
    setState(
      new State(
        [
          ...generateCircles(5, newBoundaries, 2),
          ...generateCircles(15, newBoundaries, 1),
          ...generateCircles(40, newBoundaries, 0.5),
        ],
        newBoundaries,
        50,
      ),
    );
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    function boundariesSetter() {
      if (state) {
        const newBoundaries = new Vector2(width, height);
        setBounderies(newBoundaries);
        state.boundaries = newBoundaries;
      }
    }
    window.addEventListener("resize", boundariesSetter);
    boundariesSetter();
    return () => window.removeEventListener("resize", boundariesSetter);
  }, [state, height, width]);

  const renderers: Renderer[] = [new CircleRenderer(CIRCLE_RENDER_RULES)];

  const systems: System[] = [
    new EntitiesMovementSystem(),
    new EntitiesBoundariesSystem(),
    new EntitiesRespawnSystem(),
  ];

  useRenderEngine({
    renderers,
    systems,
    context,
    state,
  });
  return { width: boundaries.x, height: boundaries.y, setCanvas };
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
