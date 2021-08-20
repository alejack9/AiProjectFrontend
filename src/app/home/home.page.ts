import { Component } from '@angular/core';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private wifiWizard2: WifiWizard2) {}
  results = [];
  async getNetworks() {
    try {
      let results = await this.wifiWizard2.scan();
      this.results = results.map((r) => `${r.BSSID} -> ${r.level}`);
    } catch (error) {
      console.error(error);
    }
  }
}
