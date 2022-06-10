//提示密码长度过大或者过小
function myfunction(){
    var mess=document.getElementsByClassName('message')[0];
    var input1=document.querySelector('.PIN1');
    if(input1.value.length<6){
      mess.innerHTML='Password should between 6 and 16';
      mess.style.color='blue';
    }else if(input1.value.length>16){
        mess.innerHTML='Password is too long, make sure no more than 16 digit';
        mess.style.color='darkgoldenrod';
    }else{
        mess.innerHTML='It is ok';
        mess.style.color='black';
    }
}
function check(){
    var state= false;
    var mess=document.getElementsByClassName('message1')[0];
var PIN1=document.querySelector('.PIN1');
var PIN2=document.querySelector('.PIN2');
if(PIN1.value!=PIN2.value){
    mess.innerHTML='Two times password is not same';
    mess.style.color='red';
}else if (PIN1.value=PIN2.value){
    mess.innerHTML='The two password are same';
    mess.style.color='blue';
}
}
function hid(){
    var pin=document.querySelector('.PIN1');
    if(pin.type=="password"){
        pin.type='text';
    }else{
        pin.type='password'
    }
}
function hidd(){
    var pin=document.querySelector('.PIN2');
    if(pin.type=="password"){
        pin.type='text';
    }else{
        pin.type='password'
    }
}
function HID(){
    var pin=document.querySelector('.PIN0');
    if(pin.type=="password"){
        pin.type='text';
    }else{
        pin.type='password'
    }
}
