import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  sources: Object
  newsSource
  constructor(private newsService : NewsService, private router: Router) {
    
  }

  ngOnInit(): void { 
    this.getSources()
  }

  async getSources() : Promise<Object> {
    if (typeof this.newsSource === 'undefined') 
    {
        // save result
        this.newsSource = await this.newsService.getNewsSources()
        .toPromise()
        .then((resp) => {
          console.log(resp['sources'])
          this.sources = resp['sources']
          return resp['sources']
        });
    }
    return this.sources;
  }
  onSubmit(userForm) {
    this.newsService.setQueryData(userForm.value)
    this.router.navigateByUrl('/news')
  }
}
