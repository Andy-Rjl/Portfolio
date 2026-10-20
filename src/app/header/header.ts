import { Component, AfterViewInit, OnDestroy, inject, PLATFORM_ID, ChangeDetectorRef, signal, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface NavItem {
  label: string;
  id: string;
  colorClass: string;
}

@Component({
  imports: [CommonModule],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private observer?: IntersectionObserver;
  private mediaQuery?: MediaQueryList;
  private mediaListener = (e: MediaQueryListEvent) => this.updateMobile(e.matches);

  // Signal pour la section active
  activeSection = signal<string>('home');

  // Signal pour le mode sombre
  isDarkMode = signal<boolean>(true);

  // Signal : true si l'écran fait moins de 768px
  isMobile = signal<boolean>(false);

  // Signal pour gérer l'ouverture/fermeture du menu mobile
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  items: NavItem[] = [
    { label: 'Accueil', id: 'home', colorClass: 'text-emerald-500' },
    { label: 'A propos', id: 'apropos', colorClass: 'text-emerald-500' },
    { label: 'Projets', id: 'projets', colorClass: 'text-emerald-500' },
    { label: 'Compétences', id: 'competences', colorClass: 'text-emerald-500' },
    { label: 'Contact', id: 'contact', colorClass: 'text-emerald-500' },
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Détection mobile / desktop
      this.mediaQuery = window.matchMedia('(max-width: 767px)');
      this.updateMobile(this.mediaQuery.matches);
      this.mediaQuery.addEventListener('change', this.mediaListener);

      // Préférence enregistrée, sinon préférence du système
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
      this.setTheme(shouldBeDark);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initIntersectionObserver();
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.mediaQuery?.removeEventListener('change', this.mediaListener);
  }

  private updateMobile(matches: boolean) {
    this.isMobile.set(matches);
    if (!matches) {
      this.isMenuOpen.set(false); // referme le menu si on repasse en desktop
    }
  }

  toggleDarkMode() {
    this.setTheme(!this.isDarkMode());
  }

  private setTheme(isDark: boolean) {
    this.isDarkMode.set(isDark);
    if (isPlatformBrowser(this.platformId)) {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  scrollToSection(sectionId: string) {
    this.activeSection.set(sectionId);
    this.isMenuOpen.set(false); // ferme le menu mobile après un clic
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSection.set(entry.target.id);
          this.cdr.detectChanges();
        }
      });
    }, options);

    this.items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        this.observer?.observe(element);
      }
    });
  }
}