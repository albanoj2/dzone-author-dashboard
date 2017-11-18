import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Catalog, Article } from '../domain/article';
import { LikesService } from '../services/likes.service';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/toPromise';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class ArticlesService {

    constructor(private http: Http, private likesService: LikesService) {}

    public getCatalog(userId: number): Promise<Catalog> {
        return this.getArticles(userId).then(articles => new Catalog(articles));
    }

    public getArticles(userId: number): Promise<Article[]> {

        return this.http.get(this.getArticlesUrl(userId))
            .toPromise()
            .then(response => {
                // let articles = response.json().result.data.nodes.map(rawArticle => Article.fromJson(rawArticle));
                let articles: Promise<Article>[] = response.json().result.data.nodes.map(rawArticle => this.buildArticle(rawArticle));
                console.log(response.json().result.data.nodes);
                return Promise.all(articles);
        });
    }

    private getArticlesUrl(userId: number): string {
        return `https://dzone.com/services/widget/article-listV2/list?author=${userId}&sort=newest`;
    }

    private buildArticle(jsonArticle: any): Promise<Article> {
        let article = Article.fromJson(jsonArticle);
        return this.likesService.getLikes(article.id).then(likes => {
            article.likes = likes;
            return article;
        })
    }
}