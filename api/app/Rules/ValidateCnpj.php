<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidateCnpj implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $cnpj = preg_replace('/[^0-9]/', '', (string) $value);

        // Validate length
        if (strlen($cnpj) != 14) {
            $fail('The :attribute must be 14 digits.');
            return;
        }

        // Verify if all the digits are the same
        if (preg_match('/(\d)\1{13}/', $cnpj)) {
            $fail('The :attribute must not be all the same.');
            return;
        }

        // Validates the first check digit
        for ($i = 0, $j = 5, $sum = 0; $i < 12; $i++) {
            $sum += $cnpj[$i] * $j;
            $j = ($j == 2) ? 9 : $j - 1;
        }

        $rest = $sum % 11;

        if ($cnpj[12] != ($rest < 2 ? 0 : 11 - $rest)) {
            $fail('The :attribute is invalid.');
            return;
        }

        // Validares the second check digit
        for ($i = 0, $j = 6, $sum = 0; $i < 13; $i++) {
            $sum += $cnpj[$i] * $j;
            $j = ($j == 2) ? 9 : $j - 1;
        }

        $rest = $sum % 11;

        if ($cnpj[13] != ($rest < 2 ? 0 : 11 - $rest)) {
            $fail('The :attribute is invalid.');
            return;
        }
    }
}
