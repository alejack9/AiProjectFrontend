import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';

@Injectable({
  providedIn: 'root',
})
export class BluetoothProviderService {
  constructor(private ble: BLE) {}

  async getBluetoothDevices(): Promise<[string, number][]> {
    return new Promise((resolve) => {
      let res = [];
      this.ble.scan([], 5).subscribe({
        next: (device) => {
          res.push([device.id, device.rssi]);
        },
        complete: () => {
          resolve(res);
        },
      });
      setTimeout(() => {
        resolve(res);
      }, 5_250);
    });
  }
}
