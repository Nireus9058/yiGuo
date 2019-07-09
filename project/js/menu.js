class Tab{
    constructor(){
        this.menu();
        this.init();
        
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
    for(let i=1;i<this.res.length;i++){
        console.log(this.res.length)
        // this.list = $("<dd class='list'></dd>")
        let str="";
        for(let j=0;j<this.res[i].length;j++){
            str+=`<li index="${this.res[i][j].goodId}">
                <a href="#"><img src="${this.res[i][j].url}"></a>
</li>`
        }
        $(`.fm${i}`).find('ul').html(str)
   
    }
}
}
new Tab();
     

