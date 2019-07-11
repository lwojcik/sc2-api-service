const type = (type: string) => ({
  type,
});

const strOrNull = () => ({
  type: ['string', 'null'],
  default: '',
});

const numOrNull = () => ({
  type: ['number', 'null'],
  default: '',
});

const strWithEnum = (values: string[]) => ({
  type: ['string', 'null'],
  enum: values,
});

const numWithEnum = (values: number[]) => ({
  type: ['number', 'null'],
  enum: values,
});

const numOnly = { type: 'number' };

const strOnly = { type: 'str' };

const obj = type('object');
const arr = type('array');
const bool = type('boolean');
const oneOfStr = strWithEnum;
const oneOfNum = numWithEnum;
const str = strOrNull();
const num = numOrNull();

export { obj, arr, str, bool, oneOfStr, oneOfNum, strOnly, numOnly, num };
