import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Animais } from 'src/app/model/entities/Animais';
import { FirebaseService } from 'src/app/model/service/firebase.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  animal! : Animais;
  especie! : string;
  nome! : string;
  genero! : number; 
  peso! : number;
  saude! : number;
  edicao : boolean = true;
  imagem! : any;

  constructor(private firebase: FirebaseService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.animal=history.state.animal;
    this.especie= this.animal.especie;
    this.nome=this.animal.nome;
    this.genero=this.animal.genero;
    this.peso=this.animal.peso;
    this.saude=this.animal.saude;
  }
  PermitirEdicao(){
    if(this.edicao){
      this.edicao=false;
    }else{
      this.edicao=true;
    }
  }

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  editar(){
    if(!this.nome || !this.especie){
      this.presentAlert("Erro","Nome e especie são obrigatorios");
    }else{
      let novo: Animais = new Animais(this.especie, this.nome, this.genero);
      novo.peso = this.peso;
      novo.saude= this.saude;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo);
      }else{
        novo.downloadURL = this.animal.downloadURL;
        this.firebase.update(novo, this.animal.id);
      }
      this.router.navigate(["/home"]);
    }
  }


  excluir(){
    this.firebase.delete(this.animal.id);
    this.router.navigate(['/home']);
  }

  async presentAlert(subHeader: string, message: string){
    const alert = await this.alertController.create({
      header: 'registro de animais',
      subHeader: subHeader,
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }
}
