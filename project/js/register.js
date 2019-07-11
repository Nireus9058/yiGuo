//注册
class Register{
    constructor(){
        this.user = $("#Phone_Mobile");
        this.pass = $("#Phone_Password");
        this.pass2 = $("#Phone_ConfimPassword");
        this.tel2 = $("Phone_AtCode");
        this.btn = $(".btn-green-l");       
        this.code = $("#verficode_tab1");;
        this.msg = $(".pass-error");
        this.error1 =$(".pass-error1");
        this.error2 =$(".pass-error2");
        this.error3 =$(".pass-error3");
        this.error4 =$(".pass-error4");
        //判断是否可以提交
        this.t=true;
        this.p =true;
        this.p2 =true;
        this.yz=true;
        //验证码
        console.log(this.pass2.val())
        this.init();
     
    }
    init(){
        this.btn.click(()=>{
            this.tijiao();
        })
        this.user.blur(()=>{
            this.yz1();
         })
         this.pass.blur(()=>{
            this.yz2();
         })
         this.pass2.blur(()=>{
            this.yz3();
         })
         this.code.blur(()=>{
            this.co();
         })
      
    }
    co(){
        if(this.user.val()==""){
            this.error4.html("请输入验证码")}
    }
    yz1(){
        var reg = /^1[3-9]\d{9}$/;
        console.log(this.user.val())
    if(reg.test(this.user.val())){
        this.error1.css({
            display:"none",
        })
        
        this.t = true;
    }else if(this.user.val()==""){
        this.error1.html("必填")
        }else{
            this.error1.html("手机格式错误")
            this.error1.css({
            display:"inline"
           
            })
            this.t = false ;
        }
        
    }
    yz2(){
        var z_passReg = /^.{4,}$/;
        console.log()
        if(z_passReg.test(this.pass.val())){
			this.error2.css({
				display:"none",
			})
			this.p = true;
		}else if(this.pass.val()==""){
            this.error2.html("必填")
            this.p = false;
        }else{
            this.error2.html("长度不允许小于4")
			this.error2.css({
				display:"inline"
			})
			this.p = false;
		};

    }
    yz3(){
        if(this.pass.val()==this.pass2.val()){
			this.error3.css({
				display:"none",
			})
			this.p2 = true;
		}else if(this.pass2.val()==""){
            this.error3.html("必填")
            this.p2 = false;
        }else{
            this.error3.html("两次输入不一致")
			this.error3.css({
				display:"inline"
			})
			this.p2 = false;
		};

    }
    tijiao(){
        if(this.t&&this.p&&this.p2){
             var onoff=0;    
            this.usermsg = localStorage.getItem("usermsg");        
            if(this.usermsg == null){
                this.usermsg = [{
                    user:this.user.val(),
                    pass:this.pass.val(),
                    onoff:0
                }]
                
            }else{
                this.usermsg = JSON.parse(localStorage.getItem("usermsg"));
                for(var i=0;i<this.usermsg.length;i++){
                    // console.log(this.usermsg[i].user,this.user.val())
                    if(this.usermsg[i].user == this.user.val()){
                        // alert("重名")
                        
                        this.msg.html ("手机号已经存在");
                        // this.msg.prev(".xerr").show();
                        return;
                    }
                }
            
                this.usermsg.push({
                    user:this.user.val(),
                    pass:this.pass.val(),
                    onoff:0
                    
                })
  
            }
            // console.log(this.usermsg)
            // console.log("点击")
            localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
            setTimeout(() => {
                console.log(1)
                location.href = "http://localhost/1905/day12/project/login.html";
            }, 3000);
 
        }
           
    }
    
        
    
            

}
       new  Register;









       


// $(function () {
//     $('#Pwd').keydown(function (e) {

//         if (e.keyCode == 13) {
//             document.getElementById("btnLogin").click(); //调用登录按钮的登录事件
//         }
//     });
// $("#btnLogin").click(function () {
//     if (Form.Validate($("#UserName").val())) {
//         $("#msg-wrap").addClass("msg-wrap").children("div").addClass("msg-error").html(Form.VC);
//         return false;
//     }

//     $('form').submit();
// });
// })
