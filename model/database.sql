-- Bảng Accounts
CREATE TABLE Accounts (
    account_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    account_type ENUM('User', 'Technician', 'Admin') NOT NULL,  
    status ENUM('Active', 'Inactive') DEFAULT 'Active'
);

-- Bảng UserDetails với trigger để tạo user_id
CREATE TABLE UserDetails (
    id INT NOT NULL AUTO_INCREMENT,                     -- Trường tự động tăng
    user_id VARCHAR(50) NOT NULL UNIQUE,          -- Trường lưu trữ user_id theo định dạng "userN"
    account_id INT NOT NULL,                            -- Liên kết với bảng Accounts
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    registration_date DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY(id),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
);

DELIMITER //
CREATE TRIGGER before_insert_UserDetails
BEFORE INSERT ON UserDetails
FOR EACH ROW
BEGIN
    SET NEW.user_id = CONCAT('user', NEW.id);
END;
//
DELIMITER ;

-- Bảng TechnicianDetails với trigger để tạo technician_id
CREATE TABLE TechnicianDetails (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,                     -- Trường tự động tăng
    technician_id VARCHAR(50) NOT NULL UNIQUE,    -- Trường lưu trữ technician_id theo định dạng "techN"
    account_id INT NOT NULL,                            -- Liên kết với bảng Accounts
    name VARCHAR(100) NOT NULL,
    numberphone VARCHAR(15) NOT NULL,
    expertise VARCHAR(255),
    employment_date DATE,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
);

DELIMITER //
CREATE TRIGGER before_insert_TechnicianDetails
BEFORE INSERT ON TechnicianDetails
FOR EACH ROW
BEGIN
    DECLARE max_id INT;
    -- Lấy giá trị `id` tự động tăng cho bản ghi mới
    SET max_id = COALESCE((SELECT MAX(id) FROM TechnicianDetails), 0) + 1;
    SET NEW.technician_id = CONCAT('tech', max_id);
END;
//
DELIMITER ;

-- Bảng AdminDetails với trigger để tạo admin_id
CREATE TABLE AdminDetails (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,                      -- Trường tự động tăng
    admin_id VARCHAR(50) NOT NULL UNIQUE,          -- Trường lưu trữ admin_id theo định dạng "adN"
    account_id INT NOT NULL,                             -- Liên kết với bảng Accounts
    name VARCHAR(100) NOT NULL,
    numberphone VARCHAR(15) NOT NULL,
    role ENUM('Supervisor', 'Manager') DEFAULT 'Supervisor',
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
);

DELIMITER //
CREATE TRIGGER before_insert_AdminDetails
BEFORE INSERT ON AdminDetails
FOR EACH ROW
BEGIN
    DECLARE max_id INT;
    -- Lấy giá trị `id` tự động tăng cho bản ghi mới
    SET max_id = COALESCE((SELECT MAX(id) FROM AdminDetails), 0) + 1;
    SET NEW.admin_id = CONCAT('ad', max_id);
END;
//
DELIMITER ;


-- Bảng Infrastructure
CREATE TABLE Infrastructure (
    infrastructure_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    quantity INT DEFAULT 1,
    status ENUM('Operational', 'Maintenance', 'Faulty') DEFAULT 'Operational',
    installation_date DATE,
    last_maintenance_date DATE,
    last_inspection_date DATE,
    specifications TEXT,
    notes TEXT
);

-- Bảng Issue
CREATE TABLE Issue (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,                   -- Trường tự động tăng nội bộ để hỗ trợ trigger
    issue_id VARCHAR(50) NOT NULL UNIQUE,        -- Trường lưu trữ issue_id theo định dạng "issueN"
    infrastructure_id INT NOT NULL,                   -- Liên kết đến Infrastructure
    user_id VARCHAR(50),                              -- Liên kết đến UserDetails thông qua user_id
    technician_id VARCHAR(50),                        -- Liên kết đến TechnicianDetails thông qua technician_id
    description TEXT NOT NULL,                        -- Mô tả sự cố
    image VARCHAR(100),
    location VARCHAR(255),
    report_date DATE DEFAULT CURRENT_DATE,            -- Ngày báo cáo sự cố
    status ENUM('Pending', 'In Progress', 'Resolved') DEFAULT 'Pending',
    resolution_date DATE,                             -- Ngày hoàn thành xử lý
    notes TEXT,                                       -- Ghi chú thêm về sự cố
    FOREIGN KEY (infrastructure_id) REFERENCES Infrastructure(infrastructure_id),
    FOREIGN KEY (user_id) REFERENCES UserDetails(user_id),
    FOREIGN KEY (technician_id) REFERENCES TechnicianDetails(technician_id)
);
DELIMITER //
ALTER TABLE Issue
DROP FOREIGN KEY issue_ibfk_2; -- Xóa ràng buộc hiện tại

