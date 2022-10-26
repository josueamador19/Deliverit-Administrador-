let toggleMenu = false;

function clickMenu() {
    const widtSide = toggleMenu ? '170px' :  '56px';
    toggleMenu = !toggleMenu;
    $('.sideMenu').css('width', widtSide);
}

$('.itemListSide').click(function() {
    $('.sideActive').removeClass('sideActive');
    $(this).addClass('sideActive');
    const nameCat = $('span', this).html()
    $('.frameActive').removeClass('frameActive');
    console.log($('#'+nameCat));
    $('#'+nameCat).addClass('frameActive');
    $('#title').html(nameCat)
})

