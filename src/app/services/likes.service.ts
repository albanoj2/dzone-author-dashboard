import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Likes } from '../domain/like';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/toPromise';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class LikesService {

    private articlesUrl = 'https://dzone.com/services/widget/article-listV2/list?author={}&sort=newest';

    constructor(private http: Http) {}

    public getLikes(articleId: number): Promise<Likes> {

        return this.http.get(this.getLikesUrl(articleId))
            .toPromise()
            .then(response => {
                console.log(response.json());
                return Likes.createLikes(response.json().result.data); 
        });
    }

    private getLikesUrl(articleId: number): string {
        return `https://dzone.com/services/internal/data/dzone-likeContext?node=${articleId}`;
    }
}