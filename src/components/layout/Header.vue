<template>
  <header class="layout-paper bg-paper border-b border-border fixed top-0 left-0 right-0 z-50 h-16">
    <div class="flex items-center justify-between h-full px-6">
      <!-- Logo and Brand -->
      <div class="flex items-center gap-2">
        <div class="accent-bg w-8 h-8 bg-accent rounded flex items-center justify-center">
          <span class="text-inverse text-text-inverse font-bold text-sm">c</span>
        </div>
        <span class="text-text-primary font-semibold text-lg">candescent</span>
        <span class="bg-muted text-text-secondary text-xs px-2 py-0.5 rounded-full">DEV</span>
      </div>

      <!-- Search Bar -->
      <div class="flex-1 max-w-2xl mx-8">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search for apps, users, documentation (API, SDK) etc."
            class="w-full pl-10 pr-4 py-2 bg-input-bg border border-border-interactive rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>
      </div>

      <!-- User Actions -->
      <div class="flex items-center gap-4">
        <button class="p-2 text-text-secondary hover:text-text-primary">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button
          type="button"
          class="p-2 text-text-secondary hover:text-text-primary"
          :aria-label="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="themeStore.toggleTheme()"
        >
          <svg v-if="themeStore.isDark" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <span class="text-text-primary text-sm font-medium">DM</span>
          </div>
          <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useThemeStore } from '../../stores/themeStore'

const themeStore = useThemeStore()
</script>
