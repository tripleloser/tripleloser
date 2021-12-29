import { Observable, of } from "rxjs";
import { map, take } from "rxjs/operators";

export class BaseStore<k,v> {

    private dict = new Map<string,v>();

    constructor(private readonly getFunction: (a: k) => Observable<v>) { }

    get(key: k): Observable<v> {

        const dictKey = JSON.stringify(key);

        if (this.dict.has(dictKey)) {
            return of(this.dict.get(dictKey));
        }

        this.dict.set(dictKey, undefined);

        return this.getFunction(key)
            .pipe(take(1))
            .pipe(map((res: v) => {
                this.dict.set(dictKey, res);
                return res;
            }));
    }
}