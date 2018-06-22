$(document).ready(function () {

    var moviesShows = ["Game of Thrones", "Curb Your Enthusiasm", "Scrubs", "How I Met Your Mother", "The Office", "Silicon Valley", "Westworld", "Harry Potter", "The Avengers"]

    function displayGifs() {
        var movieShow = $(this).attr("data-name")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieShow + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            for (i = 0; i < response.data.length; i++) {
                var gifs = $("<div>");
                gifs.addClass("gifs");

                var rating = response.data[i].rating;
                var pRating = $("<p>").html("Rating: " + rating);
                pRating.addClass("text-center");

                var images = $("<img>");
                images.attr("src", response.data[i].images.fixed_height.url);

                gifs.append(pRating);
                gifs.prepend(images);

                $("#gif").prepend(gifs);
            }
        });
    }

    function renderButtons() {
        //Empties buttons each time one is rendered or generated to ensure the array is not repeated.
        $("#buttons").empty();

        for (i = 0; i < moviesShows.length; i++) {
            var a = $("<button>");
            a.addClass("button btn btn-secondary")
            a.attr("data-name", moviesShows[i]);
            a.text(moviesShows[i]);
            $("#buttons").append(a);
        }
    }

    $("#addMovieShow").on("click", function () {
        event.preventDefault();
        var movieShow = $("#userInput").val().trim();
        moviesShows.push(movieShow);
        renderButtons();
        $("#userInput").val("");
    })

    $(document).on("click", ".button", displayGifs)

    renderButtons();
});


