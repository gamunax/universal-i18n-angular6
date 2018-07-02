import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MundialComponent } from './mundial.component';

const routes: Routes = [
    {
        path: '',
        component: MundialComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MundialRoutingModule {}
