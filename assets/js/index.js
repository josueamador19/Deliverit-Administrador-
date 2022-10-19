let toggleMenu = false;

function clickMenu() {
    const widtSide = toggleMenu ? '170px' :  '56px';
    $('.sideMenu').css('width', widtSide);
    toggleMenu = !toggleMenu;
}

$('.itemListSide').click(function() {
    $('.sideActive').removeClass('sideActive');
    $(this).addClass('sideActive');
})