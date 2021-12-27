import { Observable, of } from "rxjs";
import { map, take } from "rxjs/operators";

export class BaseStore<k,v> {

    private dict = new Map<k,v>();

    constructor(private readonly getFunction: (a: k) => Observable<v>) { }

    get(key: k): Observable<v> {
        if (this.dict.has(key)) {
            return of(this.dict.get(key));
        }

        this.dict.set(key, undefined);

        return this.getFunction(key)
            .pipe(take(1))
            .pipe(map((res: v) => {
                this.dict.set(key, res);
                return res;
            }));
    }
}