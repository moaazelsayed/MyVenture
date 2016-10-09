
var WindowsAzure = require('azure-mobile-apps-client');     
var client = new WindowsAzure.MobileServiceClient("http://myventure-table.azurewebsites.net");
var currlocation = '';
var timeRange = '';
var currActivities = '';
var currPriceRange = '';
var currRating = 0;

window.addInput = function (divName){
  var newdiv = document.createElement('div');
  newdiv.id = ("new-button");
  newdiv.innerHTML = divName;
  document.getElementById('price-button').removeChild(document.getElementById('new-button'));
  document.getElementById('price-button').appendChild(newdiv);
  currActivities = divName;
}

window.addInput2 = function (divName){
  var newdiv = document.createElement('div');
  newdiv.id = ("new-button2");
  newdiv.innerHTML = divName;
  document.getElementById('price-button2').removeChild(document.getElementById('new-button2'));
  document.getElementById('price-button2').appendChild(newdiv);
  currPriceRange = divName;
}

$(
  function(){

  $('#findButton').click(function(){

      findLocation();
  });

  function findLocation() {
    currlocation = document.getElementById('point0').value;
    currPriceRange = document.getElementById('point1').value;
     var item = { 
      Location: currlocation,
      Time: timeRange,
      Activities: currActivities,
      PriceRange: currPriceRange
    };
      client.getTable('myInfo').insert(item);
  }

  var hidden = true;
  $('#rateE').click(function(){
    addRating();
  });
  
  function addRating(){

    hidden = !hidden;
    if(hidden) {
        document.getElementById('camera').style.display = 'none';
        document.getElementById('frame').style.display = 'none';
    } else {
        document.getElementById('camera').style.display = 'block';
        document.getElementById('frame').style.display = 'block';
    }
  }
});
