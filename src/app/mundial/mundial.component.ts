import { Component, OnInit } from '@angular/core';

import { MundialService } from './services/mundial.service';

@Component({
  selector: 'app-mundial',
  templateUrl: './mundial.component.html',
  styleUrls: ['./mundial.component.css']  
})
export class MundialComponent implements OnInit {
  public listadoTeams = [];
  constructor(
    private mundialService: MundialService
  ) { }

  ngOnInit() {
    this.mundialService.getTeams().subscribe(res => {
      this.listadoTeams = res;
      console.log(res);
    });
  }

  nav(idioma) {
    window.location.href = '/' + idioma.toLowerCase() + '/';
  }

}
