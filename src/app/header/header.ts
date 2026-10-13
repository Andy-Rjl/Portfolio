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

  // Signal pour la section active
  activeSection = signal<string>('home');

  // Signal pour le mode sombre
  isDarkMode = signal<boolean>(true);

  items: NavItem[] = [
    { label: 'Accueil', id: 'home', colorClass: 'text-emerald-500' },
    { label: 'A propos', id: 'apropos', colorClass: 'text-emerald-500' },
    { label: 'Projets', id: 'projets', colorClass: 'text-emerald-500' },
    { label: 'Compétences', id: 'competences', colorClass: 'text-emerald-500' },
    { label: 'Contact', id: 'contact', colorClass: 'text-emerald-500' },
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Vérification des préférences utilisateur ou du localStorage
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: light)').matches;
      
      const shouldBeDark = savedTheme === 'light' || (!savedTheme && prefersDark);
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