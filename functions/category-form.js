$(document).ready(function() {
    $(".category").hover(
      function() {
        $(this)
          .siblings()
          .css("z-index", "1");
        $(this).css("z-index", "2");
      },
      function() {
        $(".category").css("z-index", "0");
      }
    );
  });