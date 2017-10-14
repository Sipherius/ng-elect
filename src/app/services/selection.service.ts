import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const selection = [
      { id: 0,  name: 'Zero' },
    ];
    return {selection};
  }
}
