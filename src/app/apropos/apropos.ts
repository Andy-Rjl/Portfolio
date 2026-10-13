import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-apropos',
  styleUrl: './apropos.css',
  templateUrl: './apropos.html',
})
export class APropos implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private themeObserver?: MutationObserver;

  // Signal pour synchroniser le mode sombre dans apropos.html
  isDarkMode = signal<boolean>(false);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Détection de l'état initial du thème
      this.isDarkMode.set(document.documentElement.classList.contains('dark'));

      // 2. Écoute dynamique des changements de classe 'dark' sur la balise <html>
      this.themeObserver = new MutationObserver(() => {
        this.isDarkMode.set(document.documentElement.classList.contains('dark'));
      });

      this.themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }
  }

  ngOnDestroy() {
    this.themeObserver?.disconnect();
  }
}