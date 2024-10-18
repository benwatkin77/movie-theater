const express = require('express');
const app = express();
const userRouter = require('./routes/users');
const showRouter = require('./routes/shows');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/shows', showRouter);

// Initialize server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;