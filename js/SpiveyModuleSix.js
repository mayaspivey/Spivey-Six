function Select()
{
  if (document.getElementById("select").value=="Section One: Create A Customer")
   {
     document.getElementById("sectionone").style.visibility="visible";
     document.getElementById("sectiontwo").style.visibility="hidden";
     document.getElementById("sectionthree").style.visibility="hidden";
   }
   else if (document.getElementById("select").value=="Section Two: Change Shipping Address") 
   {
      document.getElementById("sectionone").style.visibility="hidden";
     document.getElementById("sectiontwo").style.visibility="visible";
     document.getElementById("sectionthree").style.visibility="hidden";
   }
   else if (document.getElementById("select").value=="Section Three: Delete Customer")
   {
    document.getElementById("sectionone").style.visibility="hidden";
     document.getElementById("sectiontwo").style.visibility="hidden";
     document.getElementById("sectionthree").style.visibility="visible";
   }
   else
   {
      document.getElementById("sectionone").style.visibility="hidden";
     document.getElementById("sectiontwo").style.visibility="hidden";
     document.getElementById("sectionthree").style.visibility="hidden";
   } 
}
function AddCustomer()

{
    //collect data
 var customerid= document.getElementById("customerid").value;
 var customername= document.getElementById("customername").value;
 var customercity= document.getElementById("customercity").value;
 
 //create request
 var objectrequest = new XMLHttpRequest();
 var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
 
 //create parameter string
 var newcustomer='{"CustomerID":"'+customerid+'","CompanyName":"'+customername+'","City":"'+customercity+'"}';
 
 //check for return
 objectrequest.onreadystatechange=function()
 {
    if (objectrequest.readyState==4&&objectrequest.status==200)
    {
      var result =JSON.parse(objectrequest.responseText);
      OperationResult(result);
    }
 }
 //start AJAX request
 objectrequest.open("Post",url, true);
 objectrequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
 objectrequest.send(newcustomer);
}

function OperationResult(output)
{
  if(output.WasSuccessful==1)
  {
    document.getElementById("displaysectionone").innerHTML="The operation was successful!"
  }
  else
  {
    document.getElementById("displaysectionone").innerHTML="The operation was not successful!" + "<br>"+output.Exception;
  }
}

function ChangeAddress()
{
    //get date from form
    var orderid = document.getElementById("ordernumber").value;
    var shipaddress= document.getElementById("shipaddress").value;
    var city= document.getElementById("shipcity").value;
    var shipname=document.getElementById("shipname").value;
    var shipzipcode=document.getElementById("shipzip").value;
    
    //create object request
    var addressrequest= new XMLHttpRequest()
    var urltwo ="http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    //create parameter string
    var addressupdate ='{"OrderID":"'+orderid+'","ShipAddress":"'+shipaddress+'","ShipCity":"'+city+'","ShipName":"'+shipname+'","ShipPostcode":"'+shipzipcode+'"}';

    //check AJAX return
    addressrequest.onreadystatechange=function()
    {
    if (addressrequest.readyState==4 && addressrequest.status==200) 
       
    {
     var resulttwo=JSON.parse(addressrequest.responseText);
    OperationResulttwo(resulttwo);
    }
}
//start AJAX request
addressrequest.open("POST",urltwo,true);
addressrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
addressrequest.send(addressupdate);
}
function  OperationResulttwo(output)
{
   if(output.WasSuccessful==1)
   {
     document.getElementById("displaysectiontwo").innerHTML="The operation was successful!"
   }
   else (output.Exception==0)
   {
       document.getElementById("displaysectiontwo").innerHTML="The operation was not successful!" 
   }
   
}
   
function DeleteInfo()
 
    { 
          var txt;
    var r = confirm("Press a button!");
    if (r == true)
    {
        txt = "You pressed OK!";
    } else {
        txt = "You pressed Cancel!";
    }
    document.getElementById("displaysectionthree").innerHTML = txt;
}
       {
      //create request
      var objectrequestthree= new XMLHttpRequest();
      
      //create url and query string
      var urldelete = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
      urldelete += document.getElementById("custid").value;
      
 
      //check if object has returned date
      objectrequestthree.onreadystatechange=function()
      {
         if (objectrequestthree.readyState==4&& objectrequestthree.responseText==200)
         {
           var outputthree=JSON.parse(objectrequestthree.responseText);
      GenerateOutput(outputthree);
         }
      }
      //Initiate server request
      objectrequestthree.open("GET",urldelete,true);
      objectrequestthree.send();
   }
   function GenerateOutput(result)
   {
 if(result.DeleteCustomerResult.WasSuccessful==1)
   {
     document.getElementById("displaysectionthree").innerHTML="The operation was successful!"
   }
   else (result.DeleteCustomerResult.Exception==0)
   {
       document.getElementById("displaysectionthree").innerHTML="The operation was not successful!" 
   }
   }
   
  
