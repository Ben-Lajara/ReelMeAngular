import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  username = '';
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUsername.subscribe((username) => {
      this.username = username;
      console.log(this.username);
    });
  }

  seguidos: any[] = [];
  peliculas: { [key: string]: any } = {};
  ids: any[] = [];
  usuario: any;

  ngOnInit(): void {
    this.getUser().subscribe((res: any) => {
      this.usuario = res;
      console.log(this.usuario);
    });
  }

  onSubmit() {
    this.http.put(`http://localhost:8080/usuario`, this.usuario).subscribe(
      (success) => {
        console.log('Usuario Actualizado');
      },
      (error) => {
        console.log('Error al actualizar usuario', error.error);
      }
    );
  }

  getUser() {
    return this.http.get(`http://localhost:8080/usuario/${this.username}`);
  }

  deleteUser() {
    console.log('Eliminando usuario');
    console.log(this.usuario);
    this.http
      .delete(`http://localhost:8080/delete`, { body: this.usuario })
      .subscribe(
        (success) => {
          console.log('Usuario Eliminado');
          this.router.navigate(['/']);
        },
        (error) => {
          console.log('Error al eliminar usuario', error.error);
        }
      );
  }
}
