import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faReact, faLaravel, faJs, faGitAlt, faDocker, faTypescript, faCss3Alt, faGithub, faTailwindCss, faAngular } from '@fortawesome/free-brands-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [CommonModule, FontAwesomeModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private themeObserver?: MutationObserver;
  private mediaQuery?: MediaQueryList;
  private mediaListener = (e: MediaQueryListEvent) => this.updateMobile(e.matches);

  // Signal pour la détection du mode sombre dans home.html
  isDarkMode = signal<boolean>(false);


  // Signal : true si l'écran fait moins de 768px
  isMobile = signal<boolean>(false);

  // images
  image: string = "assets/images/andy.png";

  // icons
  faReact = faReact;
  faLaravel = faLaravel;
  faJs = faJs;
  faGit = faGitAlt;
  faDocker = faDocker;
  faTs = faTypescript;
  faCss3Alt = faCss3Alt;
  faGithub = faGithub;
  faTailwind = faTailwindCss;
  faAngular = faAngular;
  fadownload = faDownload;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Détection mobile / desktop
      this.mediaQuery = window.matchMedia('(max-width: 767px)');
      this.updateMobile(this.mediaQuery.matches);
      this.mediaQuery.addEventListener('change', this.mediaListener);

      // 1. Détection de l'état initial du thème
      this.isDarkMode.set(document.documentElement.classList.contains('dark'));

      // 2. Écoute dynamique des changements de classe 'dark' sur <html> faits par le Header
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

  private updateMobile(matches: boolean) {
    this.isMobile.set(matches);
  }
}