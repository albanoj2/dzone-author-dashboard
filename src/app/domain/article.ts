import { Likes } from './like';


export class Catalog {

    constructor(private articles: Article[]) {}

    public get viewCount() {
        return this.articles
            .map(article => article.views)
            .reduce((sum, current) => sum + current);
    }

    public get commentsCount() {
        return this.articles
            .map(article => article.commentsCount)
            .reduce((sum, current) => sum + current);
    }

    public get likesCount() {
        return this.articles
            .map(article => article.likesCount)
            .reduce((sum, current) => sum + current);
    }
}

export class Article {

    private _id: number;
    private title: string;
    private authors: string[]
    private tags: string[]
    private _views: number;
    private _commentCount: number;
    private _likesCount: number;
    private _likes: Likes;

    public static fromJson(json: any): Article {
        let article = new Article();
        article._id = +json.id;
        article.title = json.title;
        article.authors = json.authors;
        article.tags = json.tags;
        article._views = +json.views;
        article._commentCount = +json.nComments;
        return article;
    }
    
    public get views() {
        return this._views;
    }

    public get commentsCount() {
        return this._commentCount;
    }

    public set likes(likes: Likes) {
        this._likes = likes;
    }

    public get likesCount() {
        return this._likes.count;
    }

    public get id() {
        return this._id;
    }
}