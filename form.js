$(document).ready(function() {
  'use strict';

  let $fCheck         = $('#f-check'),
      $fButton        = $('#f-button'),
      formData        = {},
      regExpEmail     = /^[a-z0-9_-]{2,16}@[0-9a-z_-]+\.[a-z]{2,5}$/i,
      dataJSON;

  //Validation checkbox
  $fCheck.on('change', function() {
    if(this.checked) {
      $fButton.css('cursor', 'pointer');
      $fButton.on('click', toValidForm);
    } else {
      $fButton.css('cursor', 'not-allowed');
      $fButton.off('click', toValidForm);
    }
  });

  // Functions

  // Validation form
  function toValidForm() {
    let resBool;

    toValidEmail(regExpEmail, $('#email'), $('#email-warning'));

    toValidInput($('#name'), $('#name-warning'));
    toValidInput($('#first_date'), $('#first_date-warning'));
    toValidInput($('#last_date'), $('#last_date-warning'));

    resBool = toValidInput($('#name'), $('#name-warning')) && 
    toValidEmail(regExpEmail, $('#email'), $('#email-warning')) && 
    toValidInput($('#first_date'), $('#first_date-warning')) && 
    toValidInput($('#last_date'), $('#last_date-warning'));

    if(resBool) {
      positiveAnswer();
    } else {
      negativeAnswer();
    }
  }

  // Validation inputs
  function toValidInput(input, result) {
    
    if(input.val() == false) {
      result.html('Pole wymagane');
      return false;
    } else {
      result.html('');
      return true;
    }
  }

  function toValidEmail(regExp, input, result) {  
    if(input.val() == false) {
      result.html('Pole wymagane');
      return false;
    } else if( regExp.test(input.val()) == false ) {
      result.html('Email nie jest poprawny');
      return false;
    } else {
      result.html('');
      return true;
    }
  }


  // Answers
  function negativeAnswer() {
    $('#form-result').css({
      'padding': '30px',
      'background-color': '#fc0'
    });
    $('#form-result>span').html('Nie wprowadzono wszystkich danych.').css('color', '#555');
  }

  function positiveAnswer() {
    $('#form-result').css({
      'padding': '30px',
      'background-color': '#4CD964'
    });
    $('#form-result>span').html('Dziękujemy - wiadomość została wysłana!').css('color', '#E3FFF5');

    toCreateQueryAndSubmitIt();
  }

  // Create and submit JSON files to server
  function toCreateQueryAndSubmitIt() {
    // Our data
    formData = {
      'name': $('#name').val(),
      'tel': $('#tel').val(),
      'email': $('#email').val(),
      'adres': $('#adres').val(),
      'firstDate': $('#first_date').val(),
      'firstTime': $('#first_time').val(),
      'lastDate': $('#last_date').val(),
      'lastTime': $('#last_time').val()
    };

    //Change time's value
    if(formData['firstTime'] == '---') {
      formData['firstTime'] = '';
    }
    if(formData['lastTime'] == '---') {
      formData['lastTime'] = '';
    }

    //Our data to JSON format
    dataJSON = JSON.stringify(formData); // If you want to using JSON file

    // Our query
    $.ajax({
      type: "POST", // Method
      url: "process.php", //Our process file in server, if here will be another file you have to change this url
      data: formData // Our data (now is js obj)
    });

  }















  


});