({
    getPricesFromFFc  : function(component,event,helper) {
        this.showSpinner(component);
        var action = component.get("c.getPrices");        
        action.setCallback(this, function(response) {
            var state = response.getState();            
            if(state === "SUCCESS"){            
                debugger;
                let noPriceList=[];
                let currentPrice=[];
                console.log(response.getReturnValue());
                component.get("v.orignalList",response.getReturnValue().hits);
                let reponse=JSON.parse(response.getReturnValue());
                
                              
                for(let i=0;i<reponse.hits.length;i++){
                    let str=JSON.stringify(reponse.hits[i]);
                     currentPrice.push(JSON.parse(str));
                    console.log(reponse.hits[i].price);
                    reponse.hits[i].price='';
                    console.log(reponse.hits[i].product_name);
                   
                  
                }
                component.set("v.orignalList",currentPrice
                             ); 
                component.set("v.productList",reponse.hits);
                console.log(noPriceList);
                
                this.hideSpinner(component);
            }else if (state === "ERROR") {
                console.log(response.getError());
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        $A.get("e.force:showToast").setParams({
                            "title": "ERROR",
                            "message": "Error message: " + errors[0].message,
                            "type": "error"
                        }).fire();
                    }
                }else {	                    
                    $A.get("e.force:showToast").setParams({
                        "title": "ERROR",
                        "message": "Unknown error",
                        "type": "error"
                    }).fire();
                }
            }    
        });
        $A.enqueueAction(action);
    },
    hideSpinner :function(component){     
        var cmpTarget = component.find('spinner');
        $A.util.addClass(cmpTarget, 'slds-hide');
    },showSpinner :function(component){
        var cmpTarget = component.find('spinner');
        $A.util.removeClass(cmpTarget, 'slds-hide');
        
    },
    setPriceshelper:function(component,event,helper){
        
    }
    
})