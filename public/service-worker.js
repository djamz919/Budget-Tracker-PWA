const APP_PREFIX = 'BudgetTracker-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION
const FILES_TO_CACHE = [
  "./index.html",
  "./manifest.html",
  "./css/style.css",
  "./js/idb.js",
  "./js/idb.js"
];

// Respond with cached resources
self.addEventListener("fetch", function(e) {

})

// Cache resources
self.addEventListener("install", function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log("Installing cache : " + CACHE_NAME);
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Delete outdated caches
self.addEventListener("activate", function(e) {
    e.waitUntil(
        caches.keys.then(function(keyList) {
            let cacheKeepList = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            })
            cacheKeepList.PUSH(CACHE_NAME);

            return Promise.all(keyList.map(function (key, i) {
                if (cacheKeepList.indexOf(key) === -1) {
                    console.log("Deleting cache : " + keyList[i]);
                    return caches.delete(keyList[i]);
                }
            }));
        })
    );
});