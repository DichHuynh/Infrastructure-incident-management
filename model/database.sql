-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 23, 2024 lúc 04:17 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `infrastructure_management`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `account_type` enum('User','Technician','Admin') NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `accounts`
--

INSERT INTO `accounts` (`account_id`, `email`, `password`, `avatar`, `account_type`, `status`) VALUES
(1, 'user1@example.com', 'password123', 'https://res.cloudinary.com/dy3gsgb0j/image/upload/v1734937103/mrnwgpsnlxopviy5q73h.png', 'User', 'Active'),
(3, 'tech1@example.com', 'password123', '', 'Technician', 'Active'),
(4, 'tech2@example.com', 'password123', 'avatar4.jpg', 'Technician', 'Active'),
(5, 'admin1@example.com', '123456', 'https://res.cloudinary.com/dy3gsgb0j/image/upload/v1734937572/to0qdsyw659zwuanzbm4.jpg', 'Admin', 'Active'),
(6, 'admin2@example.com', 'password123', 'avatar6.jpg', 'Admin', 'Active'),
(13, 'huynhdich@example.com', '123456ty', 'https://res.cloudinary.com/dy3gsgb0j/image/upload/v1731593178/mdkzowmpiqkopiscrjlv.jpg', 'User', 'Active'),
(14, 'dichhuynh@example.c', '12345678', 'https://res.cloudinary.com/dy3gsgb0j/image/upload/v1733842861/poru8cbyhoyxp6gupv6n.png', 'User', 'Active'),
(19, 'nguyen1@example.com', '12341234', 'https://res.cloudinary.com/dy3gsgb0j/image/upload/v1733888622/xcs2pt4xwdozncc5r23v.png', 'Technician', 'Active'),
(21, 'quoc@example.com', '12341234', NULL, 'Technician', 'Active'),
(24, 'binh123@example.com', 'binh123', 'https://res.cloudinary.com/dy3gsgb0j/image/upload/v1734448961/gdwisdgcblu84nvm6mjd.png', 'Technician', 'Active'),
(25, 'hai123@example.com', 'hai123', NULL, 'Technician', 'Active');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admindetails`
--

CREATE TABLE `admindetails` (
  `id` int(11) NOT NULL,
  `admin_id` varchar(50) NOT NULL,
  `account_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `numberphone` varchar(15) NOT NULL,
  `role` enum('Supervisor','Manager') DEFAULT 'Supervisor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `admindetails`
--

INSERT INTO `admindetails` (`id`, `admin_id`, `account_id`, `name`, `numberphone`, `role`) VALUES
(1, 'ad1', 5, 'Huỳnh Duy Quang', '1231231234', 'Supervisor'),
(2, 'ad2', 6, 'Trương Quang Duy', '5566778899', 'Manager');

