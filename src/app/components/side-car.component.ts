import { Component, Input, OnInit } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { Author } from '../domain/author';

@Component({
    selector: 'side-car',
    templateUrl: './side-car.component.html',
    styleUrls: ['./side-car.component.css']
})
export class SideCarComponent implements OnInit{

    @Input()
    private authorId: number;
    private author: Author;

    constructor(private authorService: AuthorService) {}

    public ngOnInit() {
        this.authorService.getAuthor(this.authorId).then(author => this.author = author);
    }
}