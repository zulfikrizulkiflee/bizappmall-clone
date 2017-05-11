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
var home = '/' + page[1] + '/' + page[2];
var logout = home + '/logout.php';
console.log(logout);
page = page[(page.length - 1)];
console.log(page);

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
var suggest_box = '<div class="bizapp-dropdown-popover search-popover col-xs-12 col-md-12" style="visibility:hidden;position:absolute;top:50px;left:0;width:230px;height:100px;z-index:2;border:1px solid lightgray;"> <ul style="width:100%"> <li class="dropdown-price price-low-high search-popover-list shop-search" data-option="lowhigh"><i class="fa fa-building-o" aria-hidden="true"></i> Search \"<span class="search-param"></span>\" shop</li></ul> </div>';
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
        $('.bizapp-dropdown-popover').css('visibility', 'visible');
    } else {
        $('.bizapp-dropdown-popover').css('visibility', 'hidden');
    }

    var code = e.which; // recommended to use e.which, it's normalized across browsers
    if (code == 13) e.preventDefault();
    if (code == 13 || click == true) {
        var searchParam = $(this).val();
        alert(searchParam);
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
                getProductsNoLimit('.category-inside-list', '000', 'date', 'desc', page);
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
                        $('.shop-logo').attr('src', unavailable);
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
            }, 3000));
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