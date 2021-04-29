import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'articleBody',
  pure: true
})
export class ArticleBodyPipe implements PipeTransform {

  transform(body: string): string {
    return body.replace(/\n/g, '<br>');
  }

}
