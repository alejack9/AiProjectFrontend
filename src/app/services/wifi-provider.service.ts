import { Hotspot } from '@ionic-native/hotspot/ngx';
import { Injectable } from '@angular/core';
import { ParseErrorLevel } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class WifiProviderService {
  constructor(private hotspot: Hotspot) {}
  async getNetworks(): Promise<[string, number][]> {
    return (await this.hotspot.scanWifi()).map((v) => [v.BSSID, v.level]);
  }
}
