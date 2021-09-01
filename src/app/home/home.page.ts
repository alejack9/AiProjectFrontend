import { WifiProviderService } from './../services/wifi-provider.service';
import { Platform } from '@ionic/angular';
import { Hotspot } from '@ionic-native/hotspot/ngx';
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
    private platform: Platform,
    private hotspot: Hotspot,
    private geoProvider: GeolocalizationProviderService,
    private bleProvider: BluetoothProviderService,
    private wifiProvider: WifiProviderService
  ) {
    platform.ready().then(() => {
      this.ready = true;
    });
  }

  private interval;

  private ready = false;
  startService: boolean = false;
  results: string[] = [];
  ok = 0;
  errors = 0;
  empties = 0;
  lastError;

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
    // if (!this.ready) return (this.startService = false);
    // while (this.startService) {
    //   const net = await this.hotspot.scanWifi();
    //   const geoCoord = await this.geoProvider.getGPSLocation();
    //   const ble = await this.bleProvider.getBluetoothDevices();
    //   console.log('-------------------------------');
    //   console.log(net);
    //   console.log('-------------------------------');
    //   if (net.length === 0) this.empties++;
    //   else {
    //     this.results = net.map((r) => `${r.BSSID} - ${r.level}`);

    //     this.ok++;
    //   }
    //   await this.waitFor(5000);
    // }
    // if (this.startService) {
    //   await this.wifiProvider.getNetworks();
    //   this.interval = setInterval(async () => {
    //     const networks = await this.wifiProvider.getNetworks();
    //     const geoCoord = await this.geoProvider.getGPSLocation();
    //     const ble = await this.bleProvider.getBluetoothDevices();
    //     this.ok++;
    //     // console.log(networks);
    //     this.results = networks.map(
    //       (r) =>
    //         `${r.BSSID} -> ${r.level}, ` +
    //         ` bluetooth: { id: ` +
    //         this.bleProvider.id +
    //         ` -> rssi: ` +
    //         this.bleProvider.rssi +
    //         ` },` +
    //         ` pos: { lat: ` +
    //         geoCoord.coords.latitude +
    //         `,` +
    //         ` long: ` +
    //         geoCoord.coords.longitude +
    //         `,` +
    //         ` alt: ` +
    //         geoCoord.coords.altitude +
    //         ` }`
    //     );
    //   }, 2100);
    // } else clearInterval(this.interval);
  }

  waitFor = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
}
