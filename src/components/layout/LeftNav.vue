<template>
  <nav class="layout-paper fixed left-0 top-16 bottom-0 w-64 bg-paper border-r border-border overflow-y-auto flex flex-col">
    <div class="p-4 flex-1 flex flex-col">
      <!-- Main content area -->
      <div class="flex-1">
        <!-- GENERAL Section -->
        <div class="mb-4">
          <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">GENERAL</h3>
          <router-link
            to="/"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              isActive('/') ? 'accent-muted-bg bg-accent-muted text-text-primary' : 'text-text-secondary hover:bg-surface-hover'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span class="font-medium">Onboarding</span>
          </router-link>
        </div>

        <!-- MARKETPLACE Section -->
        <div class="mb-4">
          <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">MARKETPLACE</h3>
          <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-surface-hover transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Products</span>
          </a>
        </div>
      </div>

      <!-- QUICK NAVIGATION Section - Fixed to bottom -->
      <div class="mt-auto pt-4 border-t border-border">
        <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">QUICK NAVIGATION</h3>
        <div class="space-y-1">
          <a href="#" class="accent-text block px-3 py-2 text-accent hover:text-accent-hover text-sm">Documentation</a>
          <a href="#" class="accent-text block px-3 py-2 text-accent hover:text-accent-hover text-sm">Help Center</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>
