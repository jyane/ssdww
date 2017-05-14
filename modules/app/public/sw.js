(function() {
  self.addEventListener('intstall', () => {
    self.skipWaiting();
    console.log('install');
  });

  self.addEventListener('activate', () => {
    console.log('activate');
  });

  self.addEventListener('push', (e) => {
    const body = e.data ? e.data.text() : 'e.data is null or undefined';
    e.waitUntil(
      self.registration.showNotification('test', {
        body,
        tag: 'a'
      })
    );
  }, false);
})();
