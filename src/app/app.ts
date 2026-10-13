import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Home } from './home/home';
import { MesProjets } from './mes-projets/mes-projets';
import { MesCompetences } from './mes-competences/mes-competences';
import { Contact } from './contact/contact';
import { APropos } from './apropos/apropos';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule, // Indispensable pour l'utilisation de [ngClass] dans app.html
    Header, 
    Home, 
    MesProjets, 
    MesCompetences, 
    Contact, 
    APropos
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private themeObserver?: MutationObserver;

  protected readonly title = signal('Portfolio');

  // Signal pour synchroniser le fond et le texte global dans app.html
  isDarkMode = signal<boolean>(true);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Détection de l'état initial
      this.isDarkMode.set(document.documentElement.classList.contains('dark'));

      // 2. Écoute dynamique de l'ajout/retrait de la classe 'dark' sur la balise <html>
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