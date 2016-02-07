angular.module('app.services', [])


//http://frontmag.no/artikler/utvikling/offline-data-synchronization-ionic

.factory('entrainementService', ['$q', entrainementService]);

function entrainementService($q) {  
    var _db;    

    // We'll need this later.
    var _entrainements;

    return {
        initDB: initDB,

        // We'll add these later.
        getAllEntrainements: getAllEntrainements,
        addEntrainement: addEntrainement,
        updateEntrainement: updateEntrainement,
        deleteEntrainement: deleteEntrainement,
        getLastEntrainement:getLastEntrainement
    };

    function initDB() {
        // Creates the database or opens if it already exists
        _db = new PouchDB('shoot');

       _db.createIndex({
            index: {
              fields: ['Date'],
              name:'indDate'

            }
          })
    };

    function addEntrainement(entrainement) { 
      //permet de classer les documents
     // entrainement._id = entrainement.Date.toJSON()+'/'+new Date().toJSON(); 
      return $q.when(_db.post(entrainement));
    };
    function updateEntrainement(entrainement) {  
    return $q.when(_db.put(entrainement));
    };
    function deleteEntrainement(entrainement) {  
    return $q.when(_db.remove(entrainement));
    };
  function getAllEntrainements() {  

    //return _entrainements;
      if (!_entrainements) {
         return $q.when(_db.find({
                    selector: {Date: {'$gt': null}},
                    use_index:'indDate',
                    sort:[{Date:'asc'}]

                  }))
              .then(function(docs) {
                  // Each row has a .doc object and we just want to send an 
                  // array of birthday objects back to the calling controller,
                  // so let's map the array to contain just the .doc objects.
                  _entrainements = docs.docs.map(function(row) {
                      // Dates are not automatically converted from a string.
                      row.Date = new Date(row.Date);
                      return row;
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

    

//https://github.com/nolanlawson/pouchdb-find
    function getLastEntrainement(){
      console.log("getLastEntrainement");
       return $q.when(_db.find({
                    selector: {Date: {'$gt': null}},
                    use_index:'indDate',
                    sort:[{Date:'desc'}],
                    limit:1

                  }))
              .then(function(docs) {
               // console.log(docs)
                  // Each row has a .doc object and we just want to send an 
                  // array of birthday objects back to the calling controller,
                  // so let's map the array to contain just the .doc objects.
                  var d ;

                  d = docs.docs.map(function(row) {
                      // Dates are not automatically converted from a string.
                      row.Date = new Date(row.Date);
                      return row;
                  });
                      
        
//console.log(d)

                  return d;
              });
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

}



