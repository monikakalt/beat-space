<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<title>Login</title>
	<link rel="stylesheet" type="text/css" href="style.css">

<div class="header">
<h1>Login to beat space</h1>
</div>

</head>
<body>

<div class="logo"> </div>

<div id="wrapper">
	<form  onsubmit="return Validate(); " name="vForm">
		<div>
			<input type="text" name="username" class="textInput" placeholder="Username">
			<div id="name_error" class="val_error"></div>
		</div>
				<div>
			<input type="password" name="password" class="textInput" placeholder="Password">
			<div id="password_error" class="val_error"></div>
		</div>
		<div>
			<input type="submit" class="btn" name="login" value="login">
		</div>
	</form>
</div>
</body>
</html>


<!-- javascript -->
<script type="text/javascript">
//method="POST" action="index.php"

// all input
	var username = document.forms["vForm"]["username"];
	var password = document.forms["vForm"]["password"];
	// all error obj
	var name_error = document.getElementById("name_error");
	var password_error = document.getElementById("password_error");
	// event listeners
	username.addEventListener("blur", nameVerify, true);
	function Validate(){
		// VALIDATE USERNAME
		if(username.value == ""){
			name_error.textContent = "Username is required";
			username.style.border = "1px solid red";
			username.focus();
			return false;
		}
		// PASSWORD REQUIRED
		if (password.value == "" ) {
			password_error.textContent = "Password required";
			password.style.border = "1px solid red";
			password_confirmation.style.border = "1px solid red";
			password.focus();
			return false;
		}

		PostMethod();
	}
	// ADD EVENT LISTENERS
	function nameVerify(){
		if (username.value != "") {
			name_error.innerHTML = "";
			username.style.border = "1px solid #110E0F";
			return true;
		}
	}
	function passwordVerify(){
		if (password.value != "") {
			password_error.innerHTML = "";
			password.style.border = "1px solid #110E0F";
			return true;
		}
	}

	 $(document).ready(function () {
        //event handler for submit button
        $("#btnSubmit").click(function () {
            //collect userName and password entered by users
            var userName = $("#username").val();
            var password = $("#password").val();
            //call the authenticate function
            PostMethod(userName, password);
        });
    });

    //authenticate function to make ajax call
    function PostMethod(userName, password) {
        $.ajax
        ({
            type: "POST",
            //the url where you want to sent the userName and password to
            url:'http://localhost:64200/users',
            dataType: 'json',
            //json object to sent to the authentication url
            data: '{"userName": "' + userName + '", "password" : "' + password + '"}',
            success: function () {
                //do any process for successful authentication here
            }
        })
    }
</script>