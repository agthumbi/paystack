-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: paystack
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping routines for database 'paystack'
--
/*!50003 DROP PROCEDURE IF EXISTS `psp_add_cart_by_session_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `psp_add_cart_by_session_id`(IN p_prod_id int,IN p_isGuest TINYINT,IN p_session_id varchar(45),IN p_qty int)
BEGIN

declare p_stock_level int;
declare p_stock_sold int;



declare p_sku varchar(45);
set p_stock_sold=(select   sum(qty)  from tbl_cart where product_id=p_prod_id  );
set p_stock_level=(select   stock_level   from tbl_products where id=p_prod_id);

set p_sku=(select concat(batch_id,tag_id,id) sk  from tbl_products where id=p_prod_id);
#select   p_stock_level=stock_level,p_sku=concat(batch_id,tag_id,id)  from tbl_products where id=p_prod_id;



if(p_stock_sold is null)then
set p_stock_sold=0;
end if;

if(p_qty<=0) then 
select 2 code ,'Product quantity(s) cannot be less than an item' message;
elseif(p_sku is null) then 
select 2 code ,'Product does not exist(s)' message;
elseif exists(select session_id from `paystack`.`tbl_cart` where session_id=p_session_id and product_id=p_prod_id) then
select 2 code ,'Product already added' message;
elseif (p_stock_level<(p_stock_sold+p_qty)) then
select 2 code ,'Out of Stock' message;
else
INSERT INTO `paystack`.`tbl_cart`
(`sku`,
`product_id`,
`isGuest`,
`session_id`,
`qty`
)
VALUES
(p_sku,
p_prod_id,
p_isGuest,
p_session_id,
p_qty);
select 0 code ,'Added Successfully' message;

end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `psp_checkout_cart_by_session_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `psp_checkout_cart_by_session_id`(IN p_session_id INT)
BEGIN

if not exists(select session_id from `paystack`.`tbl_cart` where session_id=p_session_id) then 
select session_id from `paystack`.`tbl_cart` where session_id=p_session_id;
elseif  exists(select session_id from `paystack`.`tbl_cart` where session_id=p_session_id) then 
select 2 code,'Already Checked out' message;
else
SET SQL_SAFE_UPDATES = 0;
UPDATE `paystack`.`tbl_cart`
SET

`paid` =1
WHERE session_id=p_session_id;
SET SQL_SAFE_UPDATES = 1;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `psp_delete_cart_by_session_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `psp_delete_cart_by_session_id`(IN p_session_id varchar(45))
BEGIN
if  exists(select session_id from `paystack`.`tbl_cart` where session_id=p_session_id and paid=1) then
select 2 code,'Cannot remove cart that is already paid' message;
elseif not exists(select session_id from `paystack`.`tbl_cart` where session_id=p_session_id) then
select 1 code,'Record(s) does not exist' message;
else
DELETE FROM `paystack`.`tbl_cart`
WHERE session_id=p_session_id and paid=0;
select 0 code,'Deleted the cart successfully' message;
end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `psp_get_categories` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `psp_get_categories`()
BEGIN
select id,name from tbl_categories;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `psp_get_products_by_categoryId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `psp_get_products_by_categoryId`(IN p_id int)
BEGIN

select id,name,(select name from tbl_categories where id=p_id limit 1) category,stock_level,image_path,expiration_date,amount,created_date from tbl_products where category_id=p_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `psp_get_product_by_product_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `psp_get_product_by_product_id`(IN p_id int)
BEGIN
select id,name,(select name from tbl_categories where id=category_id limit 1) category,image_path,expiration_date,amount,created_date from tbl_products where id=p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `psp_update_cart_by_session_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `psp_update_cart_by_session_id`(IN p_prod_id INT,IN p_isGuest tinyint,IN p_session_id varchar(45),IN p_qty INT)
BEGIN
declare p_stock int;
declare p_stock_level int;
declare p_stock_sold int;
declare p_sku varchar(45);
set p_stock_sold=(select   p_stock_sold=qty  from tbl_cart where product_id=p_prod_id);
set p_stock_level=(select   stock_level   from tbl_products where id=p_prod_id);

set p_sku=(select concat(batch_id,tag_id,id) sk  from tbl_products where id=p_prod_id);
if(p_qty<=0) then 
select 2 code ,'Product quantity(s) cannot be less than an item' message;
elseif(p_sku is null) then 
select 2 code ,'Product does not exist(s)' message;
elseif exists(select session_id from `paystack`.`tbl_cart` where session_id=p_session_id and paid=1) then
select 2 code,'Cannot edit cart already paid' message ;
elseif NOT  exists(select session_id from `paystack`.`tbl_cart` where session_id=p_session_id) then
select 1 code ;
elseif (p_stock_level<(p_stock_sold+p_qty)) then
select 2 code ,'Out of Stock' message;
else
UPDATE `paystack`.`tbl_cart` SET sku=p_sku,  `product_id` =p_prod_id,`isGuest` = p_isGuest,`qty`=p_qty WHERE session_id= p_session_id and product_id=p_prod_id;
select 0 code ,'Updated Successfully' message;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `psp_view_cart_by_session_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `psp_view_cart_by_session_id`(IN p_session_id varchar(45))
BEGIN


SELECT sku,(select name from tbl_products where id=product_id limit 1) product,(select amount from tbl_products where id=product_id limit 1) amount ,isGuest,qty,case when paid=1 then 'yes' else 'no' end paid from tbl_cart  where session_id=p_session_id ;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-27 15:35:30
