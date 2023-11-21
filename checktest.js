document.getElementById("jsSelectYear").value="2023"
document.getElementById("jsSelectMonth").value="12"
document.getElementById("jsSelectDay").value="12"
document.getElementById("jsSelectHour").value="21"
document.getElementById("jsSelectMinute").value="00"
document.getElementById("jsSelectTrainType").value="seto" // seto or izumo
var departID=document.getElementById("inputDepartStName");
Array.from(document.querySelector("#inputDepartStName").options).forEach(function(option_element) {
             let option_text = option_element.text;
             //var testnameText = testnameText + option_text +", ";
                //console.log("TestnameText: "+testnameText);
                //console.log(option_element.selected);
                //console.log("\n\r");
            if (option_element.text=="東京") departID.value=option_element.value;
    });
var arriveID=document.getElementById("inputArriveStName");
Array.from(document.querySelector("#inputArriveStName").options).forEach(function(option_element) {
             let option_text = option_element.text;
             //var testnameText = testnameText + option_text +", ";
                //console.log("TestnameText: "+testnameText);
                //console.log(option_element.selected);
                //console.log("\n\r");
            if (option_element.text=="岡山") arriveID.value=option_element.value;
    });
 
//$('#submitButton').prop('disabled', false).removeClass('basic-button--disabled');
var a=document.getElementById('submitButton')
//a.setAttribute('disabled','false')
a.classList.remove('basic-button--disabled')
a.classList.remove('disabled')

$(".toggle-check-button-2").each(function(i, obj) {
    if ($(this).children('input').eq(0).checked) {
        if ($(this).children('input').eq(0).checked="checked") {return false;}
        else {$(this).trigger('click');return false;}
    }else {//test
        $(this).trigger('click');
        return false;
    }
});
$(".decide-button").trigger('click');//https://e5489.jr-odekake.net/e5489/cspc/CBDayTimeArriveSelRsvMyDiaPC
$(".decide-button").trigger('click');//https://e5489.jr-odekake.net/e5489/cspc/CBVacantCompPC
$(".decide-button").trigger('click');//https://e5489.jr-odekake.net/e5489/cspc/CBRoutePC
$(".toggle-check-button").eq(1).trigger('click');//https://e5489.jr-odekake.net/e5489/cspc/CBNumberSeatPC
$(".toggle-check-button").eq(6).trigger('click');//https://e5489.jr-odekake.net/e5489/cspc/CBNumberSeatPC
$(".decide-button").trigger('click');//https://e5489.jr-odekake.net/e5489/cspc/CBNumberSeatPC
$(".payment-method__choice-list").children('li').eq(0).children('label').children('input').trigger('click');//https://e5489.jr-odekake.net/e5489/cspc/CBRsvFinalConfNumberSeatPC
window.location.href

$("[data-id='select2']").trigger('click') //Select the second tab
$("input[name=settlemthdKbn][value=4]:radio").trigger('click') //Select pay in station
//function setDisabledArea(set_disabled_target, checked)  in cp/common/js/lib/library.js
//removeAttribute("disabled")
