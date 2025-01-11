-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.7.40 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `admin` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`password` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`create_time` INT(11) UNSIGNED NULL DEFAULT '0',
	`update_time` INT(11) UNSIGNED NULL DEFAULT '0',
	`status` TINYINT(1) NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=9
;

CREATE TABLE `role` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`status` TINYINT(1) UNSIGNED NULL DEFAULT NULL,
	`create_time` INT(11) UNSIGNED NULL DEFAULT NULL,
	`update_time` INT(11) UNSIGNED NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
AUTO_INCREMENT=5
;

-- 正在导出表  rbac.admin 的数据：~4 rows (大约)
INSERT INTO `admin` (`id`, `username`, `password`, `create_time`, `update_time`, `status`) VALUES
	(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 1735874408, 1735874408, 1),
	(4, 'admin2', '202cb962ac59075b964b07152d234b70', 1735890219, 1736152321, 1),
	(7, 'user4', '202cb962ac59075b964b07152d234b70', 1736152107, 1736152107, 1),
	(8, 'ad77', 'e10adc3949ba59abbe56e057f20f883e', 1736152163, 1736152163, 1);

-- 正在导出表  rbac.admin_role 的数据：~2 rows (大约)
INSERT INTO `admin_role` (`id`, `name`, `admin_id`, `role_ids`, `status`, `create_time`, `update_time`) VALUES
	(2, '普通管理员', 1, '1,4', 1, 1735980059, 1735980059),
	(3, '管理1', 4, '1', 1, 1736161952, 1736161952);

-- 正在导出表  rbac.role 的数据：~3 rows (大约)
INSERT INTO `role` (`id`, `name`, `status`, `create_time`, `update_time`) VALUES
	(1, '业主', 1, 1735874408, 1735874408),
	(2, '店主', 1, 1735874408, 1735874408),
	(4, '水泥工', 1, 1736160221, 1736160221);

-- 正在导出表  rbac.role_rule 的数据：~2 rows (大约)
INSERT INTO `role_rule` (`id`, `name`, `role_id`, `rule_ids`, `status`, `create_time`, `update_time`) VALUES
	(2, '业主1', 1, '1,2,3', 1, 1736002147, 1736002147),
	(3, '用户1', 2, '1,2', 1, 1736002147, 1736002147);

-- 正在导出表  rbac.rule 的数据：~3 rows (大约)
INSERT INTO `rule` (`id`, `name`, `pid`, `img`, `status`, `create_time`, `update_time`, `url`) VALUES
	(1, '管理员功能', 0, NULL, 1, 1735874408, 1735874408, 'admin/index'),
	(2, '编辑管理员', 1, NULL, 1, 1735874408, 1735874408, 'admin/save'),
	(3, '删除管理员', 1, 'test1', 1, 1736156143, 1736156564, 'admin/delete');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
