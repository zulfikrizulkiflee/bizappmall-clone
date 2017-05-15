console.log("loaded: bizappmall.js");

var link_product = "http://corrad.visionice.net/bizapp/upload/product/";
var link_shop = "http://corrad.visionice.net/bizapp/upload/profile/";
var unavailable = "myimages/not_available.gif";

var current_page = $(location).attr('pathname');
current_page = current_page.split('/');
var page_name = current_page[(current_page.length - 2)];

$(function () {
    $("img.item_image").lazyload({
        effect: "fadeIn"
    });
});

var appname = $(location).attr('hostname');

var domainname = 'http://www.ansi.com.my';

var page = $(location).attr('pathname');
page = page.split('/');
if (appname == "localhost") {
    var home = '/' + page[1] + '/' + page[2];
} else {
    var home = '/' + page[1];
}

var logout = home + '/logout.php';
console.log(logout);
page = page[(page.length - 1)];
console.log(page);

$('a[href="login"]').attr('href', home + '/login');
$('a[href="register"]').attr('href', home + '/register');

$('.logo-nav-left a').attr('href', home);

var title_change = page.substr(0, 1).toUpperCase() + page.substr(1);

var like = 0;

window.onload = function () {
    // Check for LocalStorage support.
    if (localStorage) {
        if (localStorage.getItem(appname + '_remember') == "yes") {
            $('.username').val(localStorage.getItem(appname + '_username'));
        }
        $('#login-form').on('submit', function () {
            var username = $('.username').val();

            $(".check-remember").change(function (e) {
                if ($(this).prop('checked')) {
                    localStorage.setItem(appname + '_remember', 'yes');
                    localStorage.setItem(appname + '_username', username);
                } else {
                    localStorage.setItem(appname + '_remember', 'no');
                    localStorage.removeItem(appname + '_username');
                }
            });
        });
    } else {
        //cookies
        document.cookie = appname + '_username = ' + username;
    }
}

//var userdrw_width = ($('.header-right1').width() / 2) + $('.container').css('margin-right') + $('.header-right2').width();

//$('#user-drawer-content').css('right', userdrw_width + 'px');
var drawer_content = '<ul id="popover-content" class="list-group" style="display: none"> <a href=""><li id="user-drawer-button">My purchase</li></a><a href="' + logout + '"><li id="user-drawer-button" class="logout-btn" style="color:#29ABE2">Logout</li></a> </ul>';
$('body').append(drawer_content);

$('[data-toggle="popover"]').popover({
    html: true,
    content: function () {
        return $('#popover-content').html();
    }
});

//$('#user-drawer').on('click', function () {
//    if ($('#user-drawer-content').hasClass('active')) {
//        $('#user-drawer-content').removeClass('active');
//    } else {
//        $('#user-drawer-content').addClass('active');
//    }
//});

//$(document).mouseup(function (e) {
//    var $container = $("#user-drawer");
//
//    // if the target of the click isn't the container nor a descendant of the container
//    if (!$container.is(e.target) && $container.has(e.target).length === 0) {
//        $('#user-drawer-content').removeClass('active');
//    }
//});

//$('.logout-btn').on('click', function () {
//    window.open(logout, '_self');
//});

//add item modal



//search function
//    search
var suggest_box = '<div class="bizapp-popover search-popover col-xs-12 col-md-12" style="visibility:hidden;position:absolute;top:50px;left:0;width:230px;height:100px;z-index:2;border:1px solid lightgray;"> <ul style="width:100%"> <li class="search-popover-list shop-search"><i class="fa fa-building-o" aria-hidden="true"></i> Search \"<span class="search-param"></span>\" shop</li></ul> </div>';
$('.input-group').append(suggest_box);
var searchlength = $('.input-group-btn').width();
$('.search-popover').css('width', 'calc(100% - ' + searchlength + 'px)');

var click = $('.search-btn').on('click', function () {
    var searchParam = $('.search-input').val();
    startSearch(searchParam);
});

$('.search-input').keyup(function (e) {
    var search_param = $(this).val();
    var search_length = $(this).val().length;
    console.log(search_length);
    $('.search-param').text(search_param);

    $('.shop-search').on('click', function () {
        window.open(home + '/search-shop/' + search_param, '_self');
    });

    if (search_length > 0) {
        $('.search-popover').css('visibility', 'visible');
    } else {
        $('.search-popover').css('visibility', 'hidden');
    }

    var code = e.which; // recommended to use e.which, it's normalized across browsers
    if (code == 13) e.preventDefault();
    if (code == 13 || click == true) {
        var searchParam = $(this).val();
        if (page_name == "search-product" || page_name == "search-shop" || page_name == "shop" || page_name == "product" || page_name == "category" || page_name == "confirmation") {
            window.open('../search-product/' + search_param, '_self');
        } else {
            window.open('search-product/' + search_param, '_self');
        }

        //        startSearch(searchParam);
    } // missing closing if brace
});

function startSearch(searchParam) {
    //    window.open('search.html?param=' + searchParam, '_self');
}
//    search

//function getParam(param) {
//    var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
//    return results[1] || 0;
//}
//
//var searchParam = getParam('param');
//console.log(searchParam);
//
//if (searchParam == "") {
//    $('.search-input').val("");
//} else {
//    $('.search-input').val(decodeURIComponent(searchParam));
//}


//end search

if ($(window).width() <= 600) {
    var headerw = $('.header-grid').height();
    $('#user-drawer-content').css('top', headerw + 'px');

    var userdrw_width = 'calc(99% - ' + $('#user-drawer-content').width() + 'px)';
    $('#user-drawer-content').css('right', userdrw_width);
}


//get footer category JSON
generateFooterCategoryList();

