import { BackendService } from '@/app/core/services/backend.service';
import { StateService } from '@/app/core/services/state.service';
import { GenericTableComponent } from '@/app/shared/components/generic-table/generic-table.component';
import { backendManagementTableConfig } from '@/app/shared/config/table-config';
import { backendCreateEditSettings } from '@/app/shared/constants';
import { IResponseInterface } from '@/app/shared/interfaces/auth';
import { BackendData } from '@/app/shared/interfaces/getData';
import { createBackend } from '@/app/shared/interfaces/postData';
import { TableConfig } from '@/app/shared/interfaces/table';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-backend',
  imports: [GenericTableComponent, DrawerModule, ButtonModule, FormsModule, TagModule, SelectModule,InputTextModule],
  templateUrl: './backend.component.html',
  styleUrl: './backend.component.css'
})
export class BackendComponent implements OnInit {

  loading: boolean = false;
  tableConfig: TableConfig = backendManagementTableConfig;
  tableData: BackendData[] = [];
  drawerVisible: boolean = false;
  backend!: BackendData;
  stateOptions:any[] = [];
  defaultSelectedState!:any;
  drawerSelectedDrpDwnValue!:any;
  backendCreateEditSettings:any[] = backendCreateEditSettings

  constructor(private stateService:StateService, private backendService:BackendService ) {}

  ngOnInit(): void {
      this.loadBackendService();
  }

  async loadBackendService() {
    await this.fetchAllStates();
    await this.loadTableDataWithStateID(this.defaultSelectedState.id);
    
  }

  async loadTableDataWithStateID(id:number) {
    this.loading = true;
    try {
      const response: IResponseInterface = await this.backendService.fetchBackendListByStateId(id);
      this.tableData = response?.data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      
    }
  }


  async handleChangeState(event:any) {
    await this.loadTableDataWithStateID(event.value.id);
  }


  async handleCreateBackend() {
    
    try {
      const response: IResponseInterface = this.backend.id ? await this.backendService.updateBackend({...this.backend, stateId:this.drawerSelectedDrpDwnValue.id}) :  await this.backendService.createBackend({...this.backend, stateId:this.drawerSelectedDrpDwnValue.id});  
      console.log(response);
      this.drawerVisible = false;
      await this.loadBackendService();
    } catch (error) {

    }
  }


   async fetchAllStates() {
      try {
        const response: IResponseInterface = await this.stateService.fetchStatesList();
        this.stateOptions = response?.data;
        this.defaultSelectedState = this.drawerSelectedDrpDwnValue = response?.data[0];
        console.log(this.defaultSelectedState);
      } catch (error) {
        this.stateOptions = [];
      }
    }



  handleOnNew(event: boolean) {
    this.drawerVisible = true;
    this.backend = {} as createBackend;
    console.log(this.backend);
  }


  async onConfigActionClicked(event: any) {
    this.drawerVisible = true;
    switch (event.action) {
      case 'edit':
        this.backend = { ...event?.item }
        break;
      // Add more cases as needed
    }
  }

}
