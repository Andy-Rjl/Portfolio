import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faSquareLinkedin, faSquareGithub, faSquareFacebook, faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import emailjs from '@emailjs/browser';

@Component({
  imports: [CommonModule, ReactiveFormsModule, FaIconComponent],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private fb = inject(FormBuilder);
  private themeObserver?: MutationObserver;

  contactForm!: FormGroup;
  isSubmitting = signal<boolean>(false);
  submitSuccess = signal<boolean>(false);
  submitError = signal<boolean>(false);

  // Signal pour la détection dynamique du thème
  isDarkMode = signal<boolean>(false);

  // Icônes
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faLocationDot = faLocationDot;
  faSquareLinkedin = faSquareLinkedin;
  faSquareGithub = faSquareGithub;
  faSquareFacebook = faSquareFacebook;
  faSquareWhatsapp = faSquareWhatsapp;

  ngOnInit() {
    // Initialisation du formulaire
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

    if (isPlatformBrowser(this.platformId)) {
      // 1. Détection initiale du thème
      this.isDarkMode.set(document.documentElement.classList.contains('dark'));

      // 2. Écoute dynamique de l'état du dark mode sur la balise <html>
      this.themeObserver = new MutationObserver(() => {
        this.isDarkMode.set(document.documentElement.classList.contains('dark'));
      });

      this.themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }
  }

  async sendEmail() {
    if (this.contactForm.invalid) return;

    this.isSubmitting.set(true);
    this.submitSuccess.set(false);
    this.submitError.set(false);

    try {
      // Remplacez ces valeurs par vos identifiants EmailJS
      const SERVICE_ID = 'service_cjkebpc';
      const TEMPLATE_ID = 'template_qnqak5f';
      const PUBLIC_KEY = '9aNCQjRUI6z2ZEpW1';

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, this.contactForm.value, PUBLIC_KEY);

      this.submitSuccess.set(true);
      this.contactForm.reset();
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
      this.submitError.set(true);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  ngOnDestroy() {
    this.themeObserver?.disconnect();
  }
}

// NAME: Gmail
// SERVICE_ID: service_cjkebpc