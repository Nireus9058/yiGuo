function ajaxGet(url,callback,data){
    //判断你的数据是否为空,如果为空也是一个对象形式
  data = data ? data : {};
  let str = "";
  for(let i in data){
      // 拼接成"user=admin&pass=123"字符格式
    str = str + i + "=" + data[i] + "&";
  }
   
  let d = new Date();
  url = url + "?" + str + "__qft=" + d.getTime();
  
  let ajax = new XMLHttpRequest();
  ajax.open("get",url,true);
  ajax.onreadystatechange = function(){
      if(ajax.readyState == 4 && ajax.status == 200){
        callback(ajax.responseText);
      }
  }
  ajax.send();
}

function ajaxPost(url,callback,data){
 data = data ? data : {};
 let str = "";
 for(let i in data){
   str = str + `${i}=${data[i]}&`;
 }
  str = str.slice(0,str.length-1);

  let ajax =new XMLHttpRequest();
  ajax.open("post",url,true);
  ajax.onreadystatechange = function(){
    if(ajax.readyState == 4 && ajax.status == 200){
      callback(ajax.responseText);
    }
  }
  //  post发送信息时需要设置信息被解析的格式，为表单数据格式
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send(str);
}