function generateFooterCategoryList() {
    $.getJSON('http://mall.bizapp.my/get_category.php', function (dataMain) {
        $.each(dataMain, function (i, data) {
            var desc = data.description_en;
            desc = desc.replace(/---/g, '');
            if (desc == "TERBUKA") {
                desc = "MISC";
            }
            if (i == dataMain.length - 1) {
                var cat_str = '<div class="footer-category-item"><a href="category/' + data.code + '">' + desc + '</a></div>';
            } else {
                var cat_str = '<div class="footer-category-item"><a href="category/' + data.code + '">' + desc + '</a> | </div>';
            }

            $('.footer-category-list').append(cat_str);
        });
    });
}

if (page == '') {
    //get category JSON
    generateCategoryList();

    function generateCategoryList() {
        var iconArr = ['clothing', 'bag', 'kids', 'services', 'health', 'beauty', 'books', 'gadgets', 'camera', 'home', 'food', 'accessories', 'family', 'others', 'misc'];
        $.getJSON('http://mall.bizapp.my/get_category.php', function (data) {
            $.each(data, function (i, data) {
                var desc = data.description_en;
                desc = desc.replace(/---/g, '');
                if (desc == "TERBUKA") {
                    desc = "MISC";
                } else {
                    var cat_str = '<a href="category/' + data.code + '"><div class="col-xs-4 col-md-2 category-grid"><div><img class="category-icon" src="myimages/category/' + iconArr[i] + '.png"></div>' + desc + '</div></a>';
                    $('.categories').append(cat_str);
                }

            });
            var t = 0; // the height of the highest element (after the function runs)
            var t_elem; // the highest element (after the function runs)
            $('.category-grid').each(function () {
                $this = $(this);
                if ($this.outerHeight() > t) {
                    t_elem = this;
                    t = $this.outerHeight();
                }
            });
            $('.category-grid').attr('style', 'height:' + t + 'px');
        });
    }


    //get top products
    getProductsWithLimit('.top-products', 6);

    //get discover products
    getProductsNoLimit('browseP', '.discover-list', '000', 'date', 'desc', 1);

}

if (page == 'login') {
    $('title').html(title_change + ' | BizApp-Mall');
}

if (page == 'register') {
    $('title').html(title_change + ' | BizApp-Mall');
}

if (page_name === "category") {
    var category_code = current_page[(current_page.length - 1)];
    $.getJSON('http://mall.bizapp.my/get_category.php', function (dataMain) {
        $.each(dataMain, function (i, data) {
            if (data.code == category_code) {
                var desc = data.description_en;
                desc = desc.replace(/---/g, '');
                if (desc == "TERBUKA") {
                    desc = "MISC";
                }
                desc = desc.substr(0, 1).toUpperCase() + desc.substr(1);
                $('title').html(desc + ' | BizApp-Mall');
            }
        });
    });

    if (category_code == "000") {
        $('.side-category > p > a').attr('style', 'color:#f57400 !important');
    }
    //get discover products
    getProductsNoLimit('browseP', '.category-inside-list', category_code, 'date', 'desc', page);


    //get footer category JSON
    generateSideCategoryList(category_code);

    $(function () {
        window.pagObj = $('#pagination').twbsPagination({
            totalPages: 20,
            visiblePages: 5,
            onPageClick: function (event, page) {
                getProductsNoLimit('browseP', '.category-inside-list', category_code, 'date', 'desc', page);
                $('html, body').animate({
                    scrollTop: 0
                }, '500', function () {});
            }
        }).on('page', function (event, page) {
            //            console.info(page + ' (from event listening)');
        });
    });

    function generateSideCategoryList(category_code) {
        $.getJSON('http://mall.bizapp.my/get_category.php', function (dataMain) {
            $.each(dataMain, function (i, data) {
                var desc = data.description_en;
                desc = desc.replace(/---/g, '');
                if (desc == "TERBUKA") {
                    desc = "MISC";
                }

                if (category_code == data.code) {
                    var cat_str = '<li class="active" style="margin-bottom:0.5em"><i class="fa fa-chevron-right" aria-hidden="true" style="font-size:10px;"></i> ' + desc + '</li>';
                } else {
                    var cat_str = '<li class="" style="padding-left:0.7em;margin-bottom:0.5em"><a href="' + data.code + '">' + desc + '</a></li>';
                }

                $('.side-category-list').append(cat_str);
            });
        });
    }
}

if (page === "discover") {
    $('title').html(title_change + ' | BizApp-Mall');
    console.log(page_name);
    //get discover products
    var page = 1;

    getProductsNoLimit('browseP', '.category-inside-list', '000', 'date', 'desc', page);


    $(function () {
        window.pagObj = $('#pagination').twbsPagination({
            totalPages: 20,
            visiblePages: 5,
            onPageClick: function (event, page) {
                getProductsNoLimit('browseP', '.category-inside-list', '000', 'date', 'desc', page);
                $('html, body').animate({
                    scrollTop: 0
                }, '500', function () {});
            }
        }).on('page', function (event, page) {
            //            console.info(page + ' (from event listening)');
        });
    });
}

