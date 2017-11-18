import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { Catalog } from '../domain/article';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    private catalog: Catalog;
    private userId = 1144561;

    constructor(private articlesService: ArticlesService) {}

    ngOnInit() {
        this.articlesService.getCatalog(this.userId).then(catalog => this.catalog = catalog);
    }
}