<?php
/**
 * 
 * @author UjW0L
 * 
 */
/*Main class to run all of the ctCommerce functionality*/
require_once 'ctCommerceAdminHtml.php';
require_once 'ctCommerceRegisterSettings.php';
require_once 'ctCommerceAdminPanelAjax.php';
require_once 'ctCommercePluginADU.php';
require_once 'ctCommerceAdminPanelProcessing.php';
require_once 'ctCommerceFrontendAjax.php';
require_once 'ctCommerceFrontendProcessing.php';
require_once('otherContent/payment/stripe-php/init.php');




class ctCommerceMain{
 
    
    
    public function __construct(){
       
    	self::ctcAllRequiredHooksActions();

    }
    
    
    /**
     * 
     * 
     * add all reauired hooks to run aplication to be added on constructor
     * 
     */
    
    private function ctcAllRequiredHooksActions(){
    	//required action hooks
    	self::ctcAllRequiredWpActions();
    	
    	//all required shortcode hooks
    	self::ctcAddRequiredShort();
    	
    	//required actions to run ajax for admin section
    	self::ctcAdminAjaxRequiredAction();
    	
    	//required actions to run ajax on frontend
    	self::ctcFrontendAjaxRequiredAction();
    	
    	//required filters like modification of nav bar
    	self::ctcAddRequiredFilters();
    	
    	
    	
    }
    
    //function to add wordpress required actions for plugin
    private function ctcAllRequiredWpActions(){
        
        $ctcRegisterSetting = new ctCommerceRegisterSettings();
        $ctcAdminPanelProcessing = new ctCommerceAdminPanelProcessing();
        $ctcAdminPanelHtml = new ctCommerceAdminHtml();
        
        add_action('admin_menu', array($this, 'ctcAdminMenu'));
        add_action( 'admin_enqueue_scripts', array($this,'ctcAdminEnequeJs' ));
        add_action('admin_enqueue_scripts', array($this, 'ctcAdminEnequeCss'));
        add_action( 'wp_enqueue_scripts', array($this,'ctcFrontendEnqeueCss') );
        add_action( 'wp_enqueue_scripts', array($this, 'ctcFrontendEnequeJs') );
        add_action('admin_init',array($ctcRegisterSetting ,'ctcRegisterRequiredSettings'));
        add_action( 'phpmailer_init', array($ctcAdminPanelProcessing,'ctcSmtpSetting' ));
        add_filter('the_category',array($ctcAdminPanelProcessing,'ctcCategoryFilter'),10,2);
        add_action( 'admin_notices', array($ctcAdminPanelHtml,'ctcThemeNotice') );
    

    }
    
   
     
    
    /**
     * 
     * 
     * 
     * All of the action rquired to run ajax functionality in admin panel
     * 
     * 
     */
   