--
-- Bẫy `admindetails`
--
DELIMITER $$
CREATE TRIGGER `before_insert_AdminDetails` BEFORE INSERT ON `admindetails` FOR EACH ROW BEGIN
    DECLARE max_id INT;
    -- Lấy giá trị `id` tự động tăng cho bản ghi mới
    SET max_id = COALESCE((SELECT MAX(id) FROM AdminDetails), 0) + 1;
    SET NEW.admin_id = CONCAT('ad', max_id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `infrastructure`
--

CREATE TABLE `infrastructure` (
  `infrastructure_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `status` enum('Operational','Maintenance','Faulty') DEFAULT 'Operational',
  `installation_date` date DEFAULT NULL,
  `last_maintenance_date` date DEFAULT NULL,
  `last_inspection_date` date DEFAULT NULL,
  `specifications` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `quantity` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `infrastructure`
--

INSERT INTO `infrastructure` (`infrastructure_id`, `name`, `type`, `location`, `status`, `installation_date`, `last_maintenance_date`, `last_inspection_date`, `specifications`, `notes`, `quantity`) VALUES
(4, 'Đèn đường L1', 'Đèn đường', 'đường Hoàng Thị Loan, Liên Chiểu', 'Operational', '2020-05-10', '2023-06-15', '2024-11-09', 'LED Light, 60W', 'No issues reported', 35),
(5, 'Đèn giao thông TL2', 'Đèn giao thông', 'Ngã tư Nguyễn Tri Phương- Nguyễn Văn Linh, Thanh Khê', 'Maintenance', '2019-07-20', '2023-05-10', '2023-05-10', 'Red, Yellow, Green LEDs', 'Kiểm tra mạch đếm định kỳ', 4),
(6, 'Cụm camera C1', 'Camera', 'Ngã ba Huế, Thanh Khê', 'Faulty', '2018-03-25', '2023-03-25', '2023-03-25', 'Cụm gồm 7 camera K01', 'Hư hỏng camera C1-3', 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `issue`
--

CREATE TABLE `issue` (
  `id` int(11) NOT NULL,
  `issue_id` varchar(50) NOT NULL,
  `infrastructure_id` int(11) DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `technician_id` varchar(50) DEFAULT NULL,
  `description` text NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `report_date` date DEFAULT curdate(),
  `status` enum('Pending','In Progress','Resolved','Accepted') DEFAULT 'Pending',
  `name` varchar(100) DEFAULT NULL,
  `report_description` text DEFAULT NULL,
  `resolved_at` datetime DEFAULT NULL,
  `resolved_image` varchar(100) DEFAULT NULL,
  `response_date` datetime DEFAULT current_timestamp(),
  `time_evaluation` enum('Rất tốt','Đạt','Chậm trễ') DEFAULT NULL,
  `quality_evaluation` enum('Rất tốt','Tốt','Trung bình','Kém') DEFAULT NULL,
  `admin_comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `issue`
--

INSERT INTO `issue` (`id`, `issue_id`, `infrastructure_id`, `user_id`, `technician_id`, `description`, `image`, `location`, `latitude`, `longitude`, `report_date`, `status`, `name`, `report_description`, `resolved_at`, `resolved_image`, `response_date`, `time_evaluation`, `quality_evaluation`, `admin_comment`) VALUES
(1, 'issue1', NULL, NULL, 'tech1', 'Đèn đường nhấp nháy ảnh hưởng đến giao thông', 'https://res.cloudinary.com/dy3gsgb0j/image/upload/v1733888622/xcs2pt4xwdozncc5r23v.png', 'đường Trường Chinh, Cẩm Lệ', 16.0679, 108.214, '2024-11-09', 'Resolved', 'Hỏng đèn đường', 'Thay bóng đèn số 16 và kiểm tra đường dây.', '2024-12-18 15:52:00', 'https://res.cloudinary.com/dy3gsgb0j/image/upload/v1734748505/o4ojdviwrf3ak0uppzlb.jpg', '2024-12-21 02:35:07', 'Rất tốt', 'Rất tốt', 'Hoàn thành đúng thời gian, đảm bảo chất lượng'),
(2, 'issue2', NULL, NULL, 'tech10', 'Cống thoát nước', 'anh2.png', 'xã Hòa Tiến, Hòa Vang', 16.0659, 108.214, '2024-11-09', 'In Progress', 'Cống thoát nước bị nghẽn', NULL, NULL, NULL, '2024-12-20 14:28:08', '', '', NULL),
(3, 'issue3', NULL, 'user3', 'tech8', 'fghfgjghj', NULL, 'fgh', 16.0669, 108.215, '2024-11-17', 'In Progress', NULL, NULL, NULL, NULL, '2024-12-20 14:28:08', '', '', NULL),
(4, 'issue4', NULL, 'user3', 'tech1', 'hgjgfkk', 'https://res.cloudinary.com/dy3gsgb0j/image/upload/v1731831106/fitr5foumkcvi1lmguk8.png', 'rgfdhfb', 16.0669, 108.214, '2024-11-17', 'Resolved', NULL, 'Đã khắc phục', '2024-12-21 21:32:00', 'https://res.cloudinary.com/dy3gsgb0j/image/upload/v1734859973/r8y3fxi3vrqb1r1ijhai.png', '2024-12-22 09:32:53', '', '', NULL),
(5, 'issue5', NULL, 'user3', NULL, 'Nắp cống bị bung hỏng cản trở giao thông', 'https://res.cloudinary.com/dy3gsgb0j/image/upload/v1731831433/jh3dwfhoiypp2yp4jrq8.png', '376 Tôn Đức Thắng, Liên Chiêu', 16.0669, 108.213, '2024-11-17', 'Pending', NULL, NULL, NULL, NULL, '2024-12-20 14:28:08', '', '', NULL),
(6, 'issue6', NULL, 'user1', 'tech12', '', NULL, '', 16.0674, 108.214, '2024-12-04', 'In Progress', NULL, NULL, NULL, NULL, '2024-12-20 14:28:08', '', '', NULL),
(7, 'issue7', NULL, 'user1', 'tech1', 'Dây điện bị chùng sắt mặt đất 2m', 'https://res.cloudinary.com/dy3gsgb0j/image/upload/v1734751115/w8lf1fjlikjkgmxzlvuo.png', 'đường Âu cơ, Liên Chiểu', NULL, NULL, '2024-12-21', 'Accepted', NULL, NULL, NULL, NULL, '2024-12-21 03:18:37', '', '', NULL),
(8, 'issue8', NULL, 'user1', 'tech10', 'Ống nước bị thủng, nước rò ra đường', 'https://res.cloudinary.com/dy3gsgb0j/image/upload/v1734793330/aqobzsu7it6tlhhserdu.jpg', 'đường Nguyễn Sinh Sắc, Liên Chiều', NULL, NULL, '2024-12-21', 'In Progress', NULL, NULL, NULL, NULL, '2024-12-21 15:02:11', '', '', NULL);

--
-- Bẫy `issue`
--
DELIMITER $$
CREATE TRIGGER `before_insert_Issue` BEFORE INSERT ON `issue` FOR EACH ROW BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị lớn nhất của id đã có trong bảng
    SELECT COALESCE(MAX(id), 0) INTO max_id FROM Issue;

    -- Tăng giá trị max_id lên 1 và gán vào NEW.issue_id
    SET NEW.id = max_id + 1;
    SET NEW.issue_id = CONCAT('issue', NEW.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `techniciandetails`
--

CREATE TABLE `techniciandetails` (
  `id` int(11) NOT NULL,
  `technician_id` varchar(50) NOT NULL,
  `account_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `numberphone` varchar(15) NOT NULL,
  `expertise` varchar(255) DEFAULT NULL,
  `employment_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `techniciandetails`
--

INSERT INTO `techniciandetails` (`id`, `technician_id`, `account_id`, `name`, `numberphone`, `expertise`, `employment_date`) VALUES
(1, 'tech1', 3, 'Nguyễn Quang Huy', '1234567890', 'Chuyên viên điện', '2022-01-15'),
(2, 'tech2', 4, 'Nguyễn Huy Quang', '0987654321', 'Chuyên viên dân dụng', '2021-08-30'),
(8, 'tech8', 19, 'Nguyên', '1234560944', 'Chuyên viên mạng', '2024-11-06'),
(10, 'tech10', 21, 'Quoc', '0535684355', 'Chuyên viên nước', '2024-10-12'),
(11, 'tech11', 24, 'Bình', '0958375483', 'Chuyên viên điện', '2024-12-17'),
(12, 'tech12', 25, 'Hải', '0954358574', 'Chuyên viên điện', '2024-12-16');

--
-- Bẫy `techniciandetails`
--
DELIMITER $$
CREATE TRIGGER `before_insert_TechnicianDetails` BEFORE INSERT ON `techniciandetails` FOR EACH ROW BEGIN
    DECLARE max_id INT;
    -- Lấy giá trị `id` tự động tăng cho bản ghi mới
    SET max_id = COALESCE((SELECT MAX(id) FROM TechnicianDetails), 0) + 1;
    SET NEW.technician_id = CONCAT('tech', max_id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `userdetails`
--

CREATE TABLE `userdetails` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `account_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `registration_date` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `userdetails`
--

INSERT INTO `userdetails` (`id`, `user_id`, `account_id`, `name`, `address`, `registration_date`) VALUES
(1, 'user1', 1, 'Cao Ngọc Toàn', 'Hòa Minh, Liên Chiểu', '2024-11-09'),
(11, 'user3', 13, 'Dich Huynh', 'Da Nang', '2024-11-14');

--
-- Bẫy `userdetails`
--
DELIMITER $$
CREATE TRIGGER `before_insert_UserDetails` BEFORE INSERT ON `userdetails` FOR EACH ROW BEGIN
    DECLARE max_id INT;
    -- Lấy giá trị `id` tự động tăng cho bản ghi mới
    SET max_id = COALESCE((SELECT MAX(id) FROM UserDetails), 0) + 1;
    SET NEW.user_id = CONCAT('user', max_id);
END
$$
DELIMITER ;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `admindetails`
--
ALTER TABLE `admindetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_id` (`admin_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Chỉ mục cho bảng `infrastructure`
--
ALTER TABLE `infrastructure`
  ADD PRIMARY KEY (`infrastructure_id`);

--
-- Chỉ mục cho bảng `issue`
--
ALTER TABLE `issue`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `issue_id` (`issue_id`),
  ADD KEY `infrastructure_id` (`infrastructure_id`),
  ADD KEY `technician_id` (`technician_id`),
  ADD KEY `issue_ibfk_2` (`user_id`);

--
-- Chỉ mục cho bảng `techniciandetails`
--
ALTER TABLE `techniciandetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `technician_id` (`technician_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Chỉ mục cho bảng `userdetails`
--
ALTER TABLE `userdetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `account_id` (`account_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT cho bảng `admindetails`
--
ALTER TABLE `admindetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `infrastructure`
--
ALTER TABLE `infrastructure`
  MODIFY `infrastructure_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `issue`
--
ALTER TABLE `issue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `techniciandetails`
--
ALTER TABLE `techniciandetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `userdetails`
--
ALTER TABLE `userdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `admindetails`
--
ALTER TABLE `admindetails`
  ADD CONSTRAINT `admindetails_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`);

--
-- Các ràng buộc cho bảng `issue`
--
ALTER TABLE `issue`
  ADD CONSTRAINT `issue_ibfk_1` FOREIGN KEY (`infrastructure_id`) REFERENCES `infrastructure` (`infrastructure_id`),
  ADD CONSTRAINT `issue_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `userdetails` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `issue_ibfk_3` FOREIGN KEY (`technician_id`) REFERENCES `techniciandetails` (`technician_id`);

--
-- Các ràng buộc cho bảng `techniciandetails`
--
ALTER TABLE `techniciandetails`
  ADD CONSTRAINT `techniciandetails_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`);

--
-- Các ràng buộc cho bảng `userdetails`
--
ALTER TABLE `userdetails`
  ADD CONSTRAINT `userdetails_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
