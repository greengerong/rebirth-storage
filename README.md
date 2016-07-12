# @rebirth/rebirth-storage
> TypeScript storage module(memory, sessionStorage, localStorage) and @Cacheable decorator

Thanks [Paldom/angular2-rest](https://github.com/Paldom/angular2-rest) given us the inspiration.

## Install
```bash
npm install rebirth-storage --save-dev
```

## How to use?

### StorageService for storage data

#### Register StorageService

```typescript
    import { REBIRTH_STORAGE_PROVIDERS } from 'rebirth-storage';
    
    bootstrap(AppComponent,[ ...REBIRTH_STORAGE_PROVIDERS]);
```
   
### rebirth-storage service

```typescript
    import { Injectable } from '@angular/core';
    import { StorageService } from  'rebirth-storage';
    
    @Injectable()
    export class StorageServiceDemo {
    
      constructor(private storageService: StorageService) {
      }
    
      
      demo() {
        this.storageService
      }
    }
```

### @Cacheable

```typescript
    import { Jsonp } from '@angular/http';
    import { Injectable } from '@angular/core';
    import { Observable }     from 'rxjs/Observable';
    import { Cacheable, StorageType } from 'rebirth-common';
    import config from 'config';
    
    @Injectable()
    export class QuestionService {
      constructor(private jsonp: Jsonp) {
      }
    
      @Cacheable({ pool: 'question' })
      getQuestions(): Observable<any> {
        return this.jsonp
          .get(config.question.url)
          .map(res => res.json().data);
      }
    }
```   

## Build project

### run project

```bash
npm install -g typescript karma webpack
npm install

```


### build

```bash
npm run build
```

### test(tslint, karma)

```bash
npm test
```

### API Doc

```bash
npm run docs
```