ALTER TABLE Issue
ADD CONSTRAINT issue_ibfk_2
FOREIGN KEY (user_id) REFERENCES UserDetails(user_id)
ON DELETE CASCADE; -- Thêm hành vi tự động xóa


CREATE TRIGGER before_insert_Issue
BEFORE INSERT ON Issue
FOR EACH ROW
BEGIN
    DECLARE max_id INT;

    -- Lấy giá trị lớn nhất của id đã có trong bảng
    SELECT COALESCE(MAX(id), 0) INTO max_id FROM Issue;

    -- Tăng giá trị max_id lên 1 và gán vào NEW.issue_id
    SET NEW.id = max_id + 1;
    SET NEW.issue_id = CONCAT('issue', NEW.id);
END;
//

DELIMITER ;


INSERT INTO Infrastructure (name, type, location, quantity, status, installation_date, last_maintenance_date, last_inspection_date, specifications, notes) 
VALUES ('Đèn đường L1', 'Đèn đường', 'đường Hoàng Thị Loan, Liên Chiểu', 35, 'Operational', '2020-05-10', '2023-06-15', '2024-11-9', 'LED Light, 60W', 'No issues reported'),
 ('Đèn giao thông TL2', 'Đèn giao thông', 'Ngã tư Nguyễn Tri Phương- Nguyễn Văn Linh, Thanh Khê', 4, 'Maintenance', '2019-07-20', '2023-05-10', '2023-05-10', 'Red, Yellow, Green LEDs', 'Kiểm tra mạch đếm định kỳ'),
 ('Cụm camera C1', 'Camera', 'Ngã ba Huế, Thanh Khê', 7, 'Faulty', '2018-03-25', '2023-03-25', '2023-03-25', 'Cụm gồm 7 camera K01', 'Hư hỏng camera C1-3');

-- Tài khoản User
INSERT INTO Accounts (email, password, avatar, account_type, status) VALUES
('user1@example.com', 'password123', 'avatar1.jpg', 'User', 'Active'),
('user2@example.com', 'password123', 'avatar2.jpg', 'User', 'Active');

-- Tài khoản Technician
INSERT INTO Accounts (email, password, avatar, account_type, status) VALUES
('tech1@example.com', 'password123', 'avatar3.jpg', 'Technician', 'Active'),
('tech2@example.com', 'password123', 'avatar4.jpg', 'Technician', 'Active');

-- Tài khoản Admin
INSERT INTO Accounts (email, password, avatar, account_type, status) VALUES
('admin1@example.com', 'password123', 'avatar5.jpg', 'Admin', 'Active'),
('admin2@example.com', 'password123', 'avatar6.jpg', 'Admin', 'Active');

INSERT INTO TechnicianDetails (account_id, name, numberphone, expertise, employment_date) 
VALUES
(3, 'Nguyễn Quang Huy', '1234567890', 'Kỹ sư điện', '2022-01-15'),
(4, 'Nguyễn Huy Quang', '0987654321', 'Nhân viên môi trường', '2021-08-30');

INSERT INTO AdminDetails (account_id, name, numberphone, role) VALUES
(5, 'Huỳnh Duy Quang', '1122334455', 'Supervisor'),
(6, 'Trương Quang Duy', '5566778899', 'Manager');

INSERT INTO UserDetails (account_id, name, address) VALUES
(1, 'Cao Ngọc Toàn', 'Hòa Minh, Liên Chiểu'),
(2, 'Nguyễn Linh Chi', 'An Khê, Thanh Khê');