if (page_name === "product") {
    //get discover products
    var code = $(location).attr('pathname');
    code = code.split('/');
    code = code[(code.length - 1)];
    getProduct(code);

    function getProduct(code) {
        $.getJSON('http://mall.bizapp.my/get_products.php?action=single&id=' + code, function (data) {
            console.log(data);
            var pid = data[0].pid;
            var shop_logo = '';
            var shop_img = '';

            $.each(data, function (i, data) {
                var prod_detail = data.productdesc;
                if (prod_detail.length != 0) {
                    $('.item_detail').html(prod_detail);
                } else {
                    $('.item_detail').html("No detail available");
                }
                var star = '<i class="fa fa-star" aria-hidden="true"></i>';
                $('.item_name').html(data.productname);
                $('.item_price').html('RM' + data.price);
                $('.item_rating').html(star.repeat(5));
                $('.item_pid').html(data.pid);
                $('.item_prodid').html(data.id);
                $('.item_pname').html('<a href="' + home + '/shop/' + data.pid + '" style="color:#f57400"><img class="shop-logo" src="" style="height:2em;width:2em;object-fit:cover;border-radius:50%;border:1px solid #f57400"> ' + data.nama + '</a>');
                $('.product-image-container .item_image').attr('src', link_product + data.attachment);

                if (data.attachment != null) {
                    $('.product-image-list ul li:nth-child(1)').html('<img src="' + link_product + data.attachment + '">');
                }
                if (data.attachmentweb1 != null) {
                    $('.product-image-list ul li:nth-child(2)').html('<img src="' + link_product + data.attachmentweb1 + '">');
                }
                if (data.attachmentweb2 != null) {
                    $('.product-image-list ul li:nth-child(3)').html('<img src="' + link_product + data.attachmentweb2 + '">');
                }
                if (data.attachmentweb3 != null) {
                    $('.product-image-list ul li:nth-child(4)').html('<img src="' + link_product + data.attachmentweb3 + '">');
                }

                $.getJSON('http://mall.bizapp.my/get_category.php', function (dataMain) {
                    $.each(dataMain, function (i, dataMain) {
                        if (dataMain.code == data.productcategorycode) {
                            var desc = dataMain.description_en;
                            desc = desc.replace(/---/g, '');
                            if (desc == "TERBUKA") {
                                desc = "MISC";
                            }
                            desc = desc.toLowerCase();
                            var cat_tag = '<a href="' + home + '/category/' + data.productcategorycode + '"><span class="product-tag label label-default">#' + desc + '</span></a>';
                            var brand_tag = '';

                            if (data.productbrand.length != 0) {
                                brand_tag = '<a href="' + home + '/search/' + data.productbrand.toLowerCase() + '"><span class="product-tag label label-default">#' + data.productbrand.toLowerCase() + '</span></a>';
                            }

                            $('.product-tag-container').append(cat_tag + brand_tag);
                        }
                    });
                });


            });

            $.getJSON('http://mall.bizapp.my/get_shop.php?order=shop_detail&id=' + pid, function (dataShop) {
                console.log(dataShop);
                shop_img = link_shop + dataShop[0].attachmentphoto;
                shop_logo = link_shop + dataShop[0].attachmentlogo;
                $('.shop-logo').attr('src', shop_logo);
                if ($('.shop-logo').attr('src') == link_shop) {
                    $('.shop-logo').attr('src', shop_img);
                    if ($('.shop-logo').attr('src') == link_shop) {
                        console.log(unavailable);
                        $('.shop-logo').attr('src', '../' + unavailable);
                    }
                }
            });

            var count = 4;
            $('.product-image-container img').each(function () {
                if ($(this).attr('src') == link_product) {
                    $(this).parent().remove();
                    count--;
                }
                if (count <= 1) {
                    $('.product-image-list').css('display', 'none');
                }
            });

            $('.product-image-container ul li:first-child').css('border', '2px solid #f57400');

            $('.product-image-container ul li').each(function () {
                $(this).on('click', function () {
                    $('.product-image-container .item_image').attr('src', $(this).children('img').attr('src'));
                    $('.product-image-container ul li').each(function () {
                        $(this).css('border', '1px solid lightgray');
                    });
                    $(this).css('border', '2px solid #f57400');
                });
            });
            var img_cont_height = $('.product-image-container').height() + 18;
            //            $('.product-info-container').attr('style', 'height:' + img_cont_height + 'px');
        });

    }

    //get top products
    getProductsWithLimit('.suggest-product-list', 6);
    $(function () {
        $('#processing-modal').on('show.bs.modal', function () {
            var myModal = $(this);
            clearTimeout(myModal.data('hideInterval'));
            myModal.data('hideInterval', setTimeout(function () {
                myModal.modal('hide');
            }, 1000));
        });
    });

}

