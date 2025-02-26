import { BackendService } from '@/app/core/services/backend.service';
import { DeviceMaintenanceService } from '@/app/core/services/device-maintenance.service';
import { StateService } from '@/app/core/services/state.service';
import { IResponseInterface } from '@/app/shared/interfaces/auth';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-device-configurations',
  imports: [ButtonModule, FormsModule, CommonModule, SelectModule, MultiSelectModule],
  templateUrl: './device-configurations.component.html',
  styleUrl: './device-configurations.component.css'
})
export class DeviceConfigurationsComponent implements OnInit {

  sections: any = [
    {
      title: 'Device & Backend Mapping',
      valid: false,
      fields: [
        {
          key: 'state',
          label: 'Select State',
          type: 'select',
          options: [],
          selectedValue: null,
          placeholder: 'Choose a state',
        },
        {
          key: 'backend',
          label: 'Select Backend',
          type: 'select',
          options: [],
          selectedValue: null,
          placeholder: 'Choose a backend',
        },
        {
          key: 'device',
          label: 'Select Devices',
          type: 'multiselect',
          options: [],
          selectedValue: null,
          placeholder: 'Choose a device',
        },

      ]
    },
  ];
  stateOptions:any[] = [];



  constructor(private backendService: BackendService, private deviceService: DeviceMaintenanceService, private stateService: StateService) { }

  ngOnInit(): void {
    this.loadDeviceBackendMapping();

  }


  updateSectionValidity(section: any) {
    section.valid = section.fields.every((field: any) => this.isFieldFilled(field));
  }

  isFieldFilled(field: any): boolean {
    if (field.type === 'multiselect' || field.type === 'select') {
      return Array.isArray(field.selectedValue) && field.selectedValue.length > 0;
    }
    return field.value && field.value.toString().trim().length > 0;
  }

  async loadDeviceBackendMapping(): Promise<void> {
    await this.fetchAllStates();
  }

  async fetchAllStates() {
    try {
      const response: IResponseInterface = await this.stateService.fetchStatesList();
      this.stateOptions = response?.data;

    } catch (error) {
      this.stateOptions = [];
    } finally {
    }
  }


  

}
