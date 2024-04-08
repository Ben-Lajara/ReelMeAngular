import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre='';
  pword='';
  pword2='';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    if (this.pword !== this.pword2) {
      console.log('Las contraseñas no coinciden');
      return;
    }else{
      this.authService.register(this.nombre, this.pword).subscribe(
        success => console.log('Registration Success'),
        error => console.log('Registration Error', error.error)
      );
    }
    
  }

}
