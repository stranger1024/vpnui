<?php

// change the following paths if necessary
$yii=dirname(__FILE__).'/../application/framework/yii.php';
$config=dirname(__FILE__).'/../application/protect/config/main.php';

// remove the following lines when in production mode
defined('YII_DEBUG') or define('YII_DEBUG',true);
// specify how many levels of call stack should be shown in each log message
defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL',3);

require_once($yii);
require_once __DIR__.'/../application/protect/vendor/autoload.php';
Yii::createWebApplication($config)->run();
