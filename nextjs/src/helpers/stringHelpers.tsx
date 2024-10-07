export function formatYen(num: number): string {
  return num.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
}

export function formatWithCommas(num: number): string {
  return num.toLocaleString();
}

export function limitLength(string = '', limit = 0) {
  return string.substring(0, limit);
}

// capitalize first letter in string
export function capitalize(string = '') {
  if (typeof string === 'string' && string.length > 0) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
}

export function capitalizeFirstLetterOfEachWord(string = '') {
  if (typeof string === 'string' && string.length > 0) {
    return string
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return string;
}

// convert translation json to line break string
export function convertStringToJSX(text: string) {
  // Split the text by line break, then map each line to a JSX element
  const lines = text.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return <>{lines}</>;
}

// convert phone number (070-4304-1234) to 07043041234
export function convertPhoneNumberToNumber(phoneNumber: string) {
  return phoneNumber.replace(/-/g, '');
}
