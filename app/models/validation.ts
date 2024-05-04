const EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

export const isValidEmailFormat = (text: string): boolean => {
  return EMAIL.test(text);
};
