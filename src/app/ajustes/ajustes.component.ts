import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {
  fotoSeleccionada: File | null= null;
  username = '';
  usuario: any;
  pword = '';
  pword2 = '';
  exito='';
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.getUsuario().subscribe((res: any) => {
        this.usuario = res;
        console.log(this.usuario);
      });
    });
  }

  getUsuario(){
    return this.http.get(`http://localhost:8080/usuario/${this.username}`)
  }

  setNewPword(){
    if(this.pword !== this.usuario.pword){
      console.log('Contraseña incorrecta');
    }else{
      this.usuario.pword = this.pword2;
      this.http.put(`http://localhost:8080/cambiarPword`, this.usuario).subscribe(
        success => {
          console.log('Password Updated')
          this.exito = 'Contraseña Actualizada'
          this.pword = '';
          this.pword2 = '';
        },
        error => console.log('Password Update Error', error.error)
      )
    }
  }

  onFileSelected(event: any): void {
    this.fotoSeleccionada = event.target.files[0];
  }

  onUpload(): void {
    if (this.fotoSeleccionada) {
      const fd = new FormData();
      fd.append('file', this.fotoSeleccionada, this.fotoSeleccionada.name);
      fd.append('nombre', this.username);
      this.http.post('http://localhost:8080/upload', fd).subscribe(
        success => console.log('Upload Success'),
        error => console.log('Upload Error', error.error)
      );
    }
  }

}
