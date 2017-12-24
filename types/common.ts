import {BigNumber} from 'bignumber.js';
import * as _ from 'lodash';
import * as Web3 from 'web3';

export interface TxData {
    from?: string;
    gas?: number;
    gasPrice?: BigNumber;
    nonce?: number;
}

export interface TxDataPayable extends TxData {
    value?: BigNumber;
}

export const classUtils = {
    // This is useful for classes that have nested methods. Nested methods don't get bound out of the box.
    bindAll(self: any, exclude: string[] = ['contructor'], thisArg?: any): void {
        for (const key of Object.getOwnPropertyNames(self)) {
            const val = self[key];
            if (!_.includes(exclude, key)) {
                if (_.isFunction(val)) {
                    self[key] = val.bind(thisArg || self);
                } else if (_.isObject(val)) {
                    classUtils.bindAll(val, exclude, self);
                }
            }
        }
        return self;
    },
};