
const wsUrl = 'https://localhost:44380/api/customer'
getCustomers();

$(document).ready(function(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();	
});

function getCustomers(){
    var tApp = 
    angular.
    module("tModule", []);

    tApp.controller("tController", function($scope, $http) {
        $http.get(wsUrl).then(function(response) {
            $scope.customers = response.data;
        });
        
        $scope.showCustomer = function(nForm, customer) {  

            $('#' + nForm + 'Name').val(customer.tradingName);
            $('#' + nForm + 'CoName').val(customer.companyName);
            $('#' + nForm + 'Email').val(customer.email);
            $('#' + nForm + 'Cnpj').val(customer.cnpj);
            $('#' + nForm + 'Phone').val(customer.phoneNumber);
            $('#' + nForm + 'Address').val(customer.address);   
            
            $(".modal-footer #customerId").val( customer.id );
        };   

        
    });
}

function editCustomer(){

    var cId = $(".modal-footer #customerId").val();
    var data = 
        {
            Id: cId,
            TradingName: $("#editName").val(), 
            CompanyName: $("#editCoName").val(),
            Email: $("#editEmail").val(),
            Address: $("#editAddress").val(),
            CNPJ: $("#editCnpj").val(),
            PhoneNumber: $("#editPhone").val()
       };

    $.ajax({
        type: "PUT",
        url: wsUrl + '/' + cId,
        data: data,
        success: function(response){
            location.reload();   
        }
});

}

function newCustomer(){

    $.post(wsUrl, {  TradingName: $("#newName").val(), 
                     CompanyName: $("#newCoName").val(),
                     Email: $("#newEmail").val(),
                     Address: $("#newAddress").val(),
                     CNPJ: $("#newCnpj").val(),
                     PhoneNumber: $("#newPhone").val()
                    })
            .done(function(data){                    
                $('#addCustomerModal').modal('hide');    
                location.reload();                                         
        });
               

}

function deleteCustomer(){
       
    var cId = $(".modal-body #customerId").val();
   
    $.ajax({
        url: wsUrl + '/' + cId,
        type: 'DELETE',
        success: function(result) {
            location.reload(); 
        }
    });    
}

$(document).on("click", ".open-deleteCustomerModal", function () {
    var customerId = $(this).data('id');
    $(".modal-body #customerId").val( customerId );
    
});

   