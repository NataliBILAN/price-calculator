export type FormData = {
  size: string;
  type: string;
  locations: {
    start: string;
    delivery: string;
    end: string;
  };
};

export type PriceData = {
  min: number;
  max: number;
  average: number;
  data: number[];
};
