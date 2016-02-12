angular.module('app.servicesComp', [])


//http://frontmag.no/artikler/utvikling/offline-data-synchronization-ionic

.factory('competitionService', ['$q', competitionService]);

function competitionService($q) {  

	return {
		initDB : initDB,
        // We'll add these later.
        getAllCompetitions: getAllCompetitions,
        addCompetition: addCompetition,
        updateCompetition: updateCompetition,
        deleteCompetition: deleteCompetition
 
    };


var _competitions;


    function initDB() {
        // Creates the database or opens if it already exists
        _db = new PouchDB('shootv1');

    };

    function addCompetition(competition) { 
      //permet de classer les documents
     // entrainement._id = entrainement.Date.toJSON()+'/'+new Date().toJSON(); 
      return $q.when(_db.post(competition));
    };
    function updateCompetition(competition) {  
    return $q.when(_db.put(competition));
    };
    function deleteCompetition(competition) {  
    return $q.when(_db.remove(competition));
    };
    function getAllCompetitions() {  
      //return _entrainements;
      if (!_competitions) {
         return $q.when(_db.find({
                    selector: {type:"competition"}
                  }))
              .then(function(docs) {
                  // Each row has a .doc object and we just want to send an 
                  // array of birthday objects back to the calling controller,
                  // so let's map the array to contain just the .doc objects.
                  _competitions = docs.docs.map(function(row) {
                      // Dates are not automatically converted from a string.
                      //row.Date = new Date(row.Date);
                      return row;
                  });

                  // Listen for changes on the database.
                  _db.changes({ live: true, since: 'now', include_docs: true})
                     .on('change', onDatabaseChange);

                  return _competitions;
              });
      } else {
          // Return cached data as a promise
          return $q.when(_competitions);
      }
    };



  function onDatabaseChange(change) {  
    var index = findIndex(_competitions, change.id);
    var competition = _competitions[index];

        if (change.deleted) {
            if (competition) {
                _competitions.splice(index, 1); // delete
            }
        } else {
            if (competition && competition._id === change.id) {
                _competitions[index] = change.doc; // update
            } else {
                _competitions.splice(index, 0, change.doc) // insert
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