import { WifiProviderService } from './../services/wifi-provider.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private wifiProvider: WifiProviderService) {}

  startService: boolean = false;
  results: string[] = [];
  private interval;
  ok = 0;

  async startScan() {
    if (this.startService) {
      await this.wifiProvider.getNetworks();
      this.interval = setInterval(async () => {
        const networks = await this.wifiProvider.getNetworks();
        this.ok++;
        // console.log(networks);
        this.results = networks.map((r) => `${r.BSSID} -> ${r.level}`);
      }, 2100);
    } else clearInterval(this.interval);
  }
}
