import { StorageService, StorageType, Cacheable } from './rebirth-storage';

describe('rebirth storage', () => {

    describe('StorageService', () => {
        let storageService: StorageService;

        beforeEach(() => {
            storageService = new StorageService();
        });

        it('should storage data to session storage', (done) => {
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

            setTimeout(() => {
                expect(JSON.parse(window.sessionStorage.getItem(pool)).test).toEqual(data);
                expect(storageService.get({ pool, key, storageType })).toEqual(data);

                storageService.remove({ pool, key, storageType });
                expect(JSON.parse(window.sessionStorage.getItem(pool))).toEqual({ test: null });
                expect(JSON.parse(window.sessionStorage.getItem(pool)).test).toBeNull();

                storageService.remove({ pool, storageType });
                expect(window.sessionStorage.getItem(pool)).toBeNull();
                done();
            });

        });

        it('should storage data to local storage', (done) => {
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

            setTimeout(() => {
                expect(JSON.parse(window.localStorage.getItem(pool)).test).toEqual(data);
                expect(storageService.get({ pool, key, storageType })).toEqual(data);

                storageService.remove({ pool, key, storageType });
                expect(JSON.parse(window.localStorage.getItem(pool))).toEqual({ test: null });
                expect(JSON.parse(window.localStorage.getItem(pool)).test).toBeNull();

                storageService.remove({ pool, storageType });
                expect(window.localStorage.getItem(pool)).toBeNull();
                done();
            });

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

            setTimeout(() => {
                expect(storageService.get({ pool, key, storageType })).toEqual(data);
                storageService.remove({ pool, key, storageType });
                expect(storageService.get({ pool, key, storageType })).toBeNull();
                storageService.removeAll({ storageType });
                expect(storageService.get({ pool, key, storageType })).toBeNull();
                done();
            });


        });
    });

    describe('@Cacheable', () => {
        let data = 'greengerong';
        let http = jasmine.createSpyObj('http', ['getData']);
        http.getData.and.returnValue({ name: data });

        @Cacheable
        function mockRequest() {
            return http.getData();
        }

        //
        // it('Should get data from ', ()=> {
        //
        // });
    });
});
