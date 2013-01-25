	$(document).ready(function () {
      
      
      loadSettings();
      initEventHandlers();
      console.debug("Popup js loaded");      

      
      
      background = chrome.extension.getBackgroundPage();
      loadinfo();
      
      console.debug(background.xml);
      
      
      $("#div-info").find("input").each(function () {
         console.debug($(this));
         divid = $(this).attr("id");
         divtext = $(this).text();
         
         console.debug($(this).attr("id"));
         
         value = $(background.xml).find("item").find(divid).text()
         if (isNaN(value)) {            
            $(this).val(value);            
         }
         else {
            value = roundNumber(parseFloat(value),1);
            $(this).val(value);            
         }
      });
      
      // $(background.xml).find("item").each(function () {
         // $(this).children().each(function () {
            // if (this.tagName != "url" && this.tagName != "graph" && this.tagName != "id" && $(this).text() !="") {
               // $("#leftdiv").append(this.tagName + "<br>");            
               // $("#rightdiv").append('<div id ="' + this.tagName + '">' + $(this).text() + '</div>');
            // }
            // else if (this.tagName == "title") {
               // $("#leftdiv").append(this.tagName + "<br>");            
               // $("#rightdiv").append('<a href ="' +  + '">' + $("#title").text() + '</a>');
               // $('a').attr('target', '_blank');
               
            // }
         // });
      // });
      
      // $("#title").html('<a href = "' + $(background.xml).find("item").find("url").text() + '">' + $("#title").text() + '</a>');
      // $('a').attr('target', '_blank');
	});
   
function testfunction() {
   console.debug("Testfunction reached");
}

function loadinfo()
{	
	if (localStorage["settings.latitude"] && localStorage["settings.longitude"]){
      loadinfo(localStorage["settings.longitude"],localStorage["settings.longitude"])
   }
   else
      console.debug("No latitude or longitude stored");
   
   $.ajax({
    type: "GET",
    url: "http://api.temperatur.nu/tnu_1.12.php?lat="+ localStorage["latitude"] + "&" + "lon=" + localStorage["longitude"] + "&graph" + '&span=' + localStorage["settings.period"] + '&x=' + localStorage["settings.width"] + '&y=' + localStorage["settings.height"]  +"&verbose&cli=calle122asdfasdqedfasdfrqasdfwer13323333",
    dataType: "xml",
    success: HandleRequest 
    });		
}      
      
function HandleRequest (xml) {
   html = '<img id ="graphimg" src=' + $(xml).find("item").find("graph").text() + "></img>";
   $("#div-graph").html(html);
   console.debug(xml);
   $(".div-info").find("input:text").each(function () {
      $(this).val($(chrome.extension.getBackgroundPage().xml).find($(this).attr("id")).text());  
   });
   
}


function loadSettings() {
   $("#range").val(localStorage["settings.period"]);
   console.debug(localStorage["settings.period"]);



}

function initEventHandlers() {
   $("#range").change(function () {
      localStorage["settings.period"] = $("#range :selected").val();
      loadinfo();
      console.debug($("#range :selected").val());
      console.debug(localStorage["settings.period"]);
      
   });

}