import { TableConfig } from "../interfaces/table";

export const deviceManagementTableConfig: TableConfig = {
  columns: [
    { field: 'serialNo', header: 'Serial No', filter: false },
    { field: 'imei', header: 'Imei', filter: false, },
    { field: 'iccid', header: 'Iccid', filter: false, },
    { field: 'stateName', header: 'State', filter: false, },
    { field: 'backendName', header: 'Backend', filter: false, },
    { field: 'isConfigMatched', header: 'Configuration', filter: false, displayType: 'chip' },
    { field: 'lastUpdated', header: 'Last Updated At', filter: false, displayType:'date' },
  ],
  toolbar: {
    showNew: true,
    // showDelete: true,
    // showImport: true,
    showExport: true,
    customButtons: [
      {
        id: 1,
        key: 'map_with_backend',
        label: 'Map with Backend', // Clear and specific
        tooltip: 'Select a Device', // Provides context
        icon: 'pi pi-list-check',
        isSelectionDependent: true,
        severity: 'contrast'
      }
    ]
  },
  actions: {
    showEdit: false,
    customButtons: [
      {
        id:1,
        key:'show_config',
        icon: "pi pi-cog", // Example icon class
        severity: "info",
        tooltip:'Update Config'
      }
    ]
  },
  paginator: true,
  globalFilter: true,
  selectionMode: 'multiple',
  minWidth: '50rem',
  showCurrentPageReport: true,
  rowHover: true,
};


export const stateManagementTableConfig: TableConfig = {
  columns: [
    // { field: 'id', header: 'State Id', filter: false },
    { field: 'name', header: 'Name', filter: false, },
  ],
  toolbar: {
    showNew: true,
    // showDelete: true,
    // showImport: true,
    showExport: true
  },
  actions: {
    showEdit: true,
  },
  paginator: true,
  globalFilter: true,
  selectionMode: 'single',
  minWidth: '50rem',
  showCurrentPageReport: true,
  rowHover: true,
};


export const backendManagementTableConfig: TableConfig = {
  columns: [
    // { field: 'id', header: 'Backend Id', filter: false },
    // { field: 'stateId', header: 'State Id', filter: false, },
    { field: 'name', header: 'Backend Name', filter: false, },
  ],
  toolbar: {
    showNew: true,
    // showDelete: true,
    // showImport: true,
    showExport: true
  },
  actions: {
    showEdit: true,
  },
  paginator: true,
  globalFilter: true,
  selectionMode: 'single',
  minWidth: '50rem',
  showCurrentPageReport: true,
  rowHover: false,
  expandable:true,
  expandableColumns:[
    // { field: 'id', header: 'Command Id', filter: false },
    { field: 'commandKey', header: 'Command Key', filter: false, },
    { field: 'commandText', header: 'Command Text', filter: false, },
  ],
  showExpandableActions:true,
  expandableRowHover:true,
  expandableActions:{
    showEdit:true
  }
};

export const commandKeyManagementTableConfig: TableConfig = {
  columns: [
    // { field: 'id', header: 'Command Key Id', filter: false },
    { field: 'name', header: 'Command Key Name', filter: false, },
  ],
  toolbar: {
    showNew: true,
    // showDelete: true,
    // showImport: true,
    showExport: true
  },
  actions: {
    showEdit: true,
  },
  paginator: true,
  globalFilter: true,
  selectionMode: 'single',
  minWidth: '50rem',
  showCurrentPageReport: true,
  rowHover: true,
};