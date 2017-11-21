import { Component, Input } from '@angular/core';
import { Catalog } from '../domain/article';
import * as moment from 'moment'

@Component({
    selector: 'dashboard-chart',
    template: `
    <div style="display: block">
        <canvas baseChart
            [datasets]="chartData"
            [labels]="chartLabels"
            [options]="chartOptions"
            [legend]="chartLegend"
            [chartType]="chartType"
            [colors]="chartColors"
            (chartHover)="chartHovered($event)"
            (chartClick)="chartClicked($event)"></canvas>
    </div>
    `
})
export class DashboardChartComponent {

    private chartMapper = new CatalogChartMapper();
    private chartLabels: string[] = [];
    private chartType = 'bar';
    private chartLegend = true;
    private chartData: any[] = [];
    private chartOptions: any = {scaleShowVerticalLines: false, responsive: true};
    // private chartColors = ['#0479e3'];
    private chartColors = [
        {
            backgroundColor: '#0479e3',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: '#0479e3',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          }
    ]

    @Input()
    private set catalog(catalog: Catalog) {
        let chartData = this.chartMapper.getChartData(catalog);
        this.chartLabels = chartData.labels;
        this.chartData = chartData.chartData;
    }
   
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

        // chartData.viewsCountData = [100, 200, 800, 500, 600, 300];
        chartData.viewsCountData = this.generateViews(catalog);
        chartData.commentsCountData = [55, 59, 80, 81, 56, 55];
        chartData.likesCountData = [65, 59, 80, 81, 56, 55];
        // chartData.labels = ['Jun 2017', 'Jul 2017', 'Aug 2017', 'Sep 2017', 'Oct 2017', 'Nov 2017'];
        chartData.labels = this.generateLabels(catalog);

        return chartData;
    }

    private generateLabels(catalog: Catalog) {
        return this.generateMonths(catalog).map(month => month.format('MMM YYYY'));
    }

    private generateMonths(catalog: Catalog) {
        let startDate: Date = new Date(Math.min.apply(null, catalog.articles.map(article => article.date)));
        
        let start = moment(startDate);
        let end = moment(new Date()).add(1, 'month');
        let current = start.clone();

        let months = [];

        while (current.isBefore(end)) {
            months.push(current.clone());
            current.add(1, 'month');
        }

        return months;
    }

    private generateViews(catalog: Catalog) {

        let views = [];

        this.generateMonths(catalog).forEach(month => {
            let sum = 0;
            
            catalog.articles.forEach(article => {
                let date = moment(article.date);
                if (date.isSame(month, 'month')) {
                    sum += article.viewsCount;
                }
            });

            views.push(sum);
        });

        return views;
    }
}

class CatalogChartData {

    private _viewsCountData: number[];
    private _commentsCountData: number[];
    private _likesCountData: number[];
    private _labels: string[];

    public get viewsCountChartData() {
        return {data: this._viewsCountData, label: 'Views'};
    }

    public get commentsCountChartData() {
        return {data: this._commentsCountData, label: 'Comments'};
    }

    public get likesCountChartData() {
        return {data: this._likesCountData, label: 'Likes'};
    }

    public get chartData() {
        return [this.viewsCountChartData];
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