import { Component, effect } from '@angular/core';
import { GenericTableComponent } from '@/app/shared/components/generic-table/generic-table.component';
import { TableConfig } from '@/app/shared/interfaces/table';
import { stateManagementTableConfig } from '@/app/shared/config/table-config';
import { IResponseInterface } from '@/app/shared/interfaces/auth';
import { StateService } from '@/app/core/services/state.service';
import { StateData } from '@/app/shared/interfaces/getData';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { stateCreateEditSettings } from '@/app/shared/constants';
import { createState } from '@/app/shared/interfaces/postData';
import { InputTextModule } from 'primeng/inputtext';
import { UiService } from '@/app/core/services/ui.service';


@Component({
  selector: 'app-state',
  imports: [GenericTableComponent, DrawerModule, ButtonModule, FormsModule, TagModule, InputTextModule],
  templateUrl: './state.component.html',
  styleUrl: './state.component.css'
})
export class StateComponent {

  loading: boolean = false;
  tableConfig: TableConfig = stateManagementTableConfig;
  tableData: StateData[] = [];
  drawerVisible: boolean = false;
  stateCreateEditSettings: any[] = stateCreateEditSettings;
  state!:StateData


  constructor(private stateService: StateService, private uiService:UiService) {
    effect(() => {
      const value = this.uiService.anotherComponentAction();      
      if (value !== null) {
        this.handleOnNew(value);
      }
    });
   }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadStateService();
  }


  async loadStateService() {
    await this.fetchAllStates();
  }


  async fetchAllStates() {
    this.loading = true;
    try {
      const response: IResponseInterface = await this.stateService.fetchStatesList();
      this.tableData = response?.data;
      this.loading = false;
    } catch (error) {
      this.tableData = []
      this.loading = false;
    }
  }

  async handleCreateState() {
    try {
      const response: IResponseInterface = this.state.id ? await this.stateService.updateState(this.state) :  await this.stateService.createState(this.state);
      console.log(response);
      this.drawerVisible = false;
      await this.fetchAllStates();
    } catch (error) {

    }
  }

  handleOnNew(event:boolean) {
    this.drawerVisible = true;
    this.state = {} as createState;
    console.log(this.state);
  }


  async onConfigActionClicked(event: any) {
    this.drawerVisible = true;
    switch (event.action) {
      case 'edit':
       this.state = {...event?.item}
        break;
      // Add more cases as needed
    }
  }

}
