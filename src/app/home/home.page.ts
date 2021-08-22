import { WifiProviderService } from './../services/wifi-provider.service';
import { Component } from '@angular/core';
import { BluetoothProviderService } from '../services/bluetooth-provider.service';
import { GeolocalizationProviderService } from '../services/geolocalization-provider.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private wifiProvider: WifiProviderService,
    private geoProvider: GeolocalizationProviderService,
    private bleProvider: BluetoothProviderService
  ) {}

  startService: boolean = false;
  results: string[] = [];
  private interval;
  ok = 0;

  async startScan() {
    if (this.startService) {
      await this.wifiProvider.getNetworks();
      this.interval = setInterval(async () => {
        const networks = await this.wifiProvider.getNetworks();
        const geoCoord = await this.geoProvider.getGPSLocation();
        const ble = await this.bleProvider.getBluetoothDevices();
        this.ok++;
        // console.log(networks);
        this.results = networks.map(
          (r) =>
            `${r.BSSID} -> ${r.level}` +
            ` Geo: { lat: ` +
            geoCoord.coords.latitude +
            ` lng: ` +
            geoCoord.coords.longitude +
            ` alt: ` +
            geoCoord.coords.altitude +
            ` }`
        );
      }, 2100);
    } else clearInterval(this.interval);
  }
}
