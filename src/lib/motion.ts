/** Delay by grid position, capped so nobody waits long. */
export function staggerDelay(index: number, step = 70, max = 350) {
  return Math.min(index * step, max)
}
