
	
jQuery.noConflict();
jQuery(document).ready(function($){
	 //script to add thickbox class to wordpress gallery
	 //jQuery(document).find(".ctcSingleProductGallery  a").addClass("thickbox").attr('rel','gallery-ctc');
	
	//function to javascript number format
	function addCommas(nStr)
	{
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
	 
	//script to reinstate cart on page load
	 if(localStorage.getItem("ctcWidgetCartData")){ 
		  ctcReinstateCart();
	 }
	
	//check for empty cart
	 ctcCheckWidgetEmptyCart();
	//function to apply masonry to the divs
	function ctcApplyMasonry(container){
			
	
		if(jQuery(container+'>div').length >=3){
		
		
			jQuery(container).masonry({
			    fitWidth: true,
			    	gutter:9,
			      isFitWidth: true,
				  initLayout:false,	  
				 
			});
			 
	
		 jQuery(container).imagesLoaded().progress( function() {
			 jQuery(container).masonry('layout');
			 
			 
	
		});
			
		}
		
	}
		
	//apply masonry to featured products list
	//ctcApplyMasonry('.ctcPostImgGallery div');
	
	//apply masonry to featured products list
	ctcApplyMasonry('.ctcFeaturedProductList');
	
	
	ctcApplyMasonry('.ctcProductCategoriesMain');
	
	//applyMasonary to product list product category page
	ctcApplyMasonry('.ctcCategoryPageProductList');
	
	//applyMasonary to product list product category page
	ctcApplyMasonry('.ctcMetaPageProductList');
	
	//applyMasonary to product list product category page
	ctcApplyMasonry('.ctcDiscountProductList');
	
	

jQuery('.ctcSingleProductGallery span:nth-child(2),.ctcSingleProductGallery span:first-child ').on('click',function(event){
	
	var scrollContainer = jQuery(".ctcSingleProductGallery");
	
	 
	
	if(jQuery(this).is('.ctcSingleProductGallery span:first-child')){
		
		scrollContainer.animate({scrollLeft: scrollContainer.scrollLeft() - 80}, 500);
		  
	}
	else{
		
		scrollContainer.animate({scrollLeft: scrollContainer.scrollLeft() + 80}, 500);
	}
	

});
	
	 
	/**
	 * 
	 * 
	 *  script to handle on logout destroy web session
	 *  
	 */
	
	
	jQuery(document).on('click','#ctCommerceUserLogout', function(){
		
		localStorage.removeItem("ctcWidgetCartData");
		
	});
	
	

	 
	

	 
	 
	 /**
	  * 
	  * 
	  * 
	  * this section contains basic password validation for user registration and update
	  * 
	  */
	 
	 function ctcCheckPasswordMatch(password,confirmPassword,confirmPasswordId){
		 
	
		 
		 if(password !== confirmPassword){
			 jQuery('.ctcConfirmPasswordError').show();
			 
			 jQuery("#"+confirmPasswordId).css('border','2px solid red');
			 return false;
		 }
		 else{
			 
			 jQuery('.ctcConfirmPasswordError').hide();
			 jQuery("#"+confirmPasswordId).removeAttr('style');
			 
			 return true;
		 }
		 
	 }
	 

	 /**
	  * 
	  * end of wp media modal box
	  * 
	  * 
	  */
	 
	 //function to show user rgistration form with ajax
	 jQuery(document).on('click','#ctCommerceUserRegistration', function(){

		 
		
		
		 
		 var data = {
				 
				 'action':'ctcGetUserRegistrationForm'

		 }
		 
		 
		 
		 jQuery.post(ctc_ajax_url, data , function(response){
			 
			 
			 $.ctcOverlayEl({elemHeight:'630px',elemWidth:'65%',ajaxUrl:ctc_ajax_url,ajaxData:data,ajaxMethod:'post'});
			 
		

		 });
		 
		 
		 return false;
		 
	 });
	 
	
	 
	 //script to register user with ajax
	 jQuery(document).on('submit','#ctcUserRegistrationForm', function(event){
		 
		 var password =jQuery("input[name='customerPassword']").val();
		 var confirmPassword = jQuery("input[name='customerConfirmPassword']").val();
		 var confirmPasswordId = jQuery("input[name='customerConfirmPassword']").attr('id');
		 
      if(ctcCheckPasswordMatch(password,confirmPassword,confirmPasswordId)){
		 
			 var data = {
					 
					    'action':'ctcRegisterUser',
					    'userInfo' :JSON.stringify(jQuery(this).serializeArray())
					 
			 }

			 jQuery.post(ctc_ajax_url, data , function(response){
				
			
				
				if(response == 1){
					
					
					$.ctcOverlayEl({modalMessage:'Account sucesfully created.'});
					jQuery('button.media-modal-close, #ctcUserRegistrationFormReset').trigger('click');
					
				}
				else{
					var errorUser ='Error :';
					responseObj = JSON.parse(response);
					for(var i in responseObj['errors']){
					errorUser  = errorUser.concat('<br/>'+responseObj['errors'][i]);
				   }
					
					$.ctcOverlayEl({modalMessage:errorUser});
				
					
					
				}
				
			});
	 
       }		 
		event.preventDefault();
		return false;

	 });
	 
	 
	 
	 
//function to get user update form
	jQuery(document).on('click', '#ctCommerceUserInfoUpdate', function(){
		
		var modalCss = {'padding':'50px',' outline':'none!important'};
		
		 
		
		var data = {
			 
				'action':'ctcGetUserInfoUpdateForm'
		}

		$.ctcOverlayEl({elemHeight:'630px',elemWidth:'65%',ajaxUrl:ctc_ajax_url,ajaxData:data,ajaxMethod:'post'});
		
		/*
		jQuery.post(ctc_ajax_url, data , function(response){
			
			ctcOpenWpMediaModal(response,modalCss);
			
		});
		*/
		return false;
		
	}) ;
	 

 //script to update user information
	
	jQuery(document).on('submit','#ctcUserUpdateForm',function(event){
		
		 var password =jQuery("input[name='customerPassword']").val();
		 var confirmPassword = jQuery("input[name='customerConfirmPassword']").val();
		 var confirmPasswordId = jQuery("input[name='customerConfirmPassword']").attr('id');
		
		
		 
		      if(ctcCheckPasswordMatch(password,confirmPassword,confirmPasswordId)){
		    	  
		    	  
		    	  var data = {
		    			  
		    			    'action':'ctcUpdateUserInfo',
		    			    'updatedInfo':JSON.stringify(jQuery(this).serializeArray())
		   
		    			    
		    	  			}
		    	  
		    	  jQuery.post(ctc_ajax_url, data , function(response){
		    		  
		    		if(response >= 1){
		    			
		    			$.ctcOverlayEl({modalMessage:'Information sucessfully updated.'});
		    			
		    			jQuery('button.media-modal-close, #ctcUserUpdatenFormReset').trigger('click');
		    		}
		    		else{
		    			$.ctcOverlayEl({modalMessage:'Information could not be updated at this time.<br/>Try loging out log back in and update'});
		    			
			
		    		}
		  			
		  		});
		    	 
		      }
		 
		
		      
		      
		   event.preventDefault();
		   return false
	});
	
/*script to add intems to the end of page on scroll*/
	
	
	jQuery(window).on("scroll", function() {
		var scrollHeight = jQuery(document).height();
		var scrollPosition = jQuery(window).height() + jQuery(window).scrollTop();
		
		
		
		//just kill process if all featured product are loaded
		if(jQuery('#ctcSortProductSelect').attr('data-type-allproduct')==='yes'){
			
			return false;
		}
		else{
			
		
		
		if (scrollHeight === scrollPosition ) {
			   
			

			   var data ={
					   
					   'action':'ctcAddNewFeaturedProducts',
					   'offset': jQuery('div.ctcStorePageMain').attr('data-type-rowoffset')	   
			   }
			   
			   
			  if(data['offset']){ 
				  
				  
			   jQuery.post(ctc_ajax_url, data, function(response){
				   
				 
				   if(response.length > 22){
					   
					 
					 
					// init Masonry
					  var $grid  = jQuery('.ctcFeaturedProductList').masonry({
						  transitionDuration: '1.5s',
						  stagger: 20,
						  fitWidth: true,
						  gutter:9,
						  percentPosition: true,
						 originLeft: false,
						  isFitWidth: true,
				
					  });
					 
					  $grid.imagesLoaded().progress().always( function( instance ) {

						  $grid.masonry('layout');
						  
						});

					  $grid.append(response).masonry('reloadItems');
					  $grid.masonry('appended', response);
					  
					  
					
					  jQuery('[id]').each(function (i) {
						    jQuery('[id="' + this.id + '"]').slice(1).remove();
						});
					 	
					 
					  
					  var productCount = jQuery('.ctcFeaturedProductContent').length;
					  
					  jQuery('div.ctcStorePageMain').attr('data-type-rowoffset',parseInt(productCount));
				
				   }
				   else{
					   
					   
					   jQuery('div.ctcStorePageMain').removeAttr('data-type-rowoffset');
				   }
				 
			   });
			  }
		}
		
		}	
	});
	
	
	
/**
 * 
 * script to deal with store functionalities
 * 
 */	

	  
	  /**
	   * 
	   * Script for Widget Product cart functionalities
	   * 
	   * 
	   */
	  
	   //function to check if cartdoes not have item if no do not display
	    function ctcCheckWidgetEmptyCart(){
	    if(!cartChecked){	
	    	
	    	
	    	if(jQuery('#ctcCartWidgetTable tr').length === 0 ){
	    		jQuery('.ctcHideOnEmptyCart').animate({
	    		    opacity: 0,
	    		    left: "+=100",
	    		  }, 150, function() {
	    			 
	  	    			
	  	    			jQuery('#ctcWidgetEmptyCartMessage,#ctcPageEmptyCartMessage').empty().prepend("<h5> Empty Cart.</h5>").show("medium");
	    		      
	  	    			jQuery('#ctcWidgetEmptyCartMessage h5,#ctcPageEmptyCartMessage h5').each(function(){
	    		    	 
	    		    	   if(jQuery(this).html().length ===0){
	    		    		   
	    		    		   jQuery(this).remove();
	    		    	   }
	    		    	   
	    		       });
	
	    		}).hide("medium");

				
			 }
	    	else{
	    		jQuery('#ctcWidgetEmptyCartMessage,#ctcPageEmptyCartMessage').empty();
	    		jQuery('.ctcHideOnEmptyCart').animate({
	    		    opacity: 1,
	    		    left: "+=100",
	    		  }, 150, function() {
	    			 
	    		  }).show("fast");
	    		
	    		
	    		
	    	}
	    }
	    	
	    	var cartChecked = true;
	    	
	    }
	    /*
		//function to update cart if user manually updates products
	    jQuery(document).on('change blur','.ctcCartWidgetCount',function(){
	    	var differenceAmount = '';
	    	var price = parseFloat(jQuery(this).attr('data-type-price'));
	    	var id = jQuery(this).attr('data-type-id');
	    	var newCount =jQuery(this).val() || 0;
	    	var oldTotal =parseFloat(jQuery('ctcIndividualProductTotal-'+id).val());
	    	
	    	  
	    	  var newProductTotal = parseInt(newCount)*parseFloat(price);
	    	  jQuery('#ctcWidgetCartProductTotal-'+id).empty().prepend(newProductTotal.toFixed(2));
	    	  jQuery('#ctcIndividualProductTotal-'+id).val(newProductTotal);
	
	  
	    		if(newCount == 0){
	    			jQuery('#ctcCartWidgetTr'+id).remove();
	    		}
    		
    		
	    	
	    	//calcualte and prepend grand total
	    	ctcCartCalculateTotal();
	    	
	    });
	    */
	    
	    //remove product on delete click
	    jQuery(document).on('click','.ctcRemoveWidgetCartItem', function(){
	    	var productId = jQuery(this).attr('data-type-id');
	    	
	    	if(confirm("Do you want to remove this item from cart?")){
	    		
	    		
	    		 
	    		
	    	   jQuery( "#ctcCartWidgetTr"+productId).remove();
	    	   
	    	   
	    	   jQuery("#ctcPageCartItem"+productId).remove();
	    		
	    	   
	    	 //calculate and prepend grand total
		    	ctcCartCalculateTotal();
	    	   
	    	}
	    	
	    	return false;
	    	
	    });
	    
	   function ctcAddNewWidgetCartItemVariation(id,newProductVariation){
	    	
	    	var setProductVariation = jQuery('#ctcWidgetCartProductVariation-'+id).val();
	    	if(setProductVariation.search(newProductVariation) !== -1){
	    		
	    		
	    		
	    		var setVarArray = setProductVariation.split(',');
	    		for(var i in setVarArray){
	    			
	    			if(setVarArray[i].search(newProductVariation)!== -1){
	    				
	    				var matchingVariation = setVarArray[i].split(':');
	    				
	    				delete setVarArray[i];
	    				
	    				setVarArray[i] = newProductVariation+":"+(parseInt(matchingVariation[1])+1);
	    				
	    				var newVariationSet =  setVarArray.join(',');
	    				
	    				

	    				 jQuery('#ctcWidgetCartProductVariation-'+id).val(newVariationSet);
	    				 jQuery('#ctcWidgetCartProductVariationTooltip-'+id).removeAttr('title').attr('title', jQuery('#ctcWidgetCartProductVariation-'+id).val());
	    				
	    			}
	    			
	    		}
	    		
	    	}
	    	else{

	    	    jQuery('#ctcWidgetCartProductVariation-'+id).val(setProductVariation+','+newProductVariation+':1');
	    	}
	    	
	    }
	    
	    
	    //function to calculate grand total and set cookie too
			 function ctcCartCalculateTotal(){
				 var newGrandTotal = 0;
				 var discountAmount =0;
				 var shippingCost =0 ;
				 var tax = parseFloat(jQuery('#ctcPageCartItemGrid').attr('data-type-tax'));
				 
				 jQuery('input.ctcIndividualProductTotal').each(function(){

					newGrandTotal = newGrandTotal+parseFloat(jQuery(this).val());

				 });
				 
				 discountAmount  = parseFloat(jQuery('#ctcPromoCodeSaving').val());
			
				 shippingCost = parseFloat(jQuery('#ctcTotalShippingCost').val());
			
				 if(tax >= 0){
					 
					 var taxAmount = (newGrandTotal/100)*tax;
					 
					
					 
					
					 var amountAfterTaxDiscountShipping = newGrandTotal +taxAmount-discountAmount+shippingCost;	 
					 
					
					 
					 
						 jQuery('#ctcPageCartGrandTotalInput').val(amountAfterTaxDiscountShipping.toFixed(2));
						 jQuery('#ctcCartGrandTotal').val(newGrandTotal.toFixed(2));
						 jQuery('#ctcWidgetGrandTotalAmount').empty().prepend(addCommas(newGrandTotal.toFixed(2)));
						 jQuery('#ctcPageCartGtotal').empty().prepend(addCommas(amountAfterTaxDiscountShipping.toFixed(2)));
						 jQuery('#ctcPageCartTaxAmount').empty().html(addCommas(taxAmount.toFixed(2)));
		
				 }
				 else{
					 jQuery('#ctcCartGrandTotal, #ctcPageCartGrandTotal input').val(newGrandTotal.toFixed(2));
					 jQuery('#ctcWidgetGrandTotalAmount,#ctcPageCartGtotal').empty().prepend(addCommas(newGrandTotal.toFixed(2)));
					 //jQuery('#ctcWidgetGrandTotalAmount').empty().prepend(newGrandTotal.toFixed(2));
					 
				 }
				     ctcCheckWidgetEmptyCart();
				   
				     
				    
				     //function to also save cart in session storage
				     cartData = jQuery("#ctcProductCartWidget").html();
				    
				     setCtcCartLocalStorage(cartData);
				     
				   
			   
			 }
	
	
	  //function to multiply price if product exists
	  function ctcCartWidgetDuplicateProduct(id,price,productVariation){
		 var addNewProduct = true;
		  var productInCart = jQuery('#ctcProductCartWidgetForm').serializeArray();
		  
		  for(var i in productInCart){
			  
			 switch(productInCart[i]['name']){
			 

			 case 'productId':
						 if (productInCart[i]['value'] === id){
			
									  var newProductCount  = parseFloat(jQuery("#ctcWidgetCartProductCount-"+id).val())+1;
									   var newProductTotal = newProductCount*price;
										
										//function to add new product variation 
									   ctcAddNewWidgetCartItemVariation(id,productVariation);
									   
										jQuery("#ctcWidgetCartProductCount-"+id).val(newProductCount);
										jQuery("#ctcWidgetCartProductCountDisplay-"+id).empty().text(newProductCount);
										jQuery("#ctcWidgetCartProductTotal-"+id).empty().append(addCommas(newProductTotal.toFixed(2)));
										jQuery('#ctcIndividualProductTotal-'+id).val(newProductTotal);
										var addNewProduct = false;
	   
				 }
			 break;
			 }
		  }
		  
		  
		  
		  return addNewProduct;
	  }
	  

	  
	  
	 //function to prepare product to add in cart
		  function prepareProductForCart(price,id,name,thumb,productVariation){
			  
			
			  //check if product variation is avilable
			  if(!productVariation || productVariation.length <= 0){
			    	delete productVariation;
			    	productVariation = name;
			    	
			    	
			    }
		  
			//function to update cart on duplicate product	
				
			  if(ctcCartWidgetDuplicateProduct(id, price,productVariation)){

				        var cartReady ='';
					    
				        cartReady += "<tr id='ctcCartWidgetTr"+id+"' class='ctcCartWidgetItem'>";
					    cartReady +="<input class='ctcWidgetProductId' type='hidden' name='productId' value='"+id+"' />";
					    cartReady +="<input  type='hidden' name='productImage' value='"+thumb+"' />";
					    cartReady += "<td class='ctcWidgetCartImageTd' ><img class='ctcWidgetCartProductImage ctcCartImg' src='"+thumb+"' title='"+name+"' /></td>";
					    cartReady += "<input type='hidden' id='ctcWidgetCartProductName-"+id+"' name='productName' value='"+name+"' />";
					    cartReady += "<input type='hidden' id='ctcCartWidgetPrice"+id+"' name='productPrice' value='"+price+"' />";
					    cartReady += "<td id='ctcWidgetCartProductCountDisplay-"+id+"'> 1 </td>" ;
					    cartReady += "<input id='ctcWidgetCartProductCount-"+id+"' type='hidden' class='ctcCartWidgetCount' data-type-price='"+price+"' data-type-id='"+id+"'   name='productCount'  value='1' />";
					    cartReady +="<input id='ctcWidgetCartProductVariation-"+id+"' class='ctcWidgetProductVariation' type='hidden' name='productVariation' value='"+productVariation+":1' />";
					    cartReady += "<td id='ctcWidgetCartProduct"+id+"'><a  href='JavaScript:void(0);' title='' class='ctcWidgetVaritionShowtoolTip' data-type-id='"+id+"' >Variation</a></td>";
					    cartReady +="<td> <span id='ctcWidgetCartProductTotal-"+id+"' >"+addCommas(price)+"</span></td>";
					    cartReady +="<input class='ctcIndividualProductTotal' type='hidden' id='ctcIndividualProductTotal-"+id+"' name='ctcIndividuaProductTotal' value='"+price+"' />";
					    cartReady +="<td><a  class='ctcRemoveWidgetCartItem dashicons-before dashicons-trash' id='ctcRemoveWidgetCartItem"+id+"' data-type-id='"+id+"' href='JavaScriptVoid:(0)'></a> </td>";
					    cartReady += "</tr>";
			  }
			  

			  return cartReady;
		  }
	 
	  //javascript to add product to the cart
	jQuery(document).on('click','.ctcAddToCartLink', function(){
		
		
		
		var price = jQuery(this).attr('data-type-price');
		var id = jQuery(this).attr('data-type-id');
		var name = jQuery(this).attr('data-type-name');
		var thumb = jQuery(this).attr('data-type-thumb');
		var productVariation = jQuery(this).attr('data-type-variation');
		
		//check if empty option is selcted 
		  if(jQuery('#ctcProductSelect-'+id).val() =='emptyOption'){
			  
			  $.ctcOverlayEl({modalMessage:'Please select a product combination first'});
				
				return false;
				
			}
		
		  
		  jQuery('#ctcCartWidgetTable').append(prepareProductForCart(price,id,name,thumb,productVariation));
		

		
		//add grand total on new product add
		ctcCartCalculateTotal();
		
		//check for empty cart on 
		ctcCheckWidgetEmptyCart();

	  return false;	
	});
	
	
	
	/**
	 * 
	 * function to create tooltip cart preview
	 * 
	 */	

		function ctcToolTipCart(){
			
			var cartProductData =jQuery('#ctcProductCartWidgetForm').serializeArray();
			var allItemsHtml = '<tr><th></th><th>Product</th><th>Qty</th><th>Total</th></tr> ';
			var grandTotal = 0;
			
			//one as grand total on widget is not removed
			if(cartProductData.length > 1){
			  
			for(var i in cartProductData){	  
				
				   var itemDivContent ='';
				   var itemDescription = [];
				
			     switch(cartProductData[i]['name']){
			     case 'productImage':
					    	 itemDivContent+= "<tr class='ctcToolTipCartItem' ><td class='ctcToolTipImg'><img src='"+cartProductData[i]['value']+"' title=''/></td>";
			    	 break;
			     case 'productName':
				    	 itemDivContent+= "<td class='ctcToolTipCartName'>"+cartProductData[i]['value']+"</td>";
			    	 break;
			     case 'productCount':
			    	 	 itemDivContent+= "<td class='ctcToolTipCartItemCount'>"+cartProductData[i]['value']+"</td> ";
			    	break;
			     case 'ctcIndividuaProductTotal':	
			    	     itemDivContent+= "<td class='ctcToolTipCartItemTotal'>"+addCommas(parseFloat(cartProductData[i]['value']).toFixed(2))+"</td></tr>";
			    	   grandTotal =  grandTotal+parseFloat(cartProductData[i]['value']);
			    	 break;
			    	
			     }
			   

			     //html for all product cart data grid
			    allItemsHtml +=   itemDivContent;

			     delete(itemDivContent[i]);
			}
			
			  allItemsHtml += '<tr id="ctcToolTipCartTotal"><td colspan="2"> Sub Total :</td><td colspan="2">'+addCommas(grandTotal.toFixed(2))+'</td></td>';
		 }
			return allItemsHtml;
		}	
	
//script to add jquery ui tooltip
jQuery(document).on('mouseenter','.ctcCartToolTip',function(){
	
	jQuery(this).attr('title','Cart Preview');
});
//tooltip for cart

jQuery( function() {
jQuery(document).tooltip({

		 content : function(){

				 
			 var element = jQuery(this);
				 if(element.hasClass('ctcWidgetVaritionShowtoolTip')){
					 
					return jQuery("#ctcWidgetCartProductVariation-"+element.attr('data-type-id')).val();
				 }
				 else if(element.hasClass('ctcPageVaritionShowtoolTip')){
					 
					 return jQuery("#ctcPageCartProductVariation-"+element.attr('data-type-id')).val();
				 }
				 else if(element.hasClass('ctcCartToolTip')){
					 
					return function(){
						
						if(jQuery('#ctcCartWidgetTable tr').length !== 0 ){	
			
							return '<div class="ctcToolTipNavCart"><span><b>Cart Preview </b></span> <table>'+ctcToolTipCart()+'</table></div>';		
					}	
					else{
							
							return "<h5 class='ctcEmptyCartTooltip'> Empty!</h5>";
						}		
							
						
					}
					
				 }
				 else if(element.is('img')){
					 if(element.hasClass('ctcCartImg')){
					 return '<div class="ctcToolTipImg"><h5>'+element.attr('title')+'</h5><img src="'+element.attr('src')+'"/></div>';
					 }
				 }
		 },
		
		 show: {
		        effect: "slideDown",
		        delay: 500
		      },
		      
		  
		      position: {
		    	within:jQuery(this),  
		        my: "center bottom-20",
		        at: "center top",
		        
		        using: function( position, feedback ) {
		          jQuery( this ).css( position );
		          jQuery( "<div>" )
		            .addClass( "arrow" )
		            .addClass( feedback.vertical )
		            .addClass( feedback.horizontal )
		            .appendTo( this );
		        }
		        
		      }
		     
		 
		
		    });
 

});


	
	//function to add select product variation to the cart data type variation
	jQuery(document).on('change','select.ctcProductVariationSelect', function(){
		
		
		var productVariation = jQuery("option:selected", this).val();
		var productId = jQuery(this).attr('data-type-id');
		
		var preOrder = jQuery("option:selected", this).attr('data-type-preorder');
		
		
		
		if(preOrder == 'yes'){
			jQuery('#ctcPreOrderAvilable-'+productId).css('visibility', 'visible');
		}
		else{
			jQuery('#ctcPreOrderAvilable-'+productId).css('visibility', 'hidden');;
		}
		
		  jQuery('.ctcProductSelectClass-'+productId).attr('data-type-variation',productVariation);
		
	});
	

	
	
	
	/**
	 * 
	 * script to create cart for the page
	 * 
	 */
	
	function ctcProductCartPage(){
		
		var cartProductData =jQuery('#ctcProductCartWidgetForm').serializeArray();
		var grandTotal = 0;
		var allItemsHtml = ' ';
		var taxRate = parseFloat(jQuery('#ctcPageCartItemGrid').attr('data-type-tax'));
		var currency = jQuery('#ctcPageCartItemGrid').attr('data-type-currency');
		
		
		//one as grand total on widget is not removed
		if(cartProductData.length > 1){
		  
		for(var i in cartProductData ){	  
			
			   var itemDivContent ='';
			   var itemDescription = [];
			  
		     switch(cartProductData[i]['name']){
		     case 'productId':
		    	 var productId = cartProductData[i]['value'];
		    	       itemDivContent+= "<div id='ctcPageCartItem"+productId+"' class='ctcPageCartItem' >\n";
					   itemDivContent+="<input type='hidden' class='ctcPageCartProductId' name='productId[]' value='"+productId+"'  />\n";
					   
		    	 break;
		     case 'productImage':
				    	 itemDivContent+= "<span class='ctcPageCartImg'><img class='ctcCartImg' src='"+cartProductData[i]['value']+"' title=''/></span>\n";
				    	 itemDivContent+= "<input type='hidden' name='productImage-"+productId+"' value='"+cartProductData[i]['value']+"' />\n";
				    	 
		    	 break;
		     case 'productName':
			    	 itemDivContent+= "<span class='ctcPageCartName'>"+cartProductData[i]['value']+"</span>\n";
			    	 itemDivContent+= "<input type='hidden' name='productName-"+productId+"' value='"+cartProductData[i]['value']+"' />\n";
			    	
		    	
		    	 break;
		     case 'productPrice':
		    	     itemDivContent+= "<span>"+addCommas(cartProductData[i]['value'])+"</span>\n";
		    	     itemDivContent+= "<input type='hidden' name='productPrice-"+productId+"' value='"+cartProductData[i]['value']+"' />\n";
		    	     
		    	 break;
		     case 'productCount':
		    	 	 itemDivContent+= "<span>"+cartProductData[i]['value']+"</span>\n";
		    	 	 itemDivContent+= "<input id='ctcProductCount-"+productId+"' type='hidden' class='ctcPageCartProductCount' name='productCount-"+productId+"' value='"+cartProductData[i]['value']+"' />\n";
		    	 	
		    	break;
		     case 'productVariation':
		    	 	 itemDivContent+= "<span style='display:none;'>"+cartProductData[i]['value']+"</span>\n";
		    	 	 itemDivContent+= "<input type='hidden' id='ctcPageCartProductVariation-"+productId+"' name='productVariation-"+productId+"' value='"+cartProductData[i]['value']+"' />\n";
		    	 	 
		    	 break;
		     case 'ctcIndividuaProductTotal':	
		    	     itemDivContent+= "<span>"+addCommas(parseFloat(cartProductData[i]['value']).toFixed(2))+"</span>\n";
		    	     itemDivContent+= "<input type='hidden' name='productTotal-"+productId+"'  value='"+cartProductData[i]['value']+"'/>\n";
		    	     itemDivContent += "<a  href='JavaScript:void(0);' title='' class='ctcPageVaritionShowtoolTip' data-type-id='"+productId+"' >Variation</a></td>";
		    	     itemDivContent+='<a class="ctcPageCartItemRemove" data-type-id="'+productId+'" href="JavaScript:void(0);"><span class="dashicons dashicons-trash "></span></a></div>';
		    	   
		    	   grandTotal =  grandTotal+parseFloat(cartProductData[i]['value']);

		    	 break;
		    	
		     }
		    
		  
		     
		     //html for all product cart data grid
		     allItemsHtml +=   itemDivContent;

		     delete(itemDivContent[i]);
		}
		
		 

		 var taxAmount  = grandTotal*(taxRate/100);
		 var grandTotalAfterTax =  grandTotal + taxAmount;
		
		 
		 //data for stripe checkout
	     ctcCheckOutAmount = grandTotalAfterTax;
		 ctcDataDescription ='Total Amount : '+grandTotalAfterTax;


		      jQuery(allItemsHtml).hide().appendTo('#ctcPageCartItemGrid').show("normal");
			
			
			jQuery('#ctcPageCartTaxAmount').html(addCommas(taxAmount.toFixed(2)));
			jQuery('#ctcPageCartGrandTotalInput').val(grandTotalAfterTax);
			jQuery('#ctcPageCartGtotal').html(addCommas(grandTotalAfterTax.toFixed(2)));
			
			
			
			
			 ctcCheckWidgetEmptyCart(); 
		
			
		}
		

	
	}

	
	
	
	//script to remove item from product cart page
	jQuery(document).on('click', '.ctcPageCartItemRemove', function(){
		
		var productId = jQuery(this).attr('data-type-id');
		
		if(confirm("Do you want to remove this item from cart?")){
    		
    		
	    	   jQuery( "#ctcCartWidgetTr"+productId).remove();
	    	   jQuery("#ctcPageCartItem"+productId).remove();
	    	   jQuery('#ctcTotalShippingCost').val('0.00');
	       	   jQuery('#ctcShippingcost').empty();
	       	   
	           jQuery('#ctcPromoCodeSaving').val('0.00');
	           jQuery('#ctcSavingAfterPromoCode').empty();
	           jQuery('#ctcCheckOutPromoCode').val('');
	       	   jQuery('#ctcCheckoutPaymentOptions').hide();
	       	   jQuery('#ctcChooseShippingOptions span input').prop('checked', false);
	    	   
	    	 //calcualte and prepend grand total
		    	ctcCartCalculateTotal();
	    	   
		    	//check for empty cart
		    	ctcCheckWidgetEmptyCart();
	    	}
	    	
	    	return false;
		
	});
	

	
	
	
	/**
	 * 
	 * 
	 * script to set cart information in session storage and retrive it too
	 * 
	 * 
	 * 
	 * 
	 */
	
	
	 function setCtcCartLocalStorage(cartContent){
		 
		 localStorage.removeItem("ctcWidgetCartData");
		 localStorage.setItem("ctcWidgetCartData", cartContent);
		
	 }
	 

	
	//function to reinstate cookie on state change of the page
	function ctcReinstateCart(){

		

		var ctcCartData = localStorage.getItem("ctcWidgetCartData");
		
				
			if(ctcCartData)	{
				
				  jQuery("#ctcProductCartWidget").empty();
				  
				  jQuery(ctcCartData).hide().prependTo("#ctcProductCartWidget").show('slow').css('opacity',1);
				  
				  //if product cart page add content to the page
				  if(jQuery('#ctcProductCartPageContent').length){
						
						ctcProductCartPage();
					}
				  
			}
			
			
			
		
		
		
	}
	
//script to deal with customer checkout
	jQuery(document).on('click','.ctcWidgetCartCheckOutbutton',function(event){
		
		var data ={
				
				action:'ctcCustomerWidgetCheckOut',

		}
		
		//alert(response);
		
		jQuery.post(ctc_ajax_url, data , function(response){
		
			if(JSON.parse(response)['notLoggedIn']){
				  $.ctcOverlayEl({modalMessage:JSON.parse(response)['notLoggedIn']});
				
				
			}
			
		  
		});
		
		
		
	});
	
/**
 * 
 * script to show hide check out button
 * 
 */	
	
jQuery(document).on('click', '#ctcCheckOutOptionStripe,#ctcCheckOutOptionCash', function(){
	
	if(jQuery(this).attr('id') === 'ctcCheckOutOptionStripe'){
		jQuery(".stripe-button-el").removeAttr('disabled');
	
		jQuery("#ctcCashCheckoutButton").hide('slow');
			
		jQuery('#ctcStripeCheckoutButton').show("slow");
		
	
	}
	else if(jQuery(this).attr('id') === 'ctcCheckOutOptionCash'){
	
		jQuery(".stripe-button-el").attr('disabled','disabled');
		
			jQuery("#ctcStripeCheckoutButton").hide('slow');
			jQuery('#ctcCashCheckoutButton').show("slow");
	}
	
});


	
/**
 * 
 * script to display and apply shipping cost and time
 * 
 * 
 */


function ctcCalculateShippingTime(deliveryTime){
	var timeNotice = '';

	if( deliveryTime == '1'){
		
		timeNotice = '<font> tomorrow';
	}
	else if(deliveryTime === '0') {
		
		timeNotice = 'today';
		
	}
	else{
		
		timeNotice = ' in '+responseObj['deliveryTime']+' Days';
	}

		
	
	return timeNotice;
}


//function to check for empty field
function ctcCheckEmptyShippingAddress(){
	var requiredField =' ';
	
	jQuery('#ctcShippingAddressZipCode,#ctcShippingAddress1,#ctcShippingAddressCity,#ctcShippingAddressStateProvince,#ctcShippingAddressCountry').each(function(){
		
		 
    	if(jQuery(this).val() === ''){

    		jQuery(this).css('border','1px solid red');
    		requiredField = 'empty';
    		
    	}
    	else{
    		
    		
    		   jQuery(this).removeAttr('style');

    	}
    	
    });
	
	
	
	
	  if(requiredField == 'empty'){
		  $.ctcOverlayEl({modalMessage:'Please fill in required fields, before proceeding.'});
		  
		  
		return false;   
		   
	   }
	  
	  else{
		  
		  return true;
	  }	
		
		

	
}



//function to verify shipping address and calculate shipping cost
 function verifyAddressCalculateShippingCost(shippingRadio){
	
	 jQuery.post(ctc_ajax_url,{'action':'ctcGetUspsApiKey'},function(uspsApiKey){
		
						 shippingStreet1 = jQuery('#ctcShippingAddress1').val();
						 shippingStreet2 = jQuery('#ctcShippingAddress2').val();
						 shippingCity = jQuery('#ctcShippingAddressCity').val();
						 shippingState = jQuery('#ctcShippingAddressStateProvince').val();
						 shippingZip = jQuery('#ctcShippingAddressZipCode').val();
						 shippingCountry = jQuery('#ctcShippingAddressCountry').val();
						 
						
					
						var uspsUrl = 'https://secure.shippingapis.com/ShippingAPI.dll';	 
						
				
						 var  validationData ='API=Verify&XML=<AddressValidateRequest USERID="'+uspsApiKey+'">';
						     validationData +='<Address>';
							 validationData +='<Address1>'+shippingStreet1+'</Address1>'; 
						     validationData +='<Address2>'+shippingStreet2+'</Address2>'; 
						     validationData += '<City>'+shippingCity+'</City>'; 
						     validationData += '<State>'+shippingState+'</State>'; 
						     validationData += '<Zip5>'+shippingZip+'</Zip5> ';
						     validationData += '<Zip4></Zip4>'; 
						     validationData += '</Address>'; 
						     validationData += '</AddressValidateRequest>';
						     
						    
						   
						    	 
							    	
						
						     jQuery.get(uspsUrl, validationData, function(response){
						    	 		    	 
						    	 var addressError = jQuery(response).contents().find("Description").text();
				
							    	if( addressError.length !== 0 ){
					
							    		
							    	
							    		
							    		 jQuery('#ctcCheckoutPaymentOptions,#ctcDisplayShippingCost').hide("normal");
								  	       jQuery('.ctcChooseShippingOption').show("normal");
								  	      jQuery('#ctcShippingOptionUsps').prop('checked', false);
								    	  
								  	      
								  		
								  		$.ctcOverlayEl({modalMessage:"Invalid Address, Please re-check your address again."});
							    		
							    		return false;
							    	}
							    	else{
							    		
							    		
							    	
							    		
							    		jQuery('#ctcShippingAddressCity').val(jQuery(response).contents().find("Address2").text());
							    		jQuery('#ctcShippingAddressCity').val(jQuery(response).contents().find("City").text());
							    		jQuery('#ctcShippingAddressStateProvince').val(jQuery(response).contents().find("State").text());
							    		jQuery('#ctcShippingAddressZipCode').val(jQuery(response).contents().find("Zip5").text());
							    		shippingCountry = jQuery('#ctcShippingAddressCountry').val('USA');
						
							    		
									  	 
									  	 
									  	var i = 0;
								    	var productAndCount = {};
								    	var productId='';
										    	jQuery('.ctcPageCartProductId').each(function(){
						
										    		    productId = jQuery(this).val();
										    		     
										    		     productAndCount[productId] =  jQuery('#ctcProductCount-'+productId).val();
										    		     
										    		   
										    		i++;
										    	});
										    	
										    	
										    	
						
									    	var data = {
									    			
									    			'action':'ctcCalculateShippingCost',
									    			'shippingMethod':'ctcUSPS',
									    			'shippintZipCode':jQuery('#ctcShippingAddressZipCode').val(),
									    			'productAndCount' :  JSON.stringify(productAndCount),
									    	        'shipppingZipcode': jQuery('#ctcShippingAddressZipCode').val()
									    	}
									    	
									    	
									    	//get data from server for calculation of shipping cost
									    	jQuery.post(ctc_ajax_url, data, function(shippingData){
								
									    		    jQuery.get(uspsUrl, shippingData,function(shippingCostInfo){
									    		    	
									    		    	
									    		    	
											    		    	var shippingTotal = 0;
											    		    	
											    		    	
											    		    	
											    		    
											    		    	jQuery(shippingCostInfo).contents().find("Rate").each(function(){
											    		    		shippingTotal = (shippingTotal+parseFloat(jQuery(this).text()));
											    		   
											    		    	});
											    		    	
											    		    	
											    		    	var shippingTime = jQuery(shippingCostInfo).contents().find("MailService").text().split('&lt')[0];
											    		    	
											    		    	jQuery(".ctcCalculateShipingWait").animate({opacity:0},300,function(){jQuery(this).remove()});
											    		    	jQuery('#ctcTotalShippingCost').val(shippingTotal.toFixed(2));
											    		    	jQuery('#ctcShippingcost').empty().prepend(shippingTotal.toFixed(2)+' <font > ('+shippingTime+')</font>');
											    		    	jQuery('#customerShippingOptionInfo').val(shippingTime);
											    		    	
											    		    	
											    		    	 jQuery('#ctcDisplayShippingCostInfo').show();
													    		 jQuery('.ctcUspsShippingCostDisplay').show('normal');
													    		 jQuery('#ctcCheckoutPaymentOptions,#ctcDisplayShippingCost').show("normal");
															  	 jQuery('.ctcChooseShippingOption').hide("normal");
									
											    		    	ctcCartCalculateTotal();
									    		    	
									    		    	
									    		    }).fail(function() {
									    		    	
									    		    	shippingRadio.prop('checked', false);
											    		jQuery('#ctcCheckoutPaymentOptions,#ctcDisplayShippingCost').hide("medium");
											    		jQuery('#ctcUserShippingAddress').slideUp(1500);
									    		        alert( "Shipping could not be calculated at this time \nPlease try again later");
									    		        
									    		        jQuery(".ctcCalculateShipingWait").animate({opacity:0},100,function(){jQuery(this).remove()});
									    				
									    		        
									    		    });
									    		
			
									    		
									    	}).fail(function() {
									    		
									    		shippingRadio.prop('checked', false);
									    		jQuery('#ctcCheckoutPaymentOptions,#ctcDisplayShippingCost').hide("medium");
							    		        alert( "Shipping could not be calculated at this time \nPlease try again later");
							    		        jQuery('#ctcUserShippingAddress').slideUp(1500);
							    		        jQuery(".ctcCalculateShipingWait").animate({opacity:0},100,function(){jQuery(this).remove()});
							    				 
							    		       
							    		    });
									  	
							    	}
						       }).fail(function() {
						    	  
						    	   shippingRadio.prop('checked', false);
						    		jQuery('#ctcCheckoutPaymentOptions,#ctcDisplayShippingCost').hide("medium");
				    		        alert( "Shipping could not be calculated at this time \nPlease try again later");
				    		        jQuery('#ctcUserShippingAddress').slideUp(1500);
				    		        jQuery(".ctcCalculateShipingWait").animate({opacity:0},100,function(){jQuery(this).remove()});
				    				
				    		        
				    		    });
						     
		
						     
					
	     
	 }).fail(function() {
		
		 shippingRadio.prop('checked', false);
 		jQuery('#ctcCheckoutPaymentOptions,#ctcDisplayShippingCost').hide("medium");
	        alert( "Shipping could not be calculated at this time \nPlease try again later");
	        jQuery('#,#ctcUserShippingAddress').slideUp(1500);
	        jQuery(".ctcCalculateShipingWait").animate({opacity:0},100,function(){jQuery(this).remove()});
			
	    });
 }


//ajax for geting shipping cost and time
jQuery(document).on('click','#ctcShippingOptionUsps,#ctcShippingOptionVendor,#ctcShippingOptionPickup',function(){
	
	
	
    
 var shippingRadio = jQuery(this); 
    
 
	if(ctcCheckEmptyShippingAddress()){
	   
	   

		switch(jQuery(this).val()){
		
		    case 'ctcUSPS':
		    	jQuery("#ctcCashPayment").hide(1000);
		    	jQuery(".stripe-button-el").removeAttr('disabled');
		    	jQuery('#ctcCheckOutOptionStripe').prop('checked', true);
				jQuery("#ctcCashCheckoutButton").hide('slow');
				jQuery('#ctcStripeCheckoutButton').show("slow");
		    	jQuery(".ctcCalculateShipingWait").remove();
		    	shippingRadio.parent().append('<font class="ctcCalculateShipingWait dashicons-before dashicons-update"></font>');
		    	jQuery('#ctcUserShippingAddress').slideDown(1500);
		    	verifyAddressCalculateShippingCost(shippingRadio);
		
		       break;
		     
		    case 'ctcVendorShipping':
		    	jQuery("#ctcCashPayment").show(1000);
		    	jQuery(".ctcCalculateShipingWait").animate({opacity:0},300,function(){jQuery(this).remove()});
		    	shippingRadio.parent().append('<font class="ctcCalculateShipingWait dashicons-before dashicons-update"></font>');
		    	jQuery('#ctcUserShippingAddress').slideDown(1500);
		    	jQuery('#ctcCheckoutPaymentOptions,#ctcDisplayShippingCost').show(1000);
			    jQuery('.ctcChooseShippingOption').hide(1000);	
			    
				    	var totalProductCount = 0;
					        jQuery('.ctcPageCartProductCount').each(function(){
					        	totalProductCount = totalProductCount +parseInt(jQuery(this).val());
					
					        });
				    	
				    	var data = {
				    			
				    			'action':'ctcCalculateShippingCost',
				    			'shippingMethod':'ctcVendorShipping',
				    			'productCount' : totalProductCount
				    	}
				    	
				    	jQuery.post(ctc_ajax_url, data, function(response){
				    		
				    		jQuery(".ctcCalculateShipingWait").animate({opacity:0},300,function(){jQuery(this).remove()});
				    		responseObj = JSON.parse(response);
		    	
								    	if(responseObj['deliveryCost'] == '0'){
								   
								    		var shippingTime = ctcCalculateShippingTime(responseObj['deliveryTime']);
								    		 jQuery('#ctcTotalShippingCost').val(responseObj['deliveryCost'].toFixed(2)); 
								    		 jQuery('#ctcShippingcost').animate(
			    	        							{opacity:0},200,function(){jQuery(this).empty()}).animate({opacity:1},200,function(){
			    	    				    	        	
			    	        								jQuery(this).prepend('<font>  Free shipping <font>'+shippingTime+'</font>');
			    	        	
			    	        									});
								    		 jQuery('#customerShippingOptionInfo').val('<font>  Delivers <font>'+shippingTime+'</font>');
								    		 jQuery('#ctcDisplayShippingCostInfo').hide();
								    		
								    	}
								    	else{
								    		var shippingTime = ctcCalculateShippingTime(responseObj['deliveryTime']);
				
								    		  jQuery('#ctcTotalShippingCost').val(responseObj['deliveryCost'].toFixed(2));
								    		  jQuery('#ctcShippingcost').animate(
			    	        							{opacity:0},200,function(){jQuery(this).empty()}).animate({opacity:1},200,function(){
			    	    				    	        	
			    	        								jQuery(this).prepend(responseObj['deliveryCost'].toFixed(2)+'<font>( Delivers '+shippingTime.replace('<font>','')+') </font> ');
			    	        	
			    	        									});
								    	
								    		  jQuery('#customerShippingOptionInfo').val('Delivers '+shippingTime);
								    		  jQuery('#ctcDisplayShippingCostInfo').show();
								    	}	
								    	
								    	
								    	
								    	
								    	ctcCartCalculateTotal();
		    		
				    	}).fail(function() {
				    		
				    		 shippingRadio.prop('checked', false);
				    		jQuery('#ctcCheckoutPaymentOptions,#ctcDisplayShippingCost').hide("normal");
		    		        alert( "Shipping could not be calculated at this time \nPlease try again later");
		    		        jQuery('#ctcUserShippingAddress').slideUp();
		    		        jQuery(".ctcCalculateShipingWait").animate({opacity:0},100,function(){jQuery(this).remove()});
		    				
		    		      
		    		    });
		    		
		    	break;
		    case 'ctcStorePickup':
		    	jQuery("#ctcCashPayment").show(1000);
		    	jQuery(".ctcCalculateShipingWait").animate({opacity:0},100,function(){jQuery(this).remove()});
		    	shippingRadio.parent().append('<font class="ctcCalculateShipingWait dashicons-before dashicons-update"></font>');
		    	jQuery('#ctcUserShippingAddress').slideUp(2000);
		    
		    	jQuery('#ctcCheckoutPaymentOptions,#ctcDisplayShippingCost').show(1500);
			    jQuery('.ctcChooseShippingOption').hide("medium");	
		    	
				    	var data = {
			    			
			    			'action':'ctcCalculateShippingCost',
			    			'shippingMethod':'ctcStorePickup',
			    			'productCount' : totalProductCount
			    	       }
				    	
				    	jQuery.post(ctc_ajax_url, data, function(response){
				    		
				    		jQuery(".ctcCalculateShipingWait").animate({opacity:0},100,function(){jQuery(this).remove()});
				    		responseObj = JSON.parse(response);
				    		
				    	
				    		var shippingTime = ctcCalculateShippingTime(responseObj['deliveryTime']);
				    	        jQuery('#ctcShippingcost').animate(
				    	        							{opacity:0},200,function(){jQuery(this).empty()}).animate({opacity:1},200,function(){
				    	        	
				    	        								jQuery(this).prepend('<font class="ctcShippingPickupTime">You can pick it up '+shippingTime);
				    	        	
				    	        });
				    	        jQuery('#customerShippingOptionInfo').val('<font>You can pick it up '+shippingTime);
				    	        jQuery('#ctcDisplayShippingCostInfo').hide();
				    	}).fail(function() {
				    		
				    		 shippingRadio.prop('checked', false);
				    			jQuery('#ctcCheckoutPaymentOptions,#ctcDisplayShippingCost').hide("medium");
				    			jQuery('#ctcUserShippingAddress').slideUp(1500);
		    		        alert( "Shipping could not be calculated at this time \nPlease try again later");
		    		       
		    		         jQuery(".ctcCalculateShipingWait").animate({opacity:0},100,function(){jQuery(this).remove()});
		    				
		    		       
		    		    });
				    	 jQuery('#ctcTotalShippingCost').val('0.00');
				    	ctcCartCalculateTotal();
		     break;
		
		}
		

	} 
	else{
		 shippingRadio.prop('checked', false);
		jQuery('#ctcCheckoutPaymentOptions,#ctcDisplayShippingCost').hide("medium");
		jQuery('#ctcUserShippingAddress').slideUp(1500);
		 jQuery('.ctcChooseShippingOption').show(1000);
		 
	}

	
});



/**
 * 
 * Script to apply promo code to the products
 * 
 */

jQuery(document).on('click','#ctcApplyPromoCode', function(){
	
	
	var promoCodeButton = jQuery(this);
	var productAndCount = {};
	var productId='';
	    	jQuery('.ctcPageCartProductId').each(function(){

	    		    productId = jQuery(this).val();
	    		     
	    		     productAndCount[productId] =  jQuery('#ctcProductCount-'+productId).val();
	    	});
	
	var data ={
			
		  'action':'ctcApplyPromocode',
		  'productsAndCount': JSON.stringify(productAndCount),
		  'promoCode':jQuery('#ctcCheckOutPromoCode').val()
	}
	

if(data['promoCode'].length != 0){	
	
	promoCodeButton.parent().addClass('ctcAjaxWaitPromoCode');
	jQuery.post(ctc_ajax_url, data, function(response){
		
		promoCodeButton.parent().removeClass('ctcAjaxWaitPromoCode');

		if(!isNaN(response)){
			jQuery('#ctcPromoCodeSaving').val(parseFloat(response).toFixed(2));
			jQuery('#ctcSavingAfterPromoCode').empty().prepend('<span>Discount/Coupon saving : </span><span>'+addCommas(parseFloat(response).toFixed(2))+'</span>');
			
			ctcCartCalculateTotal();
			
		}
		else if(response =='invalidPromoCode'){
			$.ctcOverlayEl({modalMessage:'Coupon code you have entered is invalid.'});
			jQuery('#ctcCheckOutPromoCode').val('');
			
		}
		else{
			
			
			jQuery('#ctcCheckOutPromoCode').val('');
			$.ctcOverlayEl({modalMessage:"Coupon does not apply to any of the products in cart."});
		}
	}).fail(function() {

        alert( "Discount could not be calculated at this time \nPlease try again later");
  
    });
}
	
});
	
/**
 * 
 * This section deals with thumbs and thumbs down rating
 * 
 * 
 */



	//function add substract thumup and thumbdown based on server respose
	function ctcAddSubstractThumbupThumbdon(productId,action,scenario){
		
		switch(action){
			case 'thumbsUp':
			  var ratingUpElem =   jQuery('.ctcThumbsUpCount-'+scenario+'-'+productId);
			  var ctcNewThumbsUpCount = parseInt(ratingUpElem.attr('data-type-thumupcount'))+1;  
			  ratingUpElem.empty().text(addCommas(ctcNewThumbsUpCount)).attr('data-type-thumupcount',ctcNewThumbsUpCount);
			  break;
			case 'thumbsDown':
				ratingDownElem = jQuery('.ctcThumbsDownCount-'+scenario+'-'+productId);
				 var ctcNewThumbsDownCount = parseInt(ratingDownElem.attr('data-type-thumdowncount'))+1;
				 ratingDownElem.empty().text(addCommas(ctcNewThumbsDownCount)).attr('data-type-thumdowncount',ctcNewThumbsDownCount);
				 
			  
			  break;
			case 'thumbsUpReversed':
				 var ratingUpElem = jQuery('.ctcThumbsUpCount-'+scenario+'-'+productId);
				 var ratingDownElem = jQuery('.ctcThumbsDownCount-'+scenario+'-'+productId);
				 var ctcNewThumbsUpCount = parseInt(ratingUpElem.attr('data-type-thumupcount'))-1;
				 var ctcNewThumbsDownCount = parseInt(ratingDownElem.attr('data-type-thumdowncount'))+1;
				 
				 ratingUpElem.empty().text(addCommas(ctcNewThumbsUpCount)).attr('data-type-thumupcount',ctcNewThumbsUpCount);
				 ratingDownElem.empty().text(addCommas(ctcNewThumbsDownCount)).attr('data-type-thumdowncount',ctcNewThumbsDownCount);
	
			  break;
			 
			case 'thumbsDownReversed':
				 var ratingUpElem = jQuery('.ctcThumbsUpCount-'+scenario+'-'+productId);
				 var ratingDownElem = jQuery('.ctcThumbsDownCount-'+scenario+'-'+productId);
				 var ctcNewThumbsUpCount = parseInt(ratingUpElem.attr('data-type-thumupcount'))+1;
				 var ctcNewThumbsDownCount = parseInt(ratingDownElem.attr('data-type-thumdowncount'))-1;
				
				 ratingUpElem.empty().text(addCommas(ctcNewThumbsUpCount)).attr('data-type-thumupcount',ctcNewThumbsUpCount);
				 ratingDownElem.empty().text(addCommas(ctcNewThumbsDownCount)).attr('data-type-thumdowncount',ctcNewThumbsDownCount);
				
			  break;	
			case 'unThumbsUp':
				 var ratingUpElem = jQuery('.ctcThumbsUpCount-'+scenario+'-'+productId);
				  var ctcNewThumbsUpCount = parseInt(ratingUpElem.attr('data-type-thumupcount'))-1; 
				  ratingUpElem.empty().text(addCommas(ctcNewThumbsUpCount)).attr('data-type-thumupcount',ctcNewThumbsUpCount);;
			  break;
			case 'unThumbsDown':
				 var ratingDownElem = jQuery('.ctcThumbsDownCount-'+scenario+'-'+productId);
				 var ctcNewThumbsDownCount = parseInt(ratingDownElem.attr('data-type-thumdowncount'))-1;
				 ratingDownElem.empty().text(addCommas(ctcNewThumbsDownCount)).attr('data-type-thumdowncount',ctcNewThumbsDownCount);
				 
			  
			  break;
		  
		}
	}
	
	
	//function to update Rating based on server response
	function ctcUpdateRatingBasedOnResult(serverResponse,productId,scenario){
			switch(serverResponse){
			      case 'thumbsUp':
			    	 jQuery('.ctcRating-'+productId+'-1').attr('title','You already thumbed up this product').animate({'font-size':'25px'},25, function(){jQuery(this).removeClass('ctcThumbDown').addClass('ctcUserThumbUp')});
			    	 ctcAddSubstractThumbupThumbdon(productId,'thumbsUp',scenario);
			        break;
			      case 'thumbsDown':
			    	  jQuery('.ctcRating-'+productId+'-2').attr('title','You already thumbed down this product').animate({'font-size':'25px'},25, function(){jQuery(this).removeClass('ctcThumbUp').addClass('ctcUserThumbDown')}); 
			    	  ctcAddSubstractThumbupThumbdon(productId,'thumbsDown',scenario);
				  break;	
			      case 'thumbsUpReversed':
			    	  jQuery('.ctcRating-'+productId+'-1').attr('title','Thumbs Up').animate({'font-size':'20px'},25, function(){jQuery(this).removeClass('ctcUserThumbUp').addClass('ctcThumbUp')});
			    	  jQuery('.ctcRating-'+productId+'-2').attr('title','You already thumbed down this product').animate({'font-size':'25px'},25, function(){jQuery(this).removeClass('ctcThumbDown').addClass('ctcUserThumbDown')}); 
			    	  ctcAddSubstractThumbupThumbdon(productId,'thumbsUpReversed',scenario);
			        break;
			      case 'thumbsDownReversed':
			    	  jQuery('.ctcRating-'+productId+'-2').attr('title','Thumbs Down').animate({'font-size':'20px'},25,function(){jQuery(this).removeClass('ctcUserThumbDown').addClass('ctcThumbDown')});
			    	  jQuery('.ctcRating-'+productId+'-1').attr('title','You already thumbed up this product').animate({'font-size':'25px'},25, function(){jQuery(this).removeClass('ctcThumbUp').addClass('ctcUserThumbUp')});
			    	  ctcAddSubstractThumbupThumbdon(productId,'thumbsDownReversed',scenario);
			        break;
			      case 'unThumbsUp':
			    	  ctcAddSubstractThumbupThumbdon(productId,'unThumbsUp',scenario);
			    	  jQuery('.ctcRating-'+productId+'-1').attr('title','Thumbs Up').animate({'font-size':'20px'},25, function(){jQuery(this).removeClass('ctcUserThumbUp').addClass('ctcThumbUp')});
			    	 break;
			      case 'unThumbsDown':
			    	  ctcAddSubstractThumbupThumbdon(productId,'unThumbsDown',scenario);
			    	  jQuery('.ctcRating-'+productId+'-2').attr('title','Thumbs Down').animate({'font-size':'20px'},25,function(){jQuery(this).removeClass('ctcUserThumbDown').addClass('ctcThumbDown')});
			    	break;  
			    	  
			   }
	}
	
	//ajax function add thumbs up or thumbs down
	jQuery(document).on('click', '.ctcThumbUp,.ctcThumbDown,.ctcUserThumbUp,.ctcUserThumbDown', function(event){
		
		var scenario = jQuery(this).attr('data-type-scenario');
		var data = {
				
				'action' : 'ctcUserProductRating',
				'productId' : jQuery(this).attr('data-type-id'),
				'rating' : jQuery(this).attr('data-type-rating')
		}
		
		
		jQuery.post(ctc_ajax_url, data , function(response){
			
			if(response === 'notLoggedIn' ){
				$.ctcOverlayEl({modalMessage:'You need to log in to rate this product.'});
				
				
				event.preventDefault();
				return false;
				
			}
			else{

				ctcUpdateRatingBasedOnResult(response, data['productId'], scenario);
				
			}
			
			
			
		}).fail(function() {

	        alert( "Action could not be completed at this time \nPlease try again later");
	  
	    });
		
	});
		
	/*
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * script for product page overlay functionalities
	 * 
	 * 
	 */
	
	
	

if(jQuery('.ctcSingleProductGallery').length>=1){
		jQuery('.ctcSingleProductGallery').ctcOverlay();
		
		
		
	    jQuery(document).on('click','.ctcProductProfileImage',function(){
	    	
	    	if(jQuery('.ctcverlayImages'))
	    	jQuery('.ctcSingleProductGallery').trigger('mouseenter');
	    	jQuery("img[data-img-number='0']").trigger('click');
	    });
}
else{
	
	jQuery('.ctcProductProfileImage').ctcOverlay();
}




	

	
/*
 * 
 * section to sort products
 * 
 */	

 //script to sort products
	jQuery(document).on('change','#ctcSortProductSelect', function(){
		
		
		var parentContainer = jQuery(this).attr('data-type-containertosort');
		var selecElement = jQuery(this);
		
		var ajaxSort = jQuery(this).attr('data-type-ajaxsort');
		
		var sortBy = jQuery("option:selected", this).val();
		var sortableItems = jQuery('>div',parentContainer);
	
		
		
		
			if( ajaxSort === "yes" && selecElement.attr('data-type-allproduct')===undefined ){
				
				jQuery(this).parent().addClass('ctcShowAjaxWait');
				
				
				 jQuery.post(ctc_ajax_url,{'action':'ctcAjaxSortProduct'},function(response){
					 
					 jQuery('#ctcSortProductSelect').parent().removeClass('ctcShowAjaxWait');
					jQuery(parentContainer).prepend(response);
					ctcSortProductBySelection(sortBy,parentContainer,jQuery('>div',parentContainer));
					selecElement.attr('data-type-allproduct','yes');
					 
					return false;
				 }).fail(function() {

				        alert( "Action could not be completed at this time \nPlease try again later");
				  
				    });
				
			}	
			else{  	
				if(sortBy.length>=1 && sortableItems.length>=2){
					
					
					
					ctcSortProductBySelection(sortBy,parentContainer,sortableItems);
					
				}
			}
				
	});
	
//function t0 switch among the products	to sort them
function ctcSortProductBySelection(sortBy,parentContainer,sortableItems){
	switch(sortBy){
	case 'mostThumbUp':
		var productArrayThumbUp = [];
		sortableItems.each(function(){
				var thisDiv = jQuery(this);

				productArrayThumbUp.push([thisDiv.attr('data-type-id'),parseInt(thisDiv.attr('data-type-thumbup')),thisDiv.wrap('<p/>').parent().html()]);
				
			});
	
		       ctcSortArrayAndAppend(productArrayThumbUp,parentContainer,'desc');			
		break;
	case 'priceLowest':
				var productArrayPrice = [];
				sortableItems.each(function(){
					
					var thisDiv = jQuery(this);
					
					productArrayPrice.push([thisDiv.attr('data-type-id'),parseFloat(thisDiv.attr('data-type-price')),thisDiv.wrap('<p/>').parent().html()]);
					
				});
				ctcSortArrayAndAppend(productArrayPrice,parentContainer,'asc')
		break;
	case 'priceHighest':
		var productArrayPrice = [];
				sortableItems.each(function(){
			
				var thisDiv = jQuery(this);
				
				productArrayPrice.push([thisDiv.attr('data-type-id'),parseFloat(thisDiv.attr('data-type-price')),thisDiv.wrap('<p/>').parent().html()]);

		  });
				ctcSortArrayAndAppend(productArrayPrice,parentContainer,'desc')
		break;
	case 'addedDate':
		var productArrayAddedDate = [];
		sortableItems.each(function(){
			var thisDiv = jQuery(this);
			productArrayAddedDate.push([thisDiv.attr('data-type-id'),parseInt(thisDiv.attr('data-type-dateadded')),thisDiv.wrap('<p/>').parent().html()]);
			
		});

		ctcSortArrayAndAppend(productArrayAddedDate,parentContainer,'desc')
		break;
	}
	
}	
	
 //function to sort products by thumb up
	function ctcSortArrayAndAppend(productArrayToSort,parentContainer,sortType){
		
	
		var sortedHtml = '';
		  
		
		if(sortType=='asc'){	
			  productArrayToSort.sort((a, b) => a[1] - b[1]);//function(a,b){return a[1]-b[1]});
			  
			 
		  }
		  else{
			   productArrayToSort.sort((a, b) => b[1] - a[1]);//function(a,b){return b[1]-a[1]});
			   
			  
	   
		  }
		
		for(var key in  productArrayToSort){
			  
			   sortedHtml +=	productArrayToSort[key][2];
			   	
			  }
		
		
		
		jQuery(parentContainer).empty().append(sortedHtml).masonry('reloadItems');
		//remove duplicate id
		  
		 
		
		// init Masonry
		  var $grid  = jQuery(parentContainer).masonry({
			  transitionDuration: '0.7s',
			  stagger: 20,
			  fitWidth: true,
			  gutter:9,
			  percentPosition: true,
			 originLeft: false,
			  isFitWidth: true,
			  
			  
		  });
		  
		 
		  $grid.imagesLoaded().progress().always( function( instance ) {
			  
			  jQuery('[id]').each(function (i) {
				    jQuery('[id="' + this.id + '"]').slice(1).remove();
			 });
			  
		 $grid.masonry('appended', sortedHtml);
		  $grid.masonry('layout');

	});

	}
	

//script to load comment
	jQuery(document).on('click','#ctcLoadMoreReview',function(){
		var timeInterval;
		var loadReviewLink = jQuery(this);
		var reviewOffSet = parseInt(loadReviewLink.attr('data-type-offset'));
		var totalReview = parseInt(loadReviewLink.attr('data-type-totalreview'));
		var data = {
				
				'action':'ctcLoadMoreReview',
				'offSet': reviewOffSet,
				'postId':jQuery(this).attr('data-type-postId')
		}
		
	jQuery.post(ctc_ajax_url,data,function(response){
			
		if((reviewOffSet+3)>=totalReview){
			
			loadReviewLink.remove();
		}
		else{
			loadReviewLink.attr('data-type-offset',(reviewOffSet+3));
		}
		
	    var reviewHtml=[];
	    
		 jQuery(response).filter('div').each(function(i){
	
			 reviewHtml[i]= jQuery(this).addClass('ctcSecondReview').html();
		
		  });
			
		 jQuery('.ctcProductReviews').append(reviewHtml[0]);
		 setTimeout(function(){jQuery('.ctcProductReviews').append(reviewHtml[1]) }, 500);
		 setTimeout(function(){jQuery('.ctcProductReviews').append(reviewHtml[2]) }, 1000);
		
			
		}).fail(function() {

	        alert( "Action could not be completed at this time \nPlease try again later");
	  
	    });
		
		
	});
	
	
//script load subcategories fro catgory widget
jQuery(document).on('click','.ctcWidgetCategory', function(){
	
	var el = jQuery(this).parent().children('ul');
	var categoryUrl = jQuery(this).attr("data-category-url")
	var data = {
			
			'action':'ctcWidgetLoadSubcategory',
			'categoryName' : jQuery(this).attr('data-product-categoryname')
	}
	
		if(el.children('li').length===0){
			jQuery.post(ctc_ajax_url,data,function(response){
				
		     if(response.length===0){	
		    	 
		    	 window.location.href = categoryUrl;
		     }
		     else{
				el.empty();
				 jQuery(response).filter('li').each(function(i){
					var subCatHtml = '<li>'+jQuery(this).html()+'</li>';
					 setTimeout(function(){el.append(subCatHtml)},(600*i));
				});
		     }
			}).fail(function() {
		
		        alert( "Action could not be completed at this time \nPlease try again later");
		  
		    });
		}
		else{
			el.slideToggle("slow");
			
		}	
});	
/**
 * 
 * do not write code beyond 
 * 
 */	 
	 
 });
