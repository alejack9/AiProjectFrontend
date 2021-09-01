import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BluetoothProviderService {
  constructor(private ble: BLE) {}

  async getBluetoothDevices(): Promise<Map<string, number>> {
    return new Promise((resolve) => {
      let res = new Map<string, number>();
      this.ble.scan([], 5).subscribe({
        next: (device) => {
          res.set(device.id, device.rssi);
        },
        complete: () => {
          resolve(res);
        },
      });
      setTimeout(() => {
        resolve(res);
      }, 6000);
    });
  }
}
