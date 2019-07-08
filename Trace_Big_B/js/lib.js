var gif = document.getElementsByClassName("bGif");
var c = document.querySelector('canvas');
var cx = c.getContext('2d');
var mousedown = false;
var oldx = null;
var oldy = null;
var pixels = null;
var letterpixels = null;
var count = ["images/B-Writing.gif","images/B-Writing.gif","images/B-Writing.gif"];
var i = 0;
var gifX, gifY

$(".pyro").hide();

$(window).resize(function(){
  setupCanvas();
  resize();
 // console.log("resized");
});

$(document).ready(function(){
  setInterval(function(){
    i++;
    if(i>=count.length){i=0;}
    //console.log(i);
    $(".bGif").attr("src",count[i]);
  },4000);
});

function resize(){
  gif.width = window.innerWidth;
  gif.height = window.innerHeight;
}
 
function setupCanvas() {
  c.height = window.innerHeight;
  c.width = window.innerWidth;
  cx.lineWidth = 20;
  cx.lineCap = 'round';
  cx.strokeStyle = 'rgb(216, 216, 42)';
  cx.font = 'bold 300px helvetica';
  cx.fillStyle = 'rgb(204, 255, 255)';
  cx.textBaseline = 'middle';
  drawletter('B');
  pixels = cx.getImageData(0, 0, c.width, c.height);
  letterpixels = getpixelamount(204, 255, 255);
}

var measureFontHeight = function (canvas, fontStyle) {
    var context = canvas.getContext("2d");

    var sourceWidth = canvas.width;
    var sourceHeight = canvas.height;

    context.font = fontStyle;
    
    // place the text somewhere
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("a", 25, 5);

    // returns an array containing the sum of all pixels in a canvas
    // * 4 (red, green, blue, alpha)
    // [pixel1Red, pixel1Green, pixel1Blue, pixel1Alpha, pixel2Red ...]
    var data = context.getImageData(0, 0, sourceWidth, sourceHeight).data;

    var firstY = -1;
    var lastY = -1;

    // loop through each row
    for(var y = 0; y < sourceHeight; y++) {
        // loop through each column
        for(var x = 0; x < sourceWidth; x++) {
            //var red = data[((sourceWidth * y) + x) * 4];
            //var green = data[((sourceWidth * y) + x) * 4 + 1];
            //var blue = data[((sourceWidth * y) + x) * 4 + 2];
            var alpha = data[((sourceWidth * y) + x) * 4 + 3];

            if(alpha > 0) {
                firstY = y;
                // exit the loop
                break;
            }
        }
        if(firstY >= 0) {
            // exit the loop
            break;
        }

    }

    // loop through each row, this time beginning from the last row
    for(var y = sourceHeight; y > 0; y--) {
        // loop through each column
        for(var x = 0; x < sourceWidth; x++) {
            var alpha = data[((sourceWidth * y) + x) * 4 + 3];
            if(alpha > 0) {
                lastY = y;
                // exit the loop
                break;
            }
        }
        if(lastY >= 0) {
            // exit the loop
            break;
        }

    }

    return {
        // The actual height
        height: lastY - firstY,

        // The first pixel
        firstPixel: firstY,

        // The last pixel
        lastPixel: lastY
    } 

};

var $canvas = $("#myCanvas");
var fontStyle = "bold 300px helvetica";
var fontMeasurement = measureFontHeight($canvas[0], fontStyle);


function drawletter(letter) {
  var centerx = (c.width - cx.measureText(letter).width) / 2;
  var centery = c.height / 2;
 // console.log(cx.measureText(letter).width);
  cx.fillText(letter, centerx, centery);
  //console.log(fontMeasurement.height+40)
  if(OSName == "Mac/iOS"){
    console.log($(window).width());
    $('.bGif').css('left',centerx+17+'px').css('top',centery-(fontMeasurement.height)+42+'px').css('width',cx.measureText(letter).width-30+'px');
  }else{
    $('.bGif').css('left',centerx+20+'px').css('top',centery-(fontMeasurement.height)+30+'px').css('width',cx.measureText(letter).width-40+'px');
  }
};




function showerror(error) {
  mousedown = false;
  //alert(error);
};

function paint(x, y) {
  var colour = getpixelcolour(x, y);
  if (colour.a === 0) {
    //showerror('you are outside');
    return false;
  } else {
    cx.beginPath();
   /*  if (oldx > 0 && oldy > 0) {
      cx.moveTo(oldx, oldy);
    } */
    cx.lineTo(x, y);
    cx.stroke();
    cx.closePath();
    oldx = x;
    oldy = y;
  }
};

function getpixelcolour(x, y) {
  var index = ((y * (pixels.width * 4)) + (x * 4));
  return {
    r: pixels.data[index],
    g: pixels.data[index + 1],
    b: pixels.data[index + 2],
    a: pixels.data[index + 3]
  };
}

function getpixelamount(r, g, b) {
  var pixels = cx.getImageData(0, 0, c.width, c.height);
  var all = pixels.data.length;
  var amount = 0;
  for (i = 0; i < all; i += 4) {
    if (pixels.data[i] === r &&
        pixels.data[i + 1] === g &&
        pixels.data[i + 2] === b) {
      amount++;
    }
  }
  return amount;
};

function pixelthreshold() {
  if (getpixelamount(216, 216, 42) / letterpixels > 0.35) {
    //alert('you got it!');
    $(".pyro").show();
  }
};

function onmousedown(ev) {
  mousedown = true;
  ev.preventDefault();
};
function onmouseup(ev) {
 // alert("start");
  mousedown = false;
  pixelthreshold();
  ev.preventDefault();
};
function onmousemove(ev) {
  if(ev.type === "touchmove"){
      var x = ev.touches[0].clientX;
      var y = ev.touches[0].clientY;
     // alert(x + "-----" + y);
      paint(x, y);
  } else {
      var x = ev.clientX;
      var y = ev.clientY;
      if (mousedown) {
      paint(x, y);
      }
  }
};

/* $("canvas").on('touchmove',function(e){
  e.preventDefault();
  alert("hi");
  onmousemove(e);
  alert("bye");
});
$("canvas").on('touchend',function(e){
  e.preventDefault();
  onmousedown(e);
});
$("canvas").on('touchstart',function(e){
  alert("hi");
  e.preventDefault();
  onmouseup(e);
  alert("bye");
});
$(".bGif").on('touchstart',function(){
  $(".bGif").hide();
}); */
c.addEventListener('mousedown', onmousedown, false);
c.addEventListener('mouseup', onmouseup, false);
c.addEventListener('mousemove', onmousemove, false);

c.addEventListener('touchend', onmousedown, false);
c.addEventListener('touchstart', onmouseup, false);
c.addEventListener('touchmove', onmousemove, false);

setupCanvas();
$(".bGif").on("click", function(){
  $(".bGif").hide();
});