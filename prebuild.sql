-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2024 at 11:19 AM
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
-- Table structure for table `prebuild`
--

CREATE TABLE `prebuild` (
  `PCName` varchar(255) DEFAULT NULL,
  `CPU` varchar(255) DEFAULT NULL,
  `Cooler` varchar(255) DEFAULT NULL,
  `Mobo` varchar(255) DEFAULT NULL,
  `Ram` varchar(255) DEFAULT NULL,
  `SSD` varchar(255) DEFAULT NULL,
  `PSU` varchar(255) DEFAULT NULL,
  `Casing` varchar(255) DEFAULT NULL,
  `GPU` varchar(255) DEFAULT NULL,
  `Peripheral` varchar(255) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `pictures` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prebuild`
--

INSERT INTO `prebuild` (`PCName`, `CPU`, `Cooler`, `Mobo`, `Ram`, `SSD`, `PSU`, `Casing`, `GPU`, `Peripheral`, `Price`, `pictures`, `id`) VALUES
('Eclipse RX 580', 'Ryzen 5 5500', 'Stock', 'MSI B450m PRO VDH MAX', '2x8gb 3200mhz', 'Adata Legend 710 512gb', 'MSI MAG A550BN', 'Antec NX200M 27L', 'RX 580 8GB', '2 Scythe Kaze Flex 140 ARGB + Spllitter', 8000000.00, 'EclipseRX580.png\r\n', 1),
('Eclipse GTX 1650', 'Ryzen 5 5500', 'Stock', 'MSI B450m PRO VDH MAX', '2x8gb 3200mhz', 'Adata Legend 710 512gb', 'MSI MAG A550BN', 'Antec NX200M 27L', 'GTX 1650 4GB', '2 Scythe Kaze Flex 140 ARGB + Spllitter', 8500000.00, 'EclipseGTX1650.png', 2),
('Eclipse Lv2', 'Ryzen 5 5500', 'Stock', 'MSI B450m PRO VDH MAX', '2x8gb 3200mhz', 'Adata Legend 710 512gb', 'MSI MAG A550BN', 'Antec NX200M 27L', 'RX 6600 8GB', '2 Scythe Kaze Flex 140 ARGB + Spllitter', 10000000.00, 'Eclipselv2.png', 3),
('Blizzard', 'Ryzen 5 5600', 'ThermalrightAssassin X White ARGB', 'MSI B550m Pro VDH Wifi', '2x8gb 3600mhz (Team Group)', 'Adata Lite 850 1tb', 'MSI Mag A650BN', 'VenomRX Prava', 'Zotac RTX 4060', 'ID Cooling Tf-12025 + Cable Extension', 13900000.00, 'Blizzard.png', 4),
('Blizzard Lv2', 'Ryzen 5 5600', 'ThermalrightAssassin X White ARGB', 'MSI B550m Pro VDH Wifi', '2x8gb 3600mhz (Team Group)', 'Adata Lite 850 1tb', 'MSI Mag A650BN', 'VenomRX Prava', 'Zotac RTX 4060 Ti', 'ID Cooling Tf-12025 + Cable Extension', 15800000.00, 'Blizzardlv2.png', 5),
('Blizzard Lv3', 'Ryzen 5 7500F', 'Thermalright PA 120 SE ARGB', 'ASROCK B650M PG LIGHTNING Wifi', 'ADATA LANCER BLADE RGB 2x16GB', 'Adata Lite 850 1tb', 'MSI Mag A650BN', 'VenomRX Prava', 'Zotac RTX 4060 Ti', 'ID Cooling Tf-12025 + Cable Extension', 18900000.00, 'Blizzardlv3.png', 6),
('Neon Eclipse', 'Ryzen 5 7500F', 'DeepCool LE520 ARGB', 'ASROCK B650M PG LIGHTNING Wifi', 'ADATA LANCER BLADE RGB 2x16GB', 'Adata Lite 850 1tb', 'ENERMAX REVOLUTION D.F. 750W', 'Tecware VXM MESH BLACK mATX', 'POWERCOLOR RX 7700 XT', 'Fan pack 5', 21000000.00, 'Neonlv1.png', 7),
('Neon Eclipse Lv2', 'Ryzen 5 7600', 'DeepCool LE520 ARGB', 'ASROCK B650M PG LIGHTNING Wifi', 'ADATA LANCER BLADE RGB 2x16GB', 'Adata Lite 850 1tb', 'ENERMAX REVOLUTION D.F. 750W', 'Lian Li A3', 'POWERCOLOR RX 7900 GRE', 'Fan pack 5', 24000000.00, 'Neonlv2.png\r\n', 8),
('Neon Eclipse RTX 4070 S', 'Ryzen 5 7600', 'DeepCool LE520 ARGB', 'ASROCK B650M PG LIGHTNING Wifi', 'ADATA LANCER BLADE RGB 2x16GB', 'Adata Lite 850 1tb', 'ENERMAX REVOLUTION D.F. 750W', 'Tecware VXM MESH BLACK mATX', 'RTX 4070 Super', 'Fan Pack 5', 24000000.00, 'NeonRTX4070S.png', 9),
('Neon Eclipse Lv3', 'Ryzen 5 7600', 'DeepCool LE520 ARGB', 'ASROCK B650M PG LIGHTNING Wifi', 'ADATA LANCER BLADE RGB 2x16GB', 'Adata Lite 850 1tb', 'ENERMAX REVOLUTION D.F. 750W', 'Lian Li A3', 'GALAX GeForce RTX 4070 Ti', 'Fan pack 5', 26600000.00, 'Neonlv3.png', 10),
('Obsidian', 'I5 12400F', 'Thermalright PA 120 SE ARGB', 'MSI PRO B760M-A WIFI', '2x8gb 3600mhz (Team Group)', 'Adata Lite 850 1tb', 'MSI Mag A650BN', 'Cooler Master MasterBox Q300L V2', 'RX 7600', 'Fan pack 5', 14700000.00, 'ObsidianLv1.png', 11),
('Obsidian RTX 4060', 'I5 12400F', 'Thermalright PA 120 SE ARGB', 'MSI PRO B760M-A WIFI', '2x8gb 3600mhz (Team Group)', 'Adata Lite 850 1tb', 'MSI Mag A650BN', 'Cooler Master MasterBox Q300L V2', 'Zotac RTX 4060', 'Fan pack 5', 15400000.00, 'ObsidianRTX4060.png', 12),
('Obsidian Lv2', 'I5 12400F', 'Thermalright PA 120 SE ARGB', 'MSI PRO B760M-A WIFI', '2x8gb 3600mhz (Team Group)', 'Adata Lite 850 1tb', 'ENERMAX REVOLUTION D.F. 750W', 'Cooler Master MasterBox Q300L V2', 'Zotac RTX 4060 TI', 'Fan pack 5', 17700000.00, 'ObsidianLv2.png', 13),
('Obsidian Lv3', 'I5 13400F', 'Thermalright PA 120 SE ARGB', 'MSI PRO B760M-A WIFI', '2x8gb 3600mhz (Team Group)', 'Adata Lite 850 1tb', 'ENERMAX REVOLUTION D.F. 750W', 'Cooler Master MasterBox Q300L V2', 'Zotac RTX 4070 Super', 'Fan Pack 5', 22000000.00, 'ObsidianLv3.png', 14),
('Eclipse Mini', 'i5 12400F', 'Thermalright Si100', 'Maxsun B760i DDR5', 'ADATA LANCER BLADE RGB 2x16GB', 'Adata 850 Lite 1TB', 'Fractal Design ION 650w SFX', 'Cooler Master NR200', 'RX 6600', 'ID Cooling Tf-12025 x4', 14500000.00, 'EclipseMiniRX6600.png', 15),
('Eclipse Mini Lv 2', 'i5 12400F', 'Thermalright Si100', 'Maxsun B760i DDR5', 'ADATA LANCER BLADE RGB 2x16GB', 'Adata 850 Lite 1TB', 'Fractal Design ION 650w SFX', 'Cooler Master NR200', 'RTX 4060', 'ID Cooling Tf-12025 x4', 16200000.00, 'EclipseMini.png', 16),
('Eclipse Mini Lv 3', 'i5 12400F', 'Thermalright Si100', 'Maxsun B760i DDR5', 'ADATA LANCER BLADE RGB 2x16GB', 'Adata 850 Lite 1TB', 'Fractal Design ION 650w SFX', 'Cooler Master NR200', 'RX 7700 XT', 'ID Cooling Tf-12025 x4', 19000000.00, 'EclipseMiniRTX7700XT.png', 17),
('Eclipse Mini Lv 4', 'i5 12400F', 'Thermalright Si100', 'Maxsun B760i DDR5', 'ADATA LANCER BLADE RGB 2x16GB', 'Adata 850 Lite 1TB', 'Fractal Design ION 650w SFX', 'Cooler Master NR200', 'RTX 4070 Super', 'ID Cooling Tf-12025 x4', 21600000.00, 'EclipseMiniRTX4070S.png', 18);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prebuild`
--
ALTER TABLE `prebuild`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prebuild`
--
ALTER TABLE `prebuild`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
