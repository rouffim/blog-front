import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Article} from '../../shared/article';
import {ArticleService} from '../../shared/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../auth/shared/auth.service';
import {UtilService} from '../../../core/shared/util.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  articleUuid: string;
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
      this.articleUuid = params['uuid'] || null;;
    });

    this.initForm();
  }

  async initForm(): Promise<void> {
    if(this.articleUuid) {
      this.article = await this.articleService.getArticle(this.articleUuid);
    } else {
      this.article = null;
    }
  }

  onSubmit(): void {
    if(this.articleForm.invalid) {
      this.utilService.markFormControlsAsTouched(this.articleForm);
    } else {
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

  get title(): AbstractControl { return this.articleForm.get('title'); }

  get excerpt(): AbstractControl { return this.articleForm.get('excerpt'); }

  get body(): AbstractControl { return this.articleForm.get('body'); }
}
