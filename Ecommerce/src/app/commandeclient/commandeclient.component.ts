import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-commandeclient',
  templateUrl: './commandeclient.component.html',
  styleUrls: ['./commandeclient.component.scss']
})
export class CommandeclientComponent implements OnInit {
  pro = [];
  cmd
  user = JSON.parse(localStorage.getItem("user"));
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const Id = this.user.Id
    this.http.get('/api/getcmd2').subscribe((res) => {
      this.cmd = res;
      for(var i=0;i<this.cmd.length;i++){
        if(this.cmd[i].iden === Id){
          this.pro.push(this.cmd[i].product)
        }
      }
      console.log(this.pro)
    });
  }

}
