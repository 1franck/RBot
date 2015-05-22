<?php
/*
 * This file is part of the RBot app.
 *
 * (c) Francois Lajoie <o_o@francoislajoie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace RBot;

use GetOptionKit\OptionCollection;
use GetOptionKit\OptionParser;
use GetOptionKit\OptionPrinter\ConsoleOptionPrinter;

use Exception;
use GetOptionKit\Exception\InvalidOptionException;
use GetOptionKit\Exception\RequireValueException;
use GetOptionKit\Exception\NonNumericException;

class Console 
{
    // console lines array
    static protected $_lines = [];

    // end of line used
    static $EOL = PHP_EOL;

    /**
     * Add line(s) to console
     * 
     * @param string|array $data
     */
    static function add($data)
    {
        if(!is_array($data)) $data = [$data];

        foreach($data as $d) {
            self::$_lines[] = $d;
        }
    }

    /**
     * Output console lines
     * @param  boolean $die use die() instead of echo
     */
    static function output($die = false)
    {
        if($die) die(self::_renderAll());
        echo self::_renderAll();
    }

    /**
     * add() + outputDie()
     * @param string|array $data
     */
    static function addAndDie($data)
    {
        self::add($data);
        self::outputDie();
    }

    /**
     * die the output!
     */
    static function outputDie()
    {
        self::output(true);
    }

    /**
     * All others are faker, im the real one here! who work hard to process the stuff baby.
     * 
     * @return string
     */
    static protected function _renderAll()
    {
        return join("\n", self::$_lines);
    }
}