import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WifiProviderService {
  constructor(private wifiWizard2: WifiWizard2) {}

  async getNetworks(): Promise<{ BSSID: string; level: number }[]> {
    try {
      return await this.wifiWizard2.scan();
    } catch (error) {
      console.error(error);
    }
  }
}
