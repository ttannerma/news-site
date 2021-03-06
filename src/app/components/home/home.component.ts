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
  isDataLoaded: boolean = false;
  displayErrorMessage: boolean = false;
  previousQueries: Object

  // List of possible languages
  languages = {
    ar: 'Arabic',
    de: 'German',
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    he: 'Hebrew',
    it: 'Italian',
    nl: 'Dutch',
    no: 'Norwegian',
    pt: 'Portuguese',
    ru: 'Russian',
    se: 'Swedish',
    zh: 'Chinese'
  }

  // Default queryObject for user's query
  queryObject = {
    keyword: '',
    sourceName: '',
    language: ''
  }

  constructor(private newsService : NewsService, private router: Router) { }

  ngOnInit(): void { 
    this.getSources()
    this.previousQueries = this.newsService.getPreviousQueries()
  }

  async getSources() : Promise<Object> {

    // If newsSources are not set then fetch list of available news sources
    if (this.newsService.getNewsSourcesList().length === 0) {
        const fetchNewsSource = await this.newsService.getNewsSources()
        // Angular uses Rx.js Observables instead of promises for dealing with HTTP. Convert this Observable to Promise using toPromise()
        .toPromise()
        .then((resp) => {
          this.sources = resp['sources']

          // Save results to service so app doesnt fetch it every time
          this.newsService.setNewsSourcesList(resp['sources'])
          this.isDataLoaded = true;
          return resp['sources']
        }).catch((e) => {
          this.displayErrorMessage = true;
        })
    } else {
      // Return the already fetched news source list from service
      this.isDataLoaded = true;
      this.sources = this.newsService.getNewsSourcesList()
      return this.newsService.getNewsSourcesList();
    }
  }

  // event handler for sourcename pick
  handleSourceNamePick(value) {
    this.queryObject.sourceName = value
  }

  // event handler for language pick
  handleLanguagePick(value) {
    this.queryObject.language = value
  }

  // key up event handler for keyword
  onKeywordInput(event) {
    this.queryObject.keyword = event.target.value
  }

  // On submit handler
  onSubmit(userForm) {
    this.newsService.setQueryData(this.queryObject)
    this.newsService.updatePreviousQueryList()
    this.router.navigateByUrl('/news')
  }

  // Handle submit for previous query
  submitPreviousQuery($event, src, lang, keyword) {
    this.queryObject.sourceName = src
    this.queryObject.language = lang
    this.queryObject.keyword = keyword

    this.newsService.setQueryData(this.queryObject)
    this.newsService.updatePreviousQueryList()
    this.router.navigateByUrl('/news')
  }
}
