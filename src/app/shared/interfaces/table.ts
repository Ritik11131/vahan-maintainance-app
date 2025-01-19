export interface ColumnConfig {
    field: string;
    header: string;
    filter?: boolean;
    filterType?: 'text' | 'select' | 'date';
    displayType?: 'text' | 'image' | 'chip' | 'avatar' | 'rating' | 'currency' | 'date';
    width?: string;
    styleClass?: string;
    imageConfig?: {
      baseUrl?: string;
      width?: "normal" | "large" | "xlarge" | undefined;
      height?: string;
      alt?: string;
    };
    currencyCode?: string;
  }
  
  export interface ToolbarConfig {
    showNew?: boolean;
    showDelete?: boolean;
    showImport?: boolean;
    showExport?: boolean;
    newLabel?: string;
    deleteLabel?: string;
    importLabel?: string;
    exportLabel?: string;
    customButtons?: {
      label: string;
      icon?: string;
      severity?: "success" | "info" | "warn" | "danger" | "help" | "primary" | "secondary" | "contrast" | null | undefined;
      onClick: () => void;
    }[];
  }
  
  export interface TableConfig {
    columns: ColumnConfig[];
    toolbar?: ToolbarConfig;
    paginator?: boolean;
    minWidth:string;
    rows?: number;
    globalFilter?: boolean;
    selectionMode?: 'single' | 'multiple';
    showCurrentPageReport?: boolean;
    responsive?: boolean;
    styleClass?: string;
    rowHover?: boolean;
    loading?: boolean;
    scrollable?: boolean;
    scrollHeight?: string;
  }