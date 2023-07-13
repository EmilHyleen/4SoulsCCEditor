// window.addEventListener("DOMContentLoaded", function()
// {
//     var image  = document.getElementById("image");
//     var canvas = document.querySelector('canvas');

//     canvas.width  = image.width;
//     canvas.height = image.height;

//     var context = canvas.getContext("2d");

//     context.drawImage(image, 0, 0);
// });

function loadAndDrawImage(url)
{
    // Create an image object. This is not attached to the DOM and is not part of the page.
    var image = new Image();

    // When the image has loaded, draw it to the canvas
    image.onload = function()
    {
        var c = document.querySelector('canvas');
        c.width  = image.width;
        c.height = image.height;

        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
    }

    // Now set the source of the image that we want to load
    image.src = url;
}

loadAndDrawImage("dubious.png");