'use strict';

(function ($) {

    var apiUrl = appUrl + '/api/poll/';
    var tmp = window.location.href.split('/')
    apiUrl += tmp[tmp.length-1];
    
  //  alert(apiUrl)
    var backgroundColors = [
                    "rgb(255,99,132)",
                    "rgb(255,159,64)",
                    "rgb(255,205,86)",
                    "rgb(75,192,192)",
                    "rgb(54,162,235)",
                ];
                
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, showPollInfo));
    
    function showPollInfo (data) {console.log(data)
        var poll = JSON.parse(data)[0];console.log(poll)
        $('form').attr('action', apiUrl)
        $('.poll-name').html(poll.pollname);
        for (var i = 0; i < 2; i++) {
            for (var key in poll.options[i]) {
                $($('label').get(i)).text(key);
                $($('.form-check-input').get(i)).attr('value', key);
            }
                
        }
        renderChart(poll.options)
    }

    function renderChart(options) {
        var labels = [];
        var chartData = [];
        for(var i = 0; i < options.length; i++) {
            var option = options[i];
            for (var key in option) {
                labels.push(key);
                chartData.push(option[key]);
            }
        }
        var config = {
            type: 'pie',
            data: {
                datasets: [{
                    data: chartData,
                    backgroundColor: [
                        "rgb(255,99,132)",
                        "rgb(255,159,64)"
                    ],
                    label: 'Dataset tttt1'
                }],
                labels: labels
            },
            options: {
                responsive: true
            }
        };
    
        var ctx = document.getElementById("myChart").getContext("2d");
        window.myPie = new Chart(ctx, config);
    }
    
    
})(jQuery);
