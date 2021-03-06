import { DataDTO } from './../../models/data-dto';
import { GpsCoordinates } from './../../models/gps-coordinates';
import { InformationSenderService } from './../services/information-sender.service';
import { WifiProviderService } from './../services/wifi-provider.service';
import { AlertController, Platform } from '@ionic/angular';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
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
    private wifiProvider: WifiProviderService,
    private informationSender: InformationSenderService,
    private vibration: Vibration,
    public alertController: AlertController
  ) {
    this.platform.ready().then(() => {
      this.ready = true;
      this.viewReady = true;
    });
  }

  private ready = false;
  private viewReady = false;
  startService: boolean = false;
  startServiceToggleDisabled = false;
  stopServiceIfEmptyResponses = true;

  url = '';
  family = '';
  room = '';
  device = '';

  isStartServiceToggleDisabled = () =>
    this.url === '' ||
    this.device === '' ||
    this.family === '' ||
    this.room === '' ||
    this.startServiceToggleDisabled;

  wifiSignals: string[] = [];
  bluetoothSignals: string[] = [];
  gpsCoordinates: GpsCoordinates;
  lastScanTime;
  lastSuccessfullScanTime;

  error: string;

  ionViewDidLoad() {
    this.viewReady = true;
  }

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
    if (!this.ready || !this.viewReady) return (this.startService = false);
    let empyWifis = 0;
    while (this.startService) {
      this.startServiceToggleDisabled = true;
      this.error = undefined;
      try {
        const net = await this.getWifi();
        if (net.length === 0) empyWifis++;
        const ble = await this.getBluetooth();
        const gpsCoordinates = await this.getGPS();
        this.lastScanTime = Date.now();

        if (
          (this.stopServiceIfEmptyResponses &&
            net.length === 0 &&
            ble.length === 0) ||
          empyWifis >= 3
        ) {
          await (
            await this.alertController.create({
              header: 'Restart wifi and bluetooth',
              message: 'Restart wifi and bluetooth now.',
              buttons: ['OK'],
            })
          ).present();
          this.vibration.vibrate([500, 500, 500, 500, 500]);
          this.startService = false;
        } else {
          const obj: DataDTO = this.makeDto(ble, net, gpsCoordinates);

          await this.informationSender.send(obj, this.url);

          this.bluetoothSignals = Array.from(ble).map(
            (val) => `${val[0]} - ${val[1]}`
          );
          this.wifiSignals = Array.from(net).map(
            (val) => `${val[0]} - ${val[1]}`
          );
          this.gpsCoordinates = gpsCoordinates;
          this.lastSuccessfullScanTime = this.lastScanTime;
        }
      } catch (e) {
        this.wifiSignals = ['ERROR'];
        this.bluetoothSignals = ['ERROR'];
        this.gpsCoordinates = {};
        console.log(JSON.stringify(e));
        this.error = JSON.stringify(e);
      } finally {
        this.startServiceToggleDisabled = false;
        await this.waitFor(5_000);
      }
    }
  }

  private makeDto = (
    ble: [string, number][],
    net: [string, number][],
    gpsCoordinates: GpsCoordinates
  ): DataDTO => {
    return {
      d: this.device,
      f: this.family,
      l: this.room,
      t: this.lastScanTime,
      s: {
        bluetooth: ble,
        wifi: net,
      },
      gps: gpsCoordinates,
    };
  };

  waitFor = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));
}
