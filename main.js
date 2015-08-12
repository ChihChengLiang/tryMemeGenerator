window.onload = function() {
  var canvas = document.getElementById('main-canvas');
  var topCaption = document.getElementById('top-caption');
  var bottomCaption = document.getElementById('bottom-caption');
  var csl = document.getElementById('csl');
  var btnDownload = document.getElementById('download');
  var ctx = canvas.getContext('2d');

  var img = new Image();
  img.src = "/cat.jpg";

  var drawImg = function() {
    ctx.drawImage(img, 0, 0, 300, 400);
  }
  var drawTextLine = function(text, top) {
    ctx.font = "30px Impact";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    var position = top ? [10, 50] : [10, 350];


    var params = [text].concat(position);

    ctx.fillText.apply(ctx, params);
    ctx.strokeText.apply(ctx, params);
  }

  var drawWholeText = function() {
    topLine = topCaption.value;
    bottomLine = bottomCaption.value;
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
