<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::get('allProduct', [ProductController::class, 'index']);
Route::post('addProduct', [ProductController::class, 'add']);
Route::post('updateProduct', [ProductController::class, 'update']);
Route::post('deleteProduct', [ProductController::class, 'delete']);
Route::post('showProduct', [ProductController::class, 'show']);
Route::post('allProduct/cari', [ProductController::class, 'search']);