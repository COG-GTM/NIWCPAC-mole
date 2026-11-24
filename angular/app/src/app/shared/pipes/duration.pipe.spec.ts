import { DurationFromMillisecondsPipe, DurationToFormatPipe } from './duration.pipe';

describe('Duration pipes', () => {
  it('formats milliseconds as hh:mm:ss', () => {
    const duration = new DurationFromMillisecondsPipe().transform(3723000);
    expect(new DurationToFormatPipe().transform(duration, 'hh:mm:ss')).toBe('01:02:03');
  });

  it('passes null through', () => {
    expect(new DurationFromMillisecondsPipe().transform(null)).toBeNull();
    expect(new DurationToFormatPipe().transform(null, 'hh:mm:ss')).toBeNull();
  });
});
