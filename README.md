# @rebirth/rebirth-storage([![Build Status](https://travis-ci.org/greengerong/rebirth-storage.svg?branch=master)](https://travis-ci.org/greengerong/rebirth-storage))
> TypeScript storage module(memory, sessionStorage, localStorage) and @Cacheable decorator

## Install
```bash
npm install rebirth-storage --save
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
    export declare class StorageService {
        sessionStorage: Storage;
        localStorage: Storage;
        private defaultStorageType;
        private storages;
        constructor();
        setDefaultStorageType(storageType: StorageType): void;
        get({pool, key, storageType}: {
            pool?: string;
            key: string;
            storageType?: StorageType;
        }): Object;
        put({pool, key, storageType}: {
            pool?: string;
            key: string;
            storageType?: StorageType;
        }, value: Object): any;
        remove({pool, key, storageType}: {
            pool?: string;
            key?: string;
            storageType?: StorageType;
        }): any;
        removeAll({storageType}: {
            storageType?: StorageType;
        }): any;
    }
```
StorageType can be memory, sessionStorage, localStorage. Also can storage Rx, promise and normal object.


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

API:

```typescript
export declare function Cacheable({pool, key, storageType}?: {
    pool?: string;
    key?: string;
    storageType?: StorageType;
}): (target: any, name: string, methodInfo: any) => {
    value: (...args: any[]) => any;
};
```

## Build project

### run project

```bash
npm install -g typescript karma
npm install
typings install

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
