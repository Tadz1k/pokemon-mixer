$(document).ready(function () {
    $('#battleLink').click(function(){
        let url = $(this).attr('href');
        $('body').css('animation', 'backOutRight 3000ms');
        setTimeout(function() {
            document.location.href = url;
        }, 1000);
        return false;
      });

    $('#homeLink').click(function(){
        let url = $(this).attr('href');
        $('body').css('animation', 'backOutRight 3000ms');
        setTimeout(function() {
            document.location.href = url;
        }, 1000);
        return false;
    });
});