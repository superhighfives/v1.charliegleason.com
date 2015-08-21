On August 19th, 2015, [Glen Maddern][glen-maddern] posted [CSS Modules - Welcome To The Future][css-modules-article].

In the article, he described [CSS Modules][css-modules-github], a methodology and toolset that combines the best bits of styles-in-JavaScript with local scoping. With the goal of maintaining the spirit and virtues of CSS while tackling issues like global scoping and bloat, CSS Modules offer a simple and straightward way to manage complex code and components.

In summary, it's awesome, and it will make you awesome by association.

To show you an example:

```css
/* components/submit-button.css */
.normal { /* all styles for normal */ }
```

```js
/* components/submit-button.js */
import styles from './submit-button.css';
render() {
  return <div>
    <a href="#" className={styles.normal}>A pretty great button</a>
  </div>
}
```

[glen-maddern]: http://twitter.com/glenmaddern "Super great human"
[css-modules-article]: http://glenmaddern.com/articles/css-modules "Super great article"
[css-modules-github]: http://github.com/css-modules