    //function to add ajax handles required for admin panel 
    private function ctcAdminAjaxRequiredAction(){
        
        
        $ctcAdminRequiredAjax = new ctCommerceAdminPanelAjax();
       
        add_action( 'wp_ajax_ctcDeactivatePlugin', array($ctcAdminRequiredAjax,'ctcDeactivatePlugin' ));
        add_action( 'wp_ajax_ctcCreateBusinessPage', array($ctcAdminRequiredAjax,'ctcCreateBusinessPage' ));
        add_action( 'wp_ajax_ctcAddProductCategory', array($ctcAdminRequiredAjax,'ctcAddProductCategory' ));
        add_action( 'wp_ajax_ctcGetCategoryUpdateForm', array($ctcAdminRequiredAjax,'ctcGetCategoryUpdateForm' ));
        add_action( 'wp_ajax_ctcUpdateProductCategory', array($ctcAdminRequiredAjax,'ctcUpdateProductCategory' ));
        add_action( 'wp_ajax_ctcDeleteProductCategory', array($ctcAdminRequiredAjax,'ctcDeleteProductCategory' ));
        add_action( 'wp_ajax_ctcGetSubCategoriesList', array($ctcAdminRequiredAjax,'ctcGetSubCategoriesList' ));
        add_action( 'wp_ajax_ctcAddProduct', array($ctcAdminRequiredAjax,'ctcAddProduct' ));
        add_action('wp_ajax_ctcGetProductUpdateForm', array($ctcAdminRequiredAjax, 'ctcGetProductUpdateForm'));
        add_action('wp_ajax_ctcUpdateProduct' , array($ctcAdminRequiredAjax, 'ctcUpdateProduct'));
        add_action('wp_ajax_ctcPurgeProduct' , array($ctcAdminRequiredAjax, 'ctcPurgeProduct'));
        add_action('wp_ajax_ctcPutBackPurgedProduct' , array($ctcAdminRequiredAjax, 'ctcPutBackPurgedProduct'));
        add_action('wp_ajax_ctcRemovePurgedProduct' , array($ctcAdminRequiredAjax, 'ctcRemovePurgedProduct'));
        
        add_action('wp_ajax_ctcAddProductDiscount' , array($ctcAdminRequiredAjax, 'ctcAddProductDiscount'));
        add_action('wp_ajax_ctcGetDiscountUpdateForm',array($ctcAdminRequiredAjax,'ctcGetDiscountUpdateForm'));
        add_action('wp_ajax_ctcUpdateProductDiscount',array($ctcAdminRequiredAjax,'ctcUpdateProductDiscount'));
        add_action('wp_ajax_ctcDeleteDiscount', array($ctcAdminRequiredAjax,'ctcDeleteDiscount'));
        add_action('wp_ajax_ctcCompleteOrder', array($ctcAdminRequiredAjax,'ctcCompleteOrder'));
        add_action('wp_ajax_ctcUpdatePendingOrderNotification', array($ctcAdminRequiredAjax,'ctcUpdatePendingOrderNotification'));
        add_action('wp_ajax_ctcDisplayRefundForm', array($ctcAdminRequiredAjax,'ctcDisplayRefundForm'));
        add_action('wp_ajax_ctcProcessRefund', array($ctcAdminRequiredAjax,'ctcProcessRefund'));
        add_action('wp_ajax_ctcCancelPendingOrder', array($ctcAdminRequiredAjax,'ctcCancelPendingOrder'));
        add_action('wp_ajax_ctcProductBarForChart', array($ctcAdminRequiredAjax,'ctcProductBarForChart'));
        add_action('wp_ajax_ctcAjaxSalesReport', array($ctcAdminRequiredAjax,'ctcAjaxSalesReport'));
       
        
        
        
       
    }


    
    /**
     * Enqeue scripts and css for admin panel and frond end.
     *
     */
    /*function to eneque admin panel javascript file */
    public function ctcAdminEnequeJs(){
        wp_enqueue_script('ctcGalleryOverlayJs',plugin_dir_url( __DIR__ ).'js/ctc_gallery_overlay.js');
        wp_enqueue_script('ctcAdminPanelJs',plugin_dir_url( __DIR__ ).'js/ctcAdminPanel_script.js', array('jquery'));
        wp_enqueue_script('ctcOverlayJq',plugin_dir_url( __DIR__ ).'js/ctc_overlay.jquery.js', array('jquery'));
        wp_enqueue_script('jquery-masonry');
        wp_enqueue_script('imagesloaded');
        wp_enqueue_media();
      
    }
    
    
    /**
     * 
     * eneqeue scripts and stylesheets for front end
     * 
     */
    /*function to enqeue admin panel style sheet */
    public function ctcAdminEnequeCss(){
        wp_enqueue_style( 'ctcGalleryOverlayCss', plugin_dir_url( __DIR__ ).'css/ctc_gallery_overlay_style.css');
        wp_enqueue_style( 'ctcAdminPanelCss', plugin_dir_url( __DIR__ ).'css/ctcAdminPanel_style.css');
        wp_enqueue_style( 'ctcOverlayCss', plugin_dir_url( __DIR__ ).'css/ctc_overlay_style.css');
      
    }
    
