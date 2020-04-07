(function(){var g=PaymentsPortal2.modules.define;g("components/EligibleRewardsAccountComponent",["component","AUI!P","css-utils","jQuery"],function(g,f,b,k){var h=!1,e;return g.extend({toggleSpinner:function(a){b.toggleElement(this.getDOMElement("EligibleRewardsAccountSpinner"),a)},showRegistrationPopover:function(){function a(a){a&&(a=a.get(b.data.popoverName))&&a.show()}var b=this;f.when("a-modal").execute(function(c){a(c)});f.when("a-secondary-view").execute(function(c){a(c)})},closeRegistrationPopover:function(){function a(a){b.isUsingOldAUI(b)&&
e?e.$popover.find("button[data-action]=a-popover-close").trigger("click"):a&&(a=a.get(b.data.popoverName))&&a.hide()}var b=this;f.when("a-modal").execute(function(c){a(c)});f.when("a-secondary-view").execute(function(c){a(c)})},showRegistrationFailureView:function(a){"mobile"===this.widget.options.deviceType&&this.getDOMElement("RegistrationHeader").addClass("a-color-tertiary");b.showElement(this.getDOMElement("RegistrationFailureContinue"));b.showElement(this.getDOMElement(a));b.showElement(this.getDOMElement("RegisterRewardsAccountFailureSection"));
b.hideElement(this.getDOMElement("RewardsAccountRegistrationForm"))},resetRegistrationFormView:function(){"mobile"===this.widget.options.deviceType&&this.getDOMElement("RegistrationHeader").removeClass("a-color-tertiary");b.hideElement(this.getDOMElement("RegistrationFailureContinue"));b.hideElement(this.getDOMElement("RegistrationErrorMessages").children());b.hideElement(this.getDOMElement("RegisterRewardsAccountFailureSection"));b.showElement(this.getDOMElement("RewardsAccountRegistrationForm"))},
showValidationErrorMessage:function(a){b.showElement(this.getDOMElement(a));b.hideElement(this.getDOMElement("EligibleRewardsAccountSpinner"))},isRegistrationPostDataValid:function(a){return void 0===a["ppw-maybePostalCode"]||(b.hideElement(this.getDOMElement(this.data.rewardsPostalCodeValidationErrorJsBindingKey)),this.isValidPostalCode(a["ppw-maybePostalCode"]))?void 0===a["ppw-maybeDobMonth"]||(b.hideElement(this.getDOMElement(this.data.rewardsMonthValidationErrorJsBindingKey)),this.isValidRange(a["ppw-maybeDobMonth"],
1,12))?void 0!==a["ppw-maybeDobDay"]&&(b.hideElement(this.getDOMElement(this.data.rewardsDayValidationErrorJsBindingKey)),!this.isValidRange(a["ppw-maybeDobDay"],1,31))||void 0!==a["ppw-maybeDobDay"]&&void 0!==a["ppw-maybeDobMonth"]&&(b.hideElement(this.getDOMElement(this.data.rewardsDayValidationErrorJsBindingKey)),!this.isValidMonthDayCombination(a["ppw-maybeDobMonth"],a["ppw-maybeDobDay"]))?(this.showValidationErrorMessage(this.data.rewardsDayValidationErrorJsBindingKey),!1):!0:(this.showValidationErrorMessage(this.data.rewardsMonthValidationErrorJsBindingKey),
!1):(this.showValidationErrorMessage(this.data.rewardsPostalCodeValidationErrorJsBindingKey),!1)},isValidRange:function(a,b,c){return!!a&&!isNaN(a)&&a>=b&&a<=c},isValidMonthDayCombination:function(a,b){var c=[31,29,31,30,31,30,31,31,30,31,30,31];return 0<b&&b<=c[a-1]},isValidPostalCode:function(a){return/^[a-zA-Z0-9 -]{3,20}$/.test(a)},populatePostData:function(){var a={"ppw-widgetState":this.widget.options.serializedState,"ppw-widgetEvent":"RewardsAccountRegisterEvent","ppw-piid":this.data.parentInstrumentId,
"ppw-isApplyByDefault":this.getDOMElement("RewardsAccountApplyByDefaultCheckbox").find("input").prop("checked")};1===this.getDOMElement("RewardsAccountPostalCodeField").length&&(a["ppw-maybePostalCode"]=this.getDOMElement("RewardsAccountPostalCodeField").val());1===this.getDOMElement("RewardsAccountDOBMonth").length&&(this.isUsingOldAUI(this)?a["ppw-maybeDobMonth"]=this.getDOMElement("RewardsAccountDOBMonth").val():a["ppw-maybeDobMonth"]=this.getDOMElement("RewardsAccountDOBMonth").find("option:selected").text());
1===this.getDOMElement("RewardsAccountDOBDay").length&&(this.isUsingOldAUI(this)?a["ppw-maybeDobDay"]=this.getDOMElement("RewardsAccountDOBDay").val():a["ppw-maybeDobDay"]=this.getDOMElement("RewardsAccountDOBDay").find("option:selected").text());return a},handleRegistrationFailure:function(a){switch(a.registrationStatus){case "INVALID_CREDENTIALS":if(a.maybeValidationFailureFieldName)if("BILLING_POSTAL_CODE"===a.maybeValidationFailureFieldName){this.showRegistrationFailureView("rewards_BadZip");
break}else if("DATE_OF_BIRTH"===a.maybeValidationFailureFieldName){this.showRegistrationFailureView("rewards_BadDateOfBirth");break}this.showRegistrationFailureView("rewards_InvalidCredentials");break;case "NOT_ELIGIBLE":this.showRegistrationFailureView("rewards_CardNotEligible");break;case "NOT_AUTHORIZED":this.showRegistrationFailureView("rewards_UnauthorizedRedeemer");break;case "LOCKED_OUT":this.showRegistrationFailureView("rewards_CardLocked");break;case "ACCOUNT_CLOSED":this.showRegistrationFailureView("rewards_AccountClosed");
break;case "EXTERNAL_ACTION_REQUIRED":this.showRegistrationFailureView("rewards_ExternalActionRequired");break;default:this.showRegistrationFailureView("rewards_SystemUnavailable")}},isUsingOldAUI:function(a){return"desktop"===a.widget.options.deviceType&&("Checkout"===a.widget.options.clientId||"ABCheckout"===a.widget.options.clientId)&&!a.data.isCompact},bindToElements:function(){var a=this;a.getDOMElement("DismissPopover").click(function(){a.closeRegistrationPopover()});a.getDOMElement("RegistrationFailureContinue").click(function(){a.closeRegistrationPopover()});
a.getDOMElement("RewardsAccountRegistrationCall").click(function(d){b.showElement(a.getDOMElement("EligibleRewardsAccountSpinner"));d=a.populatePostData();if(!a.isRegistrationPostDataValid(d))return!1;a.widget.continueRequest(d,{complete:function(){b.hideElement(a.getDOMElement("EligibleRewardsAccountSpinner"))},success:function(b){b=b.additionalWidgetResponseData.additionalData;b.registrationOutput?(b=JSON.parse(b.registrationOutput),"REGISTERED"===b.registrationStatus?(h=!0,a.closeRegistrationPopover()):
a.handleRegistrationFailure(b)):b.validationError?a.showValidationErrorMessage(b.validationError):a.showRegistrationFailureView("rewards_SystemUnavailable")},error:function(){a.showRegistrationFailureView("rewards_SystemUnavailable")}})})},bindToEvents:function(){var a=this;a.widget.on("addressChallengePassed",a,function(d){d.instrumentId===a.data.parentInstrumentId&&b.showElement(a.getDOMElement("MobileEligibleRewardsAccountSection"))});f.when("A").execute(function(d){d.on("a:popover:hide:"+a.data.popoverName,
function(b){h&&(a.widget.submitFormAJAX({"ppw-widgetState":a.widget.options.serializedState,"ppw-widgetEvent":"RefreshEvent"}),h=!1)});d.on("a:popover:show:"+a.data.popoverName,function(c){a.resetRegistrationFormView();a.isUsingOldAUI(a)&&(e=c.popover,c=e.$popover.find(".a-popover-inner"),a.getDOMElement("CheckoutDesktopPopoverContent").parent("div.a-popover-inner").length||c.html(""),k("#"+e.name).appendTo(c),b.showElement(k("#"+e.name)),e.updatePosition())})})}})})})();
