import EditorJs from 'react-editor-js';
import {EDITOR_JS_TOOLS} from "./EditorJsTool";
import './App.css';

function App() {
  let data = {};
  return (
    <div className="App">
      <EditorJs data={data} tools={EDITOR_JS_TOOLS} onChange={(api, data) => {console.log(data)}} />;
    </div>
  );
}

export default App;
