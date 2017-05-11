<?php
    include("session.php"); 
?>
    <!DOCTYPE html>
    <html>

    <head>
        <title>Classic Style a Ecommerce Online Shopping Category Flat Bootstrap Responsive Website Template | Contact :: w3layouts</title>
        <!-- for-mobile-apps -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="keywords" content="Classic Style Responsive web template, Bootstrap Web Templates, Flat Web Templates, Android Compatible web template, 
Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyEricsson, Motorola web design" />
        <script type="application/x-javascript">
            addEventListener("load", function () {
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
        <!-- for bootstrap working -->
        <script type="text/javascript" src="js/bootstrap-3.1.1.min.js"></script>
        <!-- //for bootstrap working -->
        <!-- animation-effect -->
        <link href="css/animate.min.css" rel="stylesheet">
        <script src="js/wow.min.js"></script>
        <script>
            new WOW().init();
        </script>
        <!-- //animation-effect -->
        <link href='//fonts.googleapis.com/css?family=Cabin:400,500,600,700' rel='stylesheet' type='text/css'>
        <link href='//fonts.googleapis.com/css?family=Lato:400,100,300,700,900' rel='stylesheet' type='text/css'>
    </head>

    <body>
        <!-- header -->
        <div class="header">
            <div class="header-grid">
                <div class="container">
                    <div class="header-left animated wow fadeInLeft" data-wow-delay=".5s">
                        <ul>
                            <li><i class="glyphicon glyphicon-headphones"></i><a href="#">24x7 live support</a></li>
                            <li><i class="glyphicon glyphicon-envelope"></i><a href="mailto:info@example.com">@example.com</a></li>
                            <li><i class="glyphicon glyphicon-earphone"></i>+1234 567 892</li>

                        </ul>
                    </div>
                    <div class="header-right animated wow fadeInRight" data-wow-delay=".5s">
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
                        <div class="header-right2">
                            <div class="cart box_1">
                                <a href="checkout">
                                    <h3> <div class="total">
								<span class="simpleCart_total"></span> (<span id="simpleCart_quantity" class="simpleCart_quantity"></span> items)</div>
								<img src="images/cart.png" alt="" />
							</h3>
                                </a>
                                <p><a href="javascript:;" class="simpleCart_empty">Empty Cart</a></p>
                                <div class="clearfix"> </div>
                            </div>
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
                            <button type="button" class="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <div class="navbar-brand logo-nav-left wow fadeInLeft animated" data-wow-delay=".5s">
                                <h1 class="animated wow pulse" data-wow-delay=".5s"><a href="../bizappmall">Classic<span>Style</span></a></h1>
                            </div>

                        </div>
                        <div class="collapse navbar-collapse" id="bs-megadropdown-tabs">
                            <ul class="nav navbar-nav">
                                <li><a href="../" class="act">Home</a></li>
                                <!-- Mega Menu -->
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Women <b class="caret"></b></a>
                                    <ul class="dropdown-menu multi">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <ul class="multi-column-dropdown">
                                                    <h6>Submenu1</h6>

                                                    <li><a href="products">Accessories</a></li>
                                                    <li><a href="products">Bags</a></li>
                                                    <li><a href="products">Caps & Hats</a></li>
                                                    <li><a href="products">Hoodies & Sweatshirts</a></li>

                                                </ul>
                                            </div>
                                            <div class="col-sm-4">
                                                <ul class="multi-column-dropdown">
                                                    <h6>Submenu2</h6>
                                                    <li><a href="products">Jackets & Coats</a></li>
                                                    <li><a href="products">Jeans</a></li>
                                                    <li><a href="products">Jewellery</a></li>
                                                    <li><a href="products">Jumpers & Cardigans</a></li>
                                                    <li><a href="products">Leather Jackets</a></li>
                                                    <li><a href="products">Long Sleeve T-Shirts</a></li>

                                                </ul>
                                            </div>
                                            <div class="col-sm-4">
                                                <ul class="multi-column-dropdown">
                                                    <h6>Submenu3</h6>
                                                    <li><a href="products">Shirts</a></li>
                                                    <li><a href="products">Shoes, Boots & Trainers</a></li>
                                                    <li><a href="products">Sunglasses</a></li>
                                                    <li><a href="products">Sweatpants</a></li>
                                                    <li><a href="products">Swimwear</a></li>
                                                    <li><a href="products">Trousers & Chinos</a></li>

                                                </ul>
                                            </div>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="row-top">
                                            <div class="col-sm-6 row1">
                                                <a href="products"><img src="images/me.jpg" alt="" class="img-responsive"></a>
                                            </div>
                                            <div class=" col-sm-6 row2">
                                                <a href="products"><img src="images/me1.jpg" alt="" class="img-responsive"></a>
                                            </div>
                                            <div class="clearfix"></div>
                                        </div>
                                    </ul>
                                </li>
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Men <b class="caret"></b></a>
                                    <ul class="dropdown-menu multi multi1">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <ul class="multi-column-dropdown">
                                                    <h6>Submenu1</h6>

                                                    <li><a href="products1.html">Accessories</a></li>
                                                    <li><a href="products1.html">Bags</a></li>
                                                    <li><a href="products1.html">Caps & Hats</a></li>
                                                    <li><a href="products1.html">Hoodies & Sweatshirts</a></li>

                                                </ul>
                                            </div>
                                            <div class="col-sm-4">
                                                <ul class="multi-column-dropdown">
                                                    <h6>Submenu2</h6>
                                                    <li><a href="products1.html">Jackets & Coats</a></li>
                                                    <li><a href="products1.html">Jeans</a></li>
                                                    <li><a href="products1.html">Jewellery</a></li>
                                                    <li><a href="products1.html">Jumpers & Cardigans</a></li>
                                                    <li><a href="products1.html">Leather Jackets</a></li>
                                                    <li><a href="products1.html">Long Sleeve T-Shirts</a></li>

                                                </ul>
                                            </div>
                                            <div class="col-sm-4">
                                                <ul class="multi-column-dropdown">
                                                    <h6>Submenu3</h6>
                                                    <li><a href="products1.html">Shirts</a></li>
                                                    <li><a href="products1.html">Shoes, Boots & Trainers</a></li>
                                                    <li><a href="products1.html">Sunglasses</a></li>
                                                    <li><a href="products1.html">Sweatpants</a></li>
                                                    <li><a href="products1.html">Swimwear</a></li>
                                                    <li><a href="products1.html">Trousers & Chinos</a></li>

                                                </ul>
                                            </div>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="row-top">
                                            <div class="col-sm-6 row1">
                                                <a href="products1.html"><img src="images/me2.jpg" alt="" class="img-responsive"></a>
                                            </div>
                                            <div class=" col-sm-6 row2">
                                                <a href="products1.html"><img src="images/me3.jpg" alt="" class="img-responsive"></a>
                                            </div>
                                            <div class="clearfix"></div>
                                        </div>
                                    </ul>
                                </li>

                                <li><a href="codes"> Codes</a></li>
                                <li class="active"><a href="contact">Contact Us</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>

            </div>
        </div>
        <!-- //header -->
        <!--banner-->
        <div class="banner-top">
            <div class="container">
                <h2 class="animated wow fadeInLeft" data-wow-delay=".5s">Contact</h2>
                <h3 class="animated wow fadeInRight" data-wow-delay=".5s"><a href="../bizappmall">Home</a><label>/</label>Contact</h3>
                <div class="clearfix"> </div>
            </div>
        </div>
        <!-- contact -->
        <div class="contact">
            <div class="container">


                <div class="col-md-8 contact-grids1 animated wow fadeInRight" data-wow-delay=".5s">
                    <form>
                        <div class="contact-form2">
                            <h4>Name</h4>

                            <input type="text" placeholder="" required="">

                        </div>
                        <div class="contact-form2">
                            <h4>Website</h4>

                            <input type="text" placeholder="" required="">

                        </div>

                        <div class="contact-form2">
                            <h4>Email</h4>

                            <input type="email" placeholder="" required="">

                        </div>
                        <div class="contact-form2">
                            <h4>Subject</h4>

                            <input type="text" placeholder="" required="">

                        </div>


                        <div class="contact-me ">
                            <h4>Message</h4>

                            <textarea type="text" placeholder="" required=""> </textarea>
                        </div>
                        <input type="submit" value="Submit">
                    </form>

                </div>

                <div class="col-md-4 contact-grids">
                    <div class=" contact-grid animated wow fadeInLeft" data-wow-delay=".5s">
                        <div class="contact-grid1">
                            <div class="contact-grid2 ">
                                <i class="glyphicon glyphicon-map-marker" aria-hidden="true"></i>
                            </div>
                            <div class="contact-grid3">
                                <h4>Address</h4>
                                <p>12K Street, 45 Building Road <span>New York City.</span></p>
                            </div>
                        </div>
                    </div>
                    <div class=" contact-grid animated wow fadeInUp" data-wow-delay=".5s">
                        <div class="contact-grid1">
                            <div class="contact-grid2 contact-grid4">
                                <i class="glyphicon glyphicon-earphone" aria-hidden="true"></i>
                            </div>
                            <div class="contact-grid3">
                                <h4>Call Us</h4>
                                <p>+1234 758 839<span>+1273 748 730</span></p>
                            </div>
                        </div>
                    </div>
                    <div class=" contact-grid animated wow fadeInRight" data-wow-delay=".5s">
                        <div class="contact-grid1">
                            <div class="contact-grid2 contact-grid5">
                                <i class="glyphicon glyphicon-envelope" aria-hidden="true"></i>
                            </div>
                            <div class="contact-grid3">
                                <h4>Email</h4>
                                <p><a href="contactto:info@example.com">info@example1.com</a><span><a href="contactto:info@example.com">info@example2.com</a></span></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="map">
            <iframe class="animated wow fadeInLeft" data-wow-delay=".5s" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.9579945977393!2d-73.87657738464283!3d40.806916839740346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f510a78ff341%3A0xe5b1e682c2e91238!2sNYS+Agriculture+%26+Markets!5e0!3m2!1sen!2sin!4v1456403781501" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
        <!-- //contact -->
        <div class="social animated wow fadeInUp" data-wow-delay=".1s">
            <div class="container">
                <div class="col-sm-3 social-ic">
                    <a href="#">FACEBOOK</a>
                </div>
                <div class="col-sm-3 social-ic">
                    <a href="#">TWITTER</a>
                </div>
                <div class="col-sm-3 social-ic">
                    <a href="#">GOOGLE+</a>
                </div>
                <div class="col-sm-3 social-ic">
                    <a href="#">PINTEREST</a>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>

        <!-- footer -->
        <div class="footer">
            <div class="container">
                <div class="footer-top">
                    <div class="col-md-9 footer-top1">
                        <h4>Duis aute irure dolor in reprehenderit in voluptate </h4>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse.Excepteur sint occaecat cupidatat non proident Duis aute irure dolor in reprehenderit in voluptate velit esse</p>
                    </div>
                    <div class="col-md-3 footer-top2">
                        <a href="contact">Contact Us</a>
                    </div>
                    <div class="clearfix"> </div>
                </div>
                <div class="footer-grids">
                    <div class="col-md-4 footer-grid animated wow fadeInLeft" data-wow-delay=".5s">
                        <h3>About Us</h3>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse.<span>Excepteur sint occaecat cupidatat 
						non proident, sunt in culpa qui officia deserunt mollit.</span></p>
                    </div>
                    <div class="col-md-4 footer-grid animated wow fadeInLeft" data-wow-delay=".6s">
                        <h3>Contact Info</h3>
                        <ul>
                            <li><i class="glyphicon glyphicon-map-marker"></i>1234k Avenue, 4th block, <span>New York City.</span></li>
                            <li class="foot-mid"><i class="glyphicon glyphicon-envelope"></i><a href="mailto:info@example.com">info@example.com</a></li>
                            <li><i class="glyphicon glyphicon-earphone"></i>+1234 567 567</li>
                        </ul>
                    </div>
                    <div class="col-md-4 footer-grid animated wow fadeInLeft" data-wow-delay=".7s">
                        <h3>Sign up for newsletter </h3>
                        <form>
                            <input type="text" placeholder="Email" required="">
                            <input type="submit" value="Submit">
                        </form>

                    </div>

                    <div class="clearfix"> </div>
                </div>

                <div class="copy-right animated wow fadeInUp" data-wow-delay=".5s">
                    <p>&copy 2016 Classic Style. All rights reserved | Design by <a href="http://w3layouts.com/">W3layouts</a></p>
                </div>
            </div>
        </div>
        <!-- //footer -->
        <!--custom js-->
        <script src="js/bizappmall.js"></script>
    </body>

    </html>