import {WeatherApiService} from "./weather-api.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {LocalStorageService} from "../../local-storage/local-storage.service";


describe('WeatherApiService', () => {
  let service: WeatherApiService;
  let httpClientMock: HttpTestingController;
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        WeatherApiService,
      ],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(WeatherApiService);
    httpClientMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('searchLocation', () => {
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=SWEdn1BA0HiTYlB6iop1q1nmsUrrhvR3&q=mock&language=en-us';
    const searchTerm = 'mock';
    it('should call search api with api key and search term', () => {
      service.searchLocation(searchTerm).subscribe();
      const {request} = httpClientMock.expectOne(url);
      expect(request.method).toBe('GET');
    });

    it('should save the response in the cache', () => {
      service.searchLocation(searchTerm).subscribe();
      const testRequest = httpClientMock.expectOne(url);
      testRequest.flush({key: 1234});
      expect(service['getFromCache'](searchTerm)).toEqual({key: 1234});
    });

    it('should not call api when search term exists in cache', () => {
      service['cacheResponse'](searchTerm, {key: 1234});
      service.searchLocation(searchTerm).subscribe();
      httpClientMock.expectNone(url);
      expect(true).toBe(true); // just for prevent warnings - if expectNone fails it will error
    });

    it('should save the cache in the local storage', () => {
      spyOn(LocalStorageService, 'setItem').and.callThrough();
      service.searchLocation(searchTerm).subscribe();
      const testRequest = httpClientMock.expectOne(url);
      testRequest.flush({key: 1234});
      expect(LocalStorageService.setItem).toHaveBeenCalledWith({
        key: 'apiRequests',
        item: service['searchTermCache']
      });
    });
  });

  describe('getCurrentWeather', () => {
    const locationKey = 'mock';
    const url = `http://dataservice.accuweather.com/currentconditions/v1/mock?apikey=SWEdn1BA0HiTYlB6iop1q1nmsUrrhvR3&details=false`;

    it('should call get current weather api with api key and location key', () => {
      service.getCurrentWeather(locationKey).subscribe();
      const {request} = httpClientMock.expectOne(url);
      expect(request.method).toBe('GET');
    });

    it('should save the response in the cache', () => {
      service.getCurrentWeather(locationKey).subscribe();
      const testRequest = httpClientMock.expectOne(url);
      testRequest.flush({WeatherText: 'Great'});
      expect(service['getFromCache'](locationKey + '_current')).toEqual({WeatherText: 'Great'});
    });

    it('should not call api when search term exists in cache', () => {
      service['cacheResponse'](locationKey + '_current', {WeatherText: 'Great'});
      service.getCurrentWeather(locationKey).subscribe();
      httpClientMock.expectNone(url);
      expect(true).toBe(true); // just for prevent warnings - if expectNone fails it will error
    });

    it('should save the cache in the local storage', () => {
      spyOn(LocalStorageService, 'setItem').and.callThrough();
      service.getCurrentWeather(locationKey).subscribe();
      const testRequest = httpClientMock.expectOne(url);
      testRequest.flush(1);
      expect(LocalStorageService.setItem).toHaveBeenCalledWith({
        key: 'apiRequests',
        item: service['searchTermCache']
      });
    });
  });

  describe('getForecast', () => {
    const locationKey = 'mock';
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/mock?apikey=SWEdn1BA0HiTYlB6iop1q1nmsUrrhvR3&details=false`;

    it('should call get current weather api with api key and location key', () => {
      service.getForecast(locationKey).subscribe();
      const {request} = httpClientMock.expectOne(url);
      expect(request.method).toBe('GET');
    });

    it('should save the response in the cache', () => {
      service.getForecast(locationKey).subscribe();
      const testRequest = httpClientMock.expectOne(url);
      testRequest.flush({WeatherText: 'Great'});
      expect(service['getFromCache'](locationKey + '_5day')).toEqual({WeatherText: 'Great'});
    });

    it('should not call api when search term exists in cache', () => {
      service['cacheResponse'](locationKey + '_5day', {WeatherText: 'Great'});
      service.getForecast(locationKey).subscribe();
      httpClientMock.expectNone(url);
      expect(true).toBe(true); // just for prevent warnings - if expectNone fails it will error
    });

    it('should save the cache in the local storage', () => {
      spyOn(LocalStorageService, 'setItem').and.callThrough();
      service.getForecast(locationKey).subscribe();
      const testRequest = httpClientMock.expectOne(url);
      testRequest.flush(1);
      expect(LocalStorageService.setItem).toHaveBeenCalledWith({
        key: 'apiRequests',
        item: service['searchTermCache']
      });
    });
  });

});
