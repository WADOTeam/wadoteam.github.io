type = ['', 'info', 'success', 'warning', 'danger']

demo = {
  initDashboardPageCharts: function () {

    var issue = [12, 12, 7, 17, 23, 18, 38]

    dataDailySalesChart = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        issue
      ]
    }

    optionsDailySalesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart)

    md.startAnimationForLineChart(dailySalesChart)

  },
  showNotification: function (from, align) {
    color = Math.floor((Math.random() * 4) + 1)

    $.notify({
      icon: 'notifications',
      message: 'Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer.'

    }, {
      type: type[color],
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },

  initProjectPage: function () {
    $.ajax({
      dataType: 'json',
      url: 'https://wado-project.herokuapp.com/users/1/projects'
    }).done(function (data) {
      $('#projects').DataTable({
        data: data,
        ordering: false,
        searching: false,
        pagingType: 'full_numbers',
        responsive: true,
        rowId: 'id',
        columns: [
          {title: 'Id', data: 'id'},
          {title: 'Title', data: 'title'},
          {title: 'Description', data: 'description'},
          {
            data: null,
            className: 'center',
            defaultContent: '<a href="#" class="edit_project btn btn-primary btn-simple">Edit</a>'
            + '<a href="recomandation.html?id=1" class="btn btn-primary btn-simple">Recommendations</a>'
          }
        ]
      })
    })
  },

  initUserPage: function () {

    $.ajax({
      url: 'https://wado-project.herokuapp.com/languages'
    }).then(function (response) {
      $('#languagesList').select2({
        allowClear: true,
        placeholder: 'Select languages',
        data: $.map(response, function (item) {
          return {
            text: item.language,
            id: item.language
          }
        })
      })
    })

    $('#frameworksList').select2({
      allowClear: true,
      placeholder: 'Select frameworks',
    })

    $('#operatingSystemsList').select2({
      allowClear: true,
      placeholder: 'Select an operating system',

    })

    $('#serversList').select2({
      allowClear: true,
      placeholder: 'Select a server',

    })

    $('#compilersList').select2({
      allowClear: true,
      placeholder: 'Select a compiler',
    })

    $('#databasesList').select2({
      allowClear: true,
      placeholder: 'Select a database',
    })

    $('#idesList').select2({
      allowClear: true,
      placeholder: 'Select an IDE',
    })

    $('#pluginsList').select2({
      allowClear: true,
      placeholder: 'Select a plugin',
    })

    $('#user-data-submit').click(function () {
      var userInfo = {}
      var inputs = $('#user-data input')
      for (var i = 0; i < inputs.length; i++) {
        if ($(inputs[i]).attr('name') != undefined && $(inputs[i]).val().length > 1) {
          userInfo[$(inputs[i]).attr('name')] = $(inputs[i]).val()
        }

      }
      var inputs = $('#user-data select')
      for (var i = 0; i < inputs.length; i++) {
        if ($(inputs[i]).attr('name') != undefined && $(inputs[i]).val().length > 1) {
          userInfo[$(inputs[i]).attr('name')] = $(inputs[i]).val()
        }

      }

      $.ajax({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          title: userInfo.name,
          description: userInfo.description,
          user: {
            id: 1
          }
        }),
        url: 'https://wado-project.herokuapp.com/projects',
        dataType: 'json',
        type: 'POST'
      })
        .done(function (data) {

          console.log(data)
          let projId = data.id

          for (let i in userInfo) {
            if (i == 'name' || i == 'description') continue

            if (Array.isArray(userInfo[i])) {
              for (let j in userInfo[i]) {
                $.ajax({
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  data: JSON.stringify({
                    project: {
                      id: projId
                    },
                    characteristicType: i,
                    characteristicValue: userInfo[i][j]
                  }),
                  url: 'https://wado-project.herokuapp.com/characteristics',
                  dataType: 'json',
                  type: 'POST'
                }).done(function (data) {
                  console.log(data)
                })
              }
            }
          }

          $.ajax({
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            data: JSON.stringify({
              project: {
                id: projId
              },
              characteristicType: i,
              characteristicValue: userInfo[i]
            }),
            url: 'https://wado-project.herokuapp.com/characteristics',
            dataType: 'json',
            type: 'POST'
          }).done(function (data) {
            console.log(data)
            window.location = '/dashboard.html'
          })
        })
    })
  },
  initDashboardPage: function () {

    $('#' + Object.keys(tabs)[0]).parent().addClass('active')

    $('#suggestion-table .text-danger').click(function (target) {
      var repo = $('#suggestion-table tr td:nth-child(2)')
      window.location.href = '/provenance.html?giturl=' + repo.text()
    })
  },
  initProvenance: function () {
    var url_string = window.location.href
    var url = new URL(url_string)
    var repo = url.searchParams.get('giturl')
    $.ajax({
      url: 'https://wado-project.herokuapp.com/repositories/provenance?repo=' + repo,
      type: 'GET',
      contentType: 'application/html',
      success: function (res) {
        res = res.replace('btn btn-default btn-sm', 'disable-button')
        $('#provenance-wrapper').append(res)
        $('.loader').addClass('disable-button')

      },
      error: function (err) {
        console.log('error')
      }
    })
  },
  showNotification: function (from, align, message) {
    type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary']

    color = Math.floor((Math.random() * 6) + 1)

    $.notify({
      icon: 'notifications',
      message: message

    }, {
      type: type[color],
      timer: 3000,
      placement: {
        from: from,
        align: align
      }
    })
  },

  initRecomandationPage: function () {

        var template = "<tr>\n" +
            "<td>!name</td>\n" +
            "<td>!desc</td>\n" +
            "<td>!license</td>\n" +
            "<td>!list</td>\n" +
            "<td>!arr</td>\n" +
            "</tr>";
        var headerTemplate = "<td colspan=\"5\" class=\"text-center table-h\"> !a</td>\n"
        var url_string = window.location.href
        var url = new URL(url_string)
        var id = url.searchParams.get('id')
        $.ajax({
            type: "GET",
            url: "https://wado-project.herokuapp.com/" + id + "/recomandation",
            cache: false,
            success: function (data) {
                for (var i in data) {
                    var dataValues = data[i][0];
                    $("#suggestion-table").append(headerTemplate.replace("!a", i));
                    $("#suggestion-table").append(
                        template.replace("!name", dataValues[0])
                            .replace("!desc", dataValues[1])
                            .replace("!license", dataValues[2])
                            .replace("!list", getListOfRepo(dataValues[3]))
                            .replace("!arr", getListOfArrows(dataValues[3])));
                }
            },
            error: function (error) {
                alert("Internal error");
            }
        });

    $('#suggestion-table .text-danger').click(function (target) {
      var repo = $('#suggestion-table tr td:nth-child(2)')
      window.location.href = '/provenance.html?giturl=' + repo.text()
    })

    setArchitecturelRecomandation(id)

  }

}

