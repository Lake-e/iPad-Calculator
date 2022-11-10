self.addEventListener('install', event => {
 console.log("SW install event")
  event.waitUntil(
    caches
      .open('ipad-calc')
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
        console.log("SW returning cache of: " + event.request)
        return response
      }
      console.log("SW -- no cache of: " + event.request)
      return fetch(event.request)
    })
  )
})
