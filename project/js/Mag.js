
class Page{
    constructor(){
    
        
        this.init();           
    }


init(){
    let that=this;
    $.ajax({
        url:"http://localhost/1905/day12/project/json/page.json",
        success:function(res){
        
            that.res=res;
            that.display()
        }
    })
}
    display(){
        let url =location.search;
        let s = url.split("?")[1].split("=")[1];
        console.log(this.res.length)
        for(var i=0;i<this.res.length;i++){
            for(var j=0;j<this.res[i].length;j++){
                
                if(this.res[i][j].goodsId == s){
                $('.pic-big').children('img').attr("src",this.res[i][j].src);
                $('.b_box').children('img').attr("src",this.res[i][j].src);

            
            }
    //    console.log(this.res.length)
        }
            
      }   
    }
}    
new Page;

function Mag(){
    this.sBox = document.querySelector(".pic-big");
    this.bBox = document.querySelector(".b_box");
    this.span = document.querySelector(".pic-big span");
    this.bImg = document.querySelector(".b_box img");
    
        this.addEvent();
    }
    Mag.prototype.init = function(){
        
    let w = this.bImg.offsetWidth / this.bBox.offsetWidth;
    let h = this.bImg.offsetHeight / this.bBox.offsetHeight;
    
    this.span.style.width = this.sBox.offsetWidth / w + "px";
    this.span.style.height = this.sBox.offsetHeight / h + "px";
    
    }
    
    
    Mag.prototype.addEvent = function(){
        let that = this;
        this.sBox.addEventListener("mouseover",function(){
        that.over();
        that.init();
        
        })
        this.sBox.addEventListener("mouseout",function(){
        that.out();
        })
        this.sBox.addEventListener("mousemove",function(eve){
            let e = eve || window.event;
        that.move(e);
        })
        
        
    }
    
    Mag.prototype.over = function(){
    this.span.style.display ="block";
    this.bBox.style.display = "block";
    }
    Mag.prototype.out = function(){
    this.span.style.display ="none";
    this.bBox.style.display = "none";    
    }
    Mag.prototype.move = function(e){
    let l = e.offsetX - this.span.offsetWidth / 2;   
    let t = e.offsetY - this.span.offsetHeight / 2;  
    console.log(l,t)
    if(l<0) l = 0;
    if(t<0) t = 0;
    if(l>this.bBox.offsetWidth - this.span.offsetWidth)
    l=this.bBox.offsetWidth - this.span.offsetWidth;
    if(t>this.bBox.offsetHeight - this.span.offsetHeight-50)
    t=this.bBox.offsetHeight - this.span.offsetHeight+50+"px";
    
    let x = l / (this.sBox.offsetWidth-this.span.offsetWidth);
    let y = t / (this.sBox.offsetHeight-this.span.offsetHeight);
    //span跟随鼠标移动
    this.span.style.left = l + "px";
    this.span.style.top = t + "px";
    
    
    this.bImg.style.left = x * (this.bBox.offsetWidth - this.bImg.offsetWidth) + "PX"
    this.bImg.style.top = y * (this.bBox.offsetHeight - this.bImg.offsetHeight) + "PX"
    }
    
    onload = function(){
        new Mag();
    }
        