interface ISignUpPayload {
  username: string;
  fullname: string;
  password: string;
}

export const signUp = async (payload: ISignUpPayload) => {
  // Simulate an API call delay
  return new Promise<{ error: null | { message: string } }>((resolve) => {
    setTimeout(() => {
      // For demonstration, we assume the sign-up is always successful
      resolve({ error: null });
    }, 1000);
  });
};
