<?php

use App\Http\Controllers\auth\AuthenticationController;
use App\Http\Controllers\auth\RolesController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthenticationController::class, 'register']);
Route::post('login', [AuthenticationController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [AuthenticationController::class, 'logout']);
    Route::get('roles', [RolesController::class, 'roles']);
});