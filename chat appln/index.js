
$(function (){

  //sending a message
  // When the user clicks the send button (.fa-paper-plane) or presses the Enter key (key == 13), the text in the input field (.type_here) is cloned from a template message and appended to the active chat box (.message_box.active).
  $(".fa-paper-plane").click(function(){
    var text = $(".type_here").val();
    if (text) {
      var new_text = $(".template .message").clone();
      new_text.children(".content").text(text);
      new_text.children(".message_time").text(current_time());
      $(".message_box.active").append(new_text);
      $(".message_box").scrollTop(10000);
    };
    $(".type_here").val("");

    setTimeout (function (){
      var new_text = $(".template .message").clone();
      new_text.toggleClass("green white");
      new_text.children(".content").text("Happiness is the meaning and purpose of life, the aim and end of one's existence");//auto response message
      new_text.children(".message_time").text(current_time());
      $(".message_box.active").append(new_text);
      $(".header_right").find(".message_time").text(current_time());
      $(".chat_list").children(".contact.active").find(".sentence").text("Happiness is the meaning and purpose of life, the aim and end of one's existence").css("color", "black").css("font-weight","Bold");
      $(".chat_list").children(".contact.active").find(".message_time").text(current_time());
      $(".message_box").scrollTop(10000);
    }, 1000);

  });
  $(".type_here").keypress(function(e) {
      var key = e.which;
      if (key == 13) {
        $(".fa-paper-plane").click();
        return false;
      }
    });

    //contact search
    //When the user types in the search bar (.searchme), it filters through the contacts list by comparing the typed input with the contact names (.firstname). Only matching contacts remain visible.
  $(".searchme").keyup(function() {
      var lookup = $(this).val().toLowerCase();
      $(".contact").each(function() {
        if ($(this).find(".firstname").text().toLowerCase().includes(lookup)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });

    //switching chat conversations
    //When a contact is clicked, it activates the respective chat conversation by matching the contact's data-chat attribute to the corresponding .message_box.
    //It also updates the header section with the contact’s name and profile picture.
  $(".contact").click(function() {
    var talk = $(this).attr("data-chat");
    var talkscreen = $('.message_box[data-chat="'+talk+'"]');
    $(".message_box").removeClass("active");
    $(".contact").removeClass("active");
    talkscreen.addClass("active");
    $(this).addClass("active");
    var name = $(".contact.active").find(".firstname").text();
    $(".header_right").children(".name").find(".firstname").text(name);
    var photo = $(this).find("img").attr("src");
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
