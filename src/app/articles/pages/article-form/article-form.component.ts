import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Article} from '../../shared/article';
import {ArticleService} from '../../shared/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../auth/shared/auth.service';
import {UtilService} from '../../../core/shared/util.service';
import {PermissionEnum} from '../../../users/shared/permission.enum';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  ready = false;
  hasError = false;
  errorMessage: string;
  articleUuid: string;
  formImage: string;
  article: Article;

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
    isPinned: [''],
  });

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.articleUuid = params['uuid'] || null;
    });

    this.initForm();
  }

  async initForm(): Promise<void> {
    this.ready = false;

    if(this.articleUuid) {
      this.article = await this.articleService.getArticle(this.articleUuid);
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
      });
    }
  }

  onSubmit(): void {
    if(this.articleForm.invalid) {
      this.utilService.markFormControlsAsTouched(this.articleForm);
    } else {
      this.ready = false;
      const formData = this.utilService.formToFormData(this.articleForm.getRawValue());

      this.articleService.saveArticle(formData).subscribe({
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
}
