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

-- 导出  表 tkapitp5.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `create_time` int(11) unsigned DEFAULT '0',
  `update_time` int(11) unsigned DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  `zone_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_zone_id` (`zone_id`),
  CONSTRAINT `user_zone_id` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。

-- 导出  表 tkapitp5.user_role 结构
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `role_id` int(11) unsigned DEFAULT NULL,
  `status` int(11) unsigned DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_role_user_id` (`user_id`),
  KEY `user_role_role_id` (`role_id`),
  CONSTRAINT `user_role_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_role_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。

-- 导出  表 tkapitp5.bag 结构
CREATE TABLE IF NOT EXISTS `bag` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `soldiermax` int(1) unsigned NOT NULL DEFAULT '0',
  `battlemax` int(1) unsigned NOT NULL DEFAULT '2',
  `status` int(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。

-- 导出  表 tkapitp5.character 结构
CREATE TABLE IF NOT EXISTS `character` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `zone_id` int(11) unsigned DEFAULT NULL,
  `bag_id` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '三国新人',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `level` int(5) unsigned NOT NULL DEFAULT '1',
  `coin` int(11) unsigned NOT NULL DEFAULT '0',
  `exp` int(11) unsigned NOT NULL DEFAULT '0',
  `points` int(11) unsigned NOT NULL DEFAULT '0',
  `hppoint` int(11) unsigned NOT NULL DEFAULT '0',
  `mppoint` int(11) unsigned NOT NULL DEFAULT '0',
  `atkpoint` int(11) unsigned NOT NULL DEFAULT '0',
  `sppoint` int(11) unsigned NOT NULL DEFAULT '0',
  `country` tinyint(1) unsigned DEFAULT '1',
  `job` tinyint(1) unsigned DEFAULT '1',
  `hp` int(11) unsigned NOT NULL DEFAULT '1',
  `mp` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `character_user_id` (`user_id`),
  KEY `character_zone_id` (`zone_id`),
  KEY `character_bag_id` (`bag_id`),
  CONSTRAINT `character_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `character_bag_id` FOREIGN KEY (`bag_id`) REFERENCES `bag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `character_zone_id` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。

-- 导出  表 tkapitp5.invite 结构
CREATE TABLE IF NOT EXISTS `invite` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `invitee_id` int(11) unsigned DEFAULT NULL,
  `invitecode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invite_user_id` (`user_id`),
  CONSTRAINT `invite_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。

-- 导出  表 tkapitp5.role 结构
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` tinyint(1) unsigned DEFAULT NULL,
  `create_time` int(11) unsigned DEFAULT NULL,
  `update_time` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- 数据导出被取消选择。

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
  PRIMARY KEY (`id`) USING BTREE,
  KEY `soldier_character_id` (`character_id`),
  CONSTRAINT `soldier_character_id` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- 数据导出被取消选择。

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

-- 数据导出被取消选择。

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
