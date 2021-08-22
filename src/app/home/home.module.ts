import { GeolocalizationProviderService } from './../services/geolocalization-provider.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { BluetoothProviderService } from './../services/bluetooth-provider.service';
import { BLE } from '@ionic-native/ble/ngx';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { WifiProviderService } from './../services/wifi-provider.service';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
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
    WifiWizard2,
    WifiProviderService,
    BluetoothProviderService,
    Geolocation,
    BluetoothLE,
    BLE,
    GeolocalizationProviderService,
  ],
})
export class HomePageModule {}
