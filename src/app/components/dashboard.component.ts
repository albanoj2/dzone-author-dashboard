import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { Catalog, Article } from '../domain/article';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    private catalog: Catalog;
    private userId = 1144561;

    constructor(private articlesService: ArticlesService) {}

    ngOnInit() {
        this.articlesService.getCatalog(this.userId).then(catalog => this.catalog = catalog);
    }

    public get isLoaded(): boolean {
        return this.catalog !== undefined;
    }

    public get isLoading(): boolean {
        return !this.isLoaded;
    }

    public percentDifferenceFromAverage(article: Article) {
        return Math.abs(((article.viewsCount - this.catalog.averageViewsPerArticle) / this.catalog.averageViewsPerArticle) * 100).toFixed(1);
    }

    public isArticleAboveAverage(article: Article) {
        return article.viewsCount > this.catalog.averageViewsPerArticle;
    }

    public isArticleBelowAverage(article: Article) {
        return article.viewsCount < this.catalog.averageViewsPerArticle;
    }
}