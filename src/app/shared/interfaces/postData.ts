export interface createState {
    name:string;
}


export interface createBackend {
    stateId:number;
    name:string;
}

export interface createCommandKey {
    name:string;
}

export interface createDevice {
    [key: string]: any;
    serialNo:string;
    imei:string;
    iccid:string;
    name:string;
}