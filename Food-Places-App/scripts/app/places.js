var app = app || {};

(function(a) {
    
    function getAll() {
        var locationString = app.latitude + "," + app.longitude;
        var rawPlaces = [];
        
        httpRequest.getJSON(app.servicesBaseUrl + locationString + "&oauth_token=XNAW3AJSCISM5YIRV2TXFMF4FI1ZZWX1C4PLITQATS5BJK1X&v=20130926")
        .then(function(raw) {
            var rawFoodPlaces = raw.response.venues;
            for (var i=0; i<30; i++)
            { 
                if(rawFoodPlaces[i].categories.length != 0){
                    if(rawFoodPlaces[i].categories[0].shortName == "Pizza" || 
                       rawFoodPlaces[i].categories[0].shortName == "Restaurant" ||
                       rawFoodPlaces[i].categories[0].shortName == "Bakery" ||
                       rawFoodPlaces[i].categories[0].shortName == "Diner"  ||
                       rawFoodPlaces[i].categories[0].shortName == "Eastern Restaurant" ||
                       rawFoodPlaces[i].categories[0].shortName == "Cupcakes" ||
                       rawFoodPlaces[i].categories[0].shortName == "Chinese"
                    )
                    {
                       rawPlaces.push(rawFoodPlaces[i]);
                    } 
                }
            }
            
          viewModel.set("places", rawPlaces); 
          app.DBSaved = rawPlaces; 
          //window.localStorage.setItem("selected", rawPlaces);
          console.log(app.DBSaved);
        })
   }
    
    var viewModel = kendo.observable({
        places:[],
        getAll: getAll
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
       getAll();
    }   
    
    a.places = {
        init:init          
    };
}(app));