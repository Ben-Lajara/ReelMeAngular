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

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.authService.register(this.nombre, this.pword).subscribe(
      success => console.log('Registration Success'),
      error => console.log('Registration Error', error.error)
    );
  }

}
