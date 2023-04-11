const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { body, validationResult } = require('express-validator');
const isBase64 = require('validator/lib/isBase64');

const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = path.resolve('/tmp', 'clipboard.txt');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 更新验证规则
app.post('/save', [body('content').custom((value) => isBase64(value))], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const content = req.body.content;
    fs.writeFileSync(FILE_PATH, content);
    res.status(200).send('Content saved');
});

app.get('/load', (req, res) => {
    if (fs.existsSync(FILE_PATH)) {
        const content = fs.readFileSync(FILE_PATH, 'utf-8');
        res.status(200).send(content);
    } else {
        res.status(404).send('Content not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
