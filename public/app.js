
//import * as WindowsAzure from 'azure-mobile-apps-client';

var WindowsAzure = require('azure-mobile-apps-client');     
var client = new WindowsAzure.MobileServiceClient("http://myventure-table.azurewebsites.net");

window.addInput = function (divName){
  var newdiv = document.createElement('div');
  newdiv.id = ("new-button");
  newdiv.innerHTML = divName;
  document.getElementById('price-button').removeChild(document.getElementById('new-button'));
  document.getElementById('price-button').appendChild(newdiv);
}

$('#findButton').click(function(){
    findLocation();
});
    
function findLocation() {

   var item = { test: 'Item 1', complete: false };
    client.getTable('myInfo').insert(item);
}

//module.exports = addInput;

//$(document).ready(addInput);
