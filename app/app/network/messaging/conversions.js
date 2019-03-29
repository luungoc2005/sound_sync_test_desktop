import { STRING, INTEGER, LONG, FLOAT, DataTypes } from './dataTypes'

export type DataConverter = {
  from: func: (input: number[]) => string | number;
  to: func: (input: string | number) => number[];
  getLength: func: (input?: string | number) => number;
}

const converters: { [DataTypes]: DataConverter } = {
  [STRING]: {
    from: (input: number[]): string => {

    },
    to: (): number[] => {
      
    },
    getLength: (input: string): number => {

    }
  }
}

export default converters;