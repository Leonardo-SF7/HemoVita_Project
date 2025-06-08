-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hemovita
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `Atendimento`
--

DROP TABLE IF EXISTS `Atendimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Atendimento` (
  `id_atendimento` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int DEFAULT NULL,
  `id_profi` int DEFAULT NULL,
  `tipo_atendimento` varchar(100) DEFAULT NULL,
  `notas` text,
  `leito` int DEFAULT NULL,
  `evolucao` text,
  `dt_atendimento` date DEFAULT NULL,
  PRIMARY KEY (`id_atendimento`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_profi` (`id_profi`),
  CONSTRAINT `Atendimento_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `Paciente` (`id_paciente`),
  CONSTRAINT `Atendimento_ibfk_2` FOREIGN KEY (`id_profi`) REFERENCES `Profissional` (`id_profi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Atendimento`
--

LOCK TABLES `Atendimento` WRITE;
/*!40000 ALTER TABLE `Atendimento` DISABLE KEYS */;
/*!40000 ALTER TABLE `Atendimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Atestado`
--

DROP TABLE IF EXISTS `Atestado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Atestado` (
  `id_atestado` int NOT NULL AUTO_INCREMENT,
  `descricao` text,
  `dt_emissao` date DEFAULT NULL,
  `id_paciente` int DEFAULT NULL,
  `id_profi` int DEFAULT NULL,
  PRIMARY KEY (`id_atestado`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_profi` (`id_profi`),
  CONSTRAINT `Atestado_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `Paciente` (`id_paciente`),
  CONSTRAINT `Atestado_ibfk_2` FOREIGN KEY (`id_profi`) REFERENCES `Profissional` (`id_profi`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Atestado`
--

LOCK TABLES `Atestado` WRITE;
/*!40000 ALTER TABLE `Atestado` DISABLE KEYS */;
/*!40000 ALTER TABLE `Atestado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ChecklistTriagem`
--

DROP TABLE IF EXISTS `ChecklistTriagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ChecklistTriagem` (
  `id_checklist` int NOT NULL AUTO_INCREMENT,
  `descricao` text,
  `dt_checklist` date DEFAULT NULL,
  `id_paciente` int DEFAULT NULL,
  `id_profi` int DEFAULT NULL,
  PRIMARY KEY (`id_checklist`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_profi` (`id_profi`),
  CONSTRAINT `ChecklistTriagem_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `Paciente` (`id_paciente`),
  CONSTRAINT `ChecklistTriagem_ibfk_2` FOREIGN KEY (`id_profi`) REFERENCES `Profissional` (`id_profi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ChecklistTriagem`
--

LOCK TABLES `ChecklistTriagem` WRITE;
/*!40000 ALTER TABLE `ChecklistTriagem` DISABLE KEYS */;
/*!40000 ALTER TABLE `ChecklistTriagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Evolucao`
--

DROP TABLE IF EXISTS `Evolucao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Evolucao` (
  `id_evolucao` int NOT NULL AUTO_INCREMENT,
  `descricao` text,
  `dt_evolucao` date DEFAULT NULL,
  `id_paciente` int DEFAULT NULL,
  `id_profi` int DEFAULT NULL,
  PRIMARY KEY (`id_evolucao`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_profi` (`id_profi`),
  CONSTRAINT `Evolucao_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `Paciente` (`id_paciente`),
  CONSTRAINT `Evolucao_ibfk_2` FOREIGN KEY (`id_profi`) REFERENCES `Profissional` (`id_profi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Evolucao`
--

LOCK TABLES `Evolucao` WRITE;
/*!40000 ALTER TABLE `Evolucao` DISABLE KEYS */;
/*!40000 ALTER TABLE `Evolucao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Exame`
--

DROP TABLE IF EXISTS `Exame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Exame` (
  `id_exame` int NOT NULL AUTO_INCREMENT,
  `tipo_exame` varchar(100) DEFAULT NULL,
  `resultado` decimal(10,2) DEFAULT NULL,
  `dt_exame` date DEFAULT NULL,
  `id_paciente` int DEFAULT NULL,
  `id_profi` int DEFAULT NULL,
  PRIMARY KEY (`id_exame`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_profi` (`id_profi`),
  CONSTRAINT `Exame_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `Paciente` (`id_paciente`),
  CONSTRAINT `Exame_ibfk_2` FOREIGN KEY (`id_profi`) REFERENCES `Profissional` (`id_profi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Exame`
--

LOCK TABLES `Exame` WRITE;
/*!40000 ALTER TABLE `Exame` DISABLE KEYS */;
/*!40000 ALTER TABLE `Exame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Farmacia`
--

DROP TABLE IF EXISTS `Farmacia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Farmacia` (
  `id_medicamento` int NOT NULL AUTO_INCREMENT,
  `nome_medicamento` varchar(255) NOT NULL,
  PRIMARY KEY (`id_medicamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Farmacia`
--

LOCK TABLES `Farmacia` WRITE;
/*!40000 ALTER TABLE `Farmacia` DISABLE KEYS */;
/*!40000 ALTER TABLE `Farmacia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Historico`
--

DROP TABLE IF EXISTS `Historico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Historico` (
  `id_historico` int NOT NULL AUTO_INCREMENT,
  `dt_registro` date DEFAULT NULL,
  `id_paciente` int DEFAULT NULL,
  `id_profi` int DEFAULT NULL,
  `id_atendimento` int DEFAULT NULL,
  PRIMARY KEY (`id_historico`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_profi` (`id_profi`),
  KEY `id_atendimento` (`id_atendimento`),
  CONSTRAINT `Historico_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `Paciente` (`id_paciente`),
  CONSTRAINT `Historico_ibfk_2` FOREIGN KEY (`id_profi`) REFERENCES `Profissional` (`id_profi`),
  CONSTRAINT `Historico_ibfk_3` FOREIGN KEY (`id_atendimento`) REFERENCES `Atendimento` (`id_atendimento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Historico`
--

LOCK TABLES `Historico` WRITE;
/*!40000 ALTER TABLE `Historico` DISABLE KEYS */;
/*!40000 ALTER TABLE `Historico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Paciente`
--

DROP TABLE IF EXISTS `Paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Paciente` (
  `id_paciente` int NOT NULL AUTO_INCREMENT,
  `nome_paciente` varchar(255) NOT NULL,
  `idade` int DEFAULT NULL,
  `sexo` varchar(20) DEFAULT NULL,
  `t_sanguineo` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `est_civil` varchar(50) DEFAULT NULL,
  `dt_nascimento` date DEFAULT NULL,
  `nome_acomp` varchar(255) DEFAULT NULL,
  `cpf_acomp` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_paciente`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Paciente`
--

LOCK TABLES `Paciente` WRITE;
/*!40000 ALTER TABLE `Paciente` DISABLE KEYS */;
/*!40000 ALTER TABLE `Paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profissional`
--

DROP TABLE IF EXISTS `Profissional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Profissional` (
  `id_profi` int NOT NULL AUTO_INCREMENT,
  `nome_profi` varchar(255) NOT NULL,
  `reg_profi` varchar(50) DEFAULT NULL,
  `agenda` varchar(100) DEFAULT NULL,
  `contato` varchar(50) DEFAULT NULL,
  `especialidade` varchar(100) DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id_profi`),
  KEY `Profissional_ibfk_1` (`id_usuario`),
  CONSTRAINT `Profissional_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profissional`
--

LOCK TABLES `Profissional` WRITE;
/*!40000 ALTER TABLE `Profissional` DISABLE KEYS */;
INSERT INTO `Profissional` VALUES (5,'Dr. João Silva','CRM123456','Seg-Sex 08:00-17:00','(11) 99999-9999','Cardiologia',19),(6,'Enf. Maria Souza','COREN654321','Seg-Sex 08:00-17:00','(11) 98888-8888','Enfermagem',20),(7,'Tec. Carlos Lima','TECN789012','Seg-Sex 08:00-17:00','(11) 97777-7777','Técnico de Enfermagem',21),(8,'Recep. Ana Paula','REC345678','Seg-Sex 08:00-17:00','(11) 96666-6666','Recepção',22);
/*!40000 ALTER TABLE `Profissional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Prontuario`
--

DROP TABLE IF EXISTS `Prontuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Prontuario` (
  `id_prontuario` int NOT NULL AUTO_INCREMENT,
  `diagnostico` text,
  `anotacoes` text,
  `id_paciente` int DEFAULT NULL,
  `id_profi` int DEFAULT NULL,
  `id_atendimento` int DEFAULT NULL,
  PRIMARY KEY (`id_prontuario`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_profi` (`id_profi`),
  KEY `id_atendimento` (`id_atendimento`),
  CONSTRAINT `Prontuario_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `Paciente` (`id_paciente`),
  CONSTRAINT `Prontuario_ibfk_2` FOREIGN KEY (`id_profi`) REFERENCES `Profissional` (`id_profi`),
  CONSTRAINT `Prontuario_ibfk_3` FOREIGN KEY (`id_atendimento`) REFERENCES `Atendimento` (`id_atendimento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Prontuario`
--

LOCK TABLES `Prontuario` WRITE;
/*!40000 ALTER TABLE `Prontuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `Prontuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Triagem`
--

DROP TABLE IF EXISTS `Triagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Triagem` (
  `id_triagem` int NOT NULL AUTO_INCREMENT,
  `descricao` text,
  `dt_triagem` date DEFAULT NULL,
  `id_paciente` int DEFAULT NULL,
  `id_profi` int DEFAULT NULL,
  PRIMARY KEY (`id_triagem`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_profi` (`id_profi`),
  CONSTRAINT `Triagem_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `Paciente` (`id_paciente`),
  CONSTRAINT `Triagem_ibfk_2` FOREIGN KEY (`id_profi`) REFERENCES `Profissional` (`id_profi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Triagem`
--

LOCK TABLES `Triagem` WRITE;
/*!40000 ALTER TABLE `Triagem` DISABLE KEYS */;
/*!40000 ALTER TABLE `Triagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `role` varchar(50) DEFAULT 'paciente',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES (1,'admin@admin.com','<$2a$10$5XElrUh4qOXthqbMbYcj4u8aUnc/EpcHin2Bkn6FpoNoj4riy7IAS>','ativo','admin');
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'ativo',
  `role` varchar(50) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (18,'admin@teste.com','$2a$10$N.2zo8M8FLqh6ckeHdxDf.x2WwA7.AYYQd.NuyQeUJQ13htQQK/iq','ativo','admin'),(19,'medico@teste.com','$2a$10$N.2zo8M8FLqh6ckeHdxDf.x2WwA7.AYYQd.NuyQeUJQ13htQQK/iq','ativo','medico'),(20,'enfermeiro@teste.com','$2a$10$N.2zo8M8FLqh6ckeHdxDf.x2WwA7.AYYQd.NuyQeUJQ13htQQK/iq','ativo','enfermeiro'),(21,'tecnico@teste.com','$2a$10$N.2zo8M8FLqh6ckeHdxDf.x2WwA7.AYYQd.NuyQeUJQ13htQQK/iq','ativo','tecnico'),(22,'recepcao@teste.com','$2a$10$N.2zo8M8FLqh6ckeHdxDf.x2WwA7.AYYQd.NuyQeUJQ13htQQK/iq','ativo','recepcao');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-08  4:10:57
