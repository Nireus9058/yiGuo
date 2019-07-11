class Car{
    constructor(){
        this.tbody = document.querySelector(".cart-none");
        // this.add = document.querySelector(".increment")
        // this.min = document.querySelector(".decrement")
        this.url = "http://localhost/1905/day12/project/json/page.json";

        this.init();
        // 1.删除：绑定删除按钮的事件
        this.addEvent();
        this.dengLu();
        this.tuiChu();
    
    }
    addEvent(){
        var that = this;
        this.tbody.onclick = function(){
            if(event.target.className == "del"){
                // 2.获取点击商品的id
                that.id = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("index");
                console.log(that.id )
                // 3.删除DOM元素
                event.target.parentNode.parentNode.parentNode.parentNode.remove();
                // 4.删除localstorage的数据
                that.setData(function(i){
                    that.goods.splice(i,1);
                });
            }
        }
        // 8.修改数量：事件委托绑定输入框的事件
        this.tbody.oninput = function(){
            if(event.target.className == "itxt"){
                // 9.存储修改的商品的id
                that.id = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("index");
             
                // event.target.parentNode.parentNode.nextSibling.nextSibling.innerHTML("index");
                // 10.修改localstorage的数据
                that.setData(function(i){
                    that.goods[i].num = event.target.value;
                });
            }
        }
         
    }
    setData(callback){
        // 5.遍历数据，查找相同id
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].id == this.id){
                // 6.执行回调函数：删除时传进来的是删除，修改时传进来的是修改
                callback(i);
            }
        }
        // 7.再存回去
        localStorage.setItem("goods",JSON.stringify(this.goods));
    }
      
    init(){
        var that = this;
        ajaxPost(this.url,function(res){
            that.res = JSON.parse(res)
           
            that.getData();
        })
    }
    getData(){
        this.goods = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) : [];
        // console.log(this.res)
        // console.log(this.goods)
        this.display();    
    }
    display(){
        var str = "";
        for(var i=0;i<this.res[0].length;i++){
           
            for(var j=0;j<this.goods.length;j++){   
                // console.log(j)   
                if(this.res[0][i].goodsId == this.goods[j].id){
                    // console.log(this.res[0][i].goodsId,this.goods[j].id)
                    str += `<table class="cart-table"index="${this.res[0][i].goodsId}">
                    <tbody>
                        <tr>
                            <td class="cart-t-check"><input type="checkbox" checked="checked"></td>
                            <td class="cart-t-img"><a href="details.html"><img src="${this.res[0][i].src}" ></a></td>
                            <td class="cart-t-info"><a href="details.html">${this.res[0][i].name}</a></td>
                            <td class="cart-t-price">${this.res[0][i].price}</td>
                            <td class="cart-t-num">
                                <div class="quantity-form">
                                    <a href="javascript:void(0);" class="decrement"></a>
                                    <input type="text" class="itxt" oldnum="1" value="${this.goods[j].num}">
                                    <a href="javascript:void(0);" class="increment"></a>
                                </div>
                            </td>
                            <td class="cart-t-total"><span>${this.res[0][i].price.substr(0,1)+parseFloat(this.res[0][i].price.substr(1)*1*this.goods[j].num).toFixed(2)}</span></td>
                            <td class="cart-t-spec">${this.goods[j].num}盒/份</td>
                            <td class="cart-t-opera">
                                <a href="javascript:void(0);">移入收藏</a><br>
                                <a href="javascript:void(0);" class="del">删除</a>
                            </td>
                        </tr>   
                    </tbody>
                </table>`
                 //初始的购物车的价钱为0
                 $('.totalP').html("0")
                }
                }
   
                    
                
        
        
    }
        this.tbody.innerHTML = str;
        this.addMin()
    }
    addMin(){
        var that = this
        $(".cart-table").on("click" ,".increment" ,function(){
            
              that.num =  parseInt($(this).parent().children(".itxt").val())
              that.num += 1
                //  console.log(num)
             $(this).parent().children(".itxt").val(that.num) 
            var pri = $(this).parent().parent().prev(".cart-t-price").html().substr(1)  
          
            // console.log(pri)   
            $(this).parent().parent().next(".cart-t-total").html("￥"+that.num*pri)
            $(this).parent().parent().next().next(".cart-t-spec").html(that.num+"盒/份")
            // console.log(that.goods.length)
            //确保这里的id,所以需要重新获取
            that.id = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("index");


            // console.log(that.id)  


            for(var i=0;i<that.goods.length;i++){
               
                if(parseInt(that.goods[i].id) == parseInt(that.id)){
                    // console.log(that.goods[i].id,parseInt(that.id))
                    that.goods[i].num = parseInt(that.num)
                }
            }
            // 7.再存回去
            localStorage.setItem("goods",JSON.stringify(that.goods));
              //设置总价
            this.count = 0;
            for(var i=0;i<that.res[0].length;i++){
            //    console.log(i)
                for(var j=0;j<that.goods.length;j++){   
                    // console.log(j)   
                    if(that.res[0][i].goodsId == that.goods[j].id){
                        // console.log(that.goods[j].num*parseInt(that.res[0][i].price.substr(1)))  
                    this.count += that.goods[j].num*parseInt(that.res[0][i].price.substr(1))  
                    // console.log(this.count)
                     $('.totalP').html(this.count)
                    }
                }
            }
          
  
        })
        var that = this
        $(".cart-table").on("click" ,".decrement" ,function(){
            that.num =  parseInt($(this).parent().children(".itxt").val())
            if(that.num < 2 ){
                that.num = 2
            }   that.num -= 1
         
            
           
            $(this).parent().children(".itxt").val(that.num) 
            var pri = $(this).parent().parent().prev(".cart-t-price").html().substr(1)  
            $(this).parent().parent().next(".cart-t-total").html("￥"+that.num*pri)
            $(this).parent().parent().next().next(".cart-t-spec").html(that.num+"盒/份")

            that.id = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("index");
            // console.log(that.id)  
    
    
            for(var i=0;i<that.goods.length;i++){
               
                if(parseInt(that.goods[i].id) == parseInt(that.id)){
                    console.log(that.goods[i].id,parseInt(that.id))
                    that.goods[i].num = parseInt(that.num)
                }
            }
            // 7.再存回去
            localStorage.setItem("goods",JSON.stringify(that.goods));
            //设置总价
            this.count = 0;
            for(var i=0;i<that.res[0].length;i++){
            //    console.log(i)
                for(var j=0;j<that.goods.length;j++){   
                    // console.log(j)   
                    if(that.res[0][i].goodsId == that.goods[j].id){
                        // console.log(that.goods[j].num*parseInt(that.res[0][i].price.substr(1)))  
                    this.count += that.goods[j].num*parseInt(that.res[0][i].price.substr(1))  
                    // console.log(this.count)
                     $('.totalP').html(this.count)
                    }
                }
            }

        })

    }
    dengLu(){
        this.usermsg = JSON.parse(localStorage.getItem("usermsg"));
        if(this.usermsg){
        for(var i=0;i<this.usermsg.length;i++){
            
            if(this.usermsg[i].onoff == 1){
                console.log(1)
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
                console.log(i)
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
new Car;