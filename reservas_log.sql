-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: reservas
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log` (
  `id_log` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `acao` varchar(50) NOT NULL,
  `tabela` varchar(50) NOT NULL,
  `data_hora` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_log`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `log_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` VALUES (1,1,'CREATE','Andar','2024-11-25 19:50:59'),(2,1,'INSERT','Laboratório','2024-11-25 19:51:12'),(3,1,'CREATE','Andar','2024-11-25 19:52:26'),(4,1,'INSERT','Laboratório','2024-11-25 20:26:38'),(5,1,'INSERT','Software','2024-11-25 21:34:57'),(6,1,'INSERT','Software','2024-11-25 21:34:57'),(7,1,'INSERT','Software','2024-11-25 21:34:57'),(8,1,'INSERT','Software','2024-11-25 21:34:57'),(9,1,'INSERT','Software','2024-11-25 21:34:57'),(10,1,'APPROVE','Reserva','2024-11-25 21:36:02'),(11,1,'INSERT','Software','2024-11-25 21:37:09'),(12,1,'INSERT','Software','2024-11-25 21:48:19'),(13,1,'DENNY','Reserva','2024-11-25 21:49:32'),(14,1,'DENNY','Reserva','2024-11-25 21:49:33'),(15,1,'DENNY','Reserva','2024-11-25 21:49:34'),(16,1,'DENNY','Reserva','2024-11-25 21:49:35'),(17,1,'DENNY','Reserva','2024-11-25 21:49:35'),(18,1,'DENNY','Reserva','2024-11-25 21:49:36'),(19,1,'INSERT','Software','2024-11-25 21:50:30'),(20,1,'INSERT','Equipamento','2024-11-27 09:33:34'),(21,1,'INSERT','Equipamento','2024-11-27 09:34:34'),(22,1,'INSERT','Equipamento','2024-11-27 09:34:48'),(23,1,'INSERT','Equipamento','2024-11-27 09:52:55'),(24,1,'INSERT','Software','2024-11-27 09:52:55'),(25,1,'INSERT','Software','2024-11-27 09:52:55'),(26,1,'INSERT','Software','2024-11-27 09:52:55'),(27,1,'INSERT','Equipamento','2024-11-27 09:57:22'),(28,1,'INSERT','Equipamento','2024-11-27 09:58:36'),(29,1,'INSERT','Equipamento','2024-11-27 10:03:31'),(30,1,'INSERT','Equipamento','2024-11-27 10:20:52'),(31,1,'INSERT','Equipamento','2024-11-27 10:21:40'),(32,1,'INSERT','Equipamento','2024-11-27 10:27:11'),(33,1,'DELETE','Equipamento','2024-11-27 10:41:08'),(34,1,'DELETE','Equipamento','2024-11-27 10:41:35'),(35,1,'INSERT','Equipamento','2024-11-27 10:42:29'),(36,1,'DELETE','Equipamento','2024-11-27 10:42:38'),(37,1,'DELETE','Equipamento','2024-11-27 10:43:12'),(38,1,'INSERT','Equipamento','2024-11-27 10:43:42'),(39,1,'INSERT','Equipamento','2024-11-27 10:43:57'),(40,1,'DELETE','Equipamento','2024-11-27 10:44:00'),(41,1,'INSERT','Equipamento','2024-11-27 10:44:08'),(42,1,'UPDATE','Laboratório','2024-11-27 11:05:52'),(43,1,'UPDATE','Laboratório','2024-11-27 11:05:52'),(44,1,'INSERT','Laboratório','2024-11-27 11:44:43'),(45,1,'INSERT','Laboratório','2024-11-27 11:45:45'),(46,1,'UPDATE','Laboratório','2024-11-27 11:54:06'),(47,1,'DELETE','Laboratório','2024-11-27 11:56:27'),(48,1,'DELETE','Laboratório','2024-11-27 11:56:37'),(49,1,'DELETE','Laboratório','2024-11-27 11:56:44');
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-27 11:58:17
