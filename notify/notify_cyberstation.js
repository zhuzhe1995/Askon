// ==UserScript==
// @name        notify_cyberstation
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  try to take over the world!
// @author       You
// @match     https://www1.jr.cyberstation.ne.jp/jcs/Vacancy.do
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @grant       GM_addStyle
// @grant       GM_log
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

//--- Use jQuery to add the form in a "popup" dialog.

var vacancy_exist=false;
var available_train="";
var dt = new Date();
$("table#table_vacancy tbody tr").each(function(n,obj){
    var train_name=$(this).find(".table_train_name").text()
      +$(this).find(".table_vacancy_time").text();
    if ($(this).children("td").eq(1).text().includes('○')){
        $(this).css("background-color","lightpink");
        vacancy_exist=true;
        available_train+=
          train_name.replaceAll('\t','').replace('\n\n','->');
    }
    if ($(this).children("td").eq(1).text().includes('△')){
        $(this).css("background-color","lightgreen");
        vacancy_exist=true;
        available_train+=
          train_name.replaceAll('\t','').replace('\n\n','->');
    }
});
if (!('Notification' in window)){
    alert('未対応のブラウザです');
}
else if (Notification.permission==='granted'){}
else if (Notification.permission!=='denied') {
    Notification.requestPermission().then((permission) => {
        if (permission == 'granted'){}
        else if (permission == 'denied'){}
        else if (permission == 'default'){}
    });
}
if (vacancy_exist) {
    var train_date=$("#table_vacancy>thead>tr:nth-child(1)>th>span:nth-child(1)").text()
    GM_log(dt.toLocaleString('ja')+train_date+available_train);
    var noti= new Notification(
        "JR CYBER STATION 空席あり"+train_date,
        {
            body: dt.toLocaleString('ja')
                    +"\n"+available_train.replace(/\n+$/, ""),
            icon: 'https://image.jr.cyberstation.ne.jp/images/common/icons/normal.png',
            tag: '',
            data: {
                xxx: '開発中'
            }
        });
    noti.onclick=function(e) {window.focus();}
    const poi_voice_notification = "https://www.myinstants.com/media/sounds/poi.mp3";
    new Audio(poi_voice_notification).play();
    var google_sheet_url="";
    if (google_sheet_url.includes("https://script.google.com"))
    {$.ajax({
        url:google_sheet_url,
        method:'POST',
        data:{Fetch_Time: dt.toLocaleString('ja'), Travel_Date: train_date,
              Train_Info: available_train.replaceAll('\n','')}
    }).done(function(data, textStatus, jqXHR){
        //console.log(data);
        console.log(jqXHR.responseText);
        $("body").append("<div><p>"+jqXHR.responseText+"</p></div>");
    });}//send information to google sheet
    setTimeout(noti.close.bind(noti),8*1000);
}
else {
    GM_log(dt.toLocaleString('ja')+" no available");
}

var reload_time=2;// 2 minutes
var current_minutes=dt.getHours()*60+dt.getMinutes()+dt.getTimezoneOffset()+540;
if (current_minutes<360 || current_minutes+reload_time>=1430) {
    var rest_time=(1800-current_minutes)%1440;
    setTimeout(function(){ location.reload(); }, rest_time*60*1000);
}else {
    setTimeout(function(){ location.reload(); }, reload_time*60*1000);
}