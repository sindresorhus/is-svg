import {expectType} from 'tsd';
import isSvg from './index.js';

expectType<boolean>(isSvg('<svg></svg>'));
