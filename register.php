<?php
    include("session.php");
    if(isset($_SESSION['username'])){
        header("location: ../");
    }

    $error = ""; //Variable for storing our errors.
    if(isset($_POST["submit"])){
        if(empty($_POST["email"]) || empty($_POST["username"]) || empty($_POST["password1"]) || empty($_POST["password2"])){
        $error = "All fields are required.";
        }else{
            // Define $username and $password
            $email=$_POST['email'];
            $username=$_POST['username'];
            $password1=$_POST['password1'];
            $password2=$_POST['password2'];

            // To protect from MySQL injection
            $email = stripslashes($email);
            $username = stripslashes($username);
            $password1 = stripslashes($password1);
            $password2 = stripslashes($password2);
            $email = mysqli_real_escape_string($db, $email);
            $username = mysqli_real_escape_string($db, $username);
            $password1 = mysqli_real_escape_string($db, $password1);
            $password2 = mysqli_real_escape_string($db, $password2);
            $password1 = md5($password1);
            $confirm_code = md5(uniqid(rand()));

            //Check username and password from database
            $sql="INSERT INTO comm_user (email,username,password,confirm_code) VALUES ('".$email."','".$username."','".$password1."','".$confirm_code."')";
            $result=mysqli_query($db,$sql);

            if($result){
                // send e-mail to ...
                $to=$email;

                // Your subject
                $subject="Your confirmation link here";

                // From
                $header="from: BizApp <no_reply@bizapp.com>";

                // Your message
                $message="Your Comfirmation link \r\n";
                $message.="Click on this link to activate your account \r\n";
                $message.="http://localhost..//confirm.php?code=".$confirm_code;

                // send email
                mail($to,$subject,$message,$header);
                echo "Registration Complete, ";
                echo "Please check your email";
            }else{
                $error = "Something went wrong.";
            }
        }
    }
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
                                <h1 class="animated wow pulse" data-wow-delay=".5s"><a href="../bizappmall"><img src="myimages/logo.svg" id="logo-img"><span>Mall</span></a></h1>
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
        <!--banner-->
        <div class="banner-top">
            <div class="container">
                <h2 class="animated wow fadeInLeft" data-wow-delay=".5s">Register</h2>
                <h3 class="animated wow fadeInRight" data-wow-delay=".5s"><a href="../bizappmall">Home</a><label>/</label>Register</h3>
                <div class="clearfix"> </div>
            </div>
        </div>
        <!-- contact -->
        <div class="login">
            <div class="container">
                <form id="register-form" class="product-grid-shadow" action="" method="post">
                    <div class="col-md-6 login-do1 animated wow fadeInLeft" data-wow-delay=".5s">
                        <div class="login-mail">
                            <input name="email" type="text" placeholder="Email" required="">
                            <i class="glyphicon glyphicon-envelope"></i>
                        </div>
                        <div class="login-mail">
                            <input name="username" type="text" placeholder="Username" required="">
                            <i class="glyphicon glyphicon-user"></i>
                        </div>
                        <div class="login-mail">
                            <input name="password1" type="password" placeholder="Password" required="">
                            <i class="glyphicon glyphicon-lock"></i>
                        </div>
                        <div class="login-mail">
                            <input name="password2" type="password" placeholder="Repeated password" required="">
                            <i class="glyphicon glyphicon-lock"></i>
                        </div>
                        <a class="news-letter" href="#">
                            <label class="checkbox1">
                                <input name="check-term" type="checkbox" name="checkbox"><i> </i>I agree with the terms</label>
                        </a>

                    </div>
                    <div class="col-md-6 login-do animated wow fadeInRight" data-wow-delay=".5s">
                        <label class="hvr-sweep-to-top login-sub">
                            <input name="submit" type="submit" value="Submit">
                        </label>
                        <p>Already register?</p>
                        <a href="login" class="hvr-sweep-to-top">Login</a>
                    </div>
                    <div class="clearfix"> </div>
                </form>
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
        <script src="js/bizappmall.js"></script>
    </body>

    </html>