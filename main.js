window.onload = function() {
  var canvas = document.getElementById('main-canvas');
  var topCaption = document.getElementById('top-caption');
  var bottomCaption = document.getElementById('bottom-caption');
  var csl = document.getElementById('csl');
  var btnDownload = document.getElementById('download');
  var ctx = canvas.getContext('2d');

  var img = new Image();
  img.src = "/cat.jpg";

  ctx.font = "30px Impact";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";

  var drawImg = function() {
    ctx.drawImage(img, 0, 0, 300, 400);
  }

  var drawText = function(text, x, y) {
    var params = [text, x, y];
    ctx.fillText.apply(ctx, params);
    ctx.strokeText.apply(ctx, params);
  }

  var drawTextLine = function(text, top) {
    var lines = text.split("\n");
    for (ii = 0; ii < lines.length; ii++) {
      var wid = ctx.measureText(lines[ii]).width;
      var x = canvas.width / 2 - wid / 2;
      var y = (top ? 50 : 350) + 30 * ii;
      drawText(lines[ii], x, y);
    }
  }

  var drawWholeText = function() {
    topLine = topCaption.value.toUpperCase();
    bottomLine = bottomCaption.value.toUpperCase();
    drawTextLine(topLine, true);
    drawTextLine(bottomLine);
  }

  var render = function() {
    drawImg();
    drawWholeText();
  }
  topCaption.addEventListener("keyup", render, false);
  bottomCaption.addEventListener("keyup", render, false);

  img.addEventListener("load", function() {
    drawImg();
    drawWholeText();
  }, false);

  var downloadCanvas = function(link, filename) {
    link.href = canvas.toDataURL();
    link.download = filename;
  }

  btnDownload.addEventListener("click", function() {
    downloadCanvas(this, "foo.png");
  });
}
