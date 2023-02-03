import { CompanyModel } from './../../../../models/company.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AppSettings } from 'app/enviroments';
import { BusinessManagerModel } from 'app/models/business.manager';
import { Quotes, QuotesManagerModel } from 'app/models/quotes.manager';

@Injectable({
    providedIn: 'root'
})
export class CryptoService {
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);


    constructor(private _httpClient: HttpClient) {
    }


    get data$(): Observable<any> {
        return this._data.asObservable();
    }

    getData(): Observable<CompanyModel[]> {
        return this._httpClient.get<CompanyModel[]>(AppSettings.API_PATH.concat('/v1/company')).pipe(
            tap((response: CompanyModel[]) => {
                this._data.next(response);
            })
        );
    }

    createCompany(companyModel: CompanyModel): Observable<CompanyModel> {
        return this._httpClient.post(AppSettings.API_PATH + '/v1/company/create', companyModel)
    }

    updateCompany(companyModel: CompanyModel, idCompany: number): Observable<CompanyModel> {
        return this._httpClient.patch(AppSettings.API_PATH + '/v1/company/update/' + idCompany, companyModel)
    }

    deleteCompany(idCompany: number): Observable<any> {
        return this._httpClient.delete(AppSettings.API_PATH + '/v1/company/delete/' + idCompany)
    }

    saveBusinessManager(business: BusinessManagerModel) {
        return this._httpClient.patch(AppSettings.API_PATH + '/v1/company/activate/' + business.companyId, business)
    }

    saveQuotesManager(quotes: QuotesManagerModel) {
        return this._httpClient.post(AppSettings.API_PATH + '/v1/company-quote/' + quotes.companyId, quotes)
    }

    getAllQuotesManager(companyId: number): Observable<Quotes[]> {
        return this._httpClient.get<Quotes[]>(AppSettings.API_PATH + '/v1/company-quote/' + companyId).pipe(
            tap((response: Quotes[]) => {
                this._data.next(response);
            })
        );
    }
}
