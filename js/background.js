// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var min = 1;
var max = 5;
var current = min;

//chrome.browserAction.onClicked.addListener(onRequest);

testobj = {}
testobj.popup = "popup.html"

chrome.browserAction.setPopup(testobj)





// var popups = chrome.extension.getViews({type: "tab"});
// console.debug(popups);
// if (popups.length != 0) {  
  // var popup = popups[0];
  //console.debug(popup);
  // popup.test();
// }




$(document).ready(function () {
   chrome.browserAction.setBadgeBackgroundColor({color:"#0000FF"});
   initSettings();
   update();
   setInterval(function(){update ()},900000);   
   
});
		
function initSettings()
{
	if (!localStorage["settings.height"])
      localStorage["settings.height"]= 350;
   if (!localStorage["settings.width"])
      localStorage["settings.width"] = 350;
   if (!localStorage["settings.period"])
      localStorage["settings.period"] = "1day";
      
	
}
      
      

function onRequest(request, sender, sendResponse) {
   update();

}

function test(){
   alert("test");
}


function update()
{   
console.debug("Updating")
if (localStorage["settings.latitude"] && localStorage["settings.longitude"]){
   console.debug(settings.longitude)
   loadinfo(localStorage["settings.longitude"],localStorage["settings.longitude"])
}
else
   navigator.geolocation.getCurrentPosition(foundLocation);

}



function foundLocation(position) {
   latitude = position.coords.latitude
   longitude = position.coords.longitude
   localStorage["latitude"] = latitude
   localStorage["longitude"] = longitude
   loadinfo(latitude,longitude);
}


function loadinfo(latitude, longitude)
{	
   console.debug(latitude,longitude);
   
   $.ajax({
    type: "GET",
    url: "http://api.temperatur.nu/tnu_1.12.php?lat="+ latitude + "&" + "lon=" + longitude + "&amm" + "&verbose&cli=calle12asdasdfasdffasdqedfasdfsdfgsdfrqwer13323333",
    dataType: "xml",
    success: HandleRequest 
    });		
}


   
// function updateIcon() {
  // chrome.browserAction.setIcon({path:"icon" + current + ".png"});
  // current++;

  // if (current > max)
    // current = min;
// }

//chrome.browserAction.onClicked.addListener(updateIcon);


function HandleRequest(xml) {   
   console.debug(xml);
   self.xml = xml;
   $(xml).find("item").each(function () {
      var title = $(this).find('title').text();
      chrome.browserAction.setBadgeText({text:$(this).find('temp').text()})
      chrome.browserAction.setTitle({title:$(this).find('title').text() +"\n"+ "Temp: " + $(this).find('temp').text() })
      localStorage["graph"] = $(this).find('graph').text();
      //temperatur = parseint($(this).find('title').text()) 
   }); 
}





