const Canvas = document.querySelector('canvas');

// Pixels
const CWidth = 1312;
const CHeight = 962;

function LoadImage(url)
{
    // Create and load an image object. This is not attached to the DOM and is not part of the page.
    var image = new Image();
    image.src = url;
    return image;
}

function LoadAndDrawImage(url)
{
    var image = LoadImage(url);

    // When the image has loaded, draw it to the canvas
    image.onload = function()
    {
        var ctx = Canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
    }

    return image;
}

function DrawImageScaled(img) 
{
    var ctx = Canvas.getContext("2d");
    var hRatio = Canvas.width  / img.width    ;
    var vRatio =  Canvas.height / img.height  ;
    var ratio  = Math.min ( hRatio, vRatio );
    var centerShift_x = ( Canvas.width - img.width*ratio ) / 2;
    var centerShift_y = ( Canvas.height - img.height*ratio ) / 2;  
    ctx.clearRect(0,0,Canvas.width, Canvas.height);
    ctx.drawImage(img, 0,0, img.width, img.height,
                      centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
}

const Base_Character_Img = LoadImage("assets/character/Base_Character.png");

// When DOM is loaded, setup canvas details
window.addEventListener("DOMContentLoaded", function()
{
    Canvas.width  = CWidth; 
    Canvas.height = CHeight;

    DrawImageScaled(Base_Character_Img);
});