-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: webapp
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB-0+deb12u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `SignalsSettings`
--

DROP TABLE IF EXISTS `SignalsSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SignalsSettings` (
  `par_name` varchar(20) NOT NULL,
  `par_permission` varchar(2) NOT NULL DEFAULT 'RO',
  `par_value` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`par_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SignalsSettings`
--

LOCK TABLES `SignalsSettings` WRITE;
/*!40000 ALTER TABLE `SignalsSettings` DISABLE KEYS */;
INSERT INTO `SignalsSettings` VALUES
('Param2_Input','RW',-0.008),
('Parameter-7 Output','RO',0.007),
('Parameter-8 Output','RO',0.008),
('Parameter-9 Output','RO',0.009),
('Parameter1_Input','RW',0.8854),
('Parameter1_Output','RO',0.01),
('Parameter2_Output','RO',-0.092),
('Parameter3 Input','RW',0.283),
('Parameter3 Output','RO',0.003),
('Parameter4 Input','RW',0.283),
('Parameter4 Output','RO',0.004),
('Parameter5 Input','RW',0.283),
('Parameter5 Output','RO',0.005),
('Parameter6 Input','RW',0.283),
('Parameter6 Output','RO',0.006),
('Parameter7 Input','RW',0.283),
('Parameter8 Input','RW',0.283),
('Parameter9 Input','RW',0.283);
/*!40000 ALTER TABLE `SignalsSettings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-04  5:07:17
