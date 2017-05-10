<?php
    session_start();
    if(session_destroy())
    {
        header("Location: /Project%20BizApp/bizappmall");
    }
?>