if (page_name === "shop") {
    //get discover products
    var pid = $(location).attr('pathname');
    pid = pid.split('/');
    pid = pid[(pid.length - 1)];
    getShopDetail(pid);
    getProductShop(pid, 'all');

    var product_count = 0;

    $('.price-key').on('mouseover', function () {
        $('.bizapp-dropdown-popover').attr('style', 'visibility:visible;position:absolute;top:40px;left:0;width:230px;height:100px;z-index:2');
    });

    window.onmouseover = function (e) {
        if (e.target.className == "bizapp-sort-by-options__option price-key" || e.target.className == "dropdown-price price-low-high" || e.target.className == "dropdown-price price-high-low" || e.target.className == "bizapp-sort-by-options__option price-key option-selected" || e.target.className == "price-selection") {} else {
            $('.bizapp - dropdown - popover').attr('style', 'visibility:hidden;position:absolute;top:40px;left:0;width:230px;height:100px;z-index:2');
        }
    };

    $('.bizapp-sort-by-options__option').each(function () {
        $(this).on('click', function () {
            $('.bizapp-sort-by-options__option').each(function () {
                if ($(this).hasClass('option-selected')) {
                    $(this).removeClass('option-selected');
                }
            });
            $(this).addClass('option-selected');
            var option = $(this).attr('data-option');
            if (option != undefined) {
                $('.price-selection').text('PRICE');
                getProductShop(pid, option);
            }

        });
    });

    $('.dropdown-price').each(function () {
        $(this).on('click', function () {
            var text = '';
            var option = $(this).attr('data-option');

            if (option == "lowhigh") {
                text = 'PRICE <i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
            } else if (option == "highlow") {
                text = 'PRICE <i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';
            }
            $('.price-selection').html(text);
            getProductShop(pid, option);
        });
    });

    function getShopDetail(pid) {
        $.getJSON('http://mall.bizapp.my/get_shop.php?id=' + pid + '&order=shop_detail', function (data) {
            console.log(data);
            $('.shop_name').html(data[0].nama);
            var shop_img = link_shop + data[0].attachmentphoto;
            var shop_logo = link_shop + data[0].attachmentlogo;
            $('.shop_logo').attr('src', shop_logo);
            if ($('.shop_logo').attr('src') == link_shop) {
                $('.shop_logo').attr('src', shop_img);
                if ($('.shop_logo').attr('src') == link_shop) {
                    $('.shop_logo').attr('src', '../' + unavailable);
                }
            }
        });
    }

    function getProductShop(pid, order) {
        $('.shop-product-list').html('');
        $.getJSON('http://mall.bizapp.my/get_shop.php?id=' + pid + '&order=' + order, function (data) {
            product_count = data.length;
            $('.shop_products').html("Product " + product_count);
            $.each(data, function (i, data) {
                var top_str = '<div class="col-xs-6 col-md-2 product-grid-wrapper"><a href="' + home + '/product/' + data.id + '"><div class="product-grid product-grid-shadow"><div><img src="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '" class="item_image lazy" data-original="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '"><p class="item_name">' + data.productname + '</p><p class="row price-like-container"><span class="item_price">RM' + data.price + '</span><span class="item_like"><i class="fa fa-heart-o" aria-hidden="true"></i> <span class="item_like_' + data.id + '">0</span></span></p></div></div></a></div>';
                $('.shop-product-list').append(top_str);
                var selector = '.item_like_' + data.id;
                getLikeNumber("get", "product", selector, data.id);
            });
            var t = 0; // the height of the highest element (after the function runs)
            var t_elem; // the highest element (after the function runs)
            $('.product-grid-wrapper').each(function () {
                $this = $(this);
                if ($this.outerHeight() > t) {
                    t_elem = this;
                    t = $this.outerHeight();
                }
            });
            $('.product-grid-wrapper').attr('style', 'height:' + t + 'px');
            var f = 0; // the height of the highest element (after the function runs)
            var f_elem; // the highest element (after the function runs)
            $('.product-grid .item_name').each(function () {
                $this = $(this);
                if ($this.outerHeight() > f) {
                    f_elem = this;
                    f = $this.outerHeight();
                }
            });
            $('.product-grid .item_name').attr('style', 'height:' + f + 'px');
        });
    }
}

if (page === "checkout") {
    var cart_obj = JSON.parse(localStorage.getItem(appname + 'simpleCart_items'));
    var shopArr = [];
    var prodArr = [];

    $.each(cart_obj, function (i, data) {
        if (shopArr.indexOf(data.pid) < 0) {
            shopArr.push(data.pid);
        }
        prodArr.push(data.pid);
    });
    //    console.log(prodArr);
    $.each(shopArr, function (i, data) {
        var shop_name = '';
        var shop_image = '';
        var item_quantity = 0;
        var total_payable = '';


        $.getJSON('http://mall.bizapp.my/get_shop.php?id=' + data + '&order=shop_detail', function (dataShop) {
            console.log(dataShop[0].nama);
            var shop_img = link_shop + dataShop[0].attachmentphoto;
            var shop_logo = link_shop + dataShop[0].attachmentlogo;

            if (shop_logo != link_shop) {
                shop_image = shop_logo;
            } else if (shop_img != link_shop) {
                shop_image = shop_img;
            } else {
                shop_image = unavailable;
            }

            shop_name = dataShop[0].nama;
            var shop_container = '';
            if (i == 0) {
                shop_container = '<a class="shop-btn" data-pid="' + dataShop[0].pid + '" role="button" data-toggle="collapse" data-parent="#accordion" href="#shop_' + dataShop[0].pid + '" aria-expanded="true" aria-controls="shop_' + dataShop[0].pid + '"><div class="panel panel-default"> <div class="panel-heading" role="tab" id="shopHead_' + dataShop[0].pid + '"> <h4 class="panel-title"><img class="shop-logo" src="' + shop_image + '" style="height:2em;width:2em;object-fit:cover;border-radius:50%;border:1px solid #f57400"> ' + shop_name + '<a href="shop/' + dataShop[0].pid + '" class="view-shop" target="_self">View Shop</a></h4> </div> <div id="shop_' + dataShop[0].pid + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="shopHead_' + dataShop[0].pid + '"></a> <div class="shopPanel_' + dataShop[0].pid + ' panel-body"> <iframe class="cart-frame shopFrame_' + dataShop[0].pid + '" src="cart-frame.html?id=' + dataShop[0].pid + '"></iframe> </div> </div> </div>';
            } else {
                shop_container = '<a class="shop-btn" data-pid="' + dataShop[0].pid + '" role="button" data-toggle="collapse" data-parent="#accordion" href="#shop_' + dataShop[0].pid + '" aria-expanded="true" aria-controls="shop_' + dataShop[0].pid + '"><div class="panel panel-default"> <div class="panel-heading" role="tab" id="shopHead_' + dataShop[0].pid + '"> <h4 class="panel-title"><img class="shop-logo" src="' + shop_image + '" style="height:2em;width:2em;object-fit:cover;border-radius:50%;border:1px solid #f57400"> ' + shop_name + '<a href="shop/' + dataShop[0].pid + '" class="view-shop" target="_self">View Shop</a></h4> </div> <div id="shop_' + dataShop[0].pid + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="shopHead_' + dataShop[0].pid + '"></a> <div class="shopPanel_' + dataShop[0].pid + ' panel-body"> <iframe class="cart-frame shopFrame_' + dataShop[0].pid + '" src="cart-frame.html?id=' + dataShop[0].pid + '"></iframe> </div> </div> </div>';
            }

            $('.checkout-wrapper').append(shop_container);

            //            var selectCont = '.shopPanel_' + dataShop[0].pid;
            //            var selectFrame = '.shopFrame_' + dataShop[0].pid;
            //
            //            var height = 0;
            //            setTimeout(function () {
            //                height = $(selectFrame).contents().find('html').height();
            //                console.log(height); // wait and you'll have it
            //                $(selectCont).attr('style', 'height:' + height + 'px');
            //                removeIn();
            //            }, 1200);
            //
            //            function removeIn() {
            //                $('.panel:not(:first-child)').find('.panel-collapse').removeClass("in");
            //            }

            var heightSet = 0;

            if ($(window).width() < 768) {
                heightSet = 150;
            } else if ($(window).width() < 992) {
                heightSet = 140;
            } else {
                heightSet = 125;
            }

            var selector = '.shopFrame_' + dataShop[0].pid;

            var search = dataShop[0].pid;
            var occurances = prodArr.filter(function (val) {
                return val === search;
            }).length;
            console.log(occurances); //3
            $(selector).height((heightSet * (occurances + 1)));

        });

    });

}

