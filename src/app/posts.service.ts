import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

import { environment } from '../../src/environment-app'
import { Post } from "./post.model";

@Injectable({ providedIn: 'root' })
export class PostsService {
    error = new Subject<string>()
    
    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content }
        this.http.post<{ name: string }>(environment.apiUrl, postData)
            .subscribe((resData) => {
                console.log(resData)
            },
            error => {
                this.error.next(error.message);
            }
            )
    }

    fetchPosts() {
        let searchparams = new HttpParams();
        searchparams = searchparams.append('print', 'pretty');
        searchparams = searchparams.append('custom', 'key')
        return this.http.get<{ [key: string]: Post }>(environment.apiUrl, {
            headers: new HttpHeaders({'custom-headers': 'hello'}),
            params: searchparams
        })
            .pipe(map((resData) => {
                const postsArray: Post[] = [];
                for (const key in resData) {
                    if (resData.hasOwnProperty(key)) {
                        postsArray.push({ ...resData[key], id: key })
                    }
                }
                return postsArray;
            }),
            catchError(errorRes => {
               return throwError(errorRes)
            })
            )
    }

    deletePosts(){
        return this.http.delete(environment.apiUrl)
    }
}