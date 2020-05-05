import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles: Array<any>
  constructor(private newsService : NewsService) { }

  ngOnInit(): void {
    // If search parameters have been given, then create query based on params
    if(Object.keys(this.newsService.getQueryData()).length > 0) {
      this.newsService.getNewsBasedOnParams().subscribe(data => this.articles = data['articles'])
      this.newsService.setQueryData({})

      // If not, then show latest articles from U.S.
    } else {
      this.newsService.getDefaultNews().subscribe(data => this.articles = data['articles'])
      this.newsService.setQueryData({})
    }
  }
}
