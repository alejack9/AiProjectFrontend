import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root',
})
export class GeolocalizationProviderService {
  constructor(private geo: Geolocation) {}

  async getLocation(): Promise<{
    lat: number;
    long: number;
    alt: number;
    accuracy: number;
  }> {
    const result = await this.geo.getCurrentPosition();
    return {
      lat: result.coords.latitude,
      long: result.coords.longitude,
      alt: result.coords.altitude,
      accuracy: result.coords.accuracy,
    };
  }
}
