export interface AuthResponseDTO {
    isAuthSuccessful: boolean;
    message: string;
    errorMessage: string;
    token: string;
    is2StepVerificationRequired: boolean;
    provider: string;
}

