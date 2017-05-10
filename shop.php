<?php
    include("session.php"); 
?>
    <!DOCTYPE html>
    <html>

    <head>
        <link rel="shortcut icon" href="../myimages/ico/favicon.png">
        <title>BizApp-Mall | Buy Your Favourite Products From Online Shop Owners</title>
        <!-- for-mobile-apps -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="keywords" content="Buy Your Favourite Products From Online Shop Owners" />
        <script type="application/x-javascript">
            addEventListener("load", function () {
                setTimeout(hideURLbar, 0);
            }, false);

            function hideURLbar() {
                window.scrollTo(0, 1);
            }
        </script>
        <!-- //for-mobile-apps -->
        <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
        <link href="../css/style.css" rel="stylesheet" type="text/css" media="all" />
        <!-- js -->
        <script src="../js/jquery.min.js"></script>
        <!-- //js -->
        <!-- cart -->
        <script src="../js/simpleCart.min.js"></script>
        <!-- cart -->
        <!--pagination-->
        <script src="../js/jquery.twbsPagination.js" type="text/javascript"></script>
        <!--pagination-->
        <!--pace-->
        <script src="../js/pace.min.js"></script>
        <!--lazy load-->
        <script src="../js/jquery.lazyload.js" type="text/javascript"></script>
        <!-- for bootstrap working -->
        <script type="text/javascript" src="../js/bootstrap-3.1.1.min.js"></script>
        <!-- //for bootstrap working -->
        <!-- animation-effect -->
        <!--
        <link href="../css/animate.min.css" rel="stylesheet">
        <script src="../js/wow.min.js"></script>
