-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 14, 2025 at 03:24 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web-laundry`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'admin', '$2b$10$bt04Y2W7DBe0uH66upS2I.Kv5lbsRZg/jRUoA.elLwd9O4wbjrn4u', '2025-11-08 07:17:02'),
(2, 'arief', '$2b$10$T4YUMQvfadE9d0.WzyCltuWbTs6qd8uTgmIAEukJWjsllIXfiFZ7C', '2025-11-08 07:17:24');

-- --------------------------------------------------------

--
-- Table structure for table `layanan`
--

CREATE TABLE `layanan` (
  `id` int NOT NULL,
  `nama_layanan` varchar(100) NOT NULL,
  `deskripsi` text,
  `tipe_layanan` enum('Kiloan','Satuan') DEFAULT 'Kiloan',
  `harga` decimal(10,2) NOT NULL,
  `satuan_harga` varchar(20) DEFAULT 'kg',
  `durasi` varchar(50) DEFAULT '2 hari'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `layanan`
--

INSERT INTO `layanan` (`id`, `nama_layanan`, `deskripsi`, `tipe_layanan`, `harga`, `satuan_harga`, `durasi`) VALUES
(12, 'Cuci Setrika', 'Cuci kering Setrika 3 hari', 'Kiloan', '5000.00', 'kg', '72'),
(13, 'Seprei Single', 'Ukuran Sprei Single', 'Satuan', '10000.00', 'pcs', '24'),
(14, 'Cuci Setrika Express 1 Jam', 'Layanan Cuci Express 1 Jam', 'Kiloan', '10000.00', 'kg', '1');

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id` int NOT NULL,
  `nama` varchar(100) NOT NULL,
  `no_telp` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`id`, `nama`, `no_telp`) VALUES
(1, 'Arief Rachman Sahertian', '089876543210'),
(5, 'Sual Soek', '0862534324'),
(6, 'Panji Petualang', '08644273524'),
(12, 'Johncena', '08123456789'),
(13, 'Jane Smith', '08987654321'),
(14, 'Dunia Manji', '084131562762'),
(15, 'Sualku', '086252525332');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int NOT NULL,
  `pelanggan_id` int NOT NULL,
  `total_harga` decimal(10,2) DEFAULT '0.00',
  `pembayaran_awal` decimal(10,2) DEFAULT '0.00',
  `pembayaran_status` enum('Belum Bayar','Bayar Awal','Lunas') DEFAULT 'Belum Bayar',
  `tanggal_masuk` date NOT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `status` enum('Pending','Diproses','Selesai','Terkirim','Dibatalkan') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id`, `pelanggan_id`, `total_harga`, `pembayaran_awal`, `pembayaran_status`, `tanggal_masuk`, `tanggal_selesai`, `status`) VALUES
(63, 1, '25000.00', '0.00', 'Bayar Awal', '2025-11-08', '2025-11-10', 'Pending'),
(67, 12, '50000.00', '25000.00', 'Bayar Awal', '2025-11-10', '2025-11-12', 'Pending'),
(68, 6, '15000.00', '0.00', 'Bayar Awal', '2025-11-08', '2025-11-10', 'Pending'),
(69, 14, '10000.00', '0.00', 'Bayar Awal', '2025-11-11', '2025-12-05', 'Pending'),
(70, 15, '40000.00', '0.00', 'Bayar Awal', '2025-11-11', '2025-12-05', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_detail`
--

CREATE TABLE `transaksi_detail` (
  `id` int NOT NULL,
  `transaksi_id` int NOT NULL,
  `layanan_id` int NOT NULL,
  `berat` decimal(5,2) DEFAULT '0.00',
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaksi_detail`
--

INSERT INTO `transaksi_detail` (`id`, `transaksi_id`, `layanan_id`, `berat`, `subtotal`) VALUES
(34, 63, 12, '3.00', '15000.00'),
(35, 63, 13, '1.00', '10000.00'),
(39, 67, 12, '10.00', '50000.00'),
(40, 68, 12, '3.00', '15000.00'),
(41, 69, 13, '1.00', '10000.00'),
(42, 70, 14, '2.00', '20000.00'),
(43, 70, 13, '2.00', '20000.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `layanan`
--
ALTER TABLE `layanan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pelanggan_id` (`pelanggan_id`);

--
-- Indexes for table `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaksi_id` (`transaksi_id`),
  ADD KEY `layanan_id` (`layanan_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `layanan`
--
ALTER TABLE `layanan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`pelanggan_id`) REFERENCES `pelanggan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  ADD CONSTRAINT `transaksi_detail_ibfk_1` FOREIGN KEY (`transaksi_id`) REFERENCES `transaksi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_detail_ibfk_2` FOREIGN KEY (`layanan_id`) REFERENCES `layanan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
