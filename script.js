// Global canvas object
const Canvas = document.querySelector('canvas');

// const CardAspectRatio = 1.3858;
const CardAspectRatio = 0.7216;

// Height depends on width
// const CanvasWidth = window.innerWidth / 3;
// const CanvasHeight = CanvasWidth * CardAspectRatio;

const CanvasHeight = window.innerHeight;
const CanvasWidth = CanvasHeight * CardAspectRatio;

function LoadImage(url)
{
    // Create and load an image object. 
    // This is not attached to the DOM and is not part of the page.
    var image = new Image();
    console.log(`src: ${image.src}`);
    image.src = url;
    console.log(`src: ${image.src}`);
    return image;
}

// Main use for drawing the scaled card with proper aspect ratio
function LoadAndDrawImageScaled(url)
{
    var image = LoadImage(url);
    
    image.onload = function()
    {
        var ctx = Canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, CanvasWidth, CanvasHeight);
    }

    return image;
}

function LoadAndDrawImage(url)
{
    var image = LoadImage(url);

    image.onload = function()
    {
        var ctx = Canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
    }

    return image;
}

const Isaac = LoadImage("isaac.png");
const Character_UI = LoadAndDrawImageScaled("assets/character/Blank_Character.png");

function DrawInternal()
{
    var ctx = Canvas.getContext("2d");

    // background art
    ctx.drawImage(Isaac, 30, 0);

    // card UI
    ctx.drawImage(Character_UI, 0, 0, CanvasWidth, CanvasHeight);

    // card name
    var cardname = document.getElementById('card-name').value;
    ctx.font = "40px EdmundMcMillen";
    ctx.textAlign = "center";
    ctx.fillText(cardname, PercentToCanvasWidth(50), PercentToCanvasHeight(9));

    // character health
    ctx.font = "lighter 70px EdmundMcMillen";
    var charhealth = document.getElementById('character-health').value;
    ctx.fillText(charhealth, PercentToCanvasWidth(44), PercentToCanvasHeight(64.5));

    // character attack
    var charattack = document.getElementById('character-attack').value;
    ctx.fillText(charattack, PercentToCanvasWidth(66), PercentToCanvasHeight(64.5));

}

// When DOM is loaded, setup canvas details
window.addEventListener("DOMContentLoaded", function()
{
    Canvas.width  = CanvasWidth; 
    Canvas.height = CanvasHeight;

    DrawInternal();
});

window.onload=function()
{
    function Draw(event)
    {
        DrawInternal();
    }
    window.addEventListener("keyup", Draw, true);
    window.addEventListener("mouseup", Draw, true);
    Draw();
}

function PercentToCanvasWidth(percent)
{
    var cPercent = Canvas.width / 100;
    return cPercent * percent;
}

function PercentToCanvasHeight(percent)
{
    var cPercent = Canvas.height / 100;
    return cPercent * percent;
}