window.onload = function() {
  var canvas = document.getElementById('main-canvas');
  var captionInput = document.getElementById('captions');
  var csl = document.getElementById('csl');
  var btnDownload = document.getElementById('download');
  var ctx = canvas.getContext('2d');

  var img = new Image();
  img.src = "/cat.jpg";

  var drawImg = function() {
    ctx.drawImage(img, 0, 0, 300, 400);
  }
  var drawText = function(text, top) {
    ctx.font = "30px Impact";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    var position = top ? [10, 50] :[10, 350];


    var params = [text].concat(position);

    ctx.fillText.apply(ctx, params);
    ctx.strokeText.apply(ctx, params);
  }

  captionInput.addEventListener("keyup", function(){
    lines = captionInput.value.split("\n");
    topLine = lines[0];
    bottomLine = lines[1] || "";
    csl.innerHTML = topLine + "<br>" + bottomLine;
    drawImg();
    drawText(topLine, true);
    drawText(bottomLine);
  }, false);

  img.addEventListener("load", function() {
    drawImg();
    drawText("Write some awesome text", true);
  }, false);

  var downloadCanvas = function(link, filename) {
    link.href = canvas.toDataURL();
    link.download = filename;
  }

  btnDownload.addEventListener("click", function(){
    downloadCanvas(this, "foo.png");
  });
}
