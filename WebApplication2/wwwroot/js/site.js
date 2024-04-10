// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

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

document.addEventListener("DOMContentLoaded", function () {
    var quantityInputs = document.querySelectorAll(".quantity");
    var addToCartForms = document.querySelectorAll("form[action='/ShoppingCart/AddToCart']");

    addToCartForms.forEach(function (form) {
        form.addEventListener("submit", function (event) {
            var productCard = this.closest(".card");
            if (productCard) {
                productCard.classList.add("added-to-cart-animation");
                setTimeout(function () {
                    productCard.classList.remove("added-to-cart-animation");
                }, 500);
            }
        });
    });
    quantityInputs.forEach(function (input) {
        var decreaseBtn = input.parentElement.querySelector(".minus-btn");
        var increaseBtn = input.parentElement.querySelector(".plus-btn");

        decreaseBtn.addEventListener("click", function () {
            var currentValue = parseInt(input.value);
            if (currentValue > 1) {
                input.value = currentValue - 1;
                updateTotalPrice(input);
            }
        });

        increaseBtn.addEventListener("click", function () {
            var currentValue = parseInt(input.value);
            input.value = currentValue + 1;
            updateTotalPrice(input);
        });

        input.addEventListener("change", function () {
            var currentValue = parseInt(input.value);
            if (isNaN(currentValue) || currentValue <= 0) {
                input.value = 1;
            }
            updateTotalPrice(input);
        });
    });

    function updateTotalPrice(input) {
        var row = input.closest("tr");
        var price = parseFloat(row.querySelector(".price").innerText);
        var quantity = parseInt(input.value);
        var totalPrice = price * quantity;
        row.querySelector(".total-price").innerText = totalPrice.toFixed(2);
    }
});
$(document).ready(function () {
    $('form.form-add-to-cart').submit(function (e) {
        e.preventDefault(); // Ngăn chặn việc gửi yêu cầu mặc định của form

        var form = $(this);
        var url = form.attr('action');
        var method = form.attr('method');
        var data = form.serialize();

        $.ajax({
            url: url,
            method: method,
            data: data,
            success: function (response) {
                // Cập nhật số lượng sản phẩm trong giỏ hàng trên biểu tượng giỏ hàng
                updateCartItemCount(response.cartItemCount);
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    });

    function updateCartItemCount(count) {
        $('#cartItemCount').text(count); // Cập nhật số lượng sản phẩm trên biểu tượng giỏ hàng
    }
});
