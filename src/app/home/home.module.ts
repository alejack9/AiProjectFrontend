import { InformationSenderService } from './../services/information-sender.service';
import { HttpClientModule } from '@angular/common/http';
import { Hotspot } from '@ionic-native/hotspot/ngx';
import { GeolocalizationProviderService } from './../services/geolocalization-provider.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { BluetoothProviderService } from './../services/bluetooth-provider.service';
import { BLE } from '@ionic-native/ble/ngx';

import { WifiProviderService } from './../services/wifi-provider.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
  ],
  declarations: [HomePage],
  providers: [
    WifiProviderService,
    BluetoothProviderService,
    Geolocation,
    BLE,
    GeolocalizationProviderService,
    InformationSenderService,
    Hotspot,
  ],
})
export class HomePageModule {}
