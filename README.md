# Pay Stack Rest API-BE Coding Challenge
A paystack api for small shopping cart application.Lets Assume that you have a
list of products in a category (eg. food or clothing) which contain a set of
standard attributes (sku, selling price, stock level, expiration date etc.) which a
user can add to, remove from and edit inside a car.

## Steps
   

## PART I: Download & Build on local

### Method 1: From github
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


##PART II : Consume APIs

<div class="postman-run-button"
data-postman-action="collection/import"
data-postman-var-1="25d69b6291f65c89e675"></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>









