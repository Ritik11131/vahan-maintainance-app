import { IstatusCards } from "../interfaces/dashboard";

export const sidebarNavigations = [
    { icon: 'pi pi-home', title: 'Overview', href: '/main/overview' },
    { icon: 'pi pi-truck', title: 'Device', href: '/main/device' },
    { icon: 'pi pi-building-columns', title: 'State', href: '/main/state' },
    { icon: 'pi pi-database', title: 'Backend', href: '/main/backend' },
    { icon: 'pi pi-key', title: 'Command Key', href: '/main/command-key' },

    // { icon: 'pi pi-th-large', title: 'Dashboard', href: '/main/dashboard' },
];

export const moreSidebarNavigations = [{ icon: 'pi pi-cog', title: 'Settings' }];


export const statusCards: IstatusCards[] = [
        {
            id:1,
            count: 0,
            status: 'Total',
            color: 'text-blue-500',
            avatarUrl: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png'
        },
        {
            id:2,
            count: 0,
            status: 'Idle',
            color: 'text-yellow-500',
            avatarUrl: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png'
        },
        {
            id:3,
            count: 0,
            status: 'Stopped',
            color: 'text-red-500',
            avatarUrl: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png'
        },
        {
            id:4,
            count: 0,
            status: 'Running',
            color: 'text-green-500',
            avatarUrl: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png'
        },
        {
            id:5,
            count: 0,
            status: 'Offline',
            color: 'text-gray-500',
            avatarUrl: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png'
        },
        {
            id:6,
            count: 0,
            status: 'Never Connected',
            color: '',
            avatarUrl: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png'
        }
];


// Array of settings
export const deviceSettings = [
    { name: 'Primary IP', key: 'ip0', value: '', placeholder: 'Update Ip0' },
    { name: 'Last Ping Primary', key: 'ip0Ping', value: 'ojoo', placeholder: 'Update Last Ping Primary' },
    { name: 'Secondary IP', key: 'ip1', value: '', placeholder: 'Update Ip1' },
    { name: 'Last Ping Secondary', key: 'ip1Ping', value: '', placeholder: 'Update Last Ping Secondary' },
    { name: 'Emergency IP', key: 'ip2', value: '', placeholder: 'Update Ip2' },
    { name: 'URL', key: 'url', value: '', placeholder: 'Update URL' },
    { name: 'Ignition On Interval', key: 'ignOn', value: '', placeholder: 'Update Ignition On' },
    { name: 'Ignition Off Interval', key: 'ignOff', value: '', placeholder: 'Update Ignition Off' },
    { name: 'Available History Packets', key: 'hisPackets', value: '', placeholder: 'Update History Packets' },
    { name: 'Success Rate Primary', key: 'ip0Success', value: '', placeholder: 'Update Success Rate Primary' },
    { name: 'Success Rate Secondary', key: 'ip1Success', value: '', placeholder: 'Update Success Rate Secondary' },
    { name: 'Reset Count', key: 'reset', value: '', placeholder: 'Update Reset Count' },
    { name: 'Reserve Index', key: 'resIndex', value: '', placeholder: 'Update Reserve Index' }
];


// Array of settings
export const deviceEditableSettings = [
    { name: 'Primary IP', key: 'ip0', value: '', placeholder: 'Update Ip0' },
    // { name: 'Last Ping Primary', key: 'ip0Ping', value: 'ojoo', placeholder: 'Update Last Ping Primary' },
    { name: 'Secondary IP', key: 'ip1', value: '', placeholder: 'Update Ip1' },
    // { name: 'Last Ping Secondary', key: 'ip1Ping', value: '', placeholder: 'Update Last Ping Secondary' },
    { name: 'Emergency IP', key: 'ip2', value: '', placeholder: 'Update Ip2' },
    { name: 'URL', key: 'url', value: '', placeholder: 'Update URL' },
    { name: 'Ignition On Interval', key: 'ignOn', value: '', placeholder: 'Update Ignition On' },
    { name: 'Ignition Off Interval', key: 'ignOff', value: '', placeholder: 'Update Ignition Off' },
    { name: 'Protocol', key: 'pro', value: '', placeholder: 'Update Protocol' },
    // { name: 'Available History Packets', key: 'hisPackets', value: '', placeholder: 'Update History Packets' },
    // { name: 'Success Rate Primary', key: 'ip0Success', value: '', placeholder: 'Update Success Rate Primary' },
    // { name: 'Success Rate Secondary', key: 'ip1Success', value: '', placeholder: 'Update Success Rate Secondary' },
    // { name: 'Reset Count', key: 'reset', value: '', placeholder: 'Update Reset Count' },
    // { name: 'Reserve Index', key: 'resIndex', value: '', placeholder: 'Update Reserve Index' }
];


export const stateCreateEditSettings = [
    { name: 'State Name', key: 'name', placeholder: 'Enter State Name' },
]

export const backendCreateEditSettings = [
    { name: 'Select State', key: 'stateId',inputType:'dropdown', placeholder: 'Select State' },
    { name: 'Backend Name', key: 'name', placeholder: 'Backend Name' }
]

export const commandKeyCreateEditSettings = [
    { name: 'Command Key Name', key: 'name', placeholder: 'Command Key Name' }
]

export const updateCommandtestSettings = [
    { name: 'Update Key Name', key: 'commandText', placeholder: 'Command Key Name' }
]