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

            expect(JSON.parse(window.sessionStorage.getItem(pool)).test).toEqual(data);
            expect(storageService.get({ pool, key, storageType })).toEqual(data);

            storageService.remove({ pool, key, storageType });
            expect(JSON.parse(window.sessionStorage.getItem(pool))).toEqual({ test: null });
            expect(JSON.parse(window.sessionStorage.getItem(pool)).test).toBeNull();

            storageService.remove({ pool, storageType });
            expect(window.sessionStorage.getItem(pool)).toBeNull();
            done();

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

        afterEach(() => {
            sessionStorage.clear();
            localStorage.clear();
        });

    });

    describe('@Cacheable', () => {
        let data = { name: 'greengerong' };
        let http;

        class MockService {

            @Cacheable()
            request() {
                return http.getData();
            }

            @Cacheable({ pool: 'pool-key', storageType: StorageType.localStorage })
            requestLocalStorage() {
                return http.getData();
            }

            @Cacheable({ pool: 'pool-key', storageType: StorageType.sessionStorage })
            requestSessionStorage() {
                return http.getData();
            }
        }

        beforeEach(() => {
            http = jasmine.createSpyObj('http', ['getData']);
            http.getData.and.returnValue(data);
        });

        it('Should cache result to default memory', (done) => {
            let mockService = new MockService();
            let first = mockService.request();
            expect(http.getData).toHaveBeenCalledTimes(1);
            expect(first).toEqual(data);

            setTimeout(() => {
                let second = mockService.request();
                expect(second).toEqual(data);
                expect(second).not.toBe(first);
                expect(http.getData).toHaveBeenCalledTimes(1);
                done();
            });
        });

        it('Should cache result in class method to localStorage', (done) => {
            let mockService = new MockService();
            let first = mockService.requestLocalStorage();
            expect(http.getData).toHaveBeenCalledTimes(1);
            expect(first).toEqual(data);

            setTimeout(() => {
                let second = mockService.requestLocalStorage();
                expect(second).toEqual(data);
                expect(http.getData).toHaveBeenCalledTimes(1);
                done();
            });
        });

        it('Should cache result in class method to sessionStorage', (done) => {
            let mockService = new MockService();
            let first = mockService.requestSessionStorage();
            expect(http.getData).toHaveBeenCalledTimes(1);
            expect(first).toEqual(data);

            setTimeout(() => {
                let second = mockService.requestSessionStorage();
                expect(second).toEqual(data);
                expect(http.getData).toHaveBeenCalledTimes(1);
                done();
            });
        });

        afterEach(() => {
            sessionStorage.clear();
            localStorage.clear();
        });


    });
});
