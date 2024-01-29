import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';
import { provideAnimations } from '@angular/platform-browser/animations';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZjUX1XcXVWQ2BUVUJzWg==');
platformBrowserDynamic([provideAnimations()]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
