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

The expected response if compututation is wrong pr not supplied is as follows:

` [
    {
        "code": "E0",
        "message": "Authentication Failed.Invalid signature"
    }
` ]


### Welcome Page

This endpoint is for accessing the landing page

#### Expected Request 

` GET http://{{host}}/ `

Parameter       | Description 
:---------------|:------------------------------------------------------------------------------------------
host            | Base URL

##### Payload
      ` None



#### Excpected Response 

`Welcome to PayStack api `

### Status Check

#### Expected Request 

` GET http://{{host}}/status `

Parameter       | Description 
:---------------|:------------------------------------------------------------------------------------------
host            | Base URL

##### Payload
      ` None


#### Excpected Response 

`0`

### Category Listing

This endpoint is for accessing the category listing

#### Expected Request 

` GET http://{{host}}/catgories/fetch `

Parameter       | Description 
:---------------|:------------------------------------------------------------------------------------------
host            | Base URL


##### Payload
      ` None

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

` GET http://{{host}}/products/categoryid/fetch/{category_id}`


Parameter       | Description 
:---------------|:------------------------------------------------------------------------------------------
category_id     | Category Identifier of category listing
host            | Base URL

##### Payload
      ` None

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

` GET http://{{host}}/products/productid/fetch/{product_id}`


Parameter       | Description 
:---------------|:------------------------------------------------------------------------------------------
product_id      | Product Identifier of product listing   
host            | Base URL


##### Payload
      ` None

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
- Edit/Update
- Remove
- View
- Checkout

#### Add Cart

This endpoint is used to add items/products in the cart

##### Expected Request 

` POST http://{{host}}/cart/session/add`

Parameter       | Description 
:---------------|:------------------------------------------------------------------------------------------
product_id      | Product Identifier of product listing   
isGuest         | If the session of the adding the cart is guest or not i.e true or false 
session_id      | Session ifentifier of cart owner.Same way as identifying the user session  
qty             | Quantity of the item you want to add 
host            | Base URL


##### Payload
` {
   ` "productid": 1,
   ` "isGuest": true,
   ` "session_id": "223567",
   ` "qty": 1
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
` ]

##### Excpected Response for product that does not exists in store 

` [
    {
        "code": "E0",
        "message": "Product does not exist(s)"
    }
` ]

##### Excpected Response for product that is out of stock 

` [
    {
        "code": "E0",
        "message": "Out of Stock"
    }
` ]

##### Excpected Response for product that is already added

` [
    {
        "code": "E0",
        "message": "Product already added"
    }
` ]

#### Edit/Update Cart

This endpoint is used to edit an item/product already in the cart.For the item that its added by customer who wants to add more quantity,
he will initiate this call

##### Expected Request 

` PUT http://{{host}}/cart/session/update`

Parameter       | Description 
:---------------|:------------------------------------------------------------------------------------------
product_id      | Product Identifier of product listing   
isGuest         | If the session of the adding the cart is guest or not i.e true or false 
session_id      | Session ifentifier of cart owner.Same way as identifying the user session  
qty             | Quantity of the item you want to add 
host            | Base URL

##### Payload
` {
   ` "productid": 1,
   ` "isGuest": true,
   ` "session_id": "223567",
   ` "qty": 1
` }

##### Excpected Response 

` [
    {
        "code": 0,
        "message": "Updated Successfully"
    }
` ]

#### View

This endpoint is used to view the the items in the cart

##### Expected Request 

` GET http://{{host}}/cart/session/fetch/{session_id}`


Parameter       | Description 
:---------------|:------------------------------------------------------------------------------------------
session_id      | Session ifentifier of cart owner.Same way as identifying the user session  
host            | Base URL


