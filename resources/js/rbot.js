"use strict";

/**
 * Rbot Angular App
 */
var app = angular.module('rbot', []);

/**
 * HTML filter
 */
app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

/**
 * Main controller
 */
app.controller('consoleController', ['$scope', '$http', function($s, $http) {

    $s.cmd_history       = [];
    $s.cmd_input         = "$";
    $s.cmd_input_default = "$";
    //$s.console           = "";
    $s.console_last_id = 0;

    var el = {
        cmd: document.getElementById("cmd"),
        console: document.getElementById("console")
    }

    var ui_cmds = {
        clear: function() {
            el.console.innerHTML = '';
        }
    }

    /**
     * Get console history
     */
    $s.getConsoleHistory = function() {
        $http.post('index.php', {h: $s.console_last_id})
            .success(function (data) {
                if(data.length>0) {
                    el.console.innerHTML += "\n" + data;
                    el.console.scrollTop = el.console.scrollHeight;
                }
            })
        .error(function () {
            console.log("Cannot retreive history");
        });
    }

    setInterval(function() {
        $s.getConsoleHistory();
    }, 1000);



    //set full screen console
    //console.innerHeight = window.outerHeight;

    /**
     * Analyse cmd input keydown
     */
    $s.cmdTyping = function($event) {

        var keycode = (window.event ? $event.keyCode : $event.which);
        //console.log(keycode);

        if(keycode == 13) {
            //enter
            if($s.cmd_input === '$' || $s.cmd_input === '') {
                el.console.innerHTML += "\n";
                el.console.scrollTop = el.console.scrollHeight;
            }
            else {
                request($s.getConsoleHistory);
                $s.cmd_history.push($s.cmd_input);
                $s.cmd_input = $s.cmd_input_default;
            }
        }
        else if(keycode == 8) {
            //backspace
            if($s.cmd_input == "$") {
                $s.cmd_input = "";
            }
        }
        else if(keycode == 38) {
            //up
            $s.cmd_input = $s.cmd_history[$s.cmd_history.length-1];
        }
        else if(keycode == 40) {
            //down
        }
        else if($s.cmd_input.trim() == "" && keycode == 32) {
            $s.cmd_input = "$";
        }
    };

    $s.focusCmd = function() {
        el.cmd.focus();
    }

    /**
     * Send cmd request
     */
    function request(success_fn) {

        if(isUiCmd($s.cmd_input)) {
            ui_cmds[$s.cmd_input]();
            return;
        }

        //console.log($s.cmd_input);
        $http.post('index.php', {cmd: $s.cmd_input})
            .success(function (data) {
                if(success_fn) {
                    success_fn();
                }
            })
        .error(function () {
            console.log("Cannot resolve: " + $s.cmd_input);
        });
    }

    /**
     * Check if command is a ui command
     * 
     * @param  string  cmd
     * @return boolean
     */
    function isUiCmd(cmd) {
        return ui_cmds[cmd] ? true : false;
    }

    function init() {
        document.body.addEventListener("dblclick",function() {
            console.log('dlclock');
            document.getElementById("cmd").focus();
        })
    }
    init();
}]);