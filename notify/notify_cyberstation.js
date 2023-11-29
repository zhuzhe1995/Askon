// ==UserScript==
// @name        notify_cyberstation
// @namespace    http://tampermonkey.net/
// @version      0.0.6
// @description  try to take over the world!
// @author       You
// @match     https://www1.jr.cyberstation.ne.jp/jcs/Vacancy.do
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @require     file:///home/tzuyu/workspace/jrwest/Askon/notify/poi.wav
// @grant       GM_addStyle
// @grant       GM_log
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

//--- Use jQuery to add the form in a "popup" dialog.

var vacancy_exist=false;
var available_train="";
var dt = Date($("now"));
$("table#table_vacancy tbody tr").each(function(n,obj){
    var train_name=$(this).find(".table_train_name").text();
    if ($(this).children("td").eq(1).text().includes('○')){
        $(this).css("background-color","lightpink");
        vacancy_exist=true;
        available_train+=train_name+" ";
    }
    if ($(this).children("td").eq(1).text().includes('△')){
        $(this).css("background-color","lightgreen");
        vacancy_exist=true;
        available_train+=train_name+" ";
    }
});
if (!('Notification' in window)){
    alert('未対応のブラウザです');
}
else {
    Notification.requestPermission().then((permission) => {
        if (permission == 'granted'){}
        else if (permission == 'denied'){}
        else if (permission == 'default'){}
    });
}
if (vacancy_exist) {
    GM_log(dt+available_train);
    var noti= new Notification(
        "JR CYBER STATION 空席あり",
        {
            body: dt+available_train,
            icon: 'https://image.jr.cyberstation.ne.jp/images/common/icons/normal.png',
            tag: '',
            data: {
                xxx: '開発中'
            }
        });
    const poi = "https://www.myinstants.com/media/sounds/poi.mp3";
    new Audio(poi).play();
    setTimeout(noti.close.bind(noti),8*1000);
}
else {
    GM_log(dt+"no available");
}

setTimeout(function(){ location.reload(); }, 300*1000);