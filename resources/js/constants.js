angular.module('ckgsPWA.constants', [])
.constant('CONSTANTS', (function() {
	var baseUrl  =  "http://devnic.ckgs.us/api";
	var dummy    =  "http://54.191.138.130:8081";
	var https    =  "https://192.168.110.172:8010";
	var testUrl  =  "https://www.in.ckgs.us/api";
	return {
		getMobAppStatus : testUrl+"/getApplicationCenterInfo",
		// URL for FAQ
		getFaqs :testUrl+"/getFaqList",
		// URL for Get Application Status
    	trackApplicationStatus:testUrl+"/getMobAppStatus",
    	// URL for FeedBack & Complaint
    	updateStatus:testUrl+"/saveFeedbackComplaint",
    	// URL for Track Shiping Status
    	trackShippingStatus : testUrl+"/getShippingStatus",
    	// URL for Holiday List
    	getHolidayList : testUrl+"/getHolidayList",
    	// URL FOR T&C AND PrivacyPolicy
    	documentation : testUrl+"/getContent",
    	// Validation Key
    	testValidationKey:"cck56wed5cvfg"
    }
})());
