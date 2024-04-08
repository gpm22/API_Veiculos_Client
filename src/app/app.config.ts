import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch())]
};

export const environment = {
  api_veiculos: 'http://localhost:8080/apiveiculos/v1',
  api_veiculos_vehicle: 'veiculo',
  api_veiculos_owner: 'usuario',
  api_veiculos_register_vehicle: 'registro-veiculo',
  api_fipe: 'https://parallelum.com.br/fipe/api/v1',
  api_fipe_brand: 'marcas',
  api_fipe_model: 'modelos',
  api_fipe_year: 'anos'
};