    /*function to enqeue   javascript in frontend*/
    public function ctcFrontendEnequeJs(){
        wp_enqueue_script('ctcGalleryOverlayJs',plugin_dir_url( __DIR__ ).'js/ctc_gallery_overlay.js');
        wp_enqueue_script('ctcFrontendlJs', plugin_dir_url(__DIR__ ).'js/ctcFrontend_script.js', array('jquery'));
        wp_enqueue_script('ctcOverlayJq',plugin_dir_url( __DIR__ ).'js/ctc_overlay.jquery.js', array('jquery'));
        wp_localize_script( 'ctcFrontendlJs', 'ctc_ajax_url', admin_url( 'admin-ajax.php' ) );
        wp_enqueue_script('jquery-masonry');
        wp_enqueue_script('imagesloaded');
        wp_enqueue_media();
        wp_enqueue_script( 'jquery-ui-tooltip' );

        wp_enqueue_script('ctcStripeCheckoutJs',"https://checkout.stripe.com/checkout.js");
        $stripPubKey = '1' == get_option('ctcStripeTestMode') ? get_option( 'ctcStripeTestPublishableKey' ) : get_option( 'ctcStripeLivePublishableKey' );

        wp_localize_script('ctcFrontendlJs', 'ctcStripeParams', array(
                                                                       'ctcStripePubKey' =>    $stripPubKey,
                                                                       'ctcStripeName' => get_option('ctcEcommerceName'),
                                                                       'ctcStripeLogo' => get_option('ctcBusinessLogoDataImage'),
                                                                       'ctcStripeCurrency' => strtoupper( get_option('ctcBusinessCurrency') ),
                                                                       'ctcStripeEmail' => wp_get_current_user()->user_email,
                                                                       'ctcStripeDescription'=> "Shopping at ".get_option('ctcEcommerceName')
                                                                            ));

    }
    
    /* function to eneque fontend style sheets*/
    public function ctcFrontendEnqeueCss(){
        wp_enqueue_style( 'ctcGalleryOverlayCss', plugin_dir_url( __DIR__ ).'css/ctc_gallery_overlay_style.css');
        wp_enqueue_style( 'ctcFrontendCss', plugin_dir_url( __DIR__ ).'css/ctcFrontend_style.css');            
        wp_enqueue_style( 'dashicons' );
        wp_enqueue_style( 'ctcOverlayCss', plugin_dir_url( __DIR__ ).'css/ctc_overlay_style.css');
    }
    
    
    /**
     * Admin admin section admin bar
     *
     */
    
    //function to display admin menu
    public function ctcAdminMenu(){
        global $wpdb;
        $ctcAdminHtml = new ctCommerceAdminHtml();
       
        
        if ( is_admin()):
        
        $notification =  $ctcAdminHtml->ctcDisplayNotificationPendingOrder();
	                
	                
	             add_menu_page( 'CT Commerce',
	             		        'CT Comm '.$notification,
                                'administrator',
                                'ctCommerceAdminPanel',
                                array($ctcAdminHtml, 'ctcAdminPanelContent'),
                                'dashicons-store',
                                '2');
        
        endif;
        

  
    }
    
    
    /**
     * 
     * 
     * 
     * 
     * This section contains functionalities for front end
     * 
     * 
     * 
     * 
     * 
     * 
     */
    
    //function to add required shortcodes
    
    private function ctcAddRequiredShort(){
    	$ctcFrontEndHtml = new ctCommerceFrontendContent();
    	add_shortcode( 'ctcMainStorePage', array($ctcFrontEndHtml,'ctcStoreFrontPage'));
    	add_shortcode( 'ctcDisplayProductCategories', array($ctcFrontEndHtml,'ctcDisplayProductCategories') );
    	add_shortcode('ctcDisplaySingleCategory', array($ctcFrontEndHtml,'ctcDisplaySingleCategory'));
    	add_shortcode('ctcDisplaySingleProduct', array($ctcFrontEndHtml,'ctcDisplaySingleProduct'));
    	add_shortcode('ctcDisplayProductCart', array($ctcFrontEndHtml,'ctcDisplayProductCart'));
    	add_shortcode('ctcPurchaseConfirmation', array($ctcFrontEndHtml,'ctcPurchaseConfirmation'));
    	add_shortcode('ctcProductAndCategoryMetaTag', array($ctcFrontEndHtml,'ctcProductAndCategoryMetaTag'));
    	add_shortcode('ctcDisplayDiscountProducts', array($ctcFrontEndHtml,'ctcDisplayDiscountProducts'));
    	add_shortcode('ctcGetPostAddToCart', array($ctcFrontEndHtml,'ctcGetPostAddToCart'));
    	add_shortcode('ctcGetPostRating', array($ctcFrontEndHtml,'ctcGetPostRating'));
    	add_shortcode('ctcPostSocialbarSharing', array($ctcFrontEndHtml,'ctcPostSocialbarSharing'));
    	add_shortcode('ctcPostGalleryOverlay', array($ctcFrontEndHtml,'ctcPostGalleryOverlay'));
    	
    }
    
