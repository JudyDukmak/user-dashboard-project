import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule,provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    HttpClientModule,
  ]
})
.catch(err => console.error(err));