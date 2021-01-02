class Sicstus{

    static makeRequest(functionsicstus, params, callback_s, callback_e){
        var requestPort = 8081;
        var request = new XMLHttpRequest();
        var requestString = functionsicstus + "(";
        for(let param of params){
            requestString += param.toString();
        }

        requestString += ")";
        request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

        request.onload = callback_s || function(data){console.log("Request successful. Reply: " + data.target.response);};
        request.onerror = callback_e || function(){console.log("Error waiting for response");};

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send();
    }
}