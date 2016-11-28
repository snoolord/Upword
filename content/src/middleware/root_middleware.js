import { applyMiddleware } from 'redux';
import SynonymsMiddleware from './synonyms_middleware';

const RootMiddleware = applyMiddleware(
  SynonymsMiddleware
);

export default RootMiddleware;
