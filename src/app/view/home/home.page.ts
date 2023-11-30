import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Animais } from 'src/app/model/entities/Animais';
import { FirebaseService } from 'src/app/model/service/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  lista: Animais[]=[];

  constructor(private router: Router, private firebase: FirebaseService) {
    this.firebase.read()
    .subscribe(res => {
      this.lista = res.map(animal =>{
        return{
          id: animal.payload.doc.id,
          ...animal.payload.doc.data() as any
        } as Animais
      })
    });
  }

  irParaRegistro(){
    this.router.navigate(["/registrar"]);
  }
  irParaEditar(animal : Animais){
    this.router.navigateByUrl("/editar",{
      state: {animal: animal}});
  }
}
