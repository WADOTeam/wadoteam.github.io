$('.message a').click(function () {
  $('form').animate({height: 'toggle', opacity: 'toggle'}, 'slow')
})

$('#login').click(function () {
    window.location = '/dashboard.html'
  }
)