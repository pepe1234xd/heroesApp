import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers=[
    {
      id:'DC Comics',
      desc:'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc:'Marvel- Comics'
    }
  ];

  heroe:Heroe={
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher: Publisher.DCComics,
    alt_img:''
  }

  constructor(private heroesService:HeroesService, private activatedRoute: ActivatedRoute, private router:Router, private snackBar: MatSnackBar, private dialog:MatDialog){}

  ngOnInit(): void {
    
    if(this.router.url.includes('editar')){
      this.activatedRoute.params
      .pipe(
      switchMap(({id})=>this.heroesService.getHeroe(id))
      )
      .subscribe(heroe=>this.heroe=heroe);

    }else{
      return;
    }
  }

  guardar(){
    if(this.heroe.superhero.trim().
      length===0){
        console.log('aegaeg');
      return;
    }

    if(this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe).subscribe(heroe=>{
        this.mostrarSnackbar('registro actualizado');
      })
    }else{
     this.heroesService.agregarHeroe(this.heroe).subscribe(heroe=>{
      this.router.navigate(['/heroes/editar',heroe.id]);
      this.mostrarSnackbar('registro creado');
    });
    }   

  }
  
  borrarHeroe(){

    const dialog = this.dialog.open(ConfirmarComponent,{
      width: '250px',
      data:{...this.heroe}
    })

    dialog.afterClosed().subscribe((resp=>{
      if(resp){
        this.heroesService.borrarHeroe(this.heroe.id!).subscribe(resp=>{
          this.router.navigate(['/heroes'])
        })
      }
    }))  
  }

  mostrarSnackbar(mensaje:string){
    this.snackBar.open(mensaje,'Ok!!!',{
      duration:2500
    });
  }
}
