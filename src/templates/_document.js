'use strict';

module.exports = (node) => {
  const attrs = node.getAttributes();
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="author" content="${attrs.authors}">
<meta name="hashtags" content="${attrs.hashtags}">
<meta name="event" content="${attrs.event}">
<meta name="event-date" content="${attrs.date}">
<title>${attrs.doctitle}</title>
<link rel="stylesheet" href="./css/main.css">
<script src="./js/slide-deck.js" type="module"></script>
<!--<script>-->
<!--// Check that service workers are registered-->
<!--if ('serviceWorker' in navigator) {-->
  <!--// Use the window load event to keep the page load performant-->
  <!--window.addEventListener('load', () => {-->
    <!--navigator.serviceWorker.register('/sw.js');-->
  <!--});-->
<!--}-->
<!--</script>-->
</head>
<body>
${node.getContent()}
</body>
</html>`;
};
