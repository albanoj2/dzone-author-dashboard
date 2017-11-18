import { Component, Input } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { Catalog } from '../domain/article';

@Component({
    selector: 'count-card',
    templateUrl: './count-card.component.html',
    styleUrls: ['./count-card.component.css']
})
export class CountCardComponent {

    @Input()
    private count: number;

    @Input()
    private title: string;

    public get formattedCount() {
        return this.count.toLocaleString('en-US');
    }
}