-->
        <script>
            new WOW().init();
        </script>
        <!-- //animation-effect -->
        <link href='//fonts.googleapis.com/css?family=Cabin:400,500,600,700' rel='stylesheet' type='text/css'>
        <link href='//fonts.googleapis.com/css?family=Lato:400,100,300,700,900' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="../css/font-awesome.min.css">
    </head>

    <body>
        <!-- header -->
        <div class="header">
            <div class="header-grid">
                <div class="container">
                    <div class="header-left animated wow fadeInLeft" data-wow-delay=".5s">
                        <ul>
                            <li><a href="#"> Help</a></li>
                            <li>|</li>
                            <li>Follow us on <a href="https://www.facebook.com/bizappmalaysia" target="_blank"><i class="fa fa-facebook-square header-icon" aria-hidden="true"></i></a> <a href="#" target="_blank"><i class="fa fa-instagram header-icon" aria-hidden="true"></i></a></li>
                            <li>|</li>
                            <li><a href="http://web.bizapp.my/" target="_blank"><b>Sell</b></a></li>
                        </ul>
                    </div>
                    <div class="header-right animated wow fadeInRight" data-wow-delay=".5s">
                        <div class="header-right2">
                            <div class="cart box_1">
                                <a href="checkout">
                                    <h3><i class="fa fa-shopping-cart header-icon cart-icon" aria-hidden="true"></i><span class="badge"><span id="simpleCart_quantity" class="simpleCart_quantity"></span></span></h3>
                                </a>

                                <div class="clearfix"> </div>
                            </div>
                        </div>
                        <div class="header-right1 ">
                            <ul>
                                <?php
                                    if(isset($_SESSION['username'])){
                                        echo "<li><div id='user-drawer'><i class='fa fa-user-circle-o header-icon' aria-hidden='true'></i> ".$_SESSION['username']."</div></li>";
                                        echo "<li class='pipe'>|</li>";
                                    }else{
                                        echo "<li><i class='glyphicon glyphicon-log-in'></i><a href='../login'>Login</a></li>";
                                        echo "<li><i class='glyphicon glyphicon-book'></i><a href='../register'>Register</a></li>";
                                    }
                                ?>
                            </ul>
                        </div>

                        <div class="clearfix"> </div>
                    </div>
                    <div class="clearfix"> </div>
                </div>
            </div>
            <div class="container">
                <div class="logo-nav">
                    <nav class="navbar navbar-default">
                        <!-- Brand and toggle get grouped for better mobile display -->
                        <div class="navbar-header nav_2">
                            <div class="navbar-brand logo-nav-left ">
                                <h1 class="animated wow pulse" data-wow-delay=".5s"><a href="/Project%20BizApp/bizappmall"><img src="../myimages/logo.svg" id="logo-img"><span>Mall</span></a></h1>
                            </div>
                            <div class="col-xs-12 col-md-6 navbar-search">
                                <div class="input-group">
                                    <input type="hidden" name="search_param" value="all" id="search_param">
                                    <input type="text" class="form-control search-input" name="x" placeholder="Search for products or shops..." style="height:45px;">
                                    <span class="input-group-btn">
                    <button class="btn btn-default search-btn" type="button" style="height:45px;"><span class="glyphicon glyphicon-search"></span></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <!-- //header -->

        <div class="container">
            <div class="col-xs-12 col-md-12 shop-profile product-grid-shadow">
                <div class="shop-info-right">
                    <ul>
                        <li><img class="shop_logo" src="../myimages/not_available.gif"></li>
                        <li><span class="shop_name">NAMA</span><span class="share_shop"><a href="https://www.facebook.com/bizappmalaysia" target="_blank"><i class="fa fa-facebook-square header-icon" aria-hidden="true" style="font-size:2em !important;color:#3B5998"></i></a></span></li>
                    </ul>
                </div>
                <div class="shop-info-left">
                    <ul>
                        <li><i class="fa fa-gift" aria-hidden="true"></i><span class="shop_products">Products 0</span>
                        </li>
                        <li><i class="fa fa-heart-o" aria-hidden="true"></i><span class="shop_like">Like 0</span></li>
                        <li><i class="fa fa-clock-o" aria-hidden="true"></i><span class="shop_response">Response Within Hours</span></li>
                        <li><span class="shop_rating"><i class="fa fa-star" aria-hidden="true"></i></span>Rating</li>
                        <li><i class="fa fa-user-plus" aria-hidden="true"></i><span class="shop_joined">June 2016</span></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="col-xs-12 col-md-12 shop-detail product-grid-shadow">
                <div class="shop-detail-right">
                    <div class="col-xs-12 col-md-12 promo-carousel">
                        <div id="promo-carousel" class="carousel slide" data-ride="carousel">
                            <!-- Indicators -->
                            <ol class="carousel-indicators">
                                <li data-target="#promo-carousel" data-slide-to="0" class=""></li>
                                <li data-target="#promo-carousel" data-slide-to="1" class=""></li>
                                <li data-target="#promo-carousel" data-slide-to="2" class="active"></li>
                            </ol>

                            <!-- Wrapper for slides -->
                            <div class="carousel-inner">
                                <div class="item">
                                    <a href="#"><img class="promo-carousel-img" src="../myimages/banner/raya.jpg" alt="BizApp Raya"></a>
                                </div>
                                <div class="item">
                                    <a href="../category/800"><img class="promo-carousel-img" src="../myimages/banner/gadgets.jpg" alt="Gadgets"></a>
                                </div>

                                <div class="item active">
                                    <img class="promo-carousel-img" src="http://www.kstarsports.com/images/product_banner.jpg" alt="New York">
                                </div>
                            </div>

                            <!-- Left and right controls -->
                            <a class="left carousel-control" href="#promo-carousel" data-slide="prev">
                                <span class="glyphicon glyphicon-chevron-left"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="right carousel-control" href="#promo-carousel" data-slide="next">
                                <span class="glyphicon glyphicon-chevron-right"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="shop-detail-left">
                    <h4>Shop Detail</h4>
                    <pre class="shop_detail">Not updated</pre>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="col-xs-12 col-md-12 suggest-products-container">
                <div class="bizapp-sort-by-options">
                    <a class="bizapp-sort-by-options__option option-selected" data-option="all" href="javascript:void(0)">ALL</a>
                    <a class="bizapp-sort-by-options__option" data-option="latest" href="javascript:void(0)">LATEST</a>
                    <a class="bizapp-sort-by-options__option" data-option="top" href="javascript:void(0)">TOP</a>
                    <div class="bizapp-sort-by-options__option price-key" style="position: relative;">
                        <span class="price-selection">PRICE</span> <i class="fa fa-chevron-down" aria-hidden="true"></i>
                        <div class="bizapp-dropdown-popover" style="visibility:hidden;position:absolute;top:40px;left:0;width:230px;height:100px;z-index:2">
                            <ul style="width:100%">
                                <li class="dropdown-price price-low-high" data-option="lowhigh">PRICE : LOW TO HIGH</li>
                                <li class="dropdown-price price-high-low" data-option="highlow">PRICE : HIGH TO LOW</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <ul class="shop-product-list"></ul>
            </div>
        </div>

        <!-- footer -->
        <div class="footer">
            <div class="container">
                <div class="footer-top">
                    <div class="col-md-12 footer-top1">
                        <h4>Want to be apart of our ever growing family?</h4>
                        <p>We have more than 20 thousands of registered shops and you are welcome to join us to discover new platform to sell your products. Please don't hesitate, we are ready to guide you.</p>
                    </div>
                    <div class="clearfix"> </div>
                </div>
                <div class="footer-grids">
                    <div class="col-md-6 footer-grid animated wow fadeInLeft" data-wow-delay=".5s">
                        <h3>Categories</h3>
                        <div class="footer-category-list">

                        </div>
                    </div>

                    <div class="clearfix"> </div>
                </div>

                <div class="copy-right animated wow fadeInUp" data-wow-delay=".5s">
                    <p>&copy 2017 BizApp Mall. All rights reserved | Design by <a href="http://www.ansi.com.my/">ANSI Systems Sdn Bhd</a></p>
                </div>
            </div>
        </div>
        <!-- //footer -->
        <div id='user-drawer-content' class="">
            <div class="drawer-btn-container">
                <div id='user-drawer-button'>My purchase</div>
            </div>
            <div class="drawer-btn-container">
                <div id='user-drawer-button' class="logout-btn">Logout</div>
            </div>
        </div>
        <!--custom js-->
        <script src="../js/bizappmall.js"></script>
        <script>
            var code = $(location).attr('pathname');
            code = code.split('/');
            code = code[(code.length - 1)];
            $.getJSON('http://mall.bizapp.my/get_category.php', function (dataMain) {
                $.each(dataMain, function (i, data) {
                    if (data.code == code) {
                        var desc = data.description_en;
                        desc = desc.replace(/---/g, '');
                        if (desc == "TERBUKA") {
                            desc = "MISC";
                        }
                        $('title').html(desc + ' | BizApp-Mall');
                    }
                });
            });
        </script>
    </body>

    </html>