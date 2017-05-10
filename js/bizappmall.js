console.log("loaded: bizappmall.js");

var link_product = "http://corrad.visionice.net/bizapp/upload/product/";
var link_shop = "http://corrad.visionice.net/bizapp/upload/profile/";
var unavailable = "../myimages/not_available.gif";

$(function () {
    $("img.item_image").lazyload({
        effect: "fadeIn"
    });
});

var appname = $(location).attr('hostname');

var page = $(location).attr('pathname');
page = page.split('/');
page = page[(page.length - 1)];
console.log(page);

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

var userdrw_width = ($('.header-right1').width() / 2) + $('.container').css('margin-right') + $('.header-right2').width();

$('#user-drawer-content').css('right', userdrw_width + 'px');

$('#user-drawer').on('click', function () {
    if ($('#user-drawer-content').hasClass('active')) {
        $('#user-drawer-content').removeClass('active');
    } else {
        $('#user-drawer-content').addClass('active');
    }
});

$(document).mouseup(function (e) {
    var $container = $("#user-drawer");

    // if the target of the click isn't the container nor a descendant of the container
    if (!$container.is(e.target) && $container.has(e.target).length === 0) {
        $('#user-drawer-content').removeClass('active');
    }
});

$('.logout-btn').on('click', function () {
    window.open('logout.php', '_self');
});


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

