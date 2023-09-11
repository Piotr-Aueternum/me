import { Entity } from './entities';

export const getRandomPosition = (boundaries: Vector2, padding: number = 0) =>
  new Vector2(
    (boundaries.x - padding) * Math.random() + padding / 2,
    (boundaries.y - padding) * Math.random() + padding / 2
  );

export class Vector2 {
  constructor(public readonly x: number, public readonly y: number) {}
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
        destination.position.y - start.position.y
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
    public a: number
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
    public color: ColorRGBA
  ) {}
}

export const calculateCanvasRatio = (canvas: HTMLCanvasElement | null) => {
  const isSSR = typeof window === 'undefined';
  const width = isSSR ? 0 : window.innerWidth;
  const [h, w] = canvas
    ? window
        .getComputedStyle(canvas)
        .getPropertyValue('aspect-ratio')
        .replace('auto', '')
        .trim()
        .split(' / ')
        .map(Number)
    : [1, 1];
  const height = (w * width) / h;
  return { width, height };
};
