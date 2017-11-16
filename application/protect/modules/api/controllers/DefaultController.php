<?php

class DefaultController extends ApiBaseController
{
	public function actionIndex()
	{
		$this->requestError(404);
	}
}