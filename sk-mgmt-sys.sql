-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2024 at 06:32 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sk-mgmt-sys`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `account_status` varchar(50) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `brgy_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `email`, `password`, `account_status`, `role_id`, `brgy_id`) VALUES
(1, 'superadmin', 'super@admin.com', '$2a$10$HQ4huJwdhD.9AH8xnsdySuJAbcFIaMGWfHPQ7d.p9l/ibSoe5.Psi', 'active', 1, NULL),
(2, 'kyle', 'kyleee@gmail.com', '$2a$10$GnRrhAQL789MvkYvZqvFZOjVx2LLbPZAPkYO.5Js31M16t8TPYprq', 'active', 3, 1),
(3, 'princess', 'princess@gmail.com', '$2a$10$FvgH6PTCVrKXx/X.YcnnzOk3YATzGFwqKhjdlaOxyCachRQNCyHvK', 'active', 3, 8),
(4, 'kassy', 'kassy@gmail.com', '$2a$10$lpmaLyG82XQ/y1wTjzCxjeNrl6uBAwPRaz923QwK4GQiuQGZixyuW', 'active', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `action_logs`
--

CREATE TABLE `action_logs` (
  `id` int(11) NOT NULL,
  `account_id` int(11) DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `details` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `action_logs`
--

INSERT INTO `action_logs` (`id`, `account_id`, `action`, `details`, `ip_address`, `user_agent`, `created_at`) VALUES
(1, 1, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 13:57:08'),
(2, 1, 'User Registration', 'Successfully registered user kyle', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 13:57:23'),
(3, 1, 'User Registration', 'Successfully registered user princess', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 13:57:52'),
(4, 1, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 13:57:58'),
(5, 1, 'Failed Login', 'Incorrect username or password', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 13:58:03'),
(6, 1, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 13:58:16'),
(7, 1, 'Profile Update', 'User profile updated successfully for user ID 1', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 13:58:44'),
(8, 1, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 13:58:48'),
(9, 1, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 13:58:54'),
(10, 1, 'Password Change', 'Password changed successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 13:59:06'),
(11, 1, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 13:59:09'),
(12, 1, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 13:59:11'),
(13, 1, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 13:59:18'),
(14, 2, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 13:59:25'),
(15, 2, 'User Registration', 'Successfully registered user kassy', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:00:03'),
(16, 2, 'Deactivated Account', 'User kassy status changed to deactivated', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:00:06'),
(17, 2, 'Activated Account', 'User kassy status changed to active', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:00:07'),
(18, 2, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:00:10'),
(19, 4, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:00:18'),
(20, 4, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', '2024-10-23 14:01:42'),
(21, 2, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', '2024-10-23 14:01:47'),
(22, 2, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', '2024-10-23 14:01:56'),
(23, 2, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', '2024-10-23 14:02:03'),
(24, 2, 'Profile Update', 'User profile updated successfully for user ID 2', '127.0.0.1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', '2024-10-23 14:03:47'),
(25, 2, 'Profile Update', 'User profile updated successfully for user ID 2', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:04:44'),
(26, 2, 'Profile Update', 'User profile updated successfully for user ID 2', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:04:49'),
(27, 2, 'Profile Update', 'User profile updated successfully for user ID 2', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:04:54'),
(28, 2, 'Profile Update', 'User profile updated successfully for user ID 2', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:05:06'),
(29, 2, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:05:09'),
(30, 2, 'Failed Login', 'Incorrect username or password', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:05:17'),
(31, 2, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:05:23'),
(32, 2, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:05:50'),
(33, 4, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:05:55'),
(34, 4, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:07:40'),
(35, 1, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:07:42'),
(36, 1, 'Create Publication', 'Successfully created publication \"LAGONGLONG INTER BARANGAY VOLLEYBALL LEAGUE\"', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:08:23'),
(37, 1, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:08:34'),
(38, 2, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:08:50'),
(39, 2, 'Create Publication', 'Successfully created publication \"Brgy. Poblacion Free Dental Checkup\"', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:11:55'),
(40, 2, 'Publication Update', 'Successfully updated publication: Brgy. Poblacion Free Dental Checkup', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:12:10'),
(41, 2, 'Publication Update', 'Successfully updated publication: Brgy. Poblacion Free Dental Checkup (10/20/2024)', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:12:27'),
(42, 2, 'Publication Update', 'Successfully updated publication: Brgy. Poblacion Free Dental Checkup ', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:12:38'),
(43, 2, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:12:58'),
(44, 3, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:13:04'),
(45, 3, 'Profile Update', 'User profile updated successfully for user ID 3', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:13:44'),
(46, 3, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:13:48'),
(47, 3, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:13:59'),
(48, 3, 'Create Publication', 'Successfully created publication \"Gaston Coastal Cleanup Drive\"', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:15:25'),
(49, 3, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:15:31'),
(50, 1, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:15:34'),
(51, 1, 'Publication Update', 'Successfully updated publication: LAGONGLONG INTER BARANGAY VOLLEYBALL LEAGUE', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:53:13'),
(52, 1, 'Publication Update', 'Successfully updated publication: LAGONGLONG INTER BARANGAY VOLLEYBALL LEAGUE', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:54:08'),
(53, 1, 'Publication Update', 'Successfully updated publication: LAGONGLONG INTER BARANGAY VOLLEYBALL LEAGUE', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 14:54:30'),
(54, 2, 'Login', 'User logged in successfully', '127.0.0.1', 'PostmanRuntime/7.42.0', '2024-10-23 15:04:54'),
(55, 1, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:19:28'),
(56, 1, 'Create Announcement Error', 'Error during creating announcement: Unknown column \'status\' in \'field list\'', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:21:50'),
(57, 1, 'Create Announcement Error', 'Error during creating announcement: Unknown column \'status\' in \'field list\'', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:23:08'),
(58, 1, 'Create Announcement', 'Successfully created announcement \"sample\"', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:28:10'),
(59, 1, 'Create Announcement', 'Successfully created announcement \"sadsad\"', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:34:00'),
(60, 1, 'Create Announcement', 'Successfully created announcement \"Sample\"', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:34:39'),
(61, 1, 'Create Announcement', 'Successfully created announcement \"sample 2\"', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:37:17'),
(62, 1, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:38:30'),
(63, 2, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:38:36'),
(64, 2, 'Create Announcement', 'Successfully created announcement \"Poblacion Summer Sports League\"', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:39:21'),
(65, 2, 'Announcement Update', 'Successfully updated announcement: Poblacion Summer Sports League', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:40:22'),
(66, 2, 'Announcement Update', 'Successfully updated announcement: Poblacion Summer Sports League', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:40:42'),
(67, 2, 'Delete Announcement', 'Successfully deleted announcement \"Poblacion Summer Sports League\" with id 5', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:42:23'),
(68, 2, 'Create Announcement', 'Successfully created announcement \"Summer Sports League Brgy Poblacion\"', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:42:54'),
(69, 2, 'Announcement Update', 'Successfully updated announcement: Summer Sports League Brgy Poblacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 15:43:02'),
(70, 2, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:01:41'),
(71, 1, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:01:46'),
(72, 1, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:02:39'),
(73, 4, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:02:49'),
(74, 4, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:04:36'),
(75, 4, 'Login', 'User logged in successfully', '127.0.0.1', 'PostmanRuntime/7.42.0', '2024-10-23 16:06:59'),
(76, 1, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:12:25'),
(77, 1, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:23:03'),
(78, 1, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:23:07'),
(79, 1, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:25:31'),
(80, 1, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:26:10'),
(81, 1, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:27:15'),
(82, 2, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:27:20'),
(83, 2, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:27:35'),
(84, 4, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:27:41'),
(85, 4, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:27:55'),
(86, 1, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:27:59'),
(87, 1, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:30:15'),
(88, 2, 'Login', 'User logged in successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:30:24'),
(89, 2, 'Logout', 'User logged out successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-23 16:31:20');

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `account_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `account_id` int(11) DEFAULT NULL,
  `brgy_id` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `type`, `title`, `attachment`, `content`, `created_at`, `updated_at`, `account_id`, `brgy_id`, `status`) VALUES
(1, 'Super Admin', 'sample', 'uploads\\announcements\\1729697290372.jpg', 'sample', '2024-10-23 07:28:10', '2024-10-23 15:28:10', 1, NULL, 'draft'),
(6, 'Chairperson', 'Summer Sports League Brgy Poblacion', 'uploads\\announcements\\1729698182114.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget tortor molestie, ornare odio nec, posuere nisi. Donec sit amet ligula non massa tempus bibendum. Maecenas elementum mollis vestibulum. Pellentesque efficitur nibh sodales sodales ultricies. Ut pretium massa erat, eu imperdiet tellus fermentum ut.', '2024-10-23 15:43:02', '2024-10-23 15:43:02', 2, 1, 'draft');

-- --------------------------------------------------------

--
-- Table structure for table `barangay`
--

CREATE TABLE `barangay` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barangay`
--

INSERT INTO `barangay` (`id`, `name`) VALUES
(5, 'Banglay'),
(3, 'Dampil'),
(8, 'Gaston'),
(2, 'Kabulawan'),
(7, 'Kauswagan'),
(9, 'Lumbo'),
(4, 'Manaol'),
(1, 'Poblacion'),
(6, 'Tabok'),
(10, 'Umagos');

-- --------------------------------------------------------

--
-- Table structure for table `blacklisted_token`
--

CREATE TABLE `blacklisted_token` (
  `id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blacklisted_token`
--

INSERT INTO `blacklisted_token` (`id`, `token`) VALUES
(16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkNoYWlycGVyc29uIiwiaWF0IjoxNzI5Njk3OTE2LCJleHAiOjE3Mjk3MDE1MTZ9.sCWX8pTcRns75HfMa7Z0L3p_c5rtljVEsphVWEn0HbA'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkNoYWlycGVyc29uIiwiaWF0IjoxNzI5NjkxOTY1LCJleHAiOjE3Mjk2OTU1NjV9.oWB0aR12aGertfOIymLNOPUrKDrHAkoWt6ASc8hkkc4'),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkNoYWlycGVyc29uIiwiaWF0IjoxNzI5NjkyMTA3LCJleHAiOjE3Mjk2OTU3MDd9.8r7XpQAh27gz0S-sHVq_kainXi82TYFwfiesNDIUoQQ'),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkNoYWlycGVyc29uIiwiaWF0IjoxNzI5NjkyMTIzLCJleHAiOjE3Mjk2OTU3MjN9.RJY9Mkx2CxDeqSFDPD_6M_K2HFBsMGanSzFx6IuxpdU'),
(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkNoYWlycGVyc29uIiwiaWF0IjoxNzI5NjkyMzIzLCJleHAiOjE3Mjk2OTU5MjN9.DrjmxxP2c6pgPOuFGKUZrOWUK7Gz6PNf-npBc0Cd6iw'),
(12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkNoYWlycGVyc29uIiwiaWF0IjoxNzI5NjkyNTMwLCJleHAiOjE3Mjk2OTYxMzB9.VXmd9r4YBy8tDkn0NGhmu1h-sBNzeeRnSOdTySjIp3E'),
(22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkNoYWlycGVyc29uIiwiaWF0IjoxNzI5NzAwODQwLCJleHAiOjE3Mjk3MDQ0NDB9.toVNXrrGz_AEhu7cZ3I-h4g_sq-4_mmpTA4nRr634yY'),
(25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkNoYWlycGVyc29uIiwiaWF0IjoxNzI5NzAxMDI0LCJleHAiOjE3Mjk3MDQ2MjR9.xDJXpZFW8TW4cAEGpApLYfABFmoPoa3Ci5KRt1f3WGU'),
(15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzI5Njk2NzY4LCJleHAiOjE3Mjk3MDAzNjh9.wyLjCGxMmoxmR5XaNbjY26NxENIQdWbZB5ZY0ZQhi5U'),
(17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzI5Njk5MzA2LCJleHAiOjE3Mjk3MDI5MDZ9.QEiaoR9cTD4xuJRqKT6-TTPhnCVQ9hWkPTcCjI0BqsY'),
(19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzI5Njk5OTQ1LCJleHAiOjE3Mjk3MDM1NDV9._YxjVULy04m67PwhSlUBgh4XTjjIPjxHhyZRNsyIgvI'),
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzI5NjkxODI4LCJleHAiOjE3Mjk2OTU0Mjh9.HCYTv9nunSfYZhWheIzytkV5eps51xl2zuSjOJFZnZA'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzI5NjkxODk2LCJleHAiOjE3Mjk2OTU0OTZ9.11re6uzTaDYUe38WZj0SF42NuFGPpz_gNHAPwiRPlb8'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzI5NjkxOTM0LCJleHAiOjE3Mjk2OTU1MzR9.Cy-5tcPMvFrwqBtgWqOtvMKZC5Lo5fPPaKCOW4gt6WM'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzI5NjkxOTUxLCJleHAiOjE3Mjk2OTU1NTF9.LpZNdt3ZGxLC_MgLYyAOGQoqSATxpTBapnJBjp3nvrU'),
(11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzI5NjkyNDYyLCJleHAiOjE3Mjk2OTYwNjJ9.q1gW7gWq7o_6x2_AFYmhQI2BDRn7_1oOsbF9y6AI5Nc'),
(20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzI5NzAwNTg3LCJleHAiOjE3Mjk3MDQxODd9.FC8eTBS6kxYUkJKpzHHHOqFIRFUmF0koZf-eVxZpVeU'),
(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzI5NzAwNzcwLCJleHAiOjE3Mjk3MDQzNzB9.iwjB3mlEPvNTAHJPjATv0Xwf6hgTaUWV4RPKaYk34_A'),
(24, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzI5NzAwODc5LCJleHAiOjE3Mjk3MDQ0Nzl9.Jh3ghSU8O_PGoiXxvLN4QLnzNgGcRjnKO995ksObWj0'),
(13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkNoYWlycGVyc29uIiwiaWF0IjoxNzI5NjkyNzg0LCJleHAiOjE3Mjk2OTYzODR9.8dPFwGXOHIOvQWBBN6yN86-6-Jc-gpAMvAviiOwHWjc'),
(14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkNoYWlycGVyc29uIiwiaWF0IjoxNzI5NjkyODM5LCJleHAiOjE3Mjk2OTY0Mzl9.DC1O9Q_Et90YpNkzLDrpKPFZxWoD5JKQqYs5zeQbFHs'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6IlVzZXIiLCJpYXQiOjE3Mjk2OTIwMTgsImV4cCI6MTcyOTY5NTYxOH0.HyiHa6rusv37tROU5KcHYw2udadyaNQeMB651YHDEWI'),
(10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6IlVzZXIiLCJpYXQiOjE3Mjk2OTIzNTUsImV4cCI6MTcyOTY5NTk1NX0.tZYmJXJoze_oZJ2l158NzHqpNjPi3kPook81F9gry2c'),
(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6IlVzZXIiLCJpYXQiOjE3Mjk2OTkzNjksImV4cCI6MTcyOTcwMjk2OX0.x3ZPzAaVOh9XNe4KfFG-tycMOXzzkvJ6AGaEKSsmyRM'),
(23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6IlVzZXIiLCJpYXQiOjE3Mjk3MDA4NjEsImV4cCI6MTcyOTcwNDQ2MX0.qWWzvVh343J1J8MysZrraJdefYHo0rxLSnp62qGruAU');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int(11) NOT NULL,
  `feedback` longtext DEFAULT NULL,
  `publication_id` int(11) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `civil_status` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `religion` varchar(50) DEFAULT NULL,
  `contact_number` varchar(50) DEFAULT NULL,
  `voter_status` varchar(50) DEFAULT NULL,
  `educational_attainment` longtext DEFAULT NULL,
  `skills` longtext DEFAULT NULL,
  `interest` longtext DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `profile_img`, `first_name`, `middle_name`, `last_name`, `date_of_birth`, `address`, `civil_status`, `gender`, `religion`, `contact_number`, `voter_status`, `educational_attainment`, `skills`, `interest`, `account_id`) VALUES
(1, 'uploads\\default_profile.jpg', 'Super ', '', 'Admin', '2001-01-01', '', 'Single', 'Female', 'Christian', '', '', '', '', '', 1),
(2, 'uploads\\default_profile.jpg', 'Kyle', 'Santos', 'Pabellan', '2003-02-14', 'Sample Address', 'Single', 'Male', 'Catholic', '09232435234', 'active', 'College Level', 'Programming', 'Basketball', 2),
(3, 'uploads\\default_profile.jpg', 'Princess Nina', '', 'Puzon', '2002-06-08', 'Sample Address 123', 'Single', 'Female', 'Catholic', '0921312312', 'active', 'Masters Degree', '', '', 3);

-- --------------------------------------------------------

--
-- Table structure for table `publications`
--

CREATE TABLE `publications` (
  `id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `account_id` int(11) DEFAULT NULL,
  `brgy_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publications`
--

INSERT INTO `publications` (`id`, `type`, `title`, `attachment`, `content`, `created_at`, `updated_at`, `account_id`, `brgy_id`) VALUES
(1, 'Super Admin', 'LAGONGLONG INTER BARANGAY VOLLEYBALL LEAGUE', 'uploads\\publications\\1729692503181.png', '🏐 Inter-Barangay Volleyball Tournament 🏆\r\n\r\nJoin us for an exciting showdown of skill, teamwork, and community spirit at the annual Inter-Barangay Volleyball Competition! Cheer on your favorite teams as they compete for the championship title. Let’s come together for a day of fun, friendly competition, and unity!!!', '2024-10-23 14:54:30', '2024-10-23 14:54:30', 1, NULL),
(2, 'Chairperson', 'Brgy. Poblacion Free Dental Checkup ', 'uploads\\publications\\1729692715685.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget tortor molestie, ornare odio nec, posuere nisi. Donec sit amet ligula non massa tempus bibendum. Maecenas elementum mollis vestibulum. Pellentesque efficitur nibh sodales sodales ultricies. Ut pretium massa erat, eu imperdiet tellus fermentum ut. ', '2024-10-23 14:12:38', '2024-10-23 14:12:38', 2, 1),
(3, 'Chairperson', 'Gaston Coastal Cleanup Drive', 'uploads\\publications\\1729692925393.jpg', 'Sample description here', '2024-10-23 06:15:25', '2024-10-23 14:15:25', 3, 8);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(3, 'Chairperson'),
(2, 'Federation'),
(1, 'Super Admin'),
(4, 'User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `brgy_id` (`brgy_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `action_logs`
--
ALTER TABLE `action_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `brgy_id` (`brgy_id`);

--
-- Indexes for table `barangay`
--
ALTER TABLE `barangay`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `blacklisted_token`
--
ALTER TABLE `blacklisted_token`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `publication_id` (`publication_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `brgy_id` (`brgy_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `action_logs`
--
ALTER TABLE `action_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `barangay`
--
ALTER TABLE `barangay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `blacklisted_token`
--
ALTER TABLE `blacklisted_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `publications`
--
ALTER TABLE `publications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`brgy_id`) REFERENCES `barangay` (`id`),
  ADD CONSTRAINT `accounts_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `action_logs`
--
ALTER TABLE `action_logs`
  ADD CONSTRAINT `action_logs_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

--
-- Constraints for table `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  ADD CONSTRAINT `announcements_ibfk_2` FOREIGN KEY (`brgy_id`) REFERENCES `barangay` (`id`);

--
-- Constraints for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`id`),
  ADD CONSTRAINT `feedbacks_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

--
-- Constraints for table `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

--
-- Constraints for table `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `publications_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  ADD CONSTRAINT `publications_ibfk_2` FOREIGN KEY (`brgy_id`) REFERENCES `barangay` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
