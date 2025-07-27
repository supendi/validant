# Validant

[![npm version](https://badge.fury.io/js/validant.svg)](https://badge.fury.io/js/validant)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Validant** is a TypeScript-first validation library for real-world, dynamic rules — no DSLs, just types and functions.

```ts
// Define your model
interface User {
    name: string;
    email: string;
    age: number;
}

// Create validation rules
const userRule: ValidationRule<User> = {
    name: [required("Name is required")],
    email: [required(), emailAddress("Invalid email")],
    age: [required(), minNumber(18, "Must be 18+")]
};

// Validate
const validator = new Validator();
const result = validator.validate(user, userRule);
```

## Table of Contents

- [✨ Why Validant?](#-why-validant)
- [📊 Benchmark Results](https://github.com/supendi/validant-bench/blob/main/BENCHMARK_RESULTS.md)
- [🧩 When validation is complex and not just "required()"](#-when-validation-is-not-just-required-and-complex)
- [🏁 Getting Started](#-getting-started)
  - [📦 Installation](#-installation)
  - [🛠️ Validation Rule, Not Schema](#️-validation-rule-not-schema)
  - [✅ IntelliSense That Just Works](#-intellisense-that-just-works)
- [🛡️ Type Safe](#️-type-safe)
  - [🔒 Safe at Compile Time](#-safe-at-compile-time)
  - [🔒 Safe at Run Time](#-safe-at-run-time)
- [✅ Type Freedom](#-type-freedom)
- [🛠️ Validation](#️-validation)
  - [⚡Sync Validation](#sync-validation)
    - [Object Level Validation](#object-level-validation)
    - [Field Level Validation](#field-level-validation)
  - [🌐 Async Validation](#-async-validation)
    - [Async Object Level Validation](#async-object-level-validation)
    - [Async Field Level Validation](#async-field-level-validation)
    - [✅ Intuitive Error Structure](#-intuitive-error-structure)
- [🔧 Custom Validation](#-custom-validation)
  - [🧩 Inline Custom Rule Example](#-inline-custom-rule-example)
  - [🧩 Composable Rule](#-composable-rule)
  - [🔓 Loose Coupling](#-loose-coupling)
- [🧮 Array Validation](#-array-validation)
- [⚠️ Error Structure Breakdown](#️-error-structure-breakdown)
  - [🧱 {} Object Error](#-object-error)
  - [🧱 [] Array Error](#-array-error)
  - [🛡️ Type-Safe Error](#️-type-safe-error)
- [🧬 Validation Context Awareness: Property, Root Object, and Arrays](#-validation-context-awareness-property-root-object-and-arrays)
  - [🔹Property-Level Awareness](#property-level-awareness)
  - [🔹Root object awareness](#root-object-awareness)
  - [🔹Array (Item) Awareness](#array-item-awareness)
- [Examples](#examples)
  - [Sync Example](#sync-example)
  - [Async Examples](#async-examples)
- [🧩 Validation Rule Composition](#-validation-rule-composition)
- [📚 API Reference](#-api-reference)
  - [Types](#types)
  - [Custom Validate Function](#custom-rule-function-property-validator)
- [Built-in Rules](#built-in-rules)
- [🔄 Flat Error Structure for UI/API](#-flat-error-structure-for-uiapi)

## ✨ Why Validant?
-   🔄 TYPE-FIRST, NOT SCHEMA-FIRST = LOOSE COUPLING: Unlike other libraries that generate types from schemas, Validant starts from your own types — allowing you to decouple your app from any validation library, including this one.
-   🧠 No DSLs. No special syntax. Just plain functions.
-   🧩 Composable: Easily combine validations and reuse them across your codebase.
-   🪶 Zero dependencies. Minimal API. Maximum control.
-   🧪 Made for TypeScript first: Validant is written in and only tested with TypeScript. It's built for modern TypeScript-first projects. It might work in JavaScript — but it's never been tested there.
-   ✅ Deep, fine-grained validation on individual fields — sync or async, arrays, nested objects, also support Validate per Field

## 🧩 When validation is complex and not just "required()"
```ts

import {
    ValidationRule,
    AsyncValidationRule,
    Validator,
    AsyncValidator,
    required,
    minNumber,
    maxNumber,
    emailAddress,
    isString,
    isNumber,
    elementOf,
    arrayMinLen,
    arrayMaxLen,
    ValidateFunc,
    AsyncValidateFunc,
    RuleViolation,
    ValidationResult
} from '../../index';

// =============================================================================
// DOMAIN MODELS
// =============================================================================

interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface Person {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    ssn: string; // Social Security Number
    address: Address;
    phone: string;
    email: string;
}

interface PolicyHolder extends Person {
    policyNumber: string;
    policyStartDate: Date;
    policyEndDate: Date;
    premiumAmount: number;
    coverageType: 'BASIC' | 'PREMIUM' | 'COMPREHENSIVE';
    riskScore: number; // 1-100, calculated by underwriting
}

interface Vehicle {
    vin: string; // Vehicle Identification Number
    make: string;
    model: string;
    year: number;
    mileage: number;
    value: number; // Current market value
    primaryUse: 'PERSONAL' | 'COMMERCIAL' | 'BUSINESS';
    safetyRating: number; // 1-5 stars
    antiTheftDevices: string[];
}

interface Incident {
    incidentDate: Date;
    incidentTime: string; // HH:MM format
    location: Address;
    description: string;
    policeReportNumber?: string;
    weatherConditions: 'CLEAR' | 'RAIN' | 'SNOW' | 'FOG' | 'ICE' | 'SEVERE';
    roadConditions: 'DRY' | 'WET' | 'ICY' | 'CONSTRUCTION' | 'POOR_VISIBILITY';
    atFaultParties: string[]; // Can be multiple parties
    witnessCount: number;
}

interface Damage {
    component: string; // e.g., "Front Bumper", "Engine", "Windshield"
    severity: 'MINOR' | 'MODERATE' | 'SEVERE' | 'TOTAL_LOSS';
    estimatedCost: number;
    repairShop?: string;
    partsRequired: string[];
    laborHours: number;
    isPreExistingDamage: boolean;
}

interface MedicalClaim {
    injuredParty: Person;
    injuryType: string;
    severity: 'MINOR' | 'MODERATE' | 'SEVERE' | 'CRITICAL';
    treatmentFacility: string;
    doctorName: string;
    estimatedTreatmentCost: number;
    isPreExistingCondition: boolean;
    requiresSpecialistCare: boolean;
}

interface InsuranceClaim {
    claimNumber: string;
    claimType: 'AUTO_ACCIDENT' | 'THEFT' | 'VANDALISM' | 'NATURAL_DISASTER' | 'COMPREHENSIVE';
    policyHolder: PolicyHolder;
    claimant: Person; // Person filing the claim (might be different from policy holder)
    vehicle: Vehicle;
    incident: Incident;
    damages: Damage[];
    medicalClaims: MedicalClaim[];
    claimAmount: number; // Total claimed amount
    supportingDocuments: string[]; // Document IDs
    attorneyInvolved: boolean;
    attorneyDetails?: {
        name: string;
        barNumber: string;
        firm: string;
        phone: string;
    };
    priorClaims: number; // Number of claims in last 5 years
    submissionDate: Date;
    adjusterId?: string;
}

// =============================================================================
// MOCK EXTERNAL SERVICES
// =============================================================================

interface ExternalServices {
    validateSSN(ssn: string): Promise<boolean>;
    validateVIN(vin: string): Promise<{ isValid: boolean; vehicleInfo?: any }>;
    validatePolicyStatus(policyNumber: string): Promise<{ isActive: boolean; hasOutstandingPremiums: boolean }>;
}

// Mock implementation
const externalServices: ExternalServices = {
    async validateSSN(ssn: string): Promise<boolean> {
        await new Promise(resolve => setTimeout(resolve, 10));
        return /^\d{3}-\d{2}-\d{4}$/.test(ssn);
    },

    async validateVIN(vin: string): Promise<{ isValid: boolean; vehicleInfo?: any }> {
        await new Promise(resolve => setTimeout(resolve, 15));
        const isValid = /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
        return {
            isValid,
            vehicleInfo: isValid ? { decoded: true } : undefined
        };
    },

    async validatePolicyStatus(policyNumber: string): Promise<{ isActive: boolean; hasOutstandingPremiums: boolean }> {
        await new Promise(resolve => setTimeout(resolve, 10));
        return {
            isActive: !policyNumber.includes('EXPIRED'),
            hasOutstandingPremiums: policyNumber.includes('OVERDUE')
        };
    }
};

// =============================================================================
// BUSINESS RULE VALIDATORS
// =============================================================================

function validateSSNFormat(): AsyncValidateFunc<string, any> {
    return async function (ssn: string) {
        if (!ssn) return undefined;

        const isValidFormat = await externalServices.validateSSN(ssn);
        if (!isValidFormat) {
            return {
                ruleName: 'validateSSNFormat',
                attemptedValue: ssn,
                errorMessage: 'Invalid Social Security Number format or number does not exist.'
            };
        }
    };
}

function validateVINNumber(): AsyncValidateFunc<string, InsuranceClaim> {
    return async function (vin: string, claim: InsuranceClaim) {
        if (!vin) return undefined;

        const result = await externalServices.validateVIN(vin);
        if (!result.isValid) {
            return {
                ruleName: 'validateVINNumber',
                attemptedValue: vin,
                errorMessage: 'Invalid Vehicle Identification Number. Please verify the VIN.'
            };
        }
    };
}

function validatePolicyActive(): AsyncValidateFunc<string, InsuranceClaim> {
    return async function (policyNumber: string, claim: InsuranceClaim) {
        if (!policyNumber) return undefined;

        const status = await externalServices.validatePolicyStatus(policyNumber);

        if (!status.isActive) {
            return {
                ruleName: 'validatePolicyActive',
                attemptedValue: policyNumber,
                errorMessage: 'Policy is not active. Claims cannot be processed for inactive policies.'
            };
        }

        if (status.hasOutstandingPremiums) {
            return {
                ruleName: 'validatePolicyActive',
                attemptedValue: policyNumber,
                errorMessage: 'Policy has outstanding premiums. Please resolve payment issues before filing a claim.'
            };
        }
    };
}

function validateIncidentDate(): ValidateFunc<Date, InsuranceClaim> {
    return function (incidentDate: Date, claim: InsuranceClaim) {
        if (!incidentDate) return undefined;

        const now = new Date();
        const policyStart = claim.policyHolder.policyStartDate;
        const policyEnd = claim.policyHolder.policyEndDate;

        // Can't be in the future
        if (incidentDate > now) {
            return {
                ruleName: 'validateIncidentDate',
                attemptedValue: incidentDate,
                errorMessage: 'Incident date cannot be in the future.'
            };
        }

        // Must be within policy period
        if (incidentDate < policyStart || incidentDate > policyEnd) {
            return {
                ruleName: 'validateIncidentDate',
                attemptedValue: incidentDate,
                errorMessage: `Incident must have occurred during the policy period (${policyStart.toDateString()} - ${policyEnd.toDateString()}).`
            };
        }

        // Claims must be filed within 30 days of incident (business rule)
        const daysSinceIncident = Math.floor((now.getTime() - incidentDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysSinceIncident > 30) {
            return {
                ruleName: 'validateIncidentDate',
                attemptedValue: incidentDate,
                errorMessage: 'Claims must be filed within 30 days of the incident. Late filing requires special approval.'
            };
        }
    };
}

// =============================================================================
// COMPREHENSIVE VALIDATION RULES
// =============================================================================

const insuranceClaimValidationRules: AsyncValidationRule<InsuranceClaim> = {
    claimNumber: [
        required('Claim number is required.'),
        isString('Claim number must be a string.'),
        function (claimNumber: string) {
            if (!/^INS-\d{4}-\d{6}$/.test(claimNumber)) {
                return {
                    ruleName: 'claimNumberFormat',
                    attemptedValue: claimNumber,
                    errorMessage: 'Claim number must follow format: INS-YEAR-XXXXXX (e.g., INS-2024-000001)'
                };
            }
        }
    ],

    claimType: [
        required('Claim type is required.'),
        elementOf(['AUTO_ACCIDENT', 'THEFT', 'VANDALISM', 'NATURAL_DISASTER', 'COMPREHENSIVE'], 'Invalid claim type.')
    ],

    policyHolder: {
        firstName: [required('Policy holder first name is required.'), isString()],
        lastName: [required('Policy holder last name is required.'), isString()],

        dateOfBirth: [
            required('Date of birth is required.'),
            function (dob: Date, claim: InsuranceClaim) {
                const age = Math.floor((Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365));
                if (age < 16) {
                    return {
                        ruleName: 'minimumAge',
                        attemptedValue: dob,
                        errorMessage: 'Policy holder must be at least 16 years old.'
                    };
                }
                if (age > 100) {
                    return {
                        ruleName: 'maximumAge',
                        attemptedValue: dob,
                        errorMessage: 'Please verify date of birth. Age appears to be over 100 years.'
                    };
                }
            }
        ],

        ssn: [
            required('Social Security Number is required.'),
            validateSSNFormat()
        ],

        policyNumber: [
            required('Policy number is required.'),
            validatePolicyActive()
        ],

        email: [required(), emailAddress()],

        premiumAmount: [
            required(),
            minNumber(100, 'Minimum premium amount is $100.'),
            maxNumber(50000, 'Premium amount seems unusually high. Please verify.')
        ],

        coverageType: [
            required(),
            elementOf(['BASIC', 'PREMIUM', 'COMPREHENSIVE'], 'Invalid coverage type.')
        ],

        riskScore: [
            required(),
            minNumber(1, 'Risk score must be between 1 and 100.'),
            maxNumber(100, 'Risk score must be between 1 and 100.')
        ],

        address: {
            street: [required()],
            city: [required()],
            state: [required()],
            zipCode: [
                required(),
                function (zipCode: string) {
                    if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
                        return {
                            ruleName: 'zipCodeFormat',
                            attemptedValue: zipCode,
                            errorMessage: 'ZIP code must be in format: 12345 or 12345-6789'
                        };
                    }
                }
            ],
            country: [required()]
        }
    },

    claimant: {
        firstName: [required()],
        lastName: [required()],
        email: [required(), emailAddress()],
        ssn: [validateSSNFormat()],
        address: {
            street: [required()],
            city: [required()],
            state: [required()],
            zipCode: [required()],
            country: [required()]
        }
    },

    vehicle: {
        vin: [
            required('Vehicle VIN is required.'),
            validateVINNumber()
        ],

        make: [required()],
        model: [required()],

        year: [
            required(),
            minNumber(1990, 'Vehicles older than 1990 require special underwriting.'),
            maxNumber(new Date().getFullYear() + 1, 'Vehicle year cannot be in the future.')
        ],

        mileage: [
            required(),
            minNumber(0, 'Mileage cannot be negative.'),
            function (mileage: number, claim: InsuranceClaim) {
                const vehicleAge = new Date().getFullYear() - claim.vehicle.year;
                const expectedMaxMileage = vehicleAge * 15000;

                if (mileage > expectedMaxMileage * 1.5) {
                    return {
                        ruleName: 'mileageValidation',
                        attemptedValue: mileage,
                        errorMessage: `Mileage (${mileage.toLocaleString()}) appears unusually high for a ${claim.vehicle.year} vehicle.`
                    };
                }
            }
        ],

        value: [
            required(),
            minNumber(1000, 'Vehicle value must be at least $1,000 to be eligible for coverage.')
        ],

        primaryUse: [
            required(),
            elementOf(['PERSONAL', 'COMMERCIAL', 'BUSINESS'], 'Invalid primary use type.')
        ],

        safetyRating: [
            required(),
            minNumber(1, 'Safety rating must be between 1 and 5.'),
            maxNumber(5, 'Safety rating must be between 1 and 5.')
        ]
    },

    incident: {
        incidentDate: [
            required('Incident date is required.'),
            validateIncidentDate()
        ],

        incidentTime: [
            required(),
            function (time: string) {
                if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
                    return {
                        ruleName: 'timeFormat',
                        attemptedValue: time,
                        errorMessage: 'Time must be in HH:MM format (24-hour).'
                    };
                }
            }
        ],

        description: [
            required(),
            function (description: string) {
                if (description.length < 50) {
                    return {
                        ruleName: 'descriptionLength',
                        attemptedValue: description,
                        errorMessage: 'Incident description must be at least 50 characters long.'
                    };
                }
            }
        ],

        weatherConditions: [
            required(),
            elementOf(['CLEAR', 'RAIN', 'SNOW', 'FOG', 'ICE', 'SEVERE'], 'Invalid weather condition.')
        ],

        roadConditions: [
            required(),
            elementOf(['DRY', 'WET', 'ICY', 'CONSTRUCTION', 'POOR_VISIBILITY'], 'Invalid road condition.')
        ],

        witnessCount: [
            required(),
            minNumber(0, 'Witness count cannot be negative.'),
            maxNumber(20, 'Witness count seems unusually high. Please verify.')
        ],

        location: {
            street: [required()],
            city: [required()],
            state: [required()],
            zipCode: [required()],
            country: [required()]
        }
    },

    damages: {
        arrayRules: [
            arrayMinLen(1, 'At least one damage entry is required.')
        ],
        arrayElementRule: {
            component: [required()],
            severity: [
                required(),
                elementOf(['MINOR', 'MODERATE', 'SEVERE', 'TOTAL_LOSS'], 'Invalid damage severity.')
            ],
            estimatedCost: [
                required(),
                minNumber(1, 'Damage cost must be greater than $0.'),
                maxNumber(200000, 'Damage cost exceeds maximum limit.')
            ],
            laborHours: [
                required(),
                minNumber(0, 'Labor hours cannot be negative.'),
                maxNumber(500, 'Labor hours seem excessive.')
            ]
        }
    },

    claimAmount: [
        required('Claim amount is required.'),
        minNumber(1, 'Claim amount must be greater than $0.')
    ],

    supportingDocuments: {
        arrayRules: [
            arrayMinLen(1, 'At least one supporting document is required.')
        ]
    },

    priorClaims: [
        required(),
        minNumber(0, 'Prior claims count cannot be negative.'),
        function (priorClaims: number, claim: InsuranceClaim) {
            if (priorClaims >= 5) {
                return {
                    ruleName: 'priorClaimsLimit',
                    attemptedValue: priorClaims,
                    errorMessage: 'Policy holders with 5+ prior claims require executive approval.'
                };
            }
        }
    ],

    submissionDate: [
        required(),
        function (submissionDate: Date) {
            const now = new Date();
            if (submissionDate > now) {
                return {
                    ruleName: 'submissionDateFuture',
                    attemptedValue: submissionDate,
                    errorMessage: 'Submission date cannot be in the future.'
                };
            }
        }
    ]
};
```

## 🏁 Getting Started

### 📦 Installation

```
npm install validant
# or
yarn add validant
```

### 🛠️ Validation Rule, Not Schema

Your model is your source of truth.

If you already have a model (and you **should**), Validant wraps validations around it — **not the other way around**:

```ts
class Account {
    name: string;
    age: number;
    email: string;
}
```

Then you simply declare your validation rule dan validate:

```ts
import { minNumber, required, emailAddress, ValidationRule } from "validant";

const validationRule: ValidationRule<Account> = {
    name: [required("Account name is required.")],
    age: [required(), minNumber(17, "Should be at least 17 years old.")],
    email: [required(), emailAddress("Invalid email address")],
};

// validate
const validator = new Validator();
const validationResult = validator.validate(account, validationRule);
```

If your model already defines the structure, why repeat it with something like `name: string()` or `username: z.string()`?

It works with literal object as well:

```ts
import { minNumber, required, emailAddress, ValidationRule } from "validant";

const account = {
    name: "",
    age: 0,
    email: "",
};

const validationRule: ValidationRule<typeof account> = {
    name: [required("Account name is required.")],
    age: [required(), minNumber(17, "Should be at least 17 years old.")],
    email: [required(), emailAddress("Invalid email address")],
};
```

### ✅ IntelliSense That Just Works

Here's how validation rules align seamlessly with IntelliSense:

![image](https://github.com/user-attachments/assets/542e0b46-bb7f-4329-9fe1-8a78031b145c)

Because Validant uses your existing model, the validation rule knows your properties — their names and types — without extra declarations.

No inference hacks. No schema dance. Just proper TypeScript support, right out of the box.

## 🛡️ Type Safe

### 🔒 Safe at Compile Time

No mismatched property names. No type mismatches. TypeScript will catch it — instantly.

![image](https://github.com/user-attachments/assets/177dc1de-4c3a-4886-824d-515d6b9716f0)

For example, `Account` doesn't have a `creditCardNumber` — and TypeScript will let you know right away.

This is especially useful when your model changes: the validation rule will break where it should, making it easy to stay in sync.

Rules are type-safe too — they know exactly what type they're validating, and you can build your own custom rules with full type awareness.

![image](https://github.com/user-attachments/assets/22eb3d49-afe3-4e4c-ba4a-d862f920038d)

Even with inferred literal objects, type safety still holds:

![image](https://github.com/user-attachments/assets/8660febc-9722-4165-9a4a-e5f902045964)

### 🔒 Safe at Run Time

Need runtime guarantees? Validant has built-in rules for that too:

```ts
import {
    emailAddress,
    isString,
    minNumber,
    required,
    ValidationRule,
} from "validant";

const validationRule: ValidationRule<Account> = {
    name: [isString("Name should be string")],
    age: [required()],
};
```

or you can do it your own way:

```ts
import {
    emailAddress,
    isString,
    minNumber,
    required,
    ValidationRule,
} from "validant";

const validationRule: ValidationRule<Account> = {
    name: [
        (name, account) => {
            const isString = typeof name === "string"; // check yourself, either return error or throw
            if (!isString) {
                return {
                    ruleName: "",
                    attemptedValue: name,
                    errorMessage: "Please enter the name with string",
                };
            }
        },
    ],
    age: [required()],
};
```

You are not enforced to define all properties, you can set partially set validation for age only:

```ts
import { minNumber, required, emailAddress, ValidationRule } from "validant";

const validationRule: ValidationRule<Account> = {
    age: [required(), minNumber(17, "Should be at least 17 years old.")],
};
```

## ✅ Type Freedom

Validant works seamlessly with any kind of TypeScript structure — whether you're using `interface`, `type`, `class`, or even inferring types from objects.

### Using a `class`

```ts
import { minNumber, required, emailAddress, ValidationRule } from "validant";

class Account {
    name: string;
    age: number;
    email: string;
}

const validationRule: ValidationRule<Account> = {
    name: [required("Account name is required.")],
    age: [required(), minNumber(17, "Should be at least 17 years old.")],
    email: [required(), emailAddress("Invalid email address")],
};
```

### Using a `interface`

```ts
import { minNumber, required, emailAddress, ValidationRule } from "validant";

interface Account {
    name: string;
    age: number;
    email: string;
}

const validationRule: ValidationRule<Account> = {
    name: [required("Account name is required.")],
    age: [required(), minNumber(17, "Should be at least 17 years old.")],
    email: [required(), emailAddress("Invalid email address")],
};
```

### Using a `type`

```ts
import { minNumber, required, emailAddress, ValidationRule } from "validant";

type Account = {
    name: string;
    age: number;
    email: string;
};

const validationRule: ValidationRule<Account> = {
    name: [required("Account name is required.")],
    age: [required(), minNumber(17, "Should be at least 17 years old.")],
    email: [required(), emailAddress("Invalid email address")],
};
```

### Inferring from an `object`

```ts
import { minNumber, required, emailAddress, ValidationRule } from "validant";

type Account = {
    name: string;
    age: number;
    email: string;
};

const account: Account = {
    name: "",
    age: 0,
    email: "",
};

const validationRule: ValidationRule<typeof account> = {
    name: [required("Account name is required.")],
    age: [required(), minNumber(17, "Should be at least 17 years old.")],
    email: [required(), emailAddress("Invalid email address")],
};
```

Use what fits your project best — Validant adapts to your TypeScript style.

## 🛠️ Validation

Validant supports both **synchronous** and **asynchronous** validation.

### ⚡Sync Validation

#### Object Level Validation

Validation rules are represented as:

`ValidationRule<T, TRoot extends object = T>`

```ts
import {
    Validator,
    ValidationRule,
    Validator,
    required,
    minNumber,
    emailAddress,
} from "validant";

// Given your data model:
interface Account {
    name: string;
    age: number;
    email: string;
}

// validation rules
const validationRule: ValidationRule<Account> = {
    name: [required("Account name is required.")],
    age: [required(), minNumber(17, "Should be at least 17 years old.")],
    email: [required(), emailAddress("Invalid email address")],
};
```

Instantiate validator and validate

```ts
const account: Account = {
    name: "",
    age: 0,
    email: "",
};

// validate
const validator = new Validator();
const validationResult = validator.validate(account, validationRule);
```

The result looks like this:

```ts
 {
    message: "Validation failed. Please check and fix the errors to continue.",
    isValid: false,
    errors: {
        name: [
            {
                attemptedValue: "",
                errorMessage: "Account name is required.",
                ruleName: "required"
            }
        ],
        age: [
            {
                attemptedValue: 0,
                errorMessage: "Should be at least 17 years old.",
                ruleName: "minNumber"
            }
        ],
        email: [
            {
                errorMessage: "This field is required.",
                attemptedValue: "",
                ruleName: "required"
            },
            {
                errorMessage: "Invalid email address",
                attemptedValue: "",
                ruleName: "emailAddress"
            }
        ]
    },
};
```

#### Field Level Validation

You can validate a specific field of an object easily by calling validator.validateField(fieldName, object).

```ts
const account: Account = {
    name: "",
    age: 0,
    email: "",
};

// Create a validator with your validation rules
const validator = new Validator();

// Validate the "name" field of the account object
const validationResult = validator.validateField(account, "name", validationRule);
```

The result will be an object like this:

```ts
{
    isValid: false,
    fieldName: "name",
    errors: [
        {
            attemptedValue: "",
            errorMessage: "This field is required.",
            ruleName: "required"
        }
    ]
}
```

This lets you perform precise, field-level validation with clear error feedback.

### 🌐 Async Validation

#### Async Object Level Validation

If you want to use an **async function** as your rule function, you need to define your rule with: `AsyncValidationRule`.

Async rules are represented as:

`AsyncValidationRule<T, TRoot extends Object = T>`

```ts
import {
    AsyncValidationRule,
    AsyncValidator,
    required,
    minNumber,
    emailAddress,
} from "validant";

// Given your data model:
interface Account {
    name: string;
    age: number;
    email: string;
}

// validation rules
const validationRule: AsyncValidationRule<Account> = {
    name: [required("Account name is required.")],
    age: [required(), minNumber(17, "Should be at least 17 years old.")],
    email: [
        required(),
        emailAddress("Invalid email address"),
        // AsyncValidationRule allows you to accept async function rule, while ValidationRule not.
        async (email: string) => {
            /* ...check api or database */
        },
    ],
};
```

Instantiate the AsyncValidator and validate

```ts
const account: Account = {
    name: "",
    age: 0,
    email: "",
};

// validate
const validator = new AsyncValidator();
const validationResult = await validator.validateAsync(account, validationRule);
```

You'll get the same structured result:

```ts
// The validationResult above is equivalent to the following:
  {
    message: "Validation failed. Please check and fix the errors to continue.",
    isValid: false,
    errors: {
        name: [
            {
                attemptedValue: "",
                errorMessage: "Account name is required.",
                ruleName: "required"
            }
        ],
        age: [
            {
                attemptedValue: 0,
                errorMessage: "Should be at least 17 years old.",
                ruleName: "minNumber"
            }
        ],
        email: [
            {
                errorMessage: "This field is required.",
                attemptedValue: "",
                ruleName: "required"
            },
            {
                errorMessage: "Invalid email address",
                attemptedValue: "",
                ruleName: "emailAddress"
            }
        ]
    },
};
```

#### Async Field Level Validation

You can validate a specific field of an object easily by calling validator.validateFieldAsync(fieldName, object).

```ts
const account: Account = {
    name: "",
    age: 0,
    email: "",
};

// Create a validator with your validation rules
const validator = new AsyncValidator();

// Validate the "email" field of the account object
const validationResult = await validator.validateFieldAsync(account, "email", validationRule);
```

The result will be an object like this:

```ts
{
    isValid: false,
    fieldName: "email",
    errors: [
        {
            errorMessage: "This field is required.",
            attemptedValue: "",
            ruleName: "required"
        },
        {
            errorMessage: "Invalid email address",
            attemptedValue: "",
            ruleName: "emailAddress"
        }
    ]
}
```

This lets you perform precise, async field-level validation with clear error feedback.

#### ✅ Intuitive Error Structure

As you can see the above validationResult.errors **mirrors the shape** of your original object — field by field.
There's no guesswork, no opaque path strings ("user[0].email"), and no nested issues[] array to parse.

Validant gives you direct, predictable access to error messages using the same property keys as your data model.

#### You already know how to access your errors:

```ts
if (validationResult.errors.email) {
    console.error(validationResult.errors.email.join(" "));
}
```

-   ❌ No weird formats.
-   ✅ The errors = your original object properties

## 🔧 Custom Validation

Validant provides complete control through custom validation functions with strict type signatures.

### Validation Function Signature

```typescript
/**
 * The return type if when validation failed
 */
export interface RuleViolation {
    ruleName: string;
    attemptedValue: any;
    errorMessage: string;
}

/**
 * Rule function signature
 * @template TValue - Type of the property being validated
 * @template TRoot - Type of the root object
 */
export type ValidateFunc<TValue, TRoot extends Object> = (
    value: TValue,
    root: TRoot
) => RuleViolation | undefined;
```

**Key Advantages**

-   ✅ The root provides full access to the object being validated.
-   ✅ All custom rules are context-aware — validating against sibling fields is easy.
-   ❌ No hacks or workarounds needed.

### 🧩 Inline Custom Rule Example

You can define your custom validation both inline or as a separated function.

```ts
interface LoginRequest {
    userName: string;
    password: string;
}

const loginRule: ValidationRule<LoginRequest> = {
    userName: [
        function (username, loginRequest) {
            if (!username) {
                return {
                    ruleName: "custom",
                    attemptedValue: username,
                    errorMessage: "Please enter username.",
                };
            }
        },
        function (username, loginRequest) {
            if (username.toLocaleLowerCase().includes("admin")) {
                return {
                    ruleName: "custom",
                    attemptedValue: username,
                    errorMessage: "Admin is not allowed to login.",
                };
            }
        },
    ],
    password: [
        function (password, loginRequest) {
            if (!password) {
                return {
                    ruleName: "any",
                    attemptedValue: password,
                    errorMessage: "Please enter password.",
                };
            }
        },
    ],
};
```

**Validation Execution**

```ts
const loginRequest: LoginRequest = {
    userName: "",
    password: "",
};

const validator = new Validator();
const result = validator.validate(loginRequest, loginRule);
```

**Result Structure**

```ts
 {
    message: "Validation failed. Please check and fix the errors to continue.",
    isValid: false,
    errors: {
        userName: [
            {
                errorMessage: "Please enter username.",
                attemptedValue: "",
                ruleName: "custom"
            }
        ],
        password: [
            {
                errorMessage: "Please enter password.",
                attemptedValue: "",
                ruleName: "custom"
            }
        ],
    },
};
```

### 🧩 Composable Rule

Not a fan of bulky inline validations? If you feel the above inline validation is fat, lets turn them into reusable function instead with a meaningful function name:

```ts
interface LoginRequest {
    userName: string;
    password: string;
}

function requiredUserNameRule(): ValidateFunc<string, LoginRequest> {
    return function (username, loginRequest) {
        if (!username) {
            return {
                ruleName: requiredUserNameRule.name,
                attemptedValue: username,
                errorMessage: "Please enter username.",
            };
        }
    };
}

function adminShouldBeBlocked(): ValidateFunc<string, LoginRequest> {
    return function (username, loginRequest) {
        if (username.toLocaleLowerCase().includes("admin")) {
            return {
                ruleName: adminShouldBeBlocked.name,
                attemptedValue: username,
                errorMessage: "Admin is not allowed to login.",
            };
        }
    };
}

function requiredPasswordRule(): ValidateFunc<string, LoginRequest> {
    return function (password, loginRequest) {
        if (!password) {
            return {
                ruleName: requiredPasswordRule.name,
                attemptedValue: password,
                errorMessage: "Please enter password.",
            };
        }
    };
}

// Much simpler. you can put above custom rules into its own files, its your choice
const loginRule: ValidationRule<LoginRequest> = {
    userName: [requiredUserNameRule(), adminShouldBeBlocked()],
    password: [requiredPasswordRule()],
};
```

## 🔓 Loose Coupling

The `adminShouldBeBlocked` function represents a domain-specific business validation. It's too valuable to be tightly coupled to any particular validation library. That logic belongs to your domain, not to infrastructure.

The type `ValidateFunc<string, LoginRequest>` is simply a helper — it gives you compile-time type safety and ensures your rule is compatible with the validation engine. But it's not mandatory to explicitly annotate every rule with it.

For example, this will still work seamlessly:

```ts
// The ValidateFunc<string, LoginRequest> removed
function adminShouldBeBlocked() {
    return function (username, loginRequest) {
        if (username.toLocaleLowerCase().includes("admin")) {
            return {
                ruleName: adminShouldBeBlocked.name,
                attemptedValue: username,
                errorMessage: "Admin is not allowed to login.",
            };
        }
    };
}
```

As long as the function conforms to the expected shape, it will integrate with the validation system automatically — making your domain logic loosely coupled, portable, and testable without dragging in validation dependencies.

This approach encourages separation of concerns:

-   Keep domain rules in domain layers.
-   Easy to test.
-   Keep validation orchestration in the validation layer.
-   Compose them freely using meaningful, reusable functions.

Even if you change your framework in the future, the `adminShouldBeBlocked` remains highly reusable. An adapter function is all it takes to integrate it elsewhere.

## 🧮 Array Validation

Validating arrays in Validant is simple yet powerful. You can apply rules both to the array itself (e.g. length checks) and to each individual item in the array.

### Validation Rule Example

```ts
interface OrderItem {
    productId: number;
    quantity: number;
}

interface Order {
    id: string;
    orderItems: OrderItem[];
}

const orderRule: ValidationRule<Order> = {
    orderItems: {
        arrayRules: [arrayMinLen(1)], // Array-level rules
        arrayElementRule: {
            // Item-level rules
            productId: [required()],
            quantity: [
                minNumber(1, "Min qty is 1."),
                maxNumber(5, "Max qty is 5."),
            ],
        },
    },
};
```

### Validation Scenarios

**1. Empty Array Validation**

```ts
const emptyOrder: Order = {
    id: "1",
    orderItems: [], // Fails arrayMinLen
};

const validator = new Validator();
const result = validator.validate(emptyOrder, orderRule);
```

The above validation results error structure:

```ts
{
    message: "Validation failed. Please check and fix the errors to continue.",
    isValid: false,
    errors: {
        orderItems: {
            arrayErrors: [
                {
                    errorMessage: "The minimum length for this field is 1.",
                    attemptedValue: [],
                    ruleName: "arrayMinLen"
                }
            ]
        }
    }
}
```

**2. Invalid Items Validation**

```ts
const invalidItemsOrder: Order = {
    id: "1",
    orderItems: [
        {
            productId: 1, // Valid
            quantity: 0, // Fails minNumber
        },
    ],
};
```

The above validation results the following error structure

```ts
{
    message: "Validation failed. Please check and fix the errors to continue.",
    isValid: false,
    errors: {
        orderItems: {
            arrayElementErrors: [
                {
                    index: 0,
                    attemptedValue: {
                        productId: 1,
                        quantity: 0
                    },
                    errors: {
                        quantity: [
                            {
                                errorMessage: "Min qty is 1.",
                                attemptedValue: 0,
                                ruleName: "minNumber"
                            }
                        ]
                    }
                }
            ]
        }
    }
}
```

### Key Features

✅ Dual-Level Validation

-   arrayRules: Validate the array itself (length, required, etc.). Array level error is represented in the **errors** property
-   arrayElementRule: Validate each item's structure. Array item error is represented in the **arrayElementErrors** property.

✅ Precise Error Reporting

-   Clear distinction between array-level and item-level errors
-   Includes index references for invalid items
-   Errors are structured by index, so you know which item failed and why.

✅ Type-Safe Nesting

-   Item rules maintain full type checking against the item type
-   Works with any depth of nested arrays
-   **Dont worry if your property names or data structure change**, TypeScript (and your editor) will catch it instantly

❌ No confusing string paths like "orderItems[0].quantity"

-   Good luck debugging when property names change, or when you're trying to trace validation errors in deeply nested structures.
-   Binding errors back to your UI? Prepare for brittle code and guesswork.

## ⚠️ Error Structure Breakdown

The error is separated into 2 models

-   Object Error
-   Array error

### 🧱 {} Object Error

Object error is represented by:

```ts
export type ErrorOf<T extends Object> = {
    [key in keyof T]?: T[key] extends Date
        ? RuleViolation[]
        : T[key] extends PossiblyUndefined<Array<any>>
        ? ErrorOfArray<T[key]>
        : T[key] extends PossiblyUndefined<object>
        ? ErrorOf<T[key]>
        : RuleViolation[];
};
```

where RuleViolation

```ts
export interface RuleViolation {
    ruleName: string;
    attemptedValue: any;
    errorMessage: string;
}
```

An `ErrorOf<T>` maps each field in an object to a array of RuleViolation object. Here's an example to make it clear:

Given the model:

```ts
interface Address {
    street: string;
    cityId: number;
}
```

then the error of Address or `ErrorOf<Address>` will be:

```ts
interface Address {
    street: RuleViolation[];
    cityId: RuleViolation[];
}
```

So the possible ouput of the address error is:

```ts
const addressError = {
    street: [
        {
            errorMessage: "required.",
            attemptedValue: "",
            ruleName: "required"
        },
        {
            errorMessage: "min length is 3 chars.",
            attemptedValue: "",
            ruleName: "arrayMinLen"
        }
    ],
    cityId: [
        {
            errorMessage: "invalid city",
            attemptedValue: 0,
            ruleName: "isValidCityId"
        },
        {
            errorMessage: "must be a number",
            attemptedValue: "1",
            ruleName: "isNumber"
        }
    ];
}
```

### 🧱 [] Array Error

Array validation errors differ slightly from object errors. Instead of mapping directly to the array model, they provide context around:

-   Errors for the array itself
-   Errors for each item in the array

Here's the structure:

```ts
export type ErrorOfArray<TArray> = {
    arrayErrors?: string[]; // the error of array itself or array level errors
    arrayElementErrors?: IndexedErrorOf<ArrayElementType<TArray>>[]; // array item errors representation
};
```

Each item error is described using IndexedErrorOf:

```ts
export type IndexedErrorOf<T extends Object> = {
    index: number; // the array item index being validated
    errors: ErrorOf<T>; // note this error still shape the original model.
    attemptedValue: T | null | undefined; // this is the array item that is being validated.
};
```

Example:

Given model:

```ts
interface Order {
    id: string;
    orderItems: OrderItem[];
}

interface OrderItem {
    productId: number;
    quantity: number;
}
```

The validation error might look like:

```ts
{
    id: ["required."]
    orderItems: {
        arrayErrors:["The minimum order items is 10 items, please add 9 more."], // array level errors
        arrayElementErrors: [ // array items error
            {
                index: 0,
                attemptedValue: { // the object reference being validated
                    productId: 1,
                    quantity: 0,
                },
                errors: { // product error
                    productId: [
                        {
                            errorMessage: "invalid product id.",
                            attemptedValue: "1",
                            ruleName: "isNumber"
                        }
                    ],
                    quantity: [
                        {
                            errorMessage: "Minimum quantity is 1",
                            attemptedValue: "1",
                            ruleName: "isNumber"
                        }
                    ],
                },
            },
        ];
    }
}
```

### 🛡️ Type-Safe Error

Take this example from the product error above:

```ts
{
    productId: [
        {
            errorMessage: "invalid product id.",
            attemptedValue: "1",
            ruleName: "isNumber"
        }
    ],
    quantity: [
        {
            errorMessage: "Min qty is 1.",
            attemptedValue: "1",
            ruleName: "isNumber"
        }
    ]
}
```

This error object follows the shape of `ErrorOf<Product>`, meaning it mirrors the structure of the Product model.

Because of this, it's type-safe—if the Product model changes (e.g., a field is renamed or removed), TypeScript will catch the mismatch. No need to manually update your error structure. You get auto-synced validation typing for free.
**It handles the discipline for you, so you can just focus on writing the logic and the types, and the rest stays in sync without extra work.**

## 🧬 Validation Context Awareness: Property, Root Object, and Arrays

Validant's validation rules are **context-aware** — giving you access to both the property being validated and the full object it's part of.

### 🔹Property-Level Awareness

You get full type info on the property:

```ts
interface Person {
    name: string;
    age: number;
}

const rule: ValidationRule<Person> = {
    name: [required()],
    age: [
        function (age, person) {
            if (age < 18) {
                return {
                    ruleName: "Minimum age to drink beer.",
                    attemptedValue: age,
                    errorMessage: `We are sorry ${person.name}, You are not allowed to drink beer.`,
                };
            }
        },
    ],
};
```

Here, age is strongly typed as a number. IntelliSense works out of the box:

![image](https://github.com/user-attachments/assets/961f6ba2-eb26-4404-97ad-f4e2fb432ab5)

### 🔹Root object awareness

You also get access to the full object (person in this case), so you can create meaningful cross-field validations:

```ts
function (age, person) {
    if (age < 18) {
        return {
            ruleName: "Minimum age to drink beer.",
            attemptedValue: age,
            errorMessage: `We are sorry ${person.name}, You are not allowed to drink beer.`,
        };
    }
}

```

person is correctly inferred as the root type Person:

![image](https://github.com/user-attachments/assets/7874d83a-ea9e-4c36-acda-1b04f1bfb4c7)

### 🔹Array (Item) Awareness

Validant supports deep validation for arrays — including item-level rules **with full context**.

#### Example: Order Validation

```ts
interface Order {
    id: string;
    orderItems: OrderItem[];
}

interface OrderItem {
    productId: number;
    quantity: number;
    discountPercentage: number;
}

const rule: ValidationRule<Order> = {
    orderItems: {
        arrayRules: [arrayMinLen(1)],
        arrayElementRule: {
            quantity: [minNumber(1, "Min qty is 1.")],
            discountPercentage: [maxNumber(10)],
        },
    },
};
```

`discountPercentage: [maxNumber(10)]`

The rule above limits discountPercentage to a static 10%. But what if the rules change?

-   Default max is 10%

-   If quantity >= 10, max discount increases to 30%

You can express that cleanly using a function for arrayElementRule:

```ts
const rule: ValidationRule<Order> = {
    orderItems: {
        arrayRules: [arrayMinLen(1)],
        // here we assign the rule with function instead of object.
        // The currentOrderItem is the current array item (context) that is being validated
        arrayElementRule: function (currentOrderItem, order) {
            return {
                quantity: [minNumber(1, "Min qty is 1.")],
                discountPercentage: [
                    currentOrderItem.quantity >= 10
                        ? maxNumber(30)
                        : maxNumber(10),
                ],
            };
        },
    },
};
```

Here, item refers to the current array element, and order is the root object. And yes — it's fully type-safe.

![image](https://github.com/user-attachments/assets/a95614a5-0dfd-458c-b0c4-789ffa509ce2)

## Examples

Yeah, talk is cheap, here some examples:

### Sync Example:

**Order Validation**

```ts
interface Customer {
    fullName: string;
    email: string;
}

interface OrderItem {
    productId: number;
    quantity: number;
}

interface OrderRequest {
    orderNumber: string;
    orderDate?: Date;
    customer: Customer;
    orderItems: OrderItem[];
}

const orderRule: ValidationRule<OrderRequest> = {
    orderNumber: [required("Order number is required.")],
    orderDate: [required("Please enter order date.")],
    customer: {
        fullName: [required()],
        email: [required(), emailAddress()],
    },
    orderItems: {
        arrayRules: [arrayMinLen(1, "Please add at least one product.")],
        arrayElementRule: {
            productId: [required("Please enter product.")],
            quantity: [
                minNumber(1, "Minimum quantity is 1."),
                function (quantity, order) {
                    // Case:
                    // When customer first 3 letters contains : Jac ignore invariant
                    // Then Max Quantity = 100
                    // So  Jack, Jacob, Jacky, Jacka will get this special max quantity
                    //
                    // Other than that
                    // Max quantity = 10

                    // Accessing other properties via order
                    const customerName = order.customer.fullName;
                    const isJac = order.customer.fullName
                        .toLowerCase()
                        .startsWith("jac");

                    const maxQuantityForJac = 100;
                    const maxQuantityForOthers = 10;

                    const isValidQuantityForJac = quantity <= maxQuantityForJac;
                    const isValidQuantityForOthers =
                        quantity <= maxQuantityForOthers;

                    if (isJac) {
                        if (!isValidQuantityForJac) {
                            return {
                                ruleName: "isJac",
                                attemptedValue: quantity,
                                errorMessage: `You are special ${customerName}, other's max quantity is limited to ${maxQuantityForOthers}. Yours is limited to, but ${maxQuantityForJac} pcs.`,
                            };
                        }
                    }

                    if (!isValidQuantityForOthers) {
                        return {
                            ruleName: "isJac",
                            attemptedValue: quantity,
                            errorMessage: `You only allowed to order ${maxQuantityForOthers} product at once.`,
                        };
                    }
                },
            ],
        },
    },
};
```

**Nested Example**

```ts
interface Continent {
    name: string;
}
interface Country {
    name: string;
    continent: Continent;
}
interface City {
    name: string;
    country: Country;
}
interface Address {
    street: string;
    city: City;
}
interface Person {
    name: string;
    age: number;
    child?: Person;
    address?: Address;
}

const rule: ValidationRule<Person> = {
    name: [required()],
    age: [minNumber(20)],
    address: {
        street: [required()],
        city: {
            name: [required()],
            country: {
                name: [required()],
                continent: {
                    name: [required()],
                },
            },
        },
    },
    child: {
        name: [required()],
    },
};
```

And the validation result :

```ts
{
    message: "Validation failed. Please check and fix the errors to continue.",
        isValid: false,
         errors: {
            name: [
                {
                    errorMessage: "This field is required.",
                    attemptedValue: "",
                    ruleName: "required"
                }
            ],
            age: [
                {
                    errorMessage: "The minimum value for this field is 20.",
                    attemptedValue: 0,
                    ruleName: "required"
                }
            ],
            address: {
                street: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: "required"
                    }
                ],
                city: {
                    name: [
                        {
                            errorMessage: "This field is required.",
                            attemptedValue: "",
                            ruleName: "required"
                        }
                    ],
                    country: {
                        name: [
                            {
                                errorMessage: "This field is required.",
                                attemptedValue: "",
                                ruleName: "required"
                            }
                        ],
                        continent: {
                            name: [
                                {
                                    errorMessage: "This field is required.",
                                    attemptedValue: "",
                                    ruleName: "required"
                                }
                            ],
                        }
                    }
                }
            },
            child: {
                name: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: "required"
                    }
                ],
            }
        },
        child: {
            name: [
                {
                    errorMessage: "This field is required.",
                    attemptedValue: "",
                    ruleName: "required"
                }
            ],
        }
    }
}
```

### Async Examples

#### Login that validates email

```ts
export type LoginRequest = {
    email: string;
    password: string;
};

function preventUnregisteredEmailRule(userRepository: UserRepository) {
    return async function (email) {
        if (!email) {
            // lets skip this for now.
            return;
        }
        const existingUser = await userRepository.getUserAsync(email);
        if (!existingUser) {
            return {
                ruleName: preventUnregisteredEmailRule.name,
                attemptedValue: email,
                errorMessage: `${email} is not registered.`,
            };
        }
    };
}

function buildLoginRule(userRepository: UserRepository) {
    const registrationRule: AsyncValidationRule<LoginRequest> = {
        email: [
            required(),
            emailAddress(),
            preventRegisteredEmailRule(userRepository),
        ],
        password: [required()],
    };
    return registrationRule;
}
```

#### Product Validation

```ts
// Validates if price level is sequential or not
function sequentialPriceLevelRule(currentPriceItem: ProductPrice) {
    return function (level: number, product: ProductRequest) {
        if (!currentPriceItem)
            throw new Error("Product price cannot be null or undefined.");
        if (!product) throw new Error("Product cannot be null or undefined.");
        if (!product.prices)
            throw new Error("Product prices cannot be null or undefined.");

        // Checks if price level is sequential
        const currentPriceItemIndex = product.prices.indexOf(currentPriceItem);
        const isFirstIndex = currentPriceItemIndex === 0;

        // First index is ok: no comparer
        if (isFirstIndex) {
            return;
        }

        const prevPriceIndex = currentPriceItemIndex - 1;
        const prevPrice = product.prices[prevPriceIndex];
        if (!prevPrice)
            throw new Error(
                `Previous price item is expected defined. But got: ${prevPrice}`
            );

        const expectedNextPriceLevel = prevPrice.level + 1;
        const isValid = level === expectedNextPriceLevel;
        if (!isValid) {
            return {
                ruleName: sequentialPriceLevelRule.name,
                attemptedValue: level,
                errorMessage: `Price level should be sequential. And the current price level should be: ${expectedNextPriceLevel}, but got ${level}`,
            };
        }
    };
}

function userCanCreateProductRule(userRepository: UserRepository) {
    return async function (userEmail: string) {
        const user = await userRepository.getUserAsync(userEmail);
        if (!user) {
            return {
                ruleName: userCanCreateProductRule.name,
                attemptedValue: userEmail,
                errorMessage: `Invalid user email ${userEmail}.`,
            };
        }

        if (user.userType !== "tenant") {
            return {
                ruleName: userCanCreateProductRule.name,
                attemptedValue: userEmail,
                errorMessage: `User is not allowed to create product.`,
            };
        }
    };
}

function noDuplicatePriceLevelRule() {
    return function (prices: ProductPrice[], product: ProductRequest) {
        for (let index = 0; index < prices.length; index++) {
            const productPrice = prices[index];
            const isDuplicatePrice =
                prices.filter(
                    (x) =>
                        x.level === productPrice.level &&
                        x.price === productPrice.price
                ).length > 1;
            if (isDuplicatePrice) {
                return {
                    ruleName: noDuplicatePriceLevelRule.name,
                    attemptedValue: prices,
                    errorMessage: `Duplicate price ${productPrice.price} and level ${productPrice.level}. At index ${index}.`,
                };
            }
        }
    };
}

function buildProductRule(userRepository: UserRepository) {
    const productRequest: AsyncValidationRule<ProductRequest> = {
        productName: [
            required(),
            stringMinLen(3, "Product name should be at least 3 chars"),
        ],
        prices: {
            arrayRules: [
                required(),
                arrayMinLen(1, "Product has to be at least having 1 price."),
                arrayMaxLen(5, "Product prices maximum is 5 level."),
                noDuplicatePriceLevelRule(),
            ],
            arrayElementRule: function (
                currentPriceItem: ProductPrice,
                product: ProductRequest
            ) {
                return {
                    level: [
                        required(),
                        minNumber(
                            1,
                            "Product level is a non 0 and positive number."
                        ),
                        sequentialPriceLevelRule(currentPriceItem),
                    ],
                    price: [
                        required(),
                        minNumber(1, "Minimum price is at least $1."),
                    ],
                };
            },
        },
        userEmail: [userCanCreateProductRule(userRepository)],
    };
    return productRequest;
}

export interface ProductValidationService {
    validateAsync(
        request: ProductRequest
    ): Promise<ValidationResult<ProductRequest>>;
}

// Creates a validation service
export function createProductValidationService(
    userRepository: UserRepository
): ProductValidationService {
    async function validateAsync(request: ProductRequest) {
        // pass the repository required by the validation rule builder for validation purpose
        const registrationRule = buildProductRule(userRepository);

        const validator = new AsyncValidator();
        return validator.validateAsync(request, registrationRule);
    }
    return {
        validateAsync,
    };
}
```

#### For more example please visit:

[Examples](https://github.com/supendi/validant/tree/main/src/__tests__/examples)

## 🧩 Validation Rule Composition

As your data grows in complexity, Validant makes it easy to split validation logic into smaller, reusable pieces.

You can compose validation Validation Rule by defining rules for nested objects or array items separately and plugging them into your main Validation Rule.

```ts
interface Address {
    street: string;
    cityId: number;
}

interface Customer {
    fullName: string;
    email: string;
    addresses: Address[];
}

// ValidationRule signature: ValidationRule<T, TRoot extends Object = T>
// Here, Customer is your root context — you're attaching/composing Address validation into Customer
const customerAddressRule: ValidationRule<Address, Customer> = {
    cityId: [required(), minNumber(1, "Please enter a valid city id.")],
    street: [required()],
};

const customerRule: ValidationRule<Customer> = {
    fullName: [required()],
    email: [required(), emailAddress()],
    addresses: {
        arrayRules: [required()],
        arrayElementRule: customerAddressRule,
    },
};
```

**Why Compose?**

-   ✅ Break down complex models into smaller rule sets
-   ✅ Reuse rules across multiple ValidationRule
-   ✅ Maintain readability and scalability

Whether you're validating a single nested object or a list of them, Validant keeps your ValidationRule clear and modular.

## 📚 API Reference

### Types

### `ValidationRule<T, TRoot extends Object = T>`

This type represents a set of validation rules for an object model. It defines how each property in the model should be validated.

Usage:

```ts
import { minNumber, required, emailAddress, ValidationRule } from "validant";

type Account = {
    name: string;
    age: number;
    email: string;
};

const validationRule: ValidationRule<Account> = {
    name: [required("Account name is required.")],
    age: [required(), minNumber(17, "Should be at least 17 years old.")],
    email: [required(), emailAddress("Invalid email address")],
};
```

### `ValidationResult<T>`

Represents the result of validating a model. It tells you if the validation passed, provides a general message, and optionally includes detailed field-level errors.

```ts
export interface ValidationResult<T> {
    isValid: boolean;
    message: string;
    errors?: ErrorOf<T> | undefined;
}
```

Example:

```ts
const validationResult: ValidationResult<Account> = {
    isValid: false,
    message: "Validation failed",
    errors: {
        name: [
            {
                errorMessage: "This field is required.",
                attemptedValue: "",
                ruleName: "required",
            },
        ],
        age: [
            {
                errorMessage: "Must be at least 17",
                attemptedValue: 1,
                ruleName: "minAgeRule",
            },
        ],
    },
};
```

### `ErrorOf<T extends Object>`

Represents the error structure for a given object model. Each property in the model is mapped to an array of error messages.

Usage:

```ts
import { ErrorOf } from "validant";

type Account = {
    name: string;
    age: number;
    email: string;
};

const errors: ErrorOf<Account> = validationResult.errors;
```

This allows you to bind the errors directly to your UI without manual mapping.

### `IndexedErrorOf<T extends Object>`

Represents the validation error for a specific item in an array. It includes the index of the item, its validation errors, and the original value.

```ts
export type IndexedErrorOf<T extends Object> = {
    index: number;
    errors: ErrorOf<T>;
    attemptedValue: T | null | undefined;
};
```

**Use case**

When validating arrays, this type helps track which item failed and why.

```ts
{
    index: 0,
    attemptedValue: {
        productId: 1,
        quantity: 0,
    },
    errors: {
        productId: [
            {
                errorMessage: "Invalid product ID",
                attemptedValue: "",
                ruleName: "isValidProductId"
            }
        ],
        quantity: [
            {
                errorMessage: "Minimum quantity is 1",
                attemptedValue: "",
                ruleName: "minNumber"
            }
        ],
    }
}
```

### `ErrorOfArray<TArray>`

Represents the error structure for array fields in a model. It distinguishes between:

-   Array-level errors (e.g., not enough items)
-   Item-level errors (validation errors on each element)

```ts
export type ErrorOfArray<TArray> = {
    arrayErrors?: string[];
    arrayElementErrors?: IndexedErrorOf<ArrayElementType<TArray>>[];
};
```

**Example**

If the model is:

```ts
type Order = {
    orderItems: OrderItem[];
};
```

And you have a rule like "Minimum 5 items required", the error might look like:

```ts
{
    orderItems: {
        arrayErrors: ["The minimum order is 5 items"],
        arrayElementErrors: [
            {
                index: 0,
                attemptedValue: { productId: 1, quantity: 0 },
                errors: {
                    productId: [
                        {
                            errorMessage: "Invalid product ID",
                            attemptedValue: "",
                            ruleName: "isValidProductId"
                        }
                    ],
                    quantity: [
                        {
                            errorMessage: "Minimum quantity is 1",
                            attemptedValue: "",
                            ruleName: "minNumber"
                        }
                    ],
                }
            }
        ]
    }
}
```

Use this structure to display detailed and indexed feedback per array element — and at the same time handle overall constraints at the array level.

### Custom Validate Function

These types let you define your own custom validation rules for individual properties in a type-safe way.

### **`RuleViolation`**

Represents the result of a single property validation. Return this value if the rule is violated

```ts
export interface RuleViolation {
    ruleName: string;
    attemptedValue: any;
    errorMessage: string;
}
```

-   ruleName: The rule name that is being violated.
-   attemptedValue: The value being validated.
-   errorMessage: The error message when violation happened

### **`ValidateFunc<TValue, TRoot>`**

Defines the signature of a property validator function. Return undefined if valid, return RuleViolation if is invalid.

```ts
export type ValidateFunc<TValue, TRoot extends Object> = (
    value: TValue,
    root: TRoot
) => RuleViolation | undefined;
```

-   TValue: Type of the property being validated.
-   TRoot: Type of the whole object, useful for cross-field validations.

**Example**

```ts
const noSpecialChars: ValidateFunc<string, Account> = (value, root) => {
    if (/[^a-zA-Z0-9 ]/.test(value)) {
        return {
            ruleName: noSpecialChars.name,
            attemptedValue: value,
            errorMessage: "Special characters are not allowed.",
        };
    }
    return { isValid: true };
};
```

You can use this to define fully custom rules, whether for simple checks or complex conditions involving other fields.

### `ArrayValidationRule<TArrayValue, TRoot extends Object>`

Defines how to validate both the array itself and its individual elements.

```ts
export type ArrayValidationRule<TArrayValue, TRoot extends Object> = {
    arrayRules?: ValidateFunc<TArrayValue, TRoot>[];
    arrayElementRule?:
        | ValidationRule<
              PossiblyUndefined<ArrayElementType<TArrayValue>>,
              TRoot
          >
        | ((
              arrayItem: ArrayElementType<TArrayValue>,
              root: TRoot
          ) => ValidationRule<ArrayElementType<TArrayValue>, TRoot>);
};
```

**arrayRules**

Validation rules for the array as a whole.

Example:

```ts
orderItems: {
    arrayRules: [arrayMinLength(3)];
}
```

This ensures the array (e.g. orderItems) has at least 3 items.

**arrayElementRule**

Validation rules for each element inside the array.

Example

```ts
orderItems: {
    arrayElementRule: {
        qty: [minNumber(5)];
    }
}
```

Or for dynamic rules per item (**function style**):

```ts
orderItems: {
    arrayElementRule: (item, root) => ({
        qty: item.type === "bulk" ? [minNumber(10)] : [],
    });
}
```

## Built-in Rules

| Rule | Description | Parameters | Example Usage |
|------|-------------|------------|---------------|
| `alphabetOnly` | String contains only alphabetic characters | `errorMessage?: string` | `name: [alphabetOnly("Letters only")]` |
| `arrayMaxLen` | Array length ≤ specified maximum | `maxLen: number, errorMessage?: string` | `items: [arrayMaxLen(5, "Max 5 items")]` |
| `arrayMinLen` | Array length ≥ specified minimum | `minLen: number, errorMessage?: string` | `items: [arrayMinLen(1, "At least 1 item")]` |
| `elementOf` | Value exists in provided array | `array: TValue[], errorMessage?: string` | `status: [elementOf(["active", "inactive"])]` |
| `emailAddress` | Valid email address format | `errorMessage?: string` | `email: [emailAddress("Invalid email")]` |
| `equalToPropertyValue` | Value equals another property's value | `propertyName: keyof TObject, errorMessage?: string` | `confirmPassword: [equalToPropertyValue("password")]` |
| `isBool` | Value is boolean (true/false) | `errorMessage?: string` | `subscribed: [isBool("Must be true/false")]` |
| `isDateObject` | Value is valid Date object | `errorMessage?: string` | `startDate: [isDateObject("Invalid date")]` |
| `isNumber` | Value is number (not NaN) | `errorMessage?: string` | `price: [isNumber("Must be a number")]` |
| `isString` | Value is string type | `errorMessage?: string` | `name: [isString("Must be a string")]` |
| `maxNumber` | Number ≤ specified maximum | `max: number, errorMessage?: string` | `price: [maxNumber(1000, "Max $1000")]` |
| `minNumber` | Number ≥ specified minimum | `min: number, errorMessage?: string` | `price: [minNumber(1, "Min $1")]` |
| `regularExpression` | String matches regex pattern | `regex: RegExp, errorMessage?: string` | `username: [regularExpression(/^[a-zA-Z0-9_]+$/)]` |
| `required` | Value is not null/undefined/empty | `errorMessage?: string` | `name: [required("Name is required")]` |
| `stringMaxLen` | String length ≤ specified maximum | `maxLength: number, errorMessage?: string` | `username: [stringMaxLen(20, "Max 20 chars")]` |
| `stringMinLen` | String length ≥ specified minimum | `minLen: number, errorMessage?: string` | `username: [stringMinLen(3, "Min 3 chars")]` |

### Special Value Handling

#### `required` Rule
| Value | Result |
|-------|--------|
| `undefined` | ❌ Invalid |
| `null` | ❌ Invalid |
| `""` | ❌ Invalid |
| `"   "` | ❌ Invalid |
| `0` | ✅ Valid |
| `false` | ✅ Valid |
| `[]` | ❌ Invalid |
| `[1]` | ✅ Valid |
| `{}` | ❌ Invalid |
| `{ a: 1 }` | ✅ Valid |

#### `isNumber` Rule
| Value | Result |
|-------|--------|
| `0` | ✅ Valid |
| `NaN` | ❌ Invalid |
| `"123"` | ❌ Invalid |
| `null` | ❌ Invalid |
| `undefined` | ❌ Invalid |

#### `isDateObject` Rule
| Value | Result |
|-------|--------|
| `new Date()` | ✅ Valid |
| `new Date('invalid')` | ❌ Invalid |
| `"2023-01-01"` | ❌ Invalid |
| `1234567890` | ❌ Invalid |

### Usage Examples

```ts
import { required, emailAddress, minNumber, arrayMinLen } from "validant";

interface User {
    name: string;
    email: string;
    age: number;
    hobbies: string[];
}

const userRule: ValidationRule<User> = {
    name: [required("Name is required")],
    email: [required(), emailAddress("Invalid email format")],
    age: [required(), minNumber(18, "Must be at least 18")],
    hobbies: [arrayMinLen(1, "At least one hobby required")]
};
```

## 🔄 Flat Error Structure for UI/API

### `flattenError` and `FlattenErrorOf`

Validant provides a utility to convert the default nested error structure (`ErrorOf<T>`) into a **flat, UI-friendly error structure** (`FlattenErrorOf<T>`). This is especially useful for rendering errors in forms, tables, or API responses where a flat array of errors is easier to work with.

### When to Use

-   You want to display all array-level and element-level errors in a single, flat array.
-   You need a structure that is easier to consume in UI frameworks or APIs.
-   You want to avoid traversing nested error objects to find all errors.

### How to Use

```ts
import { flattenError } from "validant";

const validationResult = validator.validate(account, validationRule);
// validationResult.errors is of type ErrorOf<T>

const flatErrors = flattenError(validationResult.errors);
// flatErrors is of type FlattenErrorOf<T>
```

### Example

Given a model:

```ts
interface OrderItem {
    productId: number;
    quantity: number;
}

interface Order {
    orderDate: Date | null;
    orderNumber: string;
    orderItems: OrderItem[];
}
```

Suppose you have this error structure (the default `ErrorOf<Order>`):

```ts
{
    orderDate: [
        { errorMessage: "This field is required.", attemptedValue: null, ruleName: "required" }
    ],
    orderItems: {
        arrayErrors: [
            { errorMessage: "At least 1 item required.", attemptedValue: [], ruleName: "arrayMinLen" }
        ],
        arrayElementErrors: [
            {
                index: 0,
                errors: {
                    productId: [
                        { errorMessage: "Invalid product id.", attemptedValue: 0, ruleName: "elementOf" }
                    ],
                    quantity: [
                        { errorMessage: "Minimum is 1.", attemptedValue: 0, ruleName: "minNumber" }
                    ]
                },
                attemptedValue: { productId: 0, quantity: 0 }
            }
        ]
    }
}
```

Calling `flattenError` will produce:

```ts
{
    orderDate: [
        { errorMessage: "This field is required.", attemptedValue: null, ruleName: "required" }
    ],
    orderItems: [
        {
            errorLevel: "array",
            errorMessage: "At least 1 item required.",
            attemptedValue: [],
            ruleName: "arrayMinLen"
        },
        {
            errorLevel: "arrayElement",
            index: 0,
            errors: {
                productId: [
                    { errorMessage: "Invalid product id.", attemptedValue: 0, ruleName: "elementOf" }
                ],
                quantity: [
                    { errorMessage: "Minimum is 1.", attemptedValue: 0, ruleName: "minNumber" }
                ]
            },
            attemptedValue: { productId: 0, quantity: 0 }
        }
    ]
}
```

### Type Reference

```ts
import { FlattenErrorOf } from "validant";

type FlatErrors = FlattenErrorOf<Order>;
```

-   **Array-level errors** are objects with `errorLevel: "array"`.
-   **Element-level errors** are objects with `errorLevel: "arrayElement"` and an `index` property.
-   All other fields remain as arrays of `RuleViolation`.

### Benefits

-   **UI-friendly:** Flat arrays are easier to render and map to UI components.
-   **No manual traversal:** All errors for an array field are in a single array, regardless of depth.
-   **Type-safe:** Still fully typed with TypeScript.

### See Also

-   [flattenError.spec.ts](src/__tests__/unit/validators/flattenError.spec.ts) for real-world test cases and expected outputs.