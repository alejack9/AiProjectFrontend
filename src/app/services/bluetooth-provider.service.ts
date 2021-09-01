import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BluetoothProviderService {
  constructor(private ble: BLE) {}

  async getBluetoothDevices(): Promise<{ id: string; rssi: number }[]> {
    return new Promise((resolve) => {
      let res = [];
      this.ble.scan([], 5).subscribe({
        next: (device) => {
          res.push({ id: device.id, rssi: device.rssi });
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
