const express = require('express');
const app = express();
app.use(express.static('dist/dynaimc-reports-web/browser/'));
const path = require('path');
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'dynaimc-reports-web', 'browser', 'index.html'));
});
app.listen(4200, () => console.log('running'));
