import { Component } from '@angular/core';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private wifiWizard2: WifiWizard2, private geo: Geolocation) {}
  results = [];
  lat;
  lng;
  alt;
  async getNetworks() {
    try {
      let results = await this.wifiWizard2.scan();
      this.results = results.map((r) => `${r.BSSID} -> ${r.level}`);
    } catch (error) {
      console.error(error);
    }
  }

  async getPosition() {
    this.geo
      .getCurrentPosition()
      .then((res) => {
        this.lat = res.coords.latitude;
        this.lng = res.coords.latitude;
        this.alt = res.coords.altitude;
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
