<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const auth = useAuthStore();
const { isAuthenticated } = storeToRefs(auth);
const { t } = useI18n();
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container-narrow">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="text-primary">{{ t('home.title') }}</span>
            <span class="hero-subtitle">{{ t('home.subtitle') }}</span>
          </h1>
          <p class="hero-description">{{ t('home.description') }}</p>
          <p class="hero-tagline">
            {{ t('home.tagline') }}
          </p>

          <div class="hero-actions">
            <RouterLink v-if="isAuthenticated" to="/tournament" class="btn btn-primary btn-lg">
              {{ t('home.viewTournaments') }}
            </RouterLink>
            <button v-else class="btn btn-primary btn-lg" @click="auth.login('discord')">
              {{ t('home.getStarted') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section features">
      <div class="container-narrow">
        <h2 class="section-title">{{ t('home.whyTitle') }}</h2>
        <p class="section-description">{{ t('home.whyDescription') }}</p>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎮</div>
            <h3 class="feature-title">{{ t('home.features.tournamentManagement.title') }}</h3>
            <p class="feature-description">
              {{ t('home.features.tournamentManagement.description') }}
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📺</div>
            <h3 class="feature-title">{{ t('home.features.streamOverlays.title') }}</h3>
            <p class="feature-description">
              {{ t('home.features.streamOverlays.description') }}
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3 class="feature-title">{{ t('home.features.realTimeUpdates.title') }}</h3>
            <p class="feature-description">
              {{ t('home.features.realTimeUpdates.description') }}
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3 class="feature-title">{{ t('home.features.customizableDesign.title') }}</h3>
            <p class="feature-description">
              {{ t('home.features.customizableDesign.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="section how-it-works">
      <div class="container-narrow">
        <h2 class="section-title">{{ t('home.howItWorks.title') }}</h2>
        <p class="section-description">{{ t('home.howItWorks.description') }}</p>

        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3 class="step-title">{{ t('home.howItWorks.step1.title') }}</h3>
              <p class="step-description">
                {{ t('home.howItWorks.step1.description') }}
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3 class="step-title">{{ t('home.howItWorks.step2.title') }}</h3>
              <p class="step-description">
                {{ t('home.howItWorks.step2.description') }}
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3 class="step-title">{{ t('home.howItWorks.step3.title') }}</h3>
              <p class="step-description">
                {{ t('home.howItWorks.step3.description') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta">
      <div class="container-narrow">
        <div class="cta-card">
          <h2 class="cta-title">{{ t('home.cta.title') }}</h2>
          <p class="cta-description">
            {{ t('home.cta.description') }}
          </p>
          <div class="cta-actions">
            <button v-if="!isAuthenticated" class="btn btn-primary btn-lg" @click="auth.login('discord')">
              {{ t('auth.signInWith', { provider: t('auth.discord') }) }}
            </button>
            <button v-if="!isAuthenticated" class="btn btn-secondary btn-lg" @click="auth.login('google')">
              {{ t('auth.signInWith', { provider: t('auth.google') }) }}
            </button>
            <RouterLink v-else to="/tournament" class="btn btn-primary btn-lg">
              {{ t('home.cta.goToTournaments') }}
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

/* Hero Section */
.hero {
  padding: 6rem 0 4rem;
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-dim) 100%);
  border-bottom: 1px solid var(--color-surface-bright);
}

.hero-content {
  text-align: center;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
  letter-spacing: 0.02em;
}

.hero-subtitle {
  display: block;
  color: var(--color-text);
  font-size: 3rem;
  margin-top: 0.5rem;
}

.hero-description {
  font-size: 1.5rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
  font-weight: 500;
}

.hero-tagline {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Sections */
.section {
  padding: 4rem 0;
}

.section-title {
  text-align: center;
  margin-bottom: 1rem;
}

.section-description {
  text-align: center;
  font-size: 1.125rem;
  color: var(--color-text-muted);
  margin-bottom: 3rem;
}

/* Features Section */
.features {
  background: var(--color-surface-dim);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--color-surface);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow-s);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-m);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.feature-description {
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* How It Works Section */
.how-it-works {
  background: var(--color-surface);
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.step {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.step-number {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  background: var(--color-primary);
  color: oklch(0.15 0 264);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: var(--font-display);
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.step-description {
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* Tech Stack Section */
.tech-stack {
  background: var(--color-surface-dim);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.tech-item {
  text-align: center;
  padding: 1.5rem 1rem;
  background: var(--color-surface);
  border-radius: 8px;
  box-shadow: var(--shadow-s);
}

.tech-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.tech-desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

/* CTA Section */
.cta {
  background: linear-gradient(135deg, var(--color-surface-dim) 0%, var(--color-surface) 100%);
}

.cta-card {
  text-align: center;
  padding: 3rem 2rem;
  background: var(--color-surface-bright);
  border-radius: 16px;
  box-shadow: var(--shadow-l);
}

.cta-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-description {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1.25rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-actions,
  .cta-actions {
    flex-direction: column;
  }

  .btn-lg {
    width: 100%;
  }
}
</style>
