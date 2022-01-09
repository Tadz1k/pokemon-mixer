$(document).ready(function () {
    $('a.start-journey').click(function(){
        var url = $(this).attr('href');
        $('body').fadeOut(1000, function() {
            $('.wrapper').remove();
            $('body').css('background-image', 'none');
            $('body').animate({
                opacity: 'show',
                backgroundColor: "white",
            }, 500, function() {
                $('#ash').css('display', 'block');
                setTimeout(function() {
                    document.location.href = url;
                }, 1800);
            });
        });
        return false;
      });
});
