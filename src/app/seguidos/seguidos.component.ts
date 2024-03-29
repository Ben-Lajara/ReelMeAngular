import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seguidos',
  templateUrl: './seguidos.component.html',
  styleUrls: ['./seguidos.component.css']
})
export class SeguidosComponent implements OnInit {
  username='';
  seguidos: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      console.log(this.username)
      this.getSeguidos().subscribe((res: any) => {
        this.seguidos = res;
      });
      
    });
  }

  getSeguidos(){
    return this.http.get(`http://localhost:8080/seguidosPor/${this.username}`)
  }

}
