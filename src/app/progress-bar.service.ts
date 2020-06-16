import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressBar {
  show = false;
  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'indeterminate';
  value: number;

  constructor() { }
}
