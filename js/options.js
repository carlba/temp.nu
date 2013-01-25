
$(document).ready(function () {
   initEventHandlers();
   loadSettings();
   
});


function initEventHandlers() {
   $("#button-save").click(function() {
      $("#div-settings").find("input").each(function () {
         console.debug($(this));
         divid = $(this).attr("id");
         divtext = $(this).val();
         
         console.debug($(this).attr("id"));        
         
         concatname = "settings." + $(this).attr("id");
         console.debug(concatname );
         localStorage[concatname] = divtext
         
      });
   
   

   });
   
}


function loadSettings() {
   $("#height").val(localStorage["settings.height"]);
   $("#width").val(localStorage["settings.width"]);

}

// Saves options to localStorage.

