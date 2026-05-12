import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      status: 200,
      message: 'The Crud-App is running successfully.',
      data: {
        name: 'Crud-App',
        version: '1.0.0',
        description: 'A simple crud application',
      },
    };
  }
}
