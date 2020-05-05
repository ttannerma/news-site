import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(private newsService : NewsService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(userForm) {
    this.newsService.setQueryData(userForm.value)
    this.router.navigateByUrl('/news')
  }
}
