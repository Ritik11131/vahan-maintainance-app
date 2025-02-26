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
import { deviceCreateEditSettings, deviceEditableSettings, deviceSettings } from '@/app/shared/constants';
import { DeviceData } from '@/app/shared/interfaces/getData';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { createDevice } from '@/app/shared/interfaces/postData';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-device',
  imports: [ButtonModule, GenericTableComponent,OverlayBadgeModule,FormsModule,DrawerModule,SelectButtonModule,TooltipModule,AvatarModule,TagModule,InputTextModule ],
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent {
  loading:boolean = false;
  device!: createDevice;
  tableConfig: TableConfig = deviceManagementTableConfig;
  drawerVisible: boolean = false;
  deviceSettings: any[] = deviceSettings;
  deviceEditableSettings :any[] = deviceEditableSettings;
  deviceCreateEditSettings: any[] = deviceCreateEditSettings;
  tableData: DeviceData[] = [];
  selectedFilterConfig:string = 'All';
  configurationOptions: string[] = ['All','Matched', 'Not Matched', 'Not Configured'];
  googleMapBtnObj: { lat: number | null, lng: number | null } = {
    lat: null,
    lng: null
  }
  activeOnes:string = '';
  currentConfigStatus: any = { severity : '', value:''};
  currentState:string = '';



  constructor(private deviceMaintenanceService: DeviceMaintenanceService) {}


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
    const { lat, lng } = this.googleMapBtnObj;
    const url = `https://www.google.com/maps?q=${lat},${lng}&ll=${lat},${lng}&z=17`; // Places a marker at (lat, lng)
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
      const { latitude, longitude, isConfigMatched, attributes, protocol, firmware } = response?.data || {};
      
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
        if (setting.key === 'version') {
          setting.value = protocol;
        } else if (setting.key === 'firmware') {
          setting.value = firmware;
        } else if (parsedAttributes.hasOwnProperty(setting.key)) {
          setting.value = parsedAttributes[setting.key];
        }
      });
  
      console.log(this.deviceSettings);
      
    } catch (error) {
      console.error('Error fetching device configuration:', error);
    }
  }


  async operateDeviceConfidurationByID(id: number) {
    try {
      const response: IResponseInterface = await this.deviceMaintenanceService.getDeviceConfigurationById(id);
      
      const parsedAttributes = JSON.parse(response?.data?.attributes);      
      deviceEditableSettings.forEach(setting => {
        if (parsedAttributes.hasOwnProperty(setting.key)) {
          setting.value = parsedAttributes[setting.key];
        }
      });
    } catch (error) {

    }
  }




  async onConfigActionClicked(event:any) {
    this.drawerVisible = true;
    this.currentState = event.action;
    switch (event.action) {
      case 'show_config':
        console.log(event.item);
        await this.getDeviceFullConfigByPingId(event.item.pingId);
        await this.operateDeviceConfidurationByID(event.item.id);
        // Logic for showing config
        break;
      // Add more cases as needed
    }
  }

   handleOnNew(event: boolean) {
      this.currentState = 'add_device';
      this.drawerVisible = true;
      this.device = {} as createDevice;
      console.log(this.device);
    }


    async handleCreateDevice() {
      try {
        const response: IResponseInterface = await this.deviceMaintenanceService.createDevice({...this.device});  
        console.log(response);
        this.drawerVisible = false;
        await this.loadMaintenanceService();
      } catch (error) {
        
      }
    }

}
