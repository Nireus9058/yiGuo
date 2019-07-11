class Tab{
    constructor(){
        this.menu();
        this.init();
        this.gouWu();
        this.dengLu();
        this.tuiChu();

        
    };
    
    menu(){
        $(".item").mouseover(function(){
            $(this).stop().find(".sub-item").show()
            .parent().siblings().stop().find(".sub-item").hide()
        
          })
        $(".item").mouseout(function(){
            $(".sub-item").stop().hide();
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

    init(){
        let that=this;
        $.ajax({
            url:"http://localhost/1905/day12/project/json/index.json",
            success:function(res){
                console.log(res)
                that.res=res;
                that.display()
            }
        })
    };
    display(){
       
    //     for(let i=0;i<this.res.length;i++){
    // //    console.log(this.res.length)
    //     str+=`<li><a href="#"><img src="${this.res[i].url}"></a></li>`  
        
    //     }
    //     $('.fm1 ul').html(str); 
    //     $('.fm2 ul').html(str);
    //     $('.fm3 ul').html(str);
    //     $('.fm4 ul').html(str);
    //     $('.fm5 ul').html(str);
    //     $('.fm6 ul').html(str);
    //     $('.fm7 ul').html(str);
    //     $('.fm8 ul').html(str);
    //     $('.fm9 ul').html(str);   
    // }
    for(let i=0;i<this.res.length;i++){
        console.log(this.res.length)
        // this.list = $("<dd class='list'></dd>")
        let str="";
        for(let j=0;j<this.res[i].length;j++){
            str+=`<li index="${this.res[i][j].goodId}">
                <a href="http://localhost/1905/day12/project/page.html"><img src="${this.res[i][j].url}"></a>
</li>`
        
        }
        $(`.fm${i+1}`).find('ul').html(str)
   
    }
  }
}
new Tab();
     

