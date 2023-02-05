const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_PATTERN =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const DOMAIN_PATTERN =
  /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;
const checkRegexPatternTest = (pattern, data) => {
  const regExp = new RegExp(pattern);
  let testPattern = regExp;
  return testPattern.test(data);
};
function isValidElementCheck(data) {
  return data !== null && data !== undefined;
}
function isValidStringCheck(data) {
  return data !== null && data !== undefined && data !== '' && data !== 'null';
}
export const isValidElement = data => {
  return isValidElementCheck(data);
};
export const isValidString = data => {
  return isValidStringCheck(data);
};
export const trimBlankSpacesInText = text => {
  if (isValidString(text)) {
    return text.replace(/^\s+|\s+$/gm, '');
  } else {
    return '';
  }
};
export const checkIsValidEmail = email => {
  let trimEmail = isValidString(email) ? email.trim() : email;
  return checkRegexPatternTest(EMAIL_PATTERN, trimEmail);
};

export const checkIsValidDomain = domain => {
  let trimDomain = isValidString(domain) ? domain.trim() : domain;
  return checkRegexPatternTest(DOMAIN_PATTERN, trimDomain);
};
