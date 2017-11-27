import { Component, Input } from '@angular/core';
import { Catalog } from '../domain/article';
import * as moment from 'moment'

export enum TimeScale {
    ALL_TIME, ONE_YEAR, SIX_MONTHS, THREE_MONTHS;
}

@Component({
    selector: 'dashboard-chart',
    templateUrl: 'dashboard-chart.component.html',
    styleUrls: ['dashboard-chart.component.css']
})
export class DashboardChartComponent {

    private chartMapper = new CatalogChartMapper();
    private timeScale = TimeScale.ALL_TIME;
    private _catalog: Catalog;
    private chartLabels: string[] = [];
    private chartType = 'line';
    private chartLegend = true;
    private chartData: any[] = [];
    private chartOptions: any = {
        scaleShowVerticalLines: false, 
        responsive: true, 
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: false,
                    maxTicksLimit: 12
                }
            }]
        }
    };
    private chartColors = [
        {
            backgroundColor: '#319ee3',
            borderColor: 'rgba(148,159,177,0)',
            border: '0px',
            pointBackgroundColor: '#0479e3',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          }
    ]

    @Input()
    private set catalog(catalog: Catalog) {
        this._catalog = catalog;
        this.setToAllTime();
    }

    private updateChartForMonths(months: number) {
        this.updateChart(this.chartMapper.getChartData(this._catalog, months));
    }

    private updateChart(data: CatalogChartData) {
        this.chartLabels = data.labels;
        this.chartData = data.chartData;
    }
   
    public chartClicked(e:any):void {
        console.log(e);
    }
   
    public chartHovered(e:any):void {
        console.log(e);
    }

    public setToAllTime() {
        this.updateChart(this.chartMapper.getAllTimeChartData(this._catalog));
        this.timeScale = TimeScale.ALL_TIME;
    }

    public setToOneYear() {
        this.updateChartForMonths(12);
        this.timeScale = TimeScale.ONE_YEAR;
    }

    public setToSixMonths() {
        this.updateChartForMonths(6);
        this.timeScale = TimeScale.SIX_MONTHS;
    }

    public setToThreeMonths() {
        this.updateChartForMonths(3);
        this.timeScale = TimeScale.THREE_MONTHS;
    }
}

class CatalogChartMapper {

    public getChartData(catalog: Catalog, numberOfMonths: number): CatalogChartData {
        let chartData = new CatalogChartData();

        chartData.viewsCountData = this.generateViews(catalog, numberOfMonths);
        // chartData.commentsCountData = [55, 59, 80, 81, 56, 55];
        // chartData.likesCountData = [65, 59, 80, 81, 56, 55];
        chartData.labels = this.generateLabels(catalog, numberOfMonths);

        return chartData;
    }

    public getAllTimeChartData(catalog: Catalog): CatalogChartData {
        return this.getChartData(catalog, this.getMonthsCount(catalog));
    }

    private generateLabels(catalog: Catalog, numberOfMonths: number) {
        return this.generateMonths(catalog, numberOfMonths).map(month => month.format('MMM YYYY'));
    }

    private generateMonths(catalog: Catalog, numberOfMonths: number) {
        let startDate: Date = new Date(Math.min.apply(null, catalog.articles.map(article => article.date)));
        
        // let start = moment(startDate);
        let end = moment(new Date()).add(1, 'month');
        let start = moment(new Date()).subtract(numberOfMonths - 1, 'month');
        let current = start.clone();

        let months = [];

        while (current.isBefore(end)) {
            months.push(current.clone());
            current.add(1, 'month');
        }

        return months;
    }

    private getMonthsCount(catalog: Catalog): number {
        let startDate: Date = new Date(Math.min.apply(null, catalog.articles.map(article => article.date)));
        
        let start = moment(startDate);
        let end = moment(new Date()).add(1, 'month');
        let current = start.clone();

        let months = 0;

        while (current.isBefore(end)) {
            months++;
            current.add(1, 'month');
        }

        return months;
    }

    private generateViews(catalog: Catalog, numberOfMonths: number) {

        let views = [];
        let previousViews = 0;

        this.generateMonths(catalog, numberOfMonths).forEach(month => {
            let sum = 0;
            
            catalog.articles.forEach(article => {
                let date = moment(article.date);
                if (date.isSame(month, 'month')) {
                    sum += article.viewsCount;
                }
            });

            views.push(sum + previousViews);
            previousViews += sum;
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