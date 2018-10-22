jQuery(document).ready(function($){

	 
	//jquery function to style thickbox
		(function( $ ){
			   $.fn.thickBoxCss = function(windowCss,ajaxContentCss) {
				   
				   jQuery(document).find('#TB_ajaxContent').css(ajaxContentCss);
					jQuery(document).find('#TB_window').css(windowCss);
					jQuery('#TB_ajaxWindowTitle').remove();
					jQuery('#TB_title').css({'border':'none', 'margin-top':'0px','width':'0px','height':'0px'});
					jQuery('.tb-close-icon').removeClass('tb-close-icon').addClass("dashicons dashicons-no-alt" );
					
			      return this;
			   }; 
			})( jQuery );
		
		
		//simple function to check if the value of field is null is so set it to empty
		   function checkNull (value) {
				   
				   if(!value){
				  
				     value = "N/A";
					
				     
				   }
			      return value;
				     
			   }; 
	

	
	/*script to hide and show nav tab*/
			   
		
			 
		if(localStorage.getItem("ctcNavTabShowHide") == 'active'){
			
			
			
			jQuery('.ctcAdminPanel h1,.ctcMainNavTab,.ctcHideOnEdit,.ctcAdminPanel h3').addClass('ctcHideShowNavTab');
			
		}	   
			   
			   
	jQuery(document).on('click','.ctcAdminPanel input,.ctcAdminPanel textarea,.ctcAdminPanel table tr th', function(){
		
		
		var inputType =  jQuery(this).attr('type');
		
		
			
		
		
			
			if(inputType !== 'submit' && inputType !== 'checkbox' && !jQuery(':parent',this).is('a')){
			
				
				jQuery('.ctcAdminPanel h1,.ctcMainNavTab,.ctcHideOnEdit,.ctcAdminPanel h3').addClass('ctcHideShowNavTab').slideUp(1100);
				
			
			}
	
		 if(localStorage.getItem("ctcNavTabShowHide") != 'active'){
			 localStorage.setItem("ctcNavTabShowHide", 'active');
		 }
	});
	
	jQuery(document).on('dblclick','.ctcAdminPanel', function(){
		
		
		if(jQuery('.ctcAdminPanel h1,.ctcMainNavTab,.ctcHideOnEdit,.ctcAdminPanel h3').hasClass('ctcHideShowNavTab')){
			
			jQuery('h4.ctcHideOnEdit').show();
			jQuery('.ctcAdminPanel h1,.ctcMainNavTab,.ctcHideOnEdit,.ctcAdminPanel h3').removeClass('ctcHideShowNavTab').addClass('ctcShowHideAgain').slideDown(900);
			
		}
		
	});
	
	jQuery(document).on('mouseenter', '#toplevel_page_ctCommerceAdminPanel', function(){
		
		if(jQuery('.ctcAdminPanel h1,.ctcMainNavTab,.ctcHideOnEdit,.ctcAdminPanel h3').hasClass('ctcHideShowNavTab')){
			
			jQuery('h4.ctcHideOnEdit').show();
			jQuery('.ctcAdminPanel h1,.ctcMainNavTab,.ctcHideOnEdit,.ctcAdminPanel h3').removeClass('ctcHideShowNavTab').addClass('ctcShowHideAgain').slideDown(900);
			
		}
		
		else{
			
			if(jQuery('.ctcAdminPanel h1,.ctcMainNavTab,.ctcHideOnEdit,.ctcAdminPanel h3').hasClass('ctcShowHideAgain')){
				
				
				jQuery('.ctcAdminPanel h1,.ctcMainNavTab,.ctcHideOnEdit,.ctcAdminPanel h3').removeClass('ctcShowHideAgain').addClass('ctcHideShowNavTab').slideUp(900);
				
			};
		}
		
		
	});


	 /*Section to handle jquery functionalities for Terms and condition part of plugin */
			   
			   
			   
		
	 //this sections loads info of terms and condition on modal box
jQuery(window).load(function() {
	   
		jQuery("#ctcTermConditionsModalLink").trigger('click');
		jQuery(document).find('#TB_ajaxContent').css({'width': '770px','height': '666px'});
		jQuery(document).find('#TB_window').css({'width':'800px','height':'660px','margin-top':'-330px', 
												'margin-left':'-380px','border-radius':'10px','opacity':'0.9'});

	 });
	
	 //this section handles basic styling of Terms and conditions box 
	 jQuery("div.ctcConditionReading").css({'height':'520px','width':'730px','overflow':'scroll !important'});
	
	//if admin read whole term and condition activate check box
	 jQuery("div.ctcConditionReading").bind('scroll',function() {
		  
		 if (jQuery(this).scrollTop() + jQuery(this).innerHeight() >= jQuery(this)[0].scrollHeight-100) {
	             jQuery("input.ctcConditionsAgreeCheckbox").removeAttr('disabled');
	             jQuery("div.ctcConditionsForm p").fadeOut( "slow");
	        }
		 
		});
	 
	 
	 
	 //this section enables submit button once admin agrees to term and condition
	 jQuery( document).on( "click","#ctcConditionsAgreeCheckbox" , function(){
		 if (jQuery(this).is(':checked')){
		 jQuery('#ctcConditionsAgreeButton').removeAttr("disabled");
		 jQuery('#ctcConditionsDisgreeButton').attr( "disabled", "disabled" );
	  }
		 else{
			 jQuery('#ctcConditionsAgreeButton').attr( "disabled", "disabled" );
			 jQuery('#ctcConditionsDisgreeButton').removeAttr("disabled");
		 }
		
	   
	 });
	 

	
	 
	 /*
	 //this section will handle masonary ficntionality with masonary jquery plugin
	 jQuery('.ctcBasicInfoContent').masonry({
		 resize: true
		});
	 */
	 jQuery(document).find('#TB_window').masonry({resize: true});
	 
	
	 
	 //copy business name as e-commerce name
	 jQuery(document).on('click','#ctcSameAsBusinessName', function(){
		 
		 var businessName = jQuery("[name*='ctcBusinessName']").val();
		 var oldEcommerceName = jQuery("[name*='ctcOldEcommerceName']").val();

		 if(jQuery(this).is(':checked')){
			 
			 jQuery("[name*='ctcEcommerceName']").removeData().attr("value",businessName);
			 
		 }
		 else{
			 jQuery("[name*='ctcEcommerceName']").val(oldEcommerceName);
			 
		 }
		 
		 
	 });
	 
	  /**
	   * This section will included requred code to process ajax request
	   * 
	   * 
	   */
	
	 //this section will handle deactivation of the plugin if user disagrees with terms and condition
		jQuery(document).on('click','#ctcConditionsDisgreeButton', function(){
			
			

			var data = {
					'action': 'ctcDeactivatePlugin',
					'deactivatePlugin': 'deactivate'   
				};

				
				jQuery.post(ajaxurl, data, function(response) {
				
					if(response.match(/plugins.php/).length == 1){
						
						 alert("Plugin has been deactivated, you may remove the plugin!");
						 top.location.replace(response);
					}	
					
				}).fail(function() {

			        alert( "Action could not be completed at this time \nPlease try again later");
			  
			    });
	
			
		});
	 
		
	 //this section will make ajax request to create business page
		jQuery(document).on('click','#ctcBusinessSettingsButton', function(){
		
			
			var oldEcommerceName = jQuery("[name*='ctcOldEcommerceName']").val();
			var eCommerceName = jQuery("[name*='ctcEcommerceName']").val();
		if(eCommerceName != ''){
			
			var data = {
					'action': 'ctcCreateBusinessPage',
				    'eCommerceTitle': eCommerceName,
				    'oldEcommerceTitle':oldEcommerceName
				};
				
			
				
				jQuery.post(ajaxurl, data, function(response) {
					
				}).fail(function() {

			        alert( "Action could not be completed at this time \nPlease try again later");
			  
			    });
				
		   }
		else{
			 //alert("Name for Ecommerce field cannot be empty.");
			 jQuery("[name*='ctcEcommerceName']").css('border','2px solid red').attr("placeholder","eCommerce name  cannot be empty.");
			 
		      return false;
		}
			
		});
		
		
	 
  //this section will carry out ajax to register product category
	jQuery(document).on('submit', '#ctcAddProductCategoryForm',function(event){
		
	
		var categoryData =[];
		
		//if required field category name is empty
		if(!jQuery("[name*='categoryName']").val()){
			
			jQuery("[name*='categoryName']").css('border','2px solid red').attr("placeholder","Category name cannot be empty.");
			
			
			//scroll to the empty element
			 jQuery([document.documentElement, document.body]).animate({
			        scrollTop: $("[name*='categoryName']").offset().top
			    }, 500);
		}
		else{	
			
			jQuery("[name*='categoryName']").removeAttr("placeholder style");
			var categoryData = jQuery('#ctcAddProductCategoryForm').serializeArray();

			var data = {
					'action': 'ctcAddProductCategory',
				    'categoryInfo': JSON.stringify(categoryData)

				    
				};
				
			
			 
				// make ajax call
				jQuery.post(ajaxurl, data, function(response) {
					
					
					
					if(response == 1){
						
						alert("Product category sucessfully added.");
						document.getElementById("ctcAddProductCategoryForm").reset();
						
						
					}
					else{
						
						alert("There was some issue with adding the category,Maybe category already exists.");
					}
					
				}).fail(function() {

			        alert( "Action could not be completed at this time \nPlease try again later");
			  
			    });
		
		}
		event.preventDefault();
		return false;
		
       
	});
	
	
	
	
	//this section provides admin form to update category
	jQuery(document).on('click','#ctcUpdateProductCategory', function(){
		
		
		
		
		var data = {
				'action': 'ctcGetCategoryUpdateForm',
			    'categoryId': jQuery(this).attr('data-type-id')

			    
			};
		
		jQuery.post(ajaxurl, data, function(response) {
		
			//style rules for thickbox
			var thickBoxStyle = {'height':'450px', 'width':'490px','margin-top':'-250px','overflow':'hidden',
								'padding-left':'30px','border-radius': '100px 10px ','opacity':'0.9', 'max-width':'90%',
								'max-height':'90%'};
			var contentStyle = {'width': '450px','height': '390px', 'overflow':'hidden',   'margin-top': '25px','max-width':'95%','max-height':'95%'};
			
			//put server response inside hidden div for thickbox
			jQuery('#ctcUpdateCategoryContent').empty().prepend(response);
			
			//style thickbox with custom function
			jQuery("#ctcUpdateCategoryFormModalTrigger").trigger('click').thickBoxCss(thickBoxStyle,contentStyle);
			
			
		
		}).fail(function() {

	        alert( "Action could not be completed at this time \nPlease try again later");
	  
	    });
		
		
	});
	
	
	//this part updates category with ajax
	jQuery(document).on('submit','#ctcUpdateCategoryForm', function(event){
		
		
var categoryData =[];
		
		//if required field category name is empty
		if(!jQuery("[name*='categoryName']").val()){
			
			jQuery("[name*='categoryName']").css('border','2px solid red').attr("placeholder","Category name cannot be empty.");
			
			//scroll to the element
			 jQuery([document.documentElement, document.body]).animate({
			        scrollTop: $("[name*='categoryName']").offset().top
			    }, 2000);
		}
		else{		
	
			var categoryData = jQuery('#ctcUpdateCategoryForm').serializeArray();
			
			
				var data = {
						'action': 'ctcUpdateProductCategory',
					    'categoryInfo': JSON.stringify(categoryData)
		
					};
				
			   //trigger ajax to update category
				jQuery.post(ajaxurl, data, function(response) {
					
					if(response == 1){
						
						alert("Product category sucessfully updated.");
		
						for(var i in categoryData){
							
							
							 var categoryId = jQuery('#ctcProductCategoryId').val();
							 var tdSelector = categoryId+'-'+categoryData[i]['name'];
							
							jQuery('.'+tdSelector).empty().append(categoryData[i]['value']);
						
						}

						
						//trigger thickbox close botton click
						jQuery('#TB_closeWindowButton').trigger('click');
						
					}
					else{
						
						alert("There was some issue with update. Did you make any changes?.");
					}
					
				}).fail(function() {

			        alert( "Action could not be completed at this time \nPlease try again later");
			  
			    });
		}	
			
			event.preventDefault();
			return false;
			
		
	});
	
	
			//this section deals with deletion of the category with ajax
			
				jQuery(document).on('click', '#ctcDeleteCategoryButton',function(){
				
					var categoryId = jQuery('#ctcProductCategoryId').val();
					var deleteConfirm = confirm ('Are you sure you want to delete this category? ');
					
					//alert(deleteConfirm);
					   if(deleteConfirm == true){
							var data = {
									'action': 'ctcDeleteProductCategory',
								    'categoryId': categoryId
					
								};
							
							
							 //trigger ajax to delete category
							 jQuery.post(ajaxurl, data, function(response) {
								
								if(response == 1){
									
									
									jQuery('#TB_closeWindowButton').trigger('click');
									
									alert('Category sucessfully deleted');
						
									jQuery('.'+categoryId+'-categoryName').closest("tr").remove();
									
									
								}
								else{
									
									alert("For some reason category couldn't be deleted");
								}
								
								
							}).fail(function() {

						        alert( "Action could not be completed at this time \nPlease try again later");
						  
						    });
							 
				     };	 
					 
					 return false;
				
			});
	
	
	  //this section gets the list of category to add product with ajax
	   jQuery(document).on('change', '#ctcProductCategorySelect',function(){
		
		   
		   var id = jQuery("#ctcProductCategorySelect option:selected" ).attr('data-type-id');
		   
		   if(!id){
			   
			   jQuery('#ctcProductSubCategory1, #ctcProductSubCategory2, #ctcProductSubCategory3, #ctcProductSubCategory3, #ctcProductInventory, #ctcAvilableProducts').each(function(){
				   

				   
				   if(jQuery(this).is('select')){
					   
					   jQuery(this).empty();
				   }
				   else{
					   
					   jQuery(this).val('');
				   }		   
				   
				   
				   
			   });
			   
			   return false;
			   
		   }
		   
		   else{  
	      
	      
			      var data = {
			    		  
			    		  		'action':'ctcGetSubCategoriesList',
			    		  		'categoryId' : id
			    		  
			    		  
			    		  
			      			};
	         
	      
			      jQuery.post(ajaxurl, data, function(response){
			    	  
			   
			    	   responseObj = JSON.parse(response);
			    	  
			    	  for( var key in responseObj){
			    		  
			    		  jQuery('#ctcProductInventory, #ctcAvilableProducts').val('');
			    		 jQuery("[name*='"+key+"']").empty().append(responseObj[key]);
			    		 //jQuery('#ctcAvilableProducts').attr('readonly','readonly')
			    		  
			    	  }
		
			      }).fail(function() {

				        alert( "Action could not be completed at this time \nPlease try again later");
				  
				    });
			      
		   }
		   
	   });
	   
	 
	   
	   
	
	   /**
	    * 
	    * 
	    * 
	    * this section deals with frontend validation of add product form 
	    * 
	    * 
	    * 
	    * 
	    * 
	    */
	   
	   
		   
		   
	  
	   //validate the input field for add product form
	   jQuery(document).on('click',"#ctcAddAvilableProduct",function(){
		   
		   if(!jQuery('#ctcProductName').val()){
			   
			   jQuery('#ctcProductName').attr('placeholder','Product name cannot be empty').css({'border':'2px solid red'});
			   
			   return false;   
		   }
		   else{
			   jQuery('#ctcProductName').removeAttr('style');
			   
		   }
		   var productInventory = jQuery('#ctcProductInventory').val();
		   //get the value of selected option 
		   var mainCat = jQuery("#ctcProductCategorySelect").val();
		  
		   
		   //if the main category is not selected
		   if(!mainCat){
			   jQuery("#ctcProductCategorySelect").css('border','2px solid red');
			   alert("Please select valid category for product");
			   return false;
		   }
		   else{
			   jQuery("#ctcProductCategorySelect").removeAttr('style');
			  
		   } 
		   
		   
		   var subCat1 = jQuery("#ctcProductSubCategory1").val();
		   var subCat2 = jQuery("#ctcProductSubCategory2").val();
		   var subCat3 = jQuery("#ctcProductSubCategory3").val();
		   
		   
		   
		   var product = checkNull(subCat1)+'-'+checkNull(subCat2)+'-'+checkNull(subCat3);
		
		 
				  var setVal = jQuery('#ctcAvilableProducts').val();
				  
				  if(productInventory !=''){
					  
					  //remove required field styling
					  jQuery('#ctcProductInventory').removeAttr('style');
					  
						  if(setVal != ''){
					
							 
							 if(setVal.search(product) == -1){
								
								 
							     var avilableProduct = setVal+',\n'+product+'~'+productInventory;
							   
							   }
							  else{
					
								  
											  var replaceConfirm = confirm("Do you want to replace this item ? ")
												
												if(!replaceConfirm ){
													
													return false;
													
												}
											   
											  var newVal = setVal.split(',');
												
												
											   for(var i in newVal){
						
												  if(newVal[i].search(product) >=0){
													  
													 delete newVal[i];
													 
													 if(i != 0){
													    newVal[i] = '\n'+product+'~'+productInventory;
												     }
													 else{
														 
														 newVal[i] = product+'~'+productInventory;
													 }
													 
											
												  }
												  
												
												   
											   }
									
											   var newProductSet = newVal.join(',');
											   
											   jQuery('#ctcAvilableProducts').empty().val(newProductSet);
						  
							  } 
						  }
						  else{
							  var avilableProduct = product+'~'+jQuery('#ctcProductInventory').val();
						  }
				       jQuery("#ctcAvilableProducts").attr('value',avilableProduct);
	   				}
				  else{
					  jQuery('#ctcProductInventory').attr('placeholder','Required, enter number').css('border','2px solid red');
					  alert("Please enter number of this particular products you have in your inventory. \nSet it to any number you feel comfortable with ");
				  } 
		   //jQuery('#ctcProductInventory').val('');
	   });
	   
	   
	   
	   //this section deals with activation ctcavilableProducts textarea also used with update product form
	   jQuery(document).on('click keyup','#ctcAvilableProducts' , function(){
		   
				  
					alert('Use this feature only if you understand the format like avoid comma after end of last item, else it might mess up the way  product is diplayed in frontend!\n\n Use + icon and selection boxes instead ');
					   
					    	
					 
	   });
	   
	   
	  
	 // this section deals with add images to the product of primary product image

	   jQuery(document).on('click','#ctcPrimaryImageLibrary', function(){
		   var thumb ='';
			var id ='';
			// Accepts an optional object hash to override default values.
			var frame = new wp.media.view.MediaFrame.Select({
				// Modal title
				title: 'Select Primary Product Image',

				// Enable/disable multiple select
				multiple: true,

				// Library WordPress query arguments.
				library: {
					order: 'ASC',

					// [ 'name', 'author', 'date', 'title', 'modified', 'uploadedTo',
					// 'id', 'post__in', 'menuOrder' ]
					orderby: 'title',

					// mime type. e.g. 'image', 'image/jpeg'
					type: 'image',
					//filterable      : 'all',
					// Searches the attachment title.
					search: null,

					// Attached to a specific post (ID).
					uploadedTo: null,
					
					priority:   20,
                    toolbar:    'main-insert',
				},

				button: {
					text: 'Select Image'
				}
			});
		
			// Fires when the modal closes.
			// @see media.view.Modal.close()
			frame.on( 'close', function() {} );

			// Fires when a user has selected attachment(s) and clicked the select button.
			// @see media.view.MediaFrame.Post.mainInsertToolbar()
			frame.on( 'select', function() {
				var selectionCollection = frame.state().get('selection');
				
				var file = selectionCollection.map( function( attachment ) {
					  attachment = attachment.toJSON();
	
					   thumb = attachment.sizes.thumbnail.url;
					  id =  attachment.id;
					  
					  return false;
					}).join();
				
				 jQuery('.ctcPrimaryPicThumb img').css('display','block').attr('src',thumb);
					
			     jQuery('#ctcPrimaryProductImage ').val(id);

			} );
		
			// Open the modal.
			frame.open();

			  	
		return false ;
	   });
	   
 
	//add additional images related to product
	   
	   jQuery(document).on('click','#ctcAdditionalImageLibrary' , function(){
		   var imagesId = [];
		   var imagesThumb =[];
		   
		   
			// Accepts an optional object hash to override default values.
			var frame = new wp.media.view.MediaFrame.Select({
				// Modal title
				title: 'Select Additional  Product Images',

				// Enable/disable multiple select
				multiple: 'add',

				// Library WordPress query arguments.
				library: {
					order: 'ASC',

					// [ 'name', 'author', 'date', 'title', 'modified', 'uploadedTo',
					// 'id', 'post__in', 'menuOrder' ]
					orderby: 'title',

					// mime type. e.g. 'image', 'image/jpeg'
					type: 'image',
					//filterable      : 'all',
					// Searches the attachment title.
					search: null,

					// Attached to a specific post (ID).
					uploadedTo: null,
					
					priority:   20,
                   toolbar:    'main-insert',
				},

				button: {
					text: 'Select Images'
				},
				
				
				 toolbar: {
                     'main-insert':      'mainInsertToolbar'
                 }
			});
		   
			
			frame.on( 'select', function() {
				
				var i =0;
				var selectionCollection = frame.state().get('selection');
				
				var file = selectionCollection.map( function( attachment ) {
					  attachment = attachment.toJSON();
					  

					  
					 imagesId[i] = attachment.id;
					 imagesThumb[i] = attachment.sizes.thumbnail.url;;
					  
					 i++;
					  
					  //return false;
					}).join();
				
				jQuery('#ctcAddtionalProductImages').val(imagesId.join(','));
				 
				var productCollage = '';
				
				
				
				var imgNum = imagesThumb.length;
				
				
			if(imgNum < 20){	
						if(imgNum > 3){
								if (imgNum < 6){
									var imgWidth = 180/(imgNum);
									var imgHeight = 80/(imgNum/2);
								}
								else{
									
									var imgWidth = 320/(imgNum);
									var imgHeight = 150/(imgNum/2);
								}
							}
						else{
								if(imgNum != 1){
									var imgWidth = 60/(imgNum/2);
									var imgHeight = 50/(imgNum/2);
								}
								else{
									var imgWidth = 50;
									var imgHeight = 50;
								}
						     }
			      }	
				else{
					
					var imgHeight=35;
                    var imgWidth=35;
					
				}	
			
				for(var i in imagesThumb){
					 
					 productCollage += '<div class="ctcImgAlbum"><img   style="width:'+imgWidth+'px;  height:'+imgHeight+'px;" class="gridImg"  src="'+imagesThumb[i]+'" /></div>';  

				 }
				//jQuery('.ctcImgAlbum').remove();
				if (typeof masonry == 'function') { 
					jQuery('.ctcAdditionaImages').masonry('destroy');
					}
				
				jQuery('.ctcAdditionaImages').empty().show().prepend(productCollage);
				
				
				
				
				
			
				//apply masonry function
				var container = jQuery('.ctcAdditionaImages');

				container.imagesLoaded( function(){
				  container.masonry({
				    	  columnWidth: imgWidth,
				    	 
				  });
	
				});

			
			});
			// Open the modal.
			frame.open();
			
			
			
		  
		   return false;
	   });
	   
	   
	   
	   
	   //this section deals with adding product video
	   jQuery(document).on('click', '#ctcAddVideoLibrary', function(){

		// Accepts an optional object hash to override default values.
			var frame = new wp.media.view.MediaFrame.Select({
				
				// Modal title
				title: 'Select Additional  Product Images',
				// Enable/disable multiple select
				multiple: false,

				// Library WordPress query arguments.
				library: {
					order: 'ASC',

					// [ 'name', 'author', 'date', 'title', 'modified', 'uploadedTo',
					// 'id', 'post__in', 'menuOrder' ]
					orderby: 'title',

					// mime type. e.g. 'image', 'image/jpeg'
					type: 'video',

					// Searches the attachment title.
					search: null,

					// Attached to a specific post (ID).
					uploadedTo: null
				}
			});

			
			
			frame.on( 'select', function() {
				var selectionCollection = frame.state().get('selection');
				
				var file = selectionCollection.map( function( attachment ) {
					  attachment = attachment.toJSON();
			
					   videoUrl = attachment.url;
					   videoId =  attachment.id;
					   
					   videoMime = attachment.mime;
					   
					   jQuery('#ctcVideoThumb').remove();
					   var video = jQuery('<video />', {
					        id: 'ctcVideoThumb',
					        src: videoUrl,
					        type: videoMime,
					        //controls: true
					    });
					   video.appendTo(jQuery('#ctcAddVideoLibrary').parent());				   
					  jQuery('#ctcProductVideo ').val(videoId);
					 
					  return false;
					}).join();
			} );

			
			
			// Fires when the modal closes.
			// @see media.view.Modal.close()
			frame.on( 'close', function() {} );

			
			// Open the modal.
			frame.open();
			
			 return false;
	   });
	   
	  
	  


 //do stuffs with embded video like show control on click 
 jQuery(document).on('click','#ctcVideoThumb,#ctcVideoThumbOtherInfo,#ctcVideoThumbUpdate', function(){
	   
	  jQuery(this).attr('controls','controls');
	  this.play ? this.play() : this.pause();
	  
 });
 
 jQuery(document).on('mouseout','#ctcVideoThumb, #ctcVideoThumbOtherInfo,#ctcVideoThumbUpdate', function(){
 jQuery(this).removeAttr('controls','controls');

 });
 
 
 
 

 
 //this part handles ajax add porduct button click
 jQuery(document).on('submit','#ctcAddProductForm',function(event){

	var emptyField =[];
	 var i =0;
	jQuery('.ctcRequiredField').each(function(){
		//alert(jQuery(this).attr('id'));
		
		
		var fieldVal = jQuery(this).val() ;
		

		
		if(!jQuery.trim(fieldVal)){
		
			
			emptyField[i] = jQuery(this).val();
			
			jQuery(this).parent('div').find('span.ctcRequiredFieldWarning').remove();
			jQuery(this).css('border','2px solid red').parent('div').prepend('<span  style="margin-bottom:5px;color:red; font-weight:200;" class="dashicons dashicons-warning ctcRequiredFieldWarning">Required field</span>');
			
			i++;
		}
		else{
			 jQuery(this).removeAttr('style').parent('div').find('span.ctcRequiredFieldWarning').remove();
		}

		
	});
	

	
	if(emptyField.length >= 1){

			return false;
	
   }

		  var formData = jQuery('#ctcAddProductForm').serializeArray();
		  
		
		   
		  var  data ={
				   
				   'action': 'ctcAddProduct',
				   'productData': JSON.stringify(formData)
				   
		   }
		  
		
		   
		  //trigger ajax to add product
			jQuery.post(ajaxurl, data, function(response) {
			
				
				
				  if(response >= 1){
					  alert('Product sucessfully added.');
					  document.getElementById("ctcAddProductForm").reset();
					  jQuery('.ctcAdditionaImages').empty().hide();
					  jQuery('#ctcVideoThumb').remove();
					  jQuery('.ctcPrimaryPicThumb img').hide().attr('src','');
				  }
				  else{
					  
					  alert('Product could not be added, Probably it already exists, try updating it');

				  }	  
				
			}).fail(function() {

		        alert( "Action could not be completed at this time \nPlease try again later");
		  
		    });

		  event.preventDefault();
		  return false;
 });
 
 


//function to load products other info inside thickbox
 
 jQuery(document).on('click','#ctctPoductOtherInfo', function(){
	 
	//style rules for thickbox
		var thickBoxStyle = {'height':'570px', 'width':'630px','margin-top':'-300px','overflow':'hidden',
							'padding-left':'10px','border-radius': '100px 10px ','opacity':'0.9', 'max-width':'90%',
							'max-height':'90%','padding-right':'8px', 'padding-bottom':'10px'};
		var ajaxContentStyle = {'height': '550px','width': '600px','max-width':'98%','max-height':'90%','margin-top':'30px','margin-bottom':'5px',
								'margin-left':'auto','margin-right':'auto','display':'block'};
	 
		var id = jQuery(this).attr('data-type-id');
		
	
	 
	 jQuery('#ctcOtherInfoTrigger'+id).trigger('click').thickBoxCss(thickBoxStyle,ajaxContentStyle);
	
	 
 });
 
 
	 //this section deal with product list tab update button
	 jQuery(document).on('click', '#ctcUpdateProduct', function(){
		 
		 var thickBoxStyle = {'height':'570px', 'width':'570px','margin-top':'-300px','overflow':'hidden',
					'padding-left':'30px','border-radius': '100px 10px ','opacity':'0.9', 'max-width':'90%',
					'max-height':'90%', 'padding-bottom':'50px'};
		 var ajaxContentStyle = {'height': '550px','width': '530px','max-width':'100%','max-height':'100%','margin-top':'30px','margin-bottom':'80px'};
		
		 
					 var data= {
							 
								 'action':'ctcGetProductUpdateForm',
								 'id'    : jQuery(this).attr('data-type-id') 
							 
					           }
					 
					 jQuery.post(ajaxurl, data, function(response){
						 
						
						 
						 jQuery('#ctcProductUpdateForm').empty().prepend(response);
						 jQuery('#ctcProductUpdateModalTrigger').trigger('click').thickBoxCss(thickBoxStyle,ajaxContentStyle);
						 
			
	
							//jQuery('.ctcAdditionaImages').addClass('masonry');
							var container = jQuery('.ctcAdditionaImagesUpdate');
	
							  container.imagesLoaded( function(){
							  container.masonry({
							    
							     });
						 
							  });
						 
		
						 
					 }).fail(function() {

					        alert( "Action could not be completed at this time \nPlease try again later");
					  
					    });
					 
	   });
 


	 /*script to remove sinngle product variation from avilable product text area on add product and update product form */ 
	 jQuery(document).on('click','#ctcRemoveAvilableProduct,#ctcRemoveAvilableProductUpdateForm',function(){
	 	
		 if(!jQuery('#ctcProductName').val()){
			   
			   jQuery('#ctcProductName').attr('placeholder','Product name cannot be empty').css({'border':'2px solid red'});
			   
			   return false;   
		   }
		   else{
			   jQuery('#ctcProductName').removeAttr('style');
			    
		   }
		  // var productInventory = jQuery('#ctcProductInventory').val();
		   
		   //get the value of selected option 
		   var mainCat = jQuery("#ctcProductCategorySelect").val();
		  
		   
		   //if the main category is not selected
		   if(!mainCat){
			   jQuery("#ctcProductCategorySelect").css('border','2px solid red');
			   alert("Please select valid category for product");
			   return false;
		   }
		   else{
			   jQuery("#ctcProductCategorySelect").removeAttr('style');
			  
		   } 
		   
		   
		   var subCat1 = jQuery("#ctcProductSubCategory1").val();
		   var subCat2 = jQuery("#ctcProductSubCategory2").val();
		   var subCat3 = jQuery("#ctcProductSubCategory3").val();

		   var product = checkNull(subCat1)+'-'+checkNull(subCat2)+'-'+checkNull(subCat3);
		
		   jQuery('#ctcProductInventory').removeAttr('style placeholder');
		  
				 var setVal = jQuery('#ctcAvilableProducts').val();
				
				if(setVal.trim() ==''){
					
					alert("You do not any variation added for this product.");
				}
				else{
				
					       
							if(setVal.search(product) >= 0){
								
								var replaceConfirm = confirm("Do you want to remove this product variation?")
								
								if(!replaceConfirm ){
									
									return false;
									
								}
								else{
							
								var newVal = setVal.split(',');
							
								
								   for(var i in newVal){
			
									  if(newVal[i].search(product) >=0){
										  
										 delete newVal[i];
									  }
						  
								   }
								   
								   
								   var newProductSet = newVal.filter(function(x){
										   							return(x !==(undefined||null||''));}).join(',');
								   
								   jQuery('#ctcAvilableProducts').empty().val(newProductSet.trim());
						 
							}
							
						}
					else{
								  
								  alert("Such product combination does not exist");
						}	
				}
	 	
	 	
	 	
	 });
	 
	 
 
/****
 * 
 * 
 * 
 * This section deals with validation of product update form
 * 
 * 
 * 
 * 
 * 
 * 
 */
	   
	   
		   
		   
	  
	   //validate the input field for add product form
	   jQuery(document).on('click',"#ctcAddAvilableProductUpdateForm",function(){
		   
		   if(!jQuery('#ctcProductName').val()){
			   
			   jQuery('#ctcProductName').attr('placeholder','Product name cannot be empty').css({'border':'2px solid red'});
			   
			   return false;   
		   }
		   else{
			   jQuery('#ctcProductName').removeAttr('style');
			   
		   }
		   var productInventory = jQuery('#ctcProductInventory').val();
		   
		   //get the value of selected option 
		   var mainCat = jQuery("#ctcProductCategorySelect").val();
		  
		   
		   //if the main category is not selected
		   if(!mainCat){
			   jQuery("#ctcProductCategorySelect").css('border','2px solid red');
			   alert("Please select valid category for product");
			   return false;
		   }
		   else{
			   jQuery("#ctcProductCategorySelect").removeAttr('style');
			  
		   } 
		   
		   
		   var subCat1 = jQuery("#ctcProductSubCategory1").val();
		   var subCat2 = jQuery("#ctcProductSubCategory2").val();
		   var subCat3 = jQuery("#ctcProductSubCategory3").val();

		   var product = checkNull(subCat1)+'-'+checkNull(subCat2)+'-'+checkNull(subCat3);
		
		   		//filter to check if number of product entered 
				if(productInventory ==''){
					
					jQuery('#ctcProductInventory').attr('placeholder','Required, enter number').css({'border':'2px solid red'});
					
					return false
				}
		   
		  
				 var setVal = jQuery('#ctcAvilableProducts').val();
				
				if(setVal.trim() ==''){
					
					jQuery('#ctcAvilableProducts').val(product+'~'+productInventory);
					
					
				}
				else{
				
					       
							if(setVal.search(product) >= 0){
								
								var replaceConfirm = confirm("Do you want to replace this item in database? ")
								
								if(!replaceConfirm ){
									
									return false;
									
								}
							
								var newVal = setVal.split(',');
							
								
								   for(var i in newVal){
			
									  if(newVal[i].search(product) >=0){
										  
										 delete newVal[i];
										 
										 if(i != 0){
										    newVal[i] = '\n'+product+'~'+productInventory;
									     }
										 else{
											 
											 newVal[i] = product+'~'+productInventory;
										 }
										 
								
									  }
									  
									
									   
								   }
						
								   var newProductSet = newVal.join(',');
								   
								   jQuery('#ctcAvilableProducts').empty().val(newProductSet);
							}
							else{
								
								var setOfProducts = setVal.trim().concat(',\n'+product+'~'+productInventory);
								
								jQuery('#ctcAvilableProducts').empty().val(setOfProducts);
					
							}
							
				}
								
 
	   });
 
 
 
 
	   // this section deals with add images to the product of primary product image

	   jQuery(document).on('click','#ctcPrimaryImageLibraryUpdate', function(){
		   var thumb ='';
			var id ='';
			// Accepts an optional object hash to override default values.
			var frame = new wp.media.view.MediaFrame.Select({
				// Modal title
				title: 'Update Primary Product Image',

				// Enable/disable multiple select
				multiple: true,

				// Library WordPress query arguments.
				library: {
					order: 'ASC',

					// [ 'name', 'author', 'date', 'title', 'modified', 'uploadedTo',
					// 'id', 'post__in', 'menuOrder' ]
					orderby: 'title',

					// mime type. e.g. 'image', 'image/jpeg'
					type: 'image',
					//filterable      : 'all',
					// Searches the attachment title.
					search: null,

					// Attached to a specific post (ID).
					uploadedTo: null,
					
					priority:   20,
                    toolbar:    'main-insert',
				},

				button: {
					text: 'Select Image'
				}
			});
		
			// Fires when the modal closes.
			// @see media.view.Modal.close()
			frame.on( 'close', function() {} );

			// Fires when a user has selected attachment(s) and clicked the select button.
			// @see media.view.MediaFrame.Post.mainInsertToolbar()
			frame.on( 'select', function() {
				var selectionCollection = frame.state().get('selection');
				
				var file = selectionCollection.map( function( attachment ) {
					  attachment = attachment.toJSON();
	
					   thumb = attachment.sizes.thumbnail.url;
					  id =  attachment.id;
					  
					  return false;
					}).join();
				
				 jQuery('.ctcPrimaryPicThumbUpdate').empty().append('<img src="'+thumb+'" style="display:block;"/>');
					
			     jQuery('#ctcPrimaryProductImageUpdate').val(id);

			} );
		
			// Open the modal.
			frame.open();

			  	
		return false ;
	   });	 
	 
	 
	 
	 
	 
	 
	 
//update additional images related to product
	   
	   jQuery(document).on('click','#ctcAdditionalImageLibraryUpdate' , function(){
		   var imagesId = [];
		   var imagesThumb =[];
		   
		   
			// Accepts an optional object hash to override default values.
			var frame = new wp.media.view.MediaFrame.Select({
				// Modal title
				title: 'Update Additional  Product Images',

				// Enable/disable multiple select
				multiple: 'add',

				// Library WordPress query arguments.
				library: {
					order: 'ASC',

					// [ 'name', 'author', 'date', 'title', 'modified', 'uploadedTo',
					// 'id', 'post__in', 'menuOrder' ]
					orderby: 'title',

					// mime type. e.g. 'image', 'image/jpeg'
					type: 'image',
					//filterable      : 'all',
					// Searches the attachment title.
					search: null,

					// Attached to a specific post (ID).
					uploadedTo: null,
					
					priority:   20,
                   toolbar:    'main-insert',
				},

				button: {
					text: 'Select Images'
				},
				
				
				 toolbar: {
                     'main-insert':      'mainInsertToolbar'
                 }
			});
		   
			
			frame.on( 'select', function() {
				
				var i =0;
				var selectionCollection = frame.state().get('selection');
				
				var file = selectionCollection.map( function( attachment ) {
					  attachment = attachment.toJSON();
					  
					
					  
					 imagesId[i] = attachment.id;
					 imagesThumb[i] = attachment.sizes.thumbnail.url;;
					  
					 i++;
					  
					  //return false;
					}).join();
				
				jQuery('#ctcAddtionalProductImagesUpdate').val(imagesId.join(','));
				 
				var productCollage = '';
				
				
				
				var imgNum = imagesThumb.length;
				
				
			if(imgNum < 20){	
						if(imgNum > 3){
								if (imgNum < 6){
									var imgWidth = 180/(imgNum);
									var imgHeight = 80/(imgNum/2);
								}
								else{
									
									var imgWidth = 320/(imgNum);
									var imgHeight = 150/(imgNum/2);
								}
							}
						else{
								if(imgNum != 1){
									var imgWidth = 60/(imgNum/2);
									var imgHeight = 50/(imgNum/2);
								}
								else{
									var imgWidth = 50;
									var imgHeight = 50;
								}
						     }
			      }	
				else{
					
					var imgHeight=35;
                    var imgWidth=35;
					
				}	
			
				for(var i in imagesThumb){
					 
					 productCollage += '<div class="ctcImgAlbumUpdate"><img   style="width:'+imgWidth+'px;  height:'+imgHeight+'px;" class="gridImg"  src="'+imagesThumb[i]+'" /></div>';  

				 }
				
					jQuery('.ctcAdditionaImagesUpdate').masonry('destroy');
				
				
				jQuery('.ctcAdditionaImagesUpdate').empty().show().prepend(productCollage);
				
				
				
				
				
			
				//jQuery('.ctcAdditionaImages').addClass('masonry');
				var container = jQuery('.ctcAdditionaImagesUpdate');

				container.imagesLoaded( function(){
				  container.masonry({
				    	  columnWidth: imgWidth,
				    	 
				  });
				  
				
				  
				});

				 
			
			});
			// Open the modal.
			frame.open();
			
	
		   return false;
	   }); 
	 
	 
	 
	 
	 
	   //this section deals with updating product video
	   jQuery(document).on('click', '#ctcAddVideoLibraryUpdate', function(){

		// Accepts an optional object hash to override default values.
			var frame = new wp.media.view.MediaFrame.Select({
				
				// Modal title
				title: 'Select Additional  Product Images',
				// Enable/disable multiple select
				multiple: false,

				// Library WordPress query arguments.
				library: {
					order: 'ASC',

					// [ 'name', 'author', 'date', 'title', 'modified', 'uploadedTo',
					// 'id', 'post__in', 'menuOrder' ]
					orderby: 'title',

					// mime type. e.g. 'image', 'image/jpeg'
					type: 'video',

					// Searches the attachment title.
					search: null,

					// Attached to a specific post (ID).
					uploadedTo: null
				}
			});

			
			
			frame.on( 'select', function() {
				var selectionCollection = frame.state().get('selection');
				
				var file = selectionCollection.map( function( attachment ) {
					  attachment = attachment.toJSON();
			
					   videoUrl = attachment.url;
					   videoId =  attachment.id;
					   
					   videoMime = attachment.mime;
					   
					   jQuery('#ctcVideoThumbUpdate').remove();
					   var video = jQuery('<video />', {
					        id: 'ctcVideoThumbUpdate',
					        src: videoUrl,
					        type: videoMime,
					        //controls: true
					    });
					   video.appendTo(jQuery('#ctcAddVideoLibraryUpdate').parent());		
					   
					  jQuery('#ctcProductVideoUpdate').val(videoId);
					 
					  return false;
					}).join();
			} );

			
			
			// Fires when the modal closes.
			// @see media.view.Modal.close()
			frame.on( 'close', function() {} );

			
			// Open the modal.
			frame.open();
			
			 return false;
	   });
	
	   /**
	    * 
	    * this is function to remove old entry and add new entry on 
	    * sucessfull product information update
	    * 
	    * 
	    */
	 
	   
	   //function to update product table on sucessful update
		
	    function updateProductOnSucess(formData, productId,returnedData, otherData) {
	    	
	    	
	    	
	    	
		  //update table based on serialized array data 
	     for(var i in formData){
	    	
	    	 switch(formData[i]['name']){
	    	     case 'avilableProducts':
	    	    	 jQuery('.'+formData[i]['name']+productId).empty().prepend(formData[i]['value']); 
	    	    	break; 
	    	     case 'preOrder':
	    	     case 'featureProduct':
	    	     case 'addtionalImages':
	    	     case 'productVideo':
	    	     case 'productDimensionWidth':
	    	     case 'productDimensionLength':
	    	     case 'productDimensionHeight':	
	    	     case 'productDimensionGirth':
	    	     case 'ctcproductInventory':
	    	     case 'subCategory3':
	    	     case 'subCategory2':
	    	     case 'subCategory1':
	    	      break;	
	    	     default:
	    	
	    	    	 jQuery('#'+formData[i]['name']+productId).empty().prepend(formData[i]['value']);
	    
	    	 }


	     } 	
	     
	     //update blog post link in table
	     if(!returnedData.postLink){
   			postTdContent = '<span class="dashicons dashicons-admin-post"></span>';
   		}
   		else{
   			postTdContent ='<a href="'+returnedData.postLink+'" target="_blank"><span class="dashicons dashicons-admin-post"></span>';
   		}
	     
	     //this section updates product list table based on data returned from server
   		 jQuery('#productInventory'+productId).empty().append(returnedData.productInventory);
   		 jQuery('#productDimension'+productId).empty().append(returnedData.productDimension);
   		 jQuery('#subCategory'+productId).empty().append(returnedData.subCategory);
   		 jQuery('#postLink'+productId).empty().append(postTdContent);
   		 jQuery('#primaryPic'+productId).attr('href',returnedData.primaryPicDir+'?TB_iframe=true&width=800&height=650').empty().append(returnedData.primaryPic);
	
		  //update yes no of preorder and featured product
   		 var ctcPreOrder = (returnedData.preOrder == 1)?'Yes':'No';
   		 jQuery('#preOrder'+productId).empty().append(ctcPreOrder);
   		 var ctcFeatureProduct = (returnedData.featureProduct == 1)?'Yes':'No';
   		 jQuery('#featureProduct'+productId).empty().append(ctcFeatureProduct);
   		 
   		 
   		 
		   //this sections updates other info section gallery and videos
		   if(!jQuery.isEmptyObject( otherData['gallery'])){
				   jQuery('#addtionalImages'+productId).empty();
				  for(var y in otherData['gallery']){
					  jQuery('#addtionalImages'+productId).prepend('<img src="'+otherData['gallery'][y]+'"/>');
					  
				  }
		   }
		   
		   
		     jQuery('#videoThumb'+productId).empty().append('<video id ="ctcVideoThumbOtherInfo"    src="'+otherData['videoSrc']+'" type="'+otherData['videoType']+'"></video>');
		   
		 
	    }
 
   
	/**
	 * 
	 * 
	 * this section is to just to separate above function with rest of the 
	 * script
	 * 
	 * 
	 */
	 
	 
	 
	 //this part handles update product form submission
	 
	   jQuery(document).on('submit','#ctcUpdateProductForm', function(event){
		   
		  
		    
		   var emptyField =[];
		   
			 var i =0;
			jQuery('.ctcRequiredField').each(function(){
				

				var fieldVal = jQuery(this).val() ;
                   
				if(!jQuery.trim(fieldVal)){
				
					
					
					emptyField[i] = jQuery(this).val();
					
					jQuery(this).parent('div').find('span.ctcRequiredFieldWarning').remove();
					jQuery(this).css('border','2px solid red').parent('div').prepend('<span  style="margin-bottom:5px;color:red; font-weight:200;" class="dashicons dashicons-warning ctcRequiredFieldWarning">Required field</span>');
					
					i++;
				}
				else{
					 jQuery(this).removeAttr('style').parent('div').find('span.ctcRequiredFieldWarning').remove();
				}

			});
			

			if(emptyField.length >= 1){
				
				
				
					return false;
			
		   }

				  var formData = jQuery('#ctcUpdateProductForm').serializeArray();
				   
				  var  data ={
						   
						   'action': 'ctcUpdateProduct',
						   'updatedData': JSON.stringify(formData)
						   
				   }
				   
				 
				 
				  //trigger ajax to add product
					jQuery.post(ajaxurl, data, function(response) {
			
						var responseObj = JSON.parse(response);
				
						  if(responseObj.updatedRow >= 1){
							 
							  
							  var otherData = [];
							  var  galleryImg =[];
							   var x= 0;
							   
							   //get product gallery images to update product list on sucessfull update
							    jQuery('.ctcImgAlbumUpdate img').each(function(){
							    	 galleryImg[x] = jQuery(this).attr('src');
							    	 x++;
							    });
							
							    otherData['gallery'] = galleryImg;
							    
							    
							    //get product video to update product list on sucessfull update
							    otherData['videoSrc'] = jQuery('#ctcVideoThumbUpdate').attr('src');
							    otherData['videoType'] = jQuery('#ctcVideoThumbUpdate').attr('type');
							  
							  
							  
							  jQuery('#TB_closeWindowButton').trigger('click');
							  var productId = jQuery('#ctcProductIdUpdate').val(); 
							  updateProductOnSucess(formData, productId,responseObj, otherData);
							  
							  
							  alert('Product sucessfully updated.');
							 
				
						  }
						  else{
							  
							  alert('Product could not be updated,Check for duplicate product name.');

						  }	  
						
					}).fail(function() {
						
						

				        alert( "Action could not be completed at this time \nPlease try again later");
				  
				    });

				  
				  event.preventDefault();
				  return false;
			

	   });
	   
	   
	   
	   
	   
	   
	  //this section deals with purge product part
	   jQuery(document).on('click','#ctcPurgeProductButton',function(){
		   
		 var purgeConfirm = confirm("Are you sure you want to purge this product.");
		 
		 if(purgeConfirm){
		   
		   var data ={
				   
				     'action':'ctcPurgeProduct',
					 'productId': jQuery('#ctcProductIdUpdate').val()  
		   }
		   
		   jQuery.post(ajaxurl, data, function(response){
			   
			   if(response >= 1){
			
				   alert("Product sucesfully purged.");
				   jQuery('#TB_closeWindowButton').trigger('click');
				   jQuery('#ctcProductRow'+data['productId']).remove();
				   
			   }
			   else{
				   alert("Product couldn't be purged, please try again.");
			   }
			   
		   }).fail(function() {

		        alert( "Action could not be completed at this time \nPlease try again later");
		  
		    });
		 }
		 
		 return false;
		   
	   });
	   
	   
	   
	//this section puts back the purged products into available product table  
	   
	   jQuery(document).on('click','#ctcAddPurgedProduct', function(){
		   
		 var data = {  
			 		'action' : 'ctcPutBackPurgedProduct',
			 		'productId' : jQuery(this).attr('data-type-id')
			 		
			 		
		 }
		 
		 
		 jQuery.post(ajaxurl, data, function(response){
			 
			 if(response == 1){
				 
				 alert("Product sucessfully added back.");
				 jQuery('#ctcPurgedProductRow'+data['productId']).remove();
			 }
			 else{
				 
				 alert("Product couldn't be added back, please try again.");
			 }
			 
		 }).fail(function() {

		        alert( "Action could not be completed at this time \nPlease try again later");
		  
		    });
		   
	   });
	   

/*
 * 
 * This section deals with javascript functionlaities of discount tab
 * */
	   
	   
	   jQuery(document).on('click','.ctcDiscountType',function(){
		  
		   
		 
		   
		   if(jQuery(this).attr('id') == 'ctcDiscountAmountCb'){
			   var setVal = jQuery('#ctcDiscountAmountCb').val();
			   
			   if(jQuery('#ctcDiscountAmountCb').is(':checked')){
				   jQuery('#ctcDiscountAmount').removeAttr('disabled');
				   jQuery('#ctcDiscountPercent').attr({'disabled':'disabled','value':''});
				   jQuery('#ctcDiscountPercentCb').prop('checked', false);
               }
	   		else{ 
				   jQuery('#ctcDiscountPercent').removeAttr('disabled');
				   jQuery('#ctcDiscountAmount').attr({'disabled':'disabled','value':''});
				   jQuery('#ctcDiscountPercentCb').prop('checked', true);
				   jQuery('#ctcDiscountAmountCb').prop('checked', false);
			   }
			   
			   
		   }
		   else{
			   
			   if(jQuery('#ctcDiscountPercentCb').is(':checked')){  
					   jQuery('#ctcDiscountPercent').removeAttr('disabled');
					   jQuery('#ctcDiscountAmount').attr({'disabled':'disabled','value':''});
					   jQuery('#ctcDiscountAmountCb').prop('checked', false);
			   }		   
			  else{
				   	
				   jQuery('#ctcDiscountAmount').removeAttr('disabled');
				   jQuery('#ctcDiscountPercent').attr({'disabled':'disabled','value':''});
				   jQuery('#ctcDiscountAmountCb').prop('checked', true);
				   jQuery('#ctcDiscountPercentCb').prop('checked', false);
			   }
			   
		   }
		   
		   
	   });
	   
	   
	   
	   
	   //script to add dicount image
	   jQuery(document).on('click', '#ctcCouponImageLibrary',function(){
		   
		   var thumb ='';
			var id ='';
			// Accepts an optional object hash to override default values.
			var frame = new wp.media.view.MediaFrame.Select({
				// Modal title
				title: 'Add Coupon Image',

				// Enable/disable multiple select
				multiple: true,

				// Library WordPress query arguments.
				library: {
					order: 'ASC',

					// [ 'name', 'author', 'date', 'title', 'modified', 'uploadedTo',
					// 'id', 'post__in', 'menuOrder' ]
					orderby: 'title',

					// mime type. e.g. 'image', 'image/jpeg'
					type: 'image',
					//filterable      : 'all',
					// Searches the attachment title.
					search: null,

					// Attached to a specific post (ID).
					uploadedTo: null,
					
					priority:   20,
                   toolbar:    'main-insert',
				},

				button: {
					text: 'Select Image'
				}
			});
		
			// Fires when the modal closes.
			// @see media.view.Modal.close()
			frame.on( 'close', function() {} );

			// Fires when a user has selected attachment(s) and clicked the select button.
			// @see media.view.MediaFrame.Post.mainInsertToolbar()
			frame.on( 'select', function() {
				var selectionCollection = frame.state().get('selection');
				
				var file = selectionCollection.map( function( attachment ) {
					  attachment = attachment.toJSON();
	
					   thumb = attachment.sizes.thumbnail.url;
					  id =  attachment.id;
					  
					  return false;
					}).join();
				
				 jQuery('.ctcDiscountPicThumb').empty().append('<img src="'+thumb+'" style="display:block;"/>');
					
			     jQuery('#ctcCouponImage').val(id);

			} );
		
			// Open the modal.
			frame.open();

			  	
		return false ;
		   
		   
		   
		   
	   });
	   
	   
	   
	 //script to add discount to the database
	   jQuery(document).on('submit','#ctcAddDiscountForm',function(event){
		   
		   
		   var data ={
				   
				   'action':'ctcAddProductDiscount',
				   'discountInfo': JSON.stringify(jQuery(this).serializeArray())
				   
		   }
		   
		   
		   jQuery.post(ajaxurl, data, function(response){
			   
			  
			   
			  if(response == 1){
				 
				  alert("Discount sucessfully added");
				  jQuery( ":input" ).each(function(){
					  
					  if(jQuery(this).attr('id') != 'ctcAddDiscountButton'){
						  
						  jQuery(this).val('');
						  jQuery('.ctcDiscountPicThumb').empty();
					  }
					  
					  
				  });
				  
			  }
			  else{
				  
				  alert("Discount couldn't be added.\nPlease check for duplicate entry.");
				  
			  } 
			   
			   
			   
		   }).fail(function() {

		        alert( "Action could not be completed at this time \nPlease try again later");
		  
		    });
		   
		   event.preventDefault();
		   return false;
		   
	   });
	 
	 

 
    //script to get form with option to update or delete discount
	  jQuery(document).on('click', '#ctcUpdateDeleteDiscount', function(){
		  
		  var data ={
				  
				  'action': 'ctcGetDiscountUpdateForm',
				  'discountId':jQuery(this).attr('data-type-id')
		  }
		  
		  
		  
		  jQuery.post(ajaxurl, data , function(response){
			  
			  var thickBoxStyle = {'height':'690px', 'width':'500px','margin-top':'-340px','overflow':'hidden',
						'padding-left':'20px','border-radius': '100px 10px ','opacity':'0.9', 'max-width':'90%',
						'max-height':'90%', 'padding-bottom':'0px'};
			 var ajaxContentStyle = {'height': '670px','width': '480px','max-width':'100%','max-height':'100%','margin-top':'10px','margin-bottom':'10px'};
			 
			 jQuery('#ctcDiscountUpdateContent'+data['discountId']).empty().append(response);
			  jQuery('#ctcDiscountUpdateTigger'+data['discountId']).trigger('click').thickBoxCss(thickBoxStyle,ajaxContentStyle);;
			  
			  
		  }).fail(function() {

		        alert( "Action could not be completed at this time \nPlease try again later");
		  
		    });
		  
		  return false;
	  }); 
	   
	   
	  //script to add dicount image
	   jQuery(document).on('click', '#ctcCouponImageLibraryUpdate',function(){
		   
		   var thumb ='';
			var id ='';
			// Accepts an optional object hash to override default values.
			var frame = new wp.media.view.MediaFrame.Select({
				// Modal title
				title: 'Update Coupon Image',

				// Enable/disable multiple select
				multiple: true,

				// Library WordPress query arguments.
				library: {
					order: 'ASC',

					// [ 'name', 'author', 'date', 'title', 'modified', 'uploadedTo',
					// 'id', 'post__in', 'menuOrder' ]
					orderby: 'title',

					// mime type. e.g. 'image', 'image/jpeg'
					type: 'image',
					//filterable      : 'all',
					// Searches the attachment title.
					search: null,

					// Attached to a specific post (ID).
					uploadedTo: null,
					
					priority:   20,
                  toolbar:    'main-insert',
				},

				button: {
					text: 'Select Image'
				}
			});
		
			// Fires when the modal closes.
			// @see media.view.Modal.close()
			frame.on( 'close', function() {} );

			// Fires when a user has selected attachment(s) and clicked the select button.
			// @see media.view.MediaFrame.Post.mainInsertToolbar()
			frame.on( 'select', function() {
				var selectionCollection = frame.state().get('selection');
				
				var file = selectionCollection.map( function( attachment ) {
					  attachment = attachment.toJSON();
	
					   thumbImg = attachment.sizes.thumbnail.url;
					    id =  attachment.id;
					  
					  return false;
					}).join();
				
				 jQuery('.ctcDiscountPicThumbUpdate').empty().append('<img src="'+thumbImg+'" style="display:block;"/>');
				 
			     jQuery('input[name="couponImage"]').val(id);

			} );
		
			// Open the modal.
			frame.open();

			  	
		return false ;
  
	   });  
	   /**
	    * 
	    * section to deal with update discount table and updatig discount table on sucess 
	    * 
	    */
	   
	   function ctcUpdateDiscountList(returnedData){
		   
	
		 for(var key in returnedData){
			 switch (key){
			     case 'discountId':
			     case 'update':	 
			    	 break;
				 case 'couponImage':
					 jQuery('#ctcCouponImage'+returnedData['discountId']).addClass('thickbox ctcDiscountThumb').attr({'href': returnedData[key]+'?TB_iframe=true&width=800&height=650'});
					 
					break; 
				 case 'couponImgThumb':
					 jQuery('#ctcCouponImage'+returnedData['discountId']).empty().prepend(returnedData[key]);
					
					 break;
				 case 'discountPercent':
				 case 'discountAmount':
					 if(returnedData[key] == 0){
						 jQuery('#'+key+returnedData['discountId']).empty().prepend('----'); 
					 }
					 else{
						 jQuery('#'+key+returnedData['discountId']).empty().prepend(returnedData[key]); 
					 }
					 
					 break;
				 default:
				 jQuery('#'+key+returnedData['discountId']).empty().prepend(returnedData[key]);
			
			 }
			 
		 }
		   
		   
	   }
	    
	   
	   
	   //script to handle update discount ajax
	   jQuery(document).on('submit','#ctcUpdateDiscountForm', function(event){
		   
		  
		
		   var data = {
				   
				   'action':'ctcUpdateProductDiscount',
				   'updatedData':JSON.stringify(jQuery(this).serializeArray())
		   }
		   
		   jQuery.post(ajaxurl, data, function(response){
			   
			 
			   
			   var responseObj = JSON.parse(response);
			  
			   if(responseObj.update == 1){
				   alert("Discount sucesfully updated");
				   jQuery('#TB_closeWindowButton').trigger('click');
				  
				   
				   ctcUpdateDiscountList(responseObj);
				   
				
			      }
			   else{
				     alert("Discount couldnot be updated.\nPlease try again.");
				   
			       }
			   
		   }).fail(function() {

		        alert( "Action could not be completed at this time \nPlease try again later");
		  
		    });
		   
		   
		   event.preventDefault();
		   return false;
		   
		   
	   });
	   
	   
	   //script to delete discount with ajax and update table
	   jQuery(document).on('click','#ctcDeleteDiscountButton',function(){
		   
		   var data ={
				   'action':'ctcDeleteDiscount',
				   'discountId':jQuery('#ctcDiscountId').val()
		   }
		   
		  
		   
		   jQuery.post(ajaxurl, data, function(response){
			   
			  if(response == 1){
				  
				  alert("Discount successfully deleted.");
				  jQuery('#TB_closeWindowButton').trigger('click');
				  jQuery("#ctcDiscountListRow"+data['discountId']).remove();
				  
			  }
			  else{
				  
				  alert("Discount couldn't be deleted.\n Please try again.");
			  }
			   
			   
		   }).fail(function() {

		        alert( "Action could not be completed at this time \nPlease try again later");
		  
		    });
		   
		   
	   });
	
	   
	   //script to handle business setting logo 
	   
 jQuery(document).on('click', '#ctcBusinessLogoMedia',function(){
		   
		   var thumb ='';
			var id ='';
			// Accepts an optional object hash to override default values.
			var frame = new wp.media.view.MediaFrame.Select({
				// Modal title
				title: 'Add Stripe Payment Store Logo',

				// Enable/disable multiple select
				multiple: true,

				// Library WordPress query arguments.
				library: {
					order: 'ASC',

					// [ 'name', 'author', 'date', 'title', 'modified', 'uploadedTo',
					// 'id', 'post__in', 'menuOrder' ]
					orderby: 'title',

					// mime type. e.g. 'image', 'image/jpeg'
					type: 'image',
					//filterable      : 'all',
					// Searches the attachment title.
					search: null,

					// Attached to a specific post (ID).
					uploadedTo: null,
					
					priority:   20,
                   toolbar:    'main-insert',
				},

				button: {
					text: 'Select Image'
				}
			});
		
			// Fires when the modal closes.
			// @see media.view.Modal.close()
			frame.on( 'close', function() {} );

			// Fires when a user has selected attachment(s) and clicked the select button.
			// @see media.view.MediaFrame.Post.mainInsertToolbar()
			frame.on( 'select', function() {
				var selectionCollection = frame.state().get('selection');
				
				var file = selectionCollection.map( function( attachment ) {
					  attachment = attachment.toJSON();
	
					   thumb = attachment.sizes.thumbnail.url;
					 
					  
					  return false;
					}).join();
				
				 jQuery('#ctcBusinessLogo img').show().attr('src',thumb);
					
			     jQuery('#ctcBusinessLogoDataImage').val(thumb);

			} );
		
			// Open the modal.
			frame.open();

			  	
		return false ;
		   
		   
		   
		   
	   });
	   
	  
	   
	   //function to update pending order notification
	   function updatePendingOrdersNotifications(){
		   
		   
		   
		   //ajax to update pending order notification
			 var orderData ={
					 
					 'action':'ctcUpdatePendingOrderNotification'
					 
			 }
	
			  jQuery.post(ajaxurl, orderData, function(pendingOrdersCount) {
				  if(pendingOrdersCount === '0'){
					  
					  jQuery('.ctcPendingOrderCount').remove();
					  
				  }
				  else{
				    jQuery('.ctcPendingOrderCount').empty().append(pendingOrdersCount);
				  }
				  
			  }).fail(function() {

			        alert( "Action could not be completed at this time \nPlease try again later");
			  
			    });
	   }
	   
	   
	   
	   //function to print shipping address
	   function printShippingAddress(businessAddress,shippingAddress,customerName,order)
	   {
	       var mywindow = window.open('', 'PRINT', 'height=300,width=300,left=500');

	       mywindow.document.write('<html><head><title>Shipping Address</title>');
	       mywindow.document.write('</head><body  onload="window.print()">');
	       mywindow.document.write('<div style="float:left;width:100%;display:block; margin-left:20px;"><h1 style="text-align:left;"> From</h1><address style="text-align:left;text-transform: uppercase;"><b>');
	       mywindow.document.write(businessAddress);
	       mywindow.document.write('</b></address></div>');
	       mywindow.document.write('<div style="border-left:3px solid black; height:500px;margin-left:50%;margin-bottom:-220px;"></div>');
	       mywindow.document.write('<div style="float:right; width:100%;display:block; margin-right:20px;"><h1 style="text-align:right;margin-right:50px;"> To </h1><address style="text-align:right;text-transform: uppercase;margin-bottom:20px;"><b>');
	       mywindow.document.write(customerName+'<br>');
	       mywindow.document.write(shippingAddress);
	       mywindow.document.write('</b></address></div>');
	       mywindow.document.write('<hr><div style="text-align:center;margin-top:20px;font-size:25px;">');		   
	       mywindow.document.write(order);		 	   
	       mywindow.document.write('</div></body></html>');

	       mywindow.document.close(); // necessary for IE >= 10
	       mywindow.focus(); // necessary for IE >= 10

	      mywindow.close();
	      
	   
	       return true;
	   }
	   
	   
	   //script to complete pending order
	   
	   jQuery(document).on('click','.ctcMarkShipped', function(){
		   
		   var checkedElement = jQuery(this);
		   var data ={
				   
				   'action':'ctcCompleteOrder',
				   'transactionId':jQuery(this).val()
				   
		   }
		   
		   jQuery.post(ajaxurl, data, function(response) {
			  
			   responseObj = JSON.parse(response);
		
			 if(responseObj.complete == 'complete'){

				//update the pending order notification 
				 updatePendingOrdersNotifications();
			
				  if(confirm("Would you like to print shipping address for this order")){
						 
						 var businessAddress = jQuery('#ctcBusinessAddressOrderTab').text().replace(/,/gi,'<br>');
						 var shippingAddress = jQuery('#shippingAddress'+data['transactionId']).text().replace(/,/gi,'<br>');
						 var customerName = jQuery('#ctcShippingCustomerName'+data['transactionId']).text();
						 var order = jQuery('#productPurchased'+data['transactionId']).html();
						 
					
						 printShippingAddress(businessAddress,shippingAddress,customerName,order);
					
					 }
				 
				 jQuery('#ctcPendingOrderRow'+data['transactionId']).remove();
				 
				 if(jQuery('#ctcOrderList table tr').length <= 1 ){
					 
						jQuery('#ctcOrderList table').remove();
						jQuery('#ctcOrderList').append('<div class="dashicons-before dashicons-smiley"> You do not have any pending order left.</div>');
						 
					 }
				 
				 
				
								 var inventoryMessage = ''; 
									
									if(typeof(responseObj.outOfStockProducts) != "undefined"){ 
										inventoryMessage += 'Out of Stock Products:\n'; 
										 for(var i in responseObj.outOfStockProducts){
											 inventoryMessage += '-'+responseObj.outOfStockProducts[i]+'\n';
										 }
									} 
									
										
										 
									  if(typeof(responseObj.variation) != "undefined"){
											 inventoryMessage += 'Out of Stock Product variation:\n'; 
												 for(var a in responseObj.variation){
													 inventoryMessage += a+':\n'
													 inventoryMessage += ' '+responseObj.variation[a]+'\n';
												 }
										 }
					
				
			                 if(inventoryMessage.length>=1){
			                	 
			                	 alert(inventoryMessage);
			                 }
		
				
			 }
			 else{
			
				 
				 checkedElement.prop('checked',false);
					 
					 var inventoryMessage = ''; 
					
					 if(typeof(responseObj.outOfStockProducts) != "undefined"){ 
						inventoryMessage += 'Out of Stock Products:\n'; 
						 for(var i in responseObj.outOfStockProducts){
							 inventoryMessage += '-'+responseObj.outOfStockProducts[i]+'\n';
						 }
						 
					 }
						
						 
						 if(typeof(responseObj.variation) != "undefined"){
									 inventoryMessage += 'Out of Stock Product variation:\n'; 
										 for(var a in responseObj.variation){
											 
											    inventoryMessage += responseObj.variation[a] +'\n';
									
										 }
						 }
								
					
				
				 
					if( inventoryMessage.length>=1){ 
						
						alert("Couldn't complete order.\n"+inventoryMessage+'\nPlease update inventory before proceeding.');
					    
					}
					else{
						
						alert("Couldn't complete order. Please try again later.");
					}
				 
				
				 
				
			 }
		   }).fail(function() {

		        alert( "Action could not be completed at this time \nPlease try again later");
		  
		    });
		   
		   
	   });
	   
	   //script to display form in modal box
	   
	   jQuery(document).on('click','.ctcDisplayRefundForm', function(){
		 
		      
		 var data ={
				 
				 'action':'ctcDisplayRefundForm',
				 'transactionId':jQuery(this).attr('data-type-tansactionid')
				 
		 }
		 
		 jQuery.post(ajaxurl,data,function(response){
			 
				//style rules for thickbox
				var thickBoxStyle = {'height':'220px', 'width':'380px','margin-top':'-12%','margin-left':'-10%','display':'block','overflow':'auto',
									'padding-left':'10px','border-radius': '100px 10px ','opacity':'0.9', 'max-width':'90%',
									'max-height':'90%'};
				var contentStyle = {'height': '200px','width': '340px','max-width':'95%','max-height':'95%','margin-left':'auto','margin-right':'auto','display':'block'};
			 
			 jQuery('#ctcRefundFormContainer').empty().append(response);
			 jQuery('#ctcRefundFormModalTrigger').trigger('click').thickBoxCss(thickBoxStyle,contentStyle);
			 
		 }).fail(function() {

		        alert( "Action could not be completed at this time \nPlease try again later");
		  
		    });
 
	 });  
	   
//script to process refund 	   
	jQuery(document).on('submit','#ctcRefundForm', function(event){
		
		
		
		var data = {
				
				'action':'ctcProcessRefund',
				'refundData':jQuery(this).serializeArray()
				
		}
		
		
		jQuery.post(ajaxurl,data, function(response){
			
			
			
			if(response === 'refundSuccessful'){
				
				alert("Refund successfully processed");
				jQuery('#TB_closeWindowButton').trigger('click');
	
				var newRefund = parseFloat(jQuery('#ctcRefundtotal-'+data['refundData'][1]['value']).text())+parseFloat(data['refundData'][0]['value']);
				
				jQuery('#ctcRefundtotal-'+data['refundData'][1]['value']).empty().prepend(newRefund.toFixed(2));
				
				
			}
			else{
				
				alert("Refund could not be processed at this time, please try again later");
				
			}
			
		});
		
		
		
		  event.preventDefault();
		  return false;
		
	});  
//script to style thickbox with purchase detail
jQuery(document).on('click','.ctcPurchaseDetail', function(){
	
	//style rules for thickbox
	var thickBoxStyle = {'height':'320px', 'width':'300px','margin-top':'-12%','margin-left':'-10%','display':'block','overflow':'auto',
						'padding-left':'10px','border-radius': '100px 10px ','opacity':'0.9', 'max-width':'90%',
						'max-height':'90%'};
	var contentStyle = {'height': '260px','width': '260px','max-width':'95%','max-height':'95%','margin-top':'10px','margin-left':'10px','margin-right':'auto','display':'block'};
	var transactionId = jQuery(this).attr('data-type-transactionid');
	
	
	 jQuery('#purchaseDetailTrigger'+transactionId).trigger('click').thickBoxCss(thickBoxStyle,contentStyle);
	
});	   

//script to cancel order on customer request
jQuery(document).on('click','.ctcCancelPendingOrder', function(){
	
				
			if(confirm("Are you sure you want to cancel this order?")){	
				
				var data={
						
						'action':'ctcCancelPendingOrder',
						'transactionId' : jQuery(this).attr('data-type-tansactionid')	
				}
				
				
				
				
				jQuery.post(ajaxurl,data,function(response){
					
					if(response === '1'){
						
						 //update the prnding orders notification
						 updatePendingOrdersNotifications();
						 
						 jQuery('#ctcPendingOrderRow'+data['transactionId']).remove();
						 
						 if(jQuery('#ctcOrderList table tr').length <= 1 ){
							 
								jQuery('#ctcOrderList table').remove();
								jQuery('#ctcOrderList').append('<div class="dashicons-before dashicons-smiley"> You do not have any pending order left.</div>');
								 
							 }
						
						
					}
					else{
						
						alert("Order couldn't be cancelled at this time,\n Please try again later.");
					}
					
				}).fail(function() {

			        alert( "Action could not be completed at this time \nPlease try again later");
			  
			    });
			}
	
});
	

//script to display info on admin panel info section
jQuery('.ctcAdminInstruction h4,.ctcAdminPanelShortcodes h4,.ctcAdminPanelImageSpec h4,.ctcAdminPanelProductChart h4,.ctcAdminSalesActivity h4,.ctcAdminNotice h4').click(function(){
  var h4El = jQuery(this);

 
  
 
 
  
if(h4El.hasClass('ctcShowProductChart') && jQuery('#ctcProductPreviewChart ul').length===0){
	
		
			
				  jQuery.post(ajaxurl,{'action':'ctcProductBarForChart'},function(response){
					
				  
					 
			jQuery('#ctcProductPreviewChart').append('<ul></ul>');
					
				h4El.siblings().slideToggle(100,function(){
					  
					  jQuery(response).filter('div').each(function(i){
						  
						  var productBarHtml = jQuery(this).html();
						 
							  setTimeout(function(){jQuery('#ctcProductPreviewChart ul').append(productBarHtml)},(500*i));
					  });
					  
				  });
				
		
		  	}).fail(function() {
				
		        alert( "Action could not be completed at this time \nPlease try again later");
		  
		    });
	}

  else if(h4El.hasClass('ctcShowSalesActivity') && jQuery('.ctcSalesReportList ul').length===0){
	
	jQuery.post(ajaxurl,{'action':'ctcAjaxSalesReport'},function(response){
	

		
		jQuery('.ctcSalesReportList ').append('<ul></ul>');
				
			h4El.siblings().slideToggle(100,function(){
				  
				  jQuery(response).filter('li').each(function(i){
					  
					  var salesActHtml = jQuery(this).html();
					 
						  setTimeout(function(){jQuery('.ctcSalesReportList ul').append('<li>'+salesActHtml+'</li>')},(500*i));
					 
				  });
				  
			  });
			
	
	  	}).fail(function() {
			
	        alert( "Sales report could not be loaded at this time ");
	  
	    });
	
}
 else{

	 h4El.siblings().fadeToggle(1000, function(){});
 }

	

  h4El.toggleClass('showingContent');
	
});


	if(jQuery('.ctcAdminNotice').length === 1){
	
		jQuery('.ctcAdminNotice h4').trigger('click');
	
	}


	   
/**
 * 
 * 
 * never write code beyound this point just for note about what need to be done next
 * 
 */	   
 

 
 
 
 
 
 });
