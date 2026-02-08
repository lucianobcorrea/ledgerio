<?php

namespace App\Http\Controllers\auth;

use App\Exceptions\CompanyCreationException;
use App\Exceptions\UserCreationException;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class AuthenticationController extends Controller
{
    public function login(LoginRequest $request)
    {
        $request->validated();
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Login successful!',
            ]);
        } else {
            return response()->json([
                'message' => 'Invalid login credentials!',
            ], 401);
        }
    }

    public function register(RegisterRequest $request)
    {
        $request->validated();
        $data = $request->input();
        $cnpj = preg_replace('/[^0-9]/', '', (string) $data['cnpj']);

        DB::transaction(function () use ($data, $cnpj) {
            $company = Company::create([
                'name' => $data['company_name'],
                'cnpj' => $cnpj
            ]);

            if (!$company) {
                throw new CompanyCreationException();
            }

            $data['company_id'] = $company->id;
            $user = User::create($data);
            if (!$user) {
                throw new UserCreationException();
            }
            $user->assignRole('company');

            return $user;
        });

        return response()->json([
            'message' => 'User created successfully'
        ], 201);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->noContent();
    }
}
