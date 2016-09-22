import { NgModule, ModuleWithProviders } from '@angular/core';
import { REBIRTH_STORAGE_PROVIDERS } from './rebirth-storage';

@NgModule({
    providers: [
        ...REBIRTH_STORAGE_PROVIDERS
    ],
})
export class RebirthStorageModule {
}
