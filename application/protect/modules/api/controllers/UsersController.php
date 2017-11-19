<?php

class UsersController extends ApiBaseController
{

	public function actionIndex(){
		if($this->getRequestType() !== "GET") {
			$this->requestError(405);
		}

		$users = Users::getList();

		$this->sendResponse(["success" => 1, "data" => $users]);
	}

	public function actionAdd(){
		if($this->getRequestType() !== "POST") {
			$this->requestError(405);
		}

		$required_params = ["company", "name", "email"];
		foreach ($required_params as $param) {
			if (Yii::app()->request->getParam($param, NULL) === NULL) {
				$this->sendResponse(array('message' => $param . " parameter is required", 'success' => 0));
			}
		}

		$user = new Users();
		$user->company_id = Yii::app()->request->getParam("company");
		$user->name = Yii::app()->request->getParam("name");
		$user->email = Yii::app()->request->getParam("email");

		if($user->save()){
			$this->sendResponse(["success" => 1, "data" => []]);
		}else{
			$this->sendResponse(["success" => 0, "message" => $user->getErrors()]);
		}
	}

	public function actionUpdate(){
		if($this->getRequestType() !== "POST") {
			$this->requestError(405);
		}

		$required_params = ["id", "company", "name", "email"];
		foreach ($required_params as $param) {
			if (Yii::app()->request->getParam($param, NULL) === NULL) {
				$this->sendResponse(array('message' => $param . " parameter is required", 'success' => 0));
			}
		}

		$user = Users::model()->findByPk(Yii::app()->request->getParam("id"));
		if($user){
			$user->company_id = Yii::app()->request->getParam("company");
			$user->name = Yii::app()->request->getParam("name");
			$user->email = Yii::app()->request->getParam("email");

			if($user->save()){
				$this->sendResponse(["success" => 1, "data" => []]);
			}else{
				$this->sendResponse(["success" => 0, "message" => $user->getErrors()]);
			}
		}else{
			$this->sendResponse(["success" => 0, "message" => "User not found"]);
		}
	}

	public function actionDelete(){
		if($this->getRequestType() !== "DELETE") {
			$this->requestError(405);
		}

		$required_params = ["id"];
		foreach ($required_params as $param) {
			if (Yii::app()->request->getRestParams($param, NULL) === NULL) {
				$this->sendResponse(array('message' => $param . " parameter is required", 'success' => 0));
			}
		}

		$user = Users::model()->findByPk(Yii::app()->request->getRestParams("id"));
		if($user){
			$user->delete();
			$this->sendResponse(["success" => 1, "data" => []]);
		}else{
			$this->sendResponse(["success" => 0, "message" => "user not found"]);
		}
	}

	public function actionCount(){
		if($this->getRequestType() !== "GET") {
			$this->requestError(405);
		}

		$users = Users::model()->findAll();
		$this->sendResponse(["success" => 1, "data" => ["count" => sizeof($users)]]);
	}


}