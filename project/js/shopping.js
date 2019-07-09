class Car{
    constructor(){
        this.tbody = document.querySelector(".cart-none");
        // this.add = document.querySelector(".increment")
        // this.min = document.querySelector(".decrement")
        this.url = "http://localhost/1905/day12/project/json/page.json";

        this.init();
        // 1.删除：绑定删除按钮的事件
        this.addEvent();
    
    }
    addEvent(){
        var that = this;
        this.tbody.onclick = function(){
            if(event.target.className == "del"){
                // 2.获取点击商品的id
                that.id = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("index");
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
        // this.tbody.onclick = function(){
        //     if(event.target.className == "increment"){
        //  that.id = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("index");
        //  console.log(that.id)
        //  that.setData(function(i){
        //     that.goods[i].num ++;
       
        // });

        //     }
        // }

      
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
        for(var i=0;i<this.res.length;i++){
            for(var j=0;j<this.goods.length;j++){
                if(this.res[i].goodsId == this.goods[j].id){
                    str += `<table class="cart-table"index="${this.res[i].goodsId}">
                    <tbody>
                        <tr>
                            <td class="cart-t-check"><input type="checkbox" checked="checked"></td>
                            <td class="cart-t-img"><a href="details.html"><img src="${this.res[i].src}" ></a></td>
                            <td class="cart-t-info"><a href="details.html">${this.res[i].name}</a></td>
                            <td class="cart-t-price">${this.res[i].price}</td>
                            <td class="cart-t-num">
                                <div class="quantity-form">
                                    <a href="javascript:void(0);" class="decrement"></a>
                                    <input type="text" class="itxt" oldnum="1" value="${this.goods[j].num}">
                                    <a href="javascript:void(0);" class="increment"></a>
                                </div>
                            </td>
                            <td class="cart-t-total"><span>${this.res[i].price}</span></td>
                            <td class="cart-t-spec">${this.goods[j].num}盒/份</td>
                            <td class="cart-t-opera">
                                <a href="javascript:void(0);">移入收藏</a><br>
                                <a href="javascript:void(0);" class="del">删除</a>
                            </td>
                        </tr>   
                    </tbody>
                </table>`
    
                }
            }
        }
        this.tbody.innerHTML = str;
    }
}
new Car;