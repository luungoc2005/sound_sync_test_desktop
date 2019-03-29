export const STRING = 'string';
export const INTEGER = 'integer';
export const LONG = 'long';
export const FLOAT = 'float';

export type DataTypes = 
  | typeof STRING 
  | typeof INTEGER 
  | typeof LONG
  | typeof FLOAT

export type DataVariable = { type: DataTypes, value: any }