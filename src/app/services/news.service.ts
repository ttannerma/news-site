import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  newsApiKey: string= '3154cefaf49641c891596f9d9d66dbe9'
  queryData: Object = {}

  constructor(private http: HttpClient) {}

   // Gets default top headlines for U.S.
   // News api must be used with a query, such as sources, q (query), language, country, category
   getDefaultNews() {
    const results = this.http.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + this.newsApiKey)
    return results
  }

  setQueryData(newData) {
    this.queryData = newData
  }

  getQueryData() {
    return this.queryData
  }

  // Gets latest news by source
  getNewsBySource(source: string) {
    const results = this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.newsApiKey)
    return results
  }
}
