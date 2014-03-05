/*
* Form Validation 1.1, jQuery plugin
* Repository: http://github.com/seinoxygen/jquery-validation
*
* Copyright(c) 2014, Pablo Cornehl
* http://www.seinoxygen.com
*
* Licensed under the MIT License
*/
(function($, window, undefined){      
	$.fn.validate = function(options) {
		
		// Default config
		var defaults = {
			force: false,
			wrapper: 'jqv-',
			submit: '',
			valid: function(element){}, // Called when the field is valid
			invalid: function(element, error){}, // Called when the field is invalid
			success: function(){}, // Called when all the fields were validated correctly
			error: function(){} // Called when at least one field has an error
		};
		
		// Update all configs
		options = $.extend(true, {}, defaults, options);
		
		var is_valid = true;
		var checked = false;
		
		// Check all fields
		this.each(function() {
			if(options.force === true){
				var error = $.fn.validate.check($(this), options);
				if(error === true){
					is_valid = false;
				}
				checked = true;
			}
			
			// For textboxes
			$(this).keyup(function(e) {
				e.preventDefault();
				// Ignore enter
				if (e.which === 13) {
					return;
				}
				var error = $.fn.validate.check($(this), options);
				if(error === true){
					is_valid = false;
				}
				checked = true;
			});
			
			// For radio, checkbox and selects
			var type = $(this).attr("type");
			if (type == "radio" || type == "checkbox"){
				$(this).change(function() {
					var error = $.fn.validate.check($(this), options);
					if(error === true){
						is_valid = false;
					}
					checked = true;
				});
			}
		});
		
		// If it has been checked in one way, and fields are valid then call the success callback.
		if (is_valid === true && checked === true){
			options.success.call(this);
		}
		
		// If it has been checked and some field throws error then call the error callback.
		if (is_valid === false && checked === true){
			options.error.call(this);
		}
		
		if(is_valid === true && options.submit.length > 0){
			$(options.submit).submit();
		}
		
		return this;
	};
		
	/**
	 * Run the rules in the field.
	 * 
 	 * @param object value
 	 * @param object value
	 */
	$.fn.validate.check = function(element, options) {
		
		// If attribute is not defined return false because there is no rules to apply
		if (typeof(element.data('rules')) === "undefined") {
			return false;
		}
		
		// Explode rules			
		var rules = element.data('rules').split('|');
				
		var error = false;
		for (var i = 0; i < rules.length; i++) {
			var rule = rules[i];
			var regex = /(.*?)\[(.*?)\]/;
										
			var func = rule;
			var filter = '';
				
			// Check if arguments are enclosed in brackets			
			var groups = regex.exec(rule);	
			if(groups !== null){
				func = groups[1];
				filter = groups[2];
			}
					
			// If the function exists call it.			
			if (typeof($.fn.validate[func]) !== "undefined") {
				
				var value = element.val();
				
				// Verify the tipe of element. If they're radios or checkboxes look for checkeds
				var type = element.attr("type");
				if (type == "radio" || type == "checkbox"){
					// lenght is obtained ahead in the rules
					value = $('input[name=' + element.attr("name") + ']:checked');
				}
				
				error = $.fn.validate[func](value, filter);
				if(error === true){
					break;
				}
			}
		}
		
		// Apply the correct css to the field.
		if(error === true){
			
			var field_label = $.fn.validate.fieldlabel(element);
			
			// Call the invalid function
			var parts = filter.split('-');
			
			if(func == "matches"){
				parts[0] = $.fn.validate.fieldlabel($(parts[0]));
			}
			
			var msg = validation_lang[func].replace("%s", field_label).replace("%k", parts[0]).replace("%n", parts[1]);
			
			options.invalid.call(this, element, msg);
			$(element).removeClass(options.wrapper + 'valid').addClass(options.wrapper + 'invalid');
		}
		else{
			options.valid.call(this, element);
			$(element).removeClass(options.wrapper + 'invalid').addClass(options.wrapper + 'valid');
		}
		return error;
	};
	
	$.fn.validate.fieldlabel = function(element){
		var field_label = '';
		// If is set the field title use it
		if (typeof(element.attr('title')) !== "undefined") {
			field_label = element.attr('title');
		}
		// If is set the data attribute name use it
		if (typeof(element.data('name')) !== "undefined") {
			field_label = element.data('name');
		}
		
		return field_label;
	};
		
	/**
	 * Checks if the field is filled.
	 * 
 	 * @param string value
	 */
	$.fn.validate.required = function(value) {
		if(value.length === 0){
			return true;
		}
		return false;		
	};
	
	/**
	 * Checks if the field is not zero.
	 * 
 	 * @param string value
	 */
	$.fn.validate.nozero = function(value) {
		if(Number(value) === 0){
			return true;
		}
		return false;		
	};
		
	/**
	 * Checks if the field is x characters long.
	 * 
 	 * @param string value
 	 * @param integer value
	 */
	$.fn.validate.exactlength = function(value, options) {
		if(value.length !== Number(options)){
			return true;
		}
		return false;	
	};
	
	/**
	 * Checks if the field is at least x characters long.
	 * 
 	 * @param string value
 	 * @param integer value
	 */
	$.fn.validate.minlength = function(value, options) {
		if(value.length < Number(options)){
			return true;
		}
		return false;	
	};
	
	/**
	 * Checks if the field is less than x characters long.
 	 * @param string value
 	 * @param integer value
	 */
	$.fn.validate.maxlength = function(value, options) {
		if(value.length > Number(options)){
			return true;
		}
		return false;	
	};
	
	/**
	 * Checks if the field only contains letters.
	 * 
 	 * @param string value
	 */
	$.fn.validate.alpha = function(value) {
		var regex = /^([a-z])+$/i;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the field only contains alpha-numeric characters.
	 * 
 	 * @param string value
	 */
	$.fn.validate.alphanumeric = function(value) {
		var regex = /^([a-z0-9])+$/i;
		return !regex.test(value);
	};
		
	/**
	 * Checks if the field is numeric.
	 * 
 	 * @param string value
	 */
	$.fn.validate.numeric = function(value) {
		var regex = /^[\-+]?[0-9]*\.?[0-9]+$/;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the field is integer.
	 * 
 	 * @param string value
	 */
	$.fn.validate.integer = function(value) {
		var regex = /^[\-+]?[0-9]+$/;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the field is natrual.
	 * 
 	 * @param string value
	 */
	$.fn.validate.natrual = function(value) {
		var regex = /^[0-9]+$/;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the field is decimal.
	 * 
 	 * @param string value
	 */
	$.fn.validate.decimal = function(value) {
		var regex = /^[\-+]?[0-9]+\.[0-9]+$/;
		return !regex.test(value);
	};
		
	/**
	 * Checks if the numeric value is between two values.
	 * 
 	 * @param string value
 	 * @param integer value
	 */
	$.fn.validate.between = function(value, options) {
		var minmax = options.split('-');
		if(value < Number(minmax[0])){
			return true;
		}
		if(value > Number(minmax[1])){
			return true;
		}
		return false;	
	};
	
	/**
	 * Checks if the value matches with the field.
	 * 
 	 * @param string value
 	 * @param string options
	 */
	$.fn.validate.matches = function(value, options) {
		var other = $(options).val();
		if(value !== other){
			return true;
		}
		return false;	
	};
	
	/**
	 * Checks if the value is a valid email.
	 * http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
	 * 
 	 * @param string value
	 */
	$.fn.validate.email = function(value) {
		var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the value is a valid url.
	 * http://stackoverflow.com/questions/1303872/trying-to-validate-url-using-javascript
	 * 
 	 * @param string value
	 */
	$.fn.validate.url = function(value) {
		var regex = /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/;;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the value is a valid ip.
	 * http://stackoverflow.com/questions/106179/regular-expression-to-match-hostname-or-ip-address 
	 *
 	 * @param string value
	 */
	$.fn.validate.ip = function(value) {
		var regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the value is a valid time.
	 * 
 	 * @param string value
	 */
	$.fn.validate.time = function(value) {
		var regex = /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the value is a valid date.
	 * 
 	 * @param string value
	 */
	$.fn.validate.date = function(value) {
		var regex = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the value is a valid credit card number.
	 * 
 	 * @param string value
 	 * @param string options
	 */
	$.fn.validate.cc = function(value, options) {
		var cc = [
			/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/, // Visa
			/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/, // Mastercard
			/^6011-?\d{4}-?\d{4}-?\d{4}$/, // Discover
			/^3[4,7]\d{13}$/, // American Express
			/^3[0,6,8]\d{12}$/ // Diners
		];
		
		// If options is not set check with all regex		
		if(options.length === 0){
			var valid = false;
			for(var i = 0; i < cc.length; i++){
				if(cc[i].test(value)){
					valid = true;
				}
			}
			if(valid === false){
				return true;
			}
		}
		else{
			var regex;
			if(options === "visa"){
				regex = cc[0];
			}
			else if(options === "mastercard"){
				regex = cc[1];
			}
			else if(options === "discover"){
				regex = cc[2];
			}
			else if(options === "amex"){
				regex = cc[3];
			}
			else if(options === "diners"){
				regex = cc[4];
			} 
			
			return !regex.test(value);
		}
		
		// Remove all dashes for the checksum
		value = value.split("-").join("");
		
		// Add even digits in even length strings or odd digits in odd length strings.
		var checksum = 0;
		for (var i=(2-(value.length % 2)); i<=value.length; i+=2) {
			checksum += parseInt(value.charAt(i-1),10);
		}
		// Analyze odd digits in even length strings or even digits in odd length strings.
		for (var i=(value.length % 2) + 1; i<value.length; i+=2) {
			var digit = parseInt(value.charAt(i-1),10) * 2;
			if (digit < 10) { 
				checksum += digit; 
			} 
			else { 
				checksum += (digit-9); 
			}
		}
		return ((checksum % 10) !== 0);
	};
		
})(jQuery, window);