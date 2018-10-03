$(document).ready(function(){
 
  const LIMIT = 10;
  var animals = ["hamster", "cat", "quokka", "ostrich", "horse", "unicorn", "robin","butterfly", "panda", "elephant", "lion"];

  function displayGifs() {

  }


  // Renders the button at top of screen-- class = animal-button
  function renderButtons() {
    $(".button-panel").empty();
    for (var i = 0; i < animals.length; i++) {
      // var button = $("<button class=\"btn btn-info animal-button\">");
      var button = $("<button class=>");
      button.addClass("button btn-info animal-button");
      button.attr("data-value", animals[i]);
      button.text(animals[i]);
      $(".button-panel").append(button);
    }
  }

 // Event listener for the buttons at the top of the screen, triggers GIPHY search
$(document).on("click", ".animal-button", displayGifs); 

function displayGifs() {
    var animal = $(this).attr("data-value");
    console.log("Clicked on " + animal);
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + animal + "&limit=" + LIMIT;
      console.log(queryURL);

      $.ajax({
        url: queryURL,
        method: "GET"
      }) // After the data from the AJAX request comes back
      .then(function(response) {
        
        //console.log("there are " + response.data.length + " results");
        //console.log(response);
        for (var i = 0; i < response.data.length ; i++ ) {

          // Saving the image_original_url property
          var imageUrl = response.data[i].images.fixed_height_still.url;
          //console.log("imageUrl = " + imageUrl);
          var div = $("<div>");
          div.append($("<h3>").text(response.data[i].rating));
          // Creating and storing an image tag
          var animalImage = $("<img>");
          animalImage.addClass("gif");

          // Setting the animalImage src attribute to imageUrl
          animalImage.attr("src", response.data[i].images.fixed_height_still.url);
          animalImage.attr("alt", animal);
          animalImage.attr("data-still", response.data[i].images.fixed_height_still.url);
          animalImage.attr("data-animate", response.data[i].images.fixed_height.url)
          animalImage.attr("data-state", "still");
          
          // Prepending the animalImage to the div
          div.append(animalImage);
          $(".images").prepend(div);
      }
    });
  }
 
  // Event listener for still images to toggle them between still and animated 
  $(document).on("click", ".gif", toggleGif); 

  function toggleGif() { 
      console.log("toggle gif");
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    };

    $("#search-form").submit(function( event ) {
      event.preventDefault();
      console.log("clicked submit button");
      console.log("array before " + animals);

      var searchText = $("#animal-search").val().trim();
      console.log("search text = " + searchText);
      if (searchText !== null && searchText != "") {
        animals.push(searchText);
        console.log("array after" + animals);
        renderButtons();
      }
    });

    renderButtons();   
});