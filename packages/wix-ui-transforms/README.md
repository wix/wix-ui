# Code transforms for `wix-ui` and `wix-style-react`

## Available transforms

### Replace icons

Replaces legacy `wix-style-react` icons with new ones from `wix-ui-icons`. Avaliable as a jscodeshift transform and as a regex find-and-replace

#### JSCodeShift

```bash
jscodeshift --babel --parser babylon -t [path-to-wix-style-react-transforms]/lib/replace-icons.js src/**/*.js
```

#### RegExp replace

```bash
wix-ui-replace-icons src/**/*.ts
```
