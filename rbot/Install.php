<?php

namespace RBot;

use RBot\Command;

use GetOptionKit\OptionCollection;
use GetOptionKit\OptionParser;
use GetOptionKit\OptionPrinter\ConsoleOptionPrinter;

use Nette\Database\Connection;
use Nette\Database\Context;


$specs = new OptionCollection;

print_r($specs);

class Install extends Command {
    
    public function base()
    {


"
-- MySQL Script generated by MySQL Workbench
-- 05/04/15 20:50:58
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`queue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`queue` ;

CREATE TABLE IF NOT EXISTS `mydb`.`queue` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `command` VARCHAR(255) NULL,
  `task` TEXT NULL,
  `dt_created` DATETIME NULL,
  `dt_executed` DATETIME NULL,
  `repeat` TINYINT NULL,
  `repeat_time` INT UNSIGNED NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`console`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`console` ;

CREATE TABLE IF NOT EXISTS `mydb`.`console` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `line` TEXT NULL,
  `dt_created` DATETIME NULL,
  `command` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

";

    }
}