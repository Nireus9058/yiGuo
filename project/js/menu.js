class Tab{
    constructor(){
        this.index=0;
        this.maxNum=5;
        this.init();
        this.addEvent()
    };
    addEvent(){
        let that=this;
        $('.tab-index').find('li').mouseenter(function(){
            that.index=$(this).index();
            $(this).css({
                background:"#fdf3f2",
                borderBottom:"1px solid red"
            }).siblings().css({
                background:"",
                borderBottom:"none"
            })
            that.display() 
        });
        // $('.tab-items').on('click','li',function(){
        //     $(this).css({
        //         boxShadow:
        //     })
        // })
    }
    init(){
        let that=this;
        $.ajax({
            url:"http://localhost/stage/data/item.json",
            success:function(res){
                that.res=res;
                that.display()
            }
        })
    };
    display(){
        let str="";
        for(let i=this.index*this.maxNum;i<this.maxNum*this.index+this.maxNum;i++){
            str+=`<ul>
                    <li>
                        <img src="${this.res[i].img}" alt="${this.res[i].name}">
                        <p>${this.res[i].name}</p>
                        <span>${this.res[i].price}</span>
                    </li>
                </ul>`
        }
        $('.tab-items').html(str);
    }
}
new Tab()
     