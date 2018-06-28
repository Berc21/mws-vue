importScripts("https://cdn.jsdelivr.net/npm/idb@2.1.3/lib/idb.min.js");


class IdbCRUD {

  constructor(dbname, version, objectStore, keyPath = null, autoIncrement = false) {
    if (typeof idb === 'undefined') {
      console.warn(`Please add idb library first,here's the cdn https://cdn.jsdelivr.net/npm/idb@2.1.2/lib/idb.min.js`)
    } else {

      this.dbname = dbname;
      this.version = version;
      this.objectStore = objectStore;
      this.keyPath = keyPath
      this.autoIncrement = autoIncrement;


      this.promise = idb.open(dbname, version, function (db) {
        if (!db.objectStoreNames.contains(objectStore)) {
          db.createObjectStore(objectStore, {
            keyPath: keyPath,
            autoIncrement: autoIncrement
          });
        }
      });

    }
  }

  deleteDB(dbname) {
    return indexedDB.deleteDatabase(dbname);
  }

  add(data) {
    return this.promise.then((db) => {
      const tx = db.transaction(this.objectStore, "readwrite");
      const store = tx.objectStore(this.objectStore);

      store.put(data);
      return tx.complete;
    });
  }

  addAll(array) {
    return array.map(data => this.add(data))
  }

  getAll() {
    return this.promise.then((db) => {
      const tx = db.transaction(this.objectStore, "readonly");
      const store = tx.objectStore(this.objectStore);
      return store.getAll();
    });
  }

  delete(id) {
    return this.promise.then((db) => {
      const tx = db.transaction(this.objectStore, "readwrite");
      const store = tx.objectStore(this.objectStore);
      store.delete(id);
      return tx.complete;
    });
  }

  deleteAll(st) {
    return this.promise
      .then((db) => {
        const tx = db.transaction(this.objectStore, 'readwrite');
        const store = tx.objectStore(this.objectStore);
        store.clear();
        return tx.complete;
      });
  }
}






workbox.skipWaiting();
workbox.clientsClaim();
// Cache static
workbox.routing.registerRoute(
  /\.(?:js|css|json)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static'
  })
);

workbox.routing.registerRoute(
  'https://api-maps.yandex.ru/2.1/?lang=en_US',
  workbox.strategies.staleWhileRevalidate(),
);

// Precache html files
workbox.precaching.precacheAndRoute([{
    url: '/',
    revision: '1',
  },
  {
    url: '/restaurant/',
    revision: '2',
  }
]);

// Cache requested images
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'img',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
);


self.addEventListener("sync", function (event) {
  if (event.tag == "idbFavSync") {

    let idbFavSync = new IdbCRUD("idbFavSync", 1, "favsSync", "id");
    let idbFavs = new IdbCRUD("favsDB", 1, "favs", "id");


    event.waitUntil(
      idbFavSync.getAll().then(data => {
        for (item of data) {
          const id = item.id;
          const fav = item.fav;

          fetch(`http://localhost:1337/restaurants/${id}/?is_favorite=${fav}`, {
              method: "PUT"
            })
            .then(res => res.json())
            .then(res => {
              fav ? idbFavs.add(res) : idbFavs.delete(res.id);
              console.log(res, "from idbFavSync sync");
              idbFavSync.delete(id);
            })
        }
      })
    );

  } else if (event.tag == "idbCommentSync") {
    let idbCommentSync = new IdbCRUD("idbCommentSync", 1, "commentSync", "idSync", true);
    let idbComments = new IdbCRUD("commentsDB", 1, "comments", "id");

    event.waitUntil(
      idbCommentSync.getAll().then(posts => {
          for(post of posts) {
            const url = "http://localhost:1337/reviews/";
             
            fetch(url, {
              method: "POST",
              headers: new Headers({
                "content-type": "application/json"
              }),
              body: JSON.stringify(post)
            }).then(res => res.json()).then(res => {
               
                idbComments.add(res);
                idbCommentSync.delete(post.idSync).then(() => console.log( post.idSync, "it's dleted"));
            });

          }
      })
    );

  }
});
