<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<title>Form validation in Javascript</title>
	<link rel="stylesheet" type="text/css" href="style.css">

<div class="header">
<h1>Registration for beat space</h1>
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
			<input type="email" name="email" class="textInput" placeholder="Email">
			<div id="email_error" class="val_error"></div>
		</div>
		<div>
			<input type="password" name="password" class="textInput" placeholder="Password">
		</div>
		<div>
			<input type="password" name="password_confirmation" class="textInput" placeholder="password confirmation">
			<div id="password_error" class="val_error"></div>
		</div>
		<div>
			<input type="submit" class="btn" name="register" value="Register">
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
	var email = document.forms["vForm"]["email"];
	var password = document.forms["vForm"]["password"];
	var password_confirmation = document.forms["vForm"]["password_confirmation"];
	// all error obj
	var name_error = document.getElementById("name_error");
	var email_error = document.getElementById("email_error");
	var password_error = document.getElementById("password_error");
	// event listeners
	username.addEventListener("blur", nameVerify, true);
	email.addEventListener("blur", emailVerify, true);
	function Validate(){
		// VALIDATE USERNAME
		if(username.value == ""){
			name_error.textContent = "Username is required";
			username.style.border = "1px solid red";
			username.focus();
			return false;
		}
		// VALIDATE EMAIL
		if(email.value == ""){
			email_error.textContent = "Email is required";
			email.style.border = "1px solid red";
			email.focus();
			return false;
		}
		// VALIDATE PASSWORD
		if (password.value != password_confirmation.value) {
			password_error.textContent = "The two passwords do not match";
			password.style.border = "1px solid red";
			password_confirmation.style.border = "1px solid red";
			password.focus();
			return false;
		}
		// PASSWORD REQUIRED
		if (password.value == "" || password_confirmation.value == "") {
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
	function emailVerify(){
		if (email.value != "") {
			email_error.innerHTML = "";
			email.style.border = "1px solid #110E0F";
			return true;
		}
	}

	function PostMethod(){
        var JSONObject= {
             "UserName":username.value,
             "Email":email.value,
             "Password":password.value,
             };
        console.log(username.value, email.value, password.value);

        $.ajax({
            url:'http://localhost:64200/users',  
            type:'post',
            data :  JSONObject,      
            dataType: 'JSON',
            // Redirect to page
        });  
	};     


</script>