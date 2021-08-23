import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
// import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BluetoothProviderService {
  constructor(private ble: BLE) {}

  id;
  rssi;
  async getBluetoothDevices(): Promise<Subscription> {
    return await this.ble.scan([], 5).subscribe((device) => {
      var obj = JSON.stringify(device);
      const js = JSON.parse(obj);
      this.id = js.id;
      this.rssi = js.rssi;
    });

    setTimeout(
      this.ble.stopScan,
      5000,
      function () {
        console.log('Scan complete');
      },
      function () {
        console.log('stopScan failed');
      }
    );
  }
}
