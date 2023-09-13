import React from "react";

import {
  MIN_RADIUS,
  MIN_SPEED,
  PADDING_SPAWN,
  RADIUS_RANGE,
  RANGE_SPEED,
} from "./const";
import { Circle, Entity } from "./entities";

export const getRandomPosition = (boundaries: Vector2, padding: number = 0) =>
  new Vector2(
    (boundaries.x - padding) * Math.random() + padding / 2,
    (boundaries.y - padding) * Math.random() + padding / 2,
  );

export class Vector2 {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}
  public static RandomUnitVector() {
    const random = Math.random() * (2 * Math.PI);
    return new Vector2(Math.cos(random), Math.sin(random));
  }
  public add(right: Vector2) {
    return new Vector2(this.x + right.x, this.y + right.y);
  }
  public multiplyBy(val: number) {
    return new Vector2(this.x * val, this.y * val);
  }
  public magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  public normalized() {
    const magnitude = this.magnitude();
    return new Vector2(this.x / magnitude, this.y / magnitude);
  }
}

export const generateEntityPairs = (entities: Entity[], threshold: number) => {
  const pairs: Entity[][] = [];
  for (let i = 0; i < entities.length - 1; i++) {
    for (let j = i + 1; j < entities.length; j++) {
      const start = entities[i];
      const destination = entities[j];
      const distance = Math.hypot(
        destination.position.x - start.position.x,
        destination.position.y - start.position.y,
      );
      if (distance < threshold) pairs.push([start, destination]);
    }
  }
  return pairs;
};

export class ColorRGBA {
  constructor(
    public r: number,
    public g: number,
    public b: number,
    public a: number,
  ) {}
  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
  withAlpha(a: number) {
    return new ColorRGBA(this.r, this.g, this.b, a);
  }
}

export class FadingCircle {
  constructor(
    public fadingStart: number,
    public sizeFadingStart: number,
    public color: ColorRGBA,
  ) {}
}

export const generateCircles = (
  count: number,
  boundaries: Vector2,
  distance: number = 1,
) => {
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
      getRandomPosition(boundaries, PADDING_SPAWN),
      Vector2.RandomUnitVector(),
      speed * distance,
      rhythm,
      radius * distance,
    );
  });
};

export function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: 1200,
    height: 800,
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    function changeWindowSize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", changeWindowSize);
    changeWindowSize();
    return () => window.removeEventListener("resize", changeWindowSize);
  }, []);

  return windowSize;
}
