class Page{
    constructor(){
        this.shopping();
        this.xuan();
        this.init();
    }
shopping(){
//商品购物车
$(".box").mouseover(function(){
    $(this).find(".p-buy").stop().show()
    .parent().sibling().find(".p-buy").stop().hide();
})
$(".box").mouseout(function(){
    $(".p-buy").stop().hide();
  })
    }
xuan(){
//选项卡
$(".nav-items").find("li").mouseenter(function(){
    var index = $(this).index();
    $(".pox").find(".big").eq(index).stop().slideDown().siblings().stop().slideUp()
})
    }
init(){
    let that=this;
    $.ajax({
        url:"http://localhost/1905/day12/project/json/page.json",
        success:function(res){
            console.log(res)
            that.res=res;
            that.display()
        }
    })
}
display(){
    let str="";
    for(let i=0;i<this.res.length;i++){
//    console.log(this.res.length)
    str+=`  <li class="box product_item j_product" _type="0" _productid="6000036434">
             <div class="p_img clearfix">
                <a href="details.html" target="_blank">
                 <img src="${this.res[i].src}" width="290" height="290" class="j_product_img">
                </a>
             </div>
             <div class="p_info clearfix">
                 <div class="p_name"><a href="details.html" target="_blank">${this.res[i].name}</a></div>
                <div class="p_price">
                    <span class="price">
                    <strong>${this.res[i].price}</strong>
                    </span>                                
                </div>
             </div>
            <div class="p-buy">
                <span>${this.res[i].tip}</span>
                <a class="btn-buy" href="javascript:;">加入购物车</a>
            </div>
</li>

   `  
    
    }
    $('.goods_list ul').html(str); 
  
}

}

new Page;
/* <li>
<img src="${this.res[i].img}" alt="${this.res[i].name}">
<p>${this.res[i].name}</p>
<span>${this.res[i].price}</span>
</li> */