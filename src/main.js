// Front end logic.
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  $("#userForm").submit(function(event){

    let doctorName = $("#doctorName").val();
    let doctorFirstName;
    let doctorMiddleName;
    let doctorLastName;
    let doctorSearchName;

    if (doctorName.includes(" ")  === true){
      if (doctorName.split(" ").length === 2) {
        let doctorNameArray = doctorName.split(" ");
        doctorFirstName = doctorNameArray[0];
        doctorLastName = doctorNameArray[1];
        doctorMiddleName = "";
        doctorSearchName = (doctorFirstName + "%20" + doctorLastName)
        } else if (doctorName.split(" ").length === 3) {
        let doctorNameArray = doctorName.split(" ");
        doctorFirstName = doctorNameArray[0];
        doctorMiddleName = doctorNameArray[1];
        doctorLastName = doctorName[2];
        doctorSearchName = (doctorFirstName + "%20" + doctorMiddleName + "%20" + doctorLastName)
        }
      } else if (doctorName.includes(" ") === false){
        doctorSearchName = doctorName;
      }


    let symptomsString = $("#symptoms").val();
    let symptoms = [];
    let symptomsSearch = "";

    if (symptomsString.includes(" ") === true){
      symptoms = symptomsString.split(" ");
      for (var i = 0; i < symptoms.length; i++) {
        symptomsSearch += symptoms[i] + "%20"
      }
    } else if (symptomsString.includes(" ") === false){
      symptomsSearch = symptomsString;
    }

    let doctorGender = $("#doctorGender").children("option:selected").val();
    let sorter = ;
    let resultLimit = ;

    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorSearchName}&query=test&gender=male&sort=full-name-asc&skip=0&limit=10&user_key=36e0dc0a20d11c7bcdb9f197dc18371e`)









    event.preventDefault();

  });
});
