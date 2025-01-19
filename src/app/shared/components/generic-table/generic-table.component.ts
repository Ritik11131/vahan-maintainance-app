import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { Table } from 'primeng/table';
import { TableConfig } from '@/app/shared/interfaces/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';


@Component({
  selector: 'app-generic-table',
  imports: [   CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    TagModule,
    RatingModule,
    AvatarModule,
    IconFieldModule,
    InputIconModule,
    ChipModule],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent {

  @Input() data: any[] = [];
  @Input() config!: TableConfig;
  @Input() globalFilterFields!: any[]
  @Input() title: string = '';
  @Input() showActions: boolean = true;
  @Input() showSummary: boolean = true;
  @Input() activeOnes = '';

  @Output() onNew = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onDeleteSelected = new EventEmitter<any[]>();
  @Output() onImport = new EventEmitter<any>();
  @Output() onExport = new EventEmitter<void>();

  @ViewChild('dt') table!: Table;

  selectedItems: any[] = [];



  onSearch(event: Event, dt: any) {
    const input = event.target as HTMLInputElement;    
    if (input) {
      dt.filterGlobal(input.value, 'contains');
    }
  }
}
