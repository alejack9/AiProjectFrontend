import { GpsCoordinates } from './../../models/gps-coordinates';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root',
})
export class GeolocalizationProviderService {
  constructor(private geo: Geolocation) {}

  async getLocation(): Promise<GpsCoordinates> {
    const result = await this.geo.getCurrentPosition();
    return {
      lat: result.coords.latitude,
      lon: result.coords.longitude,
      alt: result.coords.altitude,
      accuracy: result.coords.accuracy,
      altAccuracy: result.coords.altitudeAccuracy,
    };
  }
}
