import { Hotspot } from '@ionic-native/hotspot/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WifiProviderService {
  constructor(private hotspot: Hotspot) {}
  async getNetworks(): Promise<{ BSSID: string; level: number }[]> {
    return await this.hotspot.scanWifi();
  }
}
