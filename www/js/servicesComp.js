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


var _competitions =[
     {
        "Name":"Stealing Cinderella",
        "artist":"Chuck Wicks",
        "image_small":"https://i.scdn.co/image/d1f58701179fe768cff26a77a46c56f291343d68",
        "image_large":"https://i.scdn.co/image/9ce5ea93acd3048312978d1eb5f6d297ff93375d"
     },
     {
        "Name":"Venom - Original Mix",
        "artist":"Ziggy",
        "image_small":"https://i.scdn.co/image/1a4ba26961c4606c316e10d5d3d20b736e3e7d27",
        "image_large":"https://i.scdn.co/image/91a396948e8fc2cf170c781c93dd08b866812f3a"
     },
     {
        "Name":"Do It",
        "artist":"Rootkit",
        "image_small":"https://i.scdn.co/image/398df9a33a6019c0e95e3be05fbaf19be0e91138",
        "image_large":"https://i.scdn.co/image/4e47ee3f6214fabbbed2092a21e62ee2a830058a"
     }
  ];


    function initDB() {
        // Creates the database or opens if it already exists
        _db = new PouchDB('shoot');

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
    	return $q.when(_competitions);
      
    };



	}