import { ColorRGBA, FadingCircle } from './utils';

export const MIN_SPEED = 0.12;
export const RANGE_SPEED = 0.12;
export const MIN_RADIUS = 8;
export const RADIUS_RANGE = 3;
export const MAX_RADIUS = MIN_RADIUS + RADIUS_RANGE;

export const CIRCLE_RENDER_RULES = [
  new FadingCircle(0.3, MAX_RADIUS * 0.5, new ColorRGBA(160, 160, 160, 0.3)),
  new FadingCircle(0.95, MAX_RADIUS * 0.7, new ColorRGBA(160, 160, 160, 0.2)),
  new FadingCircle(0.7, Infinity, new ColorRGBA(160, 160, 160, 0.1)),
];
