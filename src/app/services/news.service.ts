import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parse } from 'path';

@Injectable({
  providedIn: 'root'
})

// Create service to be used between home.component and news.component
export class NewsService {
  newsApiKey: string= '3154cefaf49641c891596f9d9d66dbe9'
  queryData: Object = {}
  newsSourcesList: [] = []

  constructor(private http: HttpClient) {}

   // Gets default top headlines for U.S.
   getDefaultNews() {
    const results = this.http.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + this.newsApiKey)
    return results
  }

  updatePreviousQueryList() {
    let previousQueries = this.getPreviousQueries()
    previousQueries.shift()
    JSON.stringify(previousQueries.push(this.queryData))
    this.setPreviousQueriesToLocalStorage(previousQueries)
  }

  setPreviousQueriesToLocalStorage(previousQueries) {
    const storage = localStorage
    for(let i = 0; i < 3; i++) {
      storage.setItem(`news-site-query-${i}`, `{"keyword":"${previousQueries[i].keyword}","sourceName":"${previousQueries[i].sourceName}","language":"${previousQueries[i].language}"}`)
    }
  }

  getPreviousQueries() {
    const storage = localStorage
    let queryArray = []
    // localStorage.clear()
    for(let i = 0; i < 3; i++) {
      if(storage.getItem(`news-site-query-${i}`) != undefined) {
        queryArray.push(storage.getItem(`news-site-query-${i}`))
      } else {
        queryArray.push(`{"keyword":"","sourceName":"","language":""}`)
      }
    }
    return this.parseStringifiedObject(queryArray)
  }

  parseStringifiedObject(queryArray) {
    let parsedArray = []
    for(let i = 0; i < queryArray.length; i++) {
      parsedArray.push(JSON.parse(queryArray[i]))
    }
    return parsedArray
  }

  setNewsSourcesList(newsSources) {
    this.newsSourcesList = newsSources
  }

  getNewsSourcesList() {
    return this.newsSourcesList
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
