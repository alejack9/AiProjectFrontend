import { Platform } from '@ionic/angular';
import { Hotspot } from '@ionic-native/hotspot/ngx';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private platform: Platform, private hotspot: Hotspot) {
    platform.ready().then(() => {
      this.ready = true;
    });
  }

  private ready = false;
  startService: boolean = false;
  results: string[] = [];
  ok = 0;
  errors = 0;
  empties = 0;
  lastError;

  async startScan() {
    if (!this.ready) return (this.startService = false);
    while (this.startService) {
      const net = await this.hotspot.scanWifi();
      console.log('-------------------------------');
      console.log(net);
      console.log('-------------------------------');
      if (net.length === 0) this.empties++;
      else {
        this.results = net.map((r) => `${r.BSSID} - ${r.level}`);
        this.ok++;
      }
      await this.waitFor(5000);
    }
  }

  waitFor = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
}
