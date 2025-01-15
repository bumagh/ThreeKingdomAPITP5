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

-- 导出  表 tkapitp5.admin 结构
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `create_time` int(11) unsigned DEFAULT '0',
  `update_time` int(11) unsigned DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  `zone_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `admin_zone_id` (`zone_id`),
  CONSTRAINT `admin_zone_id` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- 正在导出表  tkapitp5.admin 的数据：~13 rows (大约)
INSERT INTO `admin` (`id`, `username`, `password`, `create_time`, `update_time`, `status`, `zone_id`) VALUES
	(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 0, 1736925349, 1, 1),
	(2, 'gsj', 'e10adc3949ba59abbe56e057f20f883e', 0, 0, 1, NULL),
	(11, 'test1', '202cb962ac59075b964b07152d234b70', 1736527660, 1736527660, NULL, NULL),
	(12, 'test2', '202cb962ac59075b964b07152d234b70', 1736527913, 1736527913, NULL, NULL),
	(13, 'test3', '202cb962ac59075b964b07152d234b70', 1736527926, 1736527926, NULL, NULL),
	(14, 'test7', 'e10adc3949ba59abbe56e057f20f883e', 1736575990, 1736575990, 1, NULL),
	(15, 'test8', '202cb962ac59075b964b07152d234b70', 1736576138, 1736576138, 1, NULL),
	(16, 'test9', '202cb962ac59075b964b07152d234b70', 1736576307, 1736603239, 1, 1),
	(17, 'test02', '202cb962ac59075b964b07152d234b70', 0, 0, 1, NULL),
	(18, 'test03', '202cb962ac59075b964b07152d234b70', 0, 1736929261, 1, 1),
	(19, 'test04', '202cb962ac59075b964b07152d234b70', 0, 1736929299, 1, 1),
	(20, 'test05', '202cb962ac59075b964b07152d234b70', 0, 1736930069, 1, 1),
	(21, 'test06', '202cb962ac59075b964b07152d234b70', 0, 1736942407, 1, 1);

-- 导出  表 tkapitp5.admin_role 结构
CREATE TABLE IF NOT EXISTS `admin_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) unsigned DEFAULT NULL,
  `role_id` int(11) unsigned DEFAULT NULL,
  `status` int(11) unsigned DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_role_admin_id` (`admin_id`),
  KEY `admin_role_role_id` (`role_id`),
  CONSTRAINT `admin_role_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `admin_role_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- 正在导出表  tkapitp5.admin_role 的数据：~2 rows (大约)
INSERT INTO `admin_role` (`id`, `admin_id`, `role_id`, `status`, `create_time`) VALUES
	(1, 1, 1, 1, '2025-01-10 22:18:11'),
	(2, 2, 2, 1, '2025-01-10 22:19:40');

-- 导出  表 tkapitp5.bag 结构
CREATE TABLE IF NOT EXISTS `bag` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `soldiermax` int(2) unsigned NOT NULL DEFAULT '10',
  `battlemax` int(1) unsigned NOT NULL DEFAULT '2',
  `status` int(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- 正在导出表  tkapitp5.bag 的数据：~1 rows (大约)
INSERT INTO `bag` (`id`, `soldiermax`, `battlemax`, `status`) VALUES
	(1, 10, 2, 1),
	(2, 10, 2, 1);

-- 导出  表 tkapitp5.character 结构
CREATE TABLE IF NOT EXISTS `character` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) unsigned NOT NULL,
  `zone_id` int(11) unsigned DEFAULT '1',
  `bag_id` int(11) unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL DEFAULT '三国新人',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `level` int(5) unsigned NOT NULL DEFAULT '1',
  `coin` int(11) unsigned NOT NULL DEFAULT '0',
  `exp` int(11) unsigned NOT NULL DEFAULT '0',
  `points` int(11) unsigned NOT NULL DEFAULT '4',
  `hppoint` int(11) unsigned NOT NULL DEFAULT '0',
  `mppoint` int(11) unsigned NOT NULL DEFAULT '0',
  `atkpoint` int(11) unsigned NOT NULL DEFAULT '0',
  `sppoint` int(11) unsigned NOT NULL DEFAULT '0',
  `country` tinyint(1) unsigned DEFAULT '1',
  `job` tinyint(1) unsigned DEFAULT '1',
  `hp` int(11) unsigned NOT NULL DEFAULT '10',
  `mp` int(11) unsigned NOT NULL DEFAULT '5',
  PRIMARY KEY (`id`),
  KEY `character_admin_id` (`admin_id`),
  KEY `character_zone_id` (`zone_id`),
  KEY `character_bag_id` (`bag_id`),
  CONSTRAINT `character_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `character_bag_id` FOREIGN KEY (`bag_id`) REFERENCES `bag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `character_zone_id` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- 正在导出表  tkapitp5.character 的数据：~4 rows (大约)
INSERT INTO `character` (`id`, `admin_id`, `zone_id`, `bag_id`, `name`, `status`, `level`, `coin`, `exp`, `points`, `hppoint`, `mppoint`, `atkpoint`, `sppoint`, `country`, `job`, `hp`, `mp`) VALUES
	(1, 1, 1, 1, '我爱三国', 1, 4, 722, 16, 18, 7, 3, 1, 1, 3, 2, 8738, 45),
	(2, 19, 1, NULL, '玩家tes', 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0),
	(3, 20, 1, NULL, '玩家tes', 1, 1, 0, 0, 4, 0, 0, 0, 0, 1, 1, 10, 5),
	(4, 21, 1, 2, '玩家tes', 1, 1, 980, 0, 0, 4, 0, 0, 0, 1, 1, 10, 5);

-- 导出  表 tkapitp5.goods 结构
CREATE TABLE IF NOT EXISTS `goods` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `bag_id` int(11) unsigned DEFAULT NULL,
  `configid` int(11) unsigned NOT NULL,
  `count` int(11) unsigned NOT NULL DEFAULT '0',
  `status` int(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `goods_bag_id` (`bag_id`),
  CONSTRAINT `goods_bag_id` FOREIGN KEY (`bag_id`) REFERENCES `bag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- 正在导出表  tkapitp5.goods 的数据：~8 rows (大约)
