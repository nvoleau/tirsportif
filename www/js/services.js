angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])
//http://frontmag.no/artikler/utvikling/offline-data-synchronization-ionic
.factory('EntrainementService', ['$q', EntrainementService]);

function EntrainementService($q) {  
    var _db;    

    // We'll need this later.
    var _entrainements;

    return {
        initDB: initDB,

        // We'll add these later.
        getAllEntrainements: getAllEntrainements,
        addEntrainement: addEntrainement,
        updateEntrainement: updateEntrainement,
        deleteEntrainement: deleteEntrainement
    };

    function initDB() {
        // Creates the database or opens if it already exists
        _db = new PouchDB('shoot');
    };

    function addEntrainement(entrainement) {  
      return $q.when(_db.post(entrainement));
    };
    function updateEntrainement(entrainement) {  
    return $q.when(_db.put(entrainement));
    };
    function deleteEntrainement(entrainement) {  
    return $q.when(_db.remove(entrainement));
    };
    function getAllEntrainements() {  
      if (!_entrainements) {
         return $q.when(_db.allDocs({ include_docs: true}))
              .then(function(docs) {

                  // Each row has a .doc object and we just want to send an 
                  // array of birthday objects back to the calling controller,
                  // so let's map the array to contain just the .doc objects.
                  _entrainements = docs.rows.map(function(row) {
                      // Dates are not automatically converted from a string.
                      //row.doc.Date = new Date(row.doc.Date);
                      return row.doc;
                  });

                  // Listen for changes on the database.
                  _db.changes({ live: true, since: 'now', include_docs: true})
                     .on('change', onDatabaseChange);

                  return _entrainements;
              });
      } else {
          // Return cached data as a promise
          return $q.when(_entrainements);
      }
    };
}

function onDatabaseChange(change) {  
    var index = findIndex(_entrainements, change.id);
    var entrainement = _entrainements[index];

    if (change.deleted) {
        if (entrainement) {
            _entrainements.splice(index, 1); // delete
        }
    } else {
        if (entrainement && entrainement._id === change.id) {
            _entrainements[index] = change.doc; // update
        } else {
            _entrainements.splice(index, 0, change.doc) // insert
        }
    }
}

// Binary search, the array is by default sorted by _id.
function findIndex(array, id) {  
    var low = 0, high = array.length, mid;
    while (low < high) {
    mid = (low + high) >>> 1;
    array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
}