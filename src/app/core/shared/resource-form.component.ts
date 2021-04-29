import {User} from '../../users/shared/user';

export abstract class ResourceFormComponent {
  ready = false;
  hasError = false;
  errorMessage: string;
  uuid: string;
  currentUser: User;

  constructor(
  ) { }
}
