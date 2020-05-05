import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {

  articles: Array<any>
  constructor(private newsService : NewsService) { }

  // Display default news articles in ngOnInit()
  ngOnInit(): void {
    this.newsService.getDefaultNews().subscribe(data => this.articles = data['articles'])
  }

  searchArticle(source) {
    this.newsService.getNewsBySource(source).subscribe(data => this.articles = data['articles'])
  }
}
