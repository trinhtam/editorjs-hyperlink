![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Hyperlink Tool

A tool link with target & rel attribute for [Editor.js](https://editorjs.io).  

![Screen Shot 2020-11-08 at 23 51 36](https://user-images.githubusercontent.com/22043198/98481955-acee3900-2230-11eb-8b9d-a76439dc258e.png)

![Screen Shot 2020-11-08 at 23 51 43](https://user-images.githubusercontent.com/22043198/98481956-afe92980-2230-11eb-9a84-f22149befbc0.png)

![Screen Shot 2020-11-08 at 23 52 04](https://user-images.githubusercontent.com/22043198/98481957-b11a5680-2230-11eb-9356-5e956f1f8d35.png)

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev @editorjs/hyperlink
```

Include module at your application

```javascript
const Hyperlink = require('@editorjs/hyperlink');
```

## Usage
Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...
  
  tools: {
    ...
    hyperlink: {
      class: Hyperlink,
      config: {
         shortcut: 'CMD+L',
      }     
    },
    ...
  },

  ...
});
```

## Config Params (optional)

| Field  | Type     | Description      |
| ------ | -------- | ---------------- |
| shortcut  | `string` | Shortcut |

## License
[MIT](https://tamit.info)