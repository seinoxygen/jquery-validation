(function($) {   
    var plugin = $(this);
    
	$.fn.validate = function(options) {
		// Update all configs
		 var settings = $.extend({
			error: '#EB4847',
			success: '#63C76A'
		}, options);
		
		// Check all fields
		$(this).each(function() {
			
			// On key up check all rules of the field
			$(this).keyup(function(e) {
				e.preventDefault();
				
				// Explode rules				
				var rules = $(this).data('rules').split('|');
				
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
						error = plugin[func]($(this).val(), options);
					}
				}
				
				// Apply the correct css to the field.
				if(error){
					$(this).css('border-color', settings.error);
				}
				else{
					$(this).css('border-color', settings.success);
				}
			});
		});
				
		return;
	};
	
	/**
	 * Checks if the field is filled.
 	 * @param string value
	 */
	plugin.required = function(value) {
		if(value.length == 0){
			return true;
		}
		return false;		
	};
	
	/**
	 * Checks if the field is x characters long.
 	 * @param string value
 	 * @param integer value
	 */
	plugin.exactlength = function(value, options) {
		if(value.length == options){
			return true;
		}
		return false;	
	};
	
	/**
	 * Checks if the field is at least x characters long.
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
	 * Checks if the field is numeric.
 	 * @param string value
	 */
	plugin.numeric = function(value) {
		var regex = /^[\-+]?[0-9]*\.?[0-9]+$/;
		return !regex.test(value);
	};
	
	/**
	 * Checks if the numeric value is between two values.
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