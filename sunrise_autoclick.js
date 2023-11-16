// ==UserScript==
// @name         Sunrise_autoclick
// @namespace    http://tampermonkey.net/
// @version      0.3.1
// @description  try to take over the world!
// @author       You
// @match        https://e5489.jr-odekake.net/e5489/cspc/CB*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jr-odekake.net
// @require      file:///home/tzuyu/workspace/jrwest/Askon/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==
//https://code.jquery.com/jquery-3.6.0.min.js

var current_url=window.location.href
if (current_url.includes("CBDayTimeArriveSelRsvMyDia")) {
    $(".toggle-check-button-2").each(function(i, obj) {
        if ($(this).children('input').eq(0).checked) {
            if ($(this).children('input').eq(0).checked="checked") {return false;}
            else {$(this).trigger('click');return false;}
        }else {$(this).trigger('click');return false;}
    });
    $(".decide-button").trigger('click');
    //https://e5489.jr-odekake.net/e5489/cspc/CBDayTimeArriveSelRsvMyDiaPC
}else if (current_url.includes("CBVacantComp")){
    $(".decide-button").trigger('click');
    //https://e5489.jr-odekake.net/e5489/cspc/CBVacantCompPC
}else if (current_url.includes("CBRoute")){
    $(".decide-button").trigger('click');//https://e5489.jr-odekake.net/e5489/cspc/CBRoutePC
}else if (current_url.includes("CBNumberSeat")){
    $(".toggle-check-button").each(function(i,obj){
        //console.log(i);
        let pan=$(this).children('span').children('span').text();
        if (pan.includes("どの席でもよい")||pan.includes("乗車券なし")) {$(this).trigger('click');}
        return true;
    });
    //$(".toggle-check-button").eq(1).trigger('click');//https://e5489.jr-odekake.net/e5489/cspc/CBNumberSeatPC
    //$(".toggle-check-button").eq(6).trigger('click');//https://e5489.jr-odekake.net/e5489/cspc/CBNumberSeatPC
    $(".decide-button").trigger('click');//https://e5489.jr-odekake.net/e5489/cspc/CBNumberSeatPC
}else if (current_url.includes("CBRsvFinalConfNumberSeat")){
    $(".payment-method__choice-list").children('li').eq(0).children('label').children('input').trigger('click');
    //https://e5489.jr-odekake.net/e5489/cspc/CBRsvFinalConfNumberSeatPC
}