INSERT INTO `goods` (`id`, `bag_id`, `configid`, `count`, `status`) VALUES
	(7, 1, 3004, 1, 1),
	(8, 1, 3001, 1, 1),
	(9, 1, 3002, 1, 1),
	(10, 1, 3003, 0, 1),
	(11, 1, 3005, 1, 1),
	(12, 1, 2003, 2, 1),
	(13, 2, 3001, 0, 1),
	(14, 2, 3002, 0, 1);

-- 导出  表 tkapitp5.invite 结构
CREATE TABLE IF NOT EXISTS `invite` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) unsigned NOT NULL,
  `invitee_id` int(11) unsigned DEFAULT NULL,
  `invitecode` varchar(255) DEFAULT NULL,
  `status` int(1) unsigned DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `invite_admin_id` (`admin_id`),
  CONSTRAINT `invite_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- 正在导出表  tkapitp5.invite 的数据：~1 rows (大约)
INSERT INTO `invite` (`id`, `admin_id`, `invitee_id`, `invitecode`, `status`) VALUES
	(1, 2, NULL, '2025', 1);

-- 导出  表 tkapitp5.message 结构
CREATE TABLE IF NOT EXISTS `message` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `character_id` int(11) unsigned NOT NULL DEFAULT '0',
  `zone_id` int(11) unsigned DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `type` tinyint(1) unsigned DEFAULT '0',
  `status` tinyint(1) unsigned DEFAULT '1',
  `create_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- 正在导出表  tkapitp5.message 的数据：~3 rows (大约)
INSERT INTO `message` (`id`, `character_id`, `zone_id`, `content`, `type`, `status`, `create_time`) VALUES
	(1, 1, 1, 'hello', 0, 1, '2025-01-15 09:38:56'),
	(3, 4, 1, '你好2', 0, 1, '2025-01-15 10:55:48'),
	(4, 4, 1, '你在干什么', 0, 1, '2025-01-15 12:00:42');

-- 导出  表 tkapitp5.role 结构
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` tinyint(1) unsigned DEFAULT NULL,
  `create_time` int(11) unsigned DEFAULT NULL,
  `update_time` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- 正在导出表  tkapitp5.role 的数据：~2 rows (大约)
INSERT INTO `role` (`id`, `name`, `status`, `create_time`, `update_time`) VALUES
	(1, '超级管理员', 1, 0, 0),
	(2, '玩家', 1, 0, 0);

-- 导出  表 tkapitp5.soldier 结构
CREATE TABLE IF NOT EXISTS `soldier` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `character_id` int(11) unsigned NOT NULL DEFAULT '0',
  `config_id` int(11) unsigned NOT NULL DEFAULT '2001',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `level` int(5) unsigned NOT NULL DEFAULT '1',
  `exp` int(11) unsigned NOT NULL DEFAULT '0',
  `points` int(11) unsigned NOT NULL DEFAULT '4',
  `hppoint` int(11) unsigned NOT NULL DEFAULT '0',
  `mppoint` int(11) unsigned NOT NULL DEFAULT '0',
  `atkpoint` int(11) unsigned NOT NULL DEFAULT '0',
  `sppoint` int(11) unsigned NOT NULL DEFAULT '0',
  `hp` int(11) unsigned DEFAULT '0',
  `mp` int(11) unsigned DEFAULT '0',
  `job` int(1) unsigned DEFAULT '1',
  `country` int(1) unsigned DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `soldier_character_id` (`character_id`),
  CONSTRAINT `soldier_character_id` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10003 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- 正在导出表  tkapitp5.soldier 的数据：~3 rows (大约)
INSERT INTO `soldier` (`id`, `character_id`, `config_id`, `status`, `level`, `exp`, `points`, `hppoint`, `mppoint`, `atkpoint`, `sppoint`, `hp`, `mp`, `job`, `country`) VALUES
	(10000, 1, 1004, 1, 1, 0, 4, 0, 0, 0, 0, 0, 0, 1, 1),
	(10001, 1, 2008, 1, 1, 0, 3, 1, 0, 0, 0, 50, 15, 1, 1),
	(10002, 1, 1004, 1, 1, 0, 0, 4, 0, 0, 0, 10, 10, 1, 1);

-- 导出  表 tkapitp5.zone 结构
CREATE TABLE IF NOT EXISTS `zone` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `index` int(3) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `tag` varchar(255) DEFAULT '1',
  `player_counts` int(11) unsigned DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- 正在导出表  tkapitp5.zone 的数据：~2 rows (大约)
INSERT INTO `zone` (`id`, `name`, `index`, `status`, `tag`, `player_counts`) VALUES
	(1, '蛇年大吉', 0, 1, '新区', 0),
	(2, '内测区1', 1, 1, '内测区', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
