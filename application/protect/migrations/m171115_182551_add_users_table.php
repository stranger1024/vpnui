<?php

class m171115_182551_add_users_table extends CDbMigration
{
	public function up()
	{
		$this->createTable('users', array(
			'id' => 'pk',
			'name' => 'TINYTEXT NOT NULL',
			'email' => 'TINYTEXT NOT NULL',
			'company_id' => 'int(11) NOT NULL',
			'created' => 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'
		));
		$this->addForeignKey('users_company_fk', 'users', 'company_id', 'companies', 'id', 'cascade', 'cascade');
	}

	public function down()
	{
//		echo "m171115_182551_add_users_table does not support migration down.\n";
//		return false;
		$this->dropTable('users');
	}

	/*
	// Use safeUp/safeDown to do migration with transaction
	public function safeUp()
	{
	}

	public function safeDown()
	{
	}
	*/
}