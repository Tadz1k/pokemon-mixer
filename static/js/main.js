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
              $('#ash').show(2000, 'easeOutCirc', function() {
                  document.location.href = url;
              });
            });
        });
        return false;
      });
});
