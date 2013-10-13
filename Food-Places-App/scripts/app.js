var app = app || {};

(function() {
    
    document.addEventListener("deviceready", function() {
        
        app.servicesBaseUrl = "https://api.foursquare.com/v2/venues/search?ll=";
        app.DBSaved;
        app.SelectedItemLongitude;
        app.SelectedItemLatitude;
        app.SelectedItemTitle;
        app.index;
	    geolocationApp = new geolocationApp();
        geolocationApp.run();
        var kendoApp = new kendo.mobile.Application(document.body);
    });
    
    function geolocationApp() {
    }

    geolocationApp.prototype = {
    	_watchID:null,
        
    	run:function() {
    		var that = this;
    		document.getElementById("watchButton").addEventListener("click", function() {
    			that._handleWatch.apply(that, arguments);
    		}, false);
    	},
        
    	_handleRefresh:function() {
    		var options = {
    			enableHighAccuracy: true
    		},
    		that = this;
    		navigator.geolocation.getCurrentPosition(function() {
    			that._onSuccess.apply(that, arguments);
    		}, function() {
    			that._onError.apply(that, arguments);
    		}, options);
    	},
        
    	_handleWatch:function() {
    		var that = this,
    		// If watch is running, clear it now. Otherwise, start it.
    		button = document.getElementById("watchButton");
                         
    		if (that._watchID != null) {
    			that._setResults();
    			navigator.geolocation.clearWatch(that._watchID);
    			that._watchID = null;
                             
    			button.innerHTML = "Start Geolocation Watch";
    		}
    		else {
    			that._setResults("Waiting for geolocation information...");
    			// Update the watch every second.
    			var options = {
    				frequency: 1000,
    				enableHighAccuracy: true
    			};
    			that._watchID = navigator.geolocation.watchPosition(function() {
    				that._onSuccess.apply(that, arguments);
    			}, function() {
    				that._onError.apply(that, arguments);
    			}, options);
    			button.innerHTML = "Clear Geolocation Watch"; 
    		}
    	},
        
    	_onSuccess:function(position) {
            
            
            //app.longitude = position.coords.longitude.substr(0,5);
            //app.latitude = position.coords.latitude.substr(0,5);   
            app.longitude = position.coords.longitude;
            app.latitude = position.coords.latitude;     
            
    		// Successfully retrieved the geolocation information. Display it all.
            
    	   this._setResults("")
    	},
        
    	_onError:function(error) {
    		this._setResults('code: ' + error.code + '<br/>' +
    						 'message: ' + error.message + '<br/>');
    	},
        
    	_setResults:function(value) {
    		if (!value) {
    			document.getElementById("results").innerHTML = "";
    		}
    		else {
    			document.getElementById("results").innerHTML = value;
    		}
    	},
    }
}());