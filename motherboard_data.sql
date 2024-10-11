-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2024 at 11:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pcparts`
--

-- --------------------------------------------------------

--
-- Table structure for table `motherboard_data`
--

CREATE TABLE `motherboard_data` (
  `id` int(11) NOT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `socket` varchar(10) DEFAULT NULL,
  `chipset` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `pcie_gen` varchar(10) DEFAULT NULL,
  `pcie_x16_slot` int(11) DEFAULT NULL,
  `bios_flashback` varchar(5) DEFAULT NULL,
  `ram_slots` int(11) DEFAULT NULL,
  `ram_type` varchar(10) DEFAULT NULL,
  `max_ram_capacity` varchar(20) DEFAULT NULL,
  `sata_ports` int(11) DEFAULT NULL,
  `nvme1` varchar(20) DEFAULT NULL,
  `nvme2` varchar(20) DEFAULT NULL,
  `nvme3` varchar(20) DEFAULT NULL,
  `nvme4` varchar(20) DEFAULT NULL,
  `wifi` varchar(5) DEFAULT NULL,
  `audio` varchar(50) DEFAULT NULL,
  `vcore_vrm` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `motherboard_data`
--

INSERT INTO `motherboard_data` (`id`, `brand`, `socket`, `chipset`, `name`, `height`, `width`, `pcie_gen`, `pcie_x16_slot`, `bios_flashback`, `ram_slots`, `ram_type`, `max_ram_capacity`, `sata_ports`, `nvme1`, `nvme2`, `nvme3`, `nvme4`, `wifi`, `audio`, `vcore_vrm`) VALUES
(1, 'ASRock', 'AM4', 'B450', 'B450M-HDV', 231, 206, '3', 1, 'Yes', 2, 'DDR4', '32', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 4),
(2, 'ASUS', 'AM4', 'B450', 'PRIME B450M-K', 226, 221, '3', 1, 'Yes', 2, 'DDR4', '64', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 4),
(3, 'ASUS', 'AM4', 'B450', 'PRIME B450M-K II', 226, 221, '3', 1, 'Yes', 2, 'DDR4', '64', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 4),
(4, 'Biostar', 'AM4', 'B450', 'B450MH', 244, 198, '3', 1, 'Yes', 2, 'DDR4', '32', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 4),
(5, 'Biostar', 'AM4', 'B450', 'B450MHC', 244, 198, '3', 1, 'Yes', 2, 'DDR4', '32', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 4),
(6, 'Gigabyte', 'AM4', 'B450', 'B450M DS3H', 244, 215, '3', 2, 'Yes', 4, 'DDR4', '64', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 4),
(7, 'Gigabyte', 'AM4', 'B450', 'B450M DS3H V2', 244, 215, '3', 2, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 4),
(8, 'Gigabyte', 'AM4', 'B450', 'B450M DS3H WIFI', 244, 215, '3', 2, 'Yes', 4, 'DDR4', '64', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'Yes', 'ALC887', 4),
(9, 'Gigabyte', 'AM4', 'B450', 'B450M GAMING', 244, 205, '3', 1, 'Yes', 2, 'DDR4', '32', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 4),
(10, 'Gigabyte', 'AM4', 'B450', 'B450M S2H', 244, 205, '3', 1, 'Yes', 2, 'DDR4', '32', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 4),
(26, 'AMD', 'AM4', 'B450', 'B450M S2H V2', 244, 205, '3', 1, 'Y', 2, 'DDR4', '64', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'N', 'ALC887', 4),
(27, 'AMD', 'AM4', 'B450', 'B450M GAMING PLUS', 244, 210, '3', 1, 'Y', 2, 'DDR4', '64', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'N', 'ALC887', 4),
(28, 'AMD', 'AM4', 'B450', 'B450M PRO-M2', 244, 206, '3', 1, 'Y', 2, 'DDR4', '64', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'N', 'ALC887', 4),
(29, 'AMD', 'AM4', 'B450', 'B450M PRO-M2 MAX', 244, 206, '3', 1, 'Y', 2, 'DDR4', '64', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'N', 'ALC887', 4),
(30, 'AMD', 'AM4', 'B450', 'B450M PRO-M2 V2', 244, 206, '3', 1, 'Y', 2, 'DDR4', '64', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'N', 'ALC887', 4),
(31, 'AMD', 'AM4', 'B450', 'B450M-A PRO MAX', 236, 200, '3', 1, 'Y', 2, 'DDR4', '64', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'N', 'ALC892', 3),
(32, 'AMD', 'AM4', 'X470', 'X470GTQ', 244, 238, '3', 2, 'Y', 4, 'DDR4', '64', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'N', 'ALC887', 4),
(33, 'AMD', 'AM4', 'X470', 'X470MH', 244, 198, '3', 1, 'Y', 2, 'DDR4', '32', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'N', 'ALC887', 4),
(34, 'AMD', 'AM4', 'A520', 'A520M/ac', 230, 201, '3', 1, 'Y', 2, 'DDR4', '64', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'Y', 'ALC887', 4),
(35, 'AMD', 'AM4', 'A520', 'A520M-HDV', 230, 201, '3', 1, 'Y', 2, 'DDR4', '64', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'N', 'ALC887', 4),
(36, 'AMD', 'AM4', 'A520', 'A520M-HDVP', 244, 201, '3', 1, 'Y', 2, 'DDR4', '64', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'N', 'ALC887', 4),
(37, 'AMD', 'AM4', 'A520', 'A520M-HDVP/DASH', 244, 201, '3', 1, 'Y', 2, 'DDR4', '64', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'N', 'ALC887', 4),
(38, 'AMD', 'AM4', 'A520', 'A520M-HVS', 230, 201, '3', 1, 'Y', 2, 'DDR4', '64', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'N', 'ALC887', 4),
(39, 'AMD', 'AM4', 'A520', 'A520M Phantom Gaming 4', 244, 244, '3', 2, 'Y', 4, 'DDR4', '128', 4, 'PCIe 3.0x4', 'PCIe 3.0x2', 'None', 'None', 'N', 'ALC897', 6),
(40, 'AMD', 'AM4', 'A520', 'A520M Pro4', 244, 244, '3', 2, 'Y', 4, 'DDR4', '128', 4, 'PCIe 3.0x4', 'PCIe 3.0x2', 'None', 'None', 'N', 'ALC1200', 6),
(41, 'ASUS', 'AM4', 'A520', 'PRIME A520M-A', 244, 244, '3', 1, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC897', 6),
(42, 'ASUS', 'AM4', 'A520', 'PRIME A520M-A II', 244, 244, '3', 1, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC897', 6),
(43, 'ASUS', 'AM4', 'A520', 'PRIME A520M-E', 226, 221, '3', 1, 'Yes', 2, 'DDR4', '64', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC897', 4),
(44, 'ASUS', 'AM4', 'A520', 'PRIME A520M-K', 226, 221, '3', 1, 'Yes', 2, 'DDR4', '64', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC897', 4),
(45, 'ASUS', 'AM4', 'A520', 'Pro A520M-C/CSM', 244, 229, '3', 1, 'Yes', 2, 'DDR4', '64', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 4),
(46, 'ASUS', 'AM4', 'A520', 'TUF GAMING A520M-PLUS', 244, 244, '3', 1, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC897', 4),
(47, 'ASUS', 'AM4', 'A520', 'TUF GAMING A520M-PLUS WIFI', 244, 244, '3', 1, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'Yes', 'ALC897', 4),
(48, 'BIOSTAR', 'AM4', 'A520', 'A520MH', 244, 208, '3', 1, 'Yes', 2, 'DDR4', '64', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 5),
(49, 'GIGABYTE', 'AM4', 'A520', 'A520M AORUS ELITE', 244, 244, '3', 1, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 5),
(50, 'GIGABYTE', 'AM4', 'A520', 'A520M DS3H', 244, 244, '3', 1, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 5),
(51, 'GIGABYTE', 'AM4', 'A520', 'A520M DS3H AC', 244, 244, '3', 1, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'Yes', 'ALC887', 5),
(52, 'GIGABYTE', 'AM4', 'A520', 'A520M H', 244, 205, '3', 1, 'Yes', 2, 'DDR4', '64', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 4),
(53, 'GIGABYTE', 'AM4', 'A520', 'A520M S2H', 244, 205, '3', 1, 'Yes', 2, 'DDR4', '64', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC887', 5),
(54, 'MSI', 'AM4', 'A520', 'A520M PRO', 244, 210, '3', 1, 'Yes', 2, 'DDR4', '64', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC897', 4),
(55, 'MSI', 'AM4', 'A520', 'A520M PRO-C DASH', 244, 220, '3', 1, 'Yes', 2, 'DDR4', '64', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC897', 4),
(56, 'MSI', 'AM4', 'A520', 'A520M PRO-VDH', 244, 244, '3', 1, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC897', 4),
(57, 'MSI', 'AM4', 'A520', 'A520M PRO-VH', 236, 200, '3', 1, 'Yes', 2, 'DDR4', '64', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC897', 4),
(58, 'MSI', 'AM4', 'A520', 'A520M-A PRO', 236, 200, '3', 1, 'Yes', 2, 'DDR4', '64', 4, 'PCIe 3.0 x4', 'None', 'None', 'None', 'No', 'ALC897', 4),
(59, 'MSI', 'AM4', 'A520', 'MAG A520M BAZOOKA WIFI', 244, 244, '3', 1, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'Yes', 'ALC897', 6),
(60, 'MSI', 'AM4', 'A520', 'MAG A520M VECTOR WIFI', 244, 210, '3', 1, 'Yes', 2, 'DDR4', '64', 4, 'PCIe 3.0x4', 'None', 'None', 'None', 'Yes', 'ALC897', 6),
(61, 'ASRock', 'AM4', 'B550', 'B550M-HDV', 230, 201, '4', 1, 'Yes', 2, 'DDR4', '64', 4, 'PCIe 4.0x4', 'None', 'None', 'None', 'No', 'ALC887', 4),
(62, 'ASRock', 'AM4', 'B550', 'B550M/ac', 244, 244, '4', 2, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 4.0x4', 'PCIe 3.0x2', 'None', 'None', 'Yes', 'ALC1200', 8),
(63, 'ASRock', 'AM4', 'B550', 'B550M Phantom Gaming 4', 244, 244, '4', 2, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 4.0x4', 'PCIe 3.0x2', 'None', 'None', 'No', 'ALC897', 8),
(64, 'ASRock', 'AM4', 'B550', 'B550M PG Riptide', 244, 244, '4', 2, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 4.0x4', 'PCIe 3.0x2', 'None', 'None', 'No', 'ALC897', 8),
(65, 'ASRock', 'AM4', 'B550', 'B550M Pro4', 244, 244, '4', 2, 'Yes', 4, 'DDR4', '128', 6, 'PCIe 4.0x4', 'PCIe 3.0x2', 'None', 'None', 'No', 'ALC1200', 6),
(66, 'ASRock', 'AM4', 'B550', 'B550M Steel Legend', 244, 244, '4', 2, 'Yes', 4, 'DDR4', '128', 6, 'PCIe 4.0x4', 'PCIe 3.0x2', 'None', 'None', 'No', 'ALC1200', 8),
(67, 'ASRock Rack', 'AM4', 'B550', 'B550D4ID-2L2T', 170, 208, '4', 1, 'Yes', 4, 'DDR4', '128', 8, 'PCIe 4.0x4', 'PCIe 3.0x2', 'None', 'None', 'No', '-', 4),
(68, 'ASRock Rack', 'AM4', 'B550', 'B550D4U', 244, 244, '4', 1, 'Yes', 4, 'DDR4', '128', 5, 'PCIe 4.0x4', 'PCIe 3.0x2', 'None', 'None', 'No', '-', 4),
(69, 'ASRock Rack', 'AM4', 'B550', 'B550D4U-2T', 244, 244, '4', 1, 'Yes', 4, 'DDR4', '128', 5, 'PCIe 4.0x4', 'PCIe 3.0x2', 'None', 'None', 'No', '-', 4),
(70, 'ASUS', 'AM4', 'B550', 'PRIME B550M-A', 244, 244, '4', 1, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 4.0x4', 'PCIe 3.0x4', 'None', 'None', 'No', 'ALC897', 4),
(71, 'ASUS', 'AM4', 'B550', 'PRIME B550M-A (WI-FI)', 244, 244, '4', 1, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 4.0x4', 'PCIe 3.0x4', 'None', 'None', 'Yes', 'ALC897', 4),
(72, 'ASUS', 'AM4', 'B550', 'PRIME B550M-A AC', 244, 244, '4', 1, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 4.0x4', 'PCIe 3.0x4', 'None', 'None', 'Yes', 'ALC897', 4),
(73, 'ASUS', 'AM4', 'B550', 'PRIME B550M-A WIFI II', 244, 244, '4', 1, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 4.0x4', 'PCIe 3.0x4', 'None', 'None', 'Yes', 'ALC897', 4),
(74, 'ASUS', 'AM4', 'B550', 'PRIME B550M-K', 244, 244, '4', 1, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 4.0x4', 'PCIe 3.0x4', 'None', 'None', 'No', 'ALC897', 4),
(75, 'ASUS', 'AM4', 'B550', 'TUF GAMING B550M-E', 244, 244, '4', 2, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 4.0x4', 'PCIe 3.0x4', 'None', 'None', 'No', 'ALC897', 6),
(76, 'ASUS', 'AM4', 'B550', 'TUF GAMING B550M-E WIFI', 244, 244, '4', 2, 'Yes', 4, 'DDR4', '128', 4, 'PCIe 4.0x4', 'PCIe 3.0x4', 'None', 'None', 'Yes', 'ALC897', 6),
(77, 'Asus', 'AM4', 'B550', 'TUF GAMING B550M-PLUS', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'Yes', 'ALC1200', 8),
(78, 'Asus', 'AM4', 'B550', 'TUF GAMING B550M-PLUS (WI-FI)', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'Yes', 'ALC1200', 8),
(79, 'Asus', 'AM4', 'B550', 'TUF GAMING B550M-PLUS WIFI II', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'Yes', 'ALC897', 8),
(80, 'Asus', 'AM4', 'B550', 'TUF GAMING B550M (WI-FI) ZAKU II EDITION', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'Yes', 'ALC1200', 8),
(81, 'Biostar', 'AM4', 'B550', 'B550GTQ', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'No', 'ALC1150', 6),
(82, 'Biostar', 'AM4', 'B550', 'B550MH', 244, 208, '4', 1, 'Y', 2, 'DDR4', '64', 4, 'PCIe 4.0 x4', 'None', 'None', 'None', 'No', 'ALC897', 5),
(83, 'Biostar', 'AM4', 'B550', 'B550MX/E PRO', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'Yes', 'ALC897', 6),
(84, 'Biostar', 'AM4', 'B550', 'B550M-SILVER', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 8, 'PCIe 4.0 x4', 'PCIe 4.0 x4', 'None', 'None', 'Yes', 'ALC1200', 8),
(85, 'Gigabyte', 'AM4', 'B550', 'B550M AORUS ELITE', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 4, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'No', 'ALC1200', 8),
(86, 'Gigabyte', 'AM4', 'B550', 'B550M AORUS PRO', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'No', 'ALC1200', 8),
(87, 'Gigabyte', 'AM4', 'B550', 'B550M AORUS PRO-P', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'Yes', 'ALC1200', 8),
(88, 'Gigabyte', 'AM4', 'B550', 'B550M AORUS PRO AX', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'Yes', 'ALC1200', 8),
(89, 'Gigabyte', 'AM4', 'B550', 'B550M DS3H', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 4, 'PCIe 4.0 x4', 'PCIe 3.0 x2', 'None', 'None', 'No', 'ALC897', 5),
(90, 'Gigabyte', 'AM4', 'B550', 'B550M DS3H AC', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 4, 'PCIe 4.0 x4', 'PCIe 3.0 x2', 'None', 'None', 'Yes', 'ALC897', 5),
(91, 'Gigabyte', 'AM4', 'B550', 'B550M GAMING', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 4, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'No', 'ALC897', 6),
(92, 'Gigabyte', 'AM4', 'B550', 'B550M H', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 4, 'PCIe 4.0 x4', 'None', 'None', 'None', 'No', 'ALC897', 4),
(93, 'Gigabyte', 'AM4', 'B550', 'B550M S2H', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 4, 'PCIe 4.0 x4', 'None', 'None', 'None', 'No', 'ALC897', 4),
(94, 'MSI', 'AM4', 'B550', 'B550M-A PRO', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'No', 'ALC897', 6),
(95, 'MSI', 'AM4', 'B550', 'B550M PRO', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'No', 'ALC897', 6),
(96, 'MSI', 'AM4', 'B550', 'B550M PRO-DASH', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'No', 'ALC897', 8),
(97, 'MSI', 'AM4', 'B550', 'B550M PRO-VDH', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'No', 'ALC897', 8),
(98, 'MSI', 'AM4', 'B550', 'B550M PRO-VDH WIFI', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'Yes', 'ALC897', 8),
(99, 'MSI', 'AM4', 'B550', 'B550M PRO-VDH WIFI (CEC)', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'Yes', 'ALC897', 8),
(100, 'MSI', 'AM4', 'B550', 'MAG B550M BAZOOKA', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'No', 'ALC897', 8),
(101, 'MSI', 'AM4', 'B550', 'MAG B550M MORTAR', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'No', 'ALC1200', 8),
(102, 'MSI', 'AM4', 'B550', 'MAG B550M MORTAR WIFI', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'Yes', 'ALC1200', 8),
(103, 'MSI', 'AM4', 'B550', 'MAG B550M MORTAR MAX WIFI', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'Yes', 'ALC1200', 8),
(104, 'MSI', 'AM4', 'B550', 'MAG B550M VECTOR WIFI', 244, 210, '4', 1, 'Y', 2, 'DDR4', '64', 4, 'PCIe 4.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'Yes', 'ALC897', 4),
(105, 'MSI', 'AM4', 'B550', 'PRO B550M-P GEN3', 244, 244, '3', 2, 'Y', 4, 'DDR4', '128', 6, 'PCIe 3.0 x4', 'PCIe 3.0 x4', 'None', 'None', 'No', 'ALC897', 8),
(106, 'ASRock', 'AM4', 'X570', 'X570M Pro4', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 8, 'PCIe 4.0 x4', 'PCIe 4.0 x4', 'None', 'None', 'Yes', 'ALC1200', 8),
(107, 'ASRock Rack', 'AM4', 'X570', 'X570D4U-2L2T/BCM', 244, 244, '4', 2, 'Y', 4, 'DDR4', '128', 8, 'PCIe 4.0 x4', 'PCIe 4.0 x4', 'None', 'None', 'Yes', 'None', 8),
(108, 'Asus', 'AM4', 'X570', 'ROG Crosshair VIII Impact', 203, 170, '4', 1, 'Y', 2, 'DDR4', '64', 4, 'PCIe 4.0 x4', 'PCIe 4.0 x4', 'None', 'None', 'Yes', 'ALC1200', 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `motherboard_data`
--
ALTER TABLE `motherboard_data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `motherboard_data`
--
ALTER TABLE `motherboard_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=399;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
