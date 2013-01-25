
$(document).ready(function () {
    $("#save").click(save_options);
    restore_options()
    
    $("map").contents().find("div");
    console.debug("options documentready function");
    console.debug(chrome.extension.getViews());
    
    
   $("#map").on("load", function() {
       console.debug($("#map").contents().find('html').html());
   });
   
});





// Saves options to localStorage.
function save_options() {
  console.debug("options restore_options function");
  var select = document.getElementById("color");
  var color = select.children[select.selectedIndex].value;
  localStorage["settings.latitude"] = "" ;
  localStorage["settings.longitude"] = "";
  
  localStorage["latitude"] = "";
  localStorage["longitude"] = "";
  // Update status to let user know options were saved.
  // var status = document.getElementById("status");
  // status.innerHTML = "Options Saved.";
  // setTimeout(function() {
    // status.innerHTML = "";
  // }, 750);
}
// Restores select box state to saved value from localStorage.
function restore_options() {
  console.debug("options restore_options function");
  console.debug(localStorage["favorite_color"]);
  var favorite = localStorage["favorite_color"];
  if (!favorite) {
    return;
  }
  var select = document.getElementById("color");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == favorite) {
      child.selected = "true";
      break;
    }
  }
}