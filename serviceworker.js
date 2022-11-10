self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open('my-site-name')
      .then(cache =>
        cache.addAll([
          'iPad-Calculator/index.html',
          'https://fonts.googleapis.com/css2?family=Inter:wght@226;240;300;400&display=swap'
        ])
      )
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})
