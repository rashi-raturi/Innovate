const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API endpoint to send order confirmation email
app.post("/api/send-order-receipt", async (req, res) => {
  const {
    userEmail,
    userName,
    orderItems,
    totalAmount,
    tokenNumber,
    orderDate,
  } = req.body;

  // Prepare email content
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <div style="background: linear-gradient(to right, #FF6600, #FF8C42); padding: 15px; border-radius: 8px; text-align: center; color: white; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 24px;">CampusPulse Order Confirmation</h1>
        <p style="margin: 5px 0 0;">Order #${tokenNumber}</p>
      </div>
      
      <p style="color: #333;">Dear ${userName},</p>
      <p style="color: #333;">Thank you for your order! Your order has been confirmed and will be ready for pickup.</p>
      
      <div style="background-color: #f8f8f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin-top: 0; color: #FF6600; font-size: 18px;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <th style="text-align: left; padding: 8px; color: #555;">Item</th>
            <th style="text-align: right; padding: 8px; color: #555;">Qty</th>
            <th style="text-align: right; padding: 8px; color: #555;">Price</th>
          </tr>
          ${orderItems
            .map(
              (item) => `
            <tr style="border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px; color: #333;">${item.name} (${
                item.size
              })</td>
              <td style="padding: 8px; text-align: right; color: #333;">${
                item.quantity || 1
              }</td>
              <td style="padding: 8px; text-align: right; color: #333;">₹${
                item.price * (item.quantity || 1)
              }</td>
            </tr>
          `
            )
            .join("")}
          <tr>
            <td colspan="2" style="padding: 12px 8px; text-align: right; font-weight: bold; color: #333;">Total:</td>
            <td style="padding: 12px 8px; text-align: right; font-weight: bold; color: #333;">₹${totalAmount}</td>
          </tr>
        </table>
      </div>
      
      <div style="background-color: #FF6600; color: white; text-align: center; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="margin: 0; font-size: 28px;">Your Token Number</h2>
        <p style="font-size: 42px; font-weight: bold; margin: 10px 0;">#${tokenNumber}</p>
        <p style="margin: 5px 0 0; font-size: 14px;">Present this token at the counter to collect your order</p>
      </div>
      
      <p style="color: #555; font-size: 14px;">Order Date: ${orderDate}</p>
      <p style="color: #555; font-size: 14px;">For any issues with your order, please contact the campus food services desk.</p>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #777; font-size: 13px;">
        <p>This is an automated email from CampusPulse. Please do not reply to this email.</p>
        <p>&copy; ${new Date().getFullYear()} CampusPulse. All rights reserved.</p>
      </div>
    </div>
  `;

  // Configure email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `CampusPulse Order Confirmation - Token #${tokenNumber}`,
    html: emailContent,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({
        success: true,
        message: "Order receipt email sent successfully",
      });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send email",
        error: error.message,
      });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
