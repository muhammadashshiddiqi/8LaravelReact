<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(Request $request){

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $rest = [
            'status' => 'success',
            'data' => $user,
            'message' => 'Successfully, User Telah terdaftar !'
        ];

        return response()->json($rest, 201);
    }

    public function login(Request $request){
        $user = User::where('email', $request->email)->first();
        
        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json(['status' => 'error', 'message' => 'Wrong username or password !'], 200);
        }

        $rest = [
            'status' => 'success',
            'data' => $user,
            'message' => 'Successfully login !'
        ];

        return response()->json($rest, 201);
    }
}
