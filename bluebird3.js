var http=require('http');
var Bluebird=require('bluebird');

var getPromise=function(url){
    var promise=new Bluebird(function(resolve,reject){

    	var req = http.get(url, function(response) {
		  if(response.statusCode!=200){
              reject(new Error('ErrorCode '+response.statusCode))
            }	  
	      var result="";
          response.on('data',function(chunk){result +=chunk;} )
          response.on('end',function(){resolve(result);} ) 
	    });

	   req.on('error',function(err){
	     console.error('Error with the request:', err.message); 
	     reject(err); 
	   });

	   req.end();	
     }) 

    return promise;    
}
	        

getPromise("http://localhost:3000/post/get-all")
.then(function(data){
	console.log("Response 1 "+data)
	return getPromise("http://localhost:3000/post/get-by-id/5a7c33064da99064859c835a")
})
.then(function(data){
	console.log("Response 2 "+data)
	return getPromise("http://localhost:3000/post/get-by-id/5a7c31fea4842762cae78a21")
})
.then(function(data){
	console.log("Response 3 "+data)
})
.catch(function(err){
	console.error("Error "+err)
})