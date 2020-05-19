import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles: Array<any>
  showArticles: boolean = true
  showError: boolean = false
  latestQuery: any;
  constructor(private newsService : NewsService) { }

  ngOnInit(): void {
    this.getNews()
  }

  // Direct user to article url
  goToUrl(event, article) {
    document.location.href = `${article.url}`
  }

  getNews() {
    // Check if user gave parameters
    if(Object.keys(this.newsService.getQueryData()).length > 0) {
      this.latestQuery = this.newsService.getQueryData()
      this.newsService.getNewsBasedOnParams().subscribe((data) => {
        this.articles = data['articles']
        if(this.articles.length === 0) {
          this.showArticles = false
          this.showError = true
        }
      })

      // Clear querydata in service
      this.newsService.setQueryData({})

      // show latest articles from U.S. if no params were given
    } else {
      this.newsService.getDefaultNews().subscribe(data => this.articles = data['articles'])
      this.newsService.setQueryData({})
    }
  }
}
