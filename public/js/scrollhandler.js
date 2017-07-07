$('.btn').click(function(){
    $('#mylist').animate({scrollTop: $('#mylist').prop("scrollHeight")}, 500);
});