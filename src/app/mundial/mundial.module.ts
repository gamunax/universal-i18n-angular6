import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MundialComponent } from './mundial.component';
import { MundialRoutingModule } from './mundial-routing.module';

import { MundialService } from './services/mundial.service';

@NgModule({
    declarations: [
        MundialComponent
    ],
    imports: [
        CommonModule,
        MundialRoutingModule
    ],
    providers: [
        MundialService
    ],
    exports: []
})
export class MundialModule {}