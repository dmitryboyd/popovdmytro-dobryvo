/*jshint esversion: 6 */
// background slider
const swiper = new Swiper('.header__slider', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: true,
    autoplay: {
        delay: 5000,
    },
});

// burger menu
function burgerActive() {
    const body = document.querySelector("body");
    const button = document.querySelector(".burger__nav-button");
    const burger = document.querySelector(".burger__nav-line");
    const burgerNav = document.querySelector(".burger__nav-lists-wrapper");
    const burgerLinks = document.querySelectorAll(".burger-links");
    const burgerActive = "burger-active";
    const menuListActive = "lists-active";

    button.onclick = (e) => {
        e.preventDefault();
        burger.classList.toggle(burgerActive);
        burgerNav.classList.toggle(menuListActive);
        body.classList.toggle("no-scroll");

    }

    burgerLinks.forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            burger.classList.remove(burgerActive);
            burgerNav.classList.remove(menuListActive);
            body.classList.remove("no-scroll");
        }
    });
}
burgerActive();

//выпадающее мобильное меню
let isMobile = {
    Android: function(){return navigator.userAgent.match(/Android/i)},
    BlackBerry: function(){return navigator.userAgent.match(/BlackBerry/i)},
    iOS: function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},
    Opera: function(){return navigator.userAgent.match(/Opera Mini/i)},
    Windows: function(){return navigator.userAgent.match(/IEMobile/i)},
    any: function(){return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())},
}

if(isMobile.any()){
    let arrow = document.querySelectorAll(".arrow");
    for (let i = 0; i < arrow.length; i++) {
        let thisLink = arrow[i].previousElementSibling;
        let dropDown = arrow[i].nextElementSibling;

        thisLink.classList.add("parent")
        arrow[i].addEventListener("click", () => {
            dropDown.classList.toggle("open");
            thisLink.classList.toggle("open");
        })
    }
}


//калькулятор
$(document).ready(function () {
    $("input[class='calc-input']").on("input",() => {
        calculate();
        //валидация
        $("[class=calc-input]").bind("change keyup input click", function() {
            if (this.value.match(/[^0-9]/g)) {
                this.value = this.value.replace(/[^0-9]/g, '');
            }
        });

        function calculate() {
            $(".calc").each(function(){
                //передаем в обьект поля
                let calcInputs = {};
                $(this).find('input').each(function(key, val){
                    //имена полей
                    name = $(this).attr('name');
                    //значение полей
                    val = $(this).val();
                    if (!$.isNumeric(val)) {
                        switch (name) {
                            case 'culture':
                                val = $('#calc-culture').val();
                                break;
                            case 'crop':
                                val = '';
                                break;
                            case 'price':
                                val = '';
                                break;
                            case 'area':
                                val = '';
                                break;
                            default:
                                break;
                        }
                        $(this).val(val);
                    }
                    calcInputs[name] = val;
                });

                let total = 0;

                // культура
                total += calcInputs.culture.replace(/\D+/g, "") * 3;

                //урожайность
                if (calcInputs.crop >= 1) {
                    total *= calcInputs.crop ;
                }
                // хим удобрение
                if (calcInputs.price >= 1) {
                    total += calcInputs.price * 300;
                }
                //площадь
                if (calcInputs.area >= 1) {
                    total += calcInputs.area * 2;
                }
                $(".intro__aside-total").html(total);
            });
        }
    });
});
