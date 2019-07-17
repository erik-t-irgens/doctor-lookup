// Backend logic with exports, functions, constructors, etc.
import $ from 'jquery';


export function formatDoctorName(doctorName){
  let doctorFirstName;
  let doctorMiddleName;
  let doctorLastName;
  let doctorSearchName;

  // if function to determine whether or not user input more than 1 name.

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
        doctorSearchName = "";
    }
    return doctorSearchName;
}


export function formatSymptoms (symptomsString){
  let symptoms;
  let symptomsSearch;

  // Counts if user input multiple symptoms!

  if (symptomsString.includes(" ") === true){
    symptoms = symptomsString.split(" ");
    for (var i = 0; i < symptoms.length; i++) {
      symptomsSearch += symptoms[i] + "%20"
    }
  } else if (symptomsString.includes(" ") === false){
    symptomsSearch = symptomsString;
  }
  return symptomsSearch;
}



export function GetAPI(name, symptom, gender, sorter, result){
  return $.get(`https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${symptom}&gender=${gender}&sort=${sorter}&skip=0&limit=${result}&user_key=${process.env.exports.apiKey}`);
}