if (page_name === "confirmation") {
    var paymentStored = localStorage.getItem(appname + 'simpleCart_checkArr').split(',');
    var cart_obj = JSON.parse(localStorage.getItem(appname + 'simpleCart_items'));

    var totalPrice = 0;
    $.each(paymentStored, function (i, dataPayment) {
        $.each(cart_obj, function (i, data) {
            if (data.prodid == dataPayment) {
                console.log(data);
                $('.shop-name').html(data.pname);
                var purchaseList = '<ul style="border-bottom:1px solid lightgray;display:inline-flex;width:100%;padding-top:0.5em;padding-bottom:0.5em"><li><img src="' + data.image + '" style="height:60px;object-fit:contain;"></li> <li style="width:100%;margin-left:1em"> <p>' + data.name + '</p> <p style="float:right;font-size:13px;font-weight:100;padding-right:0.5em">X' + data.quantity + '</p> <p>RM' + data.price + '</p> </li></ul>';
                $('.purchase-list').append(purchaseList);
                totalPrice = totalPrice + (parseFloat(data.price) * parseInt(data.quantity));
            }
        });
    });
    if (paymentStored.length > 1) {
        $('.total-item').html(paymentStored.length + ' Items');
    } else {
        $('.total-item').html(paymentStored.length + ' Item');
    }

    $('.total-price').html('RM' + totalPrice.toFixed(2));

    var heightPanel = $('.delivery-info').height();
    $('.account-info').height(heightPanel);

    $('#pro_payment').on('click', function () {
        $('#payment-modal').modal('show');
        paymentGet(page);
    });



    function paymentGet(pid) {
        var formattedDate = new Date();
        var d = formattedDate.getDate();
        var m = formattedDate.getMonth();
        m += 1; // JavaScript months are 0-11
        var y = formattedDate.getFullYear();

        var batch_id = 'batch_' + y + m + d + '_' + (Math.floor(Math.random() * 9999999999) + 1);
        var username = $('#username').text();
        var userid = $('#userid').text();
        var useremail = $('#useremail').text();
        var userphone = $('#userphone').text();
        var useraddress1 = $('#useraddress1').text();
        var useraddress2 = $('#useraddress2').text();
        var useraddress3 = $('#useraddress3').text();
        var userpostcode = $('#userpostcode').text();
        var userstate = $('#userstate').text();
        var usernote = $('.note-area').val();

        var prodArr = new Array(10);
        var quantityArr = new Array(10);
        var counter = 0;
        var price_sum = 0;

        $.each(cart_obj, function (i, dataPayment) {
            console.log(dataPayment);
            if (paymentStored.indexOf(dataPayment.prodid) >= 0) {
                console.log(dataPayment.prodid);
                prodArr[counter] = dataPayment.prodid;
                $.getJSON('http://mall.bizapp.my/get_products.php?action=single&id=' + dataPayment.prodid, function (dataPrice) {
                    price_sum = price_sum + (dataPrice[0].price * dataPayment.quantity);
                });
                quantityArr[counter] = dataPayment.quantity;
                counter++;
            }
        });

        for (i = 0; i < prodArr.length; i++) {
            if (prodArr[i] == "" || prodArr[i] == null) {
                prodArr[i] = 0;
                quantityArr[i] = 0;
            }
        }

        //        setTimeout(function () {
        //            console.log(prodArr);
        //            console.log(quantityArr);
        //            $('#payment-modal').modal('hide');
        //            $('#done-modal').modal('show');
        //        }, 3000);

        setTimeout(function () {
            $.getJSON('../get_cart_info.php?action=insert', {
                uid: userid,
                pid: pid,
                product1: prodArr[0],
                product2: prodArr[1],
                product3: prodArr[2],
                product4: prodArr[3],
                product5: prodArr[4],
                product6: prodArr[5],
                product7: prodArr[6],
                product8: prodArr[7],
                product9: prodArr[8],
                product10: prodArr[9],
                quantity1: quantityArr[0],
                quantity2: quantityArr[1],
                quantity3: quantityArr[2],
                quantity4: quantityArr[3],
                quantity5: quantityArr[4],
                quantity6: quantityArr[5],
                quantity7: quantityArr[6],
                quantity8: quantityArr[7],
                quantity9: quantityArr[8],
                quantity10: quantityArr[9],
                price_sum: price_sum,
                delivery_name: username,
                delivery_email: useremail,
                delivery_phone: userphone,
                delivery_address1: useraddress1,
                delivery_address2: useraddress2,
                delivery_address3: useraddress3,
                delivery_postcode: userpostcode,
                delivery_state: userstate,
                batch_id: batch_id
            }, function (dataCartInfo) {
                var total_price = parseFloat(dataCartInfo[0].price_sum).toFixed(2);
                var TX = Math.random();
                var fpxkeyRand = Math.random();

                $.ajax({
                    type: "POST",
                    url: "http://mall.bizapp.my/apigenerator.php?api_name=EMALL_TRACK_SAVE_ORDER_MULTIPLE_NEW&TX=" + TX,
                    data: {
                        emall_userid: userid,
                        emall_batchid: batch_id,
                        pid: pid,
                        name: username,
                        address: useraddress1 + '\n' + useraddress2 + '\n' + useraddress3 + '\n' + userpostcode + '\n' + userstate,
                        hpno: userphone,
                        email: useremail,
                        productid1: prodArr[0],
                        productid2: prodArr[1],
                        productid3: prodArr[2],
                        productid4: prodArr[3],
                        productid5: prodArr[4],
                        productid6: prodArr[5],
                        productid7: prodArr[6],
                        productid8: prodArr[7],
                        productid9: prodArr[8],
                        productid10: prodArr[9],
                        sellingprice: total_price,
                        actualpaidtostockistprice: total_price,
                        quantity1: quantityArr[0],
                        quantity2: quantityArr[1],
                        quantity3: quantityArr[2],
                        quantity4: quantityArr[3],
                        quantity5: quantityArr[4],
                        quantity6: quantityArr[5],
                        quantity7: quantityArr[6],
                        quantity8: quantityArr[7],
                        quantity9: quantityArr[8],
                        quantity10: quantityArr[9],
                        hargakospos: '0',
                        hargakospos_id: '0',
                        note: usernote,
                        kempenid: '0',
                        fpxkey: fpxkeyRand,
                        domainname: domainname
                    },
                    success: function (dataCheckout) {
                        console.log(fpxkeyRand);
                        dataCheckout = JSON.parse(dataCheckout);
                        console.log(dataCheckout);
                        if (dataCheckout[0].itemsangkut == "") {
                            var TX = Math.random();
                            //                    alert(total_price);
                            $.ajax({
                                type: "POST",
                                url: "http://mall.bizapp.my/apigenerator.php?api_name=EMALL_TRACK_CREATE_BILL_TO_STOCKIST&TX=" + TX,
                                data: {
                                    pid: pid,
                                    nilai: total_price,
                                    pidstokis: pid,
                                    GLOBAL_FPXKEY: fpxkeyRand,
                                    domainname: domainname
                                },
                                success: function (dataBillPliz) {
                                    //                                    alert(dataBillPliz);
                                    //simpan url (emall_fpxurl)
                                    $.get('../get_cart_info.php?action=updatefpx&fpxurl=' + dataBillPliz + '&uid=' + userid + '&batchid=' + batch_id, function (dataCartFPX) {
                                        window.open(dataBillPliz, '_blank');
                                        $.get('../get_cart_info.php?action=updatecheckout&uid=' + userid + '&batchid=' + batch_id, function () {
                                            console.log(cart_obj);
                                            $.each(paymentStored, function (i, dataPayment) {
                                                simpleCart.each(function (item) {
                                                    if (item.get("prodid") == dataPayment) {
                                                        item.remove();
                                                    }
                                                });
                                            });

                                            console.log(cart_obj);
                                            window.open('../checkout', '_self');
                                        });
                                    });
                                }
                            });
                        } else {
                            alert("Item Cannot Be Processed: " + dataCheckout[0].itemsangkut);
                            //                            window.open('checkout.html?id=' + pid, '_self');
                        }
                    }
                });
            });
        }, 3000);
    }
}

