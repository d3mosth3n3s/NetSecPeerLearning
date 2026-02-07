import { Routes } from '@angular/router'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { VulnerabilityPageComponent } from './components/vulnerability-page/vulnerability-page.component'

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'vulnerability/:id',
        component: VulnerabilityPageComponent
    }
]
