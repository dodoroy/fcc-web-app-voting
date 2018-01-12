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
        
        var labels = [];
        var chartData = [];
        
        $('form').attr('action', apiUrl)
        $('.poll-name').html(poll.pollname);
        
        var i = 0;
        for (var key in poll.options) {
            
            var value = poll.options[key];
            
            $($('label').get(i)).text(key);
            $($('.form-check-input').get(i)).attr('value', key);
            $($('.option-val').get(i)).text(value);
            
            labels.push(key);
            chartData.push(value);
            
            i++;
        }
        
        renderChart(labels, chartData)
    }

    function renderChart(labels, chartData) {
        
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
