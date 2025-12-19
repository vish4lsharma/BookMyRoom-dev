// OTP sending utility
// For development: OTP is logged to console
// In production: Integrate with Twilio or similar service

const sendOTP = async (phone, otp) => {
  // Development mode: Log OTP to console
  if (process.env.NODE_ENV === 'development' || !process.env.TWILIO_ACCOUNT_SID) {
    console.log('\n' + '='.repeat(60));
    console.log('📱 OTP GENERATED');
    console.log('='.repeat(60));
    console.log(`Phone Number: +91${phone}`);
    console.log(`OTP Code: ${otp}`);
    console.log(`Valid for: 10 minutes`);
    console.log('='.repeat(60) + '\n');
    return true;
  }
  
  // Production mode: Send via Twilio
  const twilio = require('twilio');
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  
  try {
    await client.messages.create({
      body: `Your BookMyRoom OTP is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`
    });
    console.log(`✅ OTP sent to +91${phone}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending OTP via Twilio:', error);
    // Fallback to console log if Twilio fails
    console.log(`\n📱 OTP for +91${phone}: ${otp}\n`);
    return true;
  }
};

module.exports = sendOTP;

