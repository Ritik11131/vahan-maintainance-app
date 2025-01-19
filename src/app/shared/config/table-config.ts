import { TableConfig } from "../interfaces/table";

export const overviewTableConfig: TableConfig = {
    columns: [
      { field: 'serialNo', header: 'Serial No',filter:true },
      { field: 'imei', header: 'Imei',filter:true, },
      { field: 'iccid', header: 'Iccid',filter:true, },
      { field: 'simvendor', header: 'Sim Venodor',filter:true },
      { field: 'latitude', header: 'Latitude', },
      { field: 'longitude', header: 'Longitude' },
      {
        field: 'pingTime',
        header: 'Ping Time',
        displayType:'date'
      },


    ],
    // toolbar: {
    //   showNew: true,
    //   showDelete: true,
    //   showImport: true,
    //   showExport: true
    // },
    paginator: true,
    globalFilter: true,
    selectionMode: 'single',
    minWidth:'55rem',
    showCurrentPageReport: true,
    rowHover: true,
  };