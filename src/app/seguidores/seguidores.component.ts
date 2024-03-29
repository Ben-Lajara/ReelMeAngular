import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seguidores',
  templateUrl: './seguidores.component.html',
  styleUrls: ['./seguidores.component.css']
})
export class SeguidoresComponent implements OnInit {
  username='';
  seguidores: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      console.log(this.username)
      this.getSeguidores().subscribe((res: any) => {
        this.seguidores = res;
      });
      
    });
  }

  getSeguidores(){
    return this.http.get(`http://localhost:8080/seguidores/${this.username}`)
  }
}
