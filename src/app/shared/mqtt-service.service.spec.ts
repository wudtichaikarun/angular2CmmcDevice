import { TestBed, inject } from '@angular/core/testing';

import { MqttServiceService } from './mqtt-service.service';

describe('MqttServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MqttServiceService]
    });
  });

  it('should be created', inject([MqttServiceService], (service: MqttServiceService) => {
    expect(service).toBeTruthy();
  }));
});
