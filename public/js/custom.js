$(document).ready(function(){



//function for search information based in keyup event
$('#searcher').on('keyup',(function(e){
    //Validate if the searcher input is empty print all values of the ajax callback
    if($("#searcher").val() == "")
    {

          $("#div2 div").remove();//remove individual information if is showing
          $("#div1 #newElement").show();//show all the initial elements


    }
    else{ //if the searcher element has values make a filter
        //asign value for search to a variable
        var parameters = { search: $("#searcher").val() };
         //funtions related to nodejs routes for use
         $.get( '/variables',parameters, function(data) {
           var lookingFor = $("#searcher").val().toLowerCase(); //save in lowercase the value to search
           var expression = new RegExp(lookingFor, "i"); //save the value to seach in a regular expression
           $("#div1 #newElement").filter(function() {//return the element that match the criteria
               $(this).toggle($(this).text().toLowerCase().indexOf(lookingFor) > -1);//show the element if exists a coincidence
           });
        });
    }
}));//end funtion searcher

//function for show all the individual information
$( "a.mas" ).on("click",function(){
  /*get id of the "button" element for match the index in the ajax callback
    save it in a variable*/
    alert("s");
  var parameters = { ids: $(this).attr('id') };
  //funtions related to nodejs routes for use
  $.get( '/variables',parameters, function(data) {
    //addClass for styles of results
    $(".principal, .complement").addClass("col-12 col-md-6");
    $(".principal").removeClass("col-12");
    $("a.btn").removeClass("active");
    //erase the container for results for don't pile up results
    $("#div2 div").remove();
    //print the result of all information demanded
    $('<div id="newElement-'+parameters.ids+'" class="col text-center completo"><div class="text-right"><div id="element'+parameters.ids+'"></div><a type="button" class="btn closer" role="button" id="b-'+parameters.ids+'"><i class="fas fa-times-circle"></i></a></div><img src="'+data[parameters.ids]["picture"]["large"]+'" class="img-fluid rounded-circle" /><br><h3 class="mt-3">' +data[parameters.ids]["name"]["first"] +' ' +data[parameters.ids]["name"]["last"]+ '</h3><div class="moreinfo border py-5 px-3 mb-5"><div><label class="font-weight-bold">Email:</label><p> '+data[parameters.ids]["email"] +'</p></div><div><label class="font-weight-bold">Phone: </label><p> '+data[parameters.ids]["phone"]+'</p></div><div><label class="font-weight-bold">Cell: </label><p> '+data[parameters.ids]["cell"]+'</p></div><div><label class="font-weight-bold">Nationality: </label><p> '+data[parameters.ids]["nat"]+'</p></div><div><label class="font-weight-bold">Post Code: </label><p> '+data[parameters.ids]["location"]["postcode"]+'</p></div><div><label class="font-weight-bold">Location: </label><p> '+data[parameters.ids]["location"]["street"]+ ', ' + data[parameters.ids]["location"]["city"]+', '+ data[parameters.ids]["location"]["state"] +'</p></div></div></div>').prependTo($('#div2'));
    //addClass to indicate the "button" clicked
    $("a#"+parameters.ids).addClass("active");
    //disable the "button" to execute functionalite
    $("a#"+parameters.ids).unbind('click', true);
  });
});//end function show


//function for close the "all information" container
$( document ).on("click", ".closer" ,function(event) {
    var id = $(this).attr('id'); /*get the id of the "button" for close*/
    var ids = id.substr(2); /*return the number correspond to the close element to use as id matcher*/
    /* save the if for "match" and save in variable*/
    var parameters = { ids: ids };
    //funtions related to nodejs routes for use
    $.get( '/variables',parameters, function(data) {
      $("#newElement-"+parameters.ids).remove();//eliminite all elements in the Container
      //validate the "button" for show information and add classes for indicate if it is valiable for use it
      if($("a#"+parameters.ids).hasClass("disable"))
      {
        $("a#"+parameters.ids).addClass("active");
        $("a#"+parameters.ids).removeClass("disable");
      }else{
        $("a#"+parameters.ids).removeClass("active");
        $("a#"+parameters.ids).addClass("disable");
      }
      //addClass for styles of results
      $(".principal").removeClass("col-md-6");
      $(".principal").addClass("col-12");
      //active the "button" for show all information to execute functionalite
      ("a#"+parameters.ids).bind('click');
    });
});//end funtion close


});
