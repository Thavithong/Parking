-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 07, 2020 at 10:43 PM
-- Server version: 5.7.31-log
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `southida_parking`
--

-- --------------------------------------------------------

--
-- Table structure for table `history_log`
--

CREATE TABLE `history_log` (
  `id` int(11) NOT NULL,
  `create_date` date NOT NULL,
  `create_time` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `error_code` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `error_message` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `action_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `shop_id` int(11) NOT NULL,
  `shop_email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `history_log`
--

INSERT INTO `history_log` (`id`, `create_date`, `create_time`, `error_code`, `error_message`, `action_name`, `shop_id`, `shop_email`, `user_id`) VALUES
(27, '2020-09-30', '01:28:38 AM', 'Not yet register but want to use our service', 'Account Bopbykeodouangdy123@gmail.com is not register.', 'Login', 1601429013, 'Bopbykeodouangdy123@gmail.com', ''),
(28, '2020-09-30', '01:28:47 AM', 'Not yet register but want to use our service', 'Account Bopbykeodouangdy123@gmail.com is not register.', 'Login', 1601429013, 'Bopbykeodouangdy123@gmail.com', ''),
(29, '2020-09-30', '01:29:15 AM', 'Not yet register but want to use our service', 'Account Bopbykeodouangdy123@gmail.com is not register.', 'Login', 1601429013, 'Bopbykeodouangdy123@gmail.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `tb_returnmoney`
--

CREATE TABLE `tb_returnmoney` (
  `return_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `vehicle_number` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `trans_date` date NOT NULL,
  `shop_id` int(11) NOT NULL,
  `shop_email` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_shop`
--

CREATE TABLE `tb_shop` (
  `shop_id` int(11) NOT NULL,
  `shop_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `shop_email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `shop_phone` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `shop_permission` int(11) NOT NULL,
  `latitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `long_latitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `shop_address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `total_device` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tb_shop`
--

INSERT INTO `tb_shop` (`shop_id`, `shop_name`, `shop_email`, `shop_phone`, `shop_permission`, `latitude`, `long_latitude`, `shop_address`, `total_device`) VALUES
(1601783203, 'Thavithong', 'Thavithong@gmail.com ', '2099588891', 1, '0', '0', 'Jhamngoy', 1),
(1602059723, 'Test', 'kounmany.kk@gmail.com', '02095829632', 0, '0', '0', 'Nongbone', 1),
(1602063770, 'ຄຳມີ', 'Khammy@gmail.com', '2099588891', 0, '0', '0', 'Naxay', 1),
(1602119562, 'kinnaly', 'kinnaly@gmail.com', '2099588891', 1, '0', '0', 'Naxay', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_transaction`
--

CREATE TABLE `tb_transaction` (
  `id` int(11) NOT NULL,
  `trans_id` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `trans_date` date NOT NULL,
  `amount` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `vehicle_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `vehicle_number` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `trans_time` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `shop_id` int(11) NOT NULL,
  `shop_email` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tb_transaction`
--

INSERT INTO `tb_transaction` (`id`, `trans_id`, `trans_date`, `amount`, `vehicle_id`, `vehicle_name`, `vehicle_number`, `user_id`, `status`, `trans_time`, `shop_id`, `shop_email`) VALUES
(43, '202010882649', '2020-10-08', 2000, 2, 'ລົດຈັກ', '2200', 2, '1', '08:26:49', 1602119562, 'kinnaly@gmail.com'),
(44, '202010891935', '2020-10-08', 2000, 2, 'ລົດຈັກ', '8999', 3, '1', '09:19:35', 1602063770, 'Khammy@gmail.com'),
(45, '202010891931', '2020-10-08', 2000, 2, 'ລົດຈັກ', '4667', 3, '1', '09:19:31', 1602063770, 'Khammy@gmail.com'),
(46, '202010891926', '2020-10-08', 2000, 2, 'ລົດຈັກ', 'DDuugg', 3, '1', '09:19:26', 1602063770, 'Khammy@gmail.com'),
(47, '20201089199', '2020-10-08', 5000, 1, 'ລົດໃຫຍ່', 'Hd hdjd', 3, '1', '09:19:09', 1602063770, 'Khammy@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `shop_id` int(11) NOT NULL,
  `shop_email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `device_uid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_state` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `device_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`user_id`, `user_name`, `password`, `email`, `shop_id`, `shop_email`, `device_uid`, `user_state`, `device_token`) VALUES
(57, 'Thavithong', '111111', 'Thavithong@gmail.com ', 1601783203, 'Thavithong@gmail.com ', 'db6443a745c1b2f7', '1', 'f4OHdOhEQsewfdyhI5qeeH:APA91bHw6MyM8kccvmj1UzWcxHSsOO3Kbg8ud10uJlqN-ut8hqrsq5iLdDAtTOxt6yhU2BJNccxU-831ZOPa0JXIT-TcdXHNi_jRpTFt0FWjNeypqO0eWsG-QN_64xv05RPoJe45WsEo'),
(58, 'Nicka', '12345678', 'kounmany.kk@gmail.com', 1602059723, 'kounmany.kk@gmail.com', '2d378d505c5dffd1', '0', 'ecTScvvvTsGeLGihRdomSf:APA91bHEFoWtsw3--2Qxmr_QlCQ9tOHEd2397F9aQEYTex7kckVFFwcIiY47aHk8LvkPWy6e0iETRsuGMWQ7jOCHmoqoZgki7ma-RR5AM4XuhoOcajoJ84w9vtvvCAfkhV8WBOQDb6BZ'),
(59, 'Khammy', '111111', 'Khammy@gmail.com', 1602063770, 'Khammy@gmail.com', 'db6443a745c1b2f7', '0', 'f4OHdOhEQsewfdyhI5qeeH:APA91bHw6MyM8kccvmj1UzWcxHSsOO3Kbg8ud10uJlqN-ut8hqrsq5iLdDAtTOxt6yhU2BJNccxU-831ZOPa0JXIT-TcdXHNi_jRpTFt0FWjNeypqO0eWsG-QN_64xv05RPoJe45WsEo'),
(60, 'kinnaly', '111111', 'kinnaly@gmail.com', 1602119562, 'kinnaly@gmail.com', '476d92af258be884', '1', 'fFBNQ8Q1T6-_EBMq3-0Gv9:APA91bGNX4Uv88WDeA5wU1sKUG6E6qLeRh5JHaW1xXsL0DhQCkJk7t04vnMhaxu8Ug7Y5Yp3EGoPQ01BZo5n-k-w5Hyr2DYX9qNcoh7UHbdgyc61gBNcjNZkSNIkcCWTxIgvv8vua8Dc');

-- --------------------------------------------------------

--
-- Table structure for table `tb_vehicle`
--

CREATE TABLE `tb_vehicle` (
  `vehicle_id` int(11) NOT NULL,
  `vehicle_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `vehicle_price` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `shop_email` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_version`
--

CREATE TABLE `tb_version` (
  `id` int(11) NOT NULL,
  `version_title` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `version_description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `version_android` int(11) NOT NULL,
  `version_ios` int(11) NOT NULL,
  `update_time_android` date NOT NULL,
  `update_time_ios` date NOT NULL,
  `status_update` int(11) NOT NULL,
  `language` varchar(2) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tb_version`
--

INSERT INTO `tb_version` (`id`, `version_title`, `version_description`, `version_android`, `version_ios`, `update_time_android`, `update_time_ios`, `status_update`, `language`) VALUES
(1, 'Available', 'Update new version for get bonus', 3, 2, '2020-06-30', '2020-06-30', 1, 'en'),
(2, 'Available', 'Update new version for get bonus', 3, 2, '2020-06-30', '2020-06-30', 1, 'lo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history_log`
--
ALTER TABLE `history_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_returnmoney`
--
ALTER TABLE `tb_returnmoney`
  ADD PRIMARY KEY (`return_id`);

--
-- Indexes for table `tb_shop`
--
ALTER TABLE `tb_shop`
  ADD PRIMARY KEY (`shop_id`);

--
-- Indexes for table `tb_transaction`
--
ALTER TABLE `tb_transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tb_vehicle`
--
ALTER TABLE `tb_vehicle`
  ADD PRIMARY KEY (`vehicle_id`);

--
-- Indexes for table `tb_version`
--
ALTER TABLE `tb_version`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history_log`
--
ALTER TABLE `history_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `tb_returnmoney`
--
ALTER TABLE `tb_returnmoney`
  MODIFY `return_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_transaction`
--
ALTER TABLE `tb_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `tb_vehicle`
--
ALTER TABLE `tb_vehicle`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_version`
--
ALTER TABLE `tb_version`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
