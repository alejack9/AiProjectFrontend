import { GeolocalizationProviderService } from './../services/geolocalization-provider.service';
import { BluetoothProviderService } from './../services/bluetooth-provider.service';
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
    GeolocalizationProviderService,
  ],
})
export class HomePageModule {}
