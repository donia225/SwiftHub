import { TestBed } from '@angular/core/testing';

import { NotificationFeedbackService } from './notification-feedback.service';

describe('NotificationFeedbackService', () => {
  let service: NotificationFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
