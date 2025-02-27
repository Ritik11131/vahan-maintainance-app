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
import { UiService } from '@/app/core/services/ui.service';

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
  defaultSelectedState: any = null;
  drawerSelectedDrpDwnValue!:any;
  backendCreateEditSettings:any[] = backendCreateEditSettings;
  updateCommandtestSettings:any[] = updateCommandtestSettings;
  currentState:string = '';

  constructor(private stateService:StateService, private backendService:BackendService, private commandService:CommandKeyService, private uiService:UiService, ) {}

  ngOnInit(): void {
      this.loadBackendService();
  }

  async loadBackendService() {
    await this.fetchAllStates();
    await this.loadTableDataWithStateID(this.defaultSelectedState.id);
    
  }

  openStateDrawer() {
    this.uiService.setSelectedSampleAppsSidebarNav('State', '/main/state');
    this.uiService.triggerComponentAction(true, {key:'back_to_state',  json: null});
  }

  async loadTableDataWithStateID(id: number) {
    this.loading = true;
    try {
      const response: IResponseInterface = await this.backendService.fetchBackendListByStateId(id);
      const backendData = response?.data || [];
  
      // Use Promise.allSettled to ensure partial failures don't break the function
      const backendList = await Promise.allSettled(
        backendData.map(async (backend: any) => {
          try {
            const commandResponse = await this.backendService.getBackendCommandList(backend.id);
            const commands = commandResponse?.data?.commands || [];
            
            return {
              ...backend,
              nested: commands.map((command: any) => ({
                ...command,
                commandKey: command.key?.commandKey || ''
              }))
            };
          } catch (error) {
            console.error(`Failed to fetch commands for backend ID ${backend.id}:`, error);
            return { ...backend, nested: [] }; // Return backend with empty nested commands on failure
          }
        })
      );
  
      // Extract only fulfilled results
      this.tableData = backendList
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<any>).value);
  
      console.log(this.tableData);
    } catch (error) {
      console.error('Error fetching backend list:', error);
    } finally {
      this.loading = false;
    }
  }
  


  async handleChangeState(event:any) {
    this.drawerSelectedDrpDwnValue = event?.value;
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
        const {isActive, value} = this.uiService.anotherComponentAction();
        const response: IResponseInterface = await this.stateService.fetchStatesList();
        this.stateOptions = response?.data;
        if(!this.defaultSelectedState) {
          this.defaultSelectedState = this.drawerSelectedDrpDwnValue = response?.data[0];
        }

        if(!isActive && value && value?.key === 'back_to_state' && value?.json) {
          this.defaultSelectedState = this.drawerSelectedDrpDwnValue = value?.json;
          this.uiService.triggerComponentAction(false, {key:null,  json: null});
        }
        console.log(this.defaultSelectedState);
      } catch (error) {
        this.stateOptions = [];
      } finally {
        this.loading = false;
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
