import { BackendService } from '@/app/core/services/backend.service';
import { CommandKeyService } from '@/app/core/services/command-key.service';
import { StateService } from '@/app/core/services/state.service';
import { GenericTableComponent } from '@/app/shared/components/generic-table/generic-table.component';
import { backendManagementTableConfig } from '@/app/shared/config/table-config';
import { backendCreateEditSettings, updateCommandtestSettings } from '@/app/shared/constants';
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
  command!:any;
  stateOptions:any[] = [];
  defaultSelectedState!:any;
  drawerSelectedDrpDwnValue!:any;
  backendCreateEditSettings:any[] = backendCreateEditSettings;
  updateCommandtestSettings:any[] = updateCommandtestSettings;
  currentState:string = '';

  constructor(private stateService:StateService, private backendService:BackendService, private commandService:CommandKeyService ) {}

  ngOnInit(): void {
      this.loadBackendService();
  }

  async loadBackendService() {
    await this.fetchAllStates();
    await this.loadTableDataWithStateID(this.defaultSelectedState.id);
    
  }

  async loadTableDataWithStateID(id: number) {
    try {
      const response: IResponseInterface = await this.backendService.fetchBackendListByStateId(id);

      // Use Promise.all to wait for all promises to resolve
      const backendList = await Promise.all(response?.data?.map(async (backend: any) => {
        const commandResponse = await this.backendService.getBackendCommandList(backend.id);
        backend.nested = commandResponse?.data?.commands; // Assign the commands to the backend object
        return backend; // Return the modified backend object
      }));

      this.tableData = backendList

      console.log(backendList);

      this.loading = false;
    } catch (error) {
      this.loading = false;

    }
  }


  async handleChangeState(event:any) {
    await this.loadTableDataWithStateID(event.value.id);
  }


  async handleCreateBackend() {
    if(this.currentState === 'backend') {
      try {
        const response: IResponseInterface = this.backend.id ? await this.backendService.updateBackend({...this.backend, stateId:this.drawerSelectedDrpDwnValue.id}) :  await this.backendService.createBackend({...this.backend, stateId:this.drawerSelectedDrpDwnValue.id});  
        console.log(response);
        this.drawerVisible = false;
        await this.loadBackendService();
      } catch (error) {
        
      }
    } else if(this.currentState === 'command') {
      try {
        const response: IResponseInterface = await this.commandService.updateCommandText({...this.command})  
        console.log(response);
        this.drawerVisible = false;
        await this.loadBackendService();
      } catch (error) {
        
      }
    }
  }


   async fetchAllStates() {
    this.loading = true;
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
    this.currentState = 'backend';
    this.backend = {} as createBackend;
    console.log(this.backend);
  }


  async onConfigActionClicked(event: any) {
    this.drawerVisible = true;
    switch (event.action) {
      case 'edit':
        this.currentState = 'backend';
        this.backend = { ...event?.item }
        break;
      case 'nested_edit':
        this.currentState = 'command';
        this.command = { ...event?.item }
      // Add more cases as needed
    }
  }

}
