// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function buyNow() {
    question = confirm('Bạn muốn mua sản phẩm này?');
    if (question !== false) {
        alert('Cảm ơn bạn đã chọn mua sản phẩm này')
    }
}
function scrollToSection(sectionId) {
    var element = document.getElementById(sectionId);
    if (element) {
        // Cuộn đến vị trí mong muốn
        setTimeout(function () {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500); // Thời gian chờ 500ms (0.5 giây) trước khi cuộn trang

        // Ngăn chặn hành vi mặc định của liên kết
        event.preventDefault();
    }
}