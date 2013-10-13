function showDetail (e) {
    var viewModel = kendo.observable({
        data:{},
    });
    var data = app.DBSaved;
    //var data = window.localStorage.getItem("selected");
    var newDt = data;
        kendo.bind(e.view.element, viewModel);
        
    for (var i=0; i<newDt.length; i++)
    { 
        if(newDt[i].id == e.view.params.uid)
        {
            var model  = newDt[i];
            viewModel.set("data", model);
            app.SelectedItemTitle = model.name;
            app.SelectedItemLongitude = model.location.lng;
            app.SelectedItemLatitude = model.location.lat;
            console.log(model);
            break;
        }
    }
}