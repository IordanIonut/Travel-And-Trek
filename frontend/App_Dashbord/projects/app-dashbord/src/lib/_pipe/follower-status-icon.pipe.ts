import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'followerStatusIcon',
  standalone: true
})
export class FollowerStatusIconPipe implements PipeTransform {

  transform(state: string, enums: string[], iconName: string[]): string {
    const index = enums.indexOf(state);
    return iconName[index] || 'close';
  }

}
