
import React from 'react';
import 'codemirror/mode/markdown/markdown'
import '../css/dracula.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

const ItemSearchCode = ({codeData}) => {
    return (
        <div
            style={{ width: '100%' }}
        >
            <CodeMirror
              value={codeData}
              options={{
                  mode: 'javascript',
                  theme: 'dracula',
                  lineNumbers: true,
                  readOnly: true
              }}
            />
        </div>
    );
};

export default ItemSearchCode;
