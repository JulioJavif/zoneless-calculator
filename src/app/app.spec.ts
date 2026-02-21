import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeAll } from 'vitest';

import { App } from './app';

describe('App', () => {

  beforeAll(async () => {
    try {
      if (typeof process !== 'undefined' && process.versions.node) {
        const { readFileSync } = await import('node:fs');
        const { ɵresolveComponentResources: resolveComponentResources } = await import('@angular/core');

        await resolveComponentResources(url =>
          Promise.resolve(readFileSync(new URL(url, import.meta.url), 'utf-8'))
        );
      }
    } catch (error) {
      console.warn('Failed to resolve component resources. Tests may fail if components have external templates or styles.');
      return;
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, zoneless-calculator');
  });
});
