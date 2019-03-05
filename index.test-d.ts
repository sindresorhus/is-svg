import {expectType} from 'tsd-check';
import isSvg from '.';

const data = '<svg></svg>';

expectType<boolean>(isSvg(data));
expectType<boolean>(isSvg(Buffer.from(data)));
