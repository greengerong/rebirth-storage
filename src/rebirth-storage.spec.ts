import { StorageService, StorageType } from './rebirth-storage';

describe('rebirth storage', () => {

    describe('StorageService', ()=> {
        let storageService: StorageService;

        beforeEach(() => {
            storageService = new StorageService();
        });

        it('should storage data to session storage', () => {
            let data = { name: 'greengerong' };
            let pool = 'default-pool';
            let key = 'test';
            let storageType = StorageType.sessionStorage;
            storageService.put({
                    pool,
                    key,
                    storageType
                },
                data
            );

            expect(JSON.parse(sessionStorage.getItem(pool)).test).toEqual(data);
            expect(storageService.get({ pool, key, storageType })).toEqual(data);

            storageService.remove({ pool, key, storageType });
            expect(JSON.parse(sessionStorage.getItem(pool))).toEqual({ test: null });
            expect(JSON.parse(sessionStorage.getItem(pool)).test).toBeNull();

            storageService.remove({ pool, storageType });
            expect(sessionStorage.getItem(pool)).toBeNull();

        });

        it('should storage data to local storage', () => {
            let data = { name: 'greengerong' };
            let pool = 'default-pool';
            let key = 'test';
            let storageType = StorageType.localStorage;
            storageService.put({
                    pool,
                    key,
                    storageType
                },
                data
            );

            expect(JSON.parse(localStorage.getItem(pool)).test).toEqual(data);
            expect(storageService.get({ pool, key, storageType })).toEqual(data);

            storageService.remove({ pool, key, storageType });
            expect(JSON.parse(localStorage.getItem(pool))).toEqual({ test: null });
            expect(JSON.parse(localStorage.getItem(pool)).test).toBeNull();

            storageService.remove({ pool, storageType });
            expect(localStorage.getItem(pool)).toBeNull();

        });

        it('should storage data to memory', (done) => {
            let data = { name: 'greengerong' };
            let pool = 'default-pool';
            let key = 'test';
            let storageType = StorageType.memory;
            storageService.put({
                    pool,
                    key,
                    storageType
                },
                data
            );

            setTimeout(()=> {
                expect(storageService.get({ pool, key, storageType })).toEqual(data);
                storageService.remove({ pool, key, storageType });
                expect(storageService.get({ pool, key, storageType })).toBeNull();
                storageService.removeAll({ storageType });
                expect(storageService.get({ pool, key, storageType })).toBeNull();
                done();
            });


        });
    });

    describe('@Cacheable', ()=> {
        let data = 'greengerong';
        let http = jasmine.createSpyObj('http', ['getData']);
        http.getData.and.returnValue({ name: data });

        @Cacheable
        function mockRequest() {
            return http.getData();
        }

        it('Should get data from ', ()=> {
            
        });
    });
});
