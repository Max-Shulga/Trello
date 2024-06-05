import { RegexPattern } from '../types/RegexPattern';

const patternBoardTitle:RegexPattern = /^[0-9\p{L}\s._-]+$/u;
export default patternBoardTitle;
