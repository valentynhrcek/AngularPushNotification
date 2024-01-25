import { Component } from '@angular/core';
import { ServiceWorkerService } from './components/service-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(private workerService: ServiceWorkerService){}

  test(){
    this.workerService.pushToActivate();
  }
}
