<?php
    include("session.php"); 
?>
    <!DOCTYPE html>
    <html>

    <head>
        <link rel="shortcut icon" href="myimages/ico/favicon.png">
        <title>BizApp-Mall | Buy Your Favourite Products From Online Shop Owners</title>
        <!-- for-mobile-apps -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="keywords" content="Buy Your Favourite Products From Online Shop Owners" />
        <script type="application/x-javascript">
            addEventListener("load", function() {
                setTimeout(hideURLbar, 0);
            }, false);

            function hideURLbar() {
                window.scrollTo(0, 1);
            }

        </script>
        <!-- //for-mobile-apps -->
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
        <link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
        <!-- js -->
        <script src="js/jquery.min.js"></script>
        <!-- //js -->
        <!-- cart -->
        <script src="js/simpleCart.min.js"></script>
        <!-- cart -->
        <!--pace-->
        <script src="js/pace.min.js"></script>
        <!--pagination-->
        <script src="js/jquery.twbsPagination.js" type="text/javascript"></script>
        <!--lazy load-->
        <script src="js/jquery.lazyload.js" type="text/javascript"></script>
        <!--pagination-->
        <!-- for bootstrap working -->
        <script type="text/javascript" src="js/bootstrap-3.1.1.min.js"></script>
        <!-- //for bootstrap working -->
        <!-- animation-effect -->
        <!--
        <link href="css/animate.min.css" rel="stylesheet">
        <script src="js/wow.min.js"></script>
-->
        <script>
            new WOW().init();

        </script>
        <!-- //animation-effect -->
        <link href='//fonts.googleapis.com/css?family=Cabin:400,500,600,700' rel='stylesheet' type='text/css'>
        <link href='//fonts.googleapis.com/css?family=Lato:400,100,300,700,900' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="css/font-awesome.min.css">
        <style>
            .headerRow {
                display: none !important;
            }
            
            .cart-frame {
                display: block;
                border: none;
                overflow: hidden;
                width: 100%;
                height: 100%;
            }

        </style>
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
                                <a href="checkout">
                                    <h3><i class="fa fa-shopping-cart header-icon cart-icon" aria-hidden="true"></i><span class="badge"><span id="simpleCart_quantity" class="simpleCart_quantity"></span></span>
                                    </h3>
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
                                <h1 class="animated wow pulse" data-wow-delay=".5s">
                                    <a href="../bizappmall"><img src="myimages/logo.svg" id="logo-img"><span>Mall</span></a>
                                </h1>
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

        <div class="container" style="margin-bottom:1em">
            <div class="col-xs-4 col-md-4 panel panel-primary panel-step" style="padding:0">
                <div class="panel-heading">STEP 1</div>
                <div class="panel-body" style="padding:1em">
                    Click on shop name to choose which shop you want to checkout.
                </div>
            </div>
            <div class="col-xs-4 col-md-4 panel panel-success panel-step" style="padding:0">
                <div class="panel-heading">STEP 2</div>
                <div class="panel-body" style="padding:1em">
                    View your items, select, remove or change its quantity before checkout.
                </div>
            </div>
            <div class="col-xs-4 col-md-4 panel panel-info panel-step" style="padding:0">
                <div class="panel-heading">STEP 3</div>
                <div class="panel-body" style="padding:1em">
                    Click "Proceed to payment" to continue.
                </div>
            </div>
        </div>


        <!-- container -->
        <div class="container checkout-wrapper" id="accordion" role="tablist" aria-multiselectable="true">


        </div>
        <!-- //container -->

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
        <!--custom js-->
        <script src="js/bizappmall.js"></script>
    </body>

    </html>
