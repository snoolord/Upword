import { applyMiddleware } from 'redux';
import SynonymsMiddleware from './synonyms_actions';

const RootMiddleware = applyMiddleware(
  SynonymsMiddleware
);

export default RootMiddleware;
