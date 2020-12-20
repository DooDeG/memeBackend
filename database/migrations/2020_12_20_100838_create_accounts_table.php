<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('password');
            $table->Boolean('isActive')->dafault(False);
            $table->Boolean('tc')->dafault(False);
            $table->Boolean('isVerified')->dafault(False);
            $table->integer('loginAlias')->nullable();
            $table->string('public_id')->unique();
            $table->string('uid')->unique();
            $table->Boolean('payAble')->default(true);
            $table->string('identifier')->unique();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accounts');
    }
}
