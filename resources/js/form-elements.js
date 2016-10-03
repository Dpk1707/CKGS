/* Initialisers
-------------------------------*/
forms = $('form, .form');
isIE7 = $('html').hasClass('ie7');
isIE8 = $('html').hasClass('ie8');
touchEnabled = Modernizr.touch;		
formPlaceholders = Modernizr.input.placeholder;
boxShadows = Modernizr.boxshadow;


	//////////////////////
	// initalises forms, standardises cross-device behaviours
	//////////////////////
	function initForms(){
		forms.each(function(){
			var $this = $(this),
				allInputs = $this.find('input'),
				allSelects = $this.find('select'),
				placeholderInputs = $this.find('[placeholder]'),
				checkboxInputs = $this.find('input[type="checkbox"]'),
				radioInputs = $this.find('input[type="radio"]'),
				coupledCheckboxes = $this.find('.coupled-checks');
			
			// apply custom iCheck styles to checkboxes
			checkboxInputs.iCheck({
				'checkboxClass': 	'styled-checkbox',
				'checkedClass': 	'styled-checkbox-checked',
				'insert':			'<div class="check"></div>'
			});

			// apply custom iCheck styles to radios
			radioInputs.iCheck({
				'radioClass':		'styled-radio',
				'checkedClass': 	'styled-radio-checked',
				'insert':			'<div class="check"></div>'
			});
			
			// ensure all forms are reset
			if (this.hasClass = "form"){
			}
			else{
			this.reset();
			}

			 // loop over each input
			 allInputs.each(function(){
				var $this = $(this),
					type = $this.attr('type');
				
				if(!boxShadows){
					$this.addClass(type+'-input');	
				}
			 });

			 // loop over each select to build custom select styles
			 allSelects.each(function(){
				
				// not for IE7
				if(!isIE7){
					var $this = $(this),
						wrap = $('<div />', {
							'class':	'styled-select'
						});
						
					// wrap
					$this.wrap(wrap);
	
					// invoke bootstrap-select plugin
					
					$this.selectpicker({
						'showIcon':	true,
						'dropupAuto':	false,
						'showSubtext' : true,
						'showContent' : true
					});
					
					if (window.PIE) {$('.form-group .styled-select .btn-group .btn').each(function() {PIE.attach(this);});} 	
				}
			 });

			// if no native support for placeholders
			if(!formPlaceholders){
				// loop through each
				placeholderInputs.each(function(){
					var $this = $(this),
						placeholderClass = 'placeholder',
						thisText = $this.val(),
						placeholderText = $this.attr('placeholder');
	
					// initialisation
					if(thisText !== placeholderText){
						//add placeholder classname and set value to placeholder text
						if(!$this.hasClass('password-input')){
						   $this.addClass(placeholderClass).val(placeholderText);
						   
						   }
						else{
						   //alert($this.attr('type'))
						   $this.wrap( "<div></div>" );
						   $this.addClass('real-pass').val('').parent().addClass('ie8-pass-div').append('<input type="text" class="dummy-pass" value="'+placeholderText+'"/>');
						   
						}
					}
					
					//focus
					$this.not(".real-pass, .dummy-pass").focus(function(){
						if($this.val() == $this.attr('placeholder')){
						   if(!$this.hasClass('password-input')){
							$this.removeClass(placeholderClass).val('');
							}	
						}
					});
					
					//blur
					$this.not(".real-pass, .dummy-pass").blur(function(){
						if($this.val() === '' || $this.val() == $this.attr('placeholder')){
						  if(!$this.hasClass('password-input')){
							//add placeholder classname and set value to placeholder text
							$this.addClass(placeholderClass).val(placeholderText);
							}
						}
					})
					.blur();
				});
			}
			
			// coupled checkboxes
			if(coupledCheckboxes.length){
				coupledCheckboxes.each(function(){
					var checkboxes = $(this).find('input[type=checkbox]');
	
					// loop over each checkbox
					checkboxes.each(function(){
						// identify other checkboxes in this set
						var otherChecks = checkboxes.not($(this));
						
						// tie into iCheck 'change' event
						$(this).on('ifChanged', function(){
							// if this is now selected
							if($(this).attr('checked') == 'checked'){
								otherChecks.iCheck('uncheck');
							}
						});
					});
				});
			}
			
		});

	
	}

