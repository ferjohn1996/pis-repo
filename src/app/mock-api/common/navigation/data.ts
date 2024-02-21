/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'admin',
        title   : 'Admin',
        // subtitle: 'Unique dashboard designs',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'user-add',
                title: 'Users',
                type : 'basic',
                icon : 'supervised_user_circle',
                link : '/admins/accounts/lists'
            }
        ]
    },
    {
        id      : 'dashboard',
        title   : 'Dashboard',
        // subtitle: 'Unique dashboard designs',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'Empty',
                title: 'Sample Dashboard',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/dashboards/pis'
            }
        ]
    },
    {
        id      : 'user',
        title   : 'User',
        // subtitle: 'Unique dashboard designs',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'user-requests',
                title: 'Request',
                type : 'collapsable',
                icon : 'edit',
                children: [
                    {
                        id   : 'planning',
                        title: 'Planning',
                        type : 'basic',
                        link : '/user/request/plannning'
                    },
                    {
                        id   : 'batching',
                        title: 'Batching',
                        type : 'basic',
                        link : '/user/request/batching'
                    },
                    {
                        id   : 'pellit',
                        title: 'Pellit Mill',
                        type : 'basic',
                        link : '/user/request/pelliting'
                    },
                    {
                        id   : 'packing',
                        title: 'Packing',
                        type : 'basic',
                        link : '/user/request/packing'
                    }
                ]
            }
        ]
    },
    {
        id      : 'settings',
        title   : 'Settings',
        subtitle: 'Master Data Informations',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'master-data',
                title: 'Data',
                type : 'collapsable',
                icon : 'settings',
                children: [
                    {
                        id   : 'product-info',
                        title: 'Product Lists',
                        type : 'basic',
                        link : '/settings/master-data/products'
                    },
                    {
                        id   : 'downtime-guide',
                        title: 'Downtime Guides',
                        type : 'basic',
                        link : '/settings/master-data/downtime'
                    },
                    // {
                    //     id   : 'company',
                    //     title: 'Company',
                    //     type : 'basic',
                    //     link : '/settings/master-data/company'
                    // }
                ]
            }
        ]
    },
    {
        id      : 'session',
        title   : 'Session',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'Empty',
                title: 'Logout',
                type : 'basic',
                icon : 'heroicons_outline:logout',
                link : '/sign-out'
            }
        ]
    },
];


export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
