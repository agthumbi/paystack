![Paystack](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd03xty-NhpM7DTTWLzJHM-1Y_n2Ffmq58OA&usqp=CAU)

# Pay Stack Rest API-BE Coding Challenge
A paystack api for small shopping cart application.Lets Assume that you have a
list of products in a category (eg. food or clothing) which contain a set of
standard attributes (sku, selling price, stock level, expiration date etc.) which a
user can add to, remove from and edit inside a car.

## Steps
   

## PART I: Download & Build on local

#### 1) Clone the repository, install node packages  and verify routes locally

``` 
//on local
git clone https://github.com/agthumbi/paystack.git
cd paystack
npm install
npm start
```

#### 2)Open your local browser and verify the Paystack API is working by accessing: 

#Landin page
```
http://localhost/  

```

#HTTP Status
```
http://localhost/status/

```

**Note**

Make sure you dont have another port ::80 running to avoid conflict issues.

#### 3) Dependencies

##### MYSQL Installation
You will need to install MYSQL on your operating system.Recommended,you can use MYSQL version 8.
Here is the download link below for your reference.You should follow the instructions on how install mysql-installer-web-community-8*.ms
on their web page.

```
https://dev.mysql.com/downloads/installer/

```
##### Import DB Structure
Import scheme usign MYSQL workbench wizard and make sure you got no errors.Download the below link to access data to import to your workbench


 [Paystack DB structure Link](https://github.com/agthumbi/paystack/tree/main/paystack_db_structure)



## PART II : Consume APIs

### Feature

- Restful routings
- Restful error handling
- Security Authentication
    
#### Consumer using postman

Download the postman enviroment via the link below.

Click on the button below to access the API snippets.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/25d69b6291f65c89e675)


### Authentication

In order to do authentication you will be required to send the following HTTP headers parameters as part of your requests:

- Timestamp
- Nonce
- Signature

All fields are required except otherwise stated.

#### HTTP Headers for Authentication

The following describes the important headers required to be sent.

Headers        | Description 
:-------------:|:------------------------------------------------------------------------------------------:
Timestamp      | Requst timestamp in epoch (unix).It must be in seconds and NOT miliseconds e.g 1643208739               
Nonce          | A unique generated valuue for each request.It should not be repeated.               
Signature      | Must be represented in base 64.The signature is calculated from a combination defined data
               | elements seperated by the special symbols.See pre-scripts on postman snippets               
Content-Type   | The MIME type of the body of the request e.g. application/json  
                 