/**********Custom Date Picker birthdate********/


initForms();


/* Ajax based Forms Initialisers
-------------------------------*/
AjaxForm = $('.ajaxform');

	//////////////////////
	// initalises forms, standardises cross-device behaviours
	//////////////////////
	function initAjaxForms(){
		AjaxForm.each(function(){
			var $this = $(this),
				allInputs = $this.find('input'),
				allSelects = $this.find('select'),
				placeholderInputs = $this.find('[placeholder]'),
				checkboxInputs = $this.find('input[type="checkbox"]'),
				radioInputs = $this.find('input[type="radio"]'),
				coupledCheckboxes = $this.find('.coupled-checks');
			
			// apply custom iCheck styles to checkboxes
			checkboxInputs.iCheck({
				'checkboxClass': 	'styled-checkbox',
				'checkedClass': 	'styled-checkbox-checked',
				'insert':			'<div class="check"></div>'
			});

			// apply custom iCheck styles to radios
			radioInputs.iCheck({
				'radioClass':		'styled-radio',
				'checkedClass': 	'styled-radio-checked',
				'insert':			'<div class="check"></div>'
			});
			
			// ensure all forms are reset
			if (this.hasClass = "form"){
			}
			else{
			this.reset();
			}

			 // loop over each input
			 allInputs.each(function(){
				var $this = $(this),
					type = $this.attr('type');
				
				if(!boxShadows){
					$this.addClass(type+'-input');	
				}
			 });

			 // loop over each select to build custom select styles
			 allSelects.each(function(){
				
				// not for IE7
				if(!isIE7){
					var $this = $(this),
						wrap = $('<div />', {
							'class':	'styled-select'
						});
						
					// wrap
					$this.wrap(wrap);
	
					// invoke bootstrap-select plugin
					
					$this.selectpicker({
						'showIcon':	true,
						'dropupAuto':	false,
						'showSubtext' : true,
						'showContent' : true
					});
					
					if (window.PIE) {$('.form-group .styled-select .btn-group .btn').each(function() {PIE.attach(this);});} 	
				}
			 });

			// if no native support for placeholders
			if(!formPlaceholders){
				// loop through each
				placeholderInputs.each(function(){
					var $this = $(this),
						placeholderClass = 'placeholder',
						thisText = $this.val(),
						placeholderText = $this.attr('placeholder');
	
					if(thisText !== placeholderText){
						if(!$this.hasClass('password-input')){
						   $this.addClass(placeholderClass).val(placeholderText);
						   
						   }
						else{
						   //alert($this.attr('type'))
						   $this.wrap( "<div></div>" );
						   $this.addClass('real-pass').val('').parent().addClass('ie8-pass-div').append('<input type="text" class="dummy-pass" value="'+placeholderText+'"/>');
						   
						}
					}
					
					//focus
					$this.not('.real-pass, .dummy-pass').focus(function(){
						if($this.val() == $this.attr('placeholder')){
						   if(!$this.hasClass('password-input')){
							$this.removeClass(placeholderClass).val('');
							}
						}
					});
					
					//blur
					$this.not('.real-pass, .dummy-pass').blur(function(){
						if($this.val() === '' || $this.val() == $this.attr('placeholder')){
						  if(!$this.hasClass('password-input')){
							//add placeholder classname and set value to placeholder text
							$this.addClass(placeholderClass).val(placeholderText);
							}
						}
					})
					.blur();
				});
			}
			
			// coupled checkboxes
			if(coupledCheckboxes.length){
				coupledCheckboxes.each(function(){
					var checkboxes = $(this).find('input[type=checkbox]');
	
					// loop over each checkbox
					checkboxes.each(function(){
						// identify other checkboxes in this set
						var otherChecks = checkboxes.not($(this));
						
						// tie into iCheck 'change' event
						$(this).on('ifChanged', function(){
							// if this is now selected
							if($(this).attr('checked') == 'checked'){
								otherChecks.iCheck('uncheck');
							}
						});
					});
				});
			}
			
		});

	}


/*** ends ***/	
$(".UIDatepicker").UIDatepicker({
        changeMonth: true,
        changeYear: true,
        showOn: "both",
        dateFormat : "dd MM, yy"
    });

