import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { SatelliteService, Satellite } from './satellite.service';

describe('SatelliteService', () => {
  let service: SatelliteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [], // This mocks the HttpClient
      providers: [SatelliteService]
    });

    service = TestBed.inject(SatelliteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch satellites via GET', () => {
    const dummySatellites: Satellite[] = [
      { id: 1, name: 'Sentinel-1', type: 'Radar', status: 'Active' },
      { id: 2, name: 'Sentinel-2', type: 'Optical', status: 'Active' }
    ];

    // 1. Call the service method
    service.getSatellites().subscribe(satellites => {
      expect(satellites.length).toBe(2);
      expect(satellites).toEqual(dummySatellites);
    });

    // 2. Expect an HTTP GET request to the correct URL
    const req = httpMock.expectOne('http://localhost:8080/api/satellites');
    expect(req.request.method).toBe('GET');

    // 3. Resolve the request by returning the dummy data
    req.flush(dummySatellites);
  });
});