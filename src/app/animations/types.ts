export type Step = {
  array: number[];
  sorted: number[];
  log: string;
  pivot?: number;
  comparing?: number[];
  heapifying?: number[];
  swapping?: number[];
  dividing?: number[];
  merging?: number[];
};

export type LegendMarker = {
  name: string;
  fill: string;
};
