import { Hotspot } from '@ionic-native/hotspot/ngx';
import { GeolocalizationProviderService } from './../services/geolocalization-provider.service';
import { BluetoothProviderService } from './../services/bluetooth-provider.service';
import { WifiProviderService } from './../services/wifi-provider.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [HomePage],
  providers: [
    WifiProviderService,
    BluetoothProviderService,
    GeolocalizationProviderService,
    Hotspot,
  ],
})
export class HomePageModule {}
