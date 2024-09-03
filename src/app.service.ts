import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getNaut(): string {
    return 'Hello Naut!';
  }
  getEmna(): string {
    return 'yo emna';
  }
  postQuery(): string {
    return 'Queryyy';
  }
  postParams(): string {
    return 'Params';
  }
  postBody(name: string): string {
    return 'yoooo to ' + name;
  }
}
