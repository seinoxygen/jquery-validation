jquery.validation [![Code Climate](https://codeclimate.com/github/seinoxygen/jquery-validation.png)](https://codeclimate.com/github/seinoxygen/jquery-validation)
=================

Simple validation plugin that uses data type attributes as validation rules.

## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

```html
<script src="/path/to/jquery.validation.js"></script>
<script src="/path/to/jquery.validation.en.js"></script>
```

## Initialize

#### Normal
This way the plugin will validate fields on keyup
```javascript
$('.validate').validate();
```

#### With return
This way the plugin will run when the button is pressed and will call teh callback functions. Also it will check validations on keyup.
```javascript
$('.runvalidation').click(function(e){
	e.preventDefault();
	$('.validate').validate({
		force: true,
		success: function(){
			alert("Great! Let's do something!");
		},
		error: function(){
			alert("Booo!");
		}
	});
});
```


## Usage

Use tha data attribute "rules" to let the plugin know what rules are aplying to the field. They must be separated by colon "|".

```html
<input type="text" class="validate" data-rules="required"/>
```

```html
<input type="text" class="validate" data-rules="required|between[0-3]"/>
```

## Rules

Usage | Description
------------- | -------------
required  | Checks if the field is not empty
exactlength[5]  | Checks if the field is 5 charactes length
minlength[5]  | Checks if the field at least 5 charactes long
maxlength[5]  | Checks if the field is less than 5 characters long
alpha  | Checks if the field contains letters
alphanumeric  | Checks if the field contains letters and numbers
numeric  | Checks if the field is numeric
integer  | Checks if the field is integer
natural  | Checks if the field is natural
decimal  | Checks if the field is decimal
between[5-10]  | Checks if the numeric value is between 5 and 10
matches[#password] | Checks if the field contains the same as field id password. Can be used almost any selector.
email  | Checks if the field contains a valid email
url  | Checks if the field contains a valid url
time  | Checks if the field contains a valid time
date  | Checks if the field contains a valid date
cc  | Checks if the field contains a valid credit card number
cc[visa]  | Checks if the field contains a valid visa credit card number. Options are visa,mastercard,discover,amex and diners
