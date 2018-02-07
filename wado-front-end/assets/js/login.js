$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$("#login").click( function()
    {
        console.log("a");
        window.location = "http://127.0.0.1/index/dashboard.html";
    }
);