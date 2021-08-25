import { Injectable } from '@angular/core';
declare var WifiWizard2: any;

@Injectable({
  providedIn: 'root',
})
export class WifiProviderService {
  async getNetworks(): Promise<{ BSSID: string; level: number }[]> {
    return await WifiWizard2.scan();
  }
}
