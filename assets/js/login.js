$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$("#login").click( function()
    {
        console.log("a");
        window.location = "../../dashboard.html";
    }
);