    //function to add required filters
    private function ctcAddRequiredFilters(){
    	$ctcFrontEndHtml = new ctCommerceFrontendContent();
    	$ctcFrontendProcessing = new ctCommerceFrontendProcessing();
    	
    	
    	add_action('init', array($ctcFrontendProcessing,'ctcHideAdminBarCtcUser') );
    	add_action('init', array($ctcFrontendProcessing ,'ctcBlockCtcuserDashboard'));
    	add_filter('comment_post_redirect', array($ctcFrontendProcessing ,'redirect_after_comment'));
    	
    	add_action('wp_footer', array($ctcFrontEndHtml,'ctcHiddenCart'));
    	
    }
    
   
   //function to add handle ajax request on front end
    private function ctcFrontendAjaxRequiredAction(){
    	$ctcFrontendAjax = new ctCommerceFrontendAjax();
    	
    	add_action( 'wp_ajax_nopriv_ctcGetUserRegistrationForm',array($ctcFrontendAjax,'ctcGetUserRegistrationForm'));
    	add_action( 'wp_ajax_ctcGetUserRegistrationForm',array($ctcFrontendAjax,'ctcGetUserRegistrationForm'));
    	add_action( 'wp_ajax_ctcRegisterUser',array($ctcFrontendAjax,'ctcRegisterUser'));
    	add_action( 'wp_ajax_nopriv_ctcRegisterUser',array($ctcFrontendAjax,'ctcRegisterUser'));
    	add_action('wp_ajax_ctcGetUserInfoUpdateForm', array($ctcFrontendAjax ,'ctcGetUserInfoUpdateForm'));
    	add_action('wp_ajax_nopriv_ctcGetUserInfoUpdateForm', array($ctcFrontendAjax ,'ctcGetUserInfoUpdateForm'));
    	add_action('wp_ajax_ctcUpdateUserInfo', array($ctcFrontendAjax ,'ctcUpdateUserInfo'));
    	add_action('wp_ajax_nopriv_ctcUpdateUserInfo', array($ctcFrontendAjax ,'ctcUpdateUserInfo'));
    	add_action('wp_ajax_ctcUserProductRating', array($ctcFrontendAjax ,'ctcUserProductRating'));
    	add_action('wp_ajax_nopriv_ctcUserProductRating', array($ctcFrontendAjax ,'ctcUserProductRating'));
    	add_action('wp_ajax_ctcAddNewFeaturedProducts', array($ctcFrontendAjax ,'ctcAddNewFeaturedProducts'));
    	add_action('wp_ajax_nopriv_ctcAddNewFeaturedProducts', array($ctcFrontendAjax ,'ctcAddNewFeaturedProducts'));
    	add_action('wp_ajax_ctcCalculateShippingCost', array($ctcFrontendAjax ,'ctcCalculateShippingCost'));
    	add_action('wp_ajax_nopriv_ctcCalculateShippingCost', array($ctcFrontendAjax ,'ctcCalculateShippingCost'));
    	add_action('wp_ajax_ctcGetUspsApiKey', array($ctcFrontendAjax ,'ctcGetUspsApiKey'));
    	add_action('wp_ajax_nopriv_ctcGetUspsApiKey', array($ctcFrontendAjax ,'ctcGetUspsApiKey'));
    	add_action('wp_ajax_ctcApplyPromocode', array($ctcFrontendAjax ,'ctcApplyPromocode'));
    	add_action('wp_ajax_nopriv_ctcApplyPromocode', array($ctcFrontendAjax ,'ctcApplyPromocode'));
    	add_action('wp_ajax_ctcAjaxSortProduct', array($ctcFrontendAjax ,'ctcAjaxSortProduct'));
    	add_action('wp_ajax_nopriv_ctcAjaxSortProduct', array($ctcFrontendAjax ,'ctcAjaxSortProduct'));
    	add_action('wp_ajax_ctcLoadMoreReview', array($ctcFrontendAjax ,'ctcLoadMoreReview'));
    	add_action('wp_ajax_nopriv_ctcLoadMoreReview', array($ctcFrontendAjax ,'ctcLoadMoreReview'));
    	add_action('wp_ajax_ctcWidgetLoadSubcategory', array($ctcFrontendAjax ,'ctcWidgetLoadSubcategory'));
    	add_action('wp_ajax_nopriv_ctcWidgetLoadSubcategory', array($ctcFrontendAjax ,'ctcWidgetLoadSubcategory'));

    	
    }
   
   
 
    
    
    
    
    
    
    
}

