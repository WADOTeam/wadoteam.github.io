(function ($, hello) {
  hello.init({
    github: 'ac472ac90516733d44d8'
  }, {
    redirect_uri: './redirect.html'
  })

  var online = function (session) {
    var currentTime = (new Date()).getTime() / 1000
    return session && session.access_token && session.expires > currentTime
  }

  var showLoggedIn = function () {
    $('.logged-in').show()
    $('.not-logged-in').hide()
  }
  var hideLoggedIn = function () {
    $('.logged-in').hide()
    $('.not-logged-in').show()
  }

  var checkButton = function () {
    var github = hello('github').getAuthResponse()
    if (online(github)) {
      showLoggedIn()
    } else {
      hideLoggedIn()
    }
  }

  checkButton()

  window.loginWithGithub = function () {
    var github = hello('github').getAuthResponse()
    if (online(github) != null) {
      hello('github')
        .logout({options: {force: true}})
        .then(function () {
          hideLoggedIn()
        }, function (reason) { console.log(reason) })
    } else {
      hello('github')
        .login({scope: 'repo, user'})
        .then(function () {
          showLoggedIn()
        }, function (reason) { console.log(reason) })
    }
  }

  var dataSet = []

  $('#repositories').on('click', 'a.import_one_repo', function (e) {
    e.preventDefault()

    var id = $(this).closest('tr').get(0).id

    var repo

    $.each(dataSet, function (index, item) {
      if (item.id == id) {
        repo = item
      }
    })

    if (!repo) {
      return
    }

    $.ajax({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        title: repo.full_name,
        description: repo.description,
        user: {
          id: 1
        }
      }),
      url: 'https://wado-project.herokuapp.com/projects',
      dataType: 'json',
      type: 'POST'
    })
      .done(function (data) {
        demo.showNotification('top', 'right', 'Project successfully imported')
      })
  })

  window.userRepos = function () {
    var github = hello('github')

    github.api('/user/repos')
      .then(function (r) {
        $.each(r.data, function (key, item) {
          dataSet.push({
            full_name: item.full_name,
            language: item.language,
            description: item.description,
            id: item.id
          })
        })

        $('#repositories').DataTable({
          data: dataSet,
          ordering: false,
          searching: false,
          pagingType: 'full_numbers',
          responsive: true,
          rowId: 'id',
          columns: [
            {title: 'Name', data: 'full_name'},
            {title: 'Language', data: 'language'},
            {
              data: null,
              className: 'center',
              defaultContent: '<a href="#" class="import_one_repo btn btn-primary btn-simple">Import</a>'
            }
          ]
        })
      })
  }
})(jQuery, hello, window)