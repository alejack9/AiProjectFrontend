import { GpsCoordinates } from './gps-coordinates';
export interface DataDTO {
  f: string;
  d: string;
  l: string;
  t: number;
  s: {
    bluetooth: [string, number][];
    wifi: [string, number][];
  };
  gps: GpsCoordinates;
}
