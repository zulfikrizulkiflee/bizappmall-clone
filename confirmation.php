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
                                        echo '<li><a tabindex="0" id="user-drawer" data-toggle="popover" data-trigger="focus" data-placement="bottom"><i class="fa fa-user-circle-o header-icon" aria-hidden="true"></i> '.$_SESSION['username'].'</a></li>';
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
                                <h1 class="animated wow pulse" data-wow-delay=".5s"><a href="../bizappmall"><img src="../myimages/logo.svg" id="logo-img"><span>Mall</span></a></h1>
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
            <div class="col-xs-12 col-md-4 payment-wrapper">
                <div class="account-info">
                    <p style="border-bottom:1px solid lightgray;margin-bottom:0.5em;padding-bottom: 0.5em;">Account Name: <span style="font-weight:bold"><?php echo $_SESSION['username']; ?></span></p>
                    <p>Phone Number: <span style="font-weight:bold"><?php echo $_SESSION['phone']; ?></span></p>
                    <p style="font-size:14px;font-weight:100">Your order notification will be sent to this number.</p>

                </div>
            </div>
            <div class="col-xs-12 col-md-8 payment-wrapper">
                <div class="delivery-info">
                    <p style="border-bottom:1px solid lightgray;margin-bottom:0.5em;padding-bottom: 0.5em;">Delivery Address<span class="view-shop" style="float:right;cursor:pointer;padding:0 0.5em">Edit</span></p>
                    <p>
                        <?php 
                            echo '<b>'.$_SESSION['name'].'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$_SESSION['phone'];
                        ?>
                    </p>
                    <p>
                        <?php 
                            echo $_SESSION['address1'].', '.$_SESSION['address2'];
                        ?>
                    </p>
                    <p>
                        <?php 
                            echo $_SESSION['address3'];
                        ?>
                    </p>
                    <p>
                        <?php 
                            echo $_SESSION['postcode'].' '.$_SESSION['state'];
                        ?>
                    </p>
                </div>
                <span style="display:none" id=userSess><span id="username"><?php echo $_SESSION['name'];?></span><span id="userid"><?php echo $_SESSION['uid'];?></span><span id="useremail"><?php echo $_SESSION['email'];?></span><span id="userphone"><?php echo $_SESSION['phone'];?></span><span id="useraddress1"><?php echo $_SESSION['address1'];?></span><span id="useraddress2"><?php echo $_SESSION['address2'];?></span><span id="useraddress3"><?php echo $_SESSION['address3'];?></span><span id="userpostcode"><?php echo $_SESSION['postcode'];?></span><span id="userstate"><?php echo $_SESSION['state'];?></span></span>
            </div>
            <div class="col-xs-12 col-md-12 payment-wrapper">
                <div class="purchase-info">
                    <!--                    <p style="border-bottom:1px solid lightgray;margin-bottom:0.5em;padding-bottom: 0.5em;">Order Detail</p>-->
                    <p class="shop-name" style="border-bottom:1px solid lightgray;padding-bottom: 0.5em;font-weight:bold"></p>
                    <p class="purchase-list"></p>


                    <p style="padding:0.5em;margin:0.5em 0"><span class="total-item"></span><span style="float:right">Total price: <span class="total-price" style="color:#f57400;font-weight:bold"></span></span>
                    </p>
                    <p>
                        <textarea class="form-control note-area" rows="2" style="width:100%;padding:0 0.5em" placeholder="Leave notes..."></textarea>
                    </p>
                    <p class="cart-total" style="margin-right:-0.5em !important"><a href="javascript:void(0)" id="pro_payment">Order Now</a></p>
                </div>
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
        <div class="modal modal-static fade" id="payment-modal" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="text-center">
                            <img src="../myimages/ico/preloader.gif" style="height:80px;margin-top:25px;margin-bottom:25px" class="icon" />
                            <h4>Processing...</h4>
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