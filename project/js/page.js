class Page{
    constructor(){
        this.cont = document.querySelector(".goods_list");
        this.xuan();
        this.init();
       
        this.addEvent();
        this.shopping();
        
    }

xuan(){
//选项卡
$(".nav-items").find("li").mouseenter(function(){
    var index = $(this).index();
    $(".pox").find(".big").eq(index).stop().slideDown().siblings().stop().slideUp()
})
    }
addEvent(){
        var that = this;
        
        this.cont.onclick = function(eve){
     
            var e = eve || window.event;
            var t = e.target || e.srcElement;
            if(t.className == "btn-buy"){
                console.log(1)
                // 2.获取当前的商品ID
                that.id = t.parentNode.parentNode.getAttribute("index");
               
                // 3.存localstorage
                that.setData();
            }
        }
    }
setData(){
        // console.log(this.id);
        // 保存多个商品，数量，一条本地存储
        // 数组中放对象的形式处理数据
        // 每个对象是一个商品
        // 整个数组是一条本地存储
        // [{id:"adsa",num:1},{},{}]

        this.goods = localStorage.getItem("goods");

        if(this.goods){
            // 不是第一次
            this.goods = JSON.parse(this.goods)

            var onoff = true;
            // 之后存
            for(var i=0;i<this.goods.length;i++){
                // 老的
                console.log(this.goods[i].id)
                if(this.goods[i].id == this.id){
                    this.goods[i].num++;
                    onoff = false;
                }
            }
            // 新的
            if(onoff){
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }
        }else{
            // 第一次存
            //     直接存
            this.goods = [{
                id:this.id,
                num:1
            }];
        }
        
        // 最后将数据设置回去
        localStorage.setItem("goods",JSON.stringify(this.goods))
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
    console.log(this.res)
    for(let i=0;i<this.res[0].length;i++){
//    console.log(this.res.length)
    str+=`  <li class="box product_item j_product" _type="0" _productid="6000036434" index="${this.res[0][i].goodsId}">
         <a href="http://localhost/1905/day12/project/details.html?id=${this.res[0][i].goodsId}" target="_blank">
             <div class="p_img clearfix">
                
                 <img src="${this.res[0][i].src}" width="290" height="290" class="j_product_img">
               
             </div>
             <div class="p_info clearfix">
                 <div class="p_name"><a>${this.res[0][i].name}</a></div>
                <div class="p_price">
                    <span class="price">
                    <strong>${this.res[0][i].price}</strong>
                    </span>                                
                </div>
             </div>
            <div class="p-buy">
                <span>${this.res[0][i].tip}</span>
                <a class="btn-buy" href="javascript:;">加入购物车</a>
            </div>
            </a>
</li>

   `  
    
    }
    $('.goods_list ul').html(str); 
  
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

}

new Page;
/* <li>
<img src="${this.res[i].img}" alt="${this.res[i].name}">
<p>${this.res[i].name}</p>
<span>${this.res[i].price}</span>
</li> */