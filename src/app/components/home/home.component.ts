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
  isDataLoaded: boolean;

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

  queryObject = {
    keyword: '',
    sourceName: '',
    language: ''
  }

  constructor(private newsService : NewsService, private router: Router) {
    this.isDataLoaded = false
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
          this.sources = resp['sources']
          this.isDataLoaded = true;
          return resp['sources']
        });
    }
    this.isDataLoaded = true;
    return this.sources;
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
    this.router.navigateByUrl('/news')
  }
}
