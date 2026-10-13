import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faReact,
  faLaravel,
  faJs,
  faGitAlt,
  faDocker,
  faTypescript,
  faHtml5,
  faCss3Alt,
  faTailwindCss,
  faGithub,
  faAngular,
  faFlutter,
  faPhp,
  faDev,
} from '@fortawesome/free-brands-svg-icons';

type Level = 'Débutant' | 'Intermédiaire' | 'Avancé';

interface Skill {
  couleur?: string;
  name: string;
  level: Level;
  icon?: IconDefinition;
  iconUrl?: string;
}

interface Category {
  title: string;
  icon: string;
  skills: Skill[];
  tags?: string[];
}

@Component({
  imports: [CommonModule, FaIconComponent],
  selector: 'app-skills-grid',
  styleUrl: './skills-grid.css',
  templateUrl: './skills-grid.html',
})
export class SkillsGrid implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private themeObserver?: MutationObserver;

  // Signal pour la gestion dynamique du thème
  isDarkMode = signal<boolean>(false);

  // icons
  faReact = faReact;
  faLaravel = faLaravel;
  faJs = faJs;
  faGit = faGitAlt;
  faDocker = faDocker;
  faTs = faTypescript;
  faCss3Alt = faCss3Alt;
  faHtml5 = faHtml5;
  faGithub = faGithub;
  faTailwind = faTailwindCss;
  faAngular = faAngular;
  faFlutter = faFlutter;
  faPhp = faPhp;
  faDev = faDev;

  categories: Category[] = [
    {
      title: 'Frontend',
      icon: '🗔',
      skills: [
        { name: 'React', level: 'Intermédiaire', icon: faReact, couleur: 'text-blue-500' },
        { name: 'Angular', level: 'Intermédiaire', icon: faAngular, couleur: 'text-red-500' },
        { name: 'Tailwind', level: 'Intermédiaire', icon: faTailwindCss, couleur: 'text-sky-500' },
        { name: 'HTML5', level: 'Avancé', icon: faHtml5, couleur: 'text-orange-500' },
        { name: 'CSS3', level: 'Avancé', icon: faCss3Alt, couleur: 'text-sky-500' }
      ]
    },
    {
      title: 'Backend',
      icon: '🗄',
      skills: [
        { name: 'PHP', level: 'Intermédiaire', icon: faPhp, couleur: 'text-violet-500' },
        { name: 'Laravel', level: 'Intermédiaire', icon: faLaravel, couleur: 'text-red-500' },
        { name: 'CodeIgniter', level: 'Intermédiaire', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg' }
      ]
    },
    {
      title: 'Environnement local & Architecture',
      icon: '⚙️',
      skills: [
        { name: 'Laragon', level: 'Débutant', iconUrl: 'https://laragon.org/logo.svg' },
        { name: 'XAMPP', level: 'Intermédiaire', iconUrl: 'https://www.apachefriends.org/images/xampp-logo-ac950edf.svg' },
        { name: 'phpMyAdmin', level: 'Intermédiaire', iconUrl: 'https://www.phpmyadmin.net/static/images/logo.svg?555b31447b6e' }
      ],
      tags: ['REST API', 'MVC', 'Microservices']
    },
    {
      title: 'Database',
      icon: '🗃',
      skills: [
        { name: 'MySQL', level: 'Débutant', icon: faDev, couleur: 'text-yellow-500' }
      ]
    },
    {
      title: 'DevOps & Outils',
      icon: '🚀',
      skills: [
        { name: 'Git', level: 'Débutant', icon: faGitAlt, couleur: 'text-orange-500' },
        { name: 'GitHub', level: 'Débutant', icon: faGithub, couleur: 'text-gray-400' }
      ]
    },
    {
      title: 'Mobile',
      icon: '📱',
      skills: [
        { name: 'React Native', level: 'Intermédiaire', icon: faReact, couleur: 'text-blue-500' },
        { name: 'Flutter', level: 'Débutant', icon: faFlutter, couleur: 'text-sky-500' }
      ]
    }
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode.set(document.documentElement.classList.contains('dark'));

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

  levelClass(level: Level): string {
    const isDark = this.isDarkMode();

    switch (level) {
      case 'Avancé':
        return isDark
          ? 'text-blue-300 bg-blue-950/80 border border-blue-800'
          : 'text-blue-600 bg-blue-50 border border-blue-100';
      case 'Intermédiaire':
        return isDark
          ? 'text-emerald-300 bg-emerald-950/80 border border-emerald-800'
          : 'text-emerald-600 bg-emerald-50 border border-emerald-100';
      default:
        return isDark
          ? 'text-gray-300 bg-slate-700 border border-slate-600'
          : 'text-gray-500 bg-gray-100 border border-gray-200';
    }
  }
}