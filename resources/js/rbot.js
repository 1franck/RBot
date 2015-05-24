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

    var el = {
        cmd: document.getElementById("cmd"),
        console: document.getElementById("console")
    }

    var ui_cmds = {
        clear: function() {
            el.console.innerHTML = '';
        }
    }


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
            request();
            $s.cmd_history.push($s.cmd_input);
            $s.cmd_input = $s.cmd_input_default;
        }
        else if(keycode == 8) {
            //backspace
            if($s.cmd_input.trim() == "$") {
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
    function request() {

        if(isUiCmd($s.cmd_input)) {
            ui_cmds[$s.cmd_input]();
            return;
        }

        //console.log($s.cmd_input);
        $http.post('index.php', {cmd: $s.cmd_input})
            .success(function (data) {
                //console.log("Resolved: " + $s.cmd_input);   
                //$s.console = data + "\n" + $s.console;
                //$s.console = $s.console + "\n" + data;
                el.console.innerHTML += data;
                el.console.scrollTop = el.console.scrollHeight;
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