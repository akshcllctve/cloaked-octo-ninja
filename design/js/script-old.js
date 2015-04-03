jQuery(document).ready(function(){
    $('input.wishlist').val('+ Wishlist');

    /* GROUP MODULES / BACK BUTTONS
    --------------------------------------------------- */
     /* Single product e.g. Men-s-Leather-Jacket.html */
    var back_to_list=$(".back_to_list");
    back_to_list.html(back_to_list.text().replace("Back to List"," <span class='icon-double-angle-left i_left'></span> Back to List"));

    /* account.php?m=change_shipping */
    var btn_back=$(".btn-back");
    btn_back.html(btn_back.text().replace("Back to My Account"," <span class='i_left icon-double-angle-left'></span> Back to My Account"));

    /* login.php?m=password&email= */
    var btn_login=$(".password .btn-login");
    btn_login.html(btn_login.text().replace("Return to Login"," <span class='i_left icon-double-angle-left'></span> Return to Login"));
    
    /* GROUP PAGE / SHOPPING CART (EMPTY) >> cart.php?m=view
    --------------------------------------------------- */
    var continue_shopping=$(".continue-shopping.btn");
    continue_shopping.html(continue_shopping.text().replace("Continue Shopping","<span class='i_left icon-double-angle-left'></span> Continue Shopping"));

    /* GROUP PAGE / MY ACCOUNT / WISHLIST >> account.php?m=wishlist_view
    --------------------------------------------------- */
    var wishlist=$(".btn-wishlist");
    wishlist.html(wishlist.text().replace("Add to Wishlist","<span class='i_left icon-heart'></span> Add to Wishlist"));

    /* GROUP PAGE / LOGIN REMINDER
    --------------------------------------------------- */
    $("label:contains('*')").addClass("js_req_required_field");

    /* GROUP PAGE / CHECKOUT
    --------------------------------------------------- */
    var btn_continue=$(".btn--continue");
    btn_continue.html(btn_continue.text().replace("Next","Next <span class='i_right icon-double-angle-right2'></span>"));

    /* GROUP PAGE / FASTCHECKOUT
    --------------------------------------------------- */
    var edit_shopping_cart_btn=$(".edit_shopping_cart_btn .btn");
    edit_shopping_cart_btn.html(edit_shopping_cart_btn.text().replace("Cart","Cart <span class='i_right icon-bag-edit'></span>"));

    /* GROUP PAGE / SINGLE PRODUCT
    --------------------------------------------------- */
    var divide=$(".divide");
    divide.html(divide.text().replace(">", "<span aria-hidden='true' data-icon='&#xe002;'></span>"));

    var btn_email=$(".btn-email");
    btn_email.html(btn_email.text().replace("Email a Friend", "<span class='icon-mail i_left'></span> Email a Friend"));


    $("#productReviewsAddNote").wrap("<div class='js-req-product-reviews-wrapper' />");

    /* GROUP TABLES
    --------------------------------------------------- */
    $(".view-cart-product-thumb, .view-cart-product-name, .compare-table-thumb").removeAttr("data-title"); /* =JFG. Remove these table titles for mobile */

    /* =JFG. @TODO need to investigate why the below code commented out disables jQuery */
    /* GROUP PAGE / SEARCH
    --------------------------------------------------- */
    $("#searchFormSubmit input").each(function(){
        $(this).attr('value', $(this).attr('value').replace(" >>", ""));
    });
});