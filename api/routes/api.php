<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\RolesController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthenticationController::class, 'register']);
Route::post('login', [AuthenticationController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [AuthenticationController::class, 'logout']);
    Route::get('roles', [RolesController::class, 'roles']);
    Route::get('employees', [EmployeesController::class, 'index']);
});