var current_page = $(location).attr('pathname');
current_page = current_page.split('/');
var page_name = current_page[(current_page.length - 2)];

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
                }
                var cat_str = '<a href="category/' + data.code + '"><li><div><img class="category-icon" src="myimages/category/' + iconArr[i] + '.png"></div>' + desc + '</li></a>';
                $('.category-list').append(cat_str);
            });
            var t = 0; // the height of the highest element (after the function runs)
            var t_elem; // the highest element (after the function runs)
            $('.categories ul li').each(function () {
                $this = $(this);
                if ($this.outerHeight() > t) {
                    t_elem = this;
                    t = $this.outerHeight();
                }
            });
            $('.categories ul li').attr('style', 'height:' + t + 'px');
        });
    }


    //get top products
    getTopProducts();

    function getTopProducts() {
        $.getJSON('http://mall.bizapp.my/get_products.php?action=teaser&limit=6', function (data) {
            $.each(data, function (i, data) {
                var top_str = '<a href="product/' + data.id + '"><li class="product-grid-shadow"><div><img src="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '" class="item_image" data-original="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '"></div><p class="item_name">' + data.productname + '</p><p class="price-like-container"><span class="item_price">RM' + data.price + '</span><span class="item_like"><i class="fa fa-heart-o" aria-hidden="true"></i> <span class="item_like_' + data.id + '">0</span></span></p></li></a>';
                $('.top-product-list').append(top_str);
                var selector = '.item_like_' + data.id;
                getLikeNumber("get", "product", selector, data.id);
            });
            var t = 0; // the height of the highest element (after the function runs)
            var t_elem; // the highest element (after the function runs)
            $('.top-products ul li').each(function () {
                $this = $(this);
                if ($this.outerHeight() > t) {
                    t_elem = this;
                    t = $this.outerHeight();
                }
            });
            $('.top-products ul li').attr('style', 'height:' + t + 'px');
            var f = 0; // the height of the highest element (after the function runs)
            var f_elem; // the highest element (after the function runs)
            $('.top-products ul li .item_name').each(function () {
                $this = $(this);
                if ($this.outerHeight() > f) {
                    f_elem = this;
                    f = $this.outerHeight();
                }
            });
            $('.top-products ul li .item_name').attr('style', 'height:' + f + 'px');
        });
    }

    //get discover products
    getDiscover(1);

    function getDiscover(page) {
        $.getJSON('http://mall.bizapp.my/get_products.php?action=browseP&code=000&sortby=date&orderby=desc&page=' + page, function (data) {
            $('.discover-list').html('');
            $.each(data, function (i, data) {
                var top_str = '<a href="product/' + data.id + '"><li class="product-grid-shadow"><div><img src="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '" class="item_image" data-original="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '"></div><p class="item_name">' + data.productname + '</p><p class="price-like-container"><span class="item_price">RM' + data.price + '</span><span class="item_like"><i class="fa fa-heart-o" aria-hidden="true"></i> <span class="item_like_' + data.id + '">0</span></span></p></li></a>';
                $('.discover-list').append(top_str);
                var selector = '.item_like_' + data.id;
                getLikeNumber("get", "product", selector, data.id);
            });
            var t = 0; // the height of the highest element (after the function runs)
            var t_elem; // the highest element (after the function runs)
            $('.discover ul li').each(function () {
                $this = $(this);
                if ($this.outerHeight() > t) {
                    t_elem = this;
                    t = $this.outerHeight();
                }
            });
            $('.discover ul li').attr('style', 'height:' + t + 'px');
            var f = 0; // the height of the highest element (after the function runs)
            var f_elem; // the highest element (after the function runs)
            $('.discover ul li .item_name').each(function () {
                $this = $(this);
                if ($this.outerHeight() > f) {
                    f_elem = this;
                    f = $this.outerHeight();
                }
            });
            $('.discover ul li .item_name').attr('style', 'height:' + f + 'px');
        });
    }

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
    getDiscoverInside(1);

    function getDiscoverInside(page) {
        $.getJSON('http://mall.bizapp.my/get_products.php?action=browseP&code=' + category_code + '&sortby=date&orderby=desc&page=' + page, function (data) {
            $('.category-inside-list').html('');
            $.each(data, function (i, data) {
                getLikeNumber("get", "product", data.id);
                var top_str = '<a href="../product/' + data.id + '"><li class="product-grid-shadow"><div><img src="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '" class="item_image" data-original="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '"></div><p class="item_name">' + data.productname + '</p><p class="price-like-container"><span class="item_price">RM' + data.price + '</span><span class="item_like"><i class="fa fa-heart-o" aria-hidden="true"></i> <span class="item_like_' + data.id + '">0</span></span></p></li></a>';
                $('.category-inside-list').append(top_str);
                var selector = '.item_like_' + data.id;
                getLikeNumber("get", "product", selector, data.id);
            });
            var t = 0; // the height of the highest element (after the function runs)
            var t_elem; // the highest element (after the function runs)
            $('.discover ul li').each(function () {
                $this = $(this);
                if ($this.outerHeight() > t) {
                    t_elem = this;
                    t = $this.outerHeight();
                }
            });
            $('.discover ul li').attr('style', 'height:' + t + 'px');
            var f = 0; // the height of the highest element (after the function runs)
            var f_elem; // the highest element (after the function runs)
            $('.discover ul li .item_name').each(function () {
                $this = $(this);
                if ($this.outerHeight() > f) {
                    f_elem = this;
                    f = $this.outerHeight();
                }
            });
            $('.discover ul li .item_name').attr('style', 'height:' + f + 'px');
        });
    }

    //get footer category JSON
    generateSideCategoryList(category_code);

    $(function () {
        window.pagObj = $('#pagination').twbsPagination({
            totalPages: 20,
            visiblePages: 5,
            onPageClick: function (event, page) {
                getDiscoverInside(page);
            }
        }).on('page', function (event, page) {
            console.info(page + ' (from event listening)');
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

    function getDiscoverInside(page) {
        $.getJSON('http://mall.bizapp.my/get_products.php?action=browseP&code=000&sortby=date&orderby=desc&page=' + page, function (data) {
            $('.category-inside-list').html('');
            $.each(data, function (i, data) {
                getLikeNumber("get", "product", data.id);
                var top_str = '<a href="product/' + data.id + '"><li class="product-grid-shadow"><div><img src="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '" class="item_image" data-original="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '"></div><p class="item_name">' + data.productname + '</p><p class="price-like-container"><span class="item_price">RM' + data.price + '</span><span class="item_like"><i class="fa fa-heart-o" aria-hidden="true"></i> <span class="item_like_' + data.id + '">0</span></span></p></li></a>';
                $('.category-inside-list').append(top_str);
                var selector = '.item_like_' + data.id;
                getLikeNumber("get", "product", selector, data.id);
            });
            var t = 0; // the height of the highest element (after the function runs)
            var t_elem; // the highest element (after the function runs)
            $('.discover ul li').each(function () {
                $this = $(this);
                if ($this.outerHeight() > t) {
                    t_elem = this;
                    t = $this.outerHeight();
                }
            });
            $('.discover ul li').attr('style', 'height:' + t + 'px');
            var f = 0; // the height of the highest element (after the function runs)
            var f_elem; // the highest element (after the function runs)
            $('.discover ul li .item_name').each(function () {
                $this = $(this);
                if ($this.outerHeight() > f) {
                    f_elem = this;
                    f = $this.outerHeight();
                }
            });
            $('.discover ul li .item_name').attr('style', 'height:' + f + 'px');
        });
    }

    $(function () {
        window.pagObj = $('#pagination').twbsPagination({
            totalPages: 20,
            visiblePages: 5,
            onPageClick: function (event, page) {
                getDiscoverInside(page);
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
                var star = '<i class="fa fa-star" aria-hidden="true"></i>';
                $('.item_name').html(data.productname);
                $('.item_price').html('RM' + data.price);
                $('.item_rating').html(star.repeat(5));
                $('.item_pname').html('<a href="../shop/' + data.pid + '" style="color:#f57400"><img class="shop-logo" src="" style="height:2em;width:2em;object-fit:cover;border-radius:50%;border:1px solid #f57400"> ' + data.nama + '</a>');
                $('.item_detail').html(data.productdesc);
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
                        $('.shop-logo').attr('src', unavailable);
                    }
                }
            });

            $('.product-image-container img').each(function () {
                if ($(this).attr('src') == link_product) {
                    $(this).parent().remove();
                }
            });
            $('.product-image-container ul li').each(function () {
                $(this).on('click', function () {
                    $('.product-image-container .item_image').attr('src', $(this).children('img').attr('src'));
                });
            });
            var img_cont_height = $('.product-image-container').height() + 18;
            //            $('.product-info-container').attr('style', 'height:' + img_cont_height + 'px');
        });

    }

    //get top products
    getSuggestProducts();

    function getSuggestProducts() {
        $.getJSON('http://mall.bizapp.my/get_products.php?action=teaser&limit=6', function (data) {
            $.each(data, function (i, data) {
                var top_str = '<a href="' + data.id + '"><li class="product-grid-shadow"><div><img src="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '" class="item_image" data-original="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '"></div><p class="item_name">' + data.productname + '</p><p class="price-like-container"><span class="item_price">RM' + data.price + '</span><span class="item_like"><i class="fa fa-heart-o" aria-hidden="true"></i> <span class="item_like_' + data.id + '">0</span></span></p></li></a>';
                $('.suggest-product-list').append(top_str);
                var selector = '.item_like_' + data.id;
                getLikeNumber("get", "product", selector, data.id);
            });
            var t = 0; // the height of the highest element (after the function runs)
            var t_elem; // the highest element (after the function runs)
            $('.suggest-product-list li').each(function () {
                $this = $(this);
                if ($this.outerHeight() > t) {
                    t_elem = this;
                    t = $this.outerHeight();
                }
            });
            $('.suggest-product-list li').attr('style', 'height:' + t + 'px');
            var f = 0; // the height of the highest element (after the function runs)
            var f_elem; // the highest element (after the function runs)
            $('.suggest-product-list li .item_name').each(function () {
                $this = $(this);
                if ($this.outerHeight() > f) {
                    f_elem = this;
                    f = $this.outerHeight();
                }
            });
            $('.suggest-product-list li .item_name').attr('style', 'height:' + f + 'px');
        });
    }
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
            $('.bizapp-dropdown-popover').attr('style', 'visibility:hidden;position:absolute;top:40px;left:0;width:230px;height:100px;z-index:2');
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
            var text = $(this).text();
            var option = $(this).attr('data-option');

            $('.price-selection').text(text);
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
                    $('.shop_logo').attr('src', unavailable);
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
                var top_str = '<a href="../product/' + data.id + '"><li class="product-grid-shadow"><div><img src="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '" class="item_image" data-original="http://corrad.visionice.net/bizapp/upload/product/' + data.attachment + '"></div><p class="item_name">' + data.productname + '</p><p class="price-like-container"><span class="item_price">RM' + data.price + '</span><span class="item_like"><i class="fa fa-heart-o" aria-hidden="true"></i> <span class="item_like_' + data.id + '">0</span></span></p></li></a>';
                $('.shop-product-list').append(top_str);
                var selector = '.item_like_' + data.id;
                getLikeNumber("get", "product", selector, data.id);
            });
            var t = 0; // the height of the highest element (after the function runs)
            var t_elem; // the highest element (after the function runs)
            $('.shop-product-list li').each(function () {
                $this = $(this);
                if ($this.outerHeight() > t) {
                    t_elem = this;
                    t = $this.outerHeight();
                }
            });
            $('.shop-product-list li').attr('style', 'height:' + t + 'px');
            var f = 0; // the height of the highest element (after the function runs)
            var f_elem; // the highest element (after the function runs)
            $('.shop-product-list li .item_name').each(function () {
                $this = $(this);
                if ($this.outerHeight() > f) {
                    f_elem = this;
                    f = $this.outerHeight();
                }
            });
            $('.shop-product-list li .item_name').attr('style', 'height:' + f + 'px');
        });
    }
}


//get like
function getLikeNumber(action, target, target_class, id) {
    $.getJSON('/Project%20BizApp/bizappmall/get_like_number.php?action=' + action + '&target=' + target + '&id=' + id, function (data) {
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