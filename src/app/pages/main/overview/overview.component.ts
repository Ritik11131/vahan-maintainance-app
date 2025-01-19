import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GenericTableComponent } from "../../../shared/components/generic-table/generic-table.component";
import { TableConfig } from '@/app/shared/interfaces/table';
import { overviewTableConfig } from '@/app/shared/config/table-config';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { IResponseInterface } from '@/app/shared/interfaces/auth';
import { DeviceMaintenanceService } from '@/app/core/services/device-maintenance.service';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { deviceSettings } from '@/app/shared/constants';

@Component({
  selector: 'app-overview',
  imports: [ButtonModule, GenericTableComponent,OverlayBadgeModule,FormsModule,DrawerModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {

  tableConfig: TableConfig = overviewTableConfig;
  drawerVisible: boolean = true;
  deviceSettings: any[] = deviceSettings


  constructor(private deviceMaintenanceService:DeviceMaintenanceService) {}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadMaintenanceService();
  }


  async loadMaintenanceService() {    
      try {
        const response: IResponseInterface = await this.deviceMaintenanceService.fetchDevicesList();
        console.log(response);
      } catch (error) {
  
      }
  }

  saveDeviceConfig() {
    const convertedSettings: any = deviceSettings.reduce((acc, { key, value }) => {
      acc[key] = value || null;
      return acc;
    }, {} as any);

    console.log(convertedSettings);
    


  }


}
