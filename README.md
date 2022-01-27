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
    
#### Consumer using Postman

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
:--------------|:------------------------------------------------------------------------------------------
Timestamp      | Requst timestamp in epoch (unix).It must be in seconds and NOT miliseconds e.g 1643208739               
Nonce          | A unique generated valuue for each request.It should not be repeated.               
Signature      | The signature is calculated from a combination defined data elements seperated by the special symbols.See pre-scripts on postman snippets               
Content-Type   | The MIME type of the body of the request e.g. application/json  

#### Sample Authentication Headers

` Content-Type:application/json `

` Timestamp:1643208739 `

` Nonce:39640f06aeb78ac46eb0a0b3e1045fe8 `

` Signature:cbzXGpglR43i6aZYFgrjJFc6TNGXsOzGdG+JY5lJpXo= ` 


##### Signature Computation

The pseudo-code below shows how this can be done with any programming language of choice

` String rawCipher=timestamp + '$$PAYSTACK$$' + nonce `

` String Secret_Buffer='Paystack is de best' `

` String signature=Base64(Hash(rawCipher,Secret_Buffer)) `


### Welcome Page

This endpoint is for accessing the landing page

#### Expected Request 
` GET http://{{host}}/ `

#### Excpected Response 
`Welcome to PayStack api `

### Status Check

#### Expected Request 
` GET http://{{host}}/status `

#### Excpected Response 
`0`

### Category Listing

This endpoint is for accessing the category listing

#### Expected Request 

` GET http://{{host}}/catgories/fetch `

#### Excpected Response 

`[
    {
        "id": 1,
        "name": "Clothes"
    },
    {
        "id": 2,
        "name": "Furniture"
    }
]`

#### Expected  Response for non-existing category

` [
    {
        "code": "E2",
        "message": "No Record(s) Exists"
    }
] `

### Product Listing

This endpoint is for accessing the product listing depending on the criteria

#### By Category ID

##### Expected Request 

` GET http://{{host}}/products/categoryid/fetch/{{category id}}`

##### Excpected Response 

` [
    {
        "id": 1,
        "name": "shirt",
        "category": "Clothes",
        "stock_level": 10,
        "image_path": "/cat_1/shirts.png",
        "expiration_date": "-",
        "amount": 10,
        "created_date": "2022-01-13T08:04:23.000Z"
    },
    {
        "id": 2,
        "name": "jeans",
        "category": "Clothes",
        "stock_level": 12,
        "image_path": "/cat_1/jeans.png",
        "expiration_date": "-",
        "amount": 12,
        "created_date": "2022-01-18T14:17:48.000Z"
    }
] `

#### Expected  Response for non-existing category

` [
    {
        "code": "E2",
        "message": "No Record(s) Exists"
    }
] `

#### By Product ID

##### Expected Request 

` GET http://{{host}}/products/productid/fetch/{{product_id}}`

##### Excpected Response 

` [
    {
        "id": 2,
        "name": "jeans",
        "category": "Clothes",
        "image_path": "/cat_1/jeans.png",
        "expiration_date": "-",
        "amount": 12,
        "created_date": "2022-01-18T14:17:48.000Z"
    }
] `

#### Expected  Response for non-existing product

` [
    {
        "code": "E2",
        "message": "No Record(s) Exists"
    }
] `


### Cart

You can manage the cart using the following endpoints
- Add
- Update
- Remove
- View
- Checkout

#### Add Cart

This endpoint is used to add items/products in the cart

##### Expected Request 

` POST http://{{host}}/cart/session/add`
` {
   ` "productid": 1,
   ` "isGuest": true,
   ` "session_id": "223567",
   ` "p_qty": 1
` }

##### Excpected Response 

` [
    ` {
       ` "code": 0,
       ` "message": "Added Successfully"
    ` }
` ]

##### Excpected Response for product count is zero 

` [
    {
        "code": "E0",
        "message": "Product quantity(s) cannot be less than an item"
    }
`]



