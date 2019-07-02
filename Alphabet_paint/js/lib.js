var gif = document.getElementsByClassName("bGif");
var c = document.querySelector('canvas');
var cx = c.getContext('2d');
var mousedown = false;
var oldx = null;
var oldy = null;
var pixels = null;
var letterpixels = null;

$(".pyro").hide();
$(window).resize(function(){
  setupCanvas();
  resize();
  console.log("resized");
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

function drawletter(letter) {
  var centerx = (c.width - cx.measureText(letter).width) / 2;
  var centery = c.height / 2;
  cx.fillText(letter, centerx, centery);
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
      alert(x + "-----" + y);
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