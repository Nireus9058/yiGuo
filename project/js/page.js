//商品购物车
$(".box").mouseover(function(){
    $(this).find(".p-buy").stop().show()
    .parent().sibling().find(".p-buy").stop().hide();
})
$(".box").mouseout(function(){
    $(".p-buy").stop().hide();
  })

//选项卡
$(".nav-items").find("li").mouseenter(function(){
    var index = $(this).index();
    $(".pox").find(".big").eq(index).stop().slideDown().siblings().stop().slideUp()
})
   
