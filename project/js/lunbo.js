//轮播图
function Banner(){
    this.left = document.querySelector(".prev");
    this.right = document.querySelector(".next");
    this.items = document.querySelectorAll(".b-slider img")
    this.index = 0;
    this.iPrev = this.items.length-1;
    this.init();
}

Banner.prototype.init = function(){
    let that = this;

    this.left.onclick =function(){
       
    that.changIndex(-1);   
    }
    this.right.onclick = function(){
     that.changIndex(1);
    }
    
}
Banner.prototype.changIndex = function(direct){
    if(direct == -1){
       if(this.index == 0){
          this.index = this.items.length-1;
          this.iPrev = 0;
       }else{
           this.index  --;
           this.iPrev = this.index + 1;
       }
    }else{
        if(this.index == this.items.length-1){
           this.index = 0;
           this.iPrev = this.items.length-1;
        }else{
            this.index ++;
            this.iPrev = this.index -1;
        }
    }
    this.display(direct);
}
Banner.prototype.display = function(direct){
   this.items[this.iPrev].style.left = 0;
   move(this.items[this.iPrev],{left:-this.items[0].offsetWidth*direct})
   this.items[this.index].style.left = 1130 * direct +"px";
   move(this.items[this.index],{left:0})
}
new Banner();


//二级菜单

$(".item").mouseover(function(){
    $(this).stop().find(".sub-item").show()
    .parent().siblings().stop().find(".sub-item").hide()

  })
$(".item").mouseout(function(){
    $(".sub-item").stop().hide();
  })



