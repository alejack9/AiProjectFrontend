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
    if (!this.ready) return (this.startService = false);
    console.log(this.startService);
    while (this.startService) {
      console.log('WAITING WIFI SIGNALS.................');
      const net = await this.hotspot.scanWifi();
      console.log('WAITING WIFI SIGNALS ................. DONE');
      console.log('WAITING BLUETOOTH DEVICES.................');
      const ble = await this.bleProvider.getBluetoothDevices();
      console.log('WAITING BLUETOOTH DEVICES ................. DONE');
      console.log('WAITING GPS COORDINATES .................');
      const gpsCoordinates = await this.geoProvider.getLocation();
      console.log('WAITING GPS COORDINATES ................. DONE');
      this.ok++;
      // this.results = networks.map(
      //   (r) => `${r.BSSID} -> ${r.level}, `
      // this.results = ble;
      console.log('BLUETOOTH');
      ble.forEach((val, key) => {
        console.log(val + ' - ' + key);
      });
      console.log('WIFI');
      net.forEach((val) => {
        console.log(`${val.BSSID} - ${val.level}`);
      });
      console.log('GPS');
      console.log(JSON.stringify(gpsCoordinates));
      await this.waitFor(6000);
    }
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
  }

  waitFor = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
}
