import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface Projet {
  titre: string;
  categorie: string;
  image: string;
  description: string; // courte, sur la carte
  detail: string;      // longue, dans le modal
  technos: string[];
  lien?: string;
  github?: string;
}

@Component({
  imports: [CommonModule],
  selector: 'app-mes-projets',
  styleUrl: './mes-projets.css',
  templateUrl: './mes-projets.html',
})
export class MesProjets implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private themeObserver?: MutationObserver;

  // Signal pour la gestion dynamique du mode sombre
  isDarkMode = signal<boolean>(false);

  projets: Projet[] = [
    {
      titre: 'NirTuto',
      categorie: 'Web',
      image: 'assets/images/nirtuto.png',
      description: 'Plateforme de formations en ligne.',
      detail: "Plateforme de formations en ligne, vous pouvez suivre des cours n'importe quel moment et endroit. Vous pouvez également télécharger les cours pour les consulter hors-ligne. A la fin de chaque formation, vous receverez un certificat de réussite numerique que vous pouvez telechager.",
      technos: ['React', 'Tailwind', 'Laravel', 'MySql'],
      lien: 'https://elearning.tuto-info.com',
      github: 'https://github.com/Andy-Rjl/NirTuto',
    },
    {
      titre: 'Hiteny',
      categorie: 'Application mobile',
      image: 'assets/images/logohiteny.jpg',
      description: "Application d'apprentissage de la langue Malagasy.",
      detail: "Application mobile pour apprendre la langue Malagasy. Elle propose des leçons interactives, des quiz et un suivi de progression pour aider les utilisateurs à maîtriser le vocabulaire et la grammaire malagasy. Il est conçu pour les débutants et les apprenants avancés, offrant une expérience d'apprentissage complète et engageante. Vous pouvez également écouter la prononciation correcte des mots et phrases en malagasy. Cette application nous donne aussi l'opportunité de faire des traductions en malagasy et de faire des conversation avec un chatbot qui vous reponds en malagasy. L'application est disponible sur Android et iOS.",
      technos: ['React Native', 'JavaScript', 'Firebase'],
      github: 'https://github.com/Aurlando/Hiteny',
    },
    {
      titre: 'Portfolio',
      categorie: 'Web',
      image: 'assets/images/portfolio.png',
      description: 'Mon site personnel pour présenter mes travaux.',
      detail: "Site responsive construit avec Angular et Tailwind, animations légères et déploiement continu.",
      technos: ['Angular', 'Tailwind CSS', 'Vercel'],
      lien: 'https://portfolio-andyrjl.vercel.app/',
    },
  ];

  projetSelectionne = signal<Projet | null>(null);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Détection initiale du thème
      this.isDarkMode.set(document.documentElement.classList.contains('dark'));

      // 2. Écoute dynamique des changements de classe sur <html>
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

  ouvrirModal(p: Projet) {
    this.projetSelectionne.set(p);
  }

  fermerModal() {
    this.projetSelectionne.set(null);
  }
}