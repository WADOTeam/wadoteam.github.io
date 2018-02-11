type = ['', 'info', 'success', 'warning', 'danger'];


demo = {
    initDashboardPageCharts: function () {

        var issue = [12, 12, 7, 17, 23, 18, 38];

        dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                issue
            ]
        };

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
        };

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        md.startAnimationForLineChart(dailySalesChart);

    },


    showNotification: function (from, align) {
        color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "notifications",
            message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

        }, {
                type: type[color],
                timer: 4000,
                placement: {
                    from: from,
                    align: align
                }
            });
    },

    initProjectPage: function () {
        var projects = [{ name: "proiect", description: "descriere" }, { name: "proiect", description: "descriere" }];
        var templateRow = "<tr>\n" +
            "<td><<name</td>\n" +
            "<td><<desc</td>\n" +
            "<td><a class=\"text-success\" href=\"\"><i class=\"material-icons pull-right\">arrow_forward</i></a></td>\n" +
            "</tr>";
        for (var i = 0; i < projects.length; i++) {
            $("#projects").append(templateRow.replace("<<name", projects[i]["name"]).replace("<<desc", projects[i]['description']));
        }
    },

    initUserPage: function () {

        $("#languagesList").select2();
        $("#frameworksList").select2();

        $.ajax({
            url: "https://restcountries.eu/rest/v2/all"
        }).then(function (response) {
            $("#operatingSystemsList").select2({
                allowClear: true,
                placeholder: "Select an operating system",
                data: $.map(response, function (item) {
                    return {
                        text: item.name,
                        id: item.name
                    }
                })
            });
        });

        $("#serversList").select2({
            allowClear: true,
            placeholder: "Select a server"
        });
        $("#compilersList").select2({
            allowClear: true,
            placeholder: "Select a compiler"
        });
        $("#databasesList").select2({
            allowClear: true,
            placeholder: "Select a database"
        });
        $("#idesList").select2({
            allowClear: true,
            placeholder: "Select an ide"
        });
        $("#pluginsList").select2({
            allowClear: true,
            placeholder: "Select a plugin"
        });

        // var dataFromApi = {plugins: "sdf"};
        // for (var i in dataFromApi) {
        //     $("input[name=" + i + "]").val(dataFromApi[i]);
        // }

        $("#user-data-submit").click(function () {
            var userInfo = {};
            var inputs = $("#user-data input");
            for (var i = 0; i < inputs.length; i++) {
                if ($(inputs[i]).attr("name") != undefined && $(inputs[i]).val().length > 1) {
                    userInfo[$(inputs[i]).attr("name")] = $(inputs[i]).val();
                }

            }
            var inputs = $("#user-data select");
            for (var i = 0; i < inputs.length; i++) {
                if ($(inputs[i]).attr("name") != undefined && $(inputs[i]).val().length > 1) {
                    userInfo[$(inputs[i]).attr("name")] = $(inputs[i]).val();
                }

            }
            console.log(userInfo);
        }
        );
    },
    initDashboardPage: function () {
        var tabs = {
            "plugin": { icon: "extension", name: "Plugin" },
            "language": { icon: "language", name: "Language" }
        }

        var navList = $("#nav-tabs-list");
        var tabTitleTemplate = "<li>\n" +
            "<a href=\"#<<id\" data-toggle=\"tab\">\n" +
            "<i class=\"material-icons\"><<icon</i> <<title\n" +
            "<div class=\"ripple-container\"></div>\n" +
            "</a>\n" +
            "</li>";
        for (var t in tabs) {
            navList.append(tabTitleTemplate
                .replace("<<id", t)
                .replace("<<icon", tabs[t]['icon'])
                .replace("<<title", tabs[t]["name"]));
        }

        $("#" + Object.keys(tabs)[0]).parent().addClass("active");

        $("#suggestion-table .text-danger").click(function (target) {
            var repo = $("#suggestion-table tr td:nth-child(2)");
            window.location.href = "/provenance.html?giturl=" + repo.text();
        })
    },
    initProvenance: function () {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var repo = url.searchParams.get("giturl");
        $.ajax({
            url: "https://wado-project.herokuapp.com/repositories/provenance?repo=" + repo,
            type: 'GET',
            contentType: 'application/html',
            success: function (res) {
                res = res.replace("btn btn-default btn-sm", "disable-button");
                $("#provenance-wrapper").append(res);
                $(".loader").addClass("disable-button");

            },
            error: function (err) {
                console.log("error");
            }
        });
    }

};