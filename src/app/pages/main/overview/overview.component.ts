import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GenericTableComponent } from "../../../shared/components/generic-table/generic-table.component";
import { TableConfig } from '@/app/shared/interfaces/table';
import { overviewTableConfig } from '@/app/shared/config/table-config';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-overview',
  imports: [ButtonModule, GenericTableComponent,OverlayBadgeModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {

  tableConfig: TableConfig = overviewTableConfig;


}
