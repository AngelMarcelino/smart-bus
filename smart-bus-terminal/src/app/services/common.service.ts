import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  get apiOrigin(): string {
    return 'http://localhost:5000';
  }
}
