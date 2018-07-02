import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'mundial',
        pathMatch: 'full'
    },
    {
        path: 'mundial'            ,
        loadChildren: './mundial/mundial.module#MundialModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
