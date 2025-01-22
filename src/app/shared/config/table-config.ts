import { TableConfig } from "../interfaces/table";

export const deviceManagementTableConfig: TableConfig = {
  columns: [
    { field: 'serialNo', header: 'Serial No', filter: false },
    { field: 'imei', header: 'Imei', filter: false, },
    { field: 'iccid', header: 'Iccid', filter: false, },
    { field: 'isConfigMatched', header: 'Configuration', filter: false, displayType: 'chip' },
    { field: 'lastUpdated', header: 'Last Updated At', filter: false, displayType:'date' },
  ],
  toolbar: {
    showNew: true,
    // showDelete: true,
    // showImport: true,
    showExport: true
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
  selectionMode: 'single',
  minWidth: '50rem',
  showCurrentPageReport: true,
  rowHover: true,
};


export const stateManagementTableConfig: TableConfig = {
  columns: [
    { field: 'id', header: 'State Id', filter: false },
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
    { field: 'id', header: 'Backend Id', filter: false },
    { field: 'stateId', header: 'State Id', filter: false, },
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
  rowHover: true,
};