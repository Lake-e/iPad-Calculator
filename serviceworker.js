let cache_name = "ipad-calc"; 

const ASSETS = [
    '/iPad-Calculator/index.html',
    'https://fonts.googleapis.com/css2?family=Inter:wght@226;240;300;400&display=swap',
    'https://img.icons8.com/ios/100/help.png',
    'https://img.icons8.com/ios/100/play-button-circled--v1.png',
    'https://img.icons8.com/ios/100/love-circled.png',
    'https://help.apple.com/assets/5D5C549A0946227A3D4D97C7/5D5C54AD0946227A3D4D97FB/en_US/cadc928b998b9ce31be75d6bffa0de65.png',
    "/iPad-Calculator",
    "/"
];

self.addEventListener("install", event => {
    console.log("installing...");
    event.waitUntil(
        caches
            .open(cache_name)
            .then(cache => {
                return cache.addAll(assets);
            })
            .catch(err => console.log(err))
    );
});
/*

self.addEventListener( "install", function( event ){
    event.waitUntil(
        caches.open( cache_name )
              .then(function( cache ){
            return cache.addAll([
                '/iPad-Calculator/index.html',
                'https://fonts.googleapis.com/css2?family=Inter:wght@226;240;300;400&display=swap'
            ]);
        })
    );
});
*/

self.addEventListener("fetch", event => {
    if (event.request.url === "https://lake-e.github.io/iPad-Calculator/index.html") {
        event.respondWith(
            fetch(event.request).catch(err =>
                self.cache.open(cache_name).then(cache => cache.match("/iPad-Calculator/index.html"))
            )
        );
    } else {
        event.respondWith(
            fetch(event.request).catch(err =>
                caches.match(event.request).then(response => response)
            )
        );
    }
});
