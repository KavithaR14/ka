const User = require("../Models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Generate OTP
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use a different service if needed (e.g., Outlook, Yahoo)
  auth: {
    user: 'kavitha31032002@gmail.com', // Your email address (use an app-specific password for Gmail)
    pass: 'yrspkptqfaxfvqwo',  // Your email password or app-specific password (for Gmail)
  }
});

// Send OTP
exports.sendOtp = async (req, res) => {
  const { name, email } = req.body;  
  console.log("Received name:", name, "Email:", email);  // Debugging log

  if (!email) {
    return res.status(400).json({ error: "Email is required!" });
  }

  try {
    let user = await User.findOne({ email });
    const otp = generateOtp();
    const otpExpires = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

    if (user) {
      // Update existing user's OTP
      user.otp = otp;
      user.otpExpires = otpExpires;
    } else {
      // Create new user with OTP and name
      user = new User({ email, otp, otpExpires, name });
    }

    await user.save();
    console.log(`OTP for ${email}: ${otp}`);  // Debugging log

    // Send OTP email
    const mailOptions = {
      from: 'your-email@gmail.com', // Sender's email
      to: email, // Recipient's email
      subject: 'Your OTP Code', // Subject of the email
      text: `Hello ${name},\n\nYour OTP code is: ${otp}\n\nThis OTP will expire in 5 minutes.` // Body of the email
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to send OTP email" });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: "OTP sent successfully!" });
      }
    });

  } catch (err) {
    console.error(err);  // Log the error to help debug
    res.status(500).json({ error: "Internal server error" });
  }
};

// Verify OTP and Signup
exports.verifyOtp = async (req, res) => {
  const { name, email, otp } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP!" });
    }

    user.name = name; // Set the name during OTP verification
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Signup successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
