-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: full-stack-ecommerce
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

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
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `country_id` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_country` (`country_id`),
  CONSTRAINT `fk_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Acre',1),(2,'Alagoas',1),(3,'Amapá',1),(4,'Amazonas',1),(5,'Bahia',1),(6,'Ceará',1),(7,'Distrito Federal',1),(8,'Espírito Santo',1),(9,'Goiás',1),(10,'Maranhão',1),(11,'Mato Grosso do Sul',1),(12,'Mato Grosso',1),(13,'Minas Gerais',1),(14,'Paraná',1),(15,'Paraíba',1),(16,'Pará',1),(17,'Pernambuco',1),(18,'Piaui',1),(19,'Rio de Janeiro',1),(20,'Rio Grande do Norte',1),(21,'Rio Grande do Sul',1),(22,'Rondônia',1),(23,'Roraima',1),(24,'Santa Catarina',1),(25,'Sergipe',1),(26,'São Paulo',1),(27,'Tocantins',1),(28,'Alberta',2),(29,'British Columbia',2),(30,'Manitoba',2),(31,'New Brunswick',2),(32,'Newfoundland and Labrador',2),(33,'Northwest Territories',2),(34,'Nova Scotia',2),(35,'Nunavut',2),(36,'Ontario',2),(37,'Prince Edward Island',2),(38,'Quebec',2),(39,'Saskatchewan',2),(40,'Yukon',2),(41,'Baden-Württemberg',3),(42,'Bavaria',3),(43,'Berlin',3),(44,'Brandenburg',3),(45,'Bremen',3),(46,'Hamburg',3),(47,'Hesse',3),(48,'Lower Saxony',3),(49,'Mecklenburg-Vorpommern',3),(50,'North Rhine-Westphalia',3),(51,'Rhineland-Palatinate',3),(52,'Saarland',3),(53,'Saxony',3),(54,'Saxony-Anhalt',3),(55,'Schleswig-Holstein',3),(56,'Thuringia',3),(57,'Andhra Pradesh',4),(58,'Arunachal Pradesh',4),(59,'Assam',4),(60,'Bihar',4),(61,'Chhattisgarh',4),(62,'Goa',4),(63,'Gujarat',4),(64,'Haryana',4),(65,'Himachal Pradesh',4),(66,'Jammu & Kashmir',4),(67,'Jharkhand',4),(68,'Karnataka',4),(69,'Kerala',4),(70,'Madhya Pradesh',4),(71,'Maharashtra',4),(72,'Manipur',4),(73,'Meghalaya',4),(74,'Mizoram',4),(75,'Nagaland',4),(76,'Odisha',4),(77,'Punjab',4),(78,'Rajasthan',4),(79,'Sikkim',4),(80,'Tamil Nadu',4),(81,'Telangana',4),(82,'Tripura',4),(83,'Uttar Pradesh',4),(84,'Uttarakhand',4),(85,'West Bengal',4),(86,'Andaman and Nicobar Islands',4),(87,'Chandigarh',4),(88,'Dadra and Nagar Haveli',4),(89,'Daman & Diu',4),(90,'Lakshadweep',4),(91,'Puducherry',4),(92,'The Government of NCT of Delhi',4),(93,'Alabama',6),(94,'Alaska',6),(95,'Arizona',6),(96,'Arkansas',6),(97,'California',6),(98,'Colorado',6),(99,'Connecticut',6),(100,'Delaware',6),(101,'District Of Columbia',6),(102,'Florida',6),(103,'Georgia',6),(104,'Hawaii',6),(105,'Idaho',6),(106,'Illinois',6),(107,'Indiana',6),(108,'Iowa',6),(109,'Kansas',6),(110,'Kentucky',6),(111,'Louisiana',6),(112,'Maine',6),(113,'Maryland',6),(114,'Massachusetts',6),(115,'Michigan',6),(116,'Minnesota',6),(117,'Mississippi',6),(118,'Missouri',6),(119,'Montana',6),(120,'Nebraska',6),(121,'Nevada',6),(122,'New Hampshire',6),(123,'New Jersey',6),(124,'New Mexico',6),(125,'New York',6),(126,'North Carolina',6),(127,'North Dakota',6),(128,'Ohio',6),(129,'Oklahoma',6),(130,'Oregon',6),(131,'Pennsylvania',6),(132,'Rhode Island',6),(133,'South Carolina',6),(134,'South Dakota',6),(135,'Tennessee',6),(136,'Texas',6),(137,'Utah',6),(138,'Vermont',6),(139,'Virginia',6),(140,'Washington',6),(141,'West Virginia',6),(142,'Wisconsin',6),(143,'Wyoming',6),(144,'Adıyaman',5),(145,'Afyonkarahisar',5),(146,'Ağrı',5),(147,'Aksaray',5),(148,'Amasya',5),(149,'Ankara',5),(150,'Antalya',5),(151,'Ardahan',5),(152,'Artvin',5),(153,'Aydın',5),(154,'Balıkesir',5),(155,'Bartın',5),(156,'Batman',5),(157,'Bayburt',5),(158,'Bilecik',5),(159,'Bingöl',5),(160,'Bitlis',5),(161,'Bolu',5),(162,'Burdur',5),(163,'Bursa',5),(164,'Çanakkale',5),(165,'Çankırı',5),(166,'Çorum',5),(167,'Denizli',5),(168,'Diyarbakır',5),(169,'Düzce',5),(170,'Edirne',5),(171,'Elazığ',5),(172,'Erzincan',5),(173,'Erzurum',5),(174,'Eskişehir',5),(175,'Gaziantep',5),(176,'Giresun',5),(177,'Gümüşhane',5),(178,'Hakkâri',5),(179,'Hatay',5),(180,'Iğdır',5),(181,'Isparta',5),(182,'İstanbul',5),(183,'İzmir',5),(184,'Kahramanmaraş',5),(185,'Karabük',5),(186,'Karaman',5),(187,'Kars',5),(188,'Kastamonu',5),(189,'Kayseri',5),(190,'Kırıkkale',5),(191,'Kırklareli',5),(192,'Kırşehir',5),(193,'Kilis',5),(194,'Kocaeli',5),(195,'Konya',5),(196,'Kütahya',5),(197,'Malatya',5),(198,'Manisa',5),(199,'Mardin',5),(200,'Mersin',5),(201,'Muğla',5),(202,'Muş',5),(203,'Nevşehir',5),(204,'Niğde',5),(205,'Ordu',5),(206,'Osmaniye',5),(207,'Rize',5),(208,'Sakarya',5),(209,'Samsun',5),(210,'Siirt',5),(211,'Sinop',5),(212,'Sivas',5),(213,'Şanlıurfa',5),(214,'Şırnak',5),(215,'Tekirdağ',5),(216,'Tokat',5),(217,'Trabzon',5),(218,'Tunceli',5),(219,'Uşak',5),(220,'Van',5),(221,'Yalova',5),(222,'Yozgat',5),(223,'Zonguldak',5);
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-23 16:59:59
