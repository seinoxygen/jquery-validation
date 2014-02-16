jquery.validation [![Code Climate](https://codeclimate.com/github/seinoxygen/jquery-validation.png)](https://codeclimate.com/github/seinoxygen/jquery-validation)
=================

Simple validation plugin that uses data type attributes as validation rules.

## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

```html
<script src="/path/to/jquery.validation.js"></script>
```

## Initialize

#### Normal
This way the plugin will validate fields on keyup
```javascript
$('.validate').validate();
```

#### With return
With this way the plugin will run when the button is pressed and will return if the fields are valid. Also it will check validations on keyup
```javascript
$('.runvalidation').click(function(e){
	e.preventDefault();
	var valid = $('.validate').validate({auto: true});
	if(valid){
		alert("Great!");
	}
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
matches[#password] | Checks if the field contains the same as field id password
email  | Checks if the field contains a valid email
url  | Checks if the field contains a valid url
time  | Checks if the field contains a valid time
date  | Checks if the field contains a valid date
