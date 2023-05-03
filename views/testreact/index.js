import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactComponent from './react-component';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<ReactComponent />);
