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
  results: Map<string, number>;
  private interval;
  ok = 0;

  async startScan() {
    console.log(this.startService);
    while (this.startService) {
      console.log('WAITING BLUETOOTH DEVICES.................');
      const ble = await this.bleProvider.getBluetoothDevices();
      console.log('................. DONE');
      this.ok++;
      // console.log(networks);
      // this.results = networks.map(
      //   (r) => `${r.BSSID} -> ${r.level}, `
      // this.results = ble;
      ble.forEach((val, key) => {
        console.log(val + ' - ' + key);
      });
    }
    // if (this.startService) {
    //   this.interval = setInterval(async () => {
    //     // const networks = await this.wifiProvider.getNetworks();
    //     // const geoCoord = await this.geoProvider.getLocation();
    //     console.log('WAITING BLUETOOTH DEVICES.................');
    //     const ble = await this.bleProvider.getBluetoothDevices();
    //     console.log('................. DONE');
    //     this.ok++;
    //     // console.log(networks);
    //     // this.results = networks.map(
    //     //   (r) => `${r.BSSID} -> ${r.level}, `
    //     this.results = ble;
    //     console.log(this.results);
    //   }, 2100);
    // } else clearInterval(this.interval);
  }
}
