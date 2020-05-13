import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// Create service to be used between home.component and news.component
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

  // Set users query data
  setQueryData(newData) {
    this.queryData = newData
  }

  // Returns users query data
  getQueryData() {
    return this.queryData
  }

  getNewsSources() {
    const results = this.http.get('https://newsapi.org/v2/sources?apiKey=' + this.newsApiKey)
    return results
  }

  // Creates url based on users parameters
  createUrlBasedOnParams() {
    const params = this.getQueryData()
    const keyword = !!encodeURI(params['keyword']) ? encodeURI(params['keyword']) : ""
    const source = !!encodeURI(params['sourceName']) ? encodeURI(params['sourceName']) : ""
    const language = !!encodeURI(params['language']) ? encodeURI(params['language']) : ""
    const url = `https://newsapi.org/v2/everything?q=${keyword}&sources=${source}&language=${language}&apiKey=3154cefaf49641c891596f9d9d66dbe9`

    // If no params are given, then get default news
    if(keyword.length == 0 && source.length == 0 && keyword.length == 0) {
      return 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + this.newsApiKey

      // Else return url with params
    } else {
      return url
    }
  }

  // Gets news based on users parameters
  getNewsBasedOnParams() {
    const results = this.http.get(this.createUrlBasedOnParams())
    return results
  }
}
