<?php

class m171119_124900_add_transfers_table extends CDbMigration
{
	public function up()
	{
		$this->createTable('transfers', array(
			'id' => 'pk',
			'user_id' => 'int(11) NOT NULL',
			'bites' => 'bigint(20) NOT NULL',
			'resourse' => 'varchar(1024) NOT NULL',
			'date' => 'datetime'
		));
		$this->addForeignKey('users_transfers_fk', 'transfers', 'user_id', 'users', 'id', 'cascade', 'cascade');

	}

	public function down()
	{
//		echo "m171119_124900_add_transfers_table does not support migration down.\n";
//		return false;
		$this->dropTable('transfers');
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