if (page_name === "search-shop") {
    var searchParam = page;

    $('.search-param-page').html(searchParam);

    if (searchParam == "") {
        $('.search-input').val("");
    } else {
        $('.search-input').val(decodeURIComponent(searchParam));
    }

    $.getJSON('http://mall.bizapp.my/get_products.php?action=searchS&param=' + searchParam, function (data) {
        if (data.length > 0) {
            $('#search-modal').modal('show');
            $('.shop-found-list').html('');
            console.log(data);
            $.each(data, function (i, dataShopFound) {
                var shop_logo = '';
                var shop_img = '';
                var shop_image = '';
                var shopFound = '';

                $.getJSON('http://mall.bizapp.my/get_shop.php?id=' + dataShopFound.pid + '&order=shop_detail', function (dataShop) {
                    shop_img = link_shop + dataShop[0].attachmentphoto;
                    shop_logo = link_shop + dataShop[0].attachmentlogo;

                    if (shop_logo != link_shop) {
                        shop_image = shop_logo;
                    } else if (shop_img != link_shop) {
                        shop_image = shop_img;
                    } else {
                        shop_image = '../' + unavailable;
                    }

                    shopFound = '<div class="col-xs-12 col-md-12 product-grid product-grid-shadow shop_' + dataShopFound.pid + '" style="display:inline-block;color:#333;margin-bottom:0.5em;padding:0.5em"> <div class="col-xs-4 col-md-1" style="padding:0"><img class="shop_logo" src="' + shop_image + '" style="height:78px;width:78px"></div> <div class="col-xs-8 col-md-3 shop-detail-section" style="height:78px;text-align:left"> <ul> <li><span class="shop-name" style="font-weight:bold;font-size:1.5em">' + dataShop[0].nama + '</span></li>  </ul> </div> <div class="col-xs-12 col-md-2 shop-detail-section" style="text-align:center;padding-top:10px;height:78px"> <ul style="padding-top: 18px;"> <li><a href="../shop/' + dataShopFound.pid + '" class="view-shop" target="_self" style="background:#fff;float:none">View Shop</a></li> </ul> </div> <div class="col-xs-12 col-md-3 shop-detail-section" style="height:78px;padding-top:9px"> <ul class="img-list" style="display:flex;justify-content:space-between;align-items:center;"> <li> <a href=""><img src="" style="height:60px;width:60px"></a> </li> <li> <a href=""><img src="" style="height:60px;width:60px"></a> </li> <li> <a href=""><img src="" style="height:60px;width:60px"></a> </li> </ul> </div> <div class="col-xs-12 col-md-3 shop-detail-section" style="height:78px;padding-top:20px;border-right:none"> <ul style="display:flex;justify-content:space-between;align-items:center"> <li> <p><i class="fa fa-gift" aria-hidden="true"></i> <span class=product-num></span></p> <p>Products</p> </li> <li> <p><i class="fa fa-star" aria-hidden="true"></i> <span>2</span></p> <p>Ratings</p> </li> <li> <p><i class="fa fa-heart-o" aria-hidden="true"></i> <span>42</span></p> <p>Like</p> </li> </ul> </div> </div>';
                });
                var order = "latest";
                setTimeout(function () {
                    $.getJSON('http://mall.bizapp.my/get_shop.php?id=' + dataShopFound.pid + '&order=' + order, function (dataShopProducts) {
                        if (dataShopProducts.length > 0) {
                            $('.shop-found-list').append(shopFound);
                            $('#search-modal').modal('hide');
                        }
                        var selectorProd = '.shop_' + dataShopFound.pid + ' .product-num';
                        $(selectorProd).html(dataShopProducts.length);
                        for (k = 0; k < 3; k++) {
                            var prod = 'prod' + k;
                            var selector = '.shop_' + dataShopFound.pid + ' .img-list li:nth-child(' + (k + 1) + ') img';
                            var selector2 = '.shop_' + dataShopFound.pid + ' .img-list li:nth-child(' + (k + 1) + ') a';
                            if (dataShopProducts[k] != null) {
                                prod = link_product + dataShopProducts[k].attachment;
                                $(selector).attr('src', prod);
                                $(selector2).attr('href', '../product/' + dataShopProducts[k].id)
                            } else {
                                $(selector).remove();
                            }

                        }
                    });
                }, 1000);
            });
        }
    });
}

