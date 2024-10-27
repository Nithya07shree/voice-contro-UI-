
$(function (){

    //sending a message
    $(".fa-paper-plane").click(function(){ //user clicks send button
      var text = $(".type_here").val();
      if (text) {
        var new_text = $(".template .message").clone(); //text from input field is cloned
        new_text.children(".content").text(text);
        new_text.children(".message_time").text(current_time());
        $(".message_box.active").append(new_text); //appended to the active chat box (.message_box.active).
        $(".message_box").scrollTop(10000);
      };
      $(".type_here").val("");
  
      setTimeout (function (){
        var new_text = $(".template .message").clone();
        new_text.toggleClass("green white");
        new_text.children(".content").text("This is an auto response message");//auto response message
        new_text.children(".message_time").text(current_time());
        $(".message_box.active").append(new_text);
        $(".chat_list").children(".contact.active").find(".sentence").text("Happiness is the meaning and purpose of life, the aim and end of one's existence").css("color", "black").css("font-weight","Bold"); 
        $(".message_box").scrollTop(10000);
      }, 1000);
  
    });
  
      //contact search
    $(".searchme").keyup(function() { //user types in search box
        var lookup = $(this).val().toLowerCase();
        $(".contact").each(function() { //compares input with contact names
          if ($(this).find(".firstname").text().toLowerCase().includes(lookup)) {
            $(this).show();
          } else {
            $(this).hide();
          }
        });
      });
  
      //switching chat conversations
      //It also updates the header section with the contact’s name and profile picture.
    $(".contact").click(function() { //contact is clicked
      var talk = $(this).attr("data-chat");
      var talkscreen = $('.message_box[data-chat="'+talk+'"]');
      $(".message_box").removeClass("active"); //activates contact's data chat with message box
      $(".contact").removeClass("active");
      talkscreen.addClass("active");
      $(this).addClass("active");
      var name = $(".contact.active").find(".firstname").text(); //update header contact name
      $(".header_right").children(".name").find(".firstname").text(name);
      var photo = $(this).find("img").attr("src"); //update header profile pic
      $(".header_right").children("img").attr("src", photo)
    });
  
    //message options, info
    $(document).on("click", ".message i", function() {
      $(this).parent(".message").find(".message_options").toggleClass("active");
    });
  
    //message option, delete
    $(document).on("click", ".message_delete", function() {
      $(this).closest(".message").hide();
    });
  });
  
  //Helper Function: current_time()
  //This function returns the current time formatted as HH:MM. Minutes and hours less than 10 are prepended with a "0" to ensure consistent two-digit formatting.
  function current_time() {
     var d = new Date();
     var m = d.getMinutes();
     var h = d.getHours();
  
     if (m < 10) {
       m = "0" + m;
     };
     if (h < 10) {
       h = "0" + h;
     }
     return h + ":" + m;
  };
  
//speech to text
window.onload = ()=>{
    setTimeout(startVoiceRecognition,1000);
}  

// Function to trigger search
function triggerSearch(query) {
    const lookup = query.toLowerCase();
    $(".contact").each(function() {
        if ($(this).find(".firstname").text().toLowerCase().includes(lookup)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

//function to switch message box
function openMessageBox(query){
    $(".contact").each(function() {
        const contactName = $(this).find(".firstname").text().toLowerCase();
        if (contactName.includes(query.toLowerCase())) {
            $(this).click(); // Trigger click on the matching contact
        }
    });
}

// Function to send a message to a specified user
function sendMessageToUser (message) {
  if (typeof message !== 'undefined' && message) {
    var text = $(".template .message").clone(); // Clone the message template
    text.children(".content").text(message); // Set the message content
    text.children(".message_time").text(current_time()); // Set the message time
    $(".message_box.active").append(text); // Append the new message to the active message box
    $(".message_box").scrollTop(10000); // Scroll to the bottom of the message box
}
}


//start voice recognition
function startVoiceRecognition(){
    const recognition=new(window.SpeechRecognition || window.webkitSpeechRecognition)()
    recognition.lang='en-Us'

    recognition.onstart=()=>{
        console.log('Voice recognition activated');
    }

    recognition.onresult=(event)=>{
        const transcript=event.results[0][0].transcript.toLowerCase();
        if(transcript.includes('send a message')){
          const parts = transcript.split(" to ");
          const message = parts[0].replace("send a message ", "").trim();
          const person = parts[1].trim();

          console.log("message "+message);
          console.log("person "+person);
          triggerSearch(person);
          openMessageBox(person);
          document.querySelector(".type_here").value = message;
          sendMessageToUser(message);
          $(".type_here").val(""); //clear the input field after sending the message

          
        }else if(transcript.includes('delete message')){
          deleteMessage();
        }else {
            document.getElementById('speechOutput').textContent = transcript + ".Please repeat";
            alert('Command not recognized. Please repeat');
        }
    }
    
    recognition.onerror=(event)=>{
        console.log('Speech recognition error detected'+event.error)
    }

    recognition.onend=()=>{
        console.log('Voice recgonition service disconnected')
        startVoiceRecognition()
    }

    recognition.start()
}

function deleteMessage() {
  
}