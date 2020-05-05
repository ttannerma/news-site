import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { RouterState, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles: Array<any>
  myData: Object
  constructor(private newsService : NewsService) { }

  ngOnInit(): void {

    // If search parameters have been given, then create query based on params
    if(Object.keys(this.newsService.getQueryData()).length > 0) {
      // console.log(this.newsService.getQueryData())
      // this.newsService.getNewsBySource('reuters').subscribe(data => this.articles = data['articles'])

      // If not, then show latest articles from U.S.
    } else {
      this.newsService.getDefaultNews().subscribe(data => this.articles = data['articles'])
    }

  }

  searchArticle(source) {
    this.newsService.getNewsBySource(source).subscribe(data => this.articles = data['articles'])
  }
}