var getListOfRepo = function (data) {
  var template =
    '<li>\n' +
    '<a href="!n">!r</a>\n' +
    '</li>\n'
  var list = '<ul>'
  for (var i = 0; i < data.length; i++) {
    list += template.replace('!n', data[i]).replace('!r', data[i])
  }
  return list + '</ul>'

}

var getListOfArrows = function (data) {
  var template =
    '<li><a class="text-danger" href="!#"><i class="material-icons">arrow_forward</i></a></li>'
  var list = '<ul>'
  for (var i = 0; i < data.length; i++) {
    list += template.replace('!#', '/provenance.html?giturl=' + data[i])
  }
  return list + '</ul>'

}

var setArchitecturelRecomandation = function (id) {
  var template = '<tr>\n' +
    '<td>!pattern</td>\n' +
    '<td>!desc</td>\n' +
    '</tr>'

  $.ajax({
    type: 'GET',
    url: 'https://wado-project.herokuapp.com/' + id + '/arhitecture_informations',
    cache: false,
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        var name = Object.keys(data[i])[0]
        var description = data[i][name]
        $('#suggestion-table-arhitecture').append(
          template.replace('!pattern', name.replace(/_/g, ' '))
            .replace('!desc', description).replace('@en', ''))
      }
    },
    error: function (error) {
      alert('Internal error')
    }
  })
}