import {expectType} from 'tsd';
import isSvg = require('.');

const data = '<svg></svg>';

expectType<boolean>(isSvg(data));
expectType<boolean>(isSvg(Buffer.from(data)));
