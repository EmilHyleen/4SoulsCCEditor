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

const Character_UI = LoadAndDrawImageScaled("assets/character/Blank_Character.png");
const Eternal_Dash = LoadAndDrawImageScaled("assets/character/Eternal_Separator.png");
const Tap = LoadImage("assets/other/Tap.png");
const BackgroundPresets = [
    LoadImage("assets/backgrounds/Req_Character_Default.png"),
    LoadImage("assets/backgrounds/Req_Character_Arcade.png"),
    LoadImage("assets/backgrounds/Req_Character_Closet.png"),
    LoadImage("assets/backgrounds/Req_Character_Corpse.png"),
    LoadImage("assets/backgrounds/Req_Character_Cursed.png"),
    LoadImage("assets/backgrounds/Req_Character_Hell.png"),
    LoadImage("assets/backgrounds/Req_Character_Mines.png"),
    LoadImage("assets/backgrounds/Req_Character_Tainted.png")
];

var backgroundImage = null;
var customImage = LoadImage("isaac.png");

var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', HandleImage, false);
function HandleImage(e)
{
    var reader = new FileReader();
    reader.onload = function(event)
    {
        customImage.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function DrawInternal()
{
    var ctx = Canvas.getContext("2d");
    ctx.clearRect(0, 0, CanvasWidth, CanvasHeight);

    // background
    const SelectedBGPreset = parseInt(document.getElementById('card-background-selector').value);
    if (SelectedBGPreset != 0)
    {
        ctx.drawImage(backgroundImage, 0, 0, CanvasWidth, CanvasHeight);
    }

    // custom image scaling
    const IsScaleToCanvas = document.getElementById('scale-to-canvas-check').checked;

    var scaleX = customImage.width;
    var scaleY = customImage.height;
    if (IsScaleToCanvas)
    {
        scaleX = CanvasWidth;
        scaleY = CanvasHeight;
    }
    else
    {
        const ScaleMulti = document.getElementById('scaleSlider').value / 100;

        scaleX *= ScaleMulti;
        scaleY *= ScaleMulti;
    }

    // custom image rotation
    // const rotDeg = document.getElementById('rotationSlider').value;
    // context.save();
    // context.translate(canvas.width/2,canvas.height/2);
    // context.rotate(rotDeg * Math.PI/180);

    // custom image alignment
    var alignX = document.getElementById('alignXSlider').value;
    var alignY = document.getElementById('alignYSlider').value;

    // draw custom image
    ctx.drawImage(customImage, alignX, alignY, scaleX, scaleY);
    // context.restore();

    // card UI
    ctx.drawImage(Character_UI, 0, 0, CanvasWidth, CanvasHeight);

    // eternal separator dash
    ctx.drawImage(Eternal_Dash, 0, 30, CanvasWidth, CanvasHeight);

    // tap
    const IsTappable = document.getElementById('tappable-effect-check').checked;
    if (IsTappable)
    {
        ctx.drawImage(Tap, 30, 650, CanvasWidth / 7, CanvasHeight / 10);
    }

    // card name
    var cardname = document.getElementById('card-name').value;
    ctx.font = "40px EdmundMcMillen";
    ctx.textAlign = "center";
    ctx.fillText(cardname, PTCW(50), PTCH(9));

    // character health
    ctx.font = "lighter 70px EdmundMcMillen";
    var charhealth = document.getElementById('character-health').value;
    ctx.fillText(charhealth, PTCW(44), PTCH(64.5));

    // character attack
    var charattack = document.getElementById('character-attack').value;
    ctx.fillText(charattack, PTCW(66), PTCH(64.5));

    // character effect
    var rowName = "character-effect-r";
    ctx.font = "40px EdmundMcMillen";
    var rowHeight = 72;
    for (var i = 1; i <= 4; ++i)
    {
        var rowNameConcat = rowName.concat(i);
        
        var cardEffect = document.getElementById(rowNameConcat).value;
        ctx.fillText(cardEffect, PTCW(50), PTCH(rowHeight));
        rowHeight += 4;
    }

    // eternal
    ctx.font = "35px EdmundMcMillen";
    ctx.fillText("starting item:", PTCW(50), PTCH(89));

    ctx.font = "50px EdmundMcMillen";
    const eternal = document.getElementById('eternal-name').value;
    ctx.fillText(eternal, PTCW(50), PTCH(94));
}

function UpdateInternal()
{
    // background image
    const SelectedBGPreset = parseInt(document.getElementById('card-background-selector').value);
    if (SelectedBGPreset != 0)
    {
        backgroundImage = BackgroundPresets[SelectedBGPreset - 1];
    }

    // custom image
    const IsScaleToCanvas = document.getElementById('scale-to-canvas-check').checked;
    const IsCenterImageX = document.getElementById('center-image-check-x').checked;
    const IsCenterImageY = document.getElementById('center-image-check-y').checked;
    
    document.getElementById('scaleSlider').disabled = IsScaleToCanvas;
    document.getElementById('alignXSlider').disabled = IsCenterImageX;
    document.getElementById('alignYSlider').disabled = IsCenterImageY;

    const ScaleMulti = document.getElementById('scaleSlider').value / 100;
    
    const xSliderMin = 0 - (customImage.width * ScaleMulti);
    const xSliderMax = CanvasWidth + (customImage.width * ScaleMulti) / 2;
    const ySliderMin = 0 - (customImage.height * ScaleMulti);
    const ySliderMax = CanvasHeight + (customImage.height * ScaleMulti) / 2;
    this.document.getElementById("alignXSlider").setAttribute("min", xSliderMin);
    this.document.getElementById("alignXSlider").setAttribute("max", xSliderMax);
    this.document.getElementById("alignYSlider").setAttribute("min", ySliderMin);
    this.document.getElementById("alignYSlider").setAttribute("max", ySliderMax);
    
    if (IsCenterImageX)
    {
        var centerX = (CanvasWidth / 2) - ((customImage.width * ScaleMulti) / 2);

        document.getElementById('alignXSlider').value = centerX;
    }
    if (IsCenterImageY)
    {
        var centerY = (CanvasHeight / 2) - ((customImage.height * ScaleMulti) / 2);
        
        document.getElementById('alignYSlider').value = centerY;
    }

    // character effect
    var defaultEffect = [
        "play an additional",  
        "loot card this turn", 
        "",
        ""
    ];

    const IsDefaultEffect = document.getElementById('default-effect-check').checked;
    
    var rowName = "character-effect-r";
    for (var i = 1; i <= 4; ++i)
    {
        var rowNameConcat = rowName.concat(i);

        if (IsDefaultEffect)
        {
            document.getElementById(rowNameConcat).value = defaultEffect[i - 1];
        }
        document.getElementById(rowNameConcat).disabled = IsDefaultEffect;
    }
}

// When DOM is loaded, setup canvas details
window.addEventListener("DOMContentLoaded", function()
{
    Canvas.width  = CanvasWidth;
    Canvas.height = CanvasHeight;

    UpdateInternal();
    DrawInternal();
});

window.onload=function()
{
    function Update(event)
    {
        UpdateInternal();
    }
    window.addEventListener("input", Update, true);
    Update();

    function Draw(event)
    {
        DrawInternal();
    }
    window.addEventListener("input", Draw, true);

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

function PTCW(p)
{
    return PercentToCanvasWidth(p);
}

function PTCH(h)
{
    return PercentToCanvasHeight(h);
}