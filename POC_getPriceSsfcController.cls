public class POC_getPriceSsfcController {
    @AuraEnabled
    public static string getPrices(){
        try{
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            String endPoint = 'http://dev03-na-yeti.demandware.net/s/Yeti_US/dw/shop/v18_6/product_search/prices?q=YETI&orderable_only=true&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
            request.setEndpoint(endPoint);
            
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            // If the request is successful, parse the JSON response.
            if (response.getStatusCode() == 200) {
                // Deserialize the JSON string into collections of primitive data types.
                system.debug('Products Price from Demandware response => '+response.getBody());
                return response.getBody();
            }
            else{
                
                
                System.debug('STATUS:'+response.getStatus());
                System.debug('Body---:'+response.getBody());
                
                
                return 'Error';
            }
        }catch(Exception ex){
            throw new AuraHandledException('Error occurred: ' + ex.getMessage());             
        }
        
    }
}