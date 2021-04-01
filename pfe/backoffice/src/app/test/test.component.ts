import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
 @Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {
  Color = ['blue', 'black', 'brown', 'gold'];
  private firstsubscription: Subscription;
  ngOnInit() {
    const customobserver = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count > 3){
          observer.error(new Error('error'));
        }
        if (count === 5){
          observer.complete();
        }
        count++;
      }, 1000)
    });
    this.firstsubscription = customobserver.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }
  ngOnDestroy() {

  }
}
