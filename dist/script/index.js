// nav  改变
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