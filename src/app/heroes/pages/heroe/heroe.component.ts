import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe!:Heroe;

/**
 *check the activated route
 */
  constructor(private activatedRoute:ActivatedRoute, private heroesService:HeroesService, private router:Router){}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({id})=>this.heroesService.getHeroe(id))
    )
    .subscribe(heroe=> this.heroe=heroe);
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
