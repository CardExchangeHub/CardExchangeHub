-- CREATE TABLE `User` (
-- 	`id` INT NOT NULL AUTO_INCREMENT,
-- 	`user_name` VARCHAR(255) NOT NULL,
-- 	`password` VARCHAR(255) NOT NULL,
-- 	`profile_image` VARCHAR(255) NOT NULL,
-- 	PRIMARY KEY (`id`)
-- );

-- CREATE TABLE `possible_cards` (
-- 	`id` INT NOT NULL AUTO_INCREMENT,
-- 	`name` VARCHAR(255) NOT NULL,
-- 	PRIMARY KEY (`id`)
-- );

-- CREATE TABLE `cards_for_sale` (
-- 	`id` INT NOT NULL AUTO_INCREMENT,
-- 	`condition` VARCHAR(255) NOT NULL,
-- 	`price` INT NOT NULL,
-- 	`seller` INT NOT NULL,
-- 	`name` INT NOT NULL,
-- 	`timePosted` INT NOT NULL
-- 	PRIMARY KEY (`id`)
-- );

-- CREATE TABLE `cards_purchased` (
-- 	`id` INT NOT NULL AUTO_INCREMENT,
-- 	`buyer_id` INT NOT NULL,
-- 	PRIMARY KEY (`id`)
-- );

-- Y-ALTER TABLE `User` ADD CONSTRAINT `User_fk0` FOREIGN KEY (`id`) REFERENCES `cards_for_sale`(`seller`);

-- Y-ALTER TABLE `possible_cards` ADD CONSTRAINT `possible_cards_fk0` FOREIGN KEY (`id`) REFERENCES `cards_for_sale`(`id`);

-- -ALTER TABLE `possible_cards` ADD CONSTRAINT `possible_cards_fk1` FOREIGN KEY (`name`) REFERENCES `cards_for_sale`(`name`);

-- Y-ALTER TABLE `cards_for_sale` ADD CONSTRAINT `cards_for_sale_fk0` FOREIGN KEY (`id`) REFERENCES `possible_cards`(`id`);

-- Y-ALTER TABLE `cards_for_sale` ADD CONSTRAINT `cards_for_sale_fk1` FOREIGN KEY (`seller`) REFERENCES `User`(`id`);

-- ALTER TABLE `cards_for_sale` ADD CONSTRAINT `cards_for_sale_fk2` FOREIGN KEY (`name`) REFERENCES `possible_cards`(`name`);

-- Y-ALTER TABLE `cards_purchased` ADD CONSTRAINT `cards_purchased_fk0` FOREIGN KEY (`id`) REFERENCES `cards_for_sale`(`id`);

-- Y-ALTER TABLE `cards_purchased` ADD CONSTRAINT `cards_purchased_fk1` FOREIGN KEY (`buyer_id`) REFERENCES `User`(`id`);