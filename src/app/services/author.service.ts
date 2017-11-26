import { Injectable } from '@angular/core';
import { Author } from '../domain/author';


@Injectable()
export class AuthorService {

    public getAuthor(id: number): Promise<Author> {
        let author = new Author();
        author.name = "Justin Albano";
        author.avatarUrl = 'https://dz2cdn2.dzone.com/thumbnail?fid=5097969&w=240';
        return Promise.resolve(author);
    }
}