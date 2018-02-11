$('.message a').click(function () {
  $('form').animate({height: 'toggle', opacity: 'toggle'}, 'slow')
})

$('body').on('click', '#login', function (e) {
    e.preventDefault()
    window.location = '/dashboard.html'
  }
)