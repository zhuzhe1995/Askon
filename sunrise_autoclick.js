// ==UserScript==
// @name         Sunrise_autoclick
// @namespace    http://tampermonkey.net/
// @version      0.3.5
// @description  try to take over the world!
// @author       You
// @match        https://e5489.jr-odekake.net/e5489/cspc/CB*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jr-odekake.net
// @require      file:///home/tzuyu/workspace/jrwest/Askon/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==
//https://code.jquery.com/jquery-3.6.0.min.js

// facilitysID reverse 1:nobinobi, 2:single deluxe, 3:single twin, 4:single, 5:solo, 6:twin
// the order is seto_login, izumo_login, seto_guest, izumo_guest
var facIdRev = {
  '%25BB%25BE%25C4%2520%2520000':1,  '%25BB%25BE%25C4%2520%2520000':2,  '%25BB%25BE%25C4%2520%2520000':3,
  '%25BB%25BE%25C4%25BC%2520000':4,  '%25BB%25BE%25C4%25BF%2520000':5,  '%25BB%25BE%25C4%25BB%2520000':6,
  '%25BB%25B2%25BD%25D3%2520000':1,  '%25BB%25B2%25BD%25D3%2520000':2,  '%25BB%25B2%25BD%25D3%2520000':3,
  '%25BB%25B2%25BD%25D3%25BC000':4,  '%25BB%25B2%25BD%25D3%25BF000':5,  '%25BB%25B2%25BD%25D3%25BB000':6,
  '%BB%BE%C4%20%20000':1,  '%BB%BE%C4%20%20000':2,  '%BB%BE%C4%20%20000':3,
  '%BB%BE%C4%BC%20000':4,  '%BB%BE%C4%BF%20000':5,  '%BB%BE%C4%BB%20000':6,
  '%BB%B2%BD%D3%20000':1,  '%BB%B2%BD%D3%20000':2,  '%BB%B2%BD%D3%20000':3,
  '%BB%B2%BD%D3%BC000':4,  '%BB%B2%BD%D3%BF000':5,  '%BB%B2%BD%D3%BB000':6
}
function parse_sunrise_url_prm(raw_params){
  var d={};
  if (raw_params.length>0){
    var raw_items=raw_params.split(/(?:\?|\&)+/);
    raw_items.forEach(function e(item) {
      var c=item.split(/=/);
      if (c.length>=2) d[c[0]]=c[1];
    });
  }
  return d;
}

var current_url=window.location.href
var reserv_type=0
// Default 0, allow all type of reservation
if (current_url.includes("CBDayTimeArriveSelRsvMyDia")||current_url.includes("CBAdvConfRoute")) {
    var params = parse_sunrise_url_prm(location.search);
    if (facIdRev[params['inputSpecificBriefTrainKana1']]!=reserv_type) reserv_type=0;
    if (reserv_type==1) {
      $("table.js-filfac-target > tbody > tr > td").each(function (n,obj){
        if (n==0) {
          $(this).css("background","lightgreen");
          if ($(this).find(".toggle-check-button-2 > input")) {
            if ($(this).find(".toggle-check-button-2 > input").attr('checked')=="checked"){return false;}
            else {$(this).find(".toggle-check-button-2").trigger('click');return false;}
          }
        }
      });
    } else if (reserv_type==2){
      $("table.js-filfac-target > tbody > tr > td").each(function (n,obj){
        if (n==3||n==4) {
          $(this).css("background","lightgreen");
          if ($(this).find(".toggle-check-button-2 > input")) {
            if ($(this).find(".toggle-check-button-2 > input").attr('checked')=="checked"){return false;}
            else {$(this).find(".toggle-check-button-2").trigger('click');return false;}
          }
        }
      });
    } else if (reserv_type==3){
      $("table.js-filfac-target > tbody > tr > td").each(function (n,obj){
        if (n==1||n==2) {
          $(this).css("background","lightgreen");
          if ($(this).find(".toggle-check-button-2 > input")) {
            if ($(this).find(".toggle-check-button-2 > input").attr('checked')=="checked"){return false;}
            else {$(this).find(".toggle-check-button-2").trigger('click');return false;}
          }
        }
      });
    } else {
      $(".toggle-check-button-2").each(function(i, obj) {
        if ($(this).children('input').eq(0).attr('checked')) {
          if ($(this).children('input').eq(0).attr('checked')=="checked") {return false;}
          else {$(this).trigger('click');return false;}
        }else {$(this).trigger('click');return false;}
      });
    }
    $(".decide-button").trigger('click');
    //https://e5489.jr-odekake.net/e5489/cspc/CBDayTimeArriveSelRsvMyDiaPC
}else if (current_url.includes("CBVacantComp")||current_url.includes("CBAdvFinalConfNumberSeat")){
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
    let pay_method_for_ticket="cash";
    if (pay_method_for_ticket=="card") {
        $("[data-id='select1']").trigger('click') //Select the first tab
        $("input[name=settlemthdKbn][value=1]:radio").eq(0).trigger('click') //Select pay in station
    }else{ //else payment method
        $("[data-id='select2']").trigger('click') //Select the second tab
        $("input[name=settlemthdKbn][value=4]:radio").trigger('click') //Select pay in station
    }
    $('html, body').scrollTop( $(document).height());
    //$(".payment-method__choice-list").children('li').eq(0).children('label').children('input').trigger('click');
    let pay_the_final_bill=false;
    if (pay_the_final_bill==true) {
        $(".decide-button-2#purchase-button").trigger('click');
    }
    //https://e5489.jr-odekake.net/e5489/cspc/CBRsvFinalConfNumberSeatPC
}
