import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Article} from '../../shared/article';
import {ArticleService} from '../../shared/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../auth/shared/auth.service';
import {UtilsService} from '../../../utils/shared/utils.service';
import {PermissionEnum} from '../../../users/shared/permission.enum';
import {ResourceFormComponent} from '../../../core/shared/resource-form.component';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent extends ResourceFormComponent implements OnInit {
  formImage: string;
  article: Article;
  pinArticlePermission = PermissionEnum.PinArticle;

  articleForm = this.fb.group({
    title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)
      ]
    ],
    excerpt: ['', [
        Validators.maxLength(200)
      ]
    ],
    body: ['', [
        Validators.required
      ]
    ],
    imageInput: [''],
    image: [''],
    is_pinned: [''],
  });

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private utilsService: UtilsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;

    this.route.queryParams.subscribe(params => {
      this.uuid = params['uuid'] || null;
    });

    this.initForm();
  }

  async initForm(): Promise<void> {
    this.ready = false;

    if(this.uuid) {
      this.article = await this.articleService.getArticle(this.uuid);
      if(this.article.user.uuid !== this.authService.currentUserValue.uuid && !this.authService.currentUserValue.hasPermission(PermissionEnum.EditAllArticle)) {
        this.article = null;
        this.hasError = true;
        this.errorMessage = "Vous n'avez pas la permission d'éditer l'article d'un autre auteur.";
      }

      this.patchForm();
    } else {
      this.article = null;
    }

    this.ready = true;
  }

  patchForm(): void {
    if(this.article) {
      this.articleForm.patchValue({
        title: this.article.title,
        excerpt: this.article.excerpt,
        body: this.article.body,
        is_pinned: this.article.isPinned,
      });

      this.formImage = this.article.image;
    }
  }

  onSubmit(): void {
    if(this.articleForm.invalid) {
      this.utilsService.markFormControlsAsTouched(this.articleForm);
    } else {
      this.ready = false;
      const formData = this.utilsService.formToFormData(this.articleForm.getRawValue());

      this.articleService.saveArticle(formData, this.uuid).subscribe({
        next: data => {
          this.router.navigate(['/articles/show'], {queryParams: {uuid: data.uuid}});
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
  }

  onFileChange(event): void {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const file = event.target.files.item(0);

      this.articleForm.patchValue({
        image: file
      });

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formImage = reader.result as string;
      };
    }
  }

  get title(): AbstractControl { return this.articleForm.get('title'); }

  get excerpt(): AbstractControl { return this.articleForm.get('excerpt'); }

  get body(): AbstractControl { return this.articleForm.get('body'); }

  get isPinned(): AbstractControl { return this.articleForm.get('is_pinned'); }
}
