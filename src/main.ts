import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

(window as any).process = require('process/browser');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
