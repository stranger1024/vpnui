<?php

/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class ApiBaseController extends CController {

    /**
     * @var string the default layout for the controller view. Defaults to '//layouts/column1',
     * meaning using a single column layout. See 'protected/views/layouts/column1.php'.
     */
    public $layout = false;

    /**
     * @var array context menu items. This property will be assigned to {@link CMenu::items}.
     */
    public $menu = false;

    /**
     * @var array the breadcrumbs of the current page. The value of this property will
     * be assigned to {@link CBreadcrumbs::links}. Please refer to {@link CBreadcrumbs::links}
     * for more details on how to specify this property.
     */
    public $breadcrumbs = false;

    protected function sendResponse($data = array()) {
        header('Content-type: application/json');
        echo CJSON::encode($data);

        foreach (Yii::app()->log->routes as $route) {
            if ($route instanceof CWebLogRoute) {
                $route->enabled = false; 
            }
        }

        Yii::app()->end();
    }

//	protected function send404Response($message = "") {
//		header('HTTP/1.0 404 Not Found');
//		echo $message;
//		Yii::app()->end();
//	}

	protected function requestError($code, $message = "")
	{
		$errors = [
			200 => "Ok",
			400 => "Bad Request",
			401 => "Unauthorized",
			404 => "Not Found",
			405 => "Method not Allowed",
			500 => "Internal Server Error"
		];
		header('HTTP/1.0 ' . $code . ' ' . $errors[$code]);
		echo $errors[$code] . " " . $message;
		Yii::app()->end();
	}

	protected function getRequestType()
	{
		return $_SERVER["REQUEST_METHOD"];
	}
}
