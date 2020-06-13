import { Observable } from 'rxjs';

export default interface Picture {
  url: string;
  authorId: string;
  tags: string;
  title: string;
  metadata: Observable<any>;
}
