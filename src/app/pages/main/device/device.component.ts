import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GenericTableComponent } from '@/app/shared/components/generic-table/generic-table.component';
import { TableConfig } from '@/app/shared/interfaces/table';
import { deviceManagementTableConfig } from '@/app/shared/config/table-config';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { IResponseInterface } from '@/app/shared/interfaces/auth';
import { DeviceMaintenanceService } from '@/app/core/services/device-maintenance.service';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { deviceEditableSettings, deviceSettings } from '@/app/shared/constants';
import { DeviceData } from '@/app/shared/interfaces/getData';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-device',
  imports: [ButtonModule, GenericTableComponent,OverlayBadgeModule,FormsModule,DrawerModule,SelectButtonModule,TooltipModule,AvatarModule,TagModule ],
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent {
  loading:boolean = false;
  tableConfig: TableConfig = deviceManagementTableConfig;
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
  currentConfigStatus: any = { severity : '', value:''}




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
      
      // Destructure the response data
      const { latitude, longitude, isConfigMatched, attributes } = response?.data || {};
      
      // Update Google Map coordinates
      this.googleMapBtnObj.lat = latitude;
      this.googleMapBtnObj.lng = longitude;
  
      // Update current config status
      this.currentConfigStatus.severity = isConfigMatched ? 'success' : 'danger';
      this.currentConfigStatus.value = isConfigMatched === null ? 'Not Configured' : isConfigMatched ? 'Matched' : 'Not Matched';
  
      // Parse attributes once
      const parsedAttributes = JSON.parse(attributes);
      console.log(parsedAttributes, 'ress');
  
      // Update the values in deviceSettings based on the parsed attributes
      this.deviceSettings.forEach(setting => {
        if (parsedAttributes.hasOwnProperty(setting.key)) {
          setting.value = parsedAttributes[setting.key];
        }
      });
  
      console.log(this.deviceSettings);
      
    } catch (error) {
      console.error('Error fetching device configuration:', error);
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
