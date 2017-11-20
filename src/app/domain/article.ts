import { Likes } from './like';


export class Catalog {

    constructor(private _articles: Article[]) {}

    public get viewCount() {
        return this._articles
            .map(article => article.viewsCount)
            .reduce((sum, current) => sum + current);
    }

    public get commentsCount() {
        return this._articles
            .map(article => article.commentsCount)
            .reduce((sum, current) => sum + current);
    }

    public get likesCount() {
        return this._articles
            .map(article => article.likesCount)
            .reduce((sum, current) => sum + current);
    }

    public get articles() {
        return this._articles;
    }
}

export class Article {

    private _id: number;
    private _title: string;
    private _authors: string[]
    private _tags: string[]
    private _views: number;
    private _commentCount: number;
    private _likesCount: number;
    private _likes: Likes;
    private _linkUrl: string;
    private _date: Date;

    public static fromJson(json: any): Article {
        let article = new Article();
        article._id = +json.id;
        article._title = json.title;
        article._authors = json.authors;
        article._tags = json.tags;
        article._views = +json.views;
        article._commentCount = +json.nComments;
        article._linkUrl = json.articleLink;
        article._date = new Date(+json.articleDate);
        return article;
    }
    
    public get viewsCount() {
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

    public get date() {
        return this._date;
    }

    public get title() {
        return this._title;
    }
}