const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// registration
const signUp = async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during registration' });
    }
  }

  // login

  const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{expiresIn: '30d'});
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during login' });
    }
  }


  const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
      
        res.status(200).json({
          msg: `Hello, ${req.user.username}`,
          secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
        })
    }

  module.exports = {
    signUp,
    login,
    dashboard
  }