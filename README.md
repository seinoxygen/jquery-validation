jquery.validation [![Code Climate](https://codeclimate.com/github/seinoxygen/jquery-validation.png)](https://codeclimate.com/github/seinoxygen/jquery-validation)
=================

Simple validation plugin that uses data type attributes as validation rules.

## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

```html
<script src="/path/to/jquery.validation.js"></script>
```

## Initialize

```javascript
$('.fields').validate();
```

## Usage

Use tha data attribute "rules" to let the plugin know what rules are aplying to the field.

```html
<input type="text" class="validate" data-rules="required"/>
```
