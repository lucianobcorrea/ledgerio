<?php

namespace App\Http\Controllers;

use App\Exceptions\EmployeeCreationException;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateEmployeeRequest;
use App\Models\User;

class EmployeesController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if (!$user->hasRole('company')) {
            return response()->json([
                'message' => "You don't have permission to access this resource"
            ], 403);
        }
        $company = $user->company;
        $companyId = $company->id;

        $perPage = request('per_page', 10);
        $employees = User::
            where('company_id', $companyId)
            ->where('id', '!=', $user->id)
            ->paginate($perPage);
        return response()->json($employees);
    }

    public function store(CreateEmployeeRequest $request)
    {
        $request->validated();
        $data = $request->input();
        $data['company_id'] = auth()->user()->company->id;
        $user = User::create($data);

        if (!$user) {
            throw new EmployeeCreationException();
        }

        $user->assignRole('employee');

        return response()->json([
            'message' => 'User created successfully'
        ], 201);
    }

    public function delete(User $employee)
    {
        $employee->delete();
        return response()->json([
            'message' => 'Employee deleted successfully'
        ], 200);
    }
}
