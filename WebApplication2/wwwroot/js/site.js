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
/* transition */
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
        var fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(function (element) {
            if (isElementInViewport(element)) {
                element.style.opacity = "1";
            }
        });
    });

    // Function to check if an element is in the viewport
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});
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
/* banner slick*/
$(document).ready(function () {
    $('.banner-slider').slick({
        dots: true,
        infinite: true,
        autoplay: true, // Tự động trượt
        autoplaySpeed: 2000, 
        fade: true,
        arrows: false,
        cssEase: 'linear',
    });
});

/* Selling Products */
$(document).ready(function () {
    $('.carousel').slick({
        slidesToShow: 3,
        dots: false,
        centerMode: false,
        autoplay: true, // Tự động trượt
        autoplaySpeed: 2000, 
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});

/* Update quantity add to cart*/
$(document).ready(function () {
    $('.form-add-to-cart').submit(function (e) {
        e.preventDefault();
        var form = $(this);
        var productId = form.find('input[name="productId"]').val();
        var quantity = form.find('input[name="quantity"]').val();

        $.ajax({
            url: '@Url.Action("UpdateCartItemCount", "ShoppingCart")',
            type: 'POST',
            data: {
                productId: productId,
                quantity: quantity
            },
            success: function (response) {
                if (response.success) {
                    $('#cartItemCount').text(response.itemCount);
                }
            }
        });
    });
});


/*document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-submit").addEventListener("click", function (event) {
        event.preventDefault(); // Ngăn chặn việc gửi yêu cầu mặc định của form

        // Lấy giá trị của các trường email và mật khẩu từ form
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        // Gửi yêu cầu đăng nhập đến server
        fetch("Admin/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "email=" + encodeURIComponent(email) +
                "&password=" + encodeURIComponent(password)
        })
            .then(response => {
                if (response.ok) {
                    // Đăng nhập thành công, chuyển hướng tới trang admin
                    window.location.href = "/Admin";
                } else {
                    // Đăng nhập không thành công, hiển thị thông báo lỗi
                    alert("Đăng nhập không thành công. Vui lòng thử lại.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });
});*/
