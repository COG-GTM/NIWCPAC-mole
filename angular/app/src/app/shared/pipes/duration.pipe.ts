import { Pipe, PipeTransform } from '@angular/core';
import { Duration } from 'luxon';

/*
    Local replacements for the luxon-angular duration pipes
    (luxon-angular 3.x is a View Engine library, unsupported since Angular 16).
*/

@Pipe({
    name: 'durationFromMilliseconds'
})
export class DurationFromMillisecondsPipe implements PipeTransform {
    transform(value: number | null | undefined): Duration | null {
        return value == null ? null : Duration.fromMillis(value);
    }
}

@Pipe({
    name: 'durationToFormat'
})
export class DurationToFormatPipe implements PipeTransform {
    transform(value: Duration | null | undefined, format: string): string | null {
        return value == null ? null : value.toFormat(format);
    }
}
