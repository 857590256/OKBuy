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
        // console.log(1)
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
/****************************************************** */
    
//放大镜

var oSmall = $(".small")
// console.log(oSmall)
var oFram = $(".fram")
var oBig = $(".big")
var oBimg = $(".bimg")
$(".small").on("mouseenter",function(){
    $(".fram").css({"display":"block","opacity":".2","background":"#999"})
    $(".big").css({"display":"block"})
    // $(".simg").css("opacity",".3")
})
$(".small").on("mouseleave",function(){
    $(".fram").css("display","none")
    $(".big").css({"display":"none"})
})

oSmall[0].onmousemove = function(event){
    var e = event || window.event;
    var offsetX = e.offsetX;
    var offsetY = e.offsetY;
    //设置位置
    var nLeft = offsetX - 50;
    var nTop = offsetY -50;

    nLeft = nLeft < 0 ? 0 : nLeft;
    nTop = nTop < 0 ? 0 : nTop;
    var maxLeft = oSmall[0].offsetWidth - oFram[0].offsetWidth-4;
    var maxTop = oSmall[0].offsetHeight - oFram[0].offsetHeight -4;
    nLeft = nLeft > maxLeft ? maxLeft : nLeft;
    nTop = nTop > maxTop ? maxTop : nTop;

    oFram[0].style.left = nLeft + "px";
    oFram[0].style.top = nTop + "px";

    var propX = oBig[0].offsetWidth / oFram[0].offsetWidth;
    var propY = oBig[0].offsetHeight / oFram[0].offsetHeight;

    oBimg[0].style.left = -nLeft * propX+ "px";
    oBimg[0].style.top = -nTop * propY+ "px";

    oFram[0].style.backgroundPosition = `${-nLeft}px ${-nTop}px`
}








