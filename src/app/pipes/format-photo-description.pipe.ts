import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhotoDescription',
  standalone: true,
})
export class FormatPhotoDescriptionPipe implements PipeTransform {
  transform(description: string): string {
    if (!description) return '';
    return description.charAt(0).toUpperCase() + description.slice(1);
  }
}
