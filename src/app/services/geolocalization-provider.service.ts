import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root',
})
export class GeolocalizationProviderService {
  constructor(private geo: Geolocation) {}

  async getGPSLocation(): Promise<Geoposition> {
    try {
      return await this.geo.getCurrentPosition();
    } catch (e) {
      console.log(e);
    }
  }
}
