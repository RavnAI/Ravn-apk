// Register the service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch((err) => {
      console.error('SW registration failed', err);
    });
  });
}

// Install prompt
let deferredPrompt: any = null;
window.addEventListener('beforeinstallprompt', (e: Event) => {
  e.preventDefault();
  deferredPrompt = e;
  (window as any).__ravnInstall = () => {
    if (deferredPrompt) deferredPrompt.prompt();
    deferredPrompt = null;
  }
});
