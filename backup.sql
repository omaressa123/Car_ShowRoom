-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: showroom_2
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audit_log`
--

DROP TABLE IF EXISTS `audit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_log` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `action` varchar(255) NOT NULL,
  `actor` varchar(255) NOT NULL,
  `details` text,
  `timestamp` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_log`
--

LOCK TABLES `audit_log` WRITE;
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
INSERT INTO `audit_log` VALUES (1,'CREATE_CAR','yahya','Car created: tesla hr','2026-04-23 14:51:30.187820'),(2,'CREATE_CAR','yahya','Car created: tesla hr','2026-04-23 14:52:53.549919'),(3,'CREATE_PURCHASE_REQUEST','ab','Purchase request created for car 2 by user 1','2026-04-23 15:04:38.311282'),(4,'APPROVE_PURCHASE','yahya','Contract 1 approved. Car 2 qty now 0','2026-04-23 15:05:03.763718'),(5,'CREATE_PURCHASE_REQUEST','ab','Purchase request created for car 1 by user 1','2026-04-23 15:09:21.626785'),(6,'APPROVE_PURCHASE','yahya','Contract 2 approved. Car 1 qty now 0','2026-04-23 15:14:03.421177'),(7,'CREATE_CAR','yahya','Car created: tesla j3','2026-04-23 15:25:35.478597'),(8,'CREATE_PURCHASE_REQUEST','ab','Purchase request created for car 3 by user 1','2026-04-23 15:28:12.467879'),(9,'APPROVE_PURCHASE','yahya','Contract 3 approved. Car 3 qty now 1','2026-04-23 15:28:45.677349'),(10,'UPDATE_PRICE','yahya','Car ID 3 price updated to 9992','2026-04-23 15:32:19.052289'),(11,'CREATE_CAR','yahya','Car created: tesla hr','2026-04-23 15:33:44.052628'),(12,'CREATE_PURCHASE_REQUEST','ab','Purchase request created for car 3 by user 1','2026-04-23 15:35:37.849353'),(13,'REJECT_PURCHASE','yahya','Contract 4 rejected','2026-04-23 15:36:46.331787'),(14,'CREATE_PURCHASE_REQUEST','uukdk','Purchase request created for car 3 by user 4','2026-04-23 15:52:58.870267');
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branches` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES (1,'24-elmokattam-9 st','cairo','فرع القاهرة'),(2,'30-stanley','alexandria','فرع الاسكندرية');
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_color_link`
--

