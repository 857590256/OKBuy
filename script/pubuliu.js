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

// nav 改变
$(".btn-group").on("mouseenter",showlist)
$(".btn-group").on("mouseleave",hidelist)           
    function showlist(event){
       
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

/*************************************** */

function getMsg(){

    $.ajax("https://list.mogujie.com/search",
    {
          dataType:"jsonp"
    })
    .then(function(res){
        //   console.log(res);
          renderPage(res.result.wall.list);
    })

}

var goodsJson = [];

function renderPage(json){
    goodsJson = json;
    var html = "";
    // 根据比例计算图片高度;
    json.forEach(function(ele){
          // console.log(ele);
          html += `   <li class="goods-box">                           
                                  <img src="${ele.show.img}" data-iid = ${ele.iid} width=${ 262 } height=${ parseInt(262 / ele.show.w * ele.show.h) } alt="">                           
                            <div class="good-title">
                                  <p>${ele.title}</p>
                            </div>
                            <div class="line"></div>
                            <div class="good-detail">
                                  <span class="detail-price">
                                        ${ele.price}
                                  </span>
                                  <div class="detail-start">
                                        <i>★</i>
                                        <span>${ele.itemMarks.split(" ")[0]}</span>
                                  </div>
                            </div>
                            <button class="btn-car" data-iid="${ele.iid}">加入购物车</button>
                      </li> `
    });
    
    // console.log(html);
    $(".con").html(html);
}
getMsg();

// 购物车;

// 1. 所有的按钮绑定事件; 

$(".con").on("click",".btn-car",handleCarClick);
function handleCarClick(event){
    var e = event || window.event;
    var target = e.target || e.srcElement;
    
    var iid = $(target).attr("data-iid");
    
    var nowMsg = findJson(iid)[0];
   
    addCar(nowMsg,iid);
}

$(".con").on("click","img",handleImgClick);
function handleImgClick(event){   
    var e = event || window.event;
    var target = e.target || e.srcElement;   
    var iid = $(target).attr("data-iid");  
    var imgMsg = findJson(iid)[0];   
    console.log(imgMsg)
    localStorage.setItem("detail",JSON.stringify(imgMsg))
    location.href="http://localhost:8080/xiangqing.html"
}


function addCar(nowMsg , iid){  
    $.extend(nowMsg , {count : 1});
    var sNowMsg = JSON.stringify(nowMsg); 
    console.log(sNowMsg);
    if(!localStorage.cart){
          localStorage.setItem("cart",`[${sNowMsg}]`);
          return false;
    }
    var aMsg = JSON.parse(localStorage.cart);
    if(!hasIid(aMsg,iid)){
          aMsg.push(nowMsg);
    }
    localStorage.setItem("cart",JSON.stringify(aMsg));
    console.log(JSON.parse(localStorage.cart));
}



function hasIid(aMsg,iid){
    for(var i = 0 ; i < aMsg.length ; i ++){
          if(aMsg[i].iid === iid){
                aMsg[i].count ++;
                return true;
          }
    }
    return false;
}
function findJson(iid){
    return  goodsJson.filter(function(item){
          return  item.iid === iid
    })
}

// 购物车获取;;

$(".car-item").on("mouseenter",function(){
    $(".car-list").show();

    // console.log(getCart())
   $(".car-list ul").html(renderCart());

})
$(".car-item").on("mouseleave",function(){
    $(".car-list").hide();
})

function getCart(){
    if(!localStorage.cart) return 0;
    var aMsg = JSON.parse(localStorage.cart);
    return aMsg;
}

function renderCart(){
    
    var html = "";
    var cart_json = getCart();
    if(!cart_json) return "购物车什么也没有，空空如也，快去购物吧！！";
    for(var i = 0 ; i < cart_json.length ; i ++){
          html += `<li>
                <img src="${cart_json[i].show.img}"> 
                <span>${cart_json[i].price}</span> 
                <span>×${cart_json[i].count}</span>
          </li>`
    }

    return html;
}

$("#clear").on("click",function(){
    localStorage.clear("cart");
    // console.log(222)
})

// 跳转






