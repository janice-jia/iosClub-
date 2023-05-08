//rem字体自适应
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
    };
 
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);



//弹出层
function showid(idname) {
    var newbox = document.getElementById(idname);
    newbox.style.zIndex = "9999999";
    newbox.style.display = "block"
    newbox.style.position = "fixed";
    newbox.style.top = newbox.style.left = "50%";
    newbox.style.marginTop = -newbox.offsetHeight / 2 + "px";
    newbox.style.marginLeft = -newbox.offsetWidth / 2 + "px";
    var layer = document.createElement("div");
    layer.id = "layer";
    layer.style.width = layer.style.height = "100%";
    layer.style.position = "fixed";
    layer.style.top = layer.style.left = layer.style.bottom = 0;
    layer.style.backgroundColor = "#000";
    layer.style.zIndex = "9999998";
    layer.style.opacity = "0.8";
    document.body.appendChild(layer);
    window.onresize = function() {
        newbox.style.marginTop = -newbox.offsetHeight / 2 + "px";
        newbox.style.marginLeft = -newbox.offsetWidth / 2 + "px";
    }
    layer.onclick = function() {
        newbox.style.display = "none";
        document.body.removeChild(layer);
        layer.style.width = layer.style.height = "100%";
    };
    layer.ontouchmove = function(e) {
        e.preventDefault && e.preventDefault();
        e.returnValue = false;
        e.stopPropagation && e.stopPropagation();
        return false;
    }
}

function hideid(idname) {
    var newbox = document.getElementById(idname);
    newbox.style.display = "none";
    var layer = document.getElementById("layer");
    document.body.removeChild(layer);
}

//弹出层结束


//选项卡用js
function nTabs(thisObj, Num, active, normal) {
    if (thisObj.className == active) return;
    var tabObj = thisObj.parentNode.id;
    var tabList = document.getElementById(tabObj).getElementsByTagName("li");
    for (i = 0; i < tabList.length; i++) {
        if (i == Num) {
            thisObj.className = active;
            document.getElementById(tabObj + "_Content" + i).style.display = "block";

        } else {
            tabList[i].className = normal;
            document.getElementById(tabObj + "_Content" + i).style.display = "none";
        }
    }
    return void(0);

}

$(document).ready(function(){
    var oDiv = document.getElementById('touchMove');

    var disX, moveX, L, T, starX, starY, starXEnd, starYEnd;

    oDiv.addEventListener('touchstart', function (event) {
        //event.preventDefault();
        $('#touchMove img').removeClass('imgFilter')
        disX = event.touches[0].clientX - this.offsetLeft;
        disY = event.touches[0].clientY - this.offsetTop;
        starX = event.touches[0].clientX;
        starY = event.touches[0].clientY;
    });
    oDiv.addEventListener('touchmove', function (event) {
       event.preventDefault();
        if (event.targetTouches.length == 1) {
            $('#touchMove img').removeClass('imgFilter')
            L = event.touches[0].clientX - disX;
            T = event.touches[0].clientY - disY;
            starXEnd = event.touches[0].clientX - starX;
            starYEnd = event.touches[0].clientY - starY;
            //console.log(L);
            if (L < 0) {
                L = 0;
            } else if (L > document.documentElement.clientWidth - this.offsetWidth) {
                L = document.documentElement.clientWidth - this.offsetWidth;
            }
    
            if (T < 0) {
                T = 0;
            } else if (T > document.documentElement.clientHeight - this.offsetHeight) {
                T = document.documentElement.clientHeight - this.offsetHeight;
            }
            moveX = L + 'px';
            moveY = T + 'px';
            //console.log(moveX);
            this.style.left = moveX;
            this.style.top = moveY;
        }else{
            alert(222)
        }
        
    });
    window.addEventListener('touchend', function (e) {
        //alert(parseInt(moveX))
        //判断滑动方向
        setTimeout(function(){
            $('#touchMove img').addClass('imgFilter')
        },1000)
    });
})