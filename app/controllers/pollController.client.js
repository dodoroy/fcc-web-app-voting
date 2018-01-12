'use strict';

(function ($) {

   var addButton = document.querySelector('#btn-submit') || null;
   var deleteButton = document.querySelector('.btn-delete') || null;
   var pollList = document.querySelector('#poll-list');
   var apiUrl = appUrl + '/api/poll';

   function updatePollList (data) {
      var polls = JSON.parse(data);
       var html = '';
      for(var i = 0; i < polls.length; i++) {
         var poll = polls[i]
         html += '<li class="list-group-item"><a href="/poll/'+poll.id+'">'+poll.pollname+'</a><a class="del" href="#" data-id="'+poll.id+'">delete</a>'
         for(var key in poll.options) {

               html += '<span>' + key + ':' + poll.options[key] + '</span>';
         }
         html += '</li>';
      }
     
      $(pollList).append(html);
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollList));

   $('body').delegate('.del', 'click', function(e) {
      
      var $this = $(this);
      
      e.preventDefault();
      
      var id = $(this).data('id');
      var delUrl = apiUrl + '/' + id;
      
      ajaxFunctions.ajaxRequest('DELETE', delUrl, function(data) {
         var tmp = JSON.parse(data);
         if (tmp.ok == 1)
            $this.parent('li').remove();
      })
   });
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
