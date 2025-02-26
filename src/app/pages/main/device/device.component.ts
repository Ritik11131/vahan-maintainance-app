import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GenericTableComponent } from '@/app/shared/components/generic-table/generic-table.component';
import { TableConfig } from '@/app/shared/interfaces/table';
import { deviceManagementTableConfig } from '@/app/shared/config/table-config';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { IResponseInterface } from '@/app/shared/interfaces/auth';
import { DeviceMaintenanceService } from '@/app/core/services/device-maintenance.service';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { deviceBackendMappingSettings, deviceCreateEditSettings, deviceEditableSettings, deviceInfoSettings, deviceSettings } from '@/app/shared/constants';
import { DeviceData } from '@/app/shared/interfaces/getData';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { createDevice } from '@/app/shared/interfaces/postData';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { StateService } from '@/app/core/services/state.service';
import { BackendService } from '@/app/core/services/backend.service';
import { UiService } from '@/app/core/services/ui.service';

@Component({
  selector: 'app-device',
  imports: [ButtonModule, GenericTableComponent,OverlayBadgeModule,FormsModule,DrawerModule,SelectButtonModule,TooltipModule,AvatarModule,TagModule,InputTextModule,SelectModule ],
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent {
  loading:boolean = false;
  device!: createDevice;
  tableConfig: TableConfig = deviceManagementTableConfig;
  drawerVisible: boolean = false;
  deviceSettings: any[] = deviceSettings;
  deviceInfoSettings: any[] = deviceInfoSettings;
  deviceEditableSettings :any[] = deviceEditableSettings;
  deviceCreateEditSettings: any[] = deviceCreateEditSettings;
  deviceBackendMappingSettings: any[] = deviceBackendMappingSettings;
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
  stateOptions:any[] = [];
  backendOptions:any[] = [];
  selectedDevices: any[] = [];


  constructor(private deviceMaintenanceService: DeviceMaintenanceService, private stateService:StateService,
               private backendService:BackendService, private uiService:UiService) {}


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

  async fetchAllStates() {
    this.loading = true;
      try {
        const response: IResponseInterface = await this.stateService.fetchStatesList();
        console.log(response?.data,'states');
        this.stateOptions = response?.data;
      } catch (error) {
        this.stateOptions = [];
      } finally {
        this.loading = false;
      }
  }

  async fetchBackendOptions(stateId: number) {
    this.loading = true;
    try {
      const response: IResponseInterface = await this.backendService.fetchBackendListByStateId(stateId);
     console.log(response?.data,'backend');
      this.backendOptions = response?.data;
    } catch (error) {
      this.backendOptions = [];
    } finally {
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

  async getDeviceFullConfigByPingId(item: any) {
    const { pingId, isConfigMatched } = item;
    try {
      const response: IResponseInterface = await this.deviceMaintenanceService.getPingById(pingId);
      
      // Destructure the response data
      const { latitude, longitude, attributes, protocol, firmware } = response?.data || {};
      
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
        this.deviceInfoSettings = this.deviceInfoSettings.map(f => ({ ...f, value: event.item[f.key] ?? f.value }));
        await this.getDeviceFullConfigByPingId(event.item);
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
        this.uiService.showToast('success', 'Success', 'Device created successfully');
      } catch (error) {
        this.uiService.showToast('error', 'Error', 'Error creating device');
      }
    }

  /**
   * Handles toolbar custom action clicks.
   *
   * @param action - The action object containing the action type.
   */
  async handleToolbarCustomActionClicked(action: { action: any; event?: any }): Promise<void> {
    console.log('Toolbar custom action clicked:', action);

    switch (action.action) {
      case 'map_with_backend':
        await this.handleBackendMapping(action.action);
        break;
      default:
        console.warn('Unknown action:', action.action);
        break;
    }
  }

  async handleBackendMapping(action: string): Promise<void> {
    this.currentState = action;
    this.drawerVisible = true;
    this.device = {} as createDevice;
    await this.fetchAllStates();
  }


  async handleDrawerDrpDownChange(event: any, item: any): Promise<void> {
    if(item.key === 'stateId') {
      await this.fetchBackendOptions(event?.value?.id);
    }
  }

  onSelectionChange(event: any) {
    this.selectedDevices = event;
  }

  async handleBackendMappingSave() {
    const data = {
      devices : this.selectedDevices.map((device: any) => device.id),
      backendId: this.device['backendId']?.id
    }
    
    try {
      const response: IResponseInterface = await this.deviceMaintenanceService.mapDeviceWithBackend(data);  
      this.drawerVisible = false;
      this.selectedDevices = [];
      await this.loadMaintenanceService();
      this.uiService.showToast('success', 'Success', 'Devices mapped with backend successfully');
    } catch (error) {
      this.uiService.showToast('error', 'Error', 'Error mapping devices with backend');

    }
  }

}
