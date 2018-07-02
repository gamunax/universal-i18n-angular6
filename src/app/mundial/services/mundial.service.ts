import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class MundialService {
    constructor(
        public http: HttpClient
    ) {
    }

    getTeams(): Observable<any> {
        return this.http.get('https://worldcup.sfg.io/teams/');
    }
}
