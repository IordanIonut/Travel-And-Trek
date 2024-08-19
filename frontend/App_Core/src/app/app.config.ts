import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  // Optional: Configures change detection strategy
    provideRouter(routes),  // Provides routing configuration
    provideClientHydration(),  // Enables server-side rendering (SSR) hydration
    provideAnimationsAsync(), provideAnimationsAsync(),  // Asynchronously provides animation support
  ],
};