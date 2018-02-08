Bluebird = require('bluebird');

var blueBirdPromise = new Bluebird(
    function(resolve,reject){
        resolve('Something good happened');
        // reject('Something bad happened'); 
    }
);


blueBirdPromise.then(function(data){
    console.log("Response: " + data);
})
.catch(function(err){
    console.error("Error: " + err);
})