if (page_name === "search-product") {
    var searchParam = page;

    $('.search-param-page').html(searchParam);

    if (searchParam == "") {
        $('.search-input').val("");
    } else {
        $('.search-input').val(decodeURIComponent(searchParam));
    }

    $.getJSON('http://mall.bizapp.my/get_category.php', function (dataMain) {
        $.each(dataMain, function (i, data) {
            var desc = data.description_en;
            desc = desc.replace(/---/g, '');
            if (desc == "TERBUKA") {
                desc = "MISC";
            }

            var cat_str = '<li class="catList itemCat_' + data.code + '" style="padding-left:0.7em;margin-bottom:0.5em"><a href="javascript:void(0)" onclick="displayCategory(' + data.code + ')">' + desc + ' (<span class="itemCode_' + data.code + '">0</span>)</a></li>';

            $('.side-category-list').append(cat_str);
            displayLength(data.code);
        });
    });

    var jsonArr;

    $.getJSON('http://mall.bizapp.my/get_products.php?action=searchP&param=' + searchParam, function (data) {
        //        alert(data.length);
        jsonArr = data;
        $('#search-modal').modal('show');
        //        $('.product-found-list').html('');
        console.log(data);
        if (data.length > 0) {
            $('.product-found-list').html('');
            $.each(data, function (i, dataProductFound) {
                getProductSingle('single', dataProductFound.id, '.product-found-list');
            });
        }
        $('#search-modal').modal('hide');
    });

    function displayLength(code) {
        $.getJSON('http://mall.bizapp.my/get_products.php?action=searchP&param=' + searchParam, function (data) {
            //        alert(data.length);
            jsonArr = data;
            var results = [];
            var searchField = "productcategorycode";
            var searchVal = code;
            for (var i = 0; i < jsonArr.length; i++) {
                if (jsonArr[i][searchField] == searchVal) {
                    results.push(jsonArr[i]);
                }
            }
            if (results.length > 0) {
                var selector = '.itemCode_' + code;
                $(selector).html(results.length);
            }
        });



    }

    function displayCategory(code) {
        $('.catList').each(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });
        var selector = '.itemCat_' + code;
        $(selector).addClass('active');
        $('#search-modal').modal('show');
        var results = [];
        var searchField = "productcategorycode";
        var searchVal = code;
        for (var i = 0; i < jsonArr.length; i++) {
            if (jsonArr[i][searchField] == searchVal) {
                results.push(jsonArr[i]);
            }
        }
        if (results.length > 0) {
            $('.product-found-list').html('');
            for (i = 0; i < results.length; i++) {
                console.log(results[i].id);
                var top_str = '<div class="col-xs-6 col-md-2 product-grid-wrapper"><a href="' + home + '/product/' + results[i].id + '"><div class="product-grid product-grid-shadow"><div><img src="http://corrad.visionice.net/bizapp/upload/product/' + results[i].attachment + '" class="item_image lazy" data-original="http://corrad.visionice.net/bizapp/upload/product/' + results[i].attachment + '"><p class="item_name">' + results[i].productname + '</p><p class="row price-like-container"><span class="item_price">RM' + results[i].price + '</span><span class="item_like"><i class="fa fa-heart-o" aria-hidden="true"></i> <span class="item_like_' + results[i].id + '">0</span></span></p></div></div></a></div>';
                $('.product-found-list').append(top_str);
                var selector = '.item_like_' + results[i].id;
                getLikeNumber("get", "product", selector, results[i].id);
            }
            var t = 0; // the height of the highest element (after the function runs)
            var t_elem; // the highest element (after the function runs)
            $('.product-grid-wrapper').each(function () {
                $this = $(this);
                if ($this.outerHeight() > t) {
                    t_elem = this;
                    t = $this.outerHeight();
                }
            });
            $('.product-grid-wrapper').attr('style', 'height:' + t + 'px');
            var f = 0; // the height of the highest element (after the function runs)
            var f_elem; // the highest element (after the function runs)
            $('.product-grid .item_name').each(function () {
                $this = $(this);
                if ($this.outerHeight() > f) {
                    f_elem = this;
                    f = $this.outerHeight();
                }
            });
            $('.product-grid .item_name').attr('style', 'height:' + f + 'px');
        } else {
            $('.product-found-list').html('<div style="height:50vh;text-align:center;padding-top:15vh;"> <h4>No products found...</h4> </div>');
        }
        $('#search-modal').modal('hide');
    }
}

