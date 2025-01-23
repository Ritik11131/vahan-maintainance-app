import { CommandKeyService } from '@/app/core/services/command-key.service';
import { GenericTableComponent } from '@/app/shared/components/generic-table/generic-table.component';
import { commandKeyManagementTableConfig, stateManagementTableConfig } from '@/app/shared/config/table-config';
import { commandKeyCreateEditSettings, stateCreateEditSettings } from '@/app/shared/constants';
import { IResponseInterface } from '@/app/shared/interfaces/auth';
import { CommandKeyData, StateData } from '@/app/shared/interfaces/getData';
import { createState } from '@/app/shared/interfaces/postData';
import { TableConfig } from '@/app/shared/interfaces/table';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-command-key',
  imports: [GenericTableComponent, DrawerModule, ButtonModule, FormsModule, TagModule,InputTextModule,SelectButtonModule],
  templateUrl: './command-key.component.html',
  styleUrl: './command-key.component.css'
})
export class CommandKeyComponent {

  loading: boolean = false;
  tableConfig: TableConfig = commandKeyManagementTableConfig;
  tableData: CommandKeyData[] = [];
  drawerVisible: boolean = false;
  stateCreateEditSettings: any[] = commandKeyCreateEditSettings;
  commandKey!: CommandKeyData

  constructor(private commandKeyService:CommandKeyService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadStateService();
  }


  async loadStateService() {
    await this.fetchAllCommandKeys();
  }

  async fetchAllCommandKeys() {
      this.loading = true;
      try {
        const response: IResponseInterface = await this.commandKeyService.fetchCommandKeyList();
        this.tableData = response?.data;
        this.loading = false;
      } catch (error) {
        this.tableData = []
        this.loading = false;
      }
  }

  async handleCreateCommandKey() {
    try {
      const response: IResponseInterface = this.commandKey.id ? await this.commandKeyService.updateCommandKey(this.commandKey) :  await this.commandKeyService.createCommandKey(this.commandKey);
      console.log(response);
      this.drawerVisible = false;
      await this.fetchAllCommandKeys();
    } catch (error) {

    }
  }


  handleOnNew(event: boolean) {
    this.drawerVisible = true;
    this.commandKey = {} as createState;
    console.log(this.commandKey);
  }


  async onConfigActionClicked(event: any) {
    this.drawerVisible = true;
    switch (event.action) {
      case 'edit':
        this.commandKey = { ...event?.item }
        break;
      // Add more cases as needed
    }
  }

}
