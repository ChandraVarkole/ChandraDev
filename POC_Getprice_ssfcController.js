({
	doInit : function(component, event, helper) {
		helper.getPricesFromFFc(component,event,helper);	
	}
  ,
    getPricesController: function(component, event, helper) {
        console.log(component.get("v.orignalList"));
		component.set("v.productList",component.get("v.orignalList"));
	}
  
})