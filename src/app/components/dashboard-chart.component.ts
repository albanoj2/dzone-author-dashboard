import { Component, Input } from '@angular/core';
import { Catalog } from '../domain/article';

@Component({
    selector: 'dashboard-chart',
    template: `
    <div style="display: block">
        <canvas baseChart
            [datasets]="barChartData"
            [labels]="barChartLabels"
            [options]="barChartOptions"
            [legend]="barChartLegend"
            [chartType]="barChartType"
            (chartHover)="chartHovered($event)"
            (chartClick)="chartClicked($event)"></canvas>
    </div>
    `,
    styleUrls: ['./count-card.component.css']
})
export class DashboardChartComponent {

    @Input()
    private catalog: Catalog;

    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
   
    public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];
   
    // events
    public chartClicked(e:any):void {
        console.log(e);
    }
   
    public chartHovered(e:any):void {
        console.log(e);
    }
}

class CatalogChartMapper {

    public getChartData(catalog: Catalog): CatalogChartData {
        let chartData = new CatalogChartData();

        return chartData;
    }
}

class CatalogChartData {

    private _viewsCountData: number[];
    private _commentsCountData: number[];
    private _likesCountData: number[];
    private _labels: string[];

    public get viewCountChartData() {
        return {data: this._viewsCountData, label: 'Views'};
    }

    public get commentsCountChartData() {
        return {data: this._commentsCountData, label: 'Comments'};
    }

    public get likesCountChartData() {
        return {data: this._likesCountData, label: 'Likes'};
    }

    public set viewsCountData(data: number[]) {
        this._viewsCountData = data;
    }

    public set commentsCountData(data: number[]) {
        this._commentsCountData = data;
    }

    public set likesCountData(data: number[]) {
        this._likesCountData = data;
    }

    public set labels(labels: string[]) {
        this._labels = labels;
    }

    public get labels() {
        return this._labels;
    }
}