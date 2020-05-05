import { RouterModule , Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';

// Specify routes for app
const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'news',
        component: NewsComponent
    }
];

export const AppRoutes = RouterModule.forRoot(routes);