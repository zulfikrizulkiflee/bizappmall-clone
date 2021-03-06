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
                            <li><a href="register-seller" target="_self"><b>Sell</b></a></li>
                        </ul>
                    </div>
                    <div class="header-right animated wow fadeInRight" data-wow-delay=".5s">
                        <div class="header-right2">
                            <div class="cart box_1">
                                <a href="../checkout">
                                    <h3><i class="fa fa-shopping-cart header-icon cart-icon" aria-hidden="true"></i><span class="badge"><span id="simpleCart_quantity" class="simpleCart_quantity"></span></span></h3>
                                </a>

                                <div class="clearfix"> </div>
                            </div>
                        </div>
                        <div class="header-right1 ">
                            <ul>
                                <?php
                                    if(isset($_SESSION['username'])){
                                        echo '<li><a href="javascript:void(0)"><i class="fa fa-user-circle-o header-icon" aria-hidden="true"></i> '.$_SESSION['username'].'</a></li>';
                                        echo "<li class='pipe'>|</li>";
                                        echo '<li class="logout-btn"><a href="javascript:void(0)">Logout</a></li>';
                                        echo "<input type='hidden' id='session-login' value='".$_SESSION['uid']."'>";
                                        echo "<li class='pipe'>|</li>";
                                    }else{
                                        echo "<li><i class='glyphicon glyphicon-log-in'></i><a href='login'>Login</a></li>";
                                        echo "<li><i class='glyphicon glyphicon-book'></i><a href='register'>Register</a></li>";
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
                                <h1 class="animated wow pulse" data-wow-delay=".5s"><a href=".."><img src="../myimages/logo.svg" id="logo-img"><span>Mall</span></a></h1>
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

        <!--product-->
        <div class="container">
            <div class="col-md-12 product-wrapper simpleCart_shelfItem">
                <div class="col-xs-12 col-md-4 buffer">
                    <div class="product-image-container">
                        <div class="product-image-list">
                            <ul class="thumb-img">
                                <li><img src=""></li>
                                <li><img src=""></li>
                                <li><img src=""></li>
                                <li><img src=""></li>
                            </ul>
                        </div>
                        <div class="product-image-view"><img src="" class="item_image"></div>
                    </div>
                    <div class="col-xs-12 col-md-12 suggest-products-container">
                        <h4 style="color:#333;border-bottom:1px solid lightgray;padding-bottom:0.4em;margin-bottom:0.5em;">Comments <span class="comment-number">(0)</span></h4>
                        <ul class="product-comment-rating"></ul>
                        <div class="input-group">
                            <textarea class="form-control comment-area" rows="3"></textarea>
                            <span class="input-group-btn">
                    <button class="btn btn-default search-btn" type="button" style="width:5em;height:5.3em"><i class="fa fa-paper-plane" aria-hidden="true" style="font-size:2em"></i></button>
                    </span>
                        </div>
                    </div>
                </div>

                <div class="col-xs-12 col-md-8 product-info-container">
                    <div class="info-top">
                        <ul class="product-info-top-list">
                            <li><span class="item_name" style="display:inline-block;width:85%;word-wrap:break-word;padding:0;font-size:2em;"></span><span style="float:right"><a href="https://www.facebook.com/bizappmalaysia" target="_blank"><i class="fa fa-facebook-square header-icon" aria-hidden="true" style="font-size:2em !important;color:#3B5998"></i></a></span></li>
                            <li style="font-size:0.8em"><span class="item_rating" style="color:gold"></span> <span>(1)</span><span style="float:right"><span class="item_like" style="font-size:1.3em"><i class="fa fa-heart-o" aria-hidden="true"></i> <span class="">0</span></li>
                            <li style="margin-bottom:0.5em"><span class="item_pname"></span></span>
                                </span>
                            </li>
                            <li class="product-tag-container" style="margin-bottom:0.5em"></li>
                        </ul>
                    </div>
                    <div class="info-middle">
                        <ul class="product-info-top-list">
                            <li><pre class="item_detail">No detail available</pre></li>
                        </ul>
                    </div>
                    <div class="info-bottom">
                        <ul class="product-info-top-list">
                            <li><span class="item_price" style="color:#f57400;font-size:2em;font-weight:bold;line-height:2em"></span><span style="float:right;padding-top: 0.65em;"><span class="item_pid"></span><span class="item_prodid"></span>
                                <button class="item_add" style="font-size: 1.5em;background: #f57400;color: #fff;border: none;padding: 0.2em 0.4em;">Add To Cart</button>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-md-12 suggest-products-container">
                <h4 style="color:#333;border-bottom:1px solid lightgray;padding-bottom:0.4em;margin-bottom:0.5em;">See Also</h4>
                <div class="row suggest-product-list"></div>
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
        <!-- Static Modal -->
        <div class="modal modal-static fade" id="processing-modal" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="text-center">
                            <img src="../myimages/ico/cart-added.png" style="height:80px;margin-top:25px;margin-bottom:25px" class="icon" />
                            <h4>Item Added To Cart</h4>
                        </div>
                    </div>
                </div>
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