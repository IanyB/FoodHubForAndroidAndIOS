var app = app || {};

(function(a) {
    
    function getAll() {
        var locationString = app.latitude + "," + app.longitude;
        
        httpRequest.getJSON(app.servicesBaseUrl + locationString + "&oauth_token=XNAW3AJSCISM5YIRV2TXFMF4FI1ZZWX1C4PLITQATS5BJK1X&v=20130926")
        .then(function(places) {
            viewModel.set("places", places.response.venues); 
            console.log(places);
        });
    }
      
    var viewModel = kendo.observable({
        places:[],
        getAll: getAll,
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
       getAll();
    }   
    
    a.places = {
        init:init          
    };
}(app));;