import { Observable, of } from "rxjs";
import { catchError, finalize, map, take } from "rxjs/operators";

export class BaseStore<k,v> {

    private dict = new Map<string,v>();

    constructor(private readonly getFunction: (a: k) => Observable<v>) { }

    get(key: k): Observable<v> {

        const dictKey = JSON.stringify(key);

        if (this.dict.has(dictKey)) {
            return of(this.dict.get(dictKey));
        }

        // this.dict.set(dictKey, undefined);

        return this.getFunction(key)
            .pipe(
                map((res: v) => {
                    if (res === undefined) {
                        this.dict.delete(dictKey);
                    } else {
                        this.dict.set(dictKey, res);
                    }
                    return res;
                }),
                catchError(err => {
                    console.log(err);
                    this.dict.delete(dictKey);
                    return of(undefined);
                }),
            );
    }
}