-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2025-10-14 22:31:13
-- 服务器版本： 5.7.40
-- PHP 版本： 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `tkapitp5`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `create_time` int(11) UNSIGNED DEFAULT '0',
  `update_time` int(11) UNSIGNED DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  `zone_id` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `create_time`, `update_time`, `status`, `zone_id`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 0, 1738398328, 1, 1),
(2, 'gsj', '14e1b600b1fd579f47433b88e8d85291', 0, 1738177404, 0, 1),
(23, 'gsj28', '202cb962ac59075b964b07152d234b70', 0, 1738009379, 1, 1),
(24, 'gsj281', '202cb962ac59075b964b07152d234b70', 0, 1738009742, 1, 1),
(25, 'gsj282', '202cb962ac59075b964b07152d234b70', 0, 1738312770, 1, 1),
(26, 'test1', '202cb962ac59075b964b07152d234b70', 1738177734, 1738177734, 1, 1),
(27, 'gsj31', '202cb962ac59075b964b07152d234b70', 0, 1738315784, 1, 1),
(28, 'test201', '202cb962ac59075b964b07152d234b70', 0, 1742355191, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `admin_role`
--

CREATE TABLE `admin_role` (
  `id` int(11) UNSIGNED NOT NULL,
  `admin_id` int(11) UNSIGNED DEFAULT NULL,
  `role_id` varchar(50) DEFAULT '1',
  `status` int(11) UNSIGNED DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin_role`
--

INSERT INTO `admin_role` (`id`, `admin_id`, `role_id`, `status`, `create_time`) VALUES
(1, 1, '2,1', 1, '2025-01-10 22:18:11'),
(2, 2, '2,1', 1, '2025-01-10 22:19:40'),
(3, 23, '1,2', NULL, '2025-01-29 19:13:44');

-- --------------------------------------------------------

--
-- 表的结构 `bag`
--

CREATE TABLE `bag` (
  `id` int(11) UNSIGNED NOT NULL,
  `soldiermax` int(2) UNSIGNED NOT NULL DEFAULT '10',
  `battlemax` int(1) UNSIGNED NOT NULL DEFAULT '2',
  `status` int(1) UNSIGNED NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `bag`
--

INSERT INTO `bag` (`id`, `soldiermax`, `battlemax`, `status`) VALUES
(1, 10, 2, 1),
(2, 10, 2, 1),
(3, 10, 2, 1),
(4, 10, 2, 1),
(5, 10, 2, 1),
(6, 10, 2, 1),
(7, 10, 2, 1),
(8, 10, 2, 1),
(9, 10, 2, 1),
(10, 10, 2, 1),
(11, 10, 2, 1),
(12, 10, 2, 1),
(13, 10, 2, 1),
(14, 10, 2, 1),
(15, 10, 2, 1),
(16, 10, 2, 1),
(17, 10, 2, 1),
(18, 10, 2, 1),
(19, 10, 2, 1),
(20, 10, 2, 1),
(21, 10, 2, 1),
(22, 10, 2, 1),
(23, 10, 2, 1),
(24, 10, 2, 1),
(25, 10, 2, 1),
(26, 10, 2, 1),
(27, 10, 2, 1),
(28, 10, 2, 1),
(29, 10, 2, 1),
(30, 10, 2, 1),
(31, 10, 2, 1),
(32, 10, 2, 1);

-- --------------------------------------------------------

--
-- 表的结构 `character`
--

CREATE TABLE `character` (
  `id` int(11) UNSIGNED NOT NULL,
  `admin_id` int(11) UNSIGNED NOT NULL,
  `zone_id` int(11) UNSIGNED DEFAULT '1',
  `bag_id` int(11) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL DEFAULT '三国新人',
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `level` int(5) UNSIGNED NOT NULL DEFAULT '1',
  `coin` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `exp` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `points` int(11) UNSIGNED NOT NULL DEFAULT '4',
  `hppoint` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `mppoint` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `atkpoint` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `sppoint` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `country` tinyint(1) UNSIGNED DEFAULT '1',
  `job` tinyint(1) UNSIGNED DEFAULT '1',
  `hp` int(11) UNSIGNED NOT NULL DEFAULT '10',
  `mp` int(11) UNSIGNED NOT NULL DEFAULT '5',
  `head` tinyint(2) UNSIGNED NOT NULL DEFAULT '1',
  `gender` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `skills` varchar(255) DEFAULT 'null',
  `basecoe` decimal(3,2) UNSIGNED NOT NULL DEFAULT '1.00',
  `basehp` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `basemp` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `baseatk` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `basesp` int(11) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `character`
--

INSERT INTO `character` (`id`, `admin_id`, `zone_id`, `bag_id`, `name`, `status`, `level`, `coin`, `exp`, `points`, `hppoint`, `mppoint`, `atkpoint`, `sppoint`, `country`, `job`, `hp`, `mp`, `head`, `gender`, `skills`, `basecoe`, `basehp`, `basemp`, `baseatk`, `basesp`) VALUES
(1, 1, 1, 1, '我爱三国', 1, 9, 11425, 3635, 0, 8, 4, 36, 2, 3, 3, 510, 110, 1, 1, '10007#1#0', '1.00', 0, 0, 0, 0),
(14, 1, 1, 12, 'test12', 1, 4, 1, 0, 0, 0, 0, 4, 0, 1, 3, 1, 5, 1, 1, 'null', '1.00', 0, 0, 0, 0),
(15, 1, 1, 13, 'test3', 1, 2, 5, 1, 0, 1, 0, 7, 0, 1, 3, 60, 20, 2, 2, '10007#1#0', '1.00', 0, 0, 0, 0),
(16, 1, 1, 14, 'aaa', 1, 3, 10, 8, 0, 4, 0, 14, 0, 1, 3, 190, 5, 2, 1, 'null', '1.00', 0, 0, 0, 0),
(17, 23, 1, 16, 'gsj28', 1, 1, 0, 0, 4, 0, 0, 0, 0, 1, 3, 10, 5, 2, 1, 'null', '1.00', 0, 0, 0, 0),
(18, 24, 1, 18, '281g', 1, 1, 0, 0, 4, 0, 0, 0, 0, 1, 3, 10, 5, 1, 1, 'null', '1.00', 0, 0, 0, 0),
(19, 24, 1, 19, '281g', 1, 1, 0, 0, 4, 0, 0, 0, 0, 1, 3, 10, 5, 2, 1, 'null', '1.00', 0, 0, 0, 0),
(20, 24, 1, 20, '281g', 1, 1, 0, 0, 4, 0, 0, 0, 0, 1, 3, 10, 5, 2, 1, 'null', '1.00', 0, 0, 0, 0),
(21, 24, 1, 21, 't34', 1, 1, 0, 0, 4, 0, 0, 0, 0, 1, 3, 129, 71, 1, 1, 'null', '1.00', 0, 0, 0, 0),
(22, 25, 1, 23, 'gsj282', 1, 3, 31875, 18, 12, 0, 0, 0, 0, 1, 3, 30, 30, 1, 1, 'null', '1.00', 0, 0, 0, 0),
(23, 25, 1, 24, 'gsj283', 1, 1, 0, 0, 4, 0, 0, 0, 0, 1, 3, 10, 5, 1, 1, 'null', '1.00', 0, 0, 0, 0),
(24, 1, 1, 25, '新玩家1', 1, 1, 0, 0, 4, 0, 0, 0, 0, 1, 2, 10, 5, 1, 1, 'null', '1.00', 0, 0, 0, 0),
(25, 25, 1, 26, 'test28', 1, 1, 0, 0, 4, 0, 0, 0, 0, 1, 3, 121, 46, 2, 1, 'null', '1.05', 110, 35, 46, 45),
(26, 25, 1, 27, 'wen1', 1, 2, 9906, 6, 8, 0, 0, 0, 0, 1, 5, 142, 67, 2, 1, '10011#1#0', '1.14', 119, 44, 35, 43),
(27, 28, 1, 30, '02011', 1, 4, 34, 89, 16, 0, 0, 0, 0, 1, 3, 155, 100, 1, 1, '10007#1#0|10008#1#0|10009#1#0|10010#1#0', '1.10', 111, 56, 36, 35),
(28, 28, 1, 31, '0202', 1, 2, 18, 26, 8, 0, 0, 0, 0, 1, 5, 127, 76, 1, 1, '10017#1#0|10018#1#0|10019#1#0', '1.04', 106, 55, 49, 50),
(29, 28, 1, 32, 'wen5', 1, 1, 8890, 0, 4, 0, 0, 0, 0, 1, 4, 10127, 48, 1, 1, '10011#1#0|10012#1#0|10013#1#0|10014#1#0', '1.17', 115, 36, 41, 57);

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

CREATE TABLE `goods` (
  `id` int(11) UNSIGNED NOT NULL,
  `bag_id` int(11) UNSIGNED DEFAULT NULL,
  `configid` int(11) UNSIGNED NOT NULL,
  `count` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `status` int(1) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`id`, `bag_id`, `configid`, `count`, `status`) VALUES
(7, 1, 3004, 1, 0),
(8, 1, 3001, 1, 0),
(9, 1, 3002, 1, 0),
(10, 1, 3003, 0, 0),
(11, 1, 3005, 1, 0),
(12, 1, 2003, 2, 0),
(13, 2, 3001, 0, 0),
(14, 2, 3002, 0, 0),
(15, 1, 2001, 1, 0),
(16, 1, 6001, 1, 0),
(17, 1, 6002, 1, 0),
(18, 1, 6005, 1, 1),
(19, 1, 6006, 1, 0),
(20, 1, 6004, 1, 1),
(21, 1, 6003, 1, 1),
(22, 1, 6008, 1, 1),
(23, 1, 6002, 1, 0),
(24, 1, 6002, 1, 0),
(25, 1, 6008, 1, 0),
(26, 1, 6001, 1, 0),
(27, 1, 6001, 1, 0),
(28, 1, 6001, 1, 0),
(29, 1, 6001, 1, 0),
(30, 1, 6001, 1, 0),
(31, 1, 6001, 1, 0),
(32, 23, 6014, 1, 1),
(33, 23, 6013, 1, 1),
(34, 23, 2001, 3, 0),
(35, 27, 2001, 2, 0),
(36, 1, 6013, 1, 1),
(37, 32, 6017, 1, 1),
(38, 32, 2001, 2, 0),
(39, 32, 3001, 1, 0),
(40, 30, 3001, 4, 0),
(41, 30, 6001, 1, 0),
(42, 30, 2001, 2, 0);

-- --------------------------------------------------------

--
-- 表的结构 `invite`
--

CREATE TABLE `invite` (
  `id` int(11) UNSIGNED NOT NULL,
  `admin_id` int(11) UNSIGNED NOT NULL,
  `invitee_id` int(11) UNSIGNED DEFAULT NULL,
  `invitecode` varchar(255) DEFAULT NULL,
  `status` int(1) UNSIGNED DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `invite`
--

INSERT INTO `invite` (`id`, `admin_id`, `invitee_id`, `invitecode`, `status`) VALUES
(1, 2, 1, '2025', 1);

-- --------------------------------------------------------

--
-- 表的结构 `message`
--

CREATE TABLE `message` (
  `id` int(11) UNSIGNED NOT NULL,
  `character_id` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `zone_id` int(11) UNSIGNED DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `type` tinyint(1) UNSIGNED DEFAULT '0',
  `status` tinyint(1) UNSIGNED DEFAULT '1',
  `create_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `role`
--

CREATE TABLE `role` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` tinyint(1) UNSIGNED DEFAULT NULL,
  `create_time` int(11) UNSIGNED DEFAULT NULL,
  `update_time` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `role`
--

INSERT INTO `role` (`id`, `name`, `status`, `create_time`, `update_time`) VALUES
(1, '超级管理员', 1, 0, 0),
(2, '玩家', 1, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `role_rule`
--

CREATE TABLE `role_rule` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `rule_ids` text,
  `status` tinyint(1) UNSIGNED DEFAULT NULL,
  `create_time` int(11) UNSIGNED DEFAULT NULL,
  `update_time` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- 表的结构 `rule`
--

CREATE TABLE `rule` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `status` tinyint(1) UNSIGNED DEFAULT NULL,
  `create_time` int(11) UNSIGNED DEFAULT NULL,
  `update_time` int(11) UNSIGNED DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `rule`
--

INSERT INTO `rule` (`id`, `name`, `pid`, `img`, `status`, `create_time`, `update_time`, `url`) VALUES
(1, '管理员功能', 0, NULL, 1, 1735874408, 1735874408, 'admin/index'),
(2, '编辑管理员', 1, NULL, 1, 1735874408, 1735874408, 'admin/save'),
(3, '删除管理员', 1, 'test1', 1, 1736156143, 1736156564, 'admin/delete');

-- --------------------------------------------------------

--
-- 表的结构 `soldier`
--

CREATE TABLE `soldier` (
  `id` int(11) UNSIGNED NOT NULL,
  `character_id` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `config_id` int(11) UNSIGNED NOT NULL DEFAULT '2001',
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `level` int(5) UNSIGNED NOT NULL DEFAULT '1',
  `exp` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `points` int(11) UNSIGNED NOT NULL DEFAULT '4',
  `hppoint` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `mppoint` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `atkpoint` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `sppoint` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `hp` int(11) UNSIGNED DEFAULT '0',
  `mp` int(11) UNSIGNED DEFAULT '0',
  `job` int(1) UNSIGNED DEFAULT '1',
  `country` int(1) UNSIGNED DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `soldier`
--

INSERT INTO `soldier` (`id`, `character_id`, `config_id`, `status`, `level`, `exp`, `points`, `hppoint`, `mppoint`, `atkpoint`, `sppoint`, `hp`, `mp`, `job`, `country`) VALUES
(10004, 1, 1002, 0, 6, 215, 19, 0, 0, 5, 0, 10, 10, 1, 1),
(10005, 1, 2001, 0, 2, 21, 8, 0, 0, 0, 0, 21, 21, 1, 1),
(10006, 1, 2001, 0, 2, 21, 8, 0, 0, 0, 0, 96, 64, 1, 1),
(10007, 1, 1008, 0, 5, 135, 20, 0, 0, 0, 0, 10, 10, 1, 1),
(10008, 1, 2002, 0, 2, 21, 8, 0, 0, 0, 0, 95, 56, 1, 1),
(10009, 22, 1013, 0, 1, 0, 4, 0, 0, 0, 0, 11, 11, 1, 1),
(10010, 22, 1014, 0, 1, 0, 4, 0, 0, 0, 0, 11, 11, 1, 1),
(10011, 22, 2008, 1, 1, 2, 4, 0, 0, 0, 0, 11, 11, 1, 1),
(10012, 26, 1005, 1, 1, 2, 4, 0, 0, 0, 0, 11, 11, 1, 1),
(10013, 26, 1001, 1, 1, 2, 4, 0, 0, 0, 0, 11, 11, 1, 1),
(10014, 29, 1011, 1, 1, 0, 4, 0, 0, 0, 0, 11, 11, 1, 1),
(10015, 29, 1007, 1, 1, 0, 4, 0, 0, 0, 0, 11, 11, 1, 1),
(10016, 27, 1001, 1, 1, 0, 4, 0, 0, 0, 0, 11, 11, 1, 1),
(10017, 27, 1007, 1, 1, 0, 4, 0, 0, 0, 0, 11, 11, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `task`
--

CREATE TABLE `task` (
  `id` int(11) UNSIGNED NOT NULL,
  `character_id` int(11) UNSIGNED NOT NULL,
  `configid` int(11) UNSIGNED DEFAULT NULL,
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT '0可接1已接2已完成'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `task`
--

INSERT INTO `task` (`id`, `character_id`, `configid`, `status`) VALUES
(3, 1, 1001, 1),
(10, 20, 1001, 1),
(11, 21, 1001, 1),
(12, 22, 1001, 1),
(13, 23, 1001, 1),
(14, 24, 1001, 1),
(15, 25, 1001, 1),
(16, 26, 1001, 1),
(17, 27, 1001, 2),
(18, 28, 1001, 2),
(19, 29, 1001, 1),
(20, 28, 1002, 1),
(21, 27, 1002, 1);

-- --------------------------------------------------------

--
-- 表的结构 `version`
--

CREATE TABLE `version` (
  `id` int(11) UNSIGNED NOT NULL,
  `version` varchar(255) DEFAULT NULL,
  `apkurl` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `version`
--

INSERT INTO `version` (`id`, `version`, `apkurl`, `description`, `create_time`) VALUES
(5, '0.0.8', 'https://cos.tutlab.tech/sgol.apk', '0.0.8', '2025-01-29 18:12:35'),
(6, '0.0.9', 'https://cos.tutlab.tech/sgol.apk', '0.0.9', '2025-01-29 18:16:58');

-- --------------------------------------------------------

--
-- 表的结构 `zone`
--

CREATE TABLE `zone` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `index` int(3) UNSIGNED NOT NULL DEFAULT '0',
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `tag` varchar(255) DEFAULT '1',
  `player_counts` int(11) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `zone`
--

INSERT INTO `zone` (`id`, `name`, `index`, `status`, `tag`, `player_counts`) VALUES
(1, '蛇年大吉', 0, 1, '新区', 0),
(2, '内测区1', 1, 0, '内测区', 0);

--
-- 转储表的索引
--

--
-- 表的索引 `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `admin_zone_id` (`zone_id`);

--
-- 表的索引 `admin_role`
--
ALTER TABLE `admin_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_role_admin_id` (`admin_id`);

--
-- 表的索引 `bag`
--
ALTER TABLE `bag`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `character`
--
ALTER TABLE `character`
  ADD PRIMARY KEY (`id`),
  ADD KEY `character_admin_id` (`admin_id`),
  ADD KEY `character_zone_id` (`zone_id`),
  ADD KEY `character_bag_id` (`bag_id`);

--
-- 表的索引 `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `goods_bag_id` (`bag_id`);

--
-- 表的索引 `invite`
--
ALTER TABLE `invite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invite_admin_id` (`admin_id`);

--
-- 表的索引 `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- 表的索引 `role_rule`
--
ALTER TABLE `role_rule`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- 表的索引 `rule`
--
ALTER TABLE `rule`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- 表的索引 `soldier`
--
ALTER TABLE `soldier`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `soldier_character_id` (`character_id`);

--
-- 表的索引 `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_character_id` (`character_id`);

--
-- 表的索引 `version`
--
ALTER TABLE `version`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `zone`
--
ALTER TABLE `zone`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `index` (`index`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- 使用表AUTO_INCREMENT `admin_role`
--
ALTER TABLE `admin_role`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `bag`
--
ALTER TABLE `bag`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- 使用表AUTO_INCREMENT `character`
--
ALTER TABLE `character`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- 使用表AUTO_INCREMENT `goods`
--
ALTER TABLE `goods`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- 使用表AUTO_INCREMENT `invite`
--
ALTER TABLE `invite`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `role_rule`
--
ALTER TABLE `role_rule`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `rule`
--
ALTER TABLE `rule`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `soldier`
--
ALTER TABLE `soldier`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10018;

--
-- 使用表AUTO_INCREMENT `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- 使用表AUTO_INCREMENT `version`
--
ALTER TABLE `version`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `zone`
--
ALTER TABLE `zone`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 限制导出的表
--

--
-- 限制表 `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_zone_id` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `admin_role`
--
ALTER TABLE `admin_role`
  ADD CONSTRAINT `admin_role_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `character`
--
ALTER TABLE `character`
  ADD CONSTRAINT `character_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `character_bag_id` FOREIGN KEY (`bag_id`) REFERENCES `bag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `character_zone_id` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `goods`
--
ALTER TABLE `goods`
  ADD CONSTRAINT `goods_bag_id` FOREIGN KEY (`bag_id`) REFERENCES `bag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `invite`
--
ALTER TABLE `invite`
  ADD CONSTRAINT `invite_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `soldier`
--
ALTER TABLE `soldier`
  ADD CONSTRAINT `soldier_character_id` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_character_id` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
