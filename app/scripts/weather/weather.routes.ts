import { RouteConfig } from 'vue-router';

export default (): RouteConfig[] => {
    return [
        {
            path: '/weather',
        name: 'weather',
        component: () => import('./weather.component'),
        children: [
            {
                path: '',
                name: 'weather-list',
                component: () => import('./weather-list/weather-list.component')
            },
            {
                path: ':id',
                name: 'weather-detail',
                component: () => import('./weather-detail/weather-detail.component'),
                props: true
            }
        ]
        }
    ];
};