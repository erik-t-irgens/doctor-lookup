// Front end logic.
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetAPI, formatDoctorName, formatSymptoms } from "./doctor-lookup.js";

// import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {



setTimeout(function(){

  $("#introCard").slideDown(2000);
  $("#userForm").show();

  setTimeout(function(){
    $("#blankFiller").slideUp(2000);
    $("#formCard").slideDown(2000);

  }, 5000);
}, 2000);

setInterval(function(){
  $("#resultLimitUpdate").text("Number of results: " + parseInt($("#resultLimit").val()))
}, 50);




  $("#userForm").submit(function(event){

    let doctorName = $("#doctorName").val();


    let doctorSearchName = formatDoctorName(doctorName);

    let symptomsString = $("#symptoms").val();

    let symptomsSearch = formatSymptoms(symptomsString);

    let doctorGender = $("#doctorGender").children("option:selected").val();
    let sorter = $("#sorter").children("option:selected").val();
    let resultLimit = parseInt($("#resultLimit").val());


    $("#resultArea").slideUp();
    $("#resultArea").html("");

console.log(`https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorSearchName}&query=${symptomsSearch}&gender=${doctorGender}&sort=${sorter}&skip=0&limit=${resultLimit}&user_key=${process.env.exports.apiKey}`);

    GetAPI(doctorSearchName, symptomsSearch, doctorGender, sorter, resultLimit).then(function(response){

      if (response.data.length === 0){
        $("#resultArea").html("<div class='alert alert-warning' role='alert'>Search provided no results. Try changing your search criteria! (Change the name, or your symptom!)</div>").slideDown(2000);
      } else if (response.data.length > 0){
        $("#resultArea").append("<div class='alert alert-success' role='alert'>Below are your results</div>");
        for (var i = 0; i < response.data.length; i++) {
          $("#resultArea").append("<div class='card bg-dark border-success resultantCard'><div class='card-header'id='" + "cardNumber"+ i + "'<h3>" + response.data[i].profile.first_name + " " + response.data[i].profile.last_name + "</h3><br></div><div class='card-body' id='" + "cardBody" + i + "'><img src='" + response.data[i].profile.image_url + "' alt='A picture of " + response.data[i].profile.first_name + " " + response.data[i].profile.last_name + "'><hr><p>Bio: " + response.data[i].profile.bio + "</p></div><hr>");



          if (response.data[i].practices.length > 0){
            if (response.data[i].practices[0].phones.length > 0){
              $("#cardBody" + i).append(`<p>Phone: ${response.data[i].practices[0].phones[0].number} </p><hr>`);
            }
          }

          if (response.data[i].practices.length > 0){
            $("#cardBody" + i).append(`<p>Address: ${response.data[i].practices[0].visit_address.street},   ${response.data[i].practices[0].visit_address.city}  ${response.data[i].practices[0].visit_address.state}</p>`);
          }

          if (response.data[i].practices.length > 0 && response.data[i].practices[0].website){
            $("#cardBody" + i).append(`<p>Website: </p><a href="${response.data[i].practices[0].website}">${response.data[i].practices[0].website}</a>`);
          }

          if (response.data[i].practices.length > 0 && response.data[i].practices[0].accepts_new_patients){
            if (response.data[i].practices[0].accepts_new_patients === true) {
              $("#cardBody" + i).append(`<p class="emphatic">This doctor is currently accepting new patients.</p>`);
            } else if (response.data[i].practices[0].accepts_new_patients === false) {
              $("#cardBody" + i).append(`<p class="emphaticBad">This doctor is currently NOT accepting new patients.</p>`);
            }
          }
        }
        $("#resultArea").slideDown(2000);
      }


      console.log(response);
    }).fail(function(error){
      $("#resultArea").append("<div class='alert alert-danger' role='alert'>There was an error processing your request. Make sure you fill in either a symptom, a name, or both!</div>" + "<p> Error Number: 400</p>");
      $("#resultArea").slideDown();
      console.log("Error!");
    });



    event.preventDefault();

  });


});
