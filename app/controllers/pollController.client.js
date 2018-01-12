'use strict';

(function ($) {

   var addButton = document.querySelector('#btn-submit') || null;
   var deleteButton = document.querySelector('.btn-delete') || null;
   var pollList = document.querySelector('#poll-list');
   var apiUrl = appUrl + '/api/poll';

   function updatePollList (data) {
      var polls = JSON.parse(data);
       var html=''
      for(var i=0;i<polls.length;i++) {
         var poll = polls[i]
         html += '<li class="list-group-item"><a href="/poll/'+poll.id+'">'+poll.pollname+'</a>'
         for(var j = 0; j < poll.options.length; j++) {
            var option = poll.options[j];
            for (var key in option)
               html += '<span>' + key + ':' + option[key] + '</span>';
         }
         html += '</li>';
      }
     
      $(pollList).append(html);
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollList));

/*if(addButton) {
    addButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollList);
      });

   }, false);
}*/


  /* deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollList);
      });

   }, false);*/

})(jQuery);