##### Payload
      ` None


##### Excpected Response 

` [
    {
        "sku": "100TS1",
        "product": "shirt",
        "amount": 10,
        "isGuest": 1,
        "qty": 3,
        "paid": "no"
    }
` ]

##### Excpected Response for non-existing cart

` [
    {
        "code": "E2",
        "message": "No Record(s) Exists"
    }
` ]

#### Remove Whole Cart

This endpoint is used to remove all items in the cart

##### Expected Request 

` PUT http://{{host}}/cart/session/fetch/{session_id}`


Parameter       | Description 
:---------------|:------------------------------------------------------------------------------------------
session_id      | Session ifentifier of cart owner.Same way as identifying the user session  
host            | Base URL


##### Payload
      ` None

##### Excpected Response 

` [
    {
        "code": 0,
        "message": "Deleted the cart successfully"
    }
` ]

##### Excpected Response for deleting non-existing cart

` [
    {
        "code": "E2",
        "message": "No Record(s) Exists"
    }
` ]


#### Remove an item in the Cart

This endpoint is used to remove an item in the cart

##### Expected Request 

` PUT http://{{host}}/cart/session/fetch/{session_id}/{product_id}`


Parameter       | Description 
:---------------|:------------------------------------------------------------------------------------------
product_id      | Product Identifier of product listing   
session_id      | Session ifentifier of cart owner.Same way as identifying the user session  
host            | Base URL


##### Payload
      ` None

##### Excpected Response 

` [
    {
        "code": 0,
        "message": "Deleted an item in cart successfully"
    }
` ]

##### Excpected Response for deleting non-existing item in a cart

` [
    {
        "code": "E2",
        "message": "No Record(s) Exists"
    }
` ]

#### Checkout Cart

This endpoint is used to checkout cart.

##### Expected Request 

` PUT http://{{host}}/cart/session/checkout/{session_id}`


Parameter       | Description 
:---------------|:------------------------------------------------------------------------------------------
session_id      | Session ifentifier of cart owner.Same way as identifying the user session  
host            | Base URL


##### Payload
      ` None

##### Excpected Response 

` [
    {
        "code": 0,
        "message": "Checked out Successfully"
    }
` ]

##### Excpected Response for existing checkout cart

` [
    {
        "code": "E0",
        "message": "Already Checked out"
    }
` ]

##### Excpected Response for non-existing checkout cart

` [
    {
        "code": "E2",
        "message": "No Record(s) Exists"
    }
` ]

### Reponse Codes

Code            | Description Message 
:---------------|:------------------------------------------------------------------------------------------
0               | Success
E1              | Internal service error.It could timeout with the network/database level
E2              | Data not found or does not exists from the records
E0              | General errors 


## PART III : Overal System Design

### Feature 

- General Flow Design
- System Design by exploring dockers
- System Design using kubernetes

#### General Flow Design

![Paystack](https://github.com/agthumbi/paystack/blob/main/system_design/general_flow.PNG)

##### Process Flow

 1. Request comes over external nextwork.
 2. Server recieves the request and pass it on to load balancer.Kindly note,load balancer with layer 7 will assist in routing
 to a particular server or microservices inside the server to allow partitioning request handling.
 3. Load balancer will send the request to a server that is handling API calls of which has less workload or to the one that is idle
 4. API routing will then decide which microservices should handle such requests,but it has to pass through security check on security micro services
 5. Microservice will respond back with response either its an obvious call which it will just pick from caching tool or complex request that has to visit the database.

#### System Design by exploring dockers

![Paystack](https://github.com/agthumbi/paystack/blob/main/system_design/design_flow_kubernetes.PNG)

Above design is improving more on workload by introducing kubernetes ecosystem.


#### System Design using kubernetes

![Paystack](https://github.com/agthumbi/paystack/blob/main/system_design/flow_design_rabbit.PNG)

We can also improve more on the design by including queue tools such as rabbit m queue to hanldle many requests from external nextwork


## PART IV : MORE ON OPTIMIZATION

### Feature 
- Database
- Load Balancer
- CDN
- Servers

#### Databse

There are various ways of optimizing the database bit
 - Indexing
 - Shading
 - Replication
 - Data redundancy


##### Table Indexing
 
 You can index tables on the search criteria such as on where clause.You can also index the most current data by use of configuring the primary identifier to return data in ascending order.
 
##### Shading

Another way to scale databse is through horizontal shading.We can have different servers with database installed into it to improve performance and optimization.We can have like 4 or more servers each handling different unique tables.Alternatively,you can also use similar table structure but have records that are stored alphabetically e.g users with last name state from  A-G ,H-M,N-T and so on.

##### Data redundancy

We can also introduce data redundancy by having the necessay records in one table instead of joining mulitple tables to increase performance.

##### Data Replication/Databse mirroring

We can free the read load on data by having mirroring data to secondary databses.This can be achived by replicating the main transactional databse to 2 or similar structural databses.We write on the transactional database and red on secondary databses.This will improve performance and reduce overload of one particular database hadnling heavy requests.


#### Load Balancer

We can increase the amount of load balancer to handle heavy load of requests coming from external network.Through layer 7 type,we can re-routing all the traffic to the respective server which has the micro service or has the a certain kubernetes that will route to a particular dockernized microservice.

#### CDN

We can use CDN technology to pull product images depending on the region to reduce the load of requesting of extracting images from  central location where servers are.

#### Server

We can have many servers which are sufficient and adequate enough power.Each server can have  dockers,or servers that are clustered,or have each server handling each microservies requests.

Sharing workload explained above  will assist in overal performance of the shopping cart system  and customer will be happy to use it.










