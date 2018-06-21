// check off specific todos by clicking
$('ul').on('click', 'li', function() {
    $(this).toggleClass('crossedOut');
});

// click on X spans to delete the li
$('ul').on('click', '.delete', function (event) {
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });
    event.stopPropagation();
});

$('input[type="text"]').keypress(function(event) {
    if (event.which === 13) {
        console.log('you hit enter');
        let txt = $(this).val();
        $(this).val('');
        var newElem = $('ul').append(`<li><span class='delete'><i class='fa fa-trash'></i></span> ${txt}</li>`);
    }
});

$('.fa-edit').click(function () {
    $('input[type="text"]').fadeToggle();
});