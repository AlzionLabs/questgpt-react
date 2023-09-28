# QuestGPT React Component

This is a React component for the [QuestGPT](https://questgpt.ai). It allows you to easily add QuestGPT to your React app.

## Installation

```bash
npm install questgpt-react
```

## Usage

### Importing

```jsx
import React from 'react';
import QuestGPT from 'questgpt-react';
import 'questgpt-react/dist/index.css';
```

### Basic Usage

```jsx
<QuestGPT
  apiKey="<YOUR_QUESTGPT_API_KEY>"
  introText="Ask me a question..." // Optional
  hideCredit={true} // Optional
/>
```

### Overriding the default styles

You can override the CSS by overriding the classes present in the `index.css` file.