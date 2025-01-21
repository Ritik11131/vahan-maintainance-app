import { TableConfig } from "../interfaces/table";

export const overviewTableConfig: TableConfig = {
  columns: [
    { field: 'serialNo', header: 'Serial No', filter: false },
    { field: 'imei', header: 'Imei', filter: false, },
    { field: 'iccid', header: 'Iccid', filter: false, },
    { field: 'isConfigMatched', header: 'Configuration', filter: false, displayType: 'chip' },
    { field: 'lastUpdated', header: 'Last Updated At', filter: false, displayType:'date' },



  ],
  // toolbar: {
  //   showNew: true,
  //   showDelete: true,
  //   showImport: true,
  //   showExport: true
  // },
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
  minWidth: '55rem',
  showCurrentPageReport: true,
  rowHover: true,
};