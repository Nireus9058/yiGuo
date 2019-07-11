class Page{
    constructor(){
        this.cont = document.querySelector(".goods_list");
        this.xuan();
        this.init();
       
        this.addEvent();
        this.gouWu();
      
        this.dengLu();
        this.tuiChu();  
      
        
        
    }

xuan(){
//选项卡
$(".nav-items").find("li").mouseenter(function(){
    var index = $(this).index();
    $(".pox").find(".big").eq(index).stop().slideDown().siblings().stop().slideUp()
})
    }
gouWu(){
    var that = this
    this.usermsg = JSON.parse(localStorage.getItem("usermsg"));
    $(".shopping-cart").click(function(){
        console.log(that.usermsg)
        if(that.usermsg){
      
            for(var i=0;i<that.usermsg.length;i++){
                if( that.usermsg[i].onoff == 0 ){
                  alert("请先登录,3秒后跳登录页面")
                  setTimeout(() => {            
                      location.href = "http://localhost/1905/day12/project/login.html";  
                  }, 3000);
                    
                }else {
                    location.href = "http://localhost/1905/day12/project/shopping.html"; 
                }
               
              }
        }else{
            alert("请先登录,3秒后跳转注册页面")
            setTimeout(() => {            
                location.href = "http://localhost/1905/day12/project/register.html";  
            }, 3000);
        }

        

        
    })
}
addEvent(){
        var that = this;
        
        this.cont.onclick = function(eve){
     
            var e = eve || window.event;
            var t = e.target || e.srcElement;
            if(t.className == "btn-buy"){
                // console.log(1)
                // 2.获取当前的商品ID
                that.id = parseInt($(t).parent().parent().get(0).getAttribute("index"));
                // console.log(that.id)
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
        console.log(this.goods)
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
        this.count = 0;
        for(var i=0;i<this.res[0].length;i++){
           console.log(i)
            for(var j=0;j<this.goods.length;j++){   
                // console.log(j)   
                if(this.res[0][i].goodsId == this.goods[j].id){
                    // console.log(this.res[0][i].goodsId,this.goods[j].id)  
                this.count += this.goods[j].num*parseInt(this.res[0][i].price.substr(1))  
                 $('.totlePrice').html("￥"+this.count)
                // console.log(this.goods[j].num*parseInt(this.res[0][i].price.substr(1)) ) 
                }
            }
        }

    }
 

    

init(){
    let that=this;
    $.ajax({
        url:"http://localhost/1905/day12/project/json/page.json",
        success:function(res){
            // console.log(res)
            that.res=res;
            that.display()
        }
    })
}
display(){
    let str="";
    // console.log(this.res)
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
    this.shopping();
}
shopping(){
    //商品购物车
   
    $(".box").on("mouseenter",function(){
        console.log(1)
        $(this).find(".p-buy").stop().show()
        .parent().siblings().find(".p-buy").stop().hide();
    })
    $(".box").mouseleave(function(){
        $(".p-buy").stop().hide();
  })
}

dengLu(){
    this.usermsg = JSON.parse(localStorage.getItem("usermsg"));
    if(this.usermsg){
        for(var i=0;i<this.usermsg.length;i++){  
            if(this.usermsg[i].onoff == 1){
                // console.log(1)
                $("#_login a").html("已登录")
                $("#_register a").html("退出")
        }           
     }
  }
}
tuiChu(){   
    $("#_register a").click(function(){
        this.usermsg = JSON.parse(localStorage.getItem("usermsg"));
        for(var i=0;i<this.usermsg.length;i++){
            // console.log(i)
                this.usermsg[i].onoff = 0 
            localStorage.setItem("usermsg",JSON.stringify(this.usermsg));
            $("#_login a").html("登录")
            $("#_register a").html("注册")
            alert("确认后3秒返回登录页面")
            setTimeout(() => {            
            location.href = "http://localhost/1905/day12/project/login.html";             
        }, 3000);
        }
    })
  }       

}


new Page;
/* <li>
<img src="${this.res[i].img}" alt="${this.res[i].name}">
<p>${this.res[i].name}</p>
<span>${this.res[i].price}</span>
</li> */