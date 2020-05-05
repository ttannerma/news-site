import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { FormsModule } from '@angular/forms'

const navigationExtras: NavigationExtras = {
  state: {
    transd: 'TRANS001',
    workQueue: false,
    services: 10,
    code: '003'
  }
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NewsService],
})

export class HomeComponent implements OnInit {

  router: Router;
  constructor() { }

  ngOnInit(): void {
    
  }

  onSubmit(userForm) {
    console.log(userForm.value)
  }
}