DROP TABLE IF EXISTS `car_color_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_color_link` (
  `car_id` bigint NOT NULL,
  `color_id` bigint NOT NULL,
  KEY `FKnyo6ggofnqjwl567cv9eb1myf` (`color_id`),
  KEY `FKgbois9yxcrycuh68149xgxgnj` (`car_id`),
  CONSTRAINT `FKgbois9yxcrycuh68149xgxgnj` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`),
  CONSTRAINT `FKnyo6ggofnqjwl567cv9eb1myf` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_color_link`
--

LOCK TABLES `car_color_link` WRITE;
/*!40000 ALTER TABLE `car_color_link` DISABLE KEYS */;
INSERT INTO `car_color_link` VALUES (2,2),(3,2),(4,3);
/*!40000 ALTER TABLE `car_color_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_images`
--

DROP TABLE IF EXISTS `car_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_images` (
  `car_id` bigint NOT NULL,
  `image_url` varchar(255) NOT NULL,
  KEY `FKet593krc5137jxdk5cxdah2vd` (`car_id`),
  CONSTRAINT `FKet593krc5137jxdk5cxdah2vd` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_images`
--

LOCK TABLES `car_images` WRITE;
/*!40000 ALTER TABLE `car_images` DISABLE KEYS */;
INSERT INTO `car_images` VALUES (1,'https://th.bing.com/th?id=OIF.bDj%2bLQ8ipfJ03wn7BNdJQw&w=288&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'),(3,'https://th.bing.com/th/id/OIP.JCHrTm-tk1OkH4_GOWgB-gHaEK?w=322&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3');
/*!40000 ALTER TABLE `car_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `plate_number` varchar(255) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `quantity_available` int NOT NULL,
  `status` enum('AVAILABLE','UNAVAILABLE','SOLD','MAINTENANCE') DEFAULT NULL,
  `year` int DEFAULT NULL,
  `branch_id` bigint NOT NULL,
  `company_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK56sub3nqagpygnnch9u9jotja` (`branch_id`),
  KEY `FKshd6om9h0f8brqk6dd3407n7s` (`company_id`),
  CONSTRAINT `FK56sub3nqagpygnnch9u9jotja` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`),
  CONSTRAINT `FKshd6om9h0f8brqk6dd3407n7s` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,'tesla','hr',NULL,12324352.00,0,'UNAVAILABLE',2025,1,1),(2,'tesla','hr',NULL,12324352.00,0,'UNAVAILABLE',2025,2,1),(3,'tesla','j3',NULL,9992.00,1,'AVAILABLE',2000,1,1),(4,'tesla','hr',NULL,222.00,0,'UNAVAILABLE',2000,1,1);
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_kfulqa7c70otb7t3uwkgcpy43` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'black'),(3,'green'),(2,'white');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_50ygfritln653mnfhxucoy8up` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'tesla');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contracts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customer_email_snapshot` varchar(255) DEFAULT NULL,
  `customer_name_snapshot` varchar(255) DEFAULT NULL,
  `customer_phone_snapshot` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','ACTIVE','COMPLETED','CANCELLED') DEFAULT NULL,
  `total_price` decimal(38,2) DEFAULT NULL,
  `car_id` bigint DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `customer_ssn_snapshot` varchar(255) DEFAULT NULL,
  `id_photo_url_snapshot` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqurdng6t94by3nbreeptwwr65` (`car_id`),
  KEY `FKgcu7bfqv1j7nltm5uhk91kxcy` (`customer_id`),
  KEY `FKq3v8dxlubujug7dxvpauig94n` (`user_id`),
  CONSTRAINT `FKgcu7bfqv1j7nltm5uhk91kxcy` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `FKq3v8dxlubujug7dxvpauig94n` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKqurdng6t94by3nbreeptwwr65` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
INSERT INTO `contracts` VALUES (1,'coolyahya2004@gmail.com','Yahya Taher','11111111111','bank_transfer','COMPLETED',12324352.00,2,1,1,NULL,NULL),(2,'coolyahya2004@gmail.com','Yahya Taher','11111111111','credit_card','COMPLETED',12324352.00,1,1,1,NULL,NULL),(3,'coolyahya2004@gmail.com','Yahya Taher','63223252','crypto','COMPLETED',122311.00,3,1,1,'23242424','https://th.bing.com/th/id/OIP.JCHrTm-tk1OkH4_GOWgB-gHaEK?w=322&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'),(4,'coolyahya2004@gmail.com','Yahya Taher','63223252','crypto','CANCELLED',9992.00,3,1,1,'23242424','https://th.bing.com/th/id/OIP.JCHrTm-tk1OkH4_GOWgB-gHaEK?w=322&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'),(5,'544re@didj.xsd','rgafgd','865875','bank_transfer','PENDING',9992.00,3,3,4,'sdfsdf','https://th.bing.com/th/id/OIP.JCHrTm-tk1OkH4_GOWgB-gHaEK?w=322&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3');
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_euat1oase6eqv195jvb71a93s` (`user_id`),
  CONSTRAINT `FKrh1g1a20omjmn6kurd35o3eit` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'uhfk@test.com','a b','974358',1),(2,'coolyahya2004@gmail.com','3434 Taher','fff',3),(3,'coolyahya2004@gmail.com','uu Taher','1111111122',4);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` double DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `contract_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqywegtqyijw241foqfkseq1l6` (`contract_id`),
  CONSTRAINT `FKqywegtqyijw241foqfkseq1l6` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'$2a$10$T52leM2kgSZa4kiXP7Qab.S3f4YS1nL6P/xPUy5nQStma8AZuUcHu','ROLE_CUSTOMER','ab'),(2,'$2a$10$T52leM2kgSZa4kiXP7Qab.S3f4YS1nL6P/xPUy5nQStma8AZuUcHu','ROLE_ADMIN','yahya'),(3,'$2a$10$cBqZIH1KfIM5apRyMpY.c.jtL2uQHjVxM1QQYHhucu2CtAIRdfGU.','ROLE_CUSTOMER','6666'),(4,'$2a$10$C5zTgzKRuFaXO9IsQMDvOeEhEPq3KAW7XsSync2CRlBWQqg6ZIxAe','ROLE_CUSTOMER','uukdk');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-23 16:57:30