//get product with limit
function getProductsWithLimit(target, limit) {
    $.getJSON('http://mall.bizapp.my/get_products.php?action=teaser&limit=' + limit, function (data) {
        $.each(data, function (i, data) {
            var top_str = '<div class="col-xs-6 col-md-2 product-grid-wrapper"><a href="' + home + '/product/' + data.id + '"><div class="product-grid product-grid-shadow"><div><img src="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '" class="item_image lazy" data-original="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '"><p class="item_name">' + data.productname + '</p><p class="row price-like-container"><span class="item_price">RM' + data.price + '</span><span class="item_like"><i class="fa fa-heart-o" aria-hidden="true"></i> <span class="item_like_' + data.id + '">0</span></span></p></div></div></a></div>';
            $(target).append(top_str);
            var selector = '.item_like_' + data.id;
            getLikeNumber("get", "product", selector, data.id);
        });
        var t = 0; // the height of the highest element (after the function runs)
        var t_elem; // the highest element (after the function runs)
        $('.product-grid-wrapper').each(function () {
            $this = $(this);
            if ($this.outerHeight() > t) {
                t_elem = this;
                t = $this.outerHeight();
            }
        });
        $('.product-grid-wrapper').attr('style', 'height:' + t + 'px;margin-bottom:0.5em;');
        var f = 0; // the height of the highest element (after the function runs)
        var f_elem; // the highest element (after the function runs)
        $('.product-grid .item_name').each(function () {
            $this = $(this);
            if ($this.outerHeight() > f) {
                f_elem = this;
                f = $this.outerHeight();
            }
        });
        $('.product-grid .item_name').attr('style', 'height:' + f + 'px');
    });
}

//get products no limit
function getProductsNoLimit(action, target, code, sortby, orderby, page) {
    $(target).html('');
    $.getJSON('http://mall.bizapp.my/get_products.php?action=' + action + '&code=' + code + '&sortby=' + sortby + '&orderby=' + orderby + '&page=' + page, function (data) {
        $.each(data, function (i, data) {
            var top_str = '<div class="col-xs-6 col-md-2 product-grid-wrapper"><a href="' + home + '/product/' + data.id + '"><div class="product-grid product-grid-shadow"><div><img src="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '" class="item_image lazy" data-original="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '"><p class="item_name">' + data.productname + '</p><p class="row price-like-container"><span class="item_price">RM' + data.price + '</span><span class="item_like"><i class="fa fa-heart-o" aria-hidden="true"></i> <span class="item_like_' + data.id + '">0</span></span></p></div></div></a></div>';
            $(target).append(top_str);
            var selector = '.item_like_' + data.id;
            getLikeNumber("get", "product", selector, data.id);
        });
        var t = 0; // the height of the highest element (after the function runs)
        var t_elem; // the highest element (after the function runs)
        $('.product-grid-wrapper').each(function () {
            $this = $(this);
            if ($this.outerHeight() > t) {
                t_elem = this;
                t = $this.outerHeight();
            }
        });
        $('.product-grid-wrapper').attr('style', 'height:' + t + 'px');
        var f = 0; // the height of the highest element (after the function runs)
        var f_elem; // the highest element (after the function runs)
        $('.product-grid .item_name').each(function () {
            $this = $(this);
            if ($this.outerHeight() > f) {
                f_elem = this;
                f = $this.outerHeight();
            }
        });
        $('.product-grid .item_name').attr('style', 'height:' + f + 'px');
    });
}

//get like
function getLikeNumber(action, target, target_class, id) {
    $.getJSON(home + '/get_like_number.php?action=' + action + '&target=' + target + '&id=' + id, function (data) {
        if (action == "check") {

        }
        if (action == "get") {
            like = data.length;
            $(target_class).html(like);
        }
        if (action == "set") {

        }
    });
}

function getProductSingle(action, prodid, target) {
    $.getJSON('http://mall.bizapp.my/get_products.php?action=' + action + '&id=' + prodid, function (data) {
        $.each(data, function (i, data) {
            var top_str = '<div class="col-xs-6 col-md-2 product-grid-wrapper"><a href="' + home + '/product/' + data.id + '"><div class="product-grid product-grid-shadow"><div><img src="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '" class="item_image lazy" data-original="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '"><p class="item_name">' + data.productname + '</p><p class="row price-like-container"><span class="item_price">RM' + data.price + '</span><span class="item_like"><i class="fa fa-heart-o" aria-hidden="true"></i> <span class="item_like_' + data.id + '">0</span></span></p></div></div></a></div>';
            $(target).append(top_str);
            var selector = '.item_like_' + data.id;
            getLikeNumber("get", "product", selector, data.id);
        });
        var t = 0; // the height of the highest element (after the function runs)
        var t_elem; // the highest element (after the function runs)
        $('.product-grid-wrapper').each(function () {
            $this = $(this);
            if ($this.outerHeight() > t) {
                t_elem = this;
                t = $this.outerHeight();
            }
        });
        $('.product-grid-wrapper').attr('style', 'height:' + t + 'px');
        var f = 0; // the height of the highest element (after the function runs)
        var f_elem; // the highest element (after the function runs)
        $('.product-grid .item_name').each(function () {
            $this = $(this);
            if ($this.outerHeight() > f) {
                f_elem = this;
                f = $this.outerHeight();
            }
        });
        $('.product-grid .item_name').attr('style', 'height:' + f + 'px');
    });
}