import { Injectable } from '@angular/core';
//import { Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { PageObject } from './base/page-object';
import { Result } from './base/result';

import { BaseService } from './base/base.service';
import { MessageService } from 'primeng/components/common/messageservice';

import { Upload } from './upload';

@Injectable()
export class UploadService {

  //private headers = new Headers();
  protected url = environment.apiUrl + '/api/files';  // URL to web api
  //protected url = 'http://localhost:8880/api/files';  // URL to web api

  //private token: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
  }

  getDownloadUrl(): string {
    return this.url + '/';
  }

  getUploadUrl(): string {
    console.log(this.url + '/upload');
    return this.url + '/upload';
  }

  getBatchUploadUrl(): string {
    return this.url + '/batch-upload';
  }

  getImageUrl(): string {
    console.log(this.url + '/image');
    return this.url + '/image';
  }

  //用于生成uuid
  private S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  guid(): string {
    return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
  }

  list(type: string, refCode: string): Promise<Upload[]> {
    const url = `${this.url}/list?type=${type}&refCode=${refCode}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => {
        let ret = response as Result<Upload[]>;
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }

  delete(code: string): Promise<boolean> {
    const url = `${this.url}/delete/${code}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => {
        let ret = response as Result<any>;
        if (ret.errorcode == 0) {
          return true;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }

  // upload(type: string, refId: number): Promise<Upload[]> {
  //   const url = `${this.url}/update`;
  //   return this.http
  //     .get(url)
  //     .toPromise()
  //     .then(response => {
  //       let ret = response as Result<Upload[]>;
  //       if (ret.errorcode == 0) {
  //         return ret.data;
  //       }
  //       throw ret;
  //     })
  //     .catch(this.handleError.bind(this));
  // }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    if (this.messageService) {
      this.messageService.add({ severity: 'error', detail: error.errmsg || error.message || error });
    }
    return Promise.reject(error.errmsg || error.message || error);
  }
}