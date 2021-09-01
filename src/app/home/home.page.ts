import { WifiProviderService } from './../services/wifi-provider.service';
import { Platform } from '@ionic/angular';
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
    private geoProvider: GeolocalizationProviderService,
    private bleProvider: BluetoothProviderService,
    private wifiProvider: WifiProviderService
  ) {
    this.platform.ready().then(() => {
      this.ready = true;
    });
  }

  private ready = false;
  startService: boolean = false;

  family: string;
  room: string;
  device: string;

  wifiSignals: string[] = [];
  bluetoothSignals: string[] = [];
  gpsCoordinates: { lat: number; long: number; alt: number; accuracy: number };
  lastScanTime;

  private async getBluetooth() {
    console.log(`WAITING BLUETOOTH DEVICES .................`);
    const toRet = await this.bleProvider.getBluetoothDevices();
    console.log(`WAITING BLUETOOTH DEVICES ................. DONE`);
    return toRet;
  }
  private async getWifi() {
    console.log(`WAITING BLUETOOTH DEVICES .................`);
    const toRet = await this.wifiProvider.getNetworks();
    console.log(`WAITING BLUETOOTH DEVICES ................. DONE`);
    return toRet;
  }
  private async getGPS() {
    console.log(`WAITING GPS COORDINATES .................`);
    const toRet = await this.geoProvider.getLocation();
    console.log(`WAITING GPS COORDINATES ................. DONE`);
    return toRet;
  }

  async startScan() {
    if (!this.ready) return (this.startService = false);
    while (this.startService) {
      const net = await this.getWifi();
      const ble = await this.getBluetooth();
      const gpsCoordinates = await this.getGPS();

      this.bluetoothSignals = ble.map((val) => `${val.id} - ${val.rssi}`);
      this.wifiSignals = net.map((val) => `${val.BSSID} - ${val.level}`);
      this.gpsCoordinates = gpsCoordinates;
      this.lastScanTime = Date.now();

      await this.waitFor(5_000);
    }
  }

  waitFor = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));
}
