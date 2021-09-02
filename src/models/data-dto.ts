import { GpsCoordinates } from './gps-coordinates';
export interface DataDTO {
  f: string;
  d: string;
  l: string;
  t: number;
  s: {
    bluetooth: Map<string, number>;
    wifi: Map<string, number>;
  };
  gps: GpsCoordinates;
}
