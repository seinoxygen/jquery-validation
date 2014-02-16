(function($) {    
    var plugin = $(this);
    
	$.fn.validate = function(options) {
		
		// Default config
		var defaults = {
			auto: false,
			error: '#EB4847',
			success: '#63C76A'
		};
		
		// Update all configs
		var settings = $.extend(defaults, options);
		
		var error = false;
		
		// Check all fields
		$(this).each(function() {
			
			if(settings.auto === true){
				error = plugin['check']($(this), settings);
			}
			
			$(this).keyup(function(e) {
				e.preventDefault();
				// Ignore enter
				if (e.which == 13) {
					return;
				}
				error = plugin['check']($(this), settings);
			});
		});
		
		// Invert result !error = validation successful
		return !error;
	};
	
	/**
	 * Run the rules in the field.
	 * 
 	 * @param object value
 	 * @param object value
	 */
	plugin.check = function(element, settings) {
		// Explode rules				
		var rules = $(element).data('rules').split('|');
				
		var error = false;
		for (var i = 0; i < rules.length; i++) {
			var rule = rules[i];
			var regex = /(.*?)\[(.*?)\]/;
										
			var func = rule;
			var options = '';
				
			// Check if arguments are enclosed in brackets			
			var groups = regex.exec(rule);	
			if(groups !== null){
				func = groups[1];
				options = groups[2];
			}
					
			// If the function exists call it.			
			if (typeof(plugin[func]) !== "undefined") {
				error = plugin[func]($(element).val(), options);
			}
		}
				
		// Apply the correct css to the field.
		if(error){
			$(element).css('border-color', settings.error);
		}
		else{
			$(element).css('border-color', settings.success);
		}
		return error;
	};
		
	/**
	 * Checks if the field is filled.
	 * 
 	 * @param string value
	 */
	plugin.required = function(value) {
		if(value.length === 0){
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
	plugin.exactlength = function(value, options) {
		if(value.length === options){
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
	plugin.minlength = function(value, options) {
		if(value.length < options){
			return true;
		}
		return false;	
	};
	
	/**
	 * Checks if the field is less than x characters long.
 	 * @param string value
 	 * @param integer value
	 */
	plugin.maxlength = function(value, options) {
		if(value.length > options){
			return true;
		}
		return false;	
	};
	
	/**
	 * Checks if the field only contains alpha characters.
	 * 
 	 * @param string value
	 */
	plugin.alpha = function(value) {
		var regex = /^([a-z])+$/i;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the field only contains alpha-numeric characters.
	 * 
 	 * @param string value
	 */
	plugin.alphanumeric = function(value) {
		var regex = /^([a-z0-9])+$/i;
		return !regex.test(value);
	};
		
	/**
	 * Checks if the field is numeric.
	 * 
 	 * @param string value
	 */
	plugin.numeric = function(value) {
		var regex = /^[\-+]?[0-9]*\.?[0-9]+$/;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the field is integer.
	 * 
 	 * @param string value
	 */
	plugin.integer = function(value) {
		var regex = /^[\-+]?[0-9]+$/;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the field is natrual.
	 * 
 	 * @param string value
	 */
	plugin.natrual = function(value) {
		var regex = /^[0-9]+$/;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the field is decimal.
	 * 
 	 * @param string value
	 */
	plugin.decimal = function(value) {
		var regex = /^[\-+]?[0-9]+\.[0-9]+$/;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the numeric value is between two values.
	 * 
 	 * @param string value
 	 * @param integer value
	 */
	plugin.between = function(value, options) {
		var minmax = options.split('-');
		if(value < minmax[0]){
			return true;
		}
		if(value > minmax[1]){
			return true;
		}
		return false;	
	};
		
}(jQuery));