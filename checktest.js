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
 
