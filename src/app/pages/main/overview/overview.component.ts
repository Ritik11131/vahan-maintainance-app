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
import { deviceEditableSettings, deviceSettings } from '@/app/shared/constants';
import { DeviceData } from '@/app/shared/interfaces/getData';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-overview',
  imports: [ButtonModule, GenericTableComponent,OverlayBadgeModule,FormsModule,DrawerModule,SelectButtonModule,TooltipModule ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {

  loading:boolean = false;
  tableConfig: TableConfig = overviewTableConfig;
  drawerVisible: boolean = false;
  deviceSettings: any[] = deviceSettings;
  deviceEditableSettings :any[] = deviceEditableSettings;
  tableData: DeviceData[] = [];
  selectedFilterConfig:string = 'All';
  configurationOptions: string[] = ['All','Matched', 'Not Matched', 'Not Configured'];
  googleMapBtnObj: { lat: number | null, lng: number | null } = {
    lat: null,
    lng: null
  }
  activeOnes:string = '';




  constructor(private deviceMaintenanceService:DeviceMaintenanceService) {}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadMaintenanceService();
  }


  async loadMaintenanceService() {    
    await this.fetchAllDevices();
  }


  async fetchAllDevices() {
    this.loading = true;
    try {
      const response: IResponseInterface = await this.deviceMaintenanceService.fetchDevicesList();
      this.tableData = response?.data;
      this.activeOnes = `${this.tableData.reduce((count, obj) => count + (obj.isConfigMatched ? 1 : 0), 0)} Matched Configuration`;
      this.loading = false;
    } catch (error) {
      this.tableData = []
      this.loading = false;

    }
  }

  async fetchDevicesWithFilter(filter:string) {
    this.loading = true;
    try {
      const response: IResponseInterface = await this.deviceMaintenanceService.fetchFilteredDevicesList(filter === 'Matched' ? 'true' : filter === 'Not Matched' ? 'false' : null);
      this.tableData = response?.data;
      this.loading = false;
    } catch (error) {
      this.tableData = [];
      this.loading = false;
    }
  }

  saveDeviceConfig() {
    const convertedSettings: any = deviceSettings.reduce((acc, { key, value }) => {
      acc[key] = value || null;
      return acc;
    }, {} as any);

    console.log(convertedSettings);
  }

  openGoogleMap() {
    const url = `https://www.google.com/maps/@${this.googleMapBtnObj.lat},${this.googleMapBtnObj.lng},17z`; // 15z is the zoom level
    window.open(url, '_blank');
  }


  async changeSelect() {
    if(this.selectedFilterConfig  === 'All') {
      await this.fetchAllDevices()
    } else {
      await this.fetchDevicesWithFilter(this.selectedFilterConfig);
    }
  }

  async getDeviceFullConfigByPingId(id: number) {
    try {
      const response: IResponseInterface = await this.deviceMaintenanceService.getPingById(id);
      this.googleMapBtnObj.lat = response?.data?.latitude
      this.googleMapBtnObj.lng = response?.data?.longitude
      console.log(JSON.parse(response.data.attributes), 'ress');
      // Update the values in deviceSettings based on the response
      this.deviceSettings.forEach(setting => {
        if (JSON.parse(response.data.attributes).hasOwnProperty(setting.key)) {
          setting.value = JSON.parse(response.data.attributes)[setting.key];
        }
      });
      console.log(this.deviceSettings);
      
    } catch (error) {
    }
  }




  async onConfigActionClicked(event:any) {
    this.drawerVisible = true;
    switch (event.action) {
      case 'show_config':
        console.log(event.item);
        await this.getDeviceFullConfigByPingId(event.item.pingId);
        // Logic for showing config
        break;
      // Add more cases as needed
    }
  }


}
