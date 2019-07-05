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
        doctorSearchName =  doctorName;
      } else if (doctorName === ""){
        doctrSearchName = "";
      }


    let symptomsString = $("#symptoms").val();
    let symptoms;
    let symptomsSearch;

    if (symptomsString.includes(" ") === true){
      symptoms = symptomsString.split(" ");
      for (var i = 0; i < symptoms.length; i++) {
        symptomsSearch += symptoms[i] + "%20"
      }
    } else if (symptomsString.includes(" ") === false){
      symptomsSearch = symptomsString;
    }

    let doctorGender = $("#doctorGender").children("option:selected").val();
    let sorter = $("#sorter").children("option:selected").val();
    let resultLimit = parseInt($("#resultLimit").val());


    $("#resultArea").slideUp();
    $("#resultArea").html("");

console.log(`https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorSearchName}&query=${symptomsSearch}&gender=${doctorGender}&sort=${sorter}&skip=0&limit=${resultLimit}&user_key=${process.env.exports.apiKey}`);

    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorSearchName}&query=${symptomsSearch}&gender=${doctorGender}&sort=${sorter}&skip=0&limit=${resultLimit}&user_key=${process.env.exports.apiKey}`).then(function(response){


      if (response.data.length === 0){
        $("#resultArea").html("<div class='alert alert-warning' role='alert'>Search provided no results. Try changing your search criteria! (Change the name, or your symptom!)</div>").slideDown(2000);
      } else if (response.data.length > 0){
        $("#resultArea").append("<div class='alert alert-success' role='alert'>Below are your results</div>");
        for (var i = 0; i < response.data.length; i++) {
          $("#resultArea").append("<div class='card bg-primary resultantCard'><div class='card-header'><h3>"
          + response.data[i].profile.first_name
          + " "
          + response.data[i].profile.last_name + "</h3></div><div class='card-body'>"
          + "<img src='" + response.data[i].profile.image_url
          + "' alt='A picture of "
          + response.data[i].profile.first_name
          + " "
          + response.data[i].profile.last_name
          + "'><p>" + response.data[i].profile.bio
          + "</p></div>");

          console.log(response.data[i].profile.img_url);


        }
        $("#resultArea").slideDown(2000);
      }




      console.log(response);
    }).fail(function(error){
      console.log("Error!");



    });



    event.preventDefault();

  });
});
