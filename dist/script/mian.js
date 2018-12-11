function _(selector){
    var ele = document.querySelectorAll(selector);
    if(ele.length == 0) return null;
    return  ele.length == 1 ? ele[0] : ele; 
}

function _slice(args){
      return Array.prototype.slice.call(args);
      
  }

  function _removeClass(dom,className){
      return dom.className = dom.className.replace(className, "")
  }

  function _jsonp(url,cb){
        console.log(url)
      return new Promise(function(resolve,reject){
          cb = cb ? cb :"callback";
          var randomName = "cb" + Date.now();
          var script = document.createElement("script")
          url += (/\?/.test(url) ? "&" : "?") + `${cb}=${randomName}`;
          script.src = url;
          document.body.appendChild(script);
          script.onload = function(){
              this.remove();
  
          }
          window[randomName] = function(res){
              resolve(res)
              console.log(res)
          }
      })
  }

  function _ajax(url){
      return new Promise(function(resolve,reject){
            var xhr = new XMLHttpRequest();
            xhr.open("GET",url);
            xhr.send(null);
            xhr.onload = function(){
                  if(xhr.status === 200){
                        resolve(xhr.response)
                  }
            }
      })
  }


// nav 改变
$(".btn-group").on("mouseenter",showlist)
$(".btn-group").on("mouseleave",hidelist)           
    function showlist(event){
        console.log(1)
            var e = event || window.event;
            var target = e.currentTarget;
            $(target).css("position","relative")
            $(target).children(".dropdown-menu").stop().fadeIn();
    }
        function hidelist(event){
            var e = event || window.event;
            var target = e.currentTarget;
            $(target).children(".dropdown-menu").stop().fadeOut();
    }


// swiper
var swiper = new Swiper('.swiper-container', {
    autoplay: {
          delay:2000,
          disableOnInteraction: false,
    },
    loop : true,
    loopFillGroupWithBlank: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    
},

});

// 二级菜单
$(".life").on("mouseenter",function(){
    $(".life-list").css("display","block")
})
$(".life").on("mouseleave",function(){
    $(".life-list").css("display","none")
})  

$(".cloth").on("mouseenter",function(){
    $(".cloth-list").css("display","block")
})
$(".cloth").on("mouseleave",function(){
    $(".cloth-list").css("display","none")
})   
$(".shoes").on("mouseenter",function(){
    $(".shoes-list").css("display","block")
})
$(".shoes").on("mouseleave",function(){
    $(".shoes-list").css("display","none")
}) 
$(".global").on("mouseenter",function(){
    $(".global-list").css("display","block")
})
$(".global").on("mouseleave",function(){
    $(".global-list").css("display","none")
}) 