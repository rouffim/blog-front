import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../shared/article';
import {ArticleService} from '../../shared/article.service';
import {AuthService} from '../../../auth/shared/auth.service';
import {PermissionEnum} from '../../../users/shared/permission.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  error = false;
  article: Article;
  userCanEdit = false;
  userCanRemove = false;

  @Input() articleUuid: string;

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.articleService.getArticle(this.articleUuid)
      .then(article => this.initArticle(article))
      .catch(err => {
        this.error = true;
        console.log('Error loading article with uuid : ' + this.articleUuid + ', error : ' + err);
      });
  }

  initArticle(article: Article): void {
    this.article = article;

    if(this.authService.currentUserValue.hasPermission(PermissionEnum.EditAllArticle) ||
      (this.authService.currentUserValue.hasPermission(PermissionEnum.EditOwnArticle) && this.article.user.uuid === this.authService.currentUserValue.uuid)) {
      this.userCanEdit = true;
    }

    if(this.authService.currentUserValue.hasPermission(PermissionEnum.RemoveAllArticle) ||
      (this.authService.currentUserValue.hasPermission(PermissionEnum.RemoveOwnArticle) && this.article.user.uuid === this.authService.currentUserValue.uuid)) {
      this.userCanRemove = true;
    }
  }

  editArticle(): void {
    this.router.navigate(['/articles/edit'], {queryParams: {uuid: this.article.uuid}});
  }

  deleteArticle(): void {
    if(confirm('Etes-vous sûr de vouloir supprimer cet article ?')) {
      this.articleService.deleteArticle(this.articleUuid).subscribe({
        next: data => {
          this.router.navigate(['/']);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
  }

}
