// Interface for the individual data item
export interface DeviceData {
    id: number;
    serialNo: string;
    imei: string;
    iccid: string;
    name: string;
    addedBy: number;
    isConfigMatched: boolean | null; // Assuming it can be true, false, or null
    lastUpdated: string | null; // Assuming it can be a date string or null
    pingId: number;
}
