import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const maxAge = 1200000;
@Injectable()
export class RequestCache {

    cache = new Map();

    post(req: HttpRequest<any>) {
        const url = req.urlWithParams;
        return "";
    }

    get(req: HttpRequest<any>): HttpResponse<any> | undefined {
        const url = req.urlWithParams;
        if (req.method == 'GET') {
            const cached = this.cache.get(url);
           
            if (!cached) {
                return undefined;
            }
            const isExpired = cached.lastRead < (Date.now() - maxAge);
            const expired = isExpired ? 'expired ' : '';
            return cached.response;
        } 
    }

    put(req: HttpRequest<any>, response: HttpResponse<any>): void {
        const url = req.url;
        const entry = { url, response, lastRead: Date.now() };
        this.cache.set(url, entry);
        const expired = Date.now() - maxAge;
        this.cache.forEach(expiredEntry => {
            if (expiredEntry.lastRead < expired) {
                this.cache.delete(expiredEntry.url);
            }
        });
    }
}