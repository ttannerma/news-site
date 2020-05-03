import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  newsApiKey: string= '3154cefaf49641c891596f9d9d66dbe9'
  constructor(private http: HttpClient) {}

   // Gets default top headlines for U.S
   // News api can't get global news, a parameter must be specified for the query, such as sources, q (query), language, country, category
   getDefaultNews(): Object {
     const results = this.http.get('http://newsapi.org/v2/top-headlines?country=us&apiKey=' + this.newsApiKey)
     return results
   }
  
   // Gets latest news by source
   getNewsBySource(source: string): Object {
    const results = this.http.get('http://newsapi.org/v2/top-headlines?source' + source + '&apiKey=' + this.newsApiKey)
    return results
   }
}
