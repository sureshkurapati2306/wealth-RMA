import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class StorageService {

    getItem<T>(name: string): T | null {
        const value = sessionStorage.getItem(name);
        if(value) {
            return JSON.parse(value) as T;
        }

        return null;
    }

    setItem<T>(name: string, data: T): void {
        sessionStorage.setItem(name, JSON.stringify(data));
    }

    deleteItem(name: string): void {
        sessionStorage.removeItem(name);
    }

    clear(): void {
        sessionStorage.